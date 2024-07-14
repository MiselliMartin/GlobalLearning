import { CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

export const Markers = () => {
  const [reports, setReports] = useState([]);

  const getReports = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/allReports');
      const { data } = await response.json();
      console.log(data);
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const MarkerList = ({ reports }) => (
    <>
      {reports.map(marker => (
        <MarkerComponent key={marker.id} marker={marker} />
      ))}
    </>
  );

  const MarkerComponent = ({ marker }) => {
    let fillColor;
    let color;
    switch (marker.type) {
      case 'OBJECT':
        fillColor = 'blue';
        color = 'blue';
        break;
      case 'PERSON':
        fillColor = 'red';
        color = 'red';
        break;
      case 'PET':
        fillColor = 'green';
        color = 'green';
        break;
      default:
        fillColor = '#0000FF';
    }

    return (
      <CircleMarker
        key={marker.id}
        center={marker.coordinates}
        radius={50}
        fillColor={fillColor}
        color={color}
        stroke={false}
      >
        <Popup>
          <div>
            <h3>{marker.title}</h3>
            <p>{marker.description}</p>
          </div>
        </Popup>
      </CircleMarker>
    );
  };

  return <MarkerList reports={reports} />;
};

