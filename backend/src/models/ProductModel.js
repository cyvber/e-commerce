// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String,required: true, trim: true},
//   price: { type: Number, required: true },
//   images: { type: [String], default: []},
//   colors: { type: [String], default: []},
//   sizes: { type: [String], default: []},
//   description: { type: String, default: ''},
//   quantity: { type: Number, required: true, default: 0},
//   is_available: { type: Boolean, default: true},
//   times_sold: { type: Number, default: 0},
//   category: { type: String, required: true},
//   type: { type: String, required: true},
//   created_at: { type: Date, default: Date.now}
// });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require("mongoose");

const sizeStockSchema = new mongoose.Schema({
  size: { type: String, required: true }, 
  stock: { type: Number, required: true, default: 0 }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
  category: { type: String, enum: ['clothing', 'accessories'], required: true },
  type: { type: String, required: true }, // e.g., Shoes, Watch, Pants

  brand: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  color: { type: String },

  images: [{ type: String }], 

  sizes: [sizeStockSchema], 
  soldCount: { type: Number, default: 0},
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  modelCode: {type: String,},
  // slug: { type: String,},
  tags: { type: [String], default: []},
  createdAt: { type: Date, default: Date.now }
});
productSchema.pre('save', function (next) {
  this.gender = this.gender.toLowerCase();
  this.category = this.category.toLowerCase();
  this.type = this.type.toLowerCase();
  this.color = this.color.toLowerCase();
  next();
});
module.exports = mongoose.model("Product", productSchema);
