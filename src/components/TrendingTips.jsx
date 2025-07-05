import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

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

  if (loading)
    return <p className="text-center py-6">Loading trending tips...</p>;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🔥 Top Trending Tips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip._id}
            className="border p-4 rounded shadow hover:shadow-md"
          >
            <img
              src={tip.image}
              alt={tip.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{tip.title}</h3>
            <p className="text-sm text-gray-500">{tip.category}</p>
            <p className="text-sm mt-2 line-clamp-3">{tip.description}</p>
            <p className="mt-3 text-green-600 font-semibold">
              ❤️ Likes: {tip.totalLiked || 0}
            </p>
            <Link
              to={`/tips/${tip._id}`}
              className="inline-block mt-4 text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
