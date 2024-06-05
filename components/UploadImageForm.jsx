// src/components/UploadImageForm.jsx
import React, { useState } from 'react';

const UploadImageForm = () => {
    const [reviewId, setReviewId] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            const base64Image = reader.result.split(',')[1];
            try {
                const response = await fetch('https://p3bvjdkhtkyp2xz5trokdlbini0fxrbk.lambda-url.us-east-1.on.aws/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ review_id: reviewId, image_data: base64Image })
                });
                const contentType = response.headers.get('Content-Type');
                let responseData;
                if (contentType && contentType.includes('application/json')) {
                    responseData = await response.json();
                } else {
                    responseData = await response.text();
                }
                console.log('Response status:', response.status);
                if (response.ok) {
                    alert(responseData);
                    location.reload();
                } else {
                    console.error('Error uploading image:', responseData);
                    alert('Failed to upload image');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred');
            }
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Review ID:</label>
                <input type="text" value={reviewId} onChange={(e) => setReviewId(e.target.value)} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
            </div>
            <button type="submit">Upload Image</button>
        </form>
    );
};

export default UploadImageForm;
