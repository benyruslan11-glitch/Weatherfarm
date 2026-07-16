const { Router } = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const landRoutes = require('./land.routes');
const commodityRoutes = require('./commodity.routes');
const weatherRoutes = require('./weather.routes');
const recommendationRoutes = require('./recommendation.routes');
const alertRoutes = require('./alert.routes');
const roleRoutes = require('./role.routes');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'WeatherFarm API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/lands', landRoutes);
router.use('/commodities', commodityRoutes);
router.use('/weather', weatherRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/alerts', alertRoutes);
router.use('/roles', roleRoutes);

// Reports (simple aggregate)
router.get('/reports/overview', authenticate, authorize('reports.index'), async (_req, res, next) => {
  try {
    const { pool } = require('../config/database');
    const [[{ totalUsers }], [{ totalLands }], [{ totalAlerts }]] = await Promise.all([
      pool.query('SELECT COUNT(*) as totalUsers FROM users'),
      pool.query('SELECT COUNT(*) as totalLands FROM lands'),
      pool.query('SELECT COUNT(*) as totalAlerts FROM alerts WHERE is_read = 0'),
    ]);
    res.json({
      success: true,
      data: { totalUsers, totalLands, totalAlerts: Number(totalAlerts) },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
