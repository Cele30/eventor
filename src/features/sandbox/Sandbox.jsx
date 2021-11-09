import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { decerment, increment } from "./SandboxSlice";

function Sandbox() {
  const { data } = useSelector((state) => state.test);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        content="Increment"
        color="green"
        onClick={() => dispatch(increment(5))}
      />
      <Button
        content="Decrement"
        color="green"
        onClick={() => dispatch(decerment(2))}
      />
    </>
  );
}

export default Sandbox;
