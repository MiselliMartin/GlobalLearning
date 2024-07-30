import { useEffect } from 'react';
import { Reports } from '../components/Reports.jsx';
import { useStore } from '../store/useStore.js';


export const NearByReports = () => {
  const userCoordinates = useStore((store) => store.userCoordinates)
  const nearReports = useStore((store) => store.nearReports)
  const { fetchNearReports } = useStore()

  useEffect(() => {
    const isThereReports = async () => {
      if (!nearReports || nearReports.length < 1) {
        await fetchNearReports(userCoordinates[0], userCoordinates[1])
      }
    }
    isThereReports()
  }, [nearReports, fetchNearReports, userCoordinates])



  return (
    <Reports reports={nearReports} />
  );
};
