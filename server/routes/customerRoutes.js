const express = require('express');
const router = express.Router();
const {getCustomers,createCustomer,customerDetails,updateCustomer,deleteCustomer} = require('../controllers/customerControllers')
const {addAddress,getAddress,updateAddress,deleteAddress} = require('../controllers/addressControllers')



router.route('/customers').get(getCustomers).post(createCustomer)
router.route('/customers/:id').get(customerDetails).put(updateCustomer).delete(deleteCustomer)
router.route('/customers/:id/addresses').get(getAddress).post(addAddress)
router.route('/addresses/:addressId').put(updateAddress).delete(deleteAddress)

module.exports = router;