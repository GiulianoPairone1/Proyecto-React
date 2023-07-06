import React, { useContext, useState } from 'react'
import style from './index.module.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/Auth';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";


const Signin = () => {

  const [ nombre, setNombre ] = useState('')
  const [usuario, setUsuario ] = useState('')

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const { modoOscuro } = useContext(AuthContext)

    const handleSubmitRegister = async e => {
        e.preventDefault();

        if([nombre,usuario, email, password, repetirPassword].includes('')) {
        
           toast.error('Todos los campos son obligatorios');
           
           return
                   
        }

        if(password !== repetirPassword ) {
          
            toast.error('Los password no son iguales');

            return
        }

        if(password.length < 6 ) {
           
            toast.error('El Password es muy corto, agrega minimo 6 caracteres');

            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
         
            const { data } = await axios.post(`http://localhost:4000/api/usuarios`, {nombre,usuario, email, password} )
            toast.success('Usurio registrado correctamente');
           

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            toast.error(error.response.data.msg);
           
        }
    }

    const { msg } = alerta

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:10
        },
    }}
    exit={{opacity:0}} className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>

   
        


    
       <form 
            className={style.formreg}
            onSubmit={handleSubmitRegister}
        >
            <Link className={style.x} to="/login"><FaTimes /></Link>
           <h2 className={style.tittle}>Registro</h2>
            <div className={style.divcontainer}>

                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    className={style.inputcontainer}
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className={style.divcontainer}>
                <input
                    id="Usuario"
                    type="text"
                    placeholder="Apellido"
                    className={style.inputcontainer}
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                />
            </div>

            <div className={style.divcontainer}>
                <input
                    id="email"
                    type="email"
                    placeholder="Número de móvil o correo electrónico"
                    className={style.inputcontainer}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div  >
            <div className={style.divcontainer}>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña nueva"
                    className={style.inputcontainer}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className={style.divcontainer}>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repetir contraseña"
                    className={style.inputcontainer}
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <div className={style.divcontainer}>
            <input 
                type="submit"
                value="Crear Cuenta"
                className={style.button}
            />
            </div>
            <div >
          
            <ToastContainer />
         </div>
        </form>
        
    </motion.div >
  )
}

export default Signin