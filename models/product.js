const mongoose = require("mongoose");
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung","nokia", "dell","intel","mi", "rolex", "lenova", "asus", "Redmi"],
            message: `{Value} is not supported`
        },
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    colors:[{
       type: String,
       validator: [colorValidator, 'Invalid color'],
       required: true,
    }],
    image:{
        data: Buffer,
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    stars:{
        type: Number,
        required: false
    },
    isShippingAvailable: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Product', productSchema);