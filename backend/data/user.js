import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Boni Smith',
        email: 'boni@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'New Cat',
        email: 'new@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
]
export default users