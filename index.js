'use strict'

const queryModel = require('./src/query-model');
const middleProcess = require('./src/middle');
module.exports = {
    query: queryModel,
    middle: middleProcess
}