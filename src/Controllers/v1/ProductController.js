import BaseService from '../../Services/BaseSerivce'
import ErrorHandler from '../../Utils/ErrorHandler'

export default class ProductsController extends BaseService {

    constructor({ ExpressService, ProductService }) {
        super()
        this.expressService = ExpressService
        this.router = this.expressService.router()
        this.ProductService = ProductService

        this.Create = this.Create.bind(this)
        this.Get = this.Get.bind(this)
        this.List = this.List.bind(this)
        this.Update = this.Update.bind(this)
        this.Delete = this.Delete.bind(this)

        this.initRoutes()
        this.expressService.app.use('/Products', this.router)
    }

    initRoutes() {

        this.router.post('/', this.Create)
        this.router.put('/:id', this.Update)
        this.router.get('/:id', this.Get)
        this.router.get('/', this.List)
        this.router.delete('/:id', this.Delete)

    }

    // DONE
    async Get(req, res, next) {
        try {
            const product = await this.ProductService.get(req.params.id)
            res.json(product).status(200)
        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // DONE
    async Create(req, res, next) {
        try {

            const product = await this.ProductService.create(req.body)
            if (product) {
                return res.json(product).status(200)
            }
            res.status(500)
        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // @TODO
    async List(req, res, next) {
        try {
            const filter = req.query

            const Products = await this.ProductService.list(filter)
            res.json(Products).status(200)
        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // @TODO
    async Update(req, res, next) {
        try {
            const productId = req.params.id
            const product = await this.ProductService.update(productId, req.body)
            res.json(product).status(200)
        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }

    }

    // @TODO
    async Delete(req, res, next) {
        res.json({
            data: 'TODO'
        }).status(200)
    }

}