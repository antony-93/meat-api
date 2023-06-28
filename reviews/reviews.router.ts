import * as restify from 'restify'
import { ModelRouter } from "../common/model-router";
import { Review } from "./reviews.model";
import * as mongoose from 'mongoose'
import { authorize } from '../security/authz.handler';

class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review>{
        return query
        .populate('user', 'name')
        .populate('restaurant', 'name')
    }

    findByIdUser = (req,resp,next) =>{
        if (req.query.user) {
            Review.findByIdUser(req.query.user)
                .then(rev => rev ? [rev] : [])
                .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        } else {
            next()
        }
    }

    findByIdRestaurant = (req,resp,next) =>{
        if (req.query.restaurant) {
            Review.findByIdRestaurant(req.query.restaurant)
                .then(review => review ? [review] : [])
                .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        } else {
            next()
        }
    }

    /*findById = (req, resp, next) => {
        this.model.findById(req.params.id)
        .populate('user', 'name')
        .populate('restaurant', 'name')
        .then(this.render(resp, next))
        .catch(next)
    }*/

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, [this.findByIdRestaurant, this.findByIdUser, this.findAll])
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin' || 'user'),this.save])
    }
}

export const reviewsRouter = new ReviewsRouter() 