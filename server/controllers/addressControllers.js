const datab = require('../database.js')


const addAddress = (req,res) => {
    const {id} = req.params
    const {address_details,city,state,pin_code} = req.body
    if (address_details === "" || city === "",state === "",pin_code === ""){
        res.status(400).json({'message' : 'Address Fields Cannot be Empty'})
    } 
    else{
    const query = `INSERT INTO addresses(customer_id,address_details,city,state,pin_code) VALUES (${id},'${address_details}','${city}','${state}','${pin_code}');`
    datab.run(query,[],(err) => {
        if (err){
            console.log(err)
            res.status(400).json({"error":err.message})
        }
        res.status(200).json({"message":'Address ADDED'})
    })
}
}

const getAddress = (req,res)=>{
    const {id} = req.params
    const query = `SELECT * FROM customers INNER JOIN addresses on customers.id = addresses.customer_id WHERE customers.id = ?;`
    let addressArray = []
    const addressModify = (rows) =>{
        addressArray = rows.map((eachitem) => ({
            'id' : eachitem.id,
            'address_details' : eachitem.address_details,
            'city' : eachitem.city,
            'state' : eachitem.state,
            'pin_code' : eachitem.pin_code
        }))
    }

    datab.all(query,[id],(err,rows) => {
        if (err){
            console.log(err)
            res.status(400).json({"error":err.message})
        }
        addressModify(rows)
        res.status(200).json({"message":'SUCCESS',
            "data": addressArray
        }) 
    })
}


const updateAddress = (req,res) => {
    const {addressId} = req.params
    const {address_details,city,state,pin_code} = req.body
    if (address_details === "" || city === "" || state === "" || pin_code === ""){
        res.status(400).json({'message' : 'Address Fields cannot be Empty'})
    }
    else{
        const query = `UPDATE addresses SET address_details = '${address_details}',city = '${city}',state = '${state}', pin_code = '${pin_code}' WHERE id = ?;`
        datab.run(query,[addressId],(err) => {
            if (err){
                console.log(err)
                res.status(400).json({"error":err.message})
            }
            res.status(200).json({"message":'Address Updated'})
        })
    }
}


const deleteAddress = (req,res) => {
    const {addressId} = req.params
    const query = `DELETE FROM addresses WHERE id = ?;`
    datab.run(query,[addressId],(err) => {
        if (err){
            console.log(err)
            res.status(400).json({"error":err.message})
        }
        res.status(200).json({"message":'Address DELETED'})
    })
}

module.exports = {addAddress,getAddress,updateAddress,deleteAddress}
