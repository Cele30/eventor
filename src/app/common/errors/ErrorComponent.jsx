import { Segment, Header, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ErrorComponent() {
  const { error } = useSelector((state) => state.async);
  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Oops -  we have an error"}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to events"
      />
    </Segment>
  );
}

export default ErrorComponent;
