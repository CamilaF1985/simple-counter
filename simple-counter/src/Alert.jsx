import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alert({ showAlert, onClose }) {
  const [showAlertInternal, setShowAlertInternal] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setShowAlertInternal(true);
    }

    // Limpiar el estado cuando el componente se desmonta
    return () => {
      setShowAlertInternal(false);
    };
  }, [showAlert]);

  useEffect(() => {
    if (showAlertInternal) {
      toast.info('¡La alerta ha aparecido!', {
        autoClose: 5000,
        onClose: () => {
          onClose();
          setShowAlertInternal(false);
        },
      });
    }
  }, [showAlertInternal, onClose]);

  return <ToastContainer position="top-right" />;
}

export default Alert;




