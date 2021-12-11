'use strict'

module.exports = async function (model, payload, includeModels = [], isHierarchy = false, raw = true, nest = true, distinct = false, subQuery = null) {
    let objQuery = {
        limit: payload.pageSize,
        offset: (payload.currentPage - 1) * payload.pageSize || 0,
        order: payload.sortField != null ? [
            [payload.sortField, payload.sortOrder]
        ] : [],
        include: includeModels,
        where: payload.filters,
        raw,
        nest
    };
    if (distinct)
        objQuery["distinct"] = distinct;
    if (isHierarchy)
        objQuery["hierarchy"] = true;
    if (subQuery == true || subQuery == false)
        objQuery["subQuery"] = subQuery;
    var result = await model.findAndCountAll(objQuery);
    result['totalPages'] = Math.ceil(result['count'] / payload.pageSize);
    result['currentPage'] = payload.currentPage;
    return result;
}