import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../context/Auth/AuthContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { login, isAuth, error } = authContext;

  useEffect(() => {
    if (isAuth || localStorage.token) {
      history.push("/");
    }
    if (error) {
      setErrors(error);
    }
  }, [error, isAuth, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, phoneNumber: phone, email, password };
    authContext.register(newUser);
  };
  return (
    <>
      <Container className="my-4">
        <div className="login-form">
          {errors && <p>{errors}</p>}
          <p className="login-head">REGISTRATION</p>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="*Full Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="*Phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="*Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="*Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Register;
