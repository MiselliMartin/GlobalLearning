import { HashLink as Link } from 'react-router-hash-link'
import styles from '../styles/Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        En encontrAR, creemos en el poder de la comunidad para ayudarnos entre todes. ¡Gracias por ser parte de esta red de apoyo!
      </p>
      <Link className={styles.link} smooth to="/about#top">¿Qué es encontrAR?</Link>
    </footer>
  )
}
