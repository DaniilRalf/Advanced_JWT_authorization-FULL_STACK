const Router = require('express');
const router = new Router();


router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/acrivate/:link');
router.get('/refresh');
router.get('/users');


module.exports = router;