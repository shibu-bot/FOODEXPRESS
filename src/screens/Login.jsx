import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // a synthetic event
    const res = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jsonData = await res.json();
    console.log(jsonData);
    if (!jsonData.success) {
      alert("ENTER VALID CREDENTIALS");
    }
    if (jsonData.success) {
      localStorage.setItem("authToken", jsonData.authToken);
      console.log(localStorage.getItem("authToken"));
      Navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}