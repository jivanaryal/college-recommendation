import React, { useState } from 'react';
import axios from 'axios';

const AddCollege = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    min_cgpa: '',
    tuition_fees: '',
    programs: '',
    facilities: '',
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('min_cgpa', formData.min_cgpa);
    data.append('tuition_fees', formData.tuition_fees);
    data.append('programs', formData.programs);
    data.append('facilities', formData.facilities);
    data.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:5000/addCollege', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add College</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>College Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Minimum CGPA</label>
          <input type="number" name="min_cgpa" value={formData.min_cgpa} onChange={handleChange} required />
        </div>
        <div>
          <label>Tuition Fees</label>
          <input type="number" name="tuition_fees" value={formData.tuition_fees} onChange={handleChange} required />
        </div>
        <div>
          <label>Programs Offered</label>
          <textarea name="programs" value={formData.programs} onChange={handleChange} />
        </div>
        <div>
          <label>Facilities</label>
          <textarea name="facilities" value={formData.facilities} onChange={handleChange} />
        </div>
        <div>
          <label>College Photo</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Add College</button>
      </form>
    </div>
  );
};

export default AddCollege;
