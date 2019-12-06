const bcrypt = require('bcryptjs');

module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert('users', [
            {
                name: 'Administrador2',
                email: 'admin2@gympoint.com',
                provider: true,
                password_hash: bcrypt.hashSync('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: queryInterface => {
        return queryInterface.dropTable('users');
    },
};
