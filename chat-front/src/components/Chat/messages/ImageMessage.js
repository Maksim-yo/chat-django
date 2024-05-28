import { LoadingOutlined } from "../../LoadingOutlined/LoadingOutlined";
import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { setImageHeight } from "../../../features/chat/chatSlice";
import ImageViewerContext from "../ImageViewerContext";
import "./style.css";
import { computeSlideRect } from "yet-another-react-lightbox";
import { useDispatch } from "react-redux";
export default React.memo(function ImageMessage({
  image_file,
  file_name,
  loading,
  setSpacing,
  setHover,
  message,
  time,
}) {
  const [image, setImage] = useState();
  const [isPreview, setIsPreview] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const { imageViewerState, setImageViewerState } =
    useContext(ImageViewerContext);
  // const Image = React.memo(function Image({ src }) {
  //   return <img src={image} />;
  // });

  // const [imageDiv, setImageDiv] = useState(null)
  const imageDiv = useRef();
  useEffect(() => {
    // console.log(message);
    // if (message.height) {
    //   imageDiv.current.height = message.height;
    //   imageDiv.current.width = message.width;
    // }
    setSpacing(false);
    setHover(true);
  }, []);

  // useEffect(() => {
  //   if (image && isPreview) {
  //     console.log("OK");
  //     dispatch(
  //       setImageHeight({
  //         chat_id: message.chat_id,
  //         message_hash: message.message_hash,
  //         height: imageDiv.current.clientHeight,
  //         width: imageDiv.current.clientWidth,
  //       })
  //     );
  //     // console.log(imageDiv.current.clientHeight);
  //     // console.log(imageDiv.current.clientWidth);
  //   }
  // }, [image]);

  useEffect(() => {
    // console.log(image_file);
    if (image_file) {
      console.log(image_file);
      // console.log(image_file);
      setIsPreview(image_file.preview);
      setImage(URL.createObjectURL(image_file.data));
    }
  }, [image_file]);
  useEffect(() => {
    if (image && !isPreview) {
      // console.log(new Date().getTime() / 1000 - time);
      setImageViewerState((prevState) => {
        const newImages = [...prevState.images, { src: image }];

        setImageIndex(newImages.length - 1);
        return {
          ...prevState,
          images: newImages,
          imagesCount: newImages.length,
        };
      });
    }

    // setImageIndex(imageViewerState.images.count);
  }, [image]);

  return useMemo(() => {
    console.log("IMAGE ");

    return (
      <div
        className="justify-content-end image-message"
        onClick={() => {
          console.log(imageIndex);
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
              <div style={{ position: "absolute", zIndex: "1" }}>
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
  }, [image, imageIndex, loading]);
});
