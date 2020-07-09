import { FC, MouseEvent, useState, useRef } from "react";
import styles from "./MainView.module.scss";
import { PictureTarget, BoundingBox } from "@hooks/useFetchPictures";

type Props = {
  picture?: PictureTarget
  onAddBox?: (box: BoundingBox) =>  void
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const MainView: FC<Props> = ({picture, onAddBox}) => {
  if (!picture) return null

  const ref = useRef<HTMLDivElement>(null)
  const [isDrag, setIsDrag] = useState(false)
  const [rectangle, setRectangle] = useState<BoundingBox | undefined>()

  const someEvent = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault()
    if (!ref.current) return

    const img  = ref.current

    const x = event.pageX - img.offsetLeft;
    const y =  event.pageY  - img.offsetTop;

    if (event.type === 'mousedown'){
      setIsDrag(true)
      setRectangle({
        left: x,
        top: y,
        width: 0,
        height: 0,
        borderColor: getRandomColor()
      })
    }
    if (rectangle && event.type === 'mouseup') {
      if (rectangle.width>0 && rectangle.height > 0) {
        onAddBox && onAddBox(rectangle)
      }
      setIsDrag(false)
      setRectangle(undefined)
    }
    if (isDrag && rectangle &&event.type === 'mousemove'){
      setRectangle({
        ...rectangle,
        width: x - rectangle.left,
        height: y - rectangle.top,
      })
    }
  }

  // const [dimensions, setDimensions] = useState<{}>()
  // const onImgLoad = ({target}: SyntheticEvent ) => {
  //   console.log(target)
  //   if (target) {
  //     const img = target as HTMLImageElement
  //     setDimensions({
  //       height: img.offsetHeight,
  //       width: img.offsetWidth,
  //     });
  //   }
// }

  return <div ref={ref} className={styles.MainView}>
    {picture && <img 
      src={picture.img}
      // onLoad={onImgLoad}
      onMouseDown={someEvent} 
      onMouseMove={someEvent}
      onMouseUp={someEvent}
    />}
    {picture.boundingBoxes?.map((box)=> <div key={box.borderColor} className={styles.Box} style={box}></div>)}
    { rectangle && <div className={styles.newBox} style={rectangle}></div> }
  </div>;
};
