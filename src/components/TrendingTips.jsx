import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';

export default function TrendingTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/trending-tips')
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load trending tips');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="uppercase text-green-500 font-semibold tracking-wide mb-2">
            tips
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Top Trending Tips
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            See what’s hot in the gardening world! These tips are loved by our
            community and bring real results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <div
              key={tip._id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-5 flex flex-col space-y-2"
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="h-40 w-full object-cover rounded-md  "
              />
              <h3 className="text-xl font-semibold text-green-800  ">
                {tip.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-semibold bg-green-500 px-2 py-0.5  rounded-full">
                  Category: {tip.category}
                </span>
                <span className="bg-yellow-500 text-xs font-semibold text-white px-2 py-0.5  rounded-full">
                  Difficulty: {tip.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3  ">
                {tip.description}
              </p>
              <p className="text-green-600 font-semibold text-sm  ">
                ❤️ {tip.totalLiked || 0} Likes
              </p>
              <Link
                to={`/tips/${tip._id}`}
                className="mt-auto inline-block text-sm text-green-700 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
