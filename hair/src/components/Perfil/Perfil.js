import React, { useContext, useState } from 'react';
import style from './index.module.css';
import { FaEdit, FaRegEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Products from '../Main/Products';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
const Perfil = () => {
    const {modoOscuro}= useContext(AuthContext) 
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(Auth.auth.usuario);
  const [nombre, setNombre] = useState(Auth.auth.nombre);
  const [email, setEmail] = useState(Auth.auth.email);

  if (!Auth.auth._id) {
    navigate('/signin');
    return null;
  }

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleEditClick = (index) => {
    setEditedValue(Auth.auth[index]);
    setEditIndex(index);
  };

  const handleSaveClick = () => {
    if (editIndex === 1) {
      if (editedValue === undefined || editedValue === '') {
        toast.error('Error: Valor indefinido');
      } else {
        setUsuario(editedValue);
        Auth.auth.usuario = editedValue;
        toast.success(`Valor editado: ${editedValue}`);
      }
    } else if (editIndex === 0) {
      if (editedValue === undefined || editedValue === '') {
        toast.error('Error: Valor indefinido');
      } else {
        setNombre(editedValue);
        Auth.auth.nombre = editedValue;
        toast.success(`Valor editado: ${editedValue}`);
      }
    } else if (editIndex === 2) {
      if (editedValue === undefined || editedValue === '') {
        toast.error('Error: Valor indefinido');
      } else {
        setEmail(editedValue);
        Auth.auth.email = editedValue;
        toast.success(`Valor editado: ${editedValue}`);
      }
    } else {
      toast.error('Error: Valor indefinido');
    }
  
    setEditIndex(null);
    setEditedValue('');
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
      className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}> 
    
      <div  className={style.containerPerfil + (!modoOscuro ? ' ' + style.containerPerfilDark : '')}>
        <h1 className={style.title}>PERFIL</h1>
        <div className={style.divContainer}>
          <FaUser  className={style.User + (!modoOscuro ? ' ' + style.UserDark : '')} />
          <section  className={style.sectionUser + (!modoOscuro ? ' ' + style.sectionUserDark : '')}>
            <label>
              <p>Nombre:</p>
              <div className={style.containerEdit}>
                <input
                  type="text"
                  value={editIndex === 0 ? editedValue : Auth.auth.nombre}
                  placeholder={editIndex === 0 ? Auth.auth.nombre : ''}
                  onClick={() => handleEditClick(0)}
                  onChange={handleInputChange}
                />
                {editIndex === 0 && (
                  <FaEdit className={style.btnEdit} onClick={handleSaveClick} />
                )}
              </div>
            </label>
            <label>
              <p>Usuario:</p>
              <div className={style.containerEdit}>
                <input
                  type="text"
                  value={editIndex === 1 ? editedValue : Auth.auth.usuario}
                  placeholder={editIndex === 1 ? Auth.auth.usuario : ''}
                  onClick={() => handleEditClick(1)}
                  onChange={handleInputChange}
                />
                {editIndex === 1 && (
                  <FaEdit className={style.btnEdit} onClick={handleSaveClick} />
                )}
              </div>
            </label>
            <label>
              <p>Email:</p>
              <div className={style.containerEdit}>
                <input
                  type="text"
                  value={editIndex === 2 ? editedValue : Auth.auth.email}
                  placeholder={editIndex === 2 ? Auth.auth.email : ''}
                  onClick={() => handleEditClick(2)}
                  onChange={handleInputChange}
                />
                
                {editIndex === 2 && (
                  <FaEdit className={style.btnEdit} onClick={handleSaveClick} />
                )}
              </div>
            </label>
          </section>
        </div>
        <div className={style.ProductDiv}>
        <EffectCardProduct />
        <Link className={style.icontextProduct} to="/products">
              Buscar Prodcutos! <FaRegEye />
            </Link>
        </div>
        
            
      </div>
       <ToastContainer />
       
    </motion.div>
  );
};

export default Perfil;