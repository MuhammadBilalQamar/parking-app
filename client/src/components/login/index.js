import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import axios from "./../../services/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    margin: theme.spacing(0.1, 0, 1),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameErrorText, setUsernameErrorText] = React.useState("");
  const [passwordErrorText, setPasswordErrorText] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameErrorText("Please enter a username");
    } else {
      setUsernameErrorText("");
    }
    if (!password) {
      setPasswordErrorText("Please enter a password");
    } else {
      setPasswordErrorText("");
    }

    if (username && password) {
      const body = {
        username: username,
        password: password,
      };
      // login
      axios
        .post("/auth/login", body)
        .then((response) => {
          localStorage.setItem("parkingAppToken", response.data.token);
          localStorage.setItem("parkingAppUser", JSON.stringify(response.data));
          navigate("/");
        })
        .catch((error) => {
          setErrorText(error.response.data.message);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            error={usernameErrorText !== ""}
            helperText={usernameErrorText}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordErrorText !== ""}
            helperText={passwordErrorText}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color=""
            className={classes.register}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <div className={classes.root}>
            <Typography variant="body2" color="error" align="center">
              {errorText}
            </Typography>
          </div>
        </form>
      </div>
    </Container>
  );
}
