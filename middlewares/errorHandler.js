const duplicateError = (err) => {
    const errorkey = Object.keys(err.keyValue)[0]
    const errorValue = Object.values(err.keyValue)[0]
    const errorMessage = `Duplicate value entered for ${errorkey}: ${errorValue}`;
    const statusCode = 400;
    return {
        statusCode,
        message: errorMessage,
    };
}

const castError = (err) => {
    const errorMessage = `Invalid ${err.path}: ${err.value}`;
    const statusCode = 401;
    return {
        statusCode,
        message: errorMessage,
    };
}

const tokenExpired = (err) => {
    // console.log(err)
    const errorMessage = err.name
    const statusCode = 500
        return {
            statusCode,
            message: errorMessage,
        };
    
}

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err.name === 'TokenExpiredError'){
        const error = tokenExpired(err)
        res.status(error.statusCode).json({
            message: error.message
        })
    }
    else if(err.code === 11000){
        const error = duplicateError(err)
        res.status(error.statusCode).json({
            message: error.message
        })
    }
    else if(err.name === "CastError"){
        const error = castError(err)
        res.status(error.statusCode).json({
            message: error.message
        })
    }
}

module.exports = errorHandler