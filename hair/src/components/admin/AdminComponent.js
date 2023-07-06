import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { AuthContext } from '../../context/Auth';

import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const usuariosColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 120,
    editable: true,
  },
];

const productosColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 150,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Categoría',
    width: 150,
    editable: true,
  },
  {
    field: 'subcategory',
    headerName: 'Subcategoría',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Precio',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    width: 250,
    editable: true,
  },
];

const AdminComponent = () => {
  const {modoOscuro}= useContext(AuthContext) 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (Auth.auth.role !== 'Admin') {
      navigate('/');
    }
  }, [Auth]);

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product');
      const productData = response.data.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      setProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/usuarios');
      const userData = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(userData);
 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>
      <div className={style.AdminContainer + (!modoOscuro ? ' ' + style.AdminContainerDark : '')}>
        <div className={style.Container}>
          <h1 className={style.title}>USUARIOS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={usuariosColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
            />
          </Box>
        </div>

        <div className={style.Container}>
          <h1 className={style.title}>PRODUCTOS</h1>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={productosColumns}
              autoPageSize
              checkboxSelection
              disableColumnSelector
              disableColumnMenu
        
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;