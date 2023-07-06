import style from "./index.module.css";
import logo from "../../assets/logo.png";
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from "../Cart/Cart";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaHome, FaTimes, FaUser, FaShopify, FaSignInAlt, FaSignOutAlt, FaSun, FaMoon, FaKey } from "react-icons/fa";
import {AuthContext} from "../../context/Auth";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonAdmin from "./ButtonAdmin";


const Header = () => {
  const { autenticarUsuario } = useContext(AuthContext);
  const [ isadmin, setIsAdmin] = useState(false)
  const Auth = useContext(AuthContext) 
  const {modoOscuro,setModoOscuro}= useContext(AuthContext) 


  useEffect(() => {
    if(Auth.auth._id  !== undefined){
      toast.success('Session iniciada', { autoClose: 1500 });   

      setIsAdmin(true)


    }else{
      setIsAdmin(false)
    }

  }, [Auth.auth._id])
 
  


  const [isScrolled, setIsScrolled] = useState(false);

  // enlace para realizar un seguimiento de si el usuario se ha desplazado hacia abajo en la página o no
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  // Agregamos un detector de eventos al objeto de la ventana para escuchar los eventos de desplazamiento y actualizar el estado.
  window.addEventListener("scroll", handleScroll);

  const [clicked, setClicked] = useState(false)

  const handelModocuro = () => {
  
    setModoOscuro(!modoOscuro)
 
  }
  const handleClick = () => {
    //cuando esta true lo pasa al false y viceversa
    setClicked(!clicked);

  }
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
}
  
const handlerSingOut = () => {
  toast.error('Session cerrada', { autoClose: 1500 });

  localStorage.removeItem('_id'); // Elimina el _id del almacenamiento local
  autenticarUsuario(); // Llama a autenticarUsuario desde el contexto para actualizar el estado de autenticación
  
};
  return (
    
    <>
    
      <header className={`${style.header} ${isScrolled ? style.scrolled : ""}`}>
      
      <div className={style.burguer}>

        {clicked ? (

        <motion.div
        whileHover={{ scale: 1.15 }}
         transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <FaTimes className={`${style.navicon} }`} onClick={handleClick} />
        </motion.div>

        ):
        <motion.div
      
        whileHover={{ scale: 1.15 }}
         transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <FaBars className={`${style.navicon} }`} onClick={handleClick} />
        </motion.div>
        }
          </div>
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        transition={{
          duration:2,
          delay:0.2
        }}
        
        
        className={` ${isScrolled ? style.logoScroll : style.logo}`}>
          
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
         
        </motion.div>
        <nav onClick={handleLinkClick} className={`${style.nav1} }`}>
          <Link to="/"><FaHome/> INICIO</Link>
          
          <Link to='/products'><FaShopify/> Productos</Link>
          {isadmin ? (
            <Link to="/admin"><FaKey/>PANEL</Link>
          ): null}
          {Auth.auth._id  ? (
            <>
            <ToastContainer />
             <Link to='/perfil'><FaUser/> Perfil</Link>
              <Link onClick={handlerSingOut}><FaSignOutAlt/>Cerrar Sesión</Link>
              </>
          ): (
            <> 
            <ToastContainer />
            <Link to="/login"><FaSignInAlt/> Iniciar sesión</Link>
            </> 
          )}
          <a onClick={handelModocuro} style={{color:"#fff"}}>
             
          
            {!modoOscuro ?
           
            <FaMoon className={style.oscuro}/>
            :
            <FaSun className={style.oscuro}/>
          }
            
          

          </a>
          

        </nav>
        <AnimatePresence>
        {clicked ? (
        <motion.nav 
        animate={{ y: "0%", opacity: 1 }}
       initial={{  y: "-100%", opacity: 0}}
       exit={{ x: "-100%", opacity: 1 }}
       transition={{duration: .5}}
        onClick={handleLinkClick} className={`${style.nav} ${clicked ? isScrolled ? style.activeScroll : style.active : ""}`}>
          <Link onClick={handleClick} to="/"><FaHome/> INICIO</Link>
          
          <Link onClick={handleClick} to='/products'><FaShopify/> Productos</Link>
          
          {Auth.auth._id  ? (
            <>
             <Link onClick={handleClick} to='/perfil'><FaUser/> Perfil</Link>
              <Link  onClick={() => { handlerSingOut();handleClick();}}><FaSignOutAlt/>Cerrar Sesión</Link>
              </>
          ): ( 
            <Link to="/signin"><FaSignInAlt/> Iniciar sesión </Link>
       
          )}

        </motion.nav>
        ):null}
        </AnimatePresence>
       
        <Cart />
      </header>
    </>
  );
};

export default Header;
