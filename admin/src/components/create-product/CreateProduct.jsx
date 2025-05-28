import React, { useState } from 'react';
import './CreateProduct.css';


const BASE_URL = import.meta.env.VITE_API_URL;
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    category: '',
    type: '',
    brand: '',
    price: '',
    color: '',
    modelCode: '',
    description: '',
    tags: '',
  });

  const [sizes, setSizes] = useState([{ size: '', stock: '' }]);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { size: '', stock: '' }]);
  };

  const removeSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
  
    // Loop through keys and handle 'tags' specially
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'tags') {
        const tagsArray = value
          .split(',')
          .map(str => str.trim().toLowerCase())
          .filter(str => str !== '');
        data.append('tags', JSON.stringify(tagsArray));
      } else {
        data.append(key, value);
      }
    });
  
    data.append('sizes', JSON.stringify(sizes));
    images.forEach((image) => data.append('images', image));
  
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        body: data,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Product created successfully!');
      } else {
        alert(result.error || 'Error creating product.');
      }
    } catch (err) {
      alert('Server error.');
    }
  };
  

  return (
    <form className="create-product-form" onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <input name="name" placeholder="Product Name" onChange={handleChange} required />
      
      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>

      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
      </select>

      <input name="type" placeholder="Type (e.g. T-shirt, Hat)" onChange={handleChange} required />
      <input name="brand" placeholder="Brand" onChange={handleChange} required />
      <input name="price" type="decimal" placeholder="Price" onChange={handleChange} required />
      <input name="color" placeholder="Color" onChange={handleChange} required />
      <input name="modelCode" placeholder="Model Code" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} required />

      <div className="sizes-section">
        <h3>Sizes & Stock</h3>
        {sizes.map((item, index) => (
          <div key={index} className="size-entry">
            <input
              placeholder="Size (e.g. S, M, L)"
              value={item.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={item.stock}
              onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
              required
            />
            {sizes.length > 1 && (
              <button type="button" onClick={() => removeSize(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSize}>Add Size</button>
      </div>

      <input type="file" multiple onChange={handleImageChange} required />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './CreateProduct.css';

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     colors: '',
//     sizes: '',
//     description: '',
//     quantity: '',
//     category: '',
//     type: ''
//   });

//   const [images, setImages] = useState([]);
//   const [status, setStatus] = useState('');
//   const BASE_URL = import.meta.env.VITE_API_URL;
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImagesChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();
//       for (const key in formData) {
//         if (key === 'colors' || key === 'sizes') {
//             const array = formData[key].split(',').map(str => str.trim().toLowerCase()).filter(str => str !== '');
//             data.append(key, JSON.stringify(array));
//           } else {
//             data.append(key, formData[key]);
//           }
          
//       }

//       for (let i = 0; i < images.length; i++) {
//         data.append('images', images[i]);
//       }

//       const res = await axios.post(`${BASE_URL}/products/create`, data);
//       setStatus('Product created successfully!');
//       setFormData({
//         name: '',
//         price: '',
//         colors: '',
//         sizes: '',
//         description: '',
//         quantity: '',
//         category: '',
//         type: ''
//       });
//       setImages([]);
//     } catch (error) {
//       console.error(error);
//       setStatus('Error creating product');
//     }
//   };

//   return (
//     <div className="create-product-container">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//         <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
//         <input type="text" name="colors" placeholder="Colors (comma separated)" value={formData.colors} onChange={handleChange} />
//         <input type="text" name="sizes" placeholder="Sizes (comma separated)" value={formData.sizes} onChange={handleChange} />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
//         <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
//         <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
//         <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
//         <input type="file" name="images" multiple accept="image/*" onChange={handleImagesChange} required />
//         <button type="submit">Create Product</button>
//         {status && <p className="status">{status}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;


// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   Paper,
//   Box,
//   Chip,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import axios from 'axios';

// const categories = ['Clothing', 'Accessories'];
// const genders = ['Men', 'Women', 'Unisex'];

// const CreateProduct = () => {
//   const { control, handleSubmit, reset } = useForm();
//   const [sizes, setSizes] = useState([{ size: '', stock: 0 }]);
//   const [images, setImages] = useState([]);

//   const handleAddSize = () => setSizes([...sizes, { size: '', stock: 0 }]);
//   const handleSizeChange = (index, field, value) => {
//     const newSizes = [...sizes];
//     newSizes[index][field] = value;
//     setSizes(newSizes);
//   };

//   const handleImageUpload = (e) => setImages([...e.target.files]);

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     // Append product fields
//     Object.entries(data).forEach(([key, value]) => {
//       if (typeof value !== 'object') formData.append(key, value);
//     });

//     // Append sizes
//     formData.append('sizes', JSON.stringify(sizes));

//     // Append image files
//     for (const image of images) {
//       formData.append('images', image);
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/products', formData);
//       console.log('Product created:', res.data);
//       // reset();
//       setSizes([{ size: '', stock: 0 }]);
//       setImages([]);
//     } catch (err) {
//       console.error('Error creating product:', err.response?.data || err.message);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Add New Product
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="name"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Product Name" {...field} required />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="brand"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Brand" {...field} />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="type"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Type (e.g. Shoes)" {...field} required />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="gender"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField select fullWidth label="Gender" {...field} required>
//                     {genders.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name="category"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField select fullWidth label="Category" {...field} required>
//                     {categories.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <Controller
//                 name="price"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Price" type="number" {...field} required />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <Controller
//                 name="oldPrice"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Old Price" type="number" {...field} />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Controller
//                 name="color"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField fullWidth label="Color" {...field} />
//                 )}
//               />
//             </Grid>

//             {/* Sizes */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Sizes & Stock</Typography>
//               {sizes.map((item, index) => (
//                 <Box key={index} display="flex" gap={2} mb={1}>
//                   <TextField
//                     label="Size"
//                     value={item.size}
//                     onChange={(e) =>
//                       handleSizeChange(index, 'size', e.target.value)
//                     }
//                     required
//                   />
//                   <TextField
//                     label="Stock"
//                     type="number"
//                     value={item.stock}
//                     onChange={(e) =>
//                       handleSizeChange(index, 'stock', e.target.value)
//                     }
//                     required
//                   />
//                 </Box>
//               ))}
//               <Button onClick={handleAddSize} size="small">
//                 Add Size
//               </Button>
//             </Grid>

//             {/* Description */}
//             <Grid item xs={12}>
//               <Controller
//                 name="description"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField
//                     fullWidth
//                     label="Description"
//                     multiline
//                     rows={4}
//                     {...field}
//                   />
//                 )}
//               />
//             </Grid>

//             {/* Images */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Upload Images
//               </Typography>
//               <Button variant="outlined" component="label">
//                 Choose Files
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   multiple
//                   onChange={handleImageUpload}
//                 />
//               </Button>
//               <Box mt={1}>
//                 {images.length > 0 &&
//                   images.map((file, idx) => (
//                     <Chip
//                       key={idx}
//                       label={file.name}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                   ))}
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary">
//                 Create Product
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default CreateProduct;
