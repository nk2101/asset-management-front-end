import React, { useState, useEffect } from "react";
import DataTable from "datatables.net";
import data from "../mockData/mockData.json";
import axios from "axios";

function EmployeeMaster() {
  const [employees, setEmployees] = useState(data.employees);
  const [addEmployees, setAddEmployees] = useState({
    name: "",
    department: "",
    status: "",
    id: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState({
    addEmployee: false,
    editEmployee: false,
    deleteEmployee: false,
  });

  useEffect(() => {
    // Fetch employees from the backend (replace with actual API call)
    const fetchEmployees = async () => {
      const response = await fetch("http://localhost:3001/api/employees");
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    const response = await axios.post(
      "http://localhost:3001/api/employees/newemployee",
      addEmployees
    );

    let arr = [];
    arr.push(addEmployees);
    console.log(arr);

    setEmployees([...arr, ...employees]);
  };

  const editEmployee = async () => {
    const response = await axios.put(
      `http://localhost:3001/api/employees/${addEmployees.id}`,
      addEmployees
    );
  };

  const deleteEmpoyee = async () => {
    console.log(addEmployees);
    const response = await axios.delete(
      `http://localhost:3001/api/employees/${addEmployees.id}`
    );
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || employee.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <h2>Employee Master</h2>

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            setOpenModal({ addEmployee: true });
          }}
        >
          Add Employee
        </button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="form-control mt-2"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees &&
            filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.status}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setOpenModal({
                        addEmployee: false,
                        editEmployee: true,
                        deleteEmployee: false,
                      });
                      setAddEmployees({
                        name: employee.name,
                        department: employee.department,
                        status: employee.status,
                        id: employee.id,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setOpenModal({
                        addEmployee: false,
                        editEmployee: false,
                        deleteEmployee: true,
                      });
                      setAddEmployees({
                        name: employee.name,
                        department: employee.department,
                        status: employee.status,
                        id: employee.id,
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {openModal.addEmployee
                    ? "Add Employee"
                    : openModal.editEmployee
                    ? "Edit Employee"
                    : "delete Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {openModal.addEmployee ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <div className="container mt-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="name"
                            onChange={(e) => {
                              setAddEmployees({
                                name: e.target.value,
                                department: addEmployees.department,
                                status: addEmployees.status,
                                id: addEmployees.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Department"
                            onChange={(e) => {
                              setAddEmployees({
                                department: e.target.value,
                                name: addEmployees.name,
                                status: addEmployees.status,
                                id: addEmployees.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="status"
                            onChange={(e) => {
                              setAddEmployees({
                                status: e.target.value,
                                department: addEmployees.department,
                                name: addEmployees.name,
                                id: addEmployees.id,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : openModal.editEmployee ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <div className="container mt-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="name"
                            value={addEmployees.name}
                            onChange={(e) => {
                              setAddEmployees({
                                name: e.target.value,
                                department: addEmployees.department,
                                status: addEmployees.status,
                                id: addEmployees.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Department"
                            value={addEmployees.department}
                            onChange={(e) => {
                              setAddEmployees({
                                department: e.target.value,
                                name: addEmployees.name,
                                status: addEmployees.status,
                                id: addEmployees.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="status"
                            value={addEmployees.status}
                            onChange={(e) => {
                              setAddEmployees({
                                status: e.target.value,
                                department: addEmployees.department,
                                name: addEmployees.name,
                                id: addEmployees.id,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Are you sure delete this record?</p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={
                    openModal.addEmployee
                      ? addEmployee
                      : openModal.editEmployee
                      ? editEmployee
                      : deleteEmpoyee
                  }
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeMaster;
