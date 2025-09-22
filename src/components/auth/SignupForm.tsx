import React from "react";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";

const SignupForm: React.FC = () => {
  return (
    <div className="w-full space-y-8">

      <form className="mt-8 space-y-6">
        <div className="space-y-4 rounded-lg">
          <Input id="full-name" name="fullName" placeholder="Full Name" required />
          <Input id="email-address" name="email" type="email" placeholder="Email address" required />
          <Input id="password" name="password" type="password" placeholder="Password" required />
          <Input id="confirm-password" name="confirmPassword" type="password" placeholder="Confirm Password" required />
        </div>
        <Button type="submit" text="Create Account">
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
