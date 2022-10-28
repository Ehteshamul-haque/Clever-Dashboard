import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/product/all", {
      headers: {
        authorization: "bearer " + JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "bearer " + JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  //Search Handle
  const searchHandle = async (e) => {
    let key = e.target.value 
    if(key){
      let result = await fetch(`http://localhost:5000/product/search/${key}`, {
        headers: {
          authorization: "bearer " + JSON.parse(localStorage.getItem('token'))
        }
      })
      result = await result.json()
      if(result){
        setProducts(result)
      }
    }else{
      getProducts()
    }
  }
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-input"
        onChange={searchHandle}
        placeholder="Search Product"
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      { products.length > 0 ? products.map((item, index) => (
        <ul key={index}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.company}</li>
          <li>
            <button type="button" onClick={() => deleteProduct(item._id)}>
              Delete
            </button>
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      ))
      : <h1>Result Not Found!</h1>}
    </div>
  );
}

export default ProductList;
