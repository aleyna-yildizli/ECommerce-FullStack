import { Route, Switch, useHistory } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";

import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import PrivateRoute from "./components/widgets/PrivateRoute.jsx";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userLogout, userLogin } from "./store/actions/userActions";

import "./App.css";
import PiggyLoading from "./components/widgets/PiggyLoading/PiggyLoading.jsx";
import Shop from "./pages/Shop.jsx";
import CompleteOrder from "./pages/CompleteOrder.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch(userLogin(user));
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return (
    <div className="w-full">
      <Switch>
        <PrivateRoute path="/sepetim/odeme" exact>
          <CompleteOrder />
          <Footer />
        </PrivateRoute>
        <Route path="/piggy" exact>
          <PiggyLoading />
        </Route>
        <Route path="/" exact>
          <Header />
          <Home />
          <Footer />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
          <Footer />
        </Route>
        <Route path="/signup">
          <Header />
          <SignUpPage />
          <Footer />
        </Route>
        <Route path="/verification">
          <EmailVerificationPage />
        </Route>
        <Route path="/shop">
          <Header />
          <Shop />
          <Footer />
        </Route>
        <Route path="/about" exact>
          <Header />
          <About />
          <Footer />
        </Route>
        <Route path="/contact" exact>
          <Header />
          <Contact />
          <Footer />
        </Route>
        <Route path="/team" exact>
          <Header />
          <Team />
          <Footer />
        </Route>
        <Route path="/product/:gender?/:category?/:id?/:name?" exact>
          <Header />
          <ProductPage />
          <Footer />
        </Route>
        <Route path="/sepet" exact>
          <Header />
          <Cart />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
