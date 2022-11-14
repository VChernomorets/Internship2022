module.exports = class ApiError extends Error {
    status;

    errors;

    constructor(status, message, errors = []) {
        console.log('constructor');
        super(message);
        console.log('message: ', this.message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
};
