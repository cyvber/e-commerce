// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   products: [
//     {
//       product_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       }
//     }
//   ],
//   total_price: {
//     type: Number,
//     required: true
//   },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   user_phone: {
//     type: String,
//     required: true
//   },
//   user_email: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   zip_code: {
//     type: String,
//     required: true
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   order_status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending'
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Order', orderSchema);




const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: String,
    image: String,
    price: Number,
    size: String,
    quantity: Number,
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: String,
     phone: String,
    country: String,
    state: String,
    city: String,
    address: String,
    zip: String,
    apt: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // for guests
    },
    email: {
      type: String,
      required: true, // always required for receipt
    },
    items: [orderItemSchema], // product snapshots
    shippingAddress: shippingAddressSchema,
    billingAddress: shippingAddressSchema, // can be same or different
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);