const { Router } = require('express');
const { roleController } = require('../controllers/role.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');
const { validate } = require('../middlewares/validate');
const { createRoleSchema, updateRoleSchema, assignRoleSchema } = require('../validations/index');

const router = Router();

router.use(authenticate);

router.get('/', authorize('roles.index'), roleController.index);
router.get('/:id', authorize('roles.index'), roleController.show);
router.post('/', authorize('roles.create'), validate(createRoleSchema), roleController.create);
router.put('/:id', authorize('roles.update'), validate(updateRoleSchema), roleController.update);
router.delete('/:id', authorize('roles.delete'), roleController.destroy);

router.post('/assign', authorize('roles.assign'), roleController.assignRole);
router.post('/remove', authorize('roles.assign'), roleController.removeRole);

router.get('/:id/permissions', authorize('roles.index'), roleController.getPermissions);
router.post('/:id/permissions', authorize('roles.update'), roleController.assignPermission);
router.delete('/:id/permissions', authorize('roles.update'), roleController.removePermission);

module.exports = router;
