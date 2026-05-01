import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MapPin, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { jobListings } from '../data/mockData';

const JobDetail = () => {
  const { jobId } = useParams();
  const job = jobListings.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">This position may no longer be available.</p>
          <Link to="/careers">
            <Button size="lg">View All Positions</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <Link to="/careers" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            ← Back to All Positions
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {job.category}
              </span>
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                {job.type}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {job.salary}
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Role</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-600 mb-6">
                Submit your application and our team will review your profile within 2-3 business days.
              </p>
              <Link to={`/contact?type=candidate&job=${job.id}`}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 text-lg px-8 py-6">
                  Apply for This Position
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
