import path from 'path'
import glob from 'glob-promise'
import {
    createContainer,
    listModules,
    asClass,
    asValue,
    asFunction
} from 'awilix'

class Bootstrap {

    constructor() {
        this._container = createContainer()
    }

    async init() {
        await this.registerServices()
        await this.registerControllers()
        const app = this._container.resolve('ExpressService')
        app.start()
    }

    async registerServices() {
        const allServices = path.join(__dirname, 'Services/**', '*.js')
        const services = await glob(allServices)
        services.forEach(service => {
            var extension = path.extname(service)
            var file = path.basename(service, extension)
            this.registerToContainer(file, service)
        });
    }

    async registerControllers() {
        const allControllers = path.join(__dirname, 'Controllers/v*', '*.js')
        const controllers = await glob(allControllers)
        controllers.forEach(controller => {
            var extension = path.extname(controller)
            var file = path.basename(controller, extension)
            this.registerToContainer(file, controller)
        });
        await this.initControllers(controllers)
    }

    async initControllers(controllers) {
        listModules(controllers).forEach((theModule) => {
            this._container.resolve(theModule.name)
        })
    }

    registerToContainer(moduleName, moduleRef) {
        console.log(`Registering ${moduleName}`)
        this._container.register(moduleName,
            asClass(require(moduleRef).default)
                .singleton()
                .disposer((obj) => {
                    obj.stop()
                })
        )
    }

    destroy() {
        return this._container.dispose()
    }

    resolve(m) {
        return this._container.resolve(m).interface
    }

}

const instance = new Bootstrap()
Object.freeze(instance)
export default instance