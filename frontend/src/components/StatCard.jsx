const StatCard = ({ title, value, hint }) => {
  return (
    <article className="stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
      {hint ? <p className="stat-hint">{hint}</p> : null}
    </article>
  );
};

export default StatCard;
