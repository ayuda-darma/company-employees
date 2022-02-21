const db = require ('../models')
const validate = require('../function/validation.js')

//create main model
const Companies = db.companies
const Employees = db.employess

// create employees
const addEmployees = async (req, res) => {
    
    try {

        const check = validate(req.body, "employee")
        let is_valid = false
        
        try {
            console.log(check.error.details[0].message)
        } catch (err) {
            console.log("Validation Pass")
            is_valid = true
        }

        if(!is_valid) {
            res.statusMessage = "Invalid request"
            return res.status(400).json({
                "status": 400,
                "code": "400",
                "data": null,
                "message": check.error.details[0].message
            })
        }

        const count = await Employees.findOne({
            where: {
                email: req.body.email
            }
        })

        if (count) {
             res.statusMessage = "Conflict"
            return res.status(409).json({
                "status": 409,
                "code": "409",
                "data": null,
                "message": "Email already exist"
            })
        }

        req.body.company_id = req.params.company_id
        const result = await Employees.create(req.body)
        let data = {
            "id": result.id,
            "company_id": result.company_id
        }
        res.statusMessage = 'Created'
        return res.status(201).json({
            "status": 201,
            "code": "201",
            "data": data,
            "message": "Success"
        })
    } catch (err) {
        console.log(err)
    } 
}


// get all employees
const getAllEmployees = async (req, res) => {

    let employees = await Employees.findAll({})
    res.status(200).send(employees)

}

// get single employees
const getOneEmployees = async (req, res) => {

    let id = req.params.id
    let employees = await Employees.findOne({ where: { id: id }})
    res.status(200).send(employees)

}

// update employees
const updateEmployees = async (req, res) => {

    try {

        const check = validate(req.body, "employee")
        let is_valid = false
        
        try {
            console.log(check.error.details[0].message)
        } catch (err) {
            console.log("Validation Pass")
            is_valid = true
        }

        if(!is_valid) {
            res.statusMessage = ": Invalid request"
            return res.status(400).json({
                "status": 400,
                "code": "400",
                "data": null,
                "message": check.error.details[0].message
            })
        }

        try {
            let check_email = await Employees.findOne({
                where: {
                    email: req.body.email
                },
                raw: true
            })

            if(check_email != null) {
                res.statusMessage = ": Conflict"
                return res.status(409).json({
                    "status": 409,
                    "code": "409",
                    "data": null,
                    "message": "Email already exist"
                })
            }
        } catch (err) {
            console.log("email check skip, because no email on body")
        }

        req.body = {
            "name": req.body.name,
            "email": req.body.email,
            "phone_number": req.body.phone_number,
            "jobtitle": req.body.jobtitle,
            "company_id": req.params.company_id 
        }

        await Employees.update(req.body, {
            where: {
                id: req.params.employee_id
            }
        })

        let data = {
            "id": req.params.employee_id,
            "company_id": req.params.company_id
        }
        res.statusMessage = ': Success'
        return res.status(201).json({
            "status": 201,
            "code": "201",
            "data": data,
            "message": 'Success'
        })
    } catch (err) {
        console.log(err)
    }
}

// delete employees by id
const deleteEmployees = async (req, res) => {

    let id = req.params.id
    
    await Employees.destroy({ where: { id: id }} )

    res.status(200).send('Employees is deleted !')

}

module.exports = {
    addEmployees,
    getAllEmployees,
    getOneEmployees,
    updateEmployees,
    deleteEmployees,
}