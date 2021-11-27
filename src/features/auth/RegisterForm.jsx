import { Form, Formik } from "formik";
import ModalWrapper from "../../app/common/modal/ModalWrapper";
import TextInput from "../../app/common/form/TextInput";
import * as yup from "yup";
import { Button, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modal/modalSlice";
import { registerInFirebase } from "../../app/services/firebaseService";

function RegisterForm() {
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  return (
    <ModalWrapper size="mini" header="Register">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="username" placeholder="Username" />
            <TextInput name="email" placeholder="Email address" />
            <TextInput name="password" placeholder="Password" type="password" />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default RegisterForm;
