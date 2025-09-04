const datab = require('../database.js')




// const  getCustomers = async (req, res) => {
//     // const {city,first_name,} = req.query
//     let query = `SELECT * FROM customers  WHERE 1=1;`;
    




//     // if (city) {
//     //     query += ` AND city LIKE ?`;
//     //     params.push('%${city}%');
//     // }

//     //const query = `SELECT customers.id,customers.first_name,customers.last_name,customers.phone_number FROM customers LEFT JOIN addresses  WHERE 1=1 AND city LIKE ?;`
//     let customerArray = []
//     datab.all(query,[],(err,rows) => {
        
//         if (err){
//             console.log(err)
//             res.status(500).json({"error":err.message})
//         }
//         customerArray.push(...rows)
//         // console.log(customerArray)

       
        

//         customerArray.map((eachItem) => { 
//             const query2 = `SELECT * FROM addresses WHERE customer_id = ?;`
//             datab.all(query2,[eachItem.id],(err,rows) => {
//                 if (err){
//                     console.log(err)
//                     res.status(500).json({"error":err.message})
//                 }
//                     return({...eachItem, 'addresses' : rows})
//             })
            
            
//         })
//         console.log(customerArray)

        
//         res.status(200).json({"message":'SUCCESS' , 'data' : []})
// }) 

    

//     // let finalArray = customerArray[0].forEach((eachItem) => {
//     //     let addressesArray = []
//     //     const query2 = `SELECT * addresses where customer.id = ${eachItem.id};`
//     //     datab.all(query2,params,(err,rows) => {
//     //         if (err){
//     //             console.log(err)
//     //             res.status(500).json({"error":err.message})
//     //         }
//     //         addressesArray.push(rows) 
//     //     })
//     //     return {...eachItem,'addresses': addressesArray}
//     // })
//     // console.log(finalArray)
//     // res.status(200).json({"message":'SUCCESS' , 'data' : finalArray})
// }


const getCustomers = (req, res) => {
    const { first_name, city, phone_number, sortBy } = req.query;

    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 10;  
    const offset = (page - 1) * limit;

    
    const sortableFields = [ "first_name", "city", "phone_number"];
    const sortField = sortableFields.includes(sortBy) ? sortBy : "id";

    
    let whereClause = "WHERE 1=1";
    let params = [];

    if (first_name) {
        whereClause += " AND customers.first_name LIKE ?";
        params.push(`%${first_name}%`);
    }

    if (city) {
        whereClause += " AND addresses.city LIKE ?";
        params.push(`%${city}%`);
    }

    if (phone_number) {
        whereClause += " AND customers.phone_number LIKE ?";
        params.push(`%${phone_number}%`);
    }


    const countQuery = `SELECT COUNT(*) AS total FROM customers JOIN addresses ON customers.id = addresses.customer_id ${whereClause}`;

    datab.get(countQuery, params, (err, countResult) => {
        if (err) {
            console.error("Database error (count):", err);
            return res.status(500).json({ error: err.message });
        }

        const totalRecords = countResult.total;
        const totalPages = Math.ceil(totalRecords / limit);


        const dataQuery = 
        `SELECT customers.id,customers.first_name,customers.last_name,customers.phone_number,COUNT(addresses.id) AS address_count
        FROM addresses 
         JOIN customers ON customers.id = addresses.customer_id 
        ${whereClause} GROUP BY customers.id, customers.first_name, customers.last_name, customers.phone_number ORDER BY addresses.id ASC LIMIT ? OFFSET ?`;
        
        

        datab.all(dataQuery, [...params, limit, offset], (err, rows) => {
            if (err) {
                console.error("Database error (data):", err);
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({
                page,
                limit,
                sortBy: sortField,
                totalRecords,
                totalPages,
                data: rows
            });
        });
    });
};


// const getCustomers = (req, res) => {
//     const {first_name, city,phone_number } = req.query;

//     let query = `
        // SELECT customers.id,customers.first_name,customers.last_name,customers.phone_number,addresses.city,COUNT(addresses.id) AS address_count
        // FROM customers 
        // LEFT JOIN addresses ON customers.id = addresses.customer_id
        // WHERE 1=1 GROUP BY customers.id,customers.first_name ORDER BY address_count`;

//     let params = [];

//     // Add filters dynamically
//     if (first_name) {
//         query += " AND customers.first_name = ?";
//         params.push(first_name);
//     }

//     if (city) {
//         query += " AND addresses.city LIKE ?";
//         params.push(`%${city}%`);
//     }

//     if (phone_number) {
//         query += " AND customers.city LIKE ?";
//         params.push(`%${phone_number}%`);
//     }

//     datab.all(query, params, (err, rows) => {
//         if (err) {
//             console.error("Database error:", err);
//             return res.status(500).json({ "error": err.message });
//         }

//         if (!rows || rows.length === 0) {
//             return res.status(404).json({ "message": "No customers found" });
//         }

//         res.status(200).json({ "message": "SUCCESS", "data": rows });
//     });
// };


const  createCustomer =  (req,res) =>  {
    const {first_name,last_name,phone_number} = req.body

    if (first_name === "" || phone_number === ""){
        res.status(400).json({'message' : 'First Name and Phone Number cannot be Empty'})
    } 
    else{
        const searchQuery = `SELECT * FROM customers WHERE phone_number = ?;`
        datab.get(searchQuery,[phone_number],(err,rows) => {
            if (err){
                console.log(err)
            }else if (rows){
                res.status(400).json({'message' : 'Phone Number Already Exists'})
            }
            else {
                const query  = `INSERT INTO customers(first_name,last_name,phone_number) VALUES ('${first_name}','${last_name}','${phone_number}');`
                datab.run(query,[],(err) => {
                    if (err){
                        console.log(err)
                    }
                    res.status(200).json({"message":'Customer Added'})
                })
            }
        })

    }
    
}




const customerDetails = (req,res) => {
    const {id} = req.params
    const query = `SELECT * FROM customers WHERE id = ?;`
    datab.get(query,[id],(err,rows) => {
        if (err){
            console.log(err)
            return res.status(500).json({"error":err.message})
        }
        if(!rows){
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({"message":'SUCCESS',"data" : rows})
    })

}

const updateCustomer = (req,res) => {
    const {id} = req.params
    const {first_name,last_name,phone_number} = req.body
    if (first_name === "" || phone_number === ""){
        res.status(400).json({'message' : 'First Name and Phone Number cannot be Empty'})
    }else{
        const query = `UPDATE customers SET first_name = '${first_name}',last_name = '${last_name}',phone_number = '${phone_number}' WHERE id = ?;`
        datab.run(query,[id],(err) => {
            if (err){
                console.log(err)
                res.status(400).json({"error":err.message})
            }else{
                 res.status(200).json({"message":'Customer Updated'})
            }
           
        })
    }
    
}

const deleteCustomer = (req,res) => {
    const {id} = req.params
    const query = `DELETE FROM customers WHERE id = ?;`
    datab.run(query,[id],(err) => {
        if (err){
            console.log(err)
            res.status(400).json({"error":err.message})
        }
        res.status(200).json({"message":'Customer DELETED'})
    })
}





// const setTodo = (req, res) => {
//   res.status(200).json({message: 'Set todo'})
// }

// const updateTodo = (req, res) => {
//   res.status(200).json({message: `Update todo ${req.params.id}`})
// }

// const deleteTodo = (req, res) => {
//   res.status(200).json({message: `Delete todo ${req.params.id}`})
// }
module.exports = {getCustomers,createCustomer,customerDetails,updateCustomer,deleteCustomer}

//   setTodo,
//   updateTodo,

