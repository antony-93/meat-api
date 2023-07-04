import * as restify from 'restify'
import {EventEmitter} from 'events'
import { NotFoundError } from 'restify-errors'

export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server)

    envelope(document: any):any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
        return documents
    }

    render(response: restify.Response, next: restify.Next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            } else {
                throw new NotFoundError('Documento não encontrado')
            }
            return next(false)
        }
    }

    renderAll(response: restify.Response, next: restify.Next, options: any = {}){
        return(documents: any[])=>{
            if(documents){
                console.log('aqui')
                console.log(documents)
                documents.forEach((document, index, array)=>{
                    console.log(document)
                    this.emit('beforeRender', document)
                    console.log('aqui')
                    console.log(document)
                    array[index] = this.envelope(document)
                    console.log('asda')
                })
                response.json(this.envelopeAll(documents, options))
                console.log('adasdasa')
            }else{
                response.json(this.envelopeAll([]))
            }
            return next(false)
        }
    }
}