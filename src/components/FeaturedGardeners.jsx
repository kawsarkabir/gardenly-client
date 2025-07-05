import { useEffect, useState } from 'react';

export default function FeaturedGardeners() {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/gardeners')
      .then((res) => res.json())
      .then((data) => setGardeners(data));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌟 Featured Gardeners
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gardeners.map((gardener, i) => (
            <div
              key={i}
              className="bg-green-50 border p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={gardener.image}
                alt={gardener.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{gardener.name}</h3>
              <p className="text-sm text-gray-600">{gardener.experience}</p>
              <p className="text-sm text-gray-500 mt-1">
                Age: {gardener.age} | {gardener.gender}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
