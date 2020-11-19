import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome message", () => {
	render(<App />);
	const linkElement = screen.getByText("Welcome to ChatBee");
	expect(linkElement).toBeInTheDocument();
});

test("renders enter button", () => {
	render(<App />);
	const linkElement = screen.getByText("Enter the hive");
	expect(linkElement).toBeInTheDocument();
});
