import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import Rating from "./Rating";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Course = ({ course }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={course.image}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.description}
          </Typography>

          <Typography variant="caption" component="span">
            <Rating
              value={course.rating}
              text={`${course.numReviews} reviews`}
            />
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Course;
