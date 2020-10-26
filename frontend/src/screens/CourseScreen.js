import React from "react";
import { Container } from "@material-ui/core";

const CourseScreen = ({ match }) => {
  const courseId = match.params.id;
  return (
    <Container maxWidth="md">
      <h1>This is Course Profile</h1>
      <p>{courseId}</p>
    </Container>
  );
};

export default CourseScreen;
