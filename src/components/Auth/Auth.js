import React, { useState } from "react";
import "./styles.css";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataSuccess, getUserDataFailiure } from "../../state/Auth";
import { setMenu } from "../../state/ApplicationContext";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Typography,
  Paper,
  Container,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import * as api from "../../api/";

const initState = { email: "", password: "" };

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [error, setError] = useState("");

  const handleShowPassowrd = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    //dispatch(resetErrorMessage());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var userRoleId = 0;
    try {
      const data = await api.signin(formData);
      dispatch(getUserDataSuccess(data.result));
      userRoleId = data.result.UserRoleId;
      localStorage.setItem("authToken", data.token);
      try {
        const menuItems = await api.getMenuItems(userRoleId);
        dispatch(setMenu(menuItems.result));
        navigate("/home");
      } catch (error) {
        dispatch(getUserDataFailiure(error.response.data.error));
      }
    } catch (error) {
      setError(error.response.data.error);
      dispatch(getUserDataFailiure(error.response.data.error));
      //  console.log(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            mt: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2px",
          }}
          elevation={2}
        >
          <Avatar sx={{ margin: "1rem" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              sx={{
                mt: "1rem",
                mb: "2rem",
                justifyContent: "center",
                alignItems: "center",
                p: "0rem 1rem",
              }}
              container
              spacing={2}
            >
              <Input
                name="userName"
                variant="outlined"
                required
                fullWidth
                label="User Name"
                type="text"
                handleChange={handleChange}
              />

              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassowrd}
              />

              <Button
                sx={{
                  ml: "1rem",
                  mt: "1rem",
                  color: "#fff",
                  bgcolor: "#417CAA",
                }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
