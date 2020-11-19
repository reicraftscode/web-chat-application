import { render, screen } from "@testing-library/react";
import Messages from "./Messages";

test("renders vhat messages", () => {
	render(<Messages />);
	const linkElement = screen.getByText("Chat Messages");
	expect(linkElement).toBeInTheDocument();
});
