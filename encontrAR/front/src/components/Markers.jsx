import { CircleMarker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import { useStore } from '../store/useStore.js'

export const Markers = () => {
  const reports = useStore((store) => store.reports)
  const { fetchReports } = useStore()

  useEffect(() => {
    fetchReports();
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

