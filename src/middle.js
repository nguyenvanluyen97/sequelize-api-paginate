'use strict'
const buildCondition = require('./build-condition')
const Op = require("sequelize").Op;

module.exports = function (req, res, next) {
    const payload = {
        pageSize: req.query.pageSize || null,
        sortField: req.query.sortField || null,
        sortOrder: req.query.sortOrder || null,
        currentPage: req.query.currentPage || null,
        filters: req.query.filters || null
    }
    if (payload.filters != null) {
        let condition = new Object;

        let arrFilters = payload.filters != null ? payload.filters.split(',') : [];


        let conditionCheckedChild = [];

        arrFilters.forEach(element => {
            if (element.includes('|') || (element.includes('(') && element.includes(')'))) {
                let objCondition = buildCondition.generateConditionExtra(element);
                let conditionNotOr = {
                    [Op.or]: objCondition
                };
                conditionCheckedChild.push(conditionNotOr);
            } else {
                let conditionNotOr = buildCondition.generateCondition(element);
                conditionCheckedChild.push(conditionNotOr);
            }
        });

        condition = {
            [Op.and]: conditionCheckedChild
        }

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
