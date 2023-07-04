import { Server } from "restify";
import { ModelRouter } from "../common/model-router";
import { Menu, MenuItem } from "./menu.model";
import { authorize } from "../security/authz.handler";

class MenuRouter extends ModelRouter<MenuItem>{

    param1: string = 'restaurant'
    param2: string[] = ['name']

    constructor(){
        super(Menu)
    }

    applyRoutes(application: Server) {
        application.get(`${this.basePath}`, [this.findByRestaurant(this.param1, this.param2), this.findAll])
        application.get(`${this.basePath}/:id`, [authorize('admin'),this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin' || 'user'),this.save])
    }
}

export const menuRouter = new MenuRouter()