module.exports = (sequelize, DataTypes) => {

    const Employees = sequelize.define("employees", {
        name: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(255),
        },
        phone_number: {
            type: DataTypes.STRING(16),
        },
        jobtitle: {
            type: DataTypes.ENUM('manager', 'director', 'staff'),
        },
        company_id: {
            type: DataTypes.INTEGER(10),
        },
    })

    return Employees
}