import React, { useState, useEffect } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import data from "../mockData/mockData.json";
import axios from "axios";
import $ from "jquery";

function EmployeeMaster1() {
  const [employees, setEmployees] = useState();
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
  console.log("employees : ", employees);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("http://localhost:3001/api/employees");
      console.log(response.data);

      const data = await response.data;
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees && employees.length > 0) {
      const table = new DataTable("#employee-table", {
        destroy: true,
        data: employees,
        columns: [
          { data: "name", title: "Name" },
          { data: "department", title: "Department" },
          { data: "status", title: "Status" },
          {
            title: "Actions",
            data: null,
            render: function (data, type, row) {
              return `
                <button class='btn btn-primary btn-sm edit-btn' data-id="${row.id}">Edit</button>
                <button class='btn btn-danger btn-sm delete-btn' data-id="${row.id}">Delete</button>
              `;
            },
          },
        ],
      });

      //   // Attach listeners to custom buttons
      //   $('#employee-table').on('click', '.edit-btn', function () {
      //     const id = $(this).data('id');
      //     const emp = employees.find((e) => e.id === id);
      //     setOpenModal({ editEmployee: true });
      //     setAddEmployees(emp);
      //   });

      //   $('#employee-table').on('click', '.delete-btn', function () {
      //     const id = $(this).data('id');
      //     const emp = employees.find((e) => e.id === id);
      //     setOpenModal({ deleteEmployee: true });
      //     setAddEmployees(emp);
      //   });

      return () => {
        table.destroy();
      };
    }
  }, [employees]);

  const addEmployee = async () => {
    const response = await axios.post(
      "http://localhost:3001/api/employees/newemployee",
      addEmployees
    );

    console.log(response.data);

    let arr = [];
    arr.push(addEmployees);
    console.log(arr);

    setEmployees([...arr, ...response.data]);
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

  const filteredEmployees =
    employees?.length > 0 &&
    employees.filter((employee) => {
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
      <div className="mb-3"></div>
      <table id="employee-table" className="table table-striped">
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
                    : "Delete Employee"}
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
                            placeholder="Name"
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
                            placeholder="Status"
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
                            placeholder="Name"
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
                            placeholder="Status"
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
                    <p>Are you sure you want to delete this record?</p>
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

export default EmployeeMaster1;
