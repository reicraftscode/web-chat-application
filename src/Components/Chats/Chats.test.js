import { render, screen } from "@testing-library/react";
import Chats from "./Chats";
const image = {
	url: "test",
};
test("renders users list", () => {
	render(<Chats image={image} />);
	const linkElement = screen.getByText("Users");
	expect(linkElement).toBeInTheDocument();
});
