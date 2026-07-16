import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useUserStore } from "@/store/user";
import { GET_USER } from "@/graphql/schema";

const ProtectedLayout = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const updateUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <div className="absolute w-screen h-screen flex items-center justify-center blur-sm"></div>
        <div
          className="absolute w-screen h-screen flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-gray-900 z-10"></div>
        </div>
      </>
    );
  }

  if (error || (data && !data.user.success)) {
    localStorage.removeItem("token");
    removeUser();
    navigate("/login");
    return null;
  }

  if (data && data.user.success) {
    updateUser(data.user);
    return <Outlet />;
  }

  return null;
};

export default ProtectedLayout;
