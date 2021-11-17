import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modal/modalSlice";
import { decerment, incrementAsync } from "./SandboxSlice";

function Sandbox() {
  const { data } = useSelector((state) => state.test);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        name="increment"
        loading={loading && target === "increment"}
        content="Increment"
        color="green"
        onClick={(event) => {
          dispatch(incrementAsync(5));
          setTarget(event.target.name);
        }}
      />
      <Button
        name="decrement"
        loading={loading && target === "decrement"}
        content="Decrement"
        color="green"
        onClick={(event) => {
          dispatch(decerment(2));
          setTarget(event.target.name);
        }}
      />

      <Button
        content="open modal"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />
    </>
  );
}

export default Sandbox;
