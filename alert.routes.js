const { Router } = require('express');
const { alertController } = require('../controllers/alert.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');
const { validate } = require('../middlewares/validate');
const { createAlertSchema } = require('../validations/index');

const router = Router();

router.use(authenticate);

router.get('/', authorize('alerts.index'), alertController.index);
router.post('/', authorize('alerts.send'), validate(createAlertSchema), alertController.create);
router.patch('/:id/read', authorize('alerts.index'), alertController.markAsRead);
router.patch('/read-all', authorize('alerts.index'), alertController.markAllAsRead);
router.delete('/:id', authorize('alerts.delete'), alertController.destroy);

module.exports = router;
