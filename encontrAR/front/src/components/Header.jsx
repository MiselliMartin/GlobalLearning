import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore.js'

export const Header = () => {
  const user = useStore((store) => store.user);
  const { logout } = useStore()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (isOpen && !e.target.closest(`.${styles.menuContainer}`)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        encontr<span className={styles.ar}>AR</span>
      </Link>
      {user ? (
        <div className={styles.menuContainer}>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            ≡
          </button>
          {isOpen && (
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <Link to="/profile">Perfil</Link>
              </li>
              <li className={styles.menuItem}>
                <Link to="/my-reports">Mis reportes</Link>
              </li>
              <li className={styles.menuItem}>
                <Link to="/nearby">Reportes cercanos</Link>
              </li>
              <li className={styles.menuItem} onClick={logout}>
                Cerrar sesión
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className={styles.divOptions}>
          <Link to="/login" className={styles.link}>Iniciar sesión</Link>
          <Link to="/register" className={styles.link}>Registrarse</Link>
        </div>
      )}
    </header>
  );
};
