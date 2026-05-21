export default function Admissions() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white">Admissions</h1>
          <p className="mt-4 text-xl text-primary-100">Take the first step towards a rewarding career</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Purchase Form</h3>
                    <p className="text-gray-600">Obtain the admission form from the college registry or download it online after paying the non-refundable application fee of ₦5,000.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Documents</h3>
                    <p className="text-gray-600">Submit the completed form along with copies of your O'Level results, birth certificate, and recent passport photographs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Entrance Examination</h3>
                    <p className="text-gray-600">Attend the mandatory entrance examination and interview on the dates communicated to you.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">General Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Five (5) Credit passes in WAEC, NECO, or GCE O'Level at not more than two sittings.</li>
                <li>Credits must include English Language, Mathematics, Biology, Chemistry, and Physics.</li>
                <li>Candidate must be at least 16 years of age by the time of admission.</li>
                <li>A medical fitness certificate from a recognized government hospital.</li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary-50 p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b pb-2"><span className="font-medium">Form Sales Begin:</span> <span className="text-gray-600">March 1st</span></li>
                <li className="flex justify-between border-b pb-2"><span className="font-medium">Submission Deadline:</span> <span className="text-gray-600">July 31st</span></li>
                <li className="flex justify-between border-b pb-2"><span className="font-medium">Entrance Exam:</span> <span className="text-gray-600">August 15th</span></li>
                <li className="flex justify-between"><span className="font-medium">Resumption:</span> <span className="text-gray-600">October 2nd</span></li>
              </ul>
            </div>

            <div className="bg-primary-900 p-6 rounded-xl text-white shadow-sm text-center">
              <h3 className="text-xl font-bold mb-4">Download Forms</h3>
              <p className="text-sm text-primary-100 mb-6">You can download the admission form here and submit it physically at our registry.</p>
              <button className="w-full bg-white text-primary-900 hover:bg-gray-100 font-bold py-2 px-4 rounded transition">
                Download PDF Form
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
