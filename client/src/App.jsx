import React, { useState } from 'react'
import ProductListView from './components/products/productListView'
import Header from './components/Reuse/Header'
import ProductForm from './components/products/ProductForm'
import Footer from './components/Reuse/Footer'

function App() {

  const [isEdit, setIsEdit] = useState(false);
  const [editProductData, setEditProductData] = useState({});

  const handleSetProductToEdit = (product) => {
    setIsEdit(true);
    setEditProductData(product);
  }

  return (
    <div className=''>
      <Header/>
      <ProductForm editProductData={editProductData} isEdit={isEdit} />
      <ProductListView
        onHandleSetEditProductData={handleSetProductToEdit}
      />
      <Footer/>
    </div>
  )
}

export default App
