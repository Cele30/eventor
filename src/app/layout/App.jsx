import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailed from "../../features/events/eventDetailed/EventDetailed";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import Navbar from "../../features/navbar/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Container className="main">
        <Routes>
          {/* <Route path={"/()"} element={<Navbar />}> */}
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route
            path="/events"
            element={
              <>
                <Navbar />
                <EventDashboard />{" "}
              </>
            }
          />
          <Route path="/events/:id" element={<EventDetailed />} />
          <Route path="createEvent" element={<EventForm />} />
          {/* </Route> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
