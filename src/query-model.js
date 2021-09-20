'use strict'

module.exports = async function (model, payload, includeModels = []) {
    var result = await model.findAndCountAll({
        limit: payload.pageSize,
        offset: (payload.currentPage - 1) * payload.pageSize || 0,
        order: payload.sortField != null ? [
            [payload.sortField, payload.sortOrder]
        ] : [],
        include: includeModels,
        where: payload.filters,
        raw: true,
        nest: true
    });
    result['totalPages'] = Math.ceil(result['count'] / payload.pageSize);
    result['currentPage'] = payload.currentPage;
    return result;
}