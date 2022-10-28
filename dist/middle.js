'use strict'
const buildCondition = require('./build-condition')
const Op = require("sequelize").Op;
const moment = require("moment");

module.exports = function (req, res, next) {
    const payload = {
        pageSize: req.query.pageSize || null,
        sortField: req.query.sortField || null,
        sortOrder: req.query.sortOrder || null,
        currentPage: req.query.currentPage || null,
        filters: req.query.filters || null,
        rawFilter: null,
        dateField: []
    }
    if (payload.filters != null) {
        let indexOp = 0;
        let condition = new Object;
        let arrFilters = payload.filters != null ? payload.filters.split(',') : [];
        let conditionCheckedChild = [];
        arrFilters.forEach(element => {
            if (element.includes('|')) {
                let objCondition = buildCondition.generateConditionExtra(element);
                if (!objCondition) {
                    return;
                }

                if (objCondition.length > 0) {
                    for (const obj of objCondition) {
                        if (moment(obj[Object.keys(obj)], ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"], true).isValid()
                        ) {
                            payload.dateField.push({
                                "opType": "or",
                                "indexOp": indexOp,

                            });
                            break;
                        }
                    }

                } else {
                    if (moment(objCondition[Object.keys(objCondition)], ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"], true).isValid()
                    ) {
                        payload.dateField.push({
                            "opType": "none",
                            "indexOp": indexOp,

                        });

                    }
                }
                let conditionNotOr = {
                    [Op.or]: objCondition
                };
                conditionCheckedChild.push(conditionNotOr);

            } else {
                let conditionNotOr = buildCondition.generateCondition(element);
                if (!conditionNotOr) {
                    return;
                }
                if (conditionNotOr.length > 0) {
                    for (const obj of conditionNotOr) {
                        if (moment(obj[Object.keys(obj)], ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"], true).isValid()
                        ) {
                            payload.dateField.push({
                                "opType": "and",
                                "indexOp": indexOp,

                            });
                            break;
                        }
                    }
                } else {
                    if (moment(conditionNotOr[Object.keys(conditionNotOr)], ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"], true).isValid()
                    ) {
                        payload.dateField.push({
                            "opType": "none",
                            "indexOp": indexOp,

                        });

                    }
                }

                conditionCheckedChild.push(conditionNotOr);
            }
            indexOp += 1;
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
