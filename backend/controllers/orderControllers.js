const Order = require('../models/order');
const Buyer = require('../models/buyer');
const Product = require('../models/product');
const Seller = require('../models/seller');

// @desc    Create new order
// @route   POST /orders
// @access  Private (Buyer)
exports.createOrder = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).populate('cart.product');

    if (!buyer || buyer.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Group items by seller
    const itemsBySeller = {};
    let totalAmount = 0;

    for (const cartItem of buyer.cart) {
      const product = cartItem.product;
      if (!product) {
        continue;
      }

      if (product.quantity < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.title}. Available: ${product.quantity}`,
        });
      }

      const sellerId = product.seller.toString();
      if (!itemsBySeller[sellerId]) {
        itemsBySeller[sellerId] = [];
      }

      itemsBySeller[sellerId].push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        seller: product.seller,
      });

      totalAmount += product.price * cartItem.quantity;
    }

    // Create order items array
    const orderItems = [];
    for (const sellerId in itemsBySeller) {
      orderItems.push(...itemsBySeller[sellerId]);
    }

    // Create order
    const order = await Order.create({
      buyer: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress: req.body.shippingAddress || buyer.address,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Update product quantities
    for (const cartItem of buyer.cart) {
      const product = cartItem.product;
      if (product) {
        product.quantity -= cartItem.quantity;
        if (product.quantity === 0) {
          product.status = 'out_of_stock';
        }
        await product.save();
      }
    }

    // Clear cart
    buyer.cart = [];
    await buyer.save();

    // Update seller sales
    for (const sellerId in itemsBySeller) {
      const seller = await Seller.findById(sellerId);
      if (seller) {
        const sellerTotal = itemsBySeller[sellerId].reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        seller.totalSales += sellerTotal;
        await seller.save();
      }
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('items.seller', 'name shopName')
      .populate('buyer', 'name email');

    res.status(201).json(populatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all orders (for buyer)
// @route   GET /orders
// @access  Private (Buyer)
exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('items.product')
      .populate('items.seller', 'name shopName')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single order
// @route   GET /orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('items.seller', 'name shopName email')
      .populate('buyer', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is a seller in the order
    const isBuyer = order.buyer._id.toString() === req.user.id;
    const isSeller = order.items.some(
      item => item.seller._id.toString() === req.user.id
    );

    if (!isBuyer && !isSeller && req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get seller orders
// @route   GET /orders/seller/my-orders
// @access  Private (Seller)
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user.id })
      .populate('items.product')
      .populate('buyer', 'name email')
      .sort({ orderDate: -1 });

    // Filter items to only show seller's items
    const filteredOrders = orders.map(order => ({
      ...order.toObject(),
      items: order.items.filter(
        item => item.seller.toString() === req.user.id
      ),
    }));

    res.json(filteredOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update order status
// @route   PUT /orders/:id/status
// @access  Private (Seller)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if seller has items in this order
    const hasItems = order.items.some(
      item => item.seller.toString() === req.user.id
    );

    if (!hasItems) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // For simplicity, update the entire order status
    // In a more complex system, you might want to track status per item
    order.status = status;

    if (status === 'delivered') {
      order.deliveredDate = new Date();
    }

    await order.save();
    const updatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('items.seller', 'name shopName')
      .populate('buyer', 'name email');

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update payment status
// @route   PUT /orders/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only buyer can update payment status
    if (order.buyer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

