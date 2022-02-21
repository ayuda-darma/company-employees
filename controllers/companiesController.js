const db = require ('../models')
const validate = require('../function/validation.js')

//create main model
const Companies = db.companies
const Employees = db.employess

// create companies
const addCompanies = async (req, res) => {
    
    try {
        const check = validate(req.body, "company")
        let is_valid = false
        
        try {
            console.log(check.error.details[0].message)
        } catch (err) {
            console.log("Validation Pass")
            is_valid = true
        }

        if(!is_valid) {
            res.statusMessage = "Invalid request"
                return res.status(409).json({
                    "status": 400,
                    "code": "400",
                    "data": null,
                    "message": check.error.details[0].message
                })
        } else {
            const count = await Companies.count({
                where: {
                    company_name: req.body.company_name
                }
            })

            if (count != 0) {
                res.statusMessage = "Conflict"
                return res.status(409).json({
                    "status": 409,
                    "code": "409",
                    "data": null,
                    "message": "Company Name already exist"
                })
            } else {
                const result = await Companies.create(req.body)
                res.statusMessage = "Success"
                return res.status(201).json({
                    "status": 201,
                    "code": "201",
                    "data": {
                        "id": result.id
                    },
                    "message": "Success"
                })
            }
        }

    } catch (error) {
        console.log(error);
    }

}

// get all companies
const getAllCompanies = async (req, res) => {

    let companies = await Companies.findAll({})
    res.status(200).send(companies)

}

// get single companies
const getOneCompanies = async (req, res) => {

    let id = req.params.id
    let companies = await Companies.findOne({ where: { id: id }})
    res.status(200).send(companies)

}

// update companies
const updateCompanies = async (req, res) => {

    let id = req.params.id

    const companies = await Companies.update(req.body, { where: { id: id }})

    res.status(200).send(companies)

}

// delete companies by id
const deleteCompanies = async (req, res) => {

    let id = req.params.id
    
    await Companies.destroy({ where: { id: id }} )

    res.status(200).send('Companies is deleted !')

}

module.exports = {
    addCompanies,
    getAllCompanies,
    getOneCompanies,
    updateCompanies,
    deleteCompanies,
}