import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate("/login")
  }
  const location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">History Data</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/profile"?'active':[]}`} aria-current="page" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/holdings"?'active':[]}`} aria-current="page" to="/holdings">Holdings</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/order"?'active':[]}`} aria-current="page" to="/order">Place Order</Link>
        </li>
        </ul>


      {!localStorage.getItem('token')?  <form className="d-flex" role="search">
        <Link className="btn btn-outline-light mx-2" to="login" role="button">Login</Link>
        <Link className="btn btn-outline-light mx-1" to="signup" role="button">SignUp</Link>
      </form>: <button onClick={handleLogout} className='btn btn-outline-light'>Logout</button>}
    </div>
  </div>
</nav>
    </>
  )
}


export default Navbar