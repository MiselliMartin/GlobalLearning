import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { useStore } from '../store/useStore.js'
import 'leaflet/dist/leaflet.css';
import styles from '../styles/Map.module.css';
import { Markers } from './Markers';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const defaultCenter = [-34.6290908, -58.5744255]; // Default el Posadas

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    }
  });
  return null;
};

// Hook to update the map center
const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

export const Map = () => {
  const [center, setCenter] = useState(defaultCenter);
  const user = useStore((store) => store.user)
  const errorCreate = useStore((store) => store.error)
  //const isLoading = useStore((store) => store.isLoading)
  const { createReport, setUserCoordinates, setError, fetchNearReports } = useStore()
  const navigate = useNavigate()


  const getCityAndState = async (lat, lng) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
      const city = response.data.address.city ? response.data.address.city : response.data.address.town
      const state = response.data.address.state_district
      return { city, state }
    } catch (e) {
      console.log(e)
      return { city: 'Unknown', state: 'Unknown' }
    }
  }

  const handleMapClick = async (position) => {
    const { lat, lng } = position
    const { city, state } = await getCityAndState(position.lat, position.lng)
    const MySwal = withReactContent(Swal);

    if (user) {
      MySwal.fire({
        title: 'Crear reporte:',
        html: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="Título"
              className="swal2-input"
              id="swal-input1"
            />
            <textarea
              placeholder="Descripción. Sea lo más descriptivo que pueda para facilitar su búsqueda"
              className="swal2-textarea"
              id="swal-input2"
            ></textarea>
            <select
              className="swal2-select"
              id="swal-input3"
            >
              <option value="">Seleccione un tipo:</option>
              <option value="PERSON">Persona</option>
              <option value="PET">Mascota</option>
              <option value="OBJECT">Objeto</option>
            </select>
          </div>
        ),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Crear reporte!",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        preConfirm: () => {
          const title = document.getElementById('swal-input1').value;
          const description = document.getElementById('swal-input2').value;
          const type = document.getElementById('swal-input3').value;

          if (!title || !description || !type) {
            Swal.showValidationMessage('Es necesario llenar todos los campos');
            return;
          }

          return { title, description, type };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { title, description, type } = result.value;
          const coordinates = [lat, lng]
          const report = { title, description, type, city, state, coordinates }
          try {
            const newReport = await createReport(report)
            if (newReport) {
              const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
              });
              Toast.fire({
                icon: "success",
                title: "Reporte creado"
              });
            }
            else {
              const Toast2 = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
              });
              Toast2.fire({
                icon: "error",
                title: "Ups... algo salió mal",
                text: { errorCreate }
              });
            }
          } catch (error) {
            const Toast3 = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 2000,
            });
            Toast3.fire({
              icon: "error",
              title: "Ups... algo salió mal",
              text: { errorCreate }
            });
          }
        }
      });
    } else {
      MySwal.fire({
        html: "Debe iniciar sesión para crear un reporte!",
        icon: "warning",
        timerProgressBar: true,
        reverseButtons: true,
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Iniciar Sesión',
        confirmButtonColor: '#3bb33b',
        cancelButtonText: 'Cerrar',
        cancelButtonColor: '#cd4343',
        denyButtonText: 'Registrarse',
        denyButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } if (result.isDenied) {
          navigate('/register')
        }
      });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
          setUserCoordinates([position.coords.latitude, position.coords.longitude])
          fetchNearReports(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
    return (
      setError(null)
    )
  }, [createReport]);

  return (
    <div className={styles.mapContainer} id='mapContainer'>
      <MapContainer center={center} zoom={15} className={styles.map} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Markers />
        <MapClickHandler onMapClick={handleMapClick} />
        <UpdateMapCenter center={center} />
      </MapContainer>
    </div>
  );
};
