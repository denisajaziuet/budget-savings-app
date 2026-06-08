import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="page container">
      <div className="panel-card center-card">
        <p className="eyebrow">404</p>
        <h1>Faqja nuk u gjet</h1>
        <p>
          Kjo faqe nuk ekziston. Mund të kthehesh te paneli ose të hysh në llogari.
        </p>

        <div className="button-row">
          <Link className="btn btn-primary" to="/">
            Kthehu te paneli
          </Link>
          <Link className="btn btn-light" to="/hyrje">
            Hyrje
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
