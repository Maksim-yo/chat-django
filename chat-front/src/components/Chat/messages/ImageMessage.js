import { LoadingOutlined } from "../../LoadingOutlined/LoadingOutlined";
import React, { useState, useEffect, useContext } from "react";

import ImageViewerContext from "../ImageViewerContext";
import "./style.css";
export const ImageMessage = ({
  image_file,
  file_name,
  loading,
  setSpacing,
  setHover,
}) => {
  const [image, setImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { imageViewerState, setImageViewerState } =
    useContext(ImageViewerContext);

  useEffect(() => {
    console.log(image_file);
    console.log(file_name);
    setSpacing(false);
    setHover(true);
  }, []);

  useEffect(() => {
    setImage(URL.createObjectURL(image_file));
  }, [image_file]);
  useEffect(() => {
    console.log(image);
    if (!image) return;
    setImageViewerState((prevState) => {
      const newImages = [...prevState.images, { src: image }];
      console.log(newImages.length);
      setImageIndex(newImages.length - 1);
      return {
        ...prevState,
        images: newImages,
        imagesCount: newImages.length,
      };
    });
    // setImageIndex(imageViewerState.images.count);
  }, [image]);

  return (
    <div
      className="justify-content-end image-message"
      // style={{ "border-radius": "inherit" }}
      onClick={() => {
        if (!loading)
          return setImageViewerState((prevState) => ({
            ...prevState,
            currentImage: imageIndex,
            isOpen: true,
          }));
      }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        style: "absolute",
      }}
    >
      {image && (
        <div
          className="d-flex align-items-center justify-content-center h-100"
          style={{
            borderRadius: "inherit",
          }}
        >
          {loading && (
            <div style={{ position: "absolute", "z-index": "1" }}>
              <LoadingOutlined
                size={42}
                progress={10}
                trackWidth={5}
                indicatorWidth={5}
                spinnerMode={true}
              />
            </div>
          )}
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              filter: loading ? " blur(4px)" : "",
            }}
            className="img-fluid"
            src={image}
          />
        </div>
      )}
    </div>
  );
};
