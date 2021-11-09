import EventListItem from "./EventListItem";

function EventList({ events }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}

export default EventList;
