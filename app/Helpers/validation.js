import { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(421);
        res.send({
            errors: error.array()
        });
    }
}

module.exports = { validateResult }