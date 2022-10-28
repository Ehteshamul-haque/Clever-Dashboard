import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav() {
  //if user is sign up then show logout link else show sign up after page refresh
  const auth = localStorage.getItem("user");
  //logout feature
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png"
       alt="logo"
       className="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* <li>{auth ? <Link onClick={logout}to="/signup">Logout</Link> :
            <Link to="/signup">Sign Up</Link>}</li>
            <li><Link to="/login">Login</Link></li> */}

          {/* {
              auth ? <li><Link onClick={logout}to="/signup">Logout</Link></li>
              : <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>

            } */}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
