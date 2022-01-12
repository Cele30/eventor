import React, { useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoCropper from "./PhotoCropper";
import PhotoDropZone from "./PhotoDropZone";
import cuid from "cuid";
import { getFileExtenstion } from "../util/util";
import {
  updateUserProfilePhoto,
  uploadToFirebaseStorage,
} from "../../services/firebaseService";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";

function PhotoUpload({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancelProp = () => {
    setFiles([]);
    setImage(null);
  };

  const handleUploadImage = () => {
    setLoading(true);
    console.log(files[0]);
    const filename = `${cuid()}.${getFileExtenstion(files[0].path)}`;
    console.log(filename);

    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is", progress + "%");
      },
      error => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {
            updateUserProfilePhoto(downloadURL, filename).then(() => {
              setLoading(false);
              handleCancelProp();
              setEditMode(false);
            });
          })
          .catch(error => {
            toast.error(error.message);
            setLoading(false);
          });
      }
    );
  };

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 1 - Add Photo" />
        <PhotoDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 2 - Resize" />
        {files.length > 0 && (
          <PhotoCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 3 - Preview & upload" />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group>
              <Button
                style={{ width: 100 }}
                positive
                icon="check"
                onClick={handleUploadImage}
                loading={loading}
              />
              <Button
                style={{ width: 100 }}
                icon="close"
                onClick={handleCancelProp}
                disabled={loading}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default PhotoUpload;
