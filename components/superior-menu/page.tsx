import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';

const SuperiorMenu = () => {
  return (
      <div className="container">
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.SuperiorMenu}`}>
        <div className="navbar-brand d-flex align-items-center">
          <img src="/vercel.svg" className="d-inline-block align-top" width="40" height="40" alt="Brand logo" />
          <h1 className="ml-2">Systempunk</h1>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Timeline</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contribute</a>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <p className="mb-0 mr-2">User</p>
          <img src="/file.svg" width="40" height="40" alt="User icon" />
        </div>
    </nav>
    </div>
  );
};

export default SuperiorMenu;