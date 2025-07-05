import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { toast } from 'sonner';

export default function BrowseTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search);

  const difficulty = query.get('difficulty'); // e.g., Easy
  const category = query.get('category'); // e.g., Composting

  useEffect(() => {
    let url = 'http://localhost:5000/tips?availability=Public';

    if (difficulty) url += `&difficultyLevel=${difficulty}`;
    if (category) url += `&category=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch(() => toast.error('Failed to load tips'))
      .finally(() => setLoading(false));
  }, [difficulty, category]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">📋 Browse Garden Tips</h2>

      {loading ? (
        <p>Loading tips...</p>
      ) : tips.length === 0 ? (
        <p>No tips found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip) => (
              <tr key={tip._id} className="border-t">
                <td className="p-3">
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="w-20 h-12 object-cover"
                  />
                </td>
                <td className="p-3">{tip.title}</td>
                <td className="p-3">{tip.category}</td>
                <td className="p-3">{tip.difficultyLevel}</td>
                <td className="p-3">
                  <Link
                    to={`/tips/${tip._id}`}
                    className="text-green-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
