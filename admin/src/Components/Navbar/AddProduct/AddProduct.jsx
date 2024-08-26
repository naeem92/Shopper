import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../../assets/upload_area.svg'


const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
        
    })

    const imageHandler =(e)=>{
        setImage(e.target.files[0])
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    
    const Add_Product = async () =>{
    // console.log(productDetails)
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
        method: 'POST',
        headers:{
            Accept:'application/json',
        },
        body:formData,
    }).then((resp) =>resp.json()).then((data)=>{responseData = data});

        if(responseData.success)
        {
            product.image = responseData.image_url;
            // console.log(product)
            await fetch('http://localhost:4000/addproduct',{
                method: 'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("product Added"):alert("Failed")
            });
        }
    }


  return (
    <div className='add-product'>
        <h1>Add Products</h1>
      <div className="add-product-item-field">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder="Enter product title" />
      </div>
      <div className="add-product-price">
       <div className="add-product-item-field">
        <p>Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder="Old price" />
       </div>
       <div className="add-product-item-field">
        <p>Offer Price</p>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder="New price" />
       </div>
      </div>
      <div className="add-product-item-field">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'  >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select> 
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='add-product-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" id="file-input" name="image" hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='add-product-btn'> ADD</button>
    </div>
  )
}

export default AddProduct
