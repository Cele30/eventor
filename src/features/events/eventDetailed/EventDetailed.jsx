import { Grid } from "semantic-ui-react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreDoc } from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/services/firebaseService";
import { listenToEvents } from "../eventSlice";

function EventDetailed() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUser } = useSelector(state => state.auth);
  const event = useSelector(state => state.event.events.find(e => e.id === id));
  const { loading, error } = useSelector(state => state.async);

  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees?.some(a => a.id === currentUser.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: event => dispatch(listenToEvents([event])),
    deps: [id],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) {
    return <Navigate to="/error" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={event.attendees}
          hostUid={event.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetailed;
