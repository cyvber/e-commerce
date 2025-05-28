// const express = require('express');
// const router = express.Router();
// const ProductController = require('../controllers/ProductController');
// const upload = require('../middleware/upload');


// router.post('/create', upload.array('images'),ProductController.createProduct);
// router.delete('/:id', ProductController.deleteProduct);
// router.get('/:id', ProductController.getProduct);
// router.get('/', ProductController.getAllProducts);
// router.put('/:id', ProductController.updateProduct);

// module.exports = router;



const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const upload = require('../middleware/upload');

// Admin routes
router.post('/', upload.array('images'), ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

// Public routes
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/bestsellers', ProductController.getBestSellers);
router.get('/discounts', ProductController.getDiscountProducts);
router.get('/types', ProductController.getGroupedTypes);

router.get('/', ProductController.getAllProducts);
// router.get('/slug/:slug', ProductController.getProductBySlug);
router.get('/:id', ProductController.getProductById);


module.exports = router;
