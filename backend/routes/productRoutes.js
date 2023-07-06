import express from "express";
import { nuevoProduct, obtenerProducts, obtenerProductPorId } from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(obtenerProducts)
  .post(nuevoProduct);

router.route("/:id").get(obtenerProductPorId);

export default router;