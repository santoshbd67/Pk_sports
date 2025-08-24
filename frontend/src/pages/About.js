import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, Phone } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: MapPin, label: 'Location', value: 'Karnataka' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PK Sports
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your trusted partner in sports excellence, serving athletes and fitness enthusiasts 
              across Karnataka with premium quality sports equipment and apparel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</h3>
                <p className="text-secondary-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-secondary-700">
                <p>
                  Founded in Mahalingpur, Karnataka, PK Sports has been serving the local 
                  sports community for over 15 years. We started as a small shop with a 
                  big dream - to make quality sports equipment accessible to everyone.
                </p>
                <p>
                  Today, we're proud to be one of Karnataka's leading sports retailers, 
                  offering everything from professional sports equipment to casual fitness 
                  gear. Our commitment to quality and customer service has earned us the 
                  trust of thousands of athletes and fitness enthusiasts.
                </p>
                <p>
                  Whether you're a professional athlete, weekend warrior, or just starting 
                  your fitness journey, we have the right gear to help you achieve your goals.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Sports Equipment"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              To inspire and enable people to lead active, healthy lives by providing 
              high-quality sports equipment, expert advice, and exceptional customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Quality First</h3>
              <p className="text-secondary-600">
                We source only the best products from trusted brands to ensure 
                durability and performance.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Expert Guidance</h3>
              <p className="text-secondary-600">
                Our knowledgeable team provides personalized recommendations 
                based on your specific needs and goals.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Community Focus</h3>
              <p className="text-secondary-600">
                We're committed to supporting local sports communities and 
                promoting active lifestyles in Karnataka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Visit our store in Mahalingpur or call us for expert advice on sports equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918884344214"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                Visit Store
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;