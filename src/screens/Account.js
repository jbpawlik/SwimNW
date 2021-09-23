import React from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

export default function Account() {
  return (
    <React.Fragment>
      <Signup/>
      <Signin/>
    </React.Fragment>
  )
}