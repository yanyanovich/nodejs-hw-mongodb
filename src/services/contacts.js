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
    }
) => {
    // const contacts = await ContactsCollection.find();
    // return contacts;
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

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

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};


export const createContact = (payload) => {
    return ContactsCollection.create(payload);
};

export const deleteContact = (contactId) => {
    return ContactsCollection.findOneAndDelete({ _id: contactId });
};

export const updateContact = (contactId, payload) => {
    return ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, { new: true });
};
