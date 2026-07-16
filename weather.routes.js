const { Router } = require('express');
const { weatherController } = require('../controllers/weather.controller');
const { authenticate } = require('../middlewares/auth');
const { authorize, scopeData } = require('../middlewares/rbac');

const router = Router();

// Public endpoint — no auth required
router.get('/public/forecast', (req, res, next) => {
  weatherController.getForecastByCoordinates(req, res, next);
});

// Protected routes
router.use(authenticate);

router.get('/by-coordinates', authorize('weather.index'), weatherController.getForecastByCoordinates);
router.get('/:land_id', authorize('weather.index'), scopeData, weatherController.getForecast);
router.post('/sync', authorize('weather.sync'), weatherController.sync);

module.exports = router;
