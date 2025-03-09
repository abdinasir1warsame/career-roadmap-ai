import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    currentRole: '',
    experience: '',
    interests: '',
    email: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send this data to your backend
    console.log(formData);
  };

  return (
    <div className="overflow-hidden">
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Navbar */}
        <nav className="px-6 py-4 flex justify-between items-center border-b border-purple-700/30 backdrop-blur-sm bg-black/10 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold">AI</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              CareerPath
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#features"
              className="hover:text-purple-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-purple-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-purple-400 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#get-started"
              className="hover:text-purple-400 transition-colors"
            >
              Get Started
            </a>
          </div>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20">
            Sign Up
          </button>
        </nav>

        {/* Hero Section */}
        <section className="relative py-10 lg:py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1/1200/800')] bg-cover opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Your{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    AI-Powered
                  </span>{' '}
                  Career Journey
                </h1>
                <p className="mt-6 text-lg text-gray-300">
                  Discover your personalized career roadmap with our advanced AI
                  technology. Input your skills, experience, and goals to
                  receive a tailored path to success.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#get-started"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20 font-medium"
                  >
                    Get Your Roadmap
                  </a>
                  <a
                    href="#how-it-works"
                    className="px-6 py-3 rounded-full border border-purple-500/50 hover:bg-purple-500/10 transition-all font-medium"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 -m-4"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-sm text-gray-400">
                      AI Career Analysis
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-blue-900/40 rounded-lg p-3 border border-blue-700/30 max-w-[80%]">
                        Hello! I'm your AI career assistant. What's your current
                        role?
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-purple-900/40 rounded-lg p-3 border border-purple-700/30 max-w-[80%]">
                        I'm a junior web developer looking to become a
                        full-stack engineer.
                      </div>
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        U
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-blue-900/40 rounded-lg p-3 border border-blue-700/30 max-w-[80%]">
                        Great! Based on market trends and your profile, I
                        recommend focusing on these technologies: React,
                        Node.js, and cloud services like AWS. Let me create your
                        personalized roadmap...
                      </div>
                    </div>
                    <div className="animate-pulse flex justify-start gap-1 ml-11">
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  AI-Powered
                </span>{' '}
                Career Features
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Our advanced AI analyzes thousands of career paths to create a
                personalized roadmap just for you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Personalized Roadmaps',
                  description:
                    'Get a custom career path based on your skills, experience, and goals.',
                  icon: '🗺️',
                },
                {
                  title: 'Skill Gap Analysis',
                  description:
                    'Identify the skills you need to develop to reach your career goals.',
                  icon: '📊',
                },
                {
                  title: 'Industry Insights',
                  description:
                    'Access real-time data on industry trends and job market demands.',
                  icon: '💡',
                },
                {
                  title: 'Learning Resources',
                  description:
                    'Curated learning materials to help you acquire the skills you need.',
                  icon: '📚',
                },
                {
                  title: 'Progress Tracking',
                  description:
                    'Monitor your progress and adjust your roadmap as you grow.',
                  icon: '📈',
                },
                {
                  title: 'Networking Opportunities',
                  description:
                    'Connect with professionals who have followed similar career paths.',
                  icon: '🔗',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 px-6 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                How{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  It Works
                </span>
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Our AI-powered platform makes it easy to get your personalized
                career roadmap in just a few steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '1',
                  title: 'Share Your Profile',
                  description:
                    'Tell us about your current role, skills, and experience.',
                },
                {
                  step: '2',
                  title: 'Define Your Goals',
                  description:
                    'Let us know where you want to go in your career journey.',
                },
                {
                  step: '3',
                  title: 'AI Analysis',
                  description:
                    'Our AI analyzes your profile and compares it with thousands of successful career paths.',
                },
                {
                  step: '4',
                  title: 'Get Your Roadmap',
                  description:
                    'Receive a personalized roadmap with actionable steps to achieve your goals.',
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold text-xl mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                What Our{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Users Say
                </span>
              </h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Hear from professionals who have transformed their careers with
                our AI-powered roadmaps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Alex Johnson',
                  role: 'Senior Developer',
                  image: 'https://picsum.photos/id/1012/100/100',
                  quote:
                    'The AI career roadmap helped me transition from a junior to senior developer in just 18 months. The skill recommendations were spot on!',
                },
                {
                  name: 'Sarah Chen',
                  role: 'Product Manager',
                  image: 'https://picsum.photos/id/1027/100/100',
                  quote:
                    'I was stuck in my career until I found this platform. The personalized roadmap showed me exactly what skills I needed to develop to make the jump to product management.',
                },
                {
                  name: 'Michael Rodriguez',
                  role: 'Data Scientist',
                  image: 'https://picsum.photos/id/1025/100/100',
                  quote:
                    'As someone transitioning from academia to tech, this tool was invaluable. It helped me identify the most relevant skills to focus on and saved me months of research.',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Form */}
        <section id="get-started" className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-500/5">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Get Your{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Personalized Roadmap
                  </span>
                </h2>
                <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                  Fill out the form below to start your AI-powered career
                  journey.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="currentRole"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Current Role
                    </label>
                    <input
                      type="text"
                      id="currentRole"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Junior Developer, Marketing Specialist"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="interests"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Career Interests
                    </label>
                    <textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Describe your career goals and interests..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20 font-medium text-white"
                    >
                      Generate My Career Roadmap
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300 mb-6">
                    We're generating your personalized career roadmap. You'll
                    receive it in your email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 rounded-lg border border-purple-500 hover:bg-purple-500/10 transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="py-12 px-6 border-t border-purple-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl font-bold">AI</span>
                  </div>
                  <span className="text-xl font-bold">CareerPath</span>
                </div>
                <p className="text-gray-400">
                  Your AI-powered career companion, helping you navigate your
                  professional journey with personalized roadmaps.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      className="hover:text-purple-400 transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#get-started"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Career Guides
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Industry Reports
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      Success Stories
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>support@aicareerpath.com</li>
                  <li>1-800-AI-CAREER</li>
                  <li>123 Tech Plaza, San Francisco, CA</li>
                </ul>
                <div className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
