import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function BeginnersCorner() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/beginner-tips')
      .then((res) => res.json())
      .then((data) => setTips(data));
  }, []);

  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌿 Beginner’s Corner
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Just starting out? Here are some easy gardening tips perfect for
          beginners to grow confidently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <Link
              to={`/tips/${tip._id}`}
              key={tip._id}
              className="bg-white shadow rounded p-6 hover:shadow-md transition"
            >
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Category: {tip.category}
              </p>
              <p className="text-sm text-gray-500">
                Difficulty: {tip.difficultyLevel}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/browse-tips?difficulty=Easy"
            className="text-green-600 underline hover:text-green-800"
          >
            See all beginner tips →
          </Link>
        </div>
      </div>
    </section>
  );
}
