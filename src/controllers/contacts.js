import { getAllContacts, getContactById,createContact,deleteContact,updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};


export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    // Відповідь, якщо контакт знайдено
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};


export const createContactController = async (req, res) => {
    const newContact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: newContact,
    });
};


export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully patched a Contact!`,
        data: result,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
