
const Op = require("sequelize").Op;
const listOperators = [
    { operator: '==', meaning: 'Equals' },
    { operator: '!=', meaning: 'Not equals' },
    { operator: '>', meaning: 'Greater than' },
    { operator: '<', meaning: 'Less than' },
    { operator: '>=', meaning: 'Greater than or equal to' },
    { operator: '<=', meaning: 'Less than or equal to' },
    { operator: '@=', meaning: 'Contains' },
    { operator: '_=', meaning: 'Starts with' },
    { operator: '!@=', meaning: 'Does not Contains' },
    { operator: '!_=', meaning: 'Does not Starts with' },
    { operator: '[]', meaning: 'Only datetime, date between two date' }
]

function generateConditionExtra(params) {
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

        let conditionRight = arrLeftRight[1].split("|");

        let conditionReturn = [];

        let str = getBetweenConfition(arrLeftRight[0]);
        let arr = str.split("|");

        arr.forEach(element => {
            conditionRight.forEach(right => {
                let arrAppend = [element, right.trim()]
                let obj = genCondition(arrAppend, character);
                conditionReturn.push(obj);
            });
        });
        return conditionReturn;
    }
    catch (ex) {
        return {};
    }
}

function getBetweenConfition(str) {
    return str.substring(
        str.indexOf("(") + 1,
        str.lastIndexOf(")")
    ).trim();
}

function generateCondition(params) {
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
        let conditionReturn = genCondition(arrLeftRight, character);

        return conditionReturn;
    } catch (ex) {
        return {};
    }
}

function genCondition(arrLeftRight, character) {
    let conditionReturn = {};

    let conditionLeft = arrLeftRight[0];
    if (conditionLeft.includes('.')) {
        conditionLeft = "$" + conditionLeft + "$";
    }

    let conditionRight = arrLeftRight[1];
    if (conditionRight == 'null')
        conditionRight = null;

    switch (character) {
        case '==':
            conditionReturn[conditionLeft] = conditionRight;
            break;
        case '!=':
            conditionReturn[conditionLeft] = {
                [Op.not]: conditionRight
            };
            break;
        case '>':
            conditionReturn[conditionLeft] = {
                [Op.gt]: conditionRight
            };
            break;
        case '<':
            conditionReturn[conditionLeft] = {
                [Op.lt]: conditionRight
            };
            break;
        case '>=':
            conditionReturn[conditionLeft] = {
                [Op.gte]: conditionRight
            };
            break;
        case '<=':
            conditionReturn[conditionLeft] = {
                [Op.lte]: conditionRight
            };
            break;
        case '@=':
            conditionReturn[conditionLeft] = {
                [Op.iLike]: "%" + conditionRight + "%"
            };
            break;
        case '_=':
            conditionReturn[conditionLeft] = {
                [Op.startsWith]: conditionRight
            };
            break;
        case '!@=':
            conditionReturn[conditionLeft] = {
                [Op.notLike]: "%" + conditionRight + "%"
            };
            break;
        case '!_=':
            conditionReturn[conditionLeft] = {
                [Op.notILike]: "%" + conditionRight
            };
            break;
        case '[]':
            const valSearch = getBetweenConfition(conditionRight);
            const arrStartEnd = valSearch.split('-');
            const start = new Date(arrStartEnd[0]);
            const end = new Date(arrStartEnd[1]);
            conditionReturn[conditionLeft] = {
                [Op.between]: [start, end]
            };
            break;
        default:
            break;
    }
    return conditionReturn;
}

module.exports = {
    generateCondition: generateCondition,
    generateConditionExtra: generateConditionExtra
};