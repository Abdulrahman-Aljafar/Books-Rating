import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./register/SignUp";
import Login from "./register/LogIn";
import Home from "./components/Home"
import Landing from "./components/Landing"
import NavBar from "./components/NavBar"
import NewBook from "./profile/AddNewBook"
import MyBooks from "./profile/MyBooks"
function App() {
  const [selectMovie, setSelectMovie] = useState({});
  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const [userData , setUserData] = useState({currentDataUser : null})


  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      const currentDataUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
      setUserData({ currentDataUser });

    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
    console.log("The current User is: ", auth.currentUser);
    console.log("The current DATA User  ", userData.currentDataUser);
    
  };
  useEffect(userLogin, []);


  return (
    <>
     { dataLoading &&
        <Router>
         

         <NavBar isLoggedIn={auth.isLoggedIn} data={userData.currentDataUser}loginCallback={userLogin} 
         />

          <Route path="/login">
            <Login loginCallback={userLogin} />
          </Route>

          <Route path="/signup">
            <Signup loginCallback={userLogin} />
          </Route>

          <Route exact path="/Home">
            <Home />
          </Route>

          
          <Route exact path="/NewBook">
            <NewBook  data={userData.currentDataUser}/>
          </Route>

          <Route exact path="/Landing">
            <Landing />
          </Route>

          <Route exact path="/Mybooks">
            <MyBooks data={userData.currentDataUser}/>
          </Route>


        </Router>
      }
    </>
  );
}

export default App;
