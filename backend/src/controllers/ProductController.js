const Product = require('../models/ProductModel');
const supabase = require('../utils/supabaseClient');


// // Create a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const files = req.files; // multer handles this
//     const {
//       name,
//       price,
//       colors,
//       sizes,
//       description,
//       quantity,
//       is_available,
//       category,
//       type
//     } = req.body;

//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: 'At least one image is required' });
//     }

//     // Upload each image to Supabase
//     const imageUrls = [];
//     for (const file of files) {
//       const fileName = `${Date.now()}_${file.originalname}`;
//       const { error: uploadError } = await supabase.storage
//         .from('images') // your bucket name
//         .upload(fileName, file.buffer, {
//           contentType: file.mimetype,
//         });

//       if (uploadError) {
//         return res.status(500).json({ error: uploadError.message });
//       }

//       // Get public URL
//       const { data: { publicUrl } } = supabase.storage
//         .from('images')
//         .getPublicUrl(fileName);

//       imageUrls.push(publicUrl);
//     }

//     const newProduct = new Product({
//       name,
//       price,
//       images: imageUrls,
//       colors: JSON.parse(colors),
//       sizes: JSON.parse(sizes),
//       description,
//       quantity,
//       is_available,
//       times_sold: 0,
//       category,
//       type,
//       created_at: new Date()
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Product creation failed' });
//   }
// };

// // Delete product by ID
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Product.findByIdAndDelete(id);

//     if (!deleted) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get single product by ID
// exports.getProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);

//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ created_at: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update product by ID
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product updated successfully', product: updatedProduct });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };







// // CREATE a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create product", error: err.message });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }

    // Upload images to Supabase
    const imageUrls = [];

    for (const file of files) {
      const fileName = `${Date.now()}_${file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from('images') // Your Supabase bucket
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(fileName);

      imageUrls.push(publicUrl);
    }

    // Parse sizes from JSON string
    let sizes = [];
    try {
      sizes = JSON.parse(req.body.sizes);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid sizes format' });
    }

    // Create product with image URLs and parsed sizes
    const product = new Product({
      ...req.body,
      sizes,
      images: imageUrls,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Server error while creating product' });
  }
};



// GET all products (with optional query filters)
exports.getAllProducts = async (req, res) => {
  try {
    const filters = {};

    // Optional query filters
    if (req.query.gender) filters.gender = req.query.gender;
    if (req.query.category) filters.category = req.query.category;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.isFeatured) filters.isFeatured = req.query.isFeatured === 'true';

    const products = await Product.find(filters);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get products", error: err.message });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get product", error: err.message });
  }
};

// GET product by slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get product", error: err.message });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

// UPDATE stock for a specific size
exports.updateSizeStock = async (req, res) => {
  try {
    const { size, quantity } = req.body;

    const result = await Product.updateOne(
      { _id: req.params.id, "sizes.size": size },
      { $inc: { "sizes.$.stock": quantity } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product or size not found" });
    }

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update stock", error: err.message });
  }
};

// GET featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(10);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get featured products", error: err.message });
  }
};
exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find()
      .sort({ soldCount: -1 })  // Sort by soldCount in descending order
      .limit(10);               // Get top 10 products

    res.status(200).json(bestSellers);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({ message: 'Failed to fetch best sellers', error });
  }
};
exports.getDiscountProducts = async (req, res) => {
  try {
    const discountedProducts = await Product.find({ oldPrice: { $ne: null } });
    res.status(200).json(discountedProducts);
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    res.status(500).json({ message: 'Failed to fetch discounted products', error });
  }
};


exports.getGroupedTypes = async (req, res) => {
  try {
    const products = await Product.find({}, 'gender category type');

    const grouped = {
      men: { clothing: [], accessories: [] },
      women: { clothing: [], accessories: [] }
    };

    products.forEach(({ gender, category, type }) => {
      const g = gender.toLowerCase();
      const c = category.toLowerCase();
      if ((g === 'men' || g === 'women') && (c === 'clothing' || c === 'accessories')) {
        if (!grouped[g][c].includes(type)) {
          grouped[g][c].push(type);
        }
      }
    });

    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


