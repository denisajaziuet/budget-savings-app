import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlusCircle, FaPiggyBank } from 'react-icons/fa';
import { useGetExpensesQuery } from '../store/apis/expenseApi';
import Spinner from '../components/Spinner';
import StatCard from '../components/StatCard';
import { formatCurrency, formatDateTime } from '../utils/format';

const monthlyBudget = 50000;

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const {
    data: expenses = [],
    isLoading,
    isError,
    error,
  } = useGetExpensesQuery(undefined, { skip: !user });

  useEffect(() => {
    if (!user) {
      navigate('/hyrje');
    }
  }, [user, navigate]);

  const stats = useMemo(() => {
    const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const count = expenses.length;
    const average = count ? total / count : 0;
    const highest = expenses.reduce(
      (max, item) => (Number(item.amount || 0) > Number(max.amount || 0) ? item : max),
      expenses[0] || null
    );

    return { total, count, average, highest };
  }, [expenses]);

  const remainingBudget = monthlyBudget - stats.total;

  const categoryTotals = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount || 0);
    });

    return totals;
  }, [expenses]);

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <section className="page container">
        <div className="panel-card">
          <h2>Ndodhi një gabim</h2>
          <p>{error?.data?.message || 'Nuk u arrit të ngarkohen shpenzimet.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page container dashboard-page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Paneli</p>
          <h1>Përshëndetje, {user?.name || 'Përdorues'} 👋</h1>
          <p className="hero-text">
            Këtu mund të shohësh pamjen e përgjithshme të shpenzimeve të tua, të kesh kontroll
            mbi buxhetin dhe të hysh menjëherë te menaxhimi i tyre.
          </p>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/shpenzimet')}>
            <FaPlusCircle />
            Menaxho shpenzimet
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Totali i shpenzimeve"
          value={formatCurrency(stats.total)}
          hint="Shuma totale e ruajtur"
        />
        <StatCard
          title="Numri i shpenzimeve"
          value={stats.count}
          hint="Të gjitha regjistrimet"
        />
        <StatCard
          title="Mesatarja"
          value={formatCurrency(stats.average)}
          hint="Mesatare për shpenzim"
        />
        <StatCard
          title="Më i madhi"
          value={stats.highest ? formatCurrency(stats.highest.amount) : formatCurrency(0)}
          hint={stats.highest ? stats.highest.description : 'Pa shpenzime ende'}
        />
      </div>

      <div className="two-column-layout">
        <section className="panel-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Buxheti</p>
              <h2>Buxheti mujor</h2>
            </div>
          </div>

          <div className="stats-grid stats-grid-3">
            <div className="stat-card">
              <p className="stat-title">Limiti</p>
              <h3 className="stat-value">{formatCurrency(monthlyBudget)}</h3>
            </div>

            <div className="stat-card">
              <p className="stat-title">Shpenzuar</p>
              <h3 className="stat-value">{formatCurrency(stats.total)}</h3>
            </div>

            <div className="stat-card">
              <p className="stat-title">Mbetur</p>
              <h3 className="stat-value">{formatCurrency(remainingBudget)}</h3>
            </div>
          </div>
        </section>

        <section className="panel-card highlight-card">
          <FaPiggyBank className="big-icon" />
          <h2>Mbaje buxhetin nën kontroll</h2>
          <p>
            Aplikacioni ruan çdo shpenzim në MongoDB dhe i mban të ndara sipas përdoruesit.
            Çdo shpenzim ruhet në mënyrë të sigurt dhe mund të përditësohet ose fshihet në çdo moment.
          </p>
          <button className="btn btn-light" onClick={() => navigate('/shpenzimet')}>
            Shko te shpenzimet
          </button>
        </section>
      </div>

      <section className="panel-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Analitikë</p>
            <h2>Shpenzime sipas kategorisë</h2>
          </div>
        </div>

        {expenses.length ? (
          <div className="progress-list">
            {Object.entries(categoryTotals).map(([category, total]) => {
              const percent = stats.total ? (total / stats.total) * 100 : 0;

              return (
                <div key={category} className="progress-item">
                  <div className="progress-label">
                    <span>{category}</span>
                    <strong>{formatCurrency(total)}</strong>
                  </div>

                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nuk ka ende shpenzime.</h3>
            <p>Shto shpenzimin e parë nga faqja e menaxhimit.</p>
          </div>
        )}
      </section>

      <section className="panel-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shpenzim i fundit</p>
            <h2>Aktiviteti më i fundit</h2>
          </div>
        </div>

        {expenses.length ? (
          <div className="mini-list">
            {expenses.slice(0, 3).map((expense) => (
              <article className="mini-item" key={expense._id}>
                <div>
                  <strong>{expense.description}</strong>
                  <p>{formatDateTime(expense.createdAt)}</p>
                </div>
                <div className="mini-right">
                  <span className="badge">{expense.category}</span>
                  <div className="mini-amount">{formatCurrency(expense.amount)}</div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nuk ka ende shpenzime.</h3>
            <p>Shto shpenzimin e parë nga faqja e menaxhimit.</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default Dashboard;