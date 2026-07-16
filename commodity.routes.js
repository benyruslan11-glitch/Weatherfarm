const { Router } = require('express');
const { commodityController } = require('../controllers/commodity.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');
const { validate } = require('../middlewares/validate');
const { createCommoditySchema, updateCommoditySchema } = require('../validations/commodity.validation');

const router = Router();

router.get('/', authenticate, authorize('commodities.index'), commodityController.index);
router.get('/:id', authenticate, authorize('commodities.index'), commodityController.show);
router.post('/', authenticate, authorize('commodities.create'), validate(createCommoditySchema), commodityController.create);
router.put('/:id', authenticate, authorize('commodities.update'), validate(updateCommoditySchema), commodityController.update);
router.delete('/:id', authenticate, authorize('commodities.delete'), commodityController.destroy);

module.exports = router;
