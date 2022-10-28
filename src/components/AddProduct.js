import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setErrors] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setErrors(true);
      return false;
    }
    // console.log(name,price,category,company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/product/add", {
      method: "POST",
      headers: {
        authorization: "bearer " + JSON.parse(localStorage.getItem('token')),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, category, userId, company }),
    });
    result = await result.json();
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
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        value={price}
        placeholder="Enter Product Price"
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        value={category}
        placeholder="Enter Product Category"
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        value={company}
        placeholder="Enter Product Company"
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid companys</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
