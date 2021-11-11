import { Form, Formik } from "formik";
import ModalWrapper from "../../app/common/modal/ModalWrapper";
import TextInput from "../../app/common/form/TextInput";
import * as yup from "yup";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signInUser } from "./authSlice";
import { closeModal } from "../../app/common/modal/modalSlice";

function LoginForm() {
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  return (
    <ModalWrapper size="mini" header="Sign in">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <TextInput name="email" placeholder="Email address" />
            <TextInput name="password" placeholder="Password" type="password" />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default LoginForm;
