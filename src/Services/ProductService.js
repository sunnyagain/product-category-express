import BaseService from './BaseSerivce'
import Product from '../Models/Product'
import Category from '../Models/Category'
import { _ } from 'lodash'

export default class ProductService extends BaseService {

    constructor({ DatabaseService, CategoryService }) {
        super()
        this.DatabaseService = DatabaseService
        this.dbConnection()
        this.CategoryService = CategoryService
    }

    async dbConnection() {
        this.db = await this.DatabaseService.init()
        return this.db
    }

    async get(productId) {
        let product = await Product.findById(productId)
        product = await product.populate('Categories').execPopulate()

        let prodCategories = await Promise.all(product.Categories.map(async category => {
            let categories = await this.CategoryService.get(category)
            return categories
        }))
        product.Categories = prodCategories
        return product
    }

    async list(opt) {
        const categoryId = _.get(opt, 'category._id', false)
        let filter = {}

        if (categoryId) {
            filter.Categories = categoryId
        }

        let products = await Product.find(filter)

        products = await Promise.all(products.map(async product => {
            let productCategories = await Promise.all(product.Categories.map(async category => {
                let categories = await this.CategoryService.get(category)
                return categories
            }))
            product.Categories = productCategories
            return product
        }))

        return products
    }

    async create(productObj) {
        const categories = _.get(productObj, 'Categories', false)
        delete productObj.Categories

        const p = new Product(productObj)

        if (categories) {
            await Promise.all(categories.map(async cat => {
                let { Name } = cat
                let foundCategory = await Category.findOne({ Name: Name })

                if (!foundCategory) {
                    foundCategory = await new Category(cat).save()
                }
                p.Categories.push(foundCategory)
            }));
        }

        await p.save()
        return p
    }

    async update(productId, productObj) {
        const categories = _.get(productObj, 'Categories', false)
        delete productObj.Categories

        let p = await Product.findById(productId)
        if (categories) {
            p.Categories = []
            await Promise.all(categories.map(async cat => {
                let { Name } = cat
                let foundCategory = await Category.findOne({ Name: Name })

                if (!foundCategory) {
                    foundCategory = await new Category(cat).save()
                }
                p.Categories.push(foundCategory)
            }));
        }
        await p.save()
        return p
    }
}