const express = require('express');

const variantController = require('../controllers/variant');

const router = express.Router();

router.get('/variants', variantController.getVariants);
router.post('/variant/add', variantController.addVariant);
router.put('/variant/update/:id', variantController.updateVariant);
router.delete('/variant/delete/:id', variantController.deleteVariant);

module.exports = router;