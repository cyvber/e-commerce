const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

// // Helper: Calculate total price from product IDs and quantities
// const calcTotalPrice = async (products) => {
//   let total = 0;

//   for (const item of products) {
//     const product = await Product.findById(item.product_id);
//     if (!product || !product.is_available) throw new Error(`Product not available: ${item.product_id}`);
//     total += product.price * item.quantity;
//   }

//   return total;
// };

// // Helper: Update product stock and times_sold after order
// const updateProductQuantity = async (products) => {
//   for (const item of products) {
//     const product = await Product.findById(item.product_id);
//     if (product) {
//       product.quantity -= item.quantity;
//       product.times_sold += item.quantity;
//       await product.save();
//     }
//   }
// };

// // Create a new order
// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       products, // [{ product_id, quantity }]
//       user_id,
//       user_email,
//       user_phone,
//       address,
//       zip_code,
//       city
//     } = req.body;

//     const total_price = await calcTotalPrice(products);

//     const order = new Order({
//       products,
//       total_price,
//       user_id,
//       user_email,
//       user_phone,
//       address,
//       zip_code,
//       city,
//       order_status: 'pending'
//     });

//     await order.save();
//     await updateProductQuantity(products);

//     res.status(201).json({ message: 'Order created successfully', order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete order by ID
// exports.deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Order.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: 'Order not found' });

//     res.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get single order
// exports.getOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ created_at: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { order_status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { order_status },
//       { new: true }
//     );

//     if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

//     res.json({ message: 'Order status updated', order: updatedOrder });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };







// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

// Delete an order (optional)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
};
