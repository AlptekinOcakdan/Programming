export const requiredParams = (params) => {
    const missingParams = [];
    params.forEach(param => {
        if (!param && !(param.length > 0)) {
            missingParams.push(param);
        }
    });
    if (missingParams.length > 0) {
        return missingParams;
    }
    return false;
}