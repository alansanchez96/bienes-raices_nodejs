import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Admin',
        lastname: 'Publico',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin', 10),
        confirmed: true,
    }
];

export default users;