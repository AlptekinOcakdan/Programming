export const requiredParams = (params) => {
    const missingParams = [];
    for (const key in params) {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
            missingParams.push(key);
        }
    }
    return missingParams.length > 0 ? missingParams.join(', ') : false;
};