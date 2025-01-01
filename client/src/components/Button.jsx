import { Outlet } from "react-router-dom";

const Button = ({ color, onClick, children, px}) => {
  return (
    <button
      type="button"
      className={`rounded-full border text-white px-${px} py-2 ${color} shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
