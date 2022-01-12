import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function PhotoCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null);

  const onCrop = () => {
    if (typeof cropperRef.current.cropper.getCroppedCanvas() === "undefined")
      return;

    cropperRef.current.cropper.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    }, "image/jpeg");
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={onCrop}
      ref={cropperRef}
    />
  );
}

export default PhotoCropper;
