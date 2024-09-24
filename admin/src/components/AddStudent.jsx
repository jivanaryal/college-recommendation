import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/colleges');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addStudent', {
        name,
        cgpa,
        college_id: selectedCollege, // Add college ID to the student data
      });
      alert(response.data.message);
      // Clear the form
      setName('');
      setCgpa('');
      setSelectedCollege('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CGPA:</label>
          <input
            type="number"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Select College:</label>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            required
          >
            <option value="">Select a college</option>
            {colleges.map(college => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
