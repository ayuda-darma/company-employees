const express = require('express')

// import controllers review, Companies
const companiesController = require('../controllers/companiesController')
const employeesController = require('../controllers/employeesController')


const router = express.Router();


// companies
router.post('/addCompanies', companiesController.addCompanies)

router.get('/allCompanies', companiesController.getAllCompanies)

router.get('/:id', companiesController.getOneCompanies)

router.put('/:id', companiesController.updateCompanies)

router.delete('/:id', companiesController.deleteCompanies)


// employees
router.post('/addEmployees', employeesController.addEmployees)

router.get('/allEmployees', employeesController.getAllEmployees)

router.get('/:id', employeesController.getOneEmployees)

router.put('/:id', employeesController.updateEmployees)

router.delete('/:id', employeesController.deleteEmployees)


module.exports = router