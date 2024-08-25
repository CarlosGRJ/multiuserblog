"use client";

import React, { useState } from "react";
import {
  handleError,
  showToastError,
  showToastSuccess
} from "../utils/ErrorHandling";
import { useRouter } from "next/navigation";
import { type GenericResponse } from "../interfaces/utils";

function Register() {
  const [values, setValues] = useState({
    name: "Carlos",
    email: "carlos@test.com",
    password: "123456"
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createUserRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DEV}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        }
      );

      const data: GenericResponse = await response.json();
      console.log("data ", data);

      if (!data.ok) {
        showToastError("Something went wrong while registering");
        console.error("data?.err ", data.error);
      } else {
        showToastSuccess("User created successfully");
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = handleError(error);
      showToastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void createUserRequest();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleDisable = () => {
    if (
      loading ||
      values.name.trim().length === 0 ||
      values.email.trim().length === 0 ||
      values.password.trim().length === 0
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center align-items-center vh-90">
        <div className="col-lg-5 p-4 shadow">
          <h2 className="fw-bold lead mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control p-3 mb-4"
              placeholder="Name"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              className="form-control p-3 mb-4"
              placeholder="Email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control p-3 mb-4"
              placeholder="Password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 mb-2"
              disabled={handleDisable()}
            >
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
