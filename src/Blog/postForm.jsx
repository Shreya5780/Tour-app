// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { BASE_URL } from '../utils/config';

// const CreatePostForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const { user } = useContext(AuthContext);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('desc', description);
//       formData.append('photo', photo);
//       formData.append('username', user.username); // Assuming we have access to the username
//       formData.append('userId', user._id); // Assuming we have access to the userId

//       // Make POST request to the backend using fetch
//       const response = await fetch(`${BASE_URL}/api/posts/createPost`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create post');
//       }

//       const responseData = await response.json();
//       console.log('Post created:', responseData);
//       // Optionally, redirect the user or show a success message
//     } catch (error) {
//       console.error('Error creating post:', error);
//       // Handle error, show error message, etc.
//     }
//   };

//   return (
//     <div>
//       <h2>Create Post</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Photo:</label>
//           <input
//             type="file"
//             onChange={(e) => setPhoto(e.target.files[0])}
//             accept="image/*"
//             required
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePostForm;
