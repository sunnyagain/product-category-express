import {
    Schema,
    ObjectId,
    model
} from 'mongoose'

const ProductSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Brand: String,
    Price: {
        type: Number,
        required: true
    },
    Details: String,
    Sku: {
        type: String,
        required: true
    },
    Categories: [
        {
            type: ObjectId,
            ref: 'Category'
        }
    ]
})

const Product = model('Product', ProductSchema)
export default Product