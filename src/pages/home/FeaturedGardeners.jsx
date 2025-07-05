import { useEffect, useState } from 'react';

export default function FeaturedGardeners() {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/gardeners/featured')
      .then((res) => res.json())
      .then((data) => setGardeners(data));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌟 Featured Gardeners
        </h2>

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
      </div>
    </section>
  );
}
