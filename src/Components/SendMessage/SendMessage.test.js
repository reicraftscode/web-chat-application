import { render, screen } from "@testing-library/react";
import SendMessage from "./SendMessage";
const image = {
	url: "test",
};

test("renders chat now", () => {
	render(<SendMessage image={image} />);
	const linkElement = screen.getByText("Chat Now!");
	expect(linkElement).toBeInTheDocument();
});
test("renders send button", () => {
	render(<SendMessage image={image} />);
	const linkElement = screen.getByText("Send");
	expect(linkElement).toBeInTheDocument();
});
test("renders exit button", () => {
	render(<SendMessage image={image} />);
	const linkElement = screen.getByText("Exit Chat");
	expect(linkElement).toBeInTheDocument();
});
