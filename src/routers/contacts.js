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
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';


const router = Router();
const jsonParser = express.json();


router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId',isValidId, ctrlWrapper(getContactByIdController));
router.post('/', upload.single('photo'), jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId,ctrlWrapper(deleteContactController));
router.patch('/:contactId', upload.single('photo'), jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;

