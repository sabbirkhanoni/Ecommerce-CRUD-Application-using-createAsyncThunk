import React, { useState } from 'react'
import ProductListView from './components/products/productListView'
import Header from './components/Reuse/Header'
import ProductForm from './components/products/ProductForm'
import Footer from './components/Reuse/Footer'

function App() {

  const [isEdit, setIsEdit] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  const handleSetProductToEdit = (product) => {
    setIsEdit(true);
    setEditProductData(product);
  }

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditProductData({});
  }

  const clearForm = () => {
    setEditProductData(null);
    setIsEdit(false);
  }

  return (
    <div className=''>
      <Header/>
      <ProductForm
        editProductData={editProductData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onHandleClearForm={clearForm}
        onHandleCancelEdit={handleCancelEdit}
      />
      <ProductListView
        onHandleSetEditProductData={handleSetProductToEdit}
      />
      <Footer/>
    </div>
  )
}

export default App
