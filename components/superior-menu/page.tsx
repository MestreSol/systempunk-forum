import styles from './styles.module.css';

const SuperiorMenu = () => {
  return (
    <nav className={styles.SuperiorMenu}>
      <div className={styles.BrandArea}>
        <img src="/vercel.svg"></img>
        <h1>Systempunk</h1>
        <div>
          <input type="text" />
          <button>Search</button>
        </div>
        <ul>
          <li>
            <a>
              Home
            </a>
          </li>
          <li>
            <a>
              Categories
            </a>
          </li>
          <li>
            <a>
            Timeline
            </a>
          </li>
          <li>
            <a>
              Contribute
            </a>
          </li>
        </ul>  
        <div>
          <img src="/file.svg" />
          <p>User</p>
        </div>
      </div>
    </nav>
  );
}

export default SuperiorMenu;