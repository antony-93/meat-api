"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_model_1 = require("./restaurants.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const authz_handler_1 = require("../security/authz.handler");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurants_model_1.Restaurant);
        this.findMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id, "+menu")
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant Not Found');
                }
                else {
                    resp.json(rest.menu);
                    return next();
                }
            }).catch(next);
        };
        this.replaceMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id).then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurant Not Found');
                }
                else {
                    rest.menu = req.body; //array de menuItem
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.menu);
                return next();
            }).catch(next);
        };
    }
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.restaurant = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }
    applyRoutes(application) {
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:id', [this.validateId, this.findById]);
        application.post('/restaurants', [authz_handler_1.authorize('admin'), this.save]);
        application.put('/restaurants/:id', [authz_handler_1.authorize('admin'), this.validateId, this.replace]);
        application.patch('restaurants/:id', [authz_handler_1.authorize('admin'), this.validateId, this.update]);
        application.del('/restaurants/:id', [authz_handler_1.authorize('admin'), this.validateId, this.delete]);
        application.get('/restaurants/:id/menu', [this.validateId, this.findMenu]);
        application.put('/restaurants/:id/menu', [authz_handler_1.authorize('admin'), this.validateId, this.replaceMenu]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
