import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import StopButton from './StopButton';
import ResetButton from './ResetButton';

function SecondsCounter() {
  const [segundos, setSegundos] = useState(0);
  const [contandoHaciaArriba, setContandoHaciaArriba] = useState(true);
  const [cuentaRegresiva, setCuentaRegresiva] = useState(false);
  const [pausado, setPausado] = useState(false);

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
      <div className="botones">
        <StartButton onStart={handleStart} />
        <StopButton onStop={handleStop} />
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
}

export default SecondsCounter;




























