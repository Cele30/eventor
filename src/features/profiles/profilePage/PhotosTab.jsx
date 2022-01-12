import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUpload from "../../../app/common/photos/PhotoUpload";
import { useFirestoreCollection } from "../../../app/hooks/useFirestoreCollection";
import {
  deleteFromFirebaseStorage,
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/services/firebaseService";
import { listenToUserPhotos } from "../profileSlice";

function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const { photos } = useSelector(state => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeliting] = useState({ isDeliting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: photos => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  const handleSetMainPhoto = async (photo, target) => {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  };

  const handleDeletePhoto = async (photo, target) => {
    setDeliting({ isDeliting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeliting({ isDeliting: false, target: null });
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Photos" />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUpload setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      basic
                      color="green"
                      name={photo.id}
                      onClick={e => handleSetMainPhoto(photo, e.target.name)}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                    >
                      Main
                    </Button>
                    <Button
                      basic
                      color="red"
                      icon="trash"
                      name={photo.id}
                      onClick={e => handleDeletePhoto(photo, e.target.name)}
                      loading={
                        deleting.isDeliting && deleting.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default PhotosTab;
