import {Link} from 'react-router-dom'

import './index.css'
const CustomerList = (props) => {
    const {customers} = props
    console.log(customers)
    return (
    <ul className='customerList'>
        {customers.map((eachItem) => 
            <Link to = {`/customers/${eachItem.id}`} key = {eachItem.id}>
                <li className='listItem'>
                    <p className = "customerName">{(eachItem.first_name + " " + eachItem.last_name).toUpperCase()}</p>
                    <p className='addressCount'>addressCount: {eachItem.address_count}</p>
                </li>
            </Link>
        )}
    </ul>)
}

export default CustomerList