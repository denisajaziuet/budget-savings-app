import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { useRegisterMutation } from '../store/apis/userApi';
import { setUser } from '../store/slices/userSlice';
import Spinner from '../components/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
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

    if (!name || !email || !password || !password2) {
      toast.error('Ju lutem plotësoni të gjitha fushat');
      return;
    }

    if (password !== password2) {
      toast.error('Fjalëkalimet nuk përputhen');
      return;
    }

    try {
      const response = await register({ name, email, password }).unwrap();
      dispatch(setUser(response));
      localStorage.setItem('user', JSON.stringify(response));
      toast.success('Regjistrimi u krye me sukses!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || 'Regjistrimi dështoi');
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-hero">
          <p className="eyebrow">Regjistrim</p>
          <h1><FaUserPlus /> Krijo llogari</h1>
          <p>
            Hap një llogari për të ruajtur shpenzimet dhe për të ndjekur buxhetin tënd çdo ditë.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Emri</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="p.sh. Denis"
            />
          </label>

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
              placeholder="Krijo një fjalëkalim"
            />
          </label>

          <label className="field">
            <span>Përsërit fjalëkalimin</span>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Shkruaje përsëri"
            />
          </label>

          <button className="btn btn-primary full-width" type="submit">
            Regjistrohu
          </button>

          <p className="auth-footer">
            Ke tashmë llogari? <Link to="/hyrje">Hyr</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
