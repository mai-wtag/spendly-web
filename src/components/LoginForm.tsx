import React from "react";
import Button from "components/base-components/Button";
import Input from "components/base-components/Input";

const LoginForm: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-8 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="mt-2 text-sm">Log in to manage your finances.</p>
      </div>
      <form className="space-y-6">
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Email or Username"
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-border-light"
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
        <Button type="submit">
          Log In
        </Button>
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
