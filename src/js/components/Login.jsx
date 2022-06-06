import * as React from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Context } from "../context/appContext";

const Login = () => {
  let context = React.useContext(Context)

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    context.actions.login(data.email, data.password);
    //context.actions.setLoginModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        variant={"h5"}
        sx={{ fontWeight: 700, textAlign: "center", margin: "10px 0 40px 0" }}
        component={"div"}
      >
        Sign in to your account
      </Typography>
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
        inputProps={{ maxLength: 70 }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ backgroundColor: "#080808", margin: "20px 0", padding: "15px" }}
      >
        <Typography variant={"body2"} sx={{ fontWeight: 700 }}>
          Log In
        </Typography>
      </Button>
      <Typography
        variant={"body2"}
        sx={{ fontWeight: 700, marginTop: "20px" }}
        component={"div"}
      >
        {context.store.loginStatus}
      </Typography>
    </form>
  );
};

export default Login;
