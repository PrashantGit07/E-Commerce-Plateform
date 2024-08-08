// Messages.js

const SuccessResponse = (res, message = 'Request was successful', data = null) => {
    res.status(200).json({
        status: 200,
        message: message,
        data: data,
    });
};

const ConflictResponse = (res, message = 'Conflict - Resource already exists', error = null) => {
    res.status(409).json({
        status: 409,
        error: message,
        details: error ? error.message : null,
    });
};

const BadRequest = (res, message = 'Bad Request', error = null) => {
    res.status(400).json({
        status: 400,
        error: message,
        details: error ? error.message : null,
    });
};

const NotFound = (res, message = 'Not Found', error = null) => {
    res.status(404).json({
        status: 404,
        error: message,
        details: error ? error.message : null,
    });
};

const InternalServerError = (res, message = 'Internal Server Error', error = null) => {
    res.status(500).json({
        status: 500,
        error: message,
        details: error ? error.message : null,
    });
};

module.exports = {
    SuccessResponse,
    ConflictResponse,
    BadRequest,
    NotFound,
    InternalServerError,
};
