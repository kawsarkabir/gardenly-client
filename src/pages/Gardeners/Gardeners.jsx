import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';

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

  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">
        🔍 Explore Gardeners
      </h1>

      {gardeners.length === 0 ? (
        <p className="text-center text-gray-600">No gardeners found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id || gardener.id}
              className="bg-white rounded shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={gardener.image || '/default-user.png'}
                alt={gardener.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-green-400"
              />
              <h3 className="text-xl font-semibold">{gardener.name}</h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Age:</strong> {gardener.age}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Gender:</strong> {gardener.gender}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Status:</strong> {gardener.status}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Experience:</strong> {gardener.experience} years
              </p>
              <p className="text-sm text-green-600 font-semibold mb-1">
                Total Shared Tips: {gardener.sharedTipsCount || 0}
              </p>
              {gardener.otherInfo && (
                <p className="text-sm text-gray-500">{gardener.otherInfo}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
