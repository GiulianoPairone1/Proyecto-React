import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import style from './index.module.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';
import { Link } from 'react-router-dom';
import { FaCity, FaTimes } from 'react-icons/fa';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Step, StepLabel, Stepper } from '@material-ui/core';

const BuyForm = () => {
  const steps = ['Datos Personales', 'Dirección', 'Pagar'];

  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [card, setCard] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [province, setProvince] = useState('');
  const { modoOscuro } = useContext(AuthContext);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!validateStep1()) {
        return;
      }
    }else if (activeStep === 1){
        if (!validateStep2()) {
            return;
          }
    }
    setActiveStep(prevStep => prevStep + 1);
}
  
  const validateStep2 = () => {
    if (address.trim() === '' || city.trim() === '' || postalcode.trim() === '' || province.trim() === '') {
      toast.error('Por favor, complete todos los campos',{
        autoClose: 1000, 
      });
      return false;
    }
    return true;
  };
  const validateStep1 = () => {
    if (name.trim() === '' || lastname.trim() === '') {
      toast.error('Por favor, complete todos los campos',{
        autoClose: 1000, 
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    handleNext();
  };
  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1
        }
      }}
      exit={{ opacity: 0 }}
      className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}
    >
        
      <form className={style.formreg} onSubmit={handleSubmit}>
      <h1 className={style.title}> Checkout</h1>
        <Stepper className={style.puntos + (!modoOscuro ? ' ' + style.puntosDark : '')}  activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
       
 

        {activeStep === 0 && (
            
          <div>
            <h2 className={style.tittle}>Datos Personales</h2>
            <div className={style.divcontainer}>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                className={style.inputcontainer}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={style.divcontainer}>
              <input
                id="lastname"
                type="text"
                placeholder="Apellido"
                className={style.inputcontainer}
                value={lastname}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h2 className={style.tittle}>Dirrección</h2>
            <div className={style.divcontainer}>
              <input
                id="province"
                type="text"
                placeholder="Provincia"
                className={style.inputcontainer}
                value={province}
                onChange={e => setProvince(e.target.value)}
              />
            </div>
            <div className={style.divcontainer}>
              <input
                id="city"
                type="text"
                placeholder="Ciudad"
                className={style.inputcontainer}
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className={style.divcontainer}>
              <input
                id="address"
                type="text"
                placeholder="Dirección"
                className={style.inputcontainer}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className={style.divcontainer}>
              <input
                id="postalcode"
                type="number"
                placeholder="Código Postal"
                className={style.inputcontainer}
                value={postalcode}
                onChange={e => setPostalcode(e.target.value)}
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2 className={style.tittle}>PAGAR</h2>
            <PayPalScriptProvider>
                <PayPalButtons/>
            </PayPalScriptProvider>
          </div>
        )}

        <div className={style.divcontainer}>
          {activeStep == steps.length - 1  ? (
            null
          ) : (
            <input type="submit" value="Siguiente" className={style.button}  />
          )}
          {activeStep > 0 && (
      <button type="button" className={style.button} onClick={handleBack}>
        Atras
      </button>
    )}
          <div className={style.buttons}>
            
            <Link className={style.a} to="/cart">
              <button className={style.com}>Volver al Carrito</button>
            </Link>
          </div>
        </div>
        
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default BuyForm;