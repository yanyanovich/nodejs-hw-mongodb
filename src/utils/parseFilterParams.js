
const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isContactType = (type) => ['work', 'home', 'personal'].includes(type);
    if (isContactType(type)) return type;
};

const parseIsFavourite = (value) => {
    if (typeof value === 'boolean') return value;
    const valueToString = String(value).toLowerCase();
    if (valueToString === 'true') return true;
    if (valueToString === 'false') return false;
    return undefined;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};
