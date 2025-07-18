const { default: mongoose } = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'name is required']
    },
    productImage:{
        type: String,
    },
    category : {
        type: String,
        required : [true, 'type is required']
    },
    id:{
        type: String,
        required : true,
        unique: [true, 'id is required']
    },
    price : {
        type: String,
        required : [true, 'price is required']}
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel