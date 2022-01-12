import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useFirestoreDoc } from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserProfile } from "../../../app/services/firebaseService";
import { listenToSelectedUserProfile } from "../profileSlice";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [id, dispatch],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
}

export default ProfilePage;
