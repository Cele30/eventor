import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listenToEvents } from "../eventSlice";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { useFirestoreDoc } from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/services/firebaseService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import { useState } from "react";

function EventForm() {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedEvent = useSelector(state =>
    state.event.events.find(e => e.id === id)
  );
  const { loading, error } = useSelector(state => state.async);
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

  const handleCancelToggle = async event => {
    setConfirmOpen(false);
    setLoadingCancel(true);

    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.mesage);
    }
  };

  useFirestoreDoc({
    shouldExecute: !!id,
    query: () => listenToEventFromFirestore(id),
    data: event => dispatch(listenToEvents([event])),
    deps: [id],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) {
    return <Navigate to="/error" />;
  }

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            navigate("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
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

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent?.isCancelled ? "green" : "red"}
                content={
                  selectedEvent?.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

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

      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure?"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}

export default EventForm;
