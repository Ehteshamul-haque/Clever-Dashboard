import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();

  useEffect(() => {
    getProductDetails()
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: "bearer " + JSON.parse(localStorage.getItem('token'))
      }
    })
    result = await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }

  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/update/${params.id}`, {
        method: 'PUT',
        headers: {
            authorization: "bearer " + JSON.parse(localStorage.getItem('token')),
            'Content-Type' : 'application/json',
            
        },
        body: JSON.stringify({name, price, category, company})
    
    });
    result = await result.json()
    console.log(result);
  };
  return (
    <div className="product">
      <h3>Add Product</h3>
      <input
        type="text"
        value={name}
        placeholder="Enter Product Name"
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
      />
      <input
        type="text"
        value={price}
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
      />
      <input
        type="text"
        value={category}
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
      />
      <input
        type="text"
        value={company}
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
      />
      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
}

export default AddProduct;
