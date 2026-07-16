const { Router } = require('express');
const { recommendationController } = require('../controllers/recommendation.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize, scopeData } = require('../middlewares/rbac');

const router = Router();

router.use(authenticate);

router.get('/:land_id/analysis', authorize('recommendations.index'), scopeData, recommendationController.getAnalysis);
router.get('/:land_id', authorize('recommendations.index'), scopeData, recommendationController.index);
router.post('/:land_id/generate', authorize('recommendations.create'), scopeData, recommendationController.generate);

module.exports = router;
