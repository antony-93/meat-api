import { NotFoundError } from "restify-errors";
import * as restify from 'restify'
import { Router } from "./router";
import * as mongoose from 'mongoose'

export abstract class ModelRouter<D extends mongoose.Document> extends Router {

    basePath: string

    pageSize = 10

    constructor(protected model: mongoose.Model<D>) {
        super()
        this.basePath = `${model.collection.name}`
    }

    protected prepareOne(query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D> {
        return query
    }

    envelope(document: any): any {
        let resource = Object.assign({ _links: {} }, document.toJSON())
        resource._links.self = `/${this.basePath}/${resource._id}`
        return resource
    }

    envelopeAll(documents: any[], options: any = {}): any {
        const resource: any = {
            _links: {
                self: `${options.url}`
            },
            items: documents
        }
        if (options.page) {
            if (options.page > 1) {
                resource._links.next = `${this.basePath}?_page=${options.page - 1}`
            }
            const remaining = options.count - (options.page * options.pageSize)
            if (remaining > 0) {
                resource._links.next = `${this.basePath}?_page=${options.page + 1}`
            }
        }
        return resource
    }

    validateId = (req, resp, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new NotFoundError('Document Not Found'))
        } else {
            next()
        }
    }

    findAll = (req, resp, next) => {
        let page = parseInt(req.query._page || 1)
        page = page > 0 ? page : 1

        const skip = (page - 1) * this.pageSize

        this.model.count({}).exec()
            .then(count => this.model.find()
                .skip(skip)
                .limit(this.pageSize)
                .then(this.renderAll(resp, next, {
                    page, count, pageSize: this.pageSize, url: req.url
                })))
            .catch(next)
    }

    findWithSearchTerm = (req, resp, next) => {
        const searchTerm = req.query.q; // Obtém o termo de pesquisa da query string
        let query = {};
        let page = parseInt(req.query._page || 1);

        page = page > 0 ? page : 1;
        const skip = (page - 1) * this.pageSize;

        if (searchTerm) {
            const searchRegex = new RegExp(searchTerm, 'i');
            query = {
                $or: [
                    { name: searchRegex },
                    { category: searchRegex },
                    // Adicione outros campos que você deseja pesquisar aqui
                ],
            };
        }

        this.model.count(query).exec()
            .then(count => this.model.find(query)
                .skip(skip)
                .limit(this.pageSize)
                .then(this.renderAll(resp, next, {
                    page, count, pageSize: this.pageSize, url: req.url
                })))
            .catch(next);
    };

    findById = (req, resp, next) => {
        this.prepareOne(this.model.findById(req.params.id))
            .then(this.render(resp, next))
            .catch(next)
    }


    findByEmailAll = (param1?: string, param2?: string[]) => (req, resp, next) => {
        if (req.query.email) {
            let email = req.query.email
            let page = parseInt(req.query._page || 1)
            page = page > 0 ? page : 1

            const skip = (page - 1) * this.pageSize

            this.model.count({}).exec()
                .then(count => this.model.find({ email })
                    .populate(param1, param2)
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.renderAll(resp, next, {
                        page, count, pageSize: this.pageSize, url: req.url
                    })))
                .catch(next)
        } else {
            next()
        }
    }

    findByRestaurant = (param1?: string, param2?: string[]) => (req, resp, next) => {
        if (req.query.restaurant) {
            let restaurant = req.query.restaurant
            let page = parseInt(req.query._page || 1)
            page = page > 0 ? page : 1

            const skip = (page - 1) * this.pageSize

            this.model.count({}).exec()
                .then(count => this.model.find({ restaurant })
                    .populate(param1, param2)
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.renderAll(resp, next, {
                        page, count, pageSize: this.pageSize, url: req.url
                    })))
                .catch(next)
        } else {
            next()
        }
    }

    replace = (req, resp, next) => {
        const options = { runValidators: true, new: true }
        this.model.update({ _id: req.params.id }, req.body, options)
            .exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id)
                } else {
                    throw new NotFoundError('Documento não encontrado')
                }
            }).then((this.render(resp, next)))
            .catch(next)
    }

    update = (req, resp, next) => {
        const options = { new: true }
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(resp, next))
            .catch(next)
    }

    save = (req, resp, next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
            .catch(next)
    }

    delete = (req, resp, next) => {
        this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
            if (cmdResult.result.n) {
                resp.send(204)
            } else {
                throw new NotFoundError('Documento não encontrado')
            }
            return next()
        }).catch(next)
    }
}