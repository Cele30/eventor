import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function EventDashboard() {
  const { events } = useSelector((state) => state.event);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Events filters</h2>
      </Grid.Column>
      <Outlet />
    </Grid>
  );
}

export default EventDashboard;
