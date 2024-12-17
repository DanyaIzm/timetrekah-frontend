import logo from "/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <img
      src={logo}
      alt="logo"
      className="logo"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Logo;
