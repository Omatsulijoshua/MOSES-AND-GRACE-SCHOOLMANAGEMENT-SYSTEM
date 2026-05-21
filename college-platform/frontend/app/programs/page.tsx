export default function Programs() {
  const programs = [
    {
      title: "Nursing Science",
      duration: "3 Years",
      description: "Our Nursing Science program prepares students for dynamic careers in healthcare. Curriculum includes anatomy, physiology, patient care, and clinical practice.",
      requirements: "5 Credits in Sciences (Biology, Chemistry, Physics, Math, English)",
      tuition: "₦150,000 / Session"
    },
    {
      title: "Public Health",
      duration: "2 Years",
      description: "Learn to protect and improve the health of people and their communities. Topics include epidemiology, biostatistics, and health services administration.",
      requirements: "5 Credits including Biology and English",
      tuition: "₦120,000 / Session"
    },
    {
      title: "Medical Laboratory Technician",
      duration: "3 Years",
      description: "Train to perform routine clinical laboratory tests that help physicians detect, diagnose, and treat diseases.",
      requirements: "5 Credits in Sciences",
      tuition: "₦140,000 / Session"
    },
    {
      title: "Community Health",
      duration: "3 Years",
      description: "Focus on grassroots health care delivery, preventive medicine, and primary health care management at the community level.",
      requirements: "4 Credits including Biology and English",
      tuition: "₦110,000 / Session"
    },
    {
      title: "Pharmacy Technician",
      duration: "3 Years",
      description: "Learn to assist pharmacists in preparing and dispensing medications, managing inventory, and interacting with patients.",
      requirements: "5 Credits in Sciences",
      tuition: "₦135,000 / Session"
    }
  ];

  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      <div className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">Our Programs</h1>
          <p className="mt-4 text-xl text-primary-100">Comprehensive healthcare education designed for the modern world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h2>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold mb-4">{program.duration}</span>
              <p className="text-gray-600 mb-6 line-clamp-3 hover:line-clamp-none">{program.description}</p>
              
              <div className="border-t pt-4">
                <div className="mb-2">
                  <span className="font-semibold text-gray-900">Requirements:</span> <span className="text-gray-600">{program.requirements}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Estimated Tuition:</span> <span className="text-gray-600">{program.tuition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
