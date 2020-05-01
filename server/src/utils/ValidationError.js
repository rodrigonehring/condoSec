const { GraphQLError } = require('graphql')

class ValidationError extends GraphQLError {
  constructor(errors, isJoi) {
    super('FormError')
    this.state = errors.reduce((result, error) => {
      result[isJoi ? error.path[0] : error.key] = error.message

      return result
    }, {})
  }
}

module.exports = ValidationError
