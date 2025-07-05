import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Gardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/gardeners')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch gardeners');
        return res.json();
      })
      .then((data) => {
        setGardeners(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-semibold">{error}</p>
    );

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">
        🌱 Meet Our Gardeners
      </h1>

      {gardeners.length === 0 ? (
        <p className="text-center text-gray-600">No gardeners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id || gardener.id}
              className="relative group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center p-6"
            >
              <img
                src={gardener.image || '/default-user.png'}
                alt={gardener.name}
                onError={(e) => (e.currentTarget.src = '/default-user.png')}
                className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-4 border-green-300"
              />

              <h3 className="text-xl font-bold text-gray-800">
                {gardener.name}
              </h3>

              <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Age: {gardener.age}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {gardener.gender}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {gardener.status}
                </span>
              </div>

              <p className="text-sm mt-2 text-gray-600">
                Experience: {gardener.experience} years
              </p>
              <p className="text-sm text-emerald-600 font-semibold">
                Shared Tips: {gardener.sharedTipsCount || 0}
              </p>

              {gardener.otherInfo && (
                <p className="text-sm text-gray-500 italic mt-1">
                  {gardener.otherInfo}
                </p>
              )}

              {/* Social Icons on Hover */}
              <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 group-hover:bottom-[30px] transition-all duration-500 ease-in-out flex gap-3 bg-white px-4 py-2 rounded-full shadow-md z-10">
                <a
                  href="#"
                  className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                >
                  <FaTwitter size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                >
                  <FaInstagram size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
