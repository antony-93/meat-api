import * as restify from 'restify'

export const handleError = (req: restify.Request, resp: restify.Response, err, done) => {
    err.toJSON = () => {
        return {
            message: err.message
        }
    }
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400
            }
            break
        case 'ValidationError':
            err.statusCode = 400
            const messages: any[] = []
            for(let name in err.erros){
                messages.push({message: err.erros[name].message})
            }
            err.toJSON = ()=>({
                errros: messages
            })
            break
    }
    done()
}