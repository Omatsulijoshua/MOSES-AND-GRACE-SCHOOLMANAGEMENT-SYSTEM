import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Moses & Grace College</h3>
          <p className="text-sm">Empowering the next generation of healthcare professionals with excellence, integrity, and compassion.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary-500 transition">About Us</Link></li>
            <li><Link href="/programs" className="hover:text-primary-500 transition">Programs</Link></li>
            <li><Link href="/admissions" className="hover:text-primary-500 transition">Admissions</Link></li>
            <li><Link href="/news" className="hover:text-primary-500 transition">News & Events</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>123 Education Lane</li>
            <li>Cityville, State 12345</li>
            <li>Phone: +1 (234) 567-890</li>
            <li>Email: info@mosesandgrace.edu</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Portal</h4>
          <Link href="/portal/login" className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-500 transition text-sm">
            Student Login
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-sm text-center">
        &copy; {new Date().getFullYear()} Moses and Grace College of Health Science & Technology. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
