const router = require('express').Router();
const { BlogComment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogComment = await BlogComment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogComment);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogCommentData = await BlogComment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogCommentData) {
      res.status(404).json({ message: 'Could not foung blog post comment with this id!' });
      return;
    }

    res.status(200).json(blogCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;