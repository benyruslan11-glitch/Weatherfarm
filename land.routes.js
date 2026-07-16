const { Router } = require('express');
const { landController } = require('../controllers/land.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize, scopeData } = require('../middlewares/rbac');
const { validate } = require('../middlewares/validate');
const { createLandSchema, updateLandSchema } = require('../validations/land.validation');

const router = Router();

router.use(authenticate);

router.get('/', authorize('lands.index'), scopeData, landController.index);
router.get('/:id', authorize('lands.show'), scopeData, landController.show);
router.post('/', authorize('lands.create'), validate(createLandSchema), landController.create);
router.put('/:id', authorize('lands.update'), scopeData, validate(updateLandSchema), landController.update);
router.delete('/:id', authorize('lands.delete'), scopeData, landController.destroy);

module.exports = router;
