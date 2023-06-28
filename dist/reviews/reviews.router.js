"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
const authz_handler_1 = require("../security/authz.handler");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
        this.findByIdUser = (req, resp, next) => {
            if (req.query.user) {
                reviews_model_1.Review.findByIdUser(req.query.user)
                    .then(rev => rev ? [rev] : [])
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.findByIdRestaurant = (req, resp, next) => {
            if (req.query.restaurant) {
                reviews_model_1.Review.findByIdRestaurant(req.query.restaurant)
                    .then(review => review ? [review] : [])
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
    }
    prepareOne(query) {
        return query
            .populate('user', 'name')
            .populate('restaurant', 'name');
    }
    /*findById = (req, resp, next) => {
        this.model.findById(req.params.id)
        .populate('user', 'name')
        .populate('restaurant', 'name')
        .then(this.render(resp, next))
        .catch(next)
    }*/
    applyRoutes(application) {
        application.get(`${this.basePath}`, [this.findByIdRestaurant, this.findByIdUser, this.findAll]);
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, [authz_handler_1.authorize('admin' || 'user'), this.save]);
    }
}
exports.reviewsRouter = new ReviewsRouter();
