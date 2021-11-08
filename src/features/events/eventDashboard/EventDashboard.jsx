import { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";

function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  // const handleCreateEvent = (newEvent) => {
  //   setEvents([...events, newEvent]);
  // };

  // const handleUpdateEvent = (updatedEvent) => {
  //   setEvents(
  //     events.map((item) => (item.id === updatedEvent.id ? updatedEvent : item))
  //   );
  // };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Events filters</h2>
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
