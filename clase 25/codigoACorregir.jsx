import { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = async () => {
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        console.log('Error al realizar la solicitud');
        setError('Error al realizar la solicitud');
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      setError('Error al cargar los datos. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <>
      {isLoading ?? (<p>Cargando datos...</p>)}
      {error ?? (<p>{error}</p>)}
      {data ?? (
        <>
          <h1>Publicaciones:</h1>
          <ul>
            {data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}