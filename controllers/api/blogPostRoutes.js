const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
// Creates a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Updates blog post by its id.
router.put("/:id", withAuth, async (req, res) => {
  BlogPost.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBlogPost) => {
      res.json(updatedBlogPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// Deletes blog post by its id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log(blogPostData);
    if (!blogPostData) {
      res
        .status(404)
        .json({ message: "Could not fount blog post with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
