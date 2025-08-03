import "./App.css";
import React, { useState } from "react";
import Logo from "./assets/Frontend-Logo.png";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Loading from "./components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 700);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("reg");
    document.querySelector('.reg__loading').classList += ' load__state';
    createUserWithEmailAndPassword(auth, "amit@email.com", "test123")
    .then((user) => {
      console.log(user);
      setTimeout(() => {
        document.querySelector('.reg__loading').classList.remove('load__state');
      },500)
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        document.querySelector('.reg__loading').classList.remove('load__state');
      },500)
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "amit@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    console.log("out");
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <nav>
          <figure className="logo__img--wrapper">
            <img src={Logo} className="logo__img"></img>
          </figure>
          <div className="nav__buttons">
            {user.email ? (
              <>
                <button onClick={logout} className="user__btn">
                  {user.email[0].toUpperCase()}
                </button>
              </>
            ) : (
              <>
                <button onClick={login} className="login__btn">
                  Login
                </button>
                <div className="reg__wrap">
                  <button onClick={register} className="reg__btn">
                    Register
                  </button>
                  <figure className="reg__loading">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="reg__loading--spinner"
                    />
                  </figure>
                </div>
              </>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

export default App;
