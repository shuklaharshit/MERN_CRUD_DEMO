import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "../actions/authAction";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "./LoadingScreen";

function Home(props) {
  const { data, setData, loading, error } = useFetch("/api/todos");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              props.logoutUser();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container
          maxWidth="md"
          sx={{
            mt: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {data?.data?.data?.map((todo) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${todo.title}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {todo.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </Container>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Home);
