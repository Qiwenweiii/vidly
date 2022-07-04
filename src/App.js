import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";

import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Register from "./components/register";
import Rentals from "./components/rentals";
import Logout from "./components/logout";
import ProtectedRouter from "./components/common/protectRouter";

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>

          {/* 受保护的路由 */}
          <ProtectedRouter path="/movies/:id">
            <MovieForm />
          </ProtectedRouter>

          <Route path="/movies">
            <Movies user={user} />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/rentals">
            <Rentals />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}
