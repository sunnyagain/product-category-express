import BaseService from './BaseSerivce'
import Category from '../Models/Category'
import { paginate } from 'paginate-mongoose-data'

export default class CategoryService extends BaseService {

    constructor({ DatabaseService }) {
        super()
        this.DatabaseService = DatabaseService
        this.dbConnection()
    }

    async dbConnection() {
        this.db = await this.DatabaseService.init()
        return this.db
    }

    async list(opt) {
        let categories = await paginate(Category)
        categories.data = await Promise.all(categories.data.map(async category => {
            let categories = await this.get(category)
            return categories
        }))

        return categories
    }

    async create(categoryObj) {
        const cat = new Category(categoryObj)
        return await cat.save()
    }

    async get(id) {
        let cat = await Category.findById(id)
        const childCategories = await this.getChildren(cat)
        cat.ChildCategories = childCategories
        return cat
    }

    async getChildren(category) {
        let childCategories = await Category.find({
            'ParentCategory': category._id
        })

        const self = this
        childCategories = await Promise.all(childCategories.map(async cat => {
            cat.ChildCategories = await self.getChildren(cat)
            return cat
        }))
        return childCategories
    }



}