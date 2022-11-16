import { render } from "../../vendors/react-testing-library";
import Navbar from "./Navbar";

test("loads navbar", () => {
  const { getByText } = render(<Navbar />);
  const logo = getByText("Chumbazo");

  expect(logo).toBeInTheDocument();
});
