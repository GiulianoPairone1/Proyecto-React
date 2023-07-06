import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email, usuario } = req.body;

const existeEmail = await Usuario.findOne({ email } );
const existeUsuario = await Usuario.findOne({ usuario } );

 


  if (existeUsuario ) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  if (existeEmail ) {
    const error = new Error("Email ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    // usuario.token = generarId();
    await usuario.save();

    // Enviar el email de confirmacion
    // emailRegistro({
    //   email: usuario.email,
    //   nombre: usuario.nombre,
    //   // token: usuario.token,
    // });

    return res.json({
      msg: "Usuario Creado Correctamente, Ya podes iniciar Sesión",
    });
  } catch (error) {
    return console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  // if (!usuario.confirmado) {
  //   const error = new Error("Tu Cuenta no ha sido confirmada");
  //   return res.status(403).json({ msg: error.message });
  // }

  // Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      usuario: usuario.usuario,
      role: usuario.role

      // token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El Password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
  
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password -createdAt -updatedAt -__v");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al obtener los usuarios" });
  }
};

const perfil = async (req, res) => {
  const userId = req.params._id; // Obtén el valor de _id desde los parámetros de la solicitud

  try {
    const usuario = await Usuario.findById(userId).select(
      "-password  -createdAt -updatedAt -__v"
    );

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario); // Envía los datos del usuario en la respuesta JSON
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

export {
  registrar,
  autenticar,
  obtenerUsuarios,
  perfil,
};
