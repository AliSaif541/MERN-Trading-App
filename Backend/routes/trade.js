const router = require('express').Router();
const { createTrade, browseTrades, specificTrade, updateTrade, closeTrade, offerTrade } = require('../controllers/trade');

router.get('/', browseTrades);
router.get('/specific', specificTrade);
router.get('/offer', offerTrade);
router.post('/', createTrade);
router.post('/update', updateTrade);
router.post('/close', closeTrade);

module.exports = router;