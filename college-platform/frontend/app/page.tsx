import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Shape Your Future in Healthcare
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-10">
            Moses and Grace College of Health Science & Technology provides world-class education for the next generation of medical professionals.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/admissions" className="bg-white text-primary-900 hover:bg-gray-100 px-8 py-3 rounded-md font-bold text-lg transition shadow-lg">
              Apply Now
            </Link>
            <Link href="/programs" className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-md font-bold text-lg transition shadow-lg">
              Our Programs
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-primary-900 opacity-90"></div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">95%</h3>
              <p className="text-gray-600 font-medium">Employment Rate</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">5+</h3>
              <p className="text-gray-600 font-medium">Accredited Programs</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary-600 mb-2">Expert</h3>
              <p className="text-gray-600 font-medium">Faculty & Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our top-rated healthcare programs designed to give you hands-on experience and theoretical knowledge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-blue-100 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nursing Science</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">Comprehensive training in patient care, medical procedures, and healthcare ethics.</p>
                <Link href="/programs" className="text-primary-600 font-medium hover:text-primary-800">Learn more &rarr;</Link>
              </div>
            </div>
            {/* Program 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-green-100 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Public Health</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">Focus on community health promotion, disease prevention, and health policy.</p>
                <Link href="/programs" className="text-primary-600 font-medium hover:text-primary-800">Learn more &rarr;</Link>
              </div>
            </div>
            {/* Program 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-purple-100 relative"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Lab Technician</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">Hands-on training in diagnostic testing, laboratory procedures, and analysis.</p>
                <Link href="/programs" className="text-primary-600 font-medium hover:text-primary-800">Learn more &rarr;</Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/programs" className="inline-block border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-2 rounded-md font-semibold transition">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of successful graduates making a difference in the healthcare sector.</p>
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-md inline-block">
            Contact Admissions
          </Link>
        </div>
      </section>
    </div>
  );
}
