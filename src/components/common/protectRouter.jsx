import { useLocation } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

// 封装受保护的路由
const ProtectedRouter = ({ path, children }) => {
  // 返回当前页面的信息，包括路由等
  const location = useLocation();
  const user = auth.getCurrentUser();

  return (
    <Route path={path}>
      {/* 保护路由 */}
      {user ? (
        children
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      )}
    </Route>
  );
};

export default ProtectedRouter;
