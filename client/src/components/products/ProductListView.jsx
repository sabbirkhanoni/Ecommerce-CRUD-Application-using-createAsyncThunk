import React, { useEffect } from 'react'
import axios from 'axios';
import { deleteProduct, fetchAllProducts } from '../../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm';

const ProductListView = (props) => {

    const {products, isLoading, error} =  useSelector((state) => state.productsR);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


    const handleEdit = (product) => {
        props.onHandleSetEditProductData(product);
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    }


  return (
    <div>
      <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 m-3'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && products && products.length>0 && 
            products.map((product) => {
                return (
                    <div key={product.id} className='hover:-translate-y-1 h-[270px] duration-300 border-1 bg-blue-50 shadow-xl rounded px-2 border-gray-300'>
                        <div className=' py-2  space-y-3 flex flex-col h-full'>
                            <h3 className='font-bold'>{product.name}</h3>
                            <p className='font-semibold'>Price: {product.price} bdt</p>
                            <p className='font-semibold'>Category: {product.category}</p>
                            <p className='text-xs'>{product.description}</p>

                            <div className='flex justify-between px-3 space-x-6 mt-auto'>
                                <button
                                    onClick={() => {handleEdit(product)}}
                                    className='bg-green-500 w-full py-1 text-white font-semibold rounded'>Edit</button>
                                <button
                                    onClick={() => {handleDelete(product.id)}}
                                    className='bg-red-500 w-full py-1 text-white font-semibold rounded'>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            })}
      </div>
    </div>
  )
}

export default ProductListView
