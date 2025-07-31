import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'farmer' ? '/farmer-dashboard' : '/user-dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated && user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Header />
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <main className="overflow-hidden">

          {/* Hero Section */}
          <section id="home" className="relative pt-24 pb-32 px-6 md:px-12 scroll-mt-24">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-6xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Cultivating Connections</span><br />
                Between Farmers & Consumers
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Soilink bridges the gap between <span className="font-semibold text-emerald-700">farmers</span> and <span className="font-semibold text-emerald-700">consumers</span> through an innovative agriculture platform that benefits everyone.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100"
                >
                  <img
                    src="https://imgs.search.brave.com/L4Q6t1MBpyXOlZ91WNFVarJBxENIUN7NHdPfl1PE0r0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mYXJt/ZXItcmVkLXRyYWN0/b3Itc2VlZGVyLXNv/d3MtZ3JhaW4tcGxv/d2VkLWxhbmQtcHJp/dmF0ZS1maWVsZC12/aWxsYWdlLWFyZWEt/bWVjaGFuaXphdGlv/bi1zcHJpbmctd29y/ay1zLTEyOTIwNTk3/Mi5qcGc"
                    alt="Farmland for rent"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">For Farmers</h3>
                    <p className="text-gray-600">Maximize your land's potential by renting unused space and selling your harvest directly.</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100"
                >
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                    alt="Organic produce"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">For Consumers</h3>
                    <p className="text-gray-600">Access fresh, organic produce and connect directly with local farmers.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* About / Features Section */}
          <section id="about" className="py-20 px-6 md:px-12 bg-gradient-to-br from-white to-emerald-50 scroll-mt-24">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">Our Features</span>
                <h2 className="text-4xl font-bold text-gray-900">How Soilink Works</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🌱',
                    title: 'Land Listing',
                    desc: 'Farmers can easily list available land with precise location details and rental terms.'
                  },
                  {
                    icon: '🛒',
                    title: 'Direct Marketplace',
                    desc: 'Sell your harvest directly to consumers without middlemen taking profits.'
                  },
                  {
                    icon: '🔒',
                    title: 'Secure Transactions',
                    desc: 'OTP-verified users ensure safe and reliable transactions for everyone.'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ML Crop Predictor Section */}
          <section id="crop-predictor" className="py-20 px-6 md:px-12 bg-white scroll-mt-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                Smart Suggestion
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Find the Best Crop to Grow 🌾</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Use our AI-powered model to get personalized crop recommendations based on your soil nutrients, climate, and rainfall conditions.
              </p>
              <a
                href="https://crop-pred-ml.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
              >
                🌱 Try Crop Predictor Tool
              </a>

              {/* Optional Embed: Uncomment if embedding is supported */}
              {/* 
              <div className="mt-10 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://ml-crop-predictor.vercel.app/"
                  title="ML Crop Predictor"
                  className="w-full h-[600px] border-2 border-green-100 rounded-lg"
                />
              </div>
              */}
            </motion.div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-6 md:px-12 bg-white scroll-mt-24">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 text-white">
                  <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                  <p className="mb-6 opacity-90">Have questions or need support? Reach out to our team.</p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Email us at</p>
                        <a href="mailto:khanaasif1065@gmail.com" className="text-white hover:underline">khanaasif1065@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Call us at</p>
                        <a href="tel:+919672066407" className="text-white hover:underline">+91 9672066407</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Home;
