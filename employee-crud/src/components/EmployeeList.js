import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    try {
      const res = await axios.get(`http://localhost:4566/api/employees?page=${page}&size=${pageSize}`);
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4566/api/employees/${id}`);
      fetchEmployees(currentPage); // refresh current page
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete employee.");
    }
  };

  const goToPrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage + 1 < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Employee List</h2>
        <Link to="/add" className="btn btn-primary">Add Employee</Link>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No employees found.</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td className="text-end">
                  <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={goToPrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={goToNext}
          disabled={currentPage + 1 === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
