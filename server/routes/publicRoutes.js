import express from 'express';
import { getProducts, getProductBySlug } from '../controllers/productsController.js';
import { getCategories, getCategoryBySlug } from '../controllers/categoriesController.js';
import { getGallery } from '../controllers/galleryController.js';
import { getTestimonials } from '../controllers/testimonialsController.js';
import { getSettings } from '../controllers/settingsController.js';
import { submitMessage } from '../controllers/messagesController.js';
import { submitQuote } from '../controllers/quotesController.js';

const router = express.Router();

// Products
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);

// Categories
router.get('/categories', getCategories);
router.get('/categories/:slug', getCategoryBySlug);

// Gallery & Testimonials
router.get('/gallery', getGallery);
router.get('/testimonials', getTestimonials);

// Settings
router.get('/settings', getSettings);

// Forms
router.post('/messages', submitMessage);
router.post('/quotes', submitQuote);

export default router;
