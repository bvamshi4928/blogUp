import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsYoutube,
  BsEnvelope,
  BsArrowRight,
  BsHeartFill,
} from "react-icons/bs";
import { HiSparkles, HiMail } from "react-icons/hi";

const FooterComp = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const socialLinks = [
    {
      icon: BsFacebook,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: BsInstagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: BsTwitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: BsGithub,
      href: "https://github.com",
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
    {
      icon: BsLinkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: BsYoutube,
      href: "https://youtube.com",
      label: "YouTube",
      color: "hover:text-red-600",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "RSS Feed", path: "/api/rss", external: true },
  ];

  const categories = [
    { name: "Web Development", path: "/search?category=web-development" },
    { name: "JavaScript", path: "/search?category=javascript" },
    { name: "React", path: "/search?category=react" },
    { name: "Node.js", path: "/search?category=nodejs" },
    { name: "Python", path: "/search?category=python" },
    { name: "Tutorials", path: "/search?category=tutorials" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-300">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                Tech
              </span>
              <span className="text-2xl font-bold text-white">Blog</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your go-to destination for cutting-edge tech articles, tutorials,
              and insights. Join our community of passionate developers and tech
              enthusiasts.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 dark:bg-slate-800 text-gray-300 ${social.color} hover:bg-slate-600 dark:hover:bg-slate-700 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <HiSparkles className="text-purple-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <BsArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <BsArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <HiSparkles className="text-indigo-400" />
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <BsArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <HiMail className="text-pink-400" />
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest articles and tech updates delivered to
              your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-700 dark:bg-slate-800 border border-slate-600 dark:border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <BsEnvelope className="w-4 h-4" />
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 dark:border-slate-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center gap-1">
              Made with <BsHeartFill className="text-red-500 animate-pulse" />{" "}
              by Vamshi
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <BsArrowRight className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
