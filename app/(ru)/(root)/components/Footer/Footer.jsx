import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            Uni Food plus. Все права защищены 2025 © <br/> <a href="/privacy-policy">Политика Конфиденциальности</a>
        </footer>
    )
}

export default Footer