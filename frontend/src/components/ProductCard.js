import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultSize = product.sizes?.[0] || null;
    const defaultColor = product.colors?.[0] || null;
    
    addToCart(product.id, 1, defaultSize, defaultColor);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-secondary-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group h-full"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.is_featured && (
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-blue-600 to-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                Best Seller
              </div>
            )}
            
            {/* Action Buttons - Appears on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-3">
                <motion.button
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  onClick={handleAddToCart}
                  className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <ShoppingCart className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const message = `Hi! I'm interested in ${product.name} (₹${(product.price * 83).toFixed(0)}). Is it available? Please share more details.`;
                    window.open(`https://wa.me/918884344214?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <div className="mb-2 sm:mb-3">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-1 text-sm sm:text-base">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs sm:text-sm text-gray-500">
                ({product.reviews_count})
              </span>
            </div>

            <div className="mt-auto">
              {/* Price */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ₹{(product.price * 83).toFixed(0)}
                </span>
                
                {/* Colors Preview */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex space-x-1 hidden sm:flex">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                         color.toLowerCase() === 'black' ? '#000000' :
                                         color.toLowerCase() === 'red' ? '#ef4444' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'green' ? '#10b981' :
                                         color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                         color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                         color.toLowerCase() === 'pink' ? '#ec4899' :
                                         color.toLowerCase() === 'gray' ? '#6b7280' :
                                         color.toLowerCase() === 'navy' ? '#1e40af' :
                                         '#6b7280'
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500 self-center ml-1">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                {product.stock_quantity > 0 ? (
                  <span className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-1 sm:mr-2"></div>
                    In Stock
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm text-red-600 font-medium flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-1 sm:mr-2"></div>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;