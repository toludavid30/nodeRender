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