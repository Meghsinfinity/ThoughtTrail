const express = require('express');
const Opinion = require('../models/Opinion');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/', auth, async (req, res) => {
  try {
    const opinion = new Opinion({
      userId: req.user.id,
      username: req.user.username,
      text: req.body.text,
    });
    await opinion.save();
    res.json({ msg: 'Opinion submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const opinions = await Opinion.find().sort({ timestamp: -1 });
    res.json(opinions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
