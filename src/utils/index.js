const removeNullKeys = (keys) => {
    Object.entries(keys).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            if (Object.keys(value).length > 0) {
                removeNullKeys(value);
                // eslint-disable-next-line no-param-reassign
                if (Object.keys(value).length === 0) delete keys[key];
            } else {
                delete keys[key]; // eslint-disable-line no-param-reassign
            }
        } else if (value === null) {
            delete keys[key]; // eslint-disable-line no-param-reassign
        }
    });

    return keys;
};

module.exports = {
    removeNullKeys,
};