import express from "express";

const router = express.Router();

//Create A Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Update A Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The Post Has Been Updated");
    } else {
      res.status(403).json("You Can Update Only Your Post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//Delete A Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("The Post Has Been Deleted");
    } else {
      res.status(403).json("You Can Delete Only Your Post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//Like A Post / Dislike
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("This Post Has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("This Post Has been DisLiked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//Get A Post
//Get TimeLine Post

export default router;
