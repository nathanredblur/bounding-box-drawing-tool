import React from "react";
import { useFetchPictures } from "@hooks/useFetchPictures";
import { Toolbar } from "@components/Toolbar/Toolbar";

export default () => {
  const { loading} = useFetchPictures();

  if (loading) return <div>Loading...</div>;
  

  return (
    <div>
      <Toolbar />
    </div>
  );
};
