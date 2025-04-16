import React, { useState, useEffect } from 'react';
import data from '../mockData/mockData.json'
import axios from 'axios';

function AssetCategoryMaster() {
  const [categories, setCategories] = useState(data.categories);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Fetch categories from the backend API
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3001/api/category/addcatagory');
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  

  const handleAddCategory = async() => {
    if (newCategory.trim() === '') return;

    console.log(newCategory);
    

    const response = await axios.post(
        "http://localhost:3001/api/category/addcatagory",
       {name: newCategory}
      );

    // Add category to backend (mocked here)
    setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
    setNewCategory('');
  };

  return (
    <div>
      <h2>Asset Category Master</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New category name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddCategory}>Add Category</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetCategoryMaster;