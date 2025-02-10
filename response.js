const response = (statusCode, message, data, res) => {
    res.json(statusCode, [
        {
            message,
            data
        }
    ])
}

module.exports = response