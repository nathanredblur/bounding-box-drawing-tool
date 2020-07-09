import React, { useState, useReducer, useEffect } from "react";
import { useFetchPictures, PictureTarget, BoundingBox } from "@hooks/useFetchPictures";
import { Toolbar } from "@components/Toolbar/Toolbar";
import { MainView } from "@components/MainView/MainView";
import { Preview } from "@components/Preview/Preview";
import styles from "@styles/index.module.scss";

type Action =
  | { type: 'initPictures', payload: PictureTarget[] }
  | { type: 'selectPicture', payload: number }
  | { type: 'addBoundingBox', payload: {id: number, boundingBox: BoundingBox }}
  | { type: 'undo' }
  | { type: 'redo' }
  
type State = {
  selectedPicture: number,
  currentAction: number,
  pictureTargets: PictureTarget[],
  actions: Action[],

}

const InitialStore = {
  selectedPicture: 0,
  currentAction: -1,
  pictureTargets: [],
  actions: [],
}

const addBoundingBox = (
  pictureTargets: PictureTarget[], 
  payload: {id: number, boundingBox: BoundingBox }
) => {
  const pictureTarget = {...pictureTargets[payload.id]}
  if (!pictureTarget.boundingBoxes) pictureTarget.boundingBoxes = []
  pictureTarget.boundingBoxes = [...pictureTarget.boundingBoxes, payload.boundingBox]

  const newPictureTargets = [...pictureTargets]
  newPictureTargets[payload.id] = pictureTarget;
  return newPictureTargets
}

const removeBoundingBox = (
  pictureTargets: PictureTarget[], 
  payload: {id: number, boundingBox: BoundingBox }
) => {
  const pictureTarget = {...pictureTargets[payload.id]}
  pictureTarget.boundingBoxes = pictureTarget.boundingBoxes?.filter((boundingBoxe)=> boundingBoxe !== payload.boundingBox)

  const newPictureTargets = [...pictureTargets]
  newPictureTargets[payload.id] = pictureTarget;
  return newPictureTargets
}

const reducer = (state: State, action: Action) => {
  const {pictureTargets, actions, currentAction} = state;
  if (action.type == 'initPictures') {
    return({
      ...state,
      pictureTargets: action.payload,
      actions: []
    })
  }

  if (action.type == 'selectPicture') {
    return({
      ...state,
      selectedPicture: action.payload,
    })
  }

  if (action.type == 'addBoundingBox') {
    return({
      ...state,
      currentAction: currentAction + 1,
      pictureTargets: addBoundingBox(pictureTargets, action.payload),
      actions: [...actions.splice(0, currentAction + 1), action]
    })
  }

  if (action.type == 'undo') {
    const actionToUndo = actions[currentAction]
    if (actionToUndo?.type === 'addBoundingBox') {
      return({
        ...state,
        selectedPicture: actionToUndo.payload.id,
        currentAction: currentAction - 1,
        pictureTargets: removeBoundingBox(pictureTargets, actionToUndo.payload),
      })
    }
  }

  if (action.type == 'redo') {
    const actionToRedo = actions[currentAction+1]
    if (actionToRedo?.type === 'addBoundingBox') {
      return({
        ...state,
        selectedPicture: actionToRedo.payload.id,
        currentAction: currentAction + 1,
        pictureTargets: addBoundingBox(pictureTargets, actionToRedo.payload),
      })
    }
  }

  return state;
}

export default () => {
  const { loading, pictures: data, submitPictureTargets } = useFetchPictures();
  const [{pictureTargets, selectedPicture, actions, currentAction}, dispatch] = useReducer(reducer, InitialStore);

  useEffect(()=>{
    dispatch({type: 'initPictures', payload: data})
  }, [data])

  const onSelectPicture = (pictureIndex: number) => {
    dispatch({type: 'selectPicture', payload: pictureIndex})
  }

  const onAddBox = (box: BoundingBox) => {
    dispatch({
      type: 'addBoundingBox', 
      payload: {
        id: selectedPicture,
        boundingBox: box,
      },
    })
  }

  const onUndo = () => {
    dispatch({type: 'undo'})
  }
  const onRedo = () => {
    dispatch({type: 'redo'})
  }

  const onSubmit= () => {
    submitPictureTargets(pictureTargets)
  }
  
  if (loading) return <div>Loading...</div>;
  return (
    <div className={styles.Layout}>
      <Toolbar 
        onUndo={onUndo} 
        onRedo={onRedo} 
        onSubmit={onSubmit} 
        currentAction={currentAction} 
        totalActions={actions.length}/>
      <Preview pictures={pictureTargets} selectedPicture={selectedPicture} onSelectPicture={onSelectPicture}/>
      <MainView picture={pictureTargets[selectedPicture]} onAddBox={onAddBox}/>
    </div>
  );
};
