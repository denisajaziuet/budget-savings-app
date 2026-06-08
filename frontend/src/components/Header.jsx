import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaWallet } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/hyrje');
  };

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-icon"><FaWallet /></span>
          <span>Budget Savings</span>
        </NavLink>

        <nav className="nav">
          {user ? (
            <>
              <NavLink to="/" className={linkClass}>
                Paneli
              </NavLink>
              <NavLink to="/shpenzimet" className={linkClass}>
                Shpenzimet
              </NavLink>
              <button className="btn btn-ghost" onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Dil</span>
              </button>
              <div className="user-pill">
                <FaUserCircle />
                <span>{user.name}</span>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/hyrje" className={linkClass}>
                Hyrje
              </NavLink>
              <NavLink to="/regjistrohu" className={linkClass}>
                Regjistrohu
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
