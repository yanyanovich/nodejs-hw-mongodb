import express from 'express';
import { Router } from "express";

import {
    getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(patchContactController));


export default router;

