import { useState } from 'react'
import styles from '../styles/Header.module.css'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>encontr<span className={styles.ar}>AR</span></h1>
      <div className={styles.menuContainer}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ≡
        </button>
        {isOpen ? (
          <ul className={styles.menu}>
            <li className={styles.menuItem}>Perfil</li>
            <li className={styles.menuItem}>Mis objetos perdidos</li>
            <li className={styles.menuItem}>Objetos encontrados</li>
          </ul>
        ) : null}
      </div>
    </header>
  )
}

