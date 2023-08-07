import Category from "../../../Models/Category.js";
import Price from "../../../Models/Price.js";

const index = (req, res) => {
    res.status(200).render('properties/index', {
        title: 'My properties',
        header: true
    })
}

const create = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]).catch(() => {
        res.status(500).render('properties/create', {
            title: 'Post a new property',
            header: true,
            errors: [{ msg: 'An error has occurred' }]
        });
    });

    res.status(200).render('properties/create', {
        title: 'Post a new property',
        header: true,
        categories,
        prices
    });

}

export {
    index,
    create
}