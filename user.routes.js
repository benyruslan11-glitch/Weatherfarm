const { Router } = require('express');
const { userController } = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = Router();

router.use(authenticate);

router.get('/', authorize('users.index'), userController.index);
router.get('/:id', authorize('users.show'), userController.show);
router.put('/:id', authorize('users.update'), userController.update);
router.delete('/:id', authorize('users.delete'), userController.destroy);

module.exports = router;
