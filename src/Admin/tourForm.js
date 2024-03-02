import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import './tourForm.css'

const CreateTourForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: null, // For storing the selected image file
        desc: '',
        Price: '',
        maxGroupSize: '',
        featured: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            [name]: name === 'featured' ? e.target.checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            photo: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('distance', formData.distance);
            formDataToSend.append('photo', formData.photo);
            formDataToSend.append('desc', formData.desc);
            formDataToSend.append('Price', formData.Price);
            formDataToSend.append('maxGroupSize', formData.maxGroupSize);
            formDataToSend.append('featured', formData.featured);

            // Make a POST request to your backend API to create the tour
            const response = await axios.post(`${BASE_URL}/api/tours/createTour`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Handle success response
        } catch (error) {
            console.error('Error creating tour:', error); // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
            <input type="text" name="distance" value={formData.distance} onChange={handleChange} placeholder="Distance" />
            <input type="file" name="photo" onChange={handleImageChange} accept="image/*" />
            <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description"></textarea>
            <input type="text" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" />
            <input type="text" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} placeholder="Max Group Size" />
            <div>
                <input type="checkbox" name="featured" value={formData.featured} onChange={handleChange} placeholder="Featured" />
                <label htmlFor="featured">Featured</label>
            </div>
            <button type="submit">Create Tour</button>
        </form>
    );
};

export default CreateTourForm;
