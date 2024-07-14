import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'
import { Markers } from './Markers'

const center = [-34.6287773, -58.5830256] //Por ahora es morón, después debería ser dinámico según ubicación


export const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={15} className={styles.map} scrollWheelZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Markers />
      </MapContainer>
    </div>
  )
}

