import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { auth } from "../../firebase";
import TodoList from "../TodoList/TodoList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail } from "../../actions";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const userEmail = useSelector((state: any) => state.user.email);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserEmail(user.email));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="homepage">
      {isLoggedIn && userEmail ? (
        <h1 className="titleLogged">
          {userEmail.substr(0, userEmail.indexOf("@"))}'s todo list
        </h1>
      ) : (
        <h1 className="title">Personal Todo List</h1>
      )}
      {!isLoggedIn ? (
        <div className="homepageButtons">
          <div className="welcome">
            <h2>Your assistant in everyday tasks</h2>
          </div>
          <button className="loginButton" onClick={() => navigate("login")}>
            LOGIN
          </button>
        </div>
      ) : (
        <TodoList />
      )}
    </div>
  );
};

export default HomePage;
