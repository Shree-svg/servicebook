const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const Service = require('../models/Service'); // assume exists
const User = require('../models/User'); // assume exists

const categories = [
  { name: 'Haircut', description: 'Professional hair cutting services' },
  { name: 'Massage', description: 'Relaxing massage therapy' },
];

const services = [
  { title: 'Men’s Haircut', category: 'Haircut', price: 25 },
  { title: 'Swedish Massage', category: 'Massage', price: 80 },
];

const sampleUsers = [
  { name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'user' },
  { name: 'Bob', email: 'bob@example.com', password: 'password123', role: 'provider' },
  { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Category.deleteMany({});
  await Service.deleteMany({});
  await User.deleteMany({});
  await Category.insertMany(categories);
  // map category names to ids for services
  const catMap = {};
  const catDocs = await Category.find({});
  catDocs.forEach(c => (catMap[c.name] = c._id));
  const servicesWithIds = services.map(s => ({
    ...s,
    category: catMap[s.category],
  }));
  await Service.insertMany(servicesWithIds);
  // hash passwords
  for (const u of sampleUsers) {
    const salt = await bcrypt.genSalt(10);
    u.password = await bcrypt.hash(u.password, salt);
  }
  await User.insertMany(sampleUsers);
  console.log('Database seeded successfully');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
