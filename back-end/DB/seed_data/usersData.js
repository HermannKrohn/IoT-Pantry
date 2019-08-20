const bcrypt = require('bcrypt')

let usersData = [
    {
        firstName: "Jack",
        lastName: "Parker",
        username: "jp123",
        email: "jp@test.com",
        hardwarePin: 4533,
        password_digest: "123"
    },
    {
        firstName: "Avery",
        lastName: "Jackson",
        username: "ap123",
        email: "ap@test.com",
        hardwarePin: 4433,
        password_digest: "123"
    },
    {
        firstName: "Rey",
        lastName: "Rey",
        username: "ReyRey",
        email: "jc@test.com",
        hardwarePin: 4111,
        password_digest: "123"
    }
]

module.exports = usersData