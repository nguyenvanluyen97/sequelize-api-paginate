module.exports.generateCondition = function generateCondition(params) {
    try {
        let character = '';
        listOperators.forEach(element => {

            if (params.includes(element.operator)) {

                character = element.operator;
            }
        });
        let arrLeftRight = params.split(character);
        arrLeftRight[0] = arrLeftRight[0].trim();
        arrLeftRight[1] = arrLeftRight[1].trim();
        let conditionReturn = {};
        switch (character) {
            case '==':
                conditionReturn[arrLeftRight[0]] = arrLeftRight[1];
                break;
            case '!=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.not]: arrLeftRight[1]
                };
                break;
            case '>':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.gt]: arrLeftRight[1]
                };
                break;
            case '<':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.lt]: arrLeftRight[1]
                };
                break;
            case '>=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.gte]: arrLeftRight[1]
                };
                break;
            case '<=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.lte]: arrLeftRight[1]
                };
                break;
            case '@=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '_=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.startsWith]: arrLeftRight[1]
                };
                break;
            case '!@=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.notLike]: arrLeftRight[1]
                };
                break;
            case '!_=':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.notILike]: "%" + arrLeftRight[1]
                };
                break;
                //chữ hoa
            case '@=*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '_=*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '==*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '!=*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '!@=*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            case '!_=*':
                conditionReturn[arrLeftRight[0]] = {
                    [Op.like]: arrLeftRight[1]
                };
                break;
            default:
                break;
        }

        return conditionReturn;
    } catch (ex) {
        console.log('error', ex);
        return {};
    }
}
