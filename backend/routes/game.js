const express = require('express');

const router = express.Router();

router.get('/:roomName', (req, res, next) => {
  console.log(req.params.roomName);
  res.status(200).json({
    message: `Successfully queried by room name!`,
    room: req.params.roomName
})
});

module.exports = router;