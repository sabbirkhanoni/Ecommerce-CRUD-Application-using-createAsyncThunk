import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../features/products/productSlice';

const ProductForm = (props) => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        category: '',
        description: ''
    })


    useEffect(() => {
        if(props.editProductData){
            setProductData({
                name: props.editProductData.name || '',
                price: props.editProductData.price || '',
                category: props.editProductData.category || '',
                description: props.editProductData.description || ''
            });
        }
    }, [props.editProductData]);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(props.isEdit){
            // Update product logic to be implemented
            dispatch(updateProduct({id:props.editProductData.id, product:productData}));
            props.setIsEdit(false);
        }else{
            // Create product
            dispatch(createProduct({...productData, id:nanoid()}));
        }

        // Clear form
        setProductData({
            name: '',
            price: '',
            category: '',
            description: ''
        });
    }


  return (
    <div>
         <h2 className='w-full bg-gray-300 py-2 text-black font-bold flex justify-center mt-10 text-lg'>Add Products</h2>
         <form className='shadow-xl p-4' onSubmit={handleOnSubmit}>
            <div>
                <label>Product Name
                <input
                    type="text"
                    value={productData.name}
                    onChange={handleOnChange}
                    name="name"
                    placeholder='Product Name'
                    className='px-2 border-1 py-1 bg-blue-50 rounded w-full my-2'
                />
                </label>
                <label>Product price
                    <input
                        type="text"
                        value={productData.price}
                        onChange={handleOnChange}
                        name="price"
                        placeholder='Product Price'
                        className='px-2 border-1 py-1 bg-blue-50 rounded w-full my-2'
                    />
                </label>
                <label>Product category
                    <input
                        type="text"
                        value={productData.category}
                        onChange={handleOnChange}
                        name="category"
                        placeholder='Product Category'
                        className='px-2 border-1 py-1 bg-blue-50 rounded w-full my-2'
                    />
                </label>
                <label>Product Description
                    <input
                        type="text"
                        value={productData.description}
                        onChange={handleOnChange}
                        name="description"
                        placeholder='Product Description'
                        className='px-2 border-1 py-1 bg-blue-50 rounded w-full my-2'
                    />
                </label>

                <button
                    type="submit"
                    className='bg-blue-500 text-white px-4 py-2 rounded-full w-full hover:bg-blue-700 duration-500'
                >
                    {props.isEdit ? 'Update Product' : "Add Product"}
                </button>
            </div>
         </form>
    </div>
  )
}

export default ProductForm
