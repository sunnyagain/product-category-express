import BaseService from './BaseSerivce'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export default class DatabaseService extends BaseService {

    constructor() {
        super()
    }

    async init() {
        if (this.client && 1 === mongoose.connection.readyState)
            return this
        try {
            console.log(`Client connecting`)
            this.client = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                connectTimeoutMS: 10
            });
            return this.client
        } catch (exception) {
            console.error(`Error while connecting DB ${exception}`)
        }
    }

}