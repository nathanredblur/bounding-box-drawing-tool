import { FC } from "react";
import styles from "./Preview.module.scss";
import { PictureTarget } from "@hooks/useFetchPictures";

type Props = {
  pictures: PictureTarget[];
  selectedPicture?: number;
  onSelectPicture?: (picture: number) => void
}

export const Preview: FC<Props> = ({pictures, onSelectPicture, selectedPicture}) => {
  return (
  <div className={styles.Preview}>
    {pictures && pictures.map((picture, index)=> (
      <div className={`${styles.pictureContainer} ${index === selectedPicture}`} 
        key={picture.img} 
        onClick={() => onSelectPicture && onSelectPicture(index)}>
        <img src={picture.img} alt=""/>
      </div>))}
  </div>
  );
};
