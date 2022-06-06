import * as React from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Context } from "../context/appContext";

const Signup = () => {
  let context = React.useContext(Context);

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    planet: "Earth",
  });

  const planetList = context.store.planets.map((eachObj) => {
    return {
      value: eachObj.name,
    };
  });
  planetList.unshift({ value: "Earth" });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    context.actions.signup(
      data.username,
      data.email,
      data.password,
      data.planet
    );
    //context.actions.setLoginModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        variant={"h5"}
        sx={{ fontWeight: 700, textAlign: "center", margin: "10px 0 40px 0" }}
        component={"div"}
      >
        Create an account
      </Typography>
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Username"
        name="username"
        value={data.username}
        onChange={handleChange}
        sx={{ marginBottom: "15px" }}
        inputProps={{ maxLength: 90 }}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Email address"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        sx={{ marginBottom: "15px" }}
        inputProps={{ maxLength: 110 }}
      />
      <TextField
        required
        fullWidth
        id="outlined-required"
        type="password"
        label="Password"
        name="password"
        value={data.password}
        onChange={handleChange}
        sx={{ marginBottom: "15px" }}
        inputProps={{ maxLength: 70 }}
      />
      <TextField
        select
        fullWidth
        id="outlined-select-currency-native"
        label="Planet of residence"
        name="planet"
        value={data.planet}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
      >
        {planetList.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </TextField>
      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ backgroundColor: "#080808", margin: "20px 0", padding: "15px" }}
      >
        <Typography variant={"body2"} sx={{ fontWeight: 700 }}>
          Create Account
        </Typography>
      </Button>
      <Typography
        variant={"body2"}
        sx={{ fontWeight: 700, marginTop: "20px" }}
        component={"div"}
      >
        {context.store.signupStatus}
      </Typography>
    </form>
  );
};

export default Signup;
