import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import StopButton from './StopButton';
import ResetButton from './ResetButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SecondsCounter() {

    // Declara variables de estado y establece valores iniciales
  const [segundos, setSegundos] = useState(0);
  const [contandoHaciaArriba, setContandoHaciaArriba] = useState(true);
  const [pausado, setPausado] = useState(false);
  const [inputValueCountdown, setInputValueCountdown] = useState('');
  const [inputValueAlert, setInputValueAlert] = useState('');
  const [tiempoObjetivoCountdown, setTiempoObjetivoCountdown] = useState(0);
  const [tiempoObjetivoAlert, setTiempoObjetivoAlert] = useState(0);

  // Maneja el cambio en el input de la cuenta regresiva
  const handleInputCountdownChange = (e) => {
    setInputValueCountdown(e.target.value);
  };

  // Maneja el cambio en el input de la alerta
  const handleInputAlertChange = (e) => {
    setInputValueAlert(e.target.value);
  };

  // Inicia el contador
  const handleStart = () => {
    setPausado(false);
  };

  // Detiene el contador
  const handleStop = () => {
    setPausado(true);
  };

  // Reinicia el contador
  const handleReset = () => {
    setPausado(false);
    setSegundos(0);
    setContandoHaciaArriba(true);
  };

  // Establece la cuenta regresiva
  const handleSetCountdown = () => {
    const segundosInput = parseInt(inputValueCountdown, 10);
    if (!isNaN(segundosInput)) {
      setContandoHaciaArriba(true);
      setPausado(false);
      setTiempoObjetivoCountdown(segundosInput);
      toast.success('Cuenta regresiva establecida');
    }
  };

  // Establece la alerta
  const handleSetAlert = () => {
    const segundosInput = parseInt(inputValueAlert, 10);
    if (!isNaN(segundosInput)) {
      setTiempoObjetivoAlert(segundosInput);
      toast.success('Alerta establecida');
    }
  };

  // Efecto para manejar la lógica del contador
  useEffect(() => {
    let intervalId;

    if (!pausado) {
      intervalId = setInterval(() => {
        if (contandoHaciaArriba) {
          setSegundos((prevSegundos) => prevSegundos + 1);
        } else if (segundos > 0) {
          setSegundos((prevSegundos) => prevSegundos - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [segundos, contandoHaciaArriba, pausado, tiempoObjetivoCountdown]);

  // Efecto para mostrar mensajes de éxito
  useEffect(() => {
    if (!pausado && contandoHaciaArriba && segundos === tiempoObjetivoCountdown && tiempoObjetivoCountdown !== 0) {
      setContandoHaciaArriba(false);
      toast.success('Inicia la cuenta regresiva...');
    }

    if (segundos === tiempoObjetivoAlert && tiempoObjetivoAlert !== 0) {
      toast.success('Alerta activada');
    }
  }, [segundos, tiempoObjetivoCountdown, pausado, tiempoObjetivoAlert, contandoHaciaArriba]);

  // Renderiza el componente
  return (
    <div className="contador-container">
      <div className="contador">
        <div className="reloj">
          <i className="far fa-clock"></i>
        </div>
        <div className="digitos">
          {/* Muestra los dígitos del contador */}
          {segundos.toString().padStart(6, '0').split('').map((digit, index) => (
            <div className="digito" key={index}>
              {digit}
            </div>
          ))}
        </div>
      </div>
      <div className="botones-container">
        <div className="botones">
          {/* Botones para iniciar, detener y reiniciar el contador */}
          <StartButton onStart={handleStart} />
          <StopButton onStop={handleStop} />
          <ResetButton onReset={handleReset} />
        </div>
        <div className="input-container">
          {/* Input y botón para establecer la cuenta regresiva */}
          <input
            type="number"
            placeholder="Ingresa segundos cuenta regresiva"
            value={inputValueCountdown}
            onChange={handleInputCountdownChange}
          />
          <button onClick={handleSetCountdown}>Establecer Cuenta Regresiva</button>
        </div>
        <div className="input-container">
          {/* Input y botón para establecer la alerta */}
          <input
            type="number"
            placeholder="Ingresa segundos para la alerta"
            value={inputValueAlert}
            onChange={handleInputAlertChange}
          />
          <button onClick={handleSetAlert}>Establecer Alerta</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SecondsCounter;






































































