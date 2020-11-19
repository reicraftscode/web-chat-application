import { render, screen } from "@testing-library/react";
import Exit from "./Exit";

test("renders exit", () => {
	render(<Exit />);
	const linkElement = screen.getByText(
		"You exited the chat please come back here soon!"
	);
	expect(linkElement).toBeInTheDocument();
});
