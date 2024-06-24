import { removeTicks } from 'sequelize/lib/utils'
import {customer} from '../model/user-model.js'
import { sequelize } from '../model/database.js'



export const selectAllCustomer = async ()=>{
const listCustomer =  await customer.findAll()
.then(Customers=>{
        console.log(Customers)
        return Customers
})
.catch(err=>{
    console.error(err)
})
return listCustomer
}

export const selectCustomerWithId = async (id)=>{

    const Customer = await customer.findByPk(id)
    .then(Customerr=>{
        if(!Customerr)
            {
        console.log("get customer by id success")
        console.log(Customerr.dataValues)
            
        return Customerr.dataValues
            }
    })
    return Customer
}
// const newcustomer = {
    
//     name:"Nguyen Duy Tung",
//     email:"NguyenduyTung@gmail.com",
//     password:'123456',
//     gender:1,
//     date:"2003-01-01",
//     cccd:'042204001043',
//     adrress:'Da Nang'
// }

export const createCustomer = async (Customer)=>{
    Customer.customerId = await createId()
    const create= await customer.create(Customer)
    .then( customers =>{
        console.log("create success")
        console.log(customers)
        return customers.dataValues
    })
    .catch(err=>{
        console.error("create fail",err)
    })

    return create
}

export const updateCustomer = async (Customer)=>{
    const checkCustomer = await customer.findByPk(Customer.customerId)
        if(!checkCustomer)
        {
                console.log('Customer ko ton tai')
                return
        }
    const update = await customer.update(Customer,{where: {
        customerId: Customer.customerId
    }})
    .then(customerResult=>{
        console.log('update success')
        console.log(customerResult.dataValues)
    })
    .catch(err=>{
        console.error("update fail",err)
    })
}


export const deleteCustomer = async (id)=>{
    const Delete = await customer.destroy({
        where:{
            customerId: id
        }
    })
    .then(customerResult=>{
        console.log('delete success')
    })
}

export const createId = async () => {
    const biggestIdCtm = await customer.findOne({
        order: [['customerId', 'DESC']]   
    })
    .then(customerr=>{
        return customerr.dataValues
    })
    .catch(err=>{
        console.error("loi",err)
    })
    
    let id = Number(biggestIdCtm.customerId.slice(1))
    id++
    if(id<10)
    {
        return "C00"+id
    }
    else if(id<100)
    {
        return "C0"+id
    }
    else if(id<1000)
    {
        return "C"+id
    }
};

