const Joi = require('joi')

const company_schema = Joi.object({
    company_name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    
    telephone_number: Joi.string()
        .pattern(/^[0-9]+$/, { name: 'numbers'})
        .allow('',null)
        .min(8)
        .max(16),

    is_active: Joi.boolean()
        .default(false),
    
    address: Joi.string()
        .min(10)
        .max(50)
        .allow('',null),
});

const employee_schema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    
    email: Joi.string().email(
        { 
            minDomainSegments: 2
        })
        .min(5)
        .max(255)
        .required(),
    
    phone_number: Joi.string()
        .pattern(/^[0-9]+$/, { name: 'numbers'})
        .allow('',null)
        .min(8)
        .max(16),
    
    jobtitle: Joi.string()
        .valid('manager', 'director', 'staff'),
});

const validate = (body, method) => {
    
    let schema = ''

    if(method == 'employee'){
        schema = employee_schema
    }
    if(method == 'company'){
        schema = company_schema
    }

    const check =  schema.validate(body);
    return check
}

module.exports = validate