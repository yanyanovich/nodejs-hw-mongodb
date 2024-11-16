import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contacts.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
    (...roles) =>
        async (req, res, next) => {
            const { user } = req;
            if (!user) {
                next(createHttpError(401));
                return;
            }

            const { role } = user;
            if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
                next();
                return;
            }

            if (roles.includes(ROLES.PERSON) && role === ROLES.PERSON) {
                const { contactId } = req.params;
                if (!contactId) {
                    next(createHttpError(403));
                    return;
                }

                const contact = await ContactsCollection.findOne({
                    _id: contactId,
                    userId: user._id,
                });

                if (contact) {
                    next();
                    return;
                }
            }

            next(createHttpError(403));
        };
