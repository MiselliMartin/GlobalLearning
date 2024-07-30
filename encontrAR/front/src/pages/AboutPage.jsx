import styles from '../styles/AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.container} id='top'>
      <h1 className={styles.title}>🗺️ encontrAR</h1>
      <h2 className={styles.subtitle}>Introducción</h2>
      <p className={styles.text}>
        ¡Bienvenides a encontrAR! 🎉
      </p>
      <p className={styles.text}>
        encontrAR es una aplicación web diseñada para conectar objetos, mascotas y personas perdidas con la gente que las busca. Nuestra plataforma permite a los usuarios crear y visualizar reportes geolocalizados, facilitando la búsqueda y recuperación de lo que se ha perdido.
      </p>
      <h2 className={styles.subtitle}>Características Principales</h2>
      <ul className={styles.features}>
        <li>🔍 <strong>Reporte de Objetos, Personas y Mascotas</strong></li>
        <li>Reportes Geolocalizados: Puedes crear reportes con la ubicación exacta donde se perdió o encontró algo.</li>
        <li>Categorías: Clasifica tu reporte como un objeto, una persona o una mascota, lo que facilita la búsqueda para otros usuarios.</li>
        <li>🗺️ <strong>Mapa Interactivo</strong></li>
        <li>Visualización de Reportes: Todos los reportes se muestran en un mapa interactivo para que puedas ver rápidamente qué hay cerca de ti.</li>
        <li>Marcadores Personalizados: Los reportes se diferencian con marcadores de colores y formas específicas según su categoría.</li>
        <li>💬 <strong>Comentarios</strong></li>
        <li>Interacción con la Comunidad: Cada reporte tiene una sección de comentarios donde los usuarios pueden dejar información adicional o coordinar la recuperación.</li>
      </ul>
      <h2 className={styles.subtitle}>Cómo Funciona</h2>
      <ol className={styles.steps}>
        <li><strong>Registro e Inicio de Sesión</strong></li>
        <p className={styles.text}>
          Para empezar a utilizar EncontrAR, necesitas registrarte e iniciar sesión. Esto nos permite asegurarnos de que cada reporte y comentario provenga de una fuente confiable.
        </p>
        <li><strong>Crear un Reporte</strong></li>
        <p className={styles.text}>
          Una vez que hayas iniciado sesión, puedes crear un reporte:
        </p>
        <ul>
          <li>Haz clic en cualquier parte del mapa.</li>
          <li>Completa la información requerida: título, descripción y tipo y clickea crear reporte</li>
          <li>¡Listo! Tu reporte aparecerá en el mapa para que otros usuarios lo vean.</li>
        </ul>
        <li><strong>Buscar y Comentar</strong></li>
        <p className={styles.text}>
          Usa el mapa para explorar los reportes cercanos:

          Haz clic en un marcador para ver más detalles y, si tienes información relevante, deja un comentario para ayudar.
        </p>
        <ul>
          <li>Los marcadores azules representan objetos.</li>
          <li>Los marcadores rojos representan personas.</li>
          <li>Los marcadores verdes representan mascotas.</li>
        </ul>
        <li><strong>Gestionar tus Reportes</strong></li>
        <p className={styles.text}>
          En tu perfil, puedes ver y gestionar todos los reportes que has creado, así como actualizar la información si algo cambia.
        </p>
      </ol>
      <h2 className={styles.subtitle}>Ventajas y Posibilidades</h2>
      <ul className={styles.advantages}>
        <li>🏆 <strong>Comunidad Colaborativa</strong></li>
        <li>Trabajo en Equipo: Encuentra más rápido lo que has perdido con la ayuda de tu comunidad.</li>
        <li>Seguridad y Confianza: Solo los usuarios registrados pueden crear reportes y comentar, asegurando un entorno seguro.</li>
        <li>🌍 <strong>Conexión Global</strong></li>
        <li>Accesibilidad: La aplicación es accesible desde cualquier dispositivo con conexión a internet.</li>
        <li>Expansión: Úsala en tu barrio, ciudad o cualquier lugar del mundo.</li>
        <li>📈 <strong>Fácil de Usar</strong></li>
        <li>Interfaz Intuitiva: Diseñada pensando en el usuario para una navegación sencilla y efectiva.</li>
        <li>Actualizaciones Constantes: Estamos continuamente mejorando la plataforma para brindarte la mejor experiencia.</li>
      </ul>
      <h2 className={styles.subtitle}>Contribuir</h2>
      <p className={styles.text}>
        encontrAR es un proyecto en constante crecimiento y alejado de egos. Si tu idea está piola y suma, pull request!
      </p>
      <p className={styles.text}>
        Gracias por ser parte de encontrAR. En tiempos de individualismos, organización colectiva y humanismo 💚
      </p>
    </div>
  );
};

