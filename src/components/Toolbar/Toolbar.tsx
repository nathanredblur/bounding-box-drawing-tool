import { FC } from "react";
import styles from "./Toolbar.module.scss";
import { Button } from "@components/Button/Button";

type Props = {
  onUndo?: ()=>void;
  onRedo?: ()=>void;
  onSubmit?: ()=>void;
  currentAction: number;
  totalActions: number;
}

export const Toolbar: FC<Props> = ({
  onUndo, 
  onRedo, 
  onSubmit,
  currentAction,
  totalActions,
}) => {
  return <div className={styles.Toolbar}>
    <Button onClick={onUndo} disable={totalActions == 0}>Undo</Button>
    <Button onClick={onRedo} disable={currentAction == totalActions-1}>Redo</Button>
    <Button className={styles.Submit} onClick={onSubmit}>Submit</Button>
  </div>;
};
