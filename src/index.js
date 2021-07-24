'use strict'

const queryModel = require('./query-model');
const middleProcess = require('./middle');
module.exports = {
    query: queryModel,
    middle: middleProcess
}