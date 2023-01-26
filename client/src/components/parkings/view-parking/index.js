//@ts-ignore
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Navbar } from "components";
import axios from "../../../services/axios";
import { parkingSpotsData, areas } from "utils/constants";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "20%",
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: "78px",
    width: "20%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function ViewParkings() {
  const classes = useStyles();
  const [selectedArea, setSelectedArea] = useState("Area 1");
  const path = window.location.pathname;
  const [parkingSpots, setParkingSpots] = useState([]);
  const handleAreaClick = (area) => {
    setSelectedArea(area);
  };

  useEffect(() => {
    setParkingSpots([]);
    fetchBooking();
  }, []);

  const fetchBooking = () => {
    axios
      .get("/booking")
      .then((response) => {
        if (response.data.length > 0) {
          const updatedParkingSpots = _.map(parkingSpotsData, (spot) => {
            const matchedBooking = _.find(response.data, { spot: spot.spot });
            if (matchedBooking) {
              spot.bookings.push(matchedBooking);
              spot.status = "occupied";
            }
            return spot;
          });
          const updatedParkingSpotsData = _.map(updatedParkingSpots, (spot) => {
            spot.bookings = _.uniqWith(spot.bookings, _.isEqual);
            return spot;
          });
          setParkingSpots(updatedParkingSpotsData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {path === "/view-parking" && <Navbar />}
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            {areas.map((area) => (
              <ListItem
                button
                key={area.id}
                onClick={() => handleAreaClick(area.name)}
              >
                <ListItemText primary={area.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                {selectedArea}
              </Typography>
            </Grid>
            {parkingSpots.map((parkingSpot) => (
              <Grid item xs={3} key={parkingSpot.id}>
                <Card
                  className={`card ${
                    parkingSpot?.status === "available"
                      ? "available"
                      : "occupied"
                  }`}
                >
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Parking {parkingSpot.spot}
                    </Typography>
                    <Typography className={classes.pos}>
                      {parkingSpot?.status === "available"
                        ? "Available"
                        : "Occupied"}
                    </Typography>
                    {/* Show bookings */}
                    {parkingSpot.bookings.map((booking) => (
                      <Typography className={classes.pos}>
                        {booking.time_from} - {booking.time_to}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </>
  );
}
