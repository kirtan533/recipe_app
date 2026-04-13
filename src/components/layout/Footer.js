import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">RecipeApp</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Discover delicious recipes from around the world!
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <a href="/recipes" className="hover:text-red-400 transition">
                  All Recipes
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-red-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4 text-gray-300 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-red-400 transition flex items-center"
              >
                <TfiFacebook className="mr-2" /> Facebook
              </a>
              <a
                href="#"
                className="hover:text-red-600 transition flex items-center"
              >
                <FaInstagram className="mr-2" /> Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-4 text-center text-gray-400 dark:text-gray-50">
          © 2024 RecipeApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
