import Product from "../models/Product.js";



const obtenerProducts = async (req, res) => {
  let limit = req.query.limit || null; // Obtener el límite de la consulta si se proporciona en los parámetros de la solicitud
  const query = Product.find();
  if (limit) {
    query.limit(parseInt(limit)); // Convertir el límite a un número entero y establecerlo en la consulta
  }
  const products = await query.exec();
  res.json(products);
};

const nuevoProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const ProductAlmacenado = await product.save();
    res.json({msg: 'cerando usuario'});
  } catch (error) {
    console.log(error);
  }
};
const obtenerProductPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};




export {
obtenerProducts,
nuevoProduct,
obtenerProductPorId,
 
};
