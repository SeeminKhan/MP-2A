const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} = require ("../controllers/categoryController.js");

const { authenticate, authorizeAdmin } = require ("../middlewares/authMiddleware.js");

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

module.exports= router;
