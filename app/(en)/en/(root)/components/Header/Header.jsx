import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/en">Uni Food +</a>
        <div className={styles.plus}>+</div>
      </div>
      <a href="/en/login">
        <button className={styles.loginButton}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.83332 4.66667C8.83332 5.67919 8.01251 6.5 6.99999 6.5C5.98747 6.5 5.16666 5.67919 5.16666 4.66667C5.16666 3.65415 5.98747 2.83334 6.99999 2.83334C8.01251 2.83334 8.83332 3.65415 8.83332 4.66667Z" stroke="#222222" strokeLinecap="round" />
            <path d="M2.75358 10.1931C3.15192 8.355 4.88649 7.875 6.7672 7.875H7.2328C9.11352 7.875 10.8481 8.355 11.2464 10.1931V10.1931C11.3369 10.6108 11.0285 11.375 10.6011 11.375H3.39887C2.97147 11.375 2.66306 10.6108 2.75358 10.1931V10.1931Z" stroke="#222222" strokeLinecap="round" />
          </svg>
          Login
        </button>
      </a>
    </header>
  )
}

export default Header