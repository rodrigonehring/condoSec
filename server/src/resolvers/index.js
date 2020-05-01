const buildingResolver = require('./buildingResolver')
const userResolver = require('./userResolver')
const residentResolver = require('./residentResolver')

module.exports = [userResolver, buildingResolver, residentResolver]
