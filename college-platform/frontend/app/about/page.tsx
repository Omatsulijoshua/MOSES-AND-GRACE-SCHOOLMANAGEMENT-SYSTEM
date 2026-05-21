export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">About Us</h1>
          <p className="mt-4 text-xl text-primary-100">Excellence in Healthcare Education</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Moses and Grace College of Health Science & Technology was founded with a singular vision: to bridge the gap in quality healthcare education. Since our inception, we have been committed to producing top-tier healthcare professionals who serve communities with skill, compassion, and dedication.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the years, we have grown from a modest institution into a premier center for health sciences, accredited by leading national health boards and recognized for our rigorous academic standards and state-of-the-art practical training facilities.
            </p>
          </div>
          <div>
            <div className="bg-secondary-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Mission</h3>
              <p className="text-gray-700 mb-8">
                To provide comprehensive, innovative, and accessible healthcare education that empowers students to excel as leaders and practitioners in the global health sector.
              </p>
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Vision</h3>
              <p className="text-gray-700">
                To be the foremost institution of health sciences globally, recognized for academic excellence, innovative research, and transformative community impact.
              </p>
            </div>
          </div>
        </div>

        {/* Accreditation */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Accreditation</h2>
          <div className="inline-block bg-white p-8 border rounded-xl shadow-sm">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our programs are fully accredited and approved by the relevant National Health Regulatory Boards and Ministries of Education, ensuring our graduates are recognized and licensed to practice globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
