import styles from './styles.module.css';

const SuperiorMenu = () => {
  return (
    <nav className={styles.SuperiorMenu}>
      <div>

        <div className={styles.BrandArea}>
          <img src="/vercel.svg"></img>
          <h1>Systempunk</h1>
        </div>
        <ul className={styles.LinkList}>
          <li className={styles.ListItem}>
            <a>
              Home
            </a>
          </li>
          <li className={styles.ListItem}>
            <a>
              Categories
            </a>
          </li>
          <li className={styles.ListItem}>
            <a>
            Timeline
            </a>
          </li>
          <li className={styles.ListItem}>
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
};

export default SuperiorMenu;