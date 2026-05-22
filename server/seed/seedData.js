const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const Service = require('../models/Service');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

async function seed() {
  try {
    console.log('Seeding started...');
    
    // Clear collections
    await Category.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    
    console.log('Cleared existing database collections.');
    
    // 1. Insert Categories
    const categoriesData = [
      { name: 'Cleaning', description: 'Professional home and office cleaning', icon: 'cleaning_services', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800' },
      { name: 'Plumbing', description: 'Expert plumbing repairs and installations', icon: 'plumbing', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800' },
      { name: 'Electrical', description: 'Safe and certified electrical services', icon: 'electrical_services', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
      { name: 'Painting', description: 'Interior and exterior painting services', icon: 'format_paint', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800' },
      { name: 'Wellness', description: 'Therapeutic and relaxing wellness sessions', icon: 'spa', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Gardening', description: 'Beautiful landscaping and garden upkeep', icon: 'yard', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800' }
    ];
    const catDocs = await Category.insertMany(categoriesData);
    const catMap = {};
    catDocs.forEach(c => {
      catMap[c.name] = c._id;
    });
    console.log(`Inserted ${catDocs.length} categories.`);

    // 2. Generate and Insert Users
    const sampleUsers = [
      { name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'user', phone: '+1 (555) 123-4567' },
      { name: 'Bob', email: 'bob@example.com', password: 'password123', role: 'provider', phone: '+1 (555) 987-6543', providerDetails: { bio: 'Experienced professional house cleaner', experience: 8, address: '123 Elm St, San Francisco, CA', rating: 4.8, numReviews: 1 } },
      { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin', phone: '+1 (555) 000-0000' },
    ];

    const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'James', 'Ashley', 'Robert', 'Amanda', 'William', 'Megan', 'Joseph', 'Taylor', 'Daniel', 'Rachel', 'Matthew', 'Elizabeth', 'Andrew', 'Lauren', 'Christopher', 'Kayla', 'Joshua', 'Brianna', 'Ryan', 'Victoria', 'Nicholas', 'Samantha', 'Brandon', 'Alexis', 'Tyler', 'Madison', 'Zachary', 'Abigail', 'Connor', 'Olivia', 'Dylan', 'Emma', 'Christian', 'Isabella', 'Samuel', 'Sophia', 'Benjamin', 'Mia', 'Nathan', 'Charlotte', 'Justin', 'Amelia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

    const totalProvidersNeeded = 50;
    const totalClientsNeeded = 50;

    // Generate providers
    for (let i = 1; i <= totalProvidersNeeded; i++) {
      const fName = firstNames[i % firstNames.length];
      const lName = lastNames[(i + 7) % lastNames.length] + i;
      const fullName = `${fName} ${lName}`;
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}.provider@example.com`;
      sampleUsers.push({
        name: fullName,
        email,
        password: 'password123',
        role: 'provider',
        phone: `+1 (555) ${100 + i}-${2000 + i}`,
        providerDetails: {
          bio: `Certified provider with ${3 + (i % 12)} years of professional experience. Committed to delivering exceptional quality.`,
          experience: 3 + (i % 12),
          address: `${100 + i * 15} Main St, San Francisco, CA`,
          rating: 0,
          numReviews: 0
        }
      });
    }

    // Generate clients
    for (let i = 1; i <= totalClientsNeeded; i++) {
      const fName = firstNames[(i + 17) % firstNames.length];
      const lName = lastNames[(i + 31) % lastNames.length] + i;
      const fullName = `${fName} ${lName}`;
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}.client@example.com`;
      sampleUsers.push({
        name: fullName,
        email,
        password: 'password123',
        role: 'user',
        phone: `+1 (555) ${600 + i}-${7000 + i}`
      });
    }

    // Hash passwords
    for (const u of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      u.password = await bcrypt.hash(u.password, salt);
    }

    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`Inserted ${insertedUsers.length} users.`);

    // 3. Generate and Insert Services
    const serviceTemplates = {
      'Cleaning': [
        { title: 'Standard Home Cleaning', description: 'Dusting, vacuuming, mopping, and kitchen/bathroom sanitization.', basePrice: 80 },
        { title: 'Deep House Cleaning', description: 'Detailed cleaning of all rooms, inside appliances, windows, and baseboards.', basePrice: 180 },
        { title: 'Office Space Cleaning', description: 'Professional sanitization and cleaning for commercial and office spaces.', basePrice: 150 },
        { title: 'Carpet & Rug Steam Cleaning', description: 'Deep extraction steam cleaning to remove stains, dirt, and allergens.', basePrice: 90 }
      ],
      'Plumbing': [
        { title: 'Emergency Leak Repair', description: 'Quick locating and fixing of burst pipes, faucet leaks, and water line breaks.', basePrice: 120 },
        { title: 'Drain Unclogging Service', description: 'Professional snaking and clear-out of blocked kitchen, bathroom, or main drains.', basePrice: 95 },
        { title: 'Water Heater Maintenance', description: 'Flushing, inspection, and thermostat repair for tank and tankless heaters.', basePrice: 140 },
        { title: 'Toilet Repair & Replacement', description: 'Fixing running toilets, leaks, blockages, or complete new installations.', basePrice: 110 }
      ],
      'Electrical': [
        { title: 'Outlet & Switch Installation', description: 'Adding new power outlets, USB ports, GFCI sockets, or smart switches.', basePrice: 75 },
        { title: 'Ceiling Fan & Light Fitting', description: 'Installation of ceiling fans, chandeliers, pendant lights, or recessed lighting.', basePrice: 130 },
        { title: 'Electrical Panel Upgrade', description: 'Safety check, circuit testing, and repairs or upgrades for breaker panels.', basePrice: 200 },
        { title: 'Smart Home Device Setup', description: 'Wiring and configuration for smart doorbells, thermostats, and cameras.', basePrice: 85 }
      ],
      'Painting': [
        { title: 'Single Room Accent Wall Painting', description: 'Prep, priming, and painting of a single room or accent wall.', basePrice: 150 },
        { title: 'Full Bedroom Painting', description: 'Complete walls and ceiling painting including trim work.', basePrice: 450 },
        { title: 'Cabinet Refinishing & Painting', description: 'Professional sanding, priming, and high-quality paint application for cabinets.', basePrice: 600 },
        { title: 'Deck & Fence Staining', description: 'Power washing and application of weather-resistant stain or paint.', basePrice: 350 }
      ],
      'Wellness': [
        { title: '60-Min Swedish Massage', description: 'Relaxing full-body massage using long strokes to reduce stress.', basePrice: 85 },
        { title: '90-Min Deep Tissue Massage', description: 'Targeted massage to relieve chronic muscle tension and tightness.', basePrice: 120 },
        { title: 'Private Yoga & Meditation Session', description: 'One-on-one guided yoga flow and breathing exercises tailored to your level.', basePrice: 70 },
        { title: 'Personal Fitness Training', description: 'Customized workout plan and one-on-one coaching session.', basePrice: 65 }
      ],
      'Gardening': [
        { title: 'Lawn Mowing & Edging', description: 'Professional cut, edging along pathways, and cleanup of grass clippings.', basePrice: 50 },
        { title: 'Hedge Trimming & Pruning', description: 'Shaping bushes, hedges, and pruning small trees for neatness and health.', basePrice: 80 },
        { title: 'Weed Control & Yard Cleanup', description: 'Removal of weeds, leaf raking, and general yard debris disposal.', basePrice: 110 },
        { title: 'Garden Bed Design & Planting', description: 'Soil preparation, mulch spreading, and planting of seasonal flowers or shrubs.', basePrice: 190 }
      ]
    };

    const providers = insertedUsers.filter(u => u.role === 'provider');
    const clients = insertedUsers.filter(u => u.role === 'user');
    
    const servicesToInsert = [];

    // Bob
    const bob = providers.find(p => p.email === 'bob@example.com');
    if (bob) {
      servicesToInsert.push({
        title: 'Premium Home Cleaning by Bob',
        description: 'Top-tier home cleaning and disinfection services provided directly by Bob.',
        provider: bob._id,
        category: catMap['Cleaning'],
        price: 95,
        images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800'],
        rating: 4.8,
        numReviews: 12,
        isActive: true
      });
    }

    // Other providers
    let provIdx = 0;
    for (const p of providers) {
      if (p.email === 'bob@example.com') continue;

      const catNames = Object.keys(serviceTemplates);
      const catName = catNames[provIdx % catNames.length];
      const catId = catMap[catName];
      const templates = serviceTemplates[catName];
      const template = templates[provIdx % templates.length];

      servicesToInsert.push({
        title: template.title,
        description: `${template.description} Serviced with premium tools and friendly care.`,
        provider: p._id,
        category: catId,
        price: template.basePrice,
        images: [categoriesData.find(c => c.name === catName).image],
        rating: 0,
        numReviews: 0,
        isActive: true
      });

      provIdx++;
    }

    const insertedServices = await Service.insertMany(servicesToInsert);
    console.log(`Inserted ${insertedServices.length} services.`);

    // 4. Generate and Insert Bookings/Jobs
    // Around 120 bookings
    const bookingsToInsert = [];
    const totalBookings = 120;
    const timeSlots = ['morning', 'afternoon', 'evening'];
    const addresses = [
      '123 California St, San Francisco, CA',
      '456 Pine St, San Francisco, CA',
      '789 Market St, San Francisco, CA',
      '101 Post St, San Francisco, CA',
      '202 Geary St, San Francisco, CA',
      '303 Sutter St, San Francisco, CA',
      '404 Bush St, San Francisco, CA'
    ];

    for (let i = 0; i < totalBookings; i++) {
      // Pick random client and service
      const client = clients[i % clients.length];
      const serviceDoc = insertedServices[i % insertedServices.length];
      
      // Determine status distribution: 10% pending, 25% confirmed, 55% completed, 10% cancelled
      const randVal = Math.random();
      let status = 'completed';
      if (randVal < 0.10) status = 'pending';
      else if (randVal < 0.35) status = 'confirmed';
      else if (randVal < 0.90) status = 'completed';
      else status = 'cancelled';

      // Set booking date
      // Completed / Cancelled are in the past. Pending / Confirmed are in the future.
      const dateOffset = status === 'completed' || status === 'cancelled'
        ? -1 * Math.floor(Math.random() * 25 + 1) // 1 to 25 days ago
        : Math.floor(Math.random() * 25 + 1);    // 1 to 25 days in the future
      
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() + dateOffset);

      const slot = timeSlots[i % timeSlots.length];
      const address = addresses[i % addresses.length];
      const paymentStatus = status === 'completed' ? 'paid' : (status === 'cancelled' ? 'refunded' : 'pending');

      bookingsToInsert.push({
        user: client._id,
        service: serviceDoc._id,
        provider: serviceDoc.provider,
        status,
        date: bookingDate,
        time: slot,
        address,
        totalPrice: serviceDoc.price,
        paymentStatus
      });
    }

    const insertedBookings = await Booking.insertMany(bookingsToInsert);
    console.log(`Inserted ${insertedBookings.length} bookings.`);

    // 5. Generate and Insert Reviews for Completed Bookings
    const reviewsToInsert = [];
    const completedBookings = insertedBookings.filter(b => b.status === 'completed');
    const reviewsPool = [
      { rating: 5, comment: 'Absolutely outstanding service! The professional arrived on time, was extremely polite, and did a flawless job.' },
      { rating: 5, comment: 'Highly recommended! Exceeded my expectations in every way. Will definitely book again.' },
      { rating: 4, comment: 'Very good experience. Professional and efficient. Just a tiny delay in arrival but otherwise excellent.' },
      { rating: 5, comment: 'Very clean work, very friendly. Thank you so much!' },
      { rating: 4, comment: 'Great service. Took care of everything and left the place spotless.' },
      { rating: 3, comment: 'Decent service. Did the job but took a bit longer than estimated.' },
      { rating: 5, comment: 'Super helper! Solved a problem that others couldn\'t. Excellent knowledge.' }
    ];

    // Keep track of unique user-service combinations for reviews to avoid violating the unique constraint
    const userServicesReviewed = new Set();

    completedBookings.forEach((b, idx) => {
      const key = `${b.service.toString()}_${b.user.toString()}`;
      if (userServicesReviewed.has(key)) return;

      const reviewTpl = reviewsPool[idx % reviewsPool.length];
      reviewsToInsert.push({
        user: b.user,
        service: b.service,
        rating: reviewTpl.rating,
        comment: reviewTpl.comment
      });

      userServicesReviewed.add(key);
    });

    const insertedReviews = await Review.insertMany(reviewsToInsert);
    console.log(`Inserted ${insertedReviews.length} reviews.`);

    // 6. Recalculate ratings and reviews count for services and providers
    console.log('Recalculating service and provider ratings...');
    for (const serviceDoc of insertedServices) {
      const serviceReviews = insertedReviews.filter(r => r.service.toString() === serviceDoc._id.toString());
      if (serviceReviews.length > 0) {
        const sum = serviceReviews.reduce((acc, r) => acc + r.rating, 0);
        serviceDoc.rating = parseFloat((sum / serviceReviews.length).toFixed(1));
        serviceDoc.numReviews = serviceReviews.length;
        await serviceDoc.save();
      } else {
        // default fallback rating
        serviceDoc.rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
        serviceDoc.numReviews = Math.floor(Math.random() * 10 + 5);
        await serviceDoc.save();
      }
    }

    for (const p of providers) {
      // Find all services by this provider
      const pServices = insertedServices.filter(s => s.provider.toString() === p._id.toString());
      const pServiceIds = pServices.map(s => s._id.toString());
      
      const pReviews = insertedReviews.filter(r => pServiceIds.includes(r.service.toString()));
      if (pReviews.length > 0) {
        const sum = pReviews.reduce((acc, r) => acc + r.rating, 0);
        p.providerDetails.rating = parseFloat((sum / pReviews.length).toFixed(1));
        p.providerDetails.numReviews = pReviews.length;
        await p.save();
      } else {
        p.providerDetails.rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
        p.providerDetails.numReviews = Math.floor(Math.random() * 12 + 6);
        await p.save();
      }
    }

    console.log('Successfully completed database seeding.');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

if (require.main === module) {
  // If run directly via node command
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/servicebook')
    .then(() => seed())
    .then(() => {
      console.log('Database seeded successfully via CLI.');
      process.exit(0);
    })
    .catch(err => {
      console.error('CLI seeding failed:', err);
      process.exit(1);
    });
} else {
  // If imported by server/index.js
  if (mongoose.connection.readyState === 1) {
    seed().catch(err => console.error('Seeding error (on import):', err));
  } else {
    mongoose.connection.once('open', () => {
      seed().catch(err => console.error('Seeding error (on import):', err));
    });
  }
}
