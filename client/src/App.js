import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./register/SignUp";
import Login from "./register/LogIn";
import Home from "./components/Home"
import Landing from "./components/Landing"
function App() {
  const [selectMovie, setSelectMovie] = useState({});
  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });
  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
    console.log("The current User is: ", auth.currentUser);
  };
  useEffect(userLogin, []);
  return (
    <>
     { dataLoading &&
        <Router>
        
          <Route path="/login">
            <Login loginCallback={userLogin} />
          </Route>

          <Route path="/signup">
            <Signup loginCallback={userLogin} />
          </Route>

          <Route exact path="/Home">
            <Home />
          </Route>

          <Route exact path="/Landing">
            <Landing />
          </Route>


        </Router>
      }
    </>
  );
}

export default App;
