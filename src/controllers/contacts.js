import { getAllContacts, getContactById,createContact,deleteContact,updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};


export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user._id);

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
    const photo = req.file;
    let photoUrl = null;

    if (photo) {
        photoUrl = await saveFileToCloudinary(photo);
    }

    const newContact = await createContact({
        ...req.body,
        userId: req.user._id,
        photo: photoUrl,
    });

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: newContact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const photo = req.file;
    let photoUrl = null;

    if (photo) {
        photoUrl = await saveFileToCloudinary(photo);
    }

    const result = await updateContact(contactId, req.user._id, {...req.body, photo: photoUrl});

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully patched a Contact with id ${contactId}!`,
        data: result,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId, req.user._id);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
