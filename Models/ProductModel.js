const { default: mongoose } = require("mongoose")
const moongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'name is required']
    },
    productImage:{
        type: String,
    },
    type : {
        type: String,
        required : [true, 'type is required']
    },
    id:{
        type: String,
        required : true,
        unique: [true, 'id is required']
    },
    description : {
        type: String,
        required : [true, 'description is required']
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel