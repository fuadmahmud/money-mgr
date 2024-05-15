import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../action/auth";
import { useLocalStorage } from "../hooks";

export default function Header() {
  const username = useLocalStorage('username');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  }
  return (
    <header className="flex flex-row h-14 items-center justify-between bg-transparent backdrop-blur-sm px-4 border-b border-black">
      <Link to="/">
        Home
      </Link>
      <div className="flex flex-row w-1/2 items-center justify-end gap-3">
        {!username ? <><Link to="/login">
          Login
        </Link>
        <Link to="/register">
          Register
        </Link></> : <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  )
}