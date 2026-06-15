import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  const product = await Product.create({ name, description, price, category, image });
  res.status(201).json(product);
};
