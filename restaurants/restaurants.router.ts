import * as restify from 'restify'
import { Restaurant } from './restaurants.model';
import { ModelRouter } from '../common/model-router';
import { NotFoundError } from 'restify-errors';
import { authorize } from '../security/authz.handler';

class RestaurantsRouter extends ModelRouter<Restaurant>{
    
    constructor(){
        super(Restaurant)
    }

    envelope(document) {
        let resource = super.envelope(document) 
        resource._links.menu = `${this.basePath}/${resource._id}/menu`
        return resource 
    }

    applyRoutes(application: restify.Server) {

        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId,this.findById])
        application.post(`${this.basePath}`, [authorize('admin'),this.save])
        application.put(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.replace])
        application.patch(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'),this.validateId, this.delete])
    }
}

export const restaurantsRouter = new RestaurantsRouter()