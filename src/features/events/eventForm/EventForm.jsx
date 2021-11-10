import { Button, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateEvent, createEvent } from "../eventSlice";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === id)
  );
  const dispatch = useDispatch();

  let initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  let schema = yup.object().shape({
    title: yup.string().required("You must provide a title"),
    category: yup.string().required(),
    description: yup.string().required(),
    city: yup.string().required(),
    venue: yup.string().required(),
    date: yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
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
        }}
      >
        {({ isSubmiting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event details" />
            <TextInput name="title" placeholder="Event title" />
            <SelectInput
              name="category"
              placeholder="Event category"
              options={categoryData}
            />
            <TextArea
              name="description"
              placeholder="Event desciption"
              rows={3}
            />

            <Header sub color="teal" content="Event Location Details" />
            <TextInput name="city" placeholder="Event city" />
            <TextInput name="venue" placeholder="Event venue" />
            <DateInput
              name="date"
              placeholderText="Event date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            <Button
              loading={isSubmiting}
              disabled={!isValid || !dirty || isSubmiting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmiting}
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to={"/events"}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default EventForm;
