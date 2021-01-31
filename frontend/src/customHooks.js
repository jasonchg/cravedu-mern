export const getParentCategory = (categories, currentCategory) => {
  for (let key in categories) {
    if (
      categories[key].subCategories.some(
        (x) => x.subCategory === currentCategory
      )
    ) {
      return categories[key].category
    }
  }
}
