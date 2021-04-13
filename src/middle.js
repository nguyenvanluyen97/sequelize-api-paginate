'use strict'
const buildCondition = require('./build-condition')


module.exports = function(req, res, next) {
    const payload = {
        pageSize: req.query.pageSize || null,
        sortField: req.query.sortField || null,
        sortOrder: req.query.sortOrder || null,
        currentPage: req.query.currentPage || null,
        filters: req.query.filters || null
    }
    if (payload.filters != null) {
        const condition = {};

        let arrFilters = payload.filters != null ? payload.filters.split(',') : [];

        arrFilters.forEach(element => {
            let objCondition = buildCondition.generateCondition(element);
            let allKeys = Object.keys(objCondition);
            allKeys.forEach(key => {
                condition[key] = objCondition[key];
            });
        });

        payload.filters = condition;
    } else {
        payload.filters = {};
    }

    //Fixed string
    payload.pageSize = Number(payload.pageSize)

    if (!payload.currentPage || payload.currentPage <= 0) payload.currentPage = 1;
    if (!payload.pageSize || payload.pageSize <= 0) payload.pageSize = 10;
    if (!payload.sortField) payload.sortField = null;
    if (!payload.sortOrder) payload.sortOrder = null;

    req.payload = payload;
    next();
}




