import { useState, useEffect } from "react";

export type BoundingBox = {
  top: number;
  left: number;
  width: number;
  height: number;
  borderColor?: string;
}

export type PictureTarget = {
  img: string;
  boundingBoxes?: BoundingBox[];
};

const API = "http://localhost:3000/api/pictures";

const request = async () => {
  try {
    const response = await fetch(API);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const submitPictureTargets = (data: PictureTarget[]) => {
  console.log(data);
};

const pictureParser = (pictures: string[]) => pictures.map<PictureTarget>((img) => ({img}))

export const useFetchPictures = () => {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState<PictureTarget[]>([]);

  useEffect(()=>{
    request().then(data => {
      setLoading(false);
      setPictures(pictureParser(data));
    });
  }, [])

  return {
    loading,
    pictures,
    submitPictureTargets
  };
};
