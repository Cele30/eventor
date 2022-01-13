import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

import { listenToEvents } from "../eventSlice";
import { useFirestoreCollection } from "../../../app/hooks/useFirestoreCollection";
import { listenToEventsFromFirestore } from "../../../app/services/firebaseService";

function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)));
  };

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
      <Outlet />
    </Grid>
  );
}

export default EventDashboard;
