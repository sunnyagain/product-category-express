import express from 'express'
import bodyParser from 'body-parser'
import BaseService from './BaseSerivce'
const cors = require('cors')
const morgan = require('morgan')

export default class ExpressService extends BaseService {
    constructor() {
        super()

        this.app = express()
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))

        const corsOptions = {
            credentials: true,
            origin: '*'
        }

        this.app.use(cors(corsOptions))

        this.app.use(morgan('combined'))

        this.stop = this.dispose.bind(this)
    }

    router() {
        return express.Router()
    }

    start() {
        const port = process.env.PORT || 3000
        this._server = this.app.listen(port)
        console.log(`Started server on ${port}`)
    }

    dispose() {
        this._server.close()
        super.dispose()
    }

    get interface() {
        return this
    }
}