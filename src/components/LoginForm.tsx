import React from "react";
import Button from "./Button";

const LoginForm: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm">
          Log in to manage your finances.
        </p>
      </div>
      <form className="space-y-6">
        <div>
          <label className="sr-only" htmlFor="email">
            Email or Username
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email or Username"
            required
            className="w-full p-2 rounded-lg bg-light border border-border-light "
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 rounded-lg bg-background-light  border border-border-light "
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-border-light "
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-content-light"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a className="font-medium text-teal-400 hover:underline" href="#">
              Forgot password?
            </a>
          </div>
        </div>
        <div>
          <Button type="submit">Log In</Button>
        </div>
      </form>
      <p className="text-center text-sm text-subtle-light">
        Don't have an account?{" "}
        <a className="font-medium text-teal-400 hover:underline" href="#">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
