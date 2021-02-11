import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/Auth/AuthContext";
import { useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const authContext = useContext(AuthContext);
  const { login, isAuth, error } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) {
      history.push("/");
    }
    if (error) {
      setErrors(error);
    }
  }, [isAuth, history, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    login(user);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login-div my-3">
      <Container>
        <div className="login-form">
          {errors && <p>{errors}</p>}
          <p className="login-head">Login</p>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remeber Me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <p>
            New user ? <Link to={"/register"}>create account </Link>{" "}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
