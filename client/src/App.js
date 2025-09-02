import {Route,Routes} from 'react-router-dom'

import './App.css';

import CustomerListPage from './pages/CustomerListPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomerFormPage from './pages/CustomerFormPage';
import AddressFormPage from './pages/AddressFormPage';
import CustomerDetailUpdatePage from './pages/CustomerDetailUpdatePage';
import AddressUpdatePage from './pages/AddressUpdate';


function App() {
  return (
<Routes>
  <Route path = "/" Component = {CustomerListPage} />
  <Route path = "/customers/:id" Component = {CustomerDetailPage} />
  <Route path = "/new-customer" Component = {CustomerFormPage} />
  <Route path = "/new-address/:id" Component = {AddressFormPage} />
  <Route path = "/update-customer/:id" Component={CustomerDetailUpdatePage}/>
  <Route path = "/update-address/:addressId" Component={AddressUpdatePage}/>
</Routes>
  );
}

export default App;
