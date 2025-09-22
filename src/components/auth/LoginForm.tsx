import React from "react";
import Button from "components/base-components/Button";
import Input from "components/base-components/Input";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  return (
    <div className="w-full space-y-8 ">
     
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
            <Link to="/forgot-password" className="font-medium text-teal-400 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" text="Login">
        </Button>
      </form>
      
    </div>
  );
};

export default LoginForm;
