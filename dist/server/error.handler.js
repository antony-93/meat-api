"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = (req, resp, err, done) => {
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            const messages = [];
            for (let name in err.erros) {
                messages.push({ message: err.erros[name].message });
            }
            err.toJSON = () => ({
                message: 'Validation error while processing your request',
                errors: messages
            });
            break;
    }
    done();
};
