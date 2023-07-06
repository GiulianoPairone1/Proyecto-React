import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  const userId = req.params._id; // Obtén el valor de _id desde los parámetros de la solicitud

  try {
    const usuario = await Usuario.findById(userId).select(
      "-password -createdAt -updatedAt -__v"
    );

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    req.usuario = usuario; // Asigna el usuario encontrado al objeto req

    return next();
  } catch (error) {
    return res.status(500).json({ msg: "Hubo un error" });
  }
};

export default checkAuth;