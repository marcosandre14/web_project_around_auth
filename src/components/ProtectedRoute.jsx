import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Se não estiver logado, redireciona imediatamente para a tela de login (/signin)
    return <Navigate to='/signin' replace />;
  }

  // Se estiver logado, renderiza a página/componentes normais
  return children;
};

export default ProtectedRoute;
