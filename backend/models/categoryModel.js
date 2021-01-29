import mongoose from 'mongoose'

const subCategorySchema = mongoose.Schema({
  subCategory: {
    type: String,
  },
})

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: { type: String },
  subCategories: [subCategorySchema],
})

const Category = mongoose.model('Category', categorySchema)

export default Category
