module.exports = (sequelize, DataTypes) => {

    const Companies = sequelize.define("companies", {
        company_name: {
            type: DataTypes.STRING(50),
        },
        telephone_number: {
            type: DataTypes.STRING(16),
        },
        is_active: {
            type: DataTypes.BOOLEAN,
        },
        address: {
            type: DataTypes.STRING(50),
        },
    })

    return Companies
}