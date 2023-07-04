"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options = {}) {
        return documents;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelope(document));
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento não encontrado');
            }
            return next(false);
        };
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                console.log('aqui');
                console.log(documents);
                documents.forEach((document, index, array) => {
                    console.log(document);
                    this.emit('beforeRender', document);
                    console.log('aqui');
                    console.log(document);
                    array[index] = this.envelope(document);
                    console.log('asda');
                });
                response.json(this.envelopeAll(documents, options));
                console.log('adasdasa');
            }
            else {
                response.json(this.envelopeAll([]));
            }
            return next(false);
        };
    }
}
exports.Router = Router;
