import { Category, Price, Property } from '../../../Models/Associations.js';

const index = (req, res) => {
    res.status(200).render('properties/index', {
        title: 'My properties'
    })
}

const create = async (req, res) => {
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]).catch(() => {
        res.status(500).render('properties/create', {
            title: 'Post a new property',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'An error has occurred' }],
            data: {}
        });
    });

    res.status(200).render('properties/create', {
        title: 'Post a new property',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
    });

}

const store = async (req, res) => {

    const { title, description, category_id: categoryId, price_id: priceId, rooms, parking, wc, street, lat: latitude, lng: longitude } = req.body;

    const { id: userId } = req.user;

    try {
        const property = await Property.create({
            title,
            description,
            categoryId,
            priceId,
            rooms,
            parking,
            wc,
            street,
            latitude,
            longitude,
            userId,
            image: ''
        });

        const { id } = property;

        return res.redirect(`/properties/add-image/${id}`)

    } catch (error) {

    }

}

const addImage = async (req, res) => {
    res.render('properties/add-image', {
        title: 'Add images'
    });
}

export {
    index,
    create,
    store,
    addImage
}