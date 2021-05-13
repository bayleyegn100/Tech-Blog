const router = require("express").Router();
const { BlogPost, User, BlogComment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const BlogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
    // Get a blog post by its id
    // Use withAuth middleware to prevent access to route
router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: BlogComment,
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
    // Get edited blog post by its id
    // Use withAuth middleware to prevent access to route
router.get("/edit/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    res.render("edit", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
    // Find the logged in user based on the session ID
    // Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(Number(req.session.user_id), {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  // If the user is already logged in, redirect the request to another route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
