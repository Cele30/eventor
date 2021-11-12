import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

function EventDashboard() {
  const { events, loading } = useSelector((state) => state.event);

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
        <EventFilters />
      </Grid.Column>
      <Outlet />
    </Grid>
  );
}

export default EventDashboard;
