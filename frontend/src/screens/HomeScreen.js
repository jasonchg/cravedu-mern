import React from "react";
import { Container, Grid } from "@material-ui/core";
import courses from "../courses";
import Course from "../components/Course";

const HomeScreen = () => {
  return (
    <>
      <main>
        <Container maxWidth="md">
          <h2>Latest Courses</h2>
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid key={course._id} item xs={6} sm={3}>
                <Course course={course} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default HomeScreen;
