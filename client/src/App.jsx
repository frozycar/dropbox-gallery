import { useState, useEffect } from 'react';
import Schedule from './components/Schedule';

import './App.css';
import useImages from './hooks/imagesHooks';

// Timer of 10 seconds
const TIMER = 1000;
const SECONDS = 9;

function App() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(SECONDS);
  const { images, error, loading } = useImages();
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
      if (timer === 0) {
        const length = images && images.cars && images.cars.length || 0;
        setCurrentIndex((currentIndex + 1) % length);
        setTimer(SECONDS);
      }
    }, TIMER);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, timer]);

  const renderImage = () => {
    const imageSrc = images.cars[currentIndex];
    return imageSrc !== null ?
      <img src={imageSrc} alt="Car" /> :
      <Schedule data={images.timetable} />
  }

  return (
    <div>
      {
        loading ? <p>Cargando...</p> :
          error ? <p>Error al cargar las imagenes</p> :
            images && images.cars && images.cars.length > 0 ?
              renderImage() :
              <p>No hay imagenes</p>
      }
      
    </div>
  )
}

export default App
