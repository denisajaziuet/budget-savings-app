import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaLock, FaSignInAlt } from 'react-icons/fa';
import { useLoginMutation } from '../store/apis/userApi';
import { setUser } from '../store/slices/userSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Ju lutem plotësoni email-in dhe fjalëkalimin');
      return;
    }

    try {
      const response = await login(formData).unwrap();
      dispatch(setUser(response));
      localStorage.setItem('user', JSON.stringify(response));
      toast.success(`Mirë se erdhe, ${response.name}!`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || 'Hyrja dështoi');
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-hero">
          <p className="eyebrow">Hyrje</p>
          <h1><FaSignInAlt /> Hyr në llogari</h1>
          <p>
            Menaxho shpenzimet e tua, shiko totalin dhe ruaj historikun në mënyrë të thjeshtë.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="p.sh. denis@test.com"
            />
          </label>

          <label className="field">
            <span>Fjalëkalimi</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Shkruaj fjalëkalimin"
            />
          </label>

          <button className="btn btn-primary full-width" type="submit">
            Hyr
          </button>

          <p className="auth-footer">
            Nuk ke llogari? <Link to="/regjistrohu">Regjistrohu</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
