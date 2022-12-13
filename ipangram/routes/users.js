var express = require('express');
var router = express.Router();
const AUTH = require('../controllers/auth');
const TECHNOLOGY = require('../controllers/technology')
const PROJECT = require('../controllers/project')
const GETDATA = require('../controllers/getData')
const TASK = require('../controllers/task');

const { protect } = require("../middleware/auth");
const {imgupload} = require('../utils/multer')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth/signup',AUTH.register)
router.get('/auth/login',AUTH.login)

router.post('/addTechnology',protect,imgupload,TECHNOLOGY.addTechnology)
router.post('/project',protect,imgupload,PROJECT.project)
router.post('/addMember/:id',protect,PROJECT.addMembers)
router.post('/removeMember/:id',protect,PROJECT.removeMember)

router.get('/bymentor',protect,GETDATA.mentorAddedProject);
router.get('/byemployee',protect,GETDATA.employeWorkProject);

router.post('/createTask/:id',protect,TASK.mentorAddTask);
router.post('/addComment/:id',protect,TASK.addComment);
router.post('/replayComment/:id/:commentId',protect,TASK.replayComment);
module.exports = router;
