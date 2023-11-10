import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import StopButton from './StopButton';
import ResetButton from './ResetButton';
import Alert from './Alert';
import 'react-toastify/dist/ReactToastify.css';

function SecondsCounter() {
  const [segundos, setSegundos] = useState(0);
  const [contandoHaciaArriba, setContandoHaciaArriba] = useState(true);
  const [cuentaRegresiva, setCuentaRegresiva] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tiempoObjetivo, setTiempoObjetivo] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStart = () => {
    setPausado(false);

    if (cuentaRegresiva) {
      setContandoHaciaArriba(false);
    } else {
      setContandoHaciaArriba(true);
    }
  };

  const handleStop = () => {
    setPausado(true);
  };

  const handleReset = () => {
    setPausado(false);
    setSegundos(0);
    setContandoHaciaArriba(!cuentaRegresiva);
    setCuentaRegresiva(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSetAlert = () => {
    const segundosInput = parseInt(inputValue, 10);
    if (!isNaN(segundosInput)) {
      setTiempoObjetivo(segundosInput);
      setShowAlert(false);
    }
  };

  useEffect(() => {
    if (segundos === tiempoObjetivo && tiempoObjetivo !== 0) {
      setShowAlert(true);
    }
  }, [segundos, tiempoObjetivo]);

  useEffect(() => {
    let intervalId;

    if (!pausado) {
      if (contandoHaciaArriba) {
        intervalId = setInterval(() => {
          if (segundos < 60) {
            setSegundos(segundos + 1);
          } else {
            setContandoHaciaArriba(false);
            setCuentaRegresiva(true);
          }
        }, 1000);
      } else if (cuentaRegresiva) {
        intervalId = setInterval(() => {
          if (segundos > 0) {
            setSegundos(segundos - 1);
          } else {
            setContandoHaciaArriba(true);
            setCuentaRegresiva(false);
          }
        }, 1000);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [segundos, contandoHaciaArriba, cuentaRegresiva, pausado]);

  const maxDigitCount = 6;

  const formatDigits = (digit) => {
    return digit.toString().padStart(maxDigitCount, '0').slice(-maxDigitCount);
  };

  const secondsString = formatDigits(segundos);

  return (
    <div className="contador-container">
      <div className="contador">
        <div className="reloj">
          <i className="far fa-clock"></i>
        </div>
        <div className="digitos">
          {secondsString.split('').map((digit, index) => (
            <div className="digito" key={index}>
              {digit}
            </div>
          ))}
        </div>
      </div>
      <div className="botones-container">
        <div className="botones">
          <StartButton onStart={handleStart} />
          <StopButton onStop={handleStop} />
          <ResetButton onReset={handleReset} />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Ingresa segundos"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSetAlert}>Establecer Alerta</button>
        </div>
      </div>
      <Alert showAlert={showAlert} onClose={handleCloseAlert} />
    </div>
  );
}

export default SecondsCounter;

































