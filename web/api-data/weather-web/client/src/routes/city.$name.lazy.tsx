import { createLazyFileRoute } from "@tanstack/react-router";
import App from "../pages/App";

export const Route = createLazyFileRoute("/city/$name")({
  component: App,
});
