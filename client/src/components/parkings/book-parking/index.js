import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Navbar } from "components";
import axios from "./../../../services/axios";
const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(8),
    },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function BookParking() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [area, setArea] = useState("");
  const [spot, setSpot] = useState("");
  const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0,-5));  
  const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0,-5));
  const [errorText, setErrorText] = React.useState("");
  const path = window.location.pathname;
  const areas = ["Area 1", "Area 2", "Area 3"];
  const spots = [
    "Spot 1",
    "Spot 2",
    "Spot 3",
    "Spot 4",
    "Spot 5",
    "Spot 6",
    "Spot 7",
    "Spot 8",
    "Spot 9",
    "Spot 10",
    "Spot 11",
    "Spot 12",
    "Spot 13",
    "Spot 14",
    "Spot 15",
    "Spot 16",
  ];

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };
  const handleSpotChange = (event) => {
    setSpot(event.target.value);
  };
  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value);
  };
  const handleTimeToChange = (event) => {
    setTimeTo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      area: area,
      spot: spot,
      time_from: timeFrom.split("T")[1],
      time_to: timeTo.split("T")[1],
      date_from: timeFrom.split("T")[0],
      date_to: timeTo.split("T")[0],
      user: JSON.parse(localStorage.getItem("parkingAppUser")).id,
    };
    // Call the API for booking the parking here.
    axios.post("/booking", body)
    .then(response => {
      console.log("Success:", response.data);
      navigate("/view-parking");
    })
    .catch(error => {
      console.log("error", error.response.data);
      setErrorText(error.response.data.message);
      console.error("Error:", error);
    });
  
  };

  return (
    <>
      {path === '/book-parking' && <Navbar />}
      <Container component="main" sx={{marginTop: '20px'}}>
   
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="area-select-label">Area</InputLabel>
                <Select
                  labelId="area-select-label"
                  id="area-select"
                  label="Area"
                  value={area}
                  onChange={handleAreaChange}
                  error={area === ""}
                >
                  {areas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="spot-label">Spot</InputLabel>
                <Select
                  labelId="spot-label"
                  id="spot-select"
                  label="Spot"
                  value={spot}
                  onChange={handleSpotChange}
                >
                  {spots.map((spot) => (
                    <MenuItem key={spot} value={spot}>
                      {spot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="timeFrom"
                label="Time From"
                type="datetime-local"
                name="timeFrom"
                value={timeFrom}
                onChange={handleTimeFromChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="timeTo"
                label="Time To"
                type="datetime-local"
                name="timeTo"
                value={timeTo}
                onChange={handleTimeToChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Book Parking
          </Button>
          <p className="errorText">{errorText}</p>
        </form>
      </Container>
    </>
  );
}
