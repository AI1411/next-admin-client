import {render, screen} from "@testing-library/react";
import Home from "../src/pages";
import Sidebar from "../src/components/layouts/Sidebar";

describe("正常にリンク際に遷移できるか", () => {
  it('should show link users', () => {
    render(<Sidebar/>);

    screen.getByText(/users/i);
  });

  it('should show link projects', () => {
    render(<Sidebar/>);

    screen.getByText(/projects/i);
  });

  it('should show link orders', () => {
    render(<Sidebar/>);

    screen.getByText(/orders/i);
  });

  it('should show link coupons', () => {
    render(<Sidebar/>);

    screen.getByText(/coupons/i);
  });
})
