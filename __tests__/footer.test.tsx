import {render, screen} from "@testing-library/react";
import Footer from "../src/components/layouts/Footer";

describe("footer test", () => {
  it('should show footer author name', () => {
    render(<Footer/>);

    screen.getByText(/AI1411/);
  });

  it('should show privacy policy at footer', () => {
    render(<Footer/>);

    screen.getByText(/Privacy Policy/);
  });
})
