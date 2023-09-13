import pb from "@/api/pocketbase";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  return pb.authStore.isValid ? children : <Navigate to="/signin" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute