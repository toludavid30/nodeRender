const express = require("express");
const { addProducts, getAllProducts, getSingleProduct, deleteSingleProduct, updateSingleProduct } = require("../Controllers/Product");
const uploadImage = require("../Storage/multer");
const productRouter = express.Router();

productRouter.route("/").post(uploadImage.single("image"), addProducts).get(getAllProducts)
productRouter.route("/:productId").get(getSingleProduct).delete(deleteSingleProduct).patch(updateSingleProduct);


module.exports = productRouter