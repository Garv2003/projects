import { createLazyFileRoute } from "@tanstack/react-router";
import Signup from "../pages/SignUp";

export const Route = createLazyFileRoute("/signup")({
  component: Signup,
});
