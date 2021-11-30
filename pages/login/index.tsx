import { signIn, signOut, useSession } from "next-auth/client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";

import {
  AuthSection,
  Login,
  ControlItem,
  ControlLable,
  ControlInput,
  SubmitButtonWrapper,
  SubmitButton,
} from "../../styles/login.style";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/products");
    }
  };

  return (
    <AuthSection>
      <Login>Login</Login>
      <form onSubmit={handleSubmit}>
        <ControlItem>
          <ControlLable htmlFor="email">Your Email</ControlLable>
          <ControlInput
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ControlItem>
        <ControlItem>
          <ControlLable htmlFor="password">Your Password</ControlLable>
          <ControlInput
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ControlItem>
        <SubmitButtonWrapper>
          <SubmitButton type="submit">Login</SubmitButton>
        </SubmitButtonWrapper>
      </form>
    </AuthSection>
  );
};

export default LoginForm;