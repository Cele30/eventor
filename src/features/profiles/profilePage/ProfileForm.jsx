import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import TextArea from "../../../app/common/form/TextArea";
import TextInput from "../../../app/common/form/TextInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../app/services/firebaseService";

function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        username: profile.username,
        description: profile.description || "",
      }}
      validationSchema={yup.object({
        username: yup.string().required(),
      })}
      onSubmit={async (values, actions) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="ui form">
          <TextInput name="username" placeholder="Username" />
          <TextArea name="description" placeholder="Description" />
          <Button
            type="submit"
            size="large"
            positive
            content="Update profile"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
          />
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
