import express from 'express';
import { login, getMe, changePassword } from '../controllers/authController.js';
import { adminGetProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoriesController.js';
import { adminGetMessages, adminToggleMessageRead, adminDeleteMessage } from '../controllers/messagesController.js';
import { adminGetQuotes, adminUpdateQuoteStatus, adminDeleteQuote } from '../controllers/quotesController.js';
import { getGallery, adminAddGalleryImage, adminDeleteGalleryImage } from '../controllers/galleryController.js';
import { getTestimonials, adminCreateTestimonial, adminDeleteTestimonial } from '../controllers/testimonialsController.js';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { getAdminStats } from '../controllers/statsController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public auth route
router.post('/login', login);

// Protected admin routes below
router.use(authenticateToken);

// Auth verification & password change
router.get('/me', getMe);
router.put('/password', changePassword);

// Dashboard stats
router.get('/stats', getAdminStats);

// Products CRUD
router.get('/products', adminGetProducts);
router.post('/products', upload.array('images', 5), createProduct);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);

// Categories CRUD
router.get('/categories', getCategories);
router.post('/categories', upload.single('image'), createCategory);
router.put('/categories/:id', upload.single('image'), updateCategory);
router.delete('/categories/:id', deleteCategory);

// Messages
router.get('/messages', adminGetMessages);
router.patch('/messages/:id', adminToggleMessageRead);
router.delete('/messages/:id', adminDeleteMessage);

// Quotes
router.get('/quotes', adminGetQuotes);
router.patch('/quotes/:id', adminUpdateQuoteStatus);
router.delete('/quotes/:id', adminDeleteQuote);

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', upload.single('image'), adminAddGalleryImage);
router.delete('/gallery/:id', adminDeleteGalleryImage);

// Testimonials
router.get('/testimonials', getTestimonials);
router.post('/testimonials', adminCreateTestimonial);
router.delete('/testimonials/:id', adminDeleteTestimonial);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
