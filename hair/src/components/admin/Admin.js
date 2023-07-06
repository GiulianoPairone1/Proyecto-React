import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { AuthContext } from '../../context/Auth';

const Admin = () => {
   
  const navigate = useNavigate();

  const Auth = useContext(AuthContext);
    console.log("Adasd",Auth.auth.role)

//   useEffect(() => {
//     if(Auth.auth._id  !== undefined){
    
//       console.log(Auth.auth._id)
//       // console.log(Auth.auth.role)

//     }

//   }, [Auth.auth._id])
  useEffect(() => {
    
    if (Auth.auth.role !== "Admin" ){
        
                navigate('/');

    }
  }, [Auth]);

  return (
    <div className={style.main}>ADMIN</div>
  );
}

export default Admin;