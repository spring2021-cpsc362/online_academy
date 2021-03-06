const express = require('express');

const router = express.Router();
const courseController = require('../app/controllers/coursecontroller');
const { requiresAuth } = require('express-openid-connect');
const {authenreq , authenRoleAdmin , authenRoleProf} = require('../config/auth/auth')
router.get('/create',requiresAuth(), authenRoleProf, courseController.create);
router.get('/:courseName',requiresAuth(), courseController.show);
router.post('/store',requiresAuth(),courseController.store);
router.get('/:id/edit',authenRoleProf,courseController.edit);

router.put('/:id/:name',authenRoleProf,courseController.update);

router.delete('/:id',authenRoleProf,courseController.destroy);
router.get('/:id/delete',requiresAuth(),courseController.delete);
router.get('/student/:id',requiresAuth(),courseController.upsert);

module.exports = router;

