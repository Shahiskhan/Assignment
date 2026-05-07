const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = new express.Router();

router.get('/list', tokenController.list);
router.post('/add', tokenController.add);
router.post('/del', tokenController.delete);
router.get("/nft-analytics", tokenController.nftAnalytics);
module.exports = router;