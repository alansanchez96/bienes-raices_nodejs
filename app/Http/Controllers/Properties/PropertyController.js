import { Category, Price, Property } from '../../../Models/Associations.js';

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
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'An error has occurred' }],
            data: {}
        });
    });

    res.status(200).render('properties/create', {
        title: 'Post a new property',
        header: true,
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
    });

}

const store = async (req, res) => {

    const { title, description, category_id: categoryId, price_id: priceId, rooms, parking, wc, street, lat, lng } = req.body;

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
            lat,
            lng,
            userId,
            image: ''
        });

        const { id } = property;

        return res.redirect(303, `/properties/add-image/${id}`)

    } catch (error) {

    }

}

export {
    index,
    create,
    store
}