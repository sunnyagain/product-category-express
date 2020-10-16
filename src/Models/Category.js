import {
    Schema,
    ObjectId,
    model
} from 'mongoose'

let CategorySchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: String,
    ParentCategory: {
        type: ObjectId,
        ref: 'Category'
    },
    ChildCategories: [
        {
            type: ObjectId,
            ref: 'Category'
        }
    ]
});

const Category = model('Category', CategorySchema)
export default Category