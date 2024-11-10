import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

// Regular Expression for ObjectID (MongoDB): / ^[a-fA-F0-9]{24}$ /

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(createHttpError(400, 'Id is not valid!'));
        return;
    }
    next();
};
