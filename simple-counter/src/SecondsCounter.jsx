import React, { useState, useEffect } from 'react';

function SecondsCounter() {
    const [segundos, setSegundos] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSegundos(segundos + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [segundos]);

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
        </div>
    );
}

export default SecondsCounter;
