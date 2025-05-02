import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "datatables.net-bs5"; // Import DataTables for Bootstrap 5
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Import DataTables CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS (if needed)

function AssetMaster1() {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [addAssets, setAddSsets] = useState({
    serialNumber: "",
    Make: "",
    Model: "",
    Type: "",
    id: 0,
  });
  const [openModal, setOpenModal] = useState({
    addAsset: false,
    editAsset: false,
    deleteAsset: false,
  });

  useEffect(() => {
    // Fetch assets from the backend API
    const fetchAssets = async () => {
      const response = await axios.get("http://localhost:3001/api/assets");
      const data = await response.data;
      setAssets(data);
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    const table = new DataTable("#assets-table", {
      destroy: true,
      data: assets,
      columns: [
        { data: "serialNumber", title: "Serial Number" },
        { data: "make", title: "Make" },
        { data: "model", title: "Model" },
        { data: "type", title: "Type" },
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

    return () => {
      table.destroy();
    };
  }, [assets]);



  const addAsset = async () => {
    const response = await axios.post(
      "http://localhost:3001/api/assets/newasset",
      addAssets
    );
    setAssets([...assets, response.data]);
  };

  const editAsset = async () => {
    const response = await axios.put(
      `http://localhost:3001/api/assets/${addAssets.id}`,
      addAssets
    );
    const updatedAssets = assets.map((asset) =>
      asset.id === addAssets.id ? response.data : asset
    );
    setAssets(updatedAssets);
  };

  const deleteAsset = async () => {
    await axios.delete(`http://localhost:3001/api/assets/${addAssets.id}`);
    const updatedAssets = assets.filter((asset) => asset.id !== addAssets.id);
    setAssets(updatedAssets);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || asset.type === filterType;
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
        <h2>Asset Master</h2>

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            setOpenModal({ addAsset: true });
          }}
        >
          Add Asset
        </button>
      </div>
      <div className="mb-3"></div>
      <table id="assets-table" className="table table-striped">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets &&
            filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.serialNumber}</td>
                <td>{asset.make}</td>
                <td>{asset.model}</td>
                <td>{asset.type}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setOpenModal({
                        addAsset: false,
                        editAsset: true,
                        deleteAsset: false,
                      });
                      setAddSsets({
                        serialNumber: asset.serialNumber,
                        Make: asset.make,
                        Model: asset.model,
                        Type: asset.type,
                        id: asset.id,
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
                        addAsset: false,
                        editAsset: false,
                        deleteAsset: true,
                      });
                      setAddSsets({
                        serialNumber: asset.serialNumber,
                        Make: asset.make,
                        Model: asset.model,
                        Type: asset.type,
                        id: asset.id,
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
                  {openModal.addAsset
                    ? "Add Employee"
                    : openModal.editAsset
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
                {openModal.addAsset ? (
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
                            placeholder="Serial Number"
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: e.target.value,
                                Make: addAssets.Make,
                                Model: addAssets.Model,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Make"
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: e.target.value,
                                Model: addAssets.Model,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Model"
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: addAssets.Make,
                                Model: e.target.value,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type"
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: addAssets.Make,
                                Model: addAssets.Model,
                                Type: e.target.value,
                                id: addAssets.id,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : openModal.editAsset ? (
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
                            placeholder="Serial Number"
                            value={addAssets.serialNumber}
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: e.target.value,
                                Make: addAssets.Make,
                                Model: addAssets.Model,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Make"
                            value={addAssets.Make}
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: e.target.value,
                                Model: addAssets.Model,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Model"
                            value={addAssets.Model}
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: addAssets.Make,
                                Model: e.target.value,
                                Type: addAssets.Type,
                                id: addAssets.id,
                              });
                            }}
                          />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type"
                            value={addAssets.Type}
                            onChange={(e) => {
                              setAddSsets({
                                serialNumber: addAssets.serialNumber,
                                Make: addAssets.Make,
                                Model: addAssets.Model,
                                Type: e.target.value,
                                id: addAssets.id,
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
                    openModal.addAsset
                      ? addAsset
                      : openModal.editAsset
                      ? editAsset
                      : deleteAsset
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

export default AssetMaster1;
