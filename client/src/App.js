import "./App.css";
// import { useContext } from "React";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Footer from "./Components/Pages/Footer";
import Navbar from "./Components/Pages/Navbar";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Slider from "./Components/Pages/Slider";
import Cart from "./Components/Pages/Cart/Cart";
import Admin from "./Components/Pages/Admin/Admin";
import Item from "./Components/Pages/Item";
import Products from "./Components/Pages/Admin/Products";
import Upload from "./Components/Pages/Admin/Upload";
import AuthState from "./Components/context/Auth/AuthState";
import ProductState from "./Components/context/Product/ProductState";
import setAuthToken from "./Components/Utils/setAuthToken";
import AddProduct from "./Components/Pages/Admin/AddProduct";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ProductState>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route exact path={"/product/:id"} component={Item} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/register"} component={Register} />
              <Route exact path={"/:id/cart"} component={Cart} />
              <Route exact path={"/admin"} component={Admin} />
              <Route exact path={"/admin/:id/upload"} component={Upload} />
              <Route exact path={"/admin/edit-products"} component={Products} />
              <Route exact path={"/admin/add-product"} component={AddProduct} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ProductState>
    </AuthState>
  );
}

export default App;
