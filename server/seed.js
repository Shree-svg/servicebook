const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Service = require('./models/Service');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Service.deleteMany();

    // Seed accounts for all roles
    const users = await User.create([
      {
        name: 'Demo Customer',
        email: 'customer@example.com',
        password: 'password123',
        role: 'user'
      },
      {
        name: 'Demo Admin',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'provider',
        providerDetails: { bio: 'Expert cleaner', experience: 5 }
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'provider',
        providerDetails: { bio: 'Master plumber', experience: 10 }
      }
    ]);
    
    // Find provider users specifically for service assignment
    const providers = users.filter(u => u.role === 'provider');

    // 3 categories
    const categories = await Category.create([
      { name: 'Home Cleaning', description: 'Professional cleaning services' },
      { name: 'Plumbing', description: 'Expert plumbing repairs' },
      { name: 'Electrician', description: 'Electrical installations and repairs' }
    ]);

    // 5 services
    await Service.create([
      {
        title: 'Deep House Cleaning',
        description: 'Full deep clean of your home',
        provider: providers[0]._id,
        category: categories[0]._id,
        price: 150,
        images: ['https://example.com/clean1.jpg']
      },
      {
        title: 'Standard Cleaning',
        description: 'Regular weekly cleaning',
        provider: providers[0]._id,
        category: categories[0]._id,
        price: 80,
        images: ['https://example.com/clean2.jpg']
      },
      {
        title: 'Pipe Leak Repair',
        description: 'Fix any leaking pipes',
        provider: providers[1]._id,
        category: categories[1]._id,
        price: 120,
        images: ['https://example.com/plumb1.jpg']
      },
      {
        title: 'Drain Unclogging',
        description: 'Clear clogged drains',
        provider: providers[1]._id,
        category: categories[1]._id,
        price: 90,
        images: ['https://example.com/plumb2.jpg']
      },
      {
        title: 'Electrical Panel Upgrade',
        description: 'Upgrade your main electrical panel',
        provider: providers[1]._id,
        category: categories[2]._id,
        price: 500,
        images: ['https://example.com/elec1.jpg']
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
