function respon (res, status, result = '') {
  let desc = ''
  switch (status) {
    case 200:
      desc = 'OK'
      break
    case 201:
      desc = 'Created'
      break
    case 202:
      desc = 'Accepted'
      break
    case 203:
      desc = 'No Content'
      break
    case 204:
      desc = 'No Content'
      break
    case 400:
      desc = 'Bad Request'
      break
    case 401:
      desc = 'Unauthorized'
      break
    case 500:
      desc = 'Internal Server Error'
      break
    case 501:
      desc = 'Bad Gateway'
      break
    case 304:
      desc = 'Not Modified'
      break
    default:
      desc = ''
  }

  const isObject = (data) => {
    return !!data && data.constructor === Object
  }

  const results = {
    status: status,
    description: desc,
    result: isObject(result) ? [result] : Array.isArray(result) ? result : result
  }

  res.status(status).json(results)
}

module.exports = respon
