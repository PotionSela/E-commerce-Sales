const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json ({ message: "No tag found with that id! Try again please"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const locationData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name},
      { where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0] === 0){
      res.status(404).json ({ message: "No tag found with that ID! Try again please!"});
      return;
    }
    const updatedTagData = await Tag.findByPk (req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destory({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json ({ message: "No tag found with that ID!"});
      return;
    }
    res.status(200).json (tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
