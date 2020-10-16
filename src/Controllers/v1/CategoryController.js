import BaseService from '../../Services/BaseSerivce'
import ErrorHandler from '../../Utils/ErrorHandler'

export default class CategoriesController extends BaseService {

    constructor({ ExpressService, CategoryService }) {
        super()
        this.expressService = ExpressService
        this.router = this.expressService.router()
        this.CategoryService = CategoryService
        this.Create = this.Create.bind(this)
        this.Get = this.Get.bind(this)
        this.List = this.List.bind(this)
        this.Update = this.Update.bind(this)
        this.Delete = this.Delete.bind(this)

        this.initRoutes()
        this.expressService.app.use('/categories', this.router)
    }

    initRoutes() {

        this.router.post('/', this.Create)
        this.router.put('/:id', this.Update)
        this.router.get('/:id', this.Get)
        this.router.get('/', this.List)
        this.router.delete('/:id', this.Delete)

    }

    // @TODO
    async Get(req, res, next) {
        try {
            const category = await this.CategoryService.get(req.params.id)
            res.json(category).status(200)

        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // @TODO
    async Create(req, res, next) {
        try {
            const category = await this.CategoryService.create(req.body)
            res.json(category).status(200)

        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // @TODO
    async List(req, res, next) {
        try {
            const Categories = await this.CategoryService.list()
            res.json(Categories).status(200)
        } catch (error) {
            ErrorHandler.unknownError(error, req, res, next)
        }
    }

    // @TODO
    async Update(req, res, next) {
        res.json({
            data: 'TODO'
        })
    }

    // @TODO
    async Delete(req, res, next) {
        res.json({
            data: 'TODO'
        })
    }
}