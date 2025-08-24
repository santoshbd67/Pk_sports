-- Create database schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID REFERENCES categories(id),
    brand VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    images TEXT[],
    sizes VARCHAR(50)[],
    colors VARCHAR(50)[],
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    size VARCHAR(50),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id, size, color)
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    size VARCHAR(50),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert all categories
INSERT INTO categories (name, description, image_url) VALUES
('Sportswear', 'Athletic clothing and apparel', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'),
('Sports Kits', 'Complete sports uniforms and kits', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'),
('Accessories', 'Sports accessories and gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
('Equipment', 'Sports equipment and tools', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'),
('Cricket', 'Cricket equipment and gear', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400'),
('Badminton', 'Badminton rackets and accessories', 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400'),
('Volleyball', 'Volleyball equipment and gear', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400'),
('Tennis', 'Tennis rackets and accessories', 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400'),
('Indoor Games', 'Chess, Carrom and indoor sports', 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400'),
('Kabaddi', 'Kabaddi kits and equipment', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'),
('Fitness', 'Home fitness and gym equipment', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400');

-- Insert all products with unique images
INSERT INTO products (name, description, price, category_id, brand, stock_quantity, image_url, images, sizes, colors, rating, reviews_count, is_featured) VALUES
-- Sportswear (6 products)
('Nike Dri-FIT Running Shirt', 'Lightweight moisture-wicking running shirt', 29.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Nike', 50, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White', 'Blue'], 4.5, 128, true),
('Adidas Training Shorts', 'Comfortable training shorts with side pockets', 24.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Adidas', 75, 'https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400', ARRAY['https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Gray'], 4.3, 89, false),
('Under Armour Hoodie', 'Warm fleece hoodie for cold weather training', 49.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Under Armour', 30, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Gray', 'Red'], 4.7, 156, true),
('Puma Track Suit', 'Complete track suit for training and casual wear', 89.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Puma', 35, 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400', ARRAY['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Red'], 4.4, 67, false),
('Reebok Sports Bra', 'High-support sports bra for intense workouts', 34.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Reebok', 60, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black', 'Pink', 'Gray'], 4.6, 89, true),
('Nike Running Tights', 'Compression tights for running and training', 39.99, (SELECT id FROM categories WHERE name = 'Sportswear'), 'Nike', 45, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', ARRAY['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Purple'], 4.5, 112, false),

-- Sports Kits (5 products)
('Football Jersey Set', 'Complete football uniform with jersey and shorts', 79.99, (SELECT id FROM categories WHERE name = 'Sports Kits'), 'Nike', 25, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', ARRAY['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Red', 'Blue', 'White'], 4.6, 94, true),
('Basketball Uniform', 'Professional basketball jersey and shorts set', 69.99, (SELECT id FROM categories WHERE name = 'Sports Kits'), 'Adidas', 40, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', ARRAY['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White', 'Purple'], 4.4, 67, false),
('Cricket Kit Complete', 'Full cricket kit with bat, pads, gloves, helmet', 149.99, (SELECT id FROM categories WHERE name = 'Sports Kits'), 'MRF', 20, 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400', ARRAY['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400'], ARRAY['Youth', 'Adult'], ARRAY['White'], 4.8, 156, true),
('Badminton Kit', 'Complete badminton set with rackets and shuttlecocks', 59.99, (SELECT id FROM categories WHERE name = 'Sports Kits'), 'Yonex', 30, 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400', ARRAY['https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400'], ARRAY['Standard'], ARRAY['Blue', 'Red'], 4.5, 78, false),
('Tennis Kit', 'Professional tennis racket with balls and bag', 89.99, (SELECT id FROM categories WHERE name = 'Sports Kits'), 'Wilson', 25, 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400', ARRAY['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400'], ARRAY['Standard'], ARRAY['Black', 'White'], 4.7, 134, true),

-- Accessories (6 products)
('Sports Water Bottle', 'Insulated stainless steel water bottle', 19.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Hydro Flask', 100, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'], ARRAY['500ml', '750ml', '1L'], ARRAY['Black', 'Blue', 'Pink', 'Green'], 4.8, 234, true),
('Gym Gloves', 'Padded workout gloves for weightlifting', 14.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Harbinger', 60, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Gray'], 4.2, 78, false),
('Sports Headband', 'Moisture-wicking athletic headband', 9.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Nike', 80, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'], ARRAY['One Size'], ARRAY['Black', 'White', 'Red', 'Blue'], 4.1, 45, false),
('Sports Bag', 'Large duffle bag for gym and sports equipment', 44.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Adidas', 40, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'], ARRAY['Medium', 'Large'], ARRAY['Black', 'Navy', 'Red'], 4.4, 89, true),
('Wrist Bands', 'Sweat-absorbing wrist bands for sports', 7.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Nike', 120, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400', ARRAY['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400'], ARRAY['One Size'], ARRAY['White', 'Black', 'Red', 'Blue'], 4.0, 56, false),
('Sports Socks', 'Cushioned athletic socks for comfort', 12.99, (SELECT id FROM categories WHERE name = 'Accessories'), 'Puma', 90, 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400', ARRAY['https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400'], ARRAY['S', 'M', 'L'], ARRAY['White', 'Black', 'Gray'], 4.3, 67, false),

-- Equipment (9 products)
('Yoga Mat', 'Non-slip exercise and yoga mat', 34.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Manduka', 45, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'], ARRAY['Standard'], ARRAY['Purple', 'Blue', 'Black', 'Pink'], 4.6, 189, true),
('Resistance Bands Set', 'Set of 5 resistance bands with handles', 24.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Fit Simplify', 70, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', ARRAY['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'], ARRAY['Standard'], ARRAY['Multi-color'], 4.5, 312, false),
('Dumbbells Set', 'Adjustable dumbbells 5-50 lbs', 199.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Bowflex', 15, 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400', ARRAY['https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400'], ARRAY['Standard'], ARRAY['Black'], 4.7, 98, true),
('Treadmill', 'Electric treadmill for home fitness', 899.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'NordicTrack', 8, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400', ARRAY['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400'], ARRAY['Standard'], ARRAY['Black'], 4.6, 45, true),
('Exercise Bike', 'Stationary bike for cardio workouts', 399.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Schwinn', 12, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], ARRAY['Standard'], ARRAY['Black', 'White'], 4.4, 67, false),
('Pull-up Bar', 'Doorway pull-up bar for home workouts', 29.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Iron Gym', 50, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'], ARRAY['Standard'], ARRAY['Black'], 4.3, 123, false),
('Kettlebell Set', 'Cast iron kettlebells for strength training', 79.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'CAP Barbell', 25, 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400', ARRAY['https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400'], ARRAY['10kg', '15kg', '20kg'], ARRAY['Black'], 4.5, 89, true),
('Boxing Gloves', 'Professional boxing gloves for training', 49.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Everlast', 35, 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400', ARRAY['https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400'], ARRAY['12oz', '14oz', '16oz'], ARRAY['Red', 'Black', 'Blue'], 4.6, 156, false),
('Skipping Rope', 'Adjustable speed rope for cardio', 15.99, (SELECT id FROM categories WHERE name = 'Equipment'), 'Crossrope', 80, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'], ARRAY['Standard'], ARRAY['Black', 'Red', 'Blue'], 4.2, 78, false),

-- Cricket (3 products)
('Cricket Bat English Willow', 'Professional grade English willow cricket bat', 129.99, (SELECT id FROM categories WHERE name = 'Cricket'), 'SS', 20, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400', ARRAY['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'], ARRAY['Short Handle', 'Long Handle'], ARRAY['Natural'], 4.7, 89, true),
('Cricket Helmet', 'Protective cricket helmet with face guard', 89.99, (SELECT id FROM categories WHERE name = 'Cricket'), 'MRF', 15, 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400', ARRAY['https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400'], ARRAY['S', 'M', 'L'], ARRAY['White', 'Blue'], 4.6, 67, false),
('Cricket Pads', 'Leg guards for cricket batting', 69.99, (SELECT id FROM categories WHERE name = 'Cricket'), 'SG', 25, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', ARRAY['https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400'], ARRAY['Youth', 'Men'], ARRAY['White'], 4.5, 45, false),

-- Badminton (2 products)
('Badminton Racket Pro', 'Carbon fiber badminton racket', 79.99, (SELECT id FROM categories WHERE name = 'Badminton'), 'Yonex', 30, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'], ARRAY['Standard'], ARRAY['Blue', 'Red', 'Black'], 4.8, 123, true),
('Shuttlecocks Pack', 'Feather shuttlecocks pack of 12', 24.99, (SELECT id FROM categories WHERE name = 'Badminton'), 'Victor', 50, 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400', ARRAY['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400'], ARRAY['Standard'], ARRAY['White'], 4.4, 78, false),

-- Volleyball (3 products)
('Volleyball Official', 'Official size volleyball for matches', 34.99, (SELECT id FROM categories WHERE name = 'Volleyball'), 'Mikasa', 40, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], ARRAY['Standard'], ARRAY['White', 'Yellow'], 4.6, 89, true),
('Volleyball Net', 'Professional volleyball net with posts', 89.99, (SELECT id FROM categories WHERE name = 'Volleyball'), 'Spalding', 15, 'https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400', ARRAY['https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400'], ARRAY['Standard'], ARRAY['White'], 4.5, 67, false),
('Volleyball Knee Pads', 'Protective knee pads for volleyball', 24.99, (SELECT id FROM categories WHERE name = 'Volleyball'), 'Nike', 60, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White'], 4.4, 45, false),

-- Tennis (2 products)
('Tennis Racket Pro', 'Professional tennis racket', 129.99, (SELECT id FROM categories WHERE name = 'Tennis'), 'Wilson', 25, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', ARRAY['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'], ARRAY['Standard'], ARRAY['Black', 'Red'], 4.7, 123, true),
('Tennis Balls Pack', 'Pack of 3 tennis balls', 12.99, (SELECT id FROM categories WHERE name = 'Tennis'), 'Wilson', 80, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'], ARRAY['Standard'], ARRAY['Yellow'], 4.3, 78, false),

-- Indoor Games (3 products)
('Chess Set Wooden', 'Premium wooden chess set', 49.99, (SELECT id FROM categories WHERE name = 'Indoor Games'), 'Classic Games', 30, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'], ARRAY['Standard'], ARRAY['Brown'], 4.8, 156, true),
('Carrom Board', 'Traditional carrom board with coins', 79.99, (SELECT id FROM categories WHERE name = 'Indoor Games'), 'Surco', 20, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], ARRAY['Standard'], ARRAY['Brown'], 4.6, 89, false),
('Table Tennis Set', 'Complete table tennis paddle set', 39.99, (SELECT id FROM categories WHERE name = 'Indoor Games'), 'Stiga', 35, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400', ARRAY['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'], ARRAY['Standard'], ARRAY['Red', 'Black'], 4.5, 67, false),

-- Kabaddi (4 products)
('Kabaddi Shorts', 'Professional kabaddi shorts', 19.99, (SELECT id FROM categories WHERE name = 'Kabaddi'), 'Nivia', 50, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', ARRAY['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Red', 'Blue', 'Green'], 4.4, 78, true),
('Kabaddi Jersey', 'Team kabaddi jersey with number', 29.99, (SELECT id FROM categories WHERE name = 'Kabaddi'), 'Nivia', 40, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', ARRAY['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Red', 'Blue', 'Yellow'], 4.3, 56, false),
('Kabaddi Mat', 'Official kabaddi playing mat', 199.99, (SELECT id FROM categories WHERE name = 'Kabaddi'), 'Khelmart', 10, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', ARRAY['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'], ARRAY['Standard'], ARRAY['Red'], 4.7, 34, true),
('Kabaddi Knee Guards', 'Protective knee guards for kabaddi', 24.99, (SELECT id FROM categories WHERE name = 'Kabaddi'), 'Nivia', 30, 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400', ARRAY['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400'], ARRAY['S', 'M', 'L'], ARRAY['Black'], 4.2, 45, false),

-- Fitness (2 products)
('Home Gym Setup', 'Complete home gym with bench and weights', 599.99, (SELECT id FROM categories WHERE name = 'Fitness'), 'Powermax', 10, 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400', ARRAY['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400'], ARRAY['Standard'], ARRAY['Black'], 4.7, 34, true),
('Protein Shaker', 'BPA-free protein shaker bottle', 12.99, (SELECT id FROM categories WHERE name = 'Fitness'), 'Blender Bottle', 100, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'], ARRAY['600ml'], ARRAY['Black', 'Blue', 'Red'], 4.3, 156, false);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);