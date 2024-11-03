import { ContactsCollection } from '../db/models/contacts.js';


export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
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
