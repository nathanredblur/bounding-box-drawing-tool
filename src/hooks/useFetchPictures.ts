import { useState } from "react";

type BoundingBox = {
  x: number;
  y: number;
};

type PictureTarget = {
  img: string;
  boundingBoxes: BoundingBox[];
};

const API = "api/pictures";

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

export const useFetchPictures = () => {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);

  request().then(data => {
    setLoading(false);
    setPictures(data);
  });

  return {
    loading,
    pictures,
    submitPictureTargets
  };
};
