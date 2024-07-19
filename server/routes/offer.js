const router = require('express').Router();
const { createOffer, getOffer } = require('../controllers/offer');

router.post('/', createOffer);
router.get('/', getOffer);

module.exports = router;