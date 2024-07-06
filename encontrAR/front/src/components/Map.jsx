import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/Map.module.css'

const center = [-34.6287773, -58.5830256] //Por ahora es morón, después debería ser dinámico según ubicación

//la idea es que markers venga de la tabla reporte o item o objeto, con su latitud y longitud y datos para el pop up
const markers = [
  {
    geocode: [-34.628994, -58.579625],
    popUp: 'Billetera marrón',
    category: 'object'
  },
  {
    geocode: [-34.629523, -58.582017],
    popUp: 'Norma, adulta mayor',
    category: 'person'
  },
  {
    geocode: [-34.627577, -58.580805],
    popUp: 'Roco, ovejero alemán',
    category: 'animal'
  }
]

//Según categoría de reporte
// const icons = [
//   {
//     iconUrl: ,
//     iconSize: [20, 20]
//   },
//   {
//     iconUrl: ,
//     iconSize: [40, 40]
//   },
//   {
//     iconUrl: ,
//     iconSize: [30, 30]
//   }

// ]

export const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={15} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {
          markers.map((marker) => (
            marker.category === 'OBJECT' ?
              <Marker key={marker.geocode} position={marker.geocode} title={marker.category}>
                <Popup>{marker.popUp}</Popup>
              </Marker> :
              marker.category === 'PERSON' ?
                <CircleMarker key={marker.geocode} center={marker.geocode} radius={50} fillColor='#ee3131' color='#ee0e0e' stroke={true} fillOpacity={0.8}>
                  <Popup>{marker.popUp}</Popup>
                </CircleMarker> :
                <CircleMarker key={marker.geocode} center={marker.geocode} radius={50} fillColor='#ff7800' color='#ff5a33' stroke={true} fillOpacity={0.8}>
                  <Popup>{marker.popUp}</Popup>
                </CircleMarker>

          ))
        }
      </MapContainer>
    </div>
  )
}

