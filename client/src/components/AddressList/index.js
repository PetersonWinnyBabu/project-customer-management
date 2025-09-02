import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import axios from 'axios';

import AddressListItem from '../AddressListItem';
import './index.css'

const AddressList = () => {
    const {id} = useParams()
    const [addressesList, setaddressesList] = useState([]);

useEffect(() => {
        axios.get(`http://localhost:5000/api/customers/${id}/addresses`)
            .then(response => {
                setaddressesList(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
}, []);

if (addressesList.length === 0) {
    return <p className='error-msg'>NO ADDRESSES ADDED</p>;
}
return (
<ul className='address-List'>
    {addressesList.map((eachItem) => 
    <AddressListItem key = {eachItem.id} itemDetails = {eachItem}/>
)}
</ul>)
}

export default AddressList