'use strict'

module.exports = async function(model,payload) {
    var result = await model.findAndCountAll({
        limit: payload.pageSize,
        offset: (payload.currentPage - 1) * payload.pageSize || 0,
        order: payload.sortField != null ? [
            [payload.sortField, payload.sortOrder]
        ] : [],
        where: payload.filters
    });
    result['totalPages'] = Math.ceil(result['count'] / payload.pageSize);
    result['currentPage'] = payload.currentPage;
    return result;
}