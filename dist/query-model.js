"use strict";
const Op = require("sequelize").Op;
const moment = require("moment");
const buildCondition = require("./build-condition");
module.exports = async function (
  model,
  payload,
  includeModels = [],
  isHierarchy = false,
  raw = true,
  nest = true,
  distinct = false,
  subQuery = null
) {
  if (payload.dateField) {
    for (const op of payload.dateField) {
      if (op["opType"] == "none") {
        var i = 0;
        var condition = payload["filters"][Op.and][op["indexOp"]];
        if (condition[Object.keys(condition)][Op.iLike] != undefined) {
          if (
            moment(
              condition[Object.keys(condition)][Op.iLike].substring(
                1,
                condition[Object.keys(condition)][Op.iLike].length - 1
              ),
              ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"],
              true
            ).isValid()
          ) {
            if (
              model.tableAttributes[Object.keys(condition)].type.constructor
                .key == "DATE"
            ) {
              condition[Object.keys(condition)] = condition[
                Object.keys(condition)
              ][Op.iLike].substring(
                1,
                condition[Object.keys(condition)][Op.iLike].length - 1
              );

              const formatDate = buildCondition.getCorrectFormatTime(
                condition[Object.keys(condition)]
              );

              let start_date = new Date(
                moment(condition[Object.keys(condition)], formatDate).format(
                  "YYYY/MM/DD"
                ) + " 00:00 +00:00"
              ).toUTCString();
              let end_date = new Date(
                moment(condition[Object.keys(condition)], formatDate).format(
                  "YYYY/MM/DD"
                ) + " 23:59 +00:00"
              ).toUTCString();

              payload["filters"][Op.and].splice(op["indexOp"], 1, {
                [Object.keys(condition)]: {
                  [Op.between]: [start_date, end_date],
                },
              });
            } else {
              payload["filters"][Op.and].splice(op["indexOp"], 1);
            }
          } else {
            payload["filters"][Op.and].splice(op["indexOp"], 1);
          }
        } else {
          if (
            moment(
              condition[Object.keys(condition)],
              ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"],
              true
            ).isValid()
          ) {
            if (
              model.tableAttributes[Object.keys(condition)].type.constructor
                .key == "DATE"
            ) {
              const formatDate = buildCondition.getCorrectFormatTime(
                condition[Object.keys(condition)]
              );
              let start_date = new Date(
                moment(condition[Object.keys(condition)], formatDate).format(
                  "YYYY/MM/DD"
                ) + " 00:00 +00:00"
              ).toUTCString();
              let end_date = new Date(
                moment(condition[Object.keys(condition)], formatDate).format(
                  "YYYY/MM/DD"
                ) + " 23:59 +00:00"
              ).toUTCString();
              payload["filters"][Op.and].splice(op["indexOp"], 1, {
                [Object.keys(condition)]: {
                  [Op.between]: [start_date, end_date],
                },
              });
            } else {
              payload["filters"][Op.and].splice(op["indexOp"], 1);
            }
          } else {
          }
        }
      }
      if (op["opType"] == "or" && payload["filters"][Op.and][op["indexOp"]]) {
        var i = 0;
        for (const condition of payload["filters"][Op.and][op["indexOp"]][
          Op.or
        ]) {
          if (condition[Object.keys(condition)][Op.iLike] != undefined) {
            if (
              moment(
                condition[Object.keys(condition)][Op.iLike].substring(
                  1,
                  condition[Object.keys(condition)][Op.iLike].length - 1
                ),
                ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"],
                true
              ).isValid()
            ) {
              if (
                model.tableAttributes[Object.keys(condition)].type.constructor
                  .key == "DATE"
              ) {
                condition[Object.keys(condition)] = condition[
                  Object.keys(condition)
                ][Op.iLike].substring(
                  1,
                  condition[Object.keys(condition)][Op.iLike].length - 1
                );

                const formatDate = buildCondition.getCorrectFormatTime(
                  condition[Object.keys(condition)]
                );
                let start_date = new Date(
                  moment(condition[Object.keys(condition)], formatDate).format(
                    "YYYY/MM/DD"
                  ) + " 00:00 +00:00"
                ).toUTCString();
                let end_date = new Date(
                  moment(condition[Object.keys(condition)], formatDate).format(
                    "YYYY/MM/DD"
                  ) + " 23:59 +00:00"
                ).toUTCString();

                payload["filters"][Op.and][op["indexOp"]][Op.or].splice(i, 1, {
                  [Object.keys(condition)]: {
                    [Op.between]: [start_date, end_date],
                  },
                });
              } else {
                delete payload["filters"][Op.and][op["indexOp"]][Op.or][i];
              }
            }
          }
          // ********
          else {
            if (
              moment(
                condition[Object.keys(condition)],
                ["YYYY/MM/DD", "YYYY-MM-DD", "DD/MM/YYYY", "DD-MM-YYYY"],
                true
              ).isValid()
            ) {
              if (
                model.tableAttributes[Object.keys(condition)].type.constructor
                  .key == "DATE"
              ) {
                const formatDate = buildCondition.getCorrectFormatTime(
                  condition[Object.keys(condition)]
                );
                let start_date = new Date(
                  moment(condition[Object.keys(condition)], formatDate).format(
                    "YYYY/MM/DD"
                  ) + " 00:00 +00:00"
                ).toUTCString();
                let end_date = new Date(
                  moment(condition[Object.keys(condition)], formatDate).format(
                    "YYYY/MM/DD"
                  ) + " 23:59 +00:00"
                ).toUTCString();

                payload["filters"][Op.and][op["indexOp"]][Op.or].splice(i, 1, {
                  [Object.keys(condition)]: {
                    [Op.between]: [start_date, end_date],
                  },
                });
              } else {
                delete payload["filters"][Op.and][op["indexOp"]][Op.or][i];
              }
            }
          }

          i += 1;
        }
      }
    }
  }

  let objQuery = {
    limit: payload.pageSize,
    offset: (payload.currentPage - 1) * payload.pageSize || 0,
    order:
      payload.sortField != null ? [[payload.sortField, payload.sortOrder]] : [],
    include: includeModels,
    where: payload.filters,
    attributes: payload.attributes || [],
    raw,
    nest,
  };
  if (distinct) objQuery["distinct"] = distinct;
  if (isHierarchy) objQuery["hierarchy"] = true;
  if (subQuery == true || subQuery == false) objQuery["subQuery"] = subQuery;
  var result = await model.findAndCountAll(objQuery);
  result["totalPages"] = Math.ceil(result["count"] / payload.pageSize);
  result["currentPage"] = payload.currentPage;
  return result;
};
