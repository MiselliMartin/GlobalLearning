import styles from '../styles/Reports.module.css'
import moment from 'moment'
import { useStore } from '../store/useStore.js'

export const Reports = ({ reports }) => {
  const user = useStore((store) => store.user)
  //const isLoading = useStore((store) => store.isLoading )

  return (
    <>
      <div className={styles.container}>
        {reports.length > 0 ? (
          reports.map((report) => {
            return (
              <div key={report.id} className={`${styles.card} ${styles[report.type.toLowerCase()]}`}>
                <h2>{report.title}</h2>
                <h3>{report.description}</h3>
                <p>
                  {report.type === 'PERSON' ?? 'Persona'}
                  {report.type === 'PET' ?? 'Mascota'}
                  {report.type === 'OBJECT' ?? 'Objeto'}
                </p>
                <p>{moment(report.createdAt).format('DD/MM/YYYY')}</p>
                <p>{report.city}</p>
                <p>{report.state}</p>
                <p>
                  {report.status === 'OPEN' ?? 'Abierto'}
                  {report.status === 'SOLVING' ?? 'En resolución'}
                  {report.status === 'SOLVED' ?? 'Resuelto'}
                </p>
                {user && report.userId === user.id ? <p>Es tuyo</p> : null}
              </div>
            )
          })
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </>
  )
}
