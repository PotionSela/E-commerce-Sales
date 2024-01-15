const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Find all categories
  // Included its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Send data if successful
    res.status(200).json(categoryData);
    // Handle server error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Find one category by its `id` value
  // Included its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      // If no category is found, return a 404 response
      res.status(404).json({ message: "No category found with that ID! Try again please." });
      return;
    }  // Send the tag data if successful
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Create a new category
  try {
    const categoryData = await Category.create ({
      category_name: req.body.category_name,
    });
    // Sending the newly created category data if successful
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle client-side error
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // Update a category by its `id` value
try {
  const updatedCategory = await Category.update (
    { category_name: req.body.category_name },
    { where: {
      id: req.params.id,
    },
  });
  if (updatedCategory[0] === 0 ) {
    // If no rows were affected, return a 404 response
    res.status(404).json ({ message: "No category found with that ID! Try again please."});
    return;
  }
  // Find the updated category data and send it if it's successful
  const updatedCategoryData = await Category.findByPk (req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(updatedCategoryData);
  // Handle server error
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // Delete a category by its `id` value
  try {
    const categoryData = await Category.destroy ({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      // If no category is found, return a 404 response
      res.status(404).json ({ message: "No category found with that ID! Try again please."});
      return;
    }
    // Send the deleted category data if successful
    res.status(200).json (categoryData);
  } catch (err) {
    // Handle server error
    console.log("Error from category delete", err);
    res.status(500).json(err);
  }
});

module.exports = router;
