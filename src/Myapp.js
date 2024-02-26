import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    text-align: left;
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      setError(null);

      try {
        const response = await axios.get('http://localhost:5288/api/Products'); // Replace with your API endpoint
        const productsData = response.data; // Assuming your API returns products in the data property
          console.log("Data======="+productsData)
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('An error occurred while fetching products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  const navigate = useNavigate();

const handleClick = () => {
  navigate('/add'); 
};
  return (
    <div>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {products.length > 0 && (

        <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Product Stock</th>
          <th>Product Entry Date</th>
          <th>Product Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.productId}</td>
            <td>{item.productName}</td>
            <td>{item.inStock}</td>
            <td>{item.entryDate}</td>
            <td>{item.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
      )}



<button onClick={handleClick}>Add Products</button>
    </div>
  );
}

export default ProductTable;