import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const AddProductForm = () => {
  const {
    register,
    handleSubmit
  } = useForm();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [inStock, setinStock] = useState("");
  const [entryDate, setentryDate] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  

  
  const handlechangeprouctId = (value) => {
    setProductId(value);
  };
  const handlechangeproductName = (value) => {
    setProductName(value);
  };
  const handlechangeinStock = (value) => {
    setinStock(value);
  };
  const handlechangeentryDate = (value) => {
    setentryDate(value);
    
    
    const selectedDate = new Date(value);
   

    if (selectedDate) {
      
      const newExpiryDate = new Date(selectedDate.getTime());
      newExpiryDate.setMonth(selectedDate.getMonth() + 1);
     
      const expiryDate1 = newExpiryDate.toISOString().slice(0, 10);
      setexpiryDate(expiryDate1);
      
    }
  };


  const navigate = useNavigate();
  const onSubmit = async () => {
    const data = {
     
      productId: productId,
      productName: productName,
      inStock: inStock,
      entryDate:entryDate,
      expiryDate:expiryDate,
    };
    const url = await "http://localhost:5288/api/Products";
    await axios
      .post(url, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if ((error.status = 400)) {
          alert("You got some error.");
        }
      });
  };
  return (
    <>
      

      <div class="container">
       
        <div class="login-content">
          <form onSubmit={handleSubmit(onSubmit)}>
         <label>Product Id</label>
            <div className="form-group">
              <input
                type="textarea"
                class="form-control"
                placeholder="Product type"
                {...register("productId", {
                  required: { value: true, message: "Required" },
                })}
                onChange={(e) => handlechangeprouctId(e.target.value)}
              />
              
            </div>
            <br />
            <label>Product Name</label>
            <div className="form-group">
              <textarea
                class="form-control"
                placeholder="Product Name"
                rows="3"
                {...register("productName", {
                  required: { value: true, message: "Required" },
                })}
                onChange={(e) => handlechangeproductName(e.target.value)}
              ></textarea>
             
            </div>
            <br/>
            <label>Product Stock</label>
            <div className="form-group">
              <textarea
                class="form-control"
                placeholder="Product In stock"
                rows="3"
                {...register("inStock", {
                  required: { value: true, message: "Required" },
                })}
                onChange={(e) => handlechangeinStock(e.target.value)}
              ></textarea>
             
            </div>
            <br/>
            <label>Product Entry Date</label>
            <div className="form-group">
            <input
              type="datetime-local"
              class="form-control"
              placeholder="Product Entry Date"
              {...register("entryDate", {
                required: { value: true, message: "Required" }
              })}
              onChange={(e) => handlechangeentryDate(e.target.value)}
            />
           
            </div>
            <br/>
          

            <button type="submit" className="btn" id="login">
              Add more Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
