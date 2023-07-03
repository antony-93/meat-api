import { Server } from "restify";
import { ModelRouter } from "../common/model-router";
import { Menu, MenuItem } from "./menu.model";
import { authorize } from "../security/authz.handler";

class MenuRouter extends ModelRouter<MenuItem>{

    constructor(){
        super(Menu)
    }

    findByIdRestaurant = (req,resp,next) =>{
        if (req.query.restaurant) {
            Menu.findByIdRestaurant(req.query.restaurant)
                .then(menuItem => menuItem ? [menuItem] : [])
                .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: Server) {
        application.get(`${this.basePath}`, [this.findByIdRestaurant, this.findAll])
        application.get(`${this.basePath}/:id`, [authorize('admin'),this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin' || 'user'),this.save])
    }
}

export const menuRouter = new MenuRouter()