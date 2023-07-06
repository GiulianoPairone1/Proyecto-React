import React from 'react'
import style from "./index.module.css";
import { Link } from 'react-router-dom';

const buttonAdmin = () => {
  return (
    <div className={style.btnAdmin}><Link to='/admin'>IR AL PANEL</Link></div>
  )
}

export default buttonAdmin