import styles from './Styles/header.module.css'

export const Header = () => {
    return (
        <div className="header" style={{ textAlign: "center" }}>
            <h1 className={styles.title}>
                Zera
            </h1>
        </div>
    );
}