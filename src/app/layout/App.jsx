import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import Navbar from "../../features/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
  );
}

export default App;
