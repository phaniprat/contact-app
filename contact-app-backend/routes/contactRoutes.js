const express = require('express');
const contactController = require('../controllers/contactControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/recent', authMiddleware, contactController.getRecentContact);
router.get('/fav',authMiddleware, contactController.getFavContacts);
router.post('/', authMiddleware, contactController.createContact);
router.get('/', authMiddleware, contactController.getContacts);
router.get('/sort', authMiddleware, contactController.sortContacts);
router.get('/:id', authMiddleware, contactController.getContactById);
router.put('/:id', authMiddleware, contactController.updateContact);
router.delete('/:id', authMiddleware, contactController.deleteContact);
router.patch('/:id', authMiddleware, contactController.updateFavContact);


module.exports = router;

