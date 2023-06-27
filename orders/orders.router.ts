import * as restify from 'restify'
import { Orders } from './orders.model';
import { ModelRouter } from '../common/model-router';
import { authorize } from '../security/authz.handler';

class OrdersRouter extends ModelRouter<Orders>{

    constructor(){
        super(Orders)
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, [authorize('admin'),this.findAll])
        application.get(`${this.basePath}/:id`, [authorize('admin'),this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin' || 'user'),this.save])
    }

}

export const orderRouter = new OrdersRouter()