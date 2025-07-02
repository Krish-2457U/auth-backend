import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // ✅ Load employee data
  useEffect(() => {
    axios
      .get(`http://localhost:4566/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
        alert("Could not load employee data.");
      });
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4566/api/employees/${id}`,
        employee,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      navigate('/');
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update employee.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Edit Employee</h2>
        <form onSubmit={updateEmployee}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
