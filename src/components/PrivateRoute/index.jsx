import { Navigate, Outlet } from "react-router-dom";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { handleShowModal } = useAuthContext();
  if (!!!tokenMethod.get()) {
    handleShowModal?.(MODAL_TYPES.login);
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
