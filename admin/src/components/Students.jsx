import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>CGPA</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.cgpa}</td>
              <td>{student.college_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
