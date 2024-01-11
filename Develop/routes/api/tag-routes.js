const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // fetch all tags
  // Included its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product }],
    });
    res.status(200).json(tagData);
    // Handle server error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Fetch a single tag by its `id`
  // Included its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      // If no tag found, return a 404 response
      res.status(404).json ({ message: "No tag found with that id! Try again please"});
      return;
    } // Send the tag data if successful
    res.status(200).json(tagData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    // Send the newly created tag data if successful
    res.status(200).json(locationData);
  } catch (err) {
    // Handle client-side error
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name},
      { where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0] === 0){
      // If no rows were affected, return a 404 response
      res.status(404).json ({ message: "No tag found with that ID! Try again please!"});
      return;
    }
    // Fetch the updated tag data and send it if successful
    const updatedTagData = await Tag.findByPk (req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(updatedTagData);
    // Handle server error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const tagData = await Tag.destory({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      // If no tag is found, return a 404 response
      res.status(404).json ({ message: "No tag found with that ID!"});
      return;
    }
    // Send the deleted tag data if successful
    res.status(200).json (tagData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

module.exports = router;
