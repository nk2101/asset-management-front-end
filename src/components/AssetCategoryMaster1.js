import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "datatables.net-bs5"; // Import DataTables for Bootstrap 5
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Import DataTables CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function AssetCategoryMaster1() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "http://localhost:3001/api/category/addcatagory"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const table = new DataTable("#categories-table", {
      destroy: true, 
      data: categories,
      columns: [
        { data: "id", title: "ID" },
        { data: "name", title: "Category" },
      ]
    });

    return () => {
      table.destroy();
    };
  }, [categories]); 

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    console.log(newCategory);

    const response = await axios.post(
      "http://localhost:3001/api/category/addcatagory",
      { name: newCategory }
    );
    setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
    setNewCategory("");
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
        <button
          className="btn btn-success mt-2"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <table id="categories-table" className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
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

export default AssetCategoryMaster1;