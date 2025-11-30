// /api/made-by route
const router = require('express').Router();
const { getMadeBy } = require('../controllers/madeByController');

router.get('/', getMadeBy);

module.exports = router;