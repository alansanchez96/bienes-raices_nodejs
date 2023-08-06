const index = (req, res) => {
    res.render('properties/index', {
        title: 'My properties',
        header: true
    })
}

const create = (req, res) => {
    res.render('properties/create', {
        title: 'Post a new property',
        header: true
    })
}

export {
    index,
    create
}