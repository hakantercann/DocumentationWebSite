
const router = require('express').Router();
const videoController = require('../controllers/video.controller.js')


router.post('/add/video', videoController.addVideo);

router.delete('/delete/video/:videoID', videoController.deleteVideo);

router.get('/list/videos', videoController.getAllVideo);

router.put('/update/:videoID', videoController.updateVideo);


router.post('/search', videoController.searchVideo);
module.exports = router;