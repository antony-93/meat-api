import { Router } from "../common/router";
import * as restify from 'restify'
import { User } from "./users.model";

class UsersRouter extends Router {

    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.json(users)
                return next()
            })
        })

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user)
                    return next()
                }
                resp.send(404)
                return next()
            })
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined
                resp.json(user)
                return next()
            })
        })


        application.put('/users/:id', (req, resp, next) => {
            const options = { overwrite: true }
            User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result=>{
                    if (result.n) {
                        return User.findById(req.params.id)
                    } else {
                        resp.send(404)
                    }
                }).then(user => {
                    resp.json(user)
                    return next()
                })
        })
    }
}

export const usersRouter = new UsersRouter()