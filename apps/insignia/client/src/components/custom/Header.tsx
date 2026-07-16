import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">Insignia</Link>
      </h1>
      <div className="flex items-center gap-3">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={logout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
