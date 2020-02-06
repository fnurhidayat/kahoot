module.exports = {
  success: (res, data, statusCode) => {
    res.status(statusCode).json({
      status: true,
      data
    })
  },

  error: (res, err, statusCode) => {
    res.status(statusCode).json({
      status: false,
      errors: err
    })
  }
}
