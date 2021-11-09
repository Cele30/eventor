import React, { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateEvent, createEvent } from "../eventSlice";

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === id)
  );
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  });

  useEffect(() => {
    const initialValues = selectedEvent ?? {
      title: "",
      category: "",
      description: "",
      city: "",
      venue: "",
      date: "",
    };

    setValues(initialValues);
  }, [selectedEvent]);

  const handleFormSubmit = () => {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            attendees: [],
            hostPhotoURL: "/assets/user.png",
          })
        );
    navigate("/events");
  };

  const handleInputChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit the event" : "Create new event"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event title"
            value={values.title}
            name="title"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            value={values.category}
            name="category"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            value={values.description}
            name="description"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="City"
            value={values.city}
            name="city"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            value={values.venue}
            name="venue"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            value={values.date}
            name="date"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          as={Link}
          to={"/events"}
        />
      </Form>
    </Segment>
  );
}

export default React.memo(EventForm);
