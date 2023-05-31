import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail } from "../../actions";
import { auth } from "../../firebase";

const Navbar = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: any) => state.user.email);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleSignOut = () => {
    dispatch(setUserEmail(undefined));
    signOut(auth);
  };

  return (
    <div className="navBar">
      {isLoggedIn && (
        <>
          <h4 className="email">{userEmail}</h4>
          <button className="logoutButton" onClick={handleSignOut}>
            LOGOUT
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
