import { Form, Formik } from "formik";
import { Button, Header, Segment, Label } from "semantic-ui-react";
import * as yup from "yup";
import TextInput from "../../app/common/form/TextInput";
import { updateUserPassword } from "../../app/services/firebaseService";

function AcxountPage() {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      <div>
        <Header color="teal" sub content="Change Password" />
        <p>Use this form to change your passowrd</p>
        <Formik
          initialValues={{ newPassword1: "", newPassword2: "" }}
          validationSchema={yup.object({
            newPassword1: yup.string().required(),
            newPassword2: yup
              .string()
              .oneOf([yup.ref("newPassword1"), null], "Passwords do not match")
              .required(),
          })}
          onSubmit={async (values, actions) => {
            try {
              await updateUserPassword(values);
            } catch (error) {
              actions.setErrors({ auth: error.message });
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty, errors }) => (
            <Form className="ui form">
              <TextInput
                name="newPassword1"
                type="password"
                placeholder="New Password"
              />
              <TextInput
                name="newPassword2"
                type="password"
                placeholder="Confirm Password"
              />
              {errors.auth && (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}
              <Button
                style={{ display: "block" }}
                type="submit"
                disabled={!isValid || isSubmitting || !dirty}
                loading={isSubmitting}
                size="large"
                positive
                content="Update password"
              />
            </Form>
          )}
        </Formik>
      </div>
    </Segment>
  );
}

export default AcxountPage;
