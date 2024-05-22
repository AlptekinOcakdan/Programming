import mongoose from "mongoose";

export function generateCategoryTree(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        console.log('parentId is null');
        category = categories.filter((cat) => cat.parent == undefined);
    } else {
        category = categories.filter((cat) => cat.parent == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.title,
            slug: cate.slug,
            parent: cate.parent,
            children: generateCategoryTree(
                categories,
                new mongoose.Types.ObjectId(cate._id).toString()
            ),
        });
    }

    return categoryList;
}