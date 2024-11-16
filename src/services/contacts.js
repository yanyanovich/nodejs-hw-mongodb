import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export const getAllContacts = async (
    {
        page = 1,
        perPage = 10,
        sortOrder = SORT_ORDER.ASC,
        sortBy = '_id',
        filter = {},
        userId,
    }
) => {
    // const contacts = await ContactsCollection.find();
    // return contacts;
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find().where('userId').equals(userId);

    if (typeof filter.contactType !== "undefined") {
        contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (typeof filter.isFavourite !== "undefined") {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId,userId) => {
    return ContactsCollection.findOne({ _id: contactId, userId });
};


export const createContact = (payload) => {
    return ContactsCollection.create(payload);
};

export const deleteContact = (contactId,userId) => {
    return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = (contactId,userId, payload) => {
    return ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, payload, { new: true });
};
