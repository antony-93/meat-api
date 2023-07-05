import * as restify from 'restify'
import { ModelRouter } from "../common/model-router";
import { Review } from "./reviews.model";
import * as mongoose from 'mongoose'
import { authorize } from '../security/authz.handler';

class ReviewsRouter extends ModelRouter<Review>{
    private param1: string = 'user'
    private param2: string[] = ['name']
    constructor(){
        super(Review)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review>{
        return query
        .populate('user', 'name')
        .populate('restaurant', 'name')
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, [this.findByRestaurant(this.param1, this.param2), this.findByEmailAll(this.param1, this.param2), this.findAll])
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin' || 'user'),this.save])
    }
}

export const reviewsRouter = new ReviewsRouter() 