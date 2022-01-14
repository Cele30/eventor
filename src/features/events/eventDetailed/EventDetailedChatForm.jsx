import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { addEventChatComment } from "../../../app/services/firebaseService";
import * as yup from "yup";

function EventDetailedChatForm({ eventId, parentId, closeForm }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={yup.object({
        comment: yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm();
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className="ui form">
          <Field name="comment">
            {({
              field, // { name, value, onChange, onBlur }
            }) => (
              <div>
                <Loader active={isSubmitting} />
                <textarea
                  {...field}
                  rows="2"
                  placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                  onKeyPress={event => {
                    if (event.key === "Enter" && event.shiftKey) return;

                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}

export default EventDetailedChatForm;
