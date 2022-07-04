import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Vidly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/movies">
              电影列表
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              客户
            </NavLink>
            <NavLink className="nav-link" to="/rentals">
              租金
            </NavLink>

            {/* 用户没有登录时渲染登录和注册按钮 */}
            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  登录
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  注册
                </NavLink>
              </>
            )}

            {/* 用户已经登录时渲染用户名和退出登录按钮 */}
            {user && (
              <>
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  退出登录
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
