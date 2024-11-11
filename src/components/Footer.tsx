import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-purple text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-soft-pink">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-soft-pink">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-soft-pink">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-soft-pink">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-montserrat font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-soft-pink">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-soft-pink">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-soft-pink">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-soft-pink">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white border-opacity-20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} KissMyKrush. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;