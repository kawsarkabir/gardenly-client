import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

export default function BrowseTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/tips')
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch(() => toast.error('Failed to fetch tips'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTips =
    filter === 'All' ? tips : tips.filter((tip) => tip.difficulty === filter);

  return (
    <div className="max-w-5xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">🌿 Browse Public Tips</h1>

      <div className="mb-4">
        <label className="font-medium mr-2">Filter by Difficulty:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tips...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Image</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTips.map((tip) => (
                <tr key={tip._id} className="border-b">
                  <td className="p-2">{tip.title}</td>
                  <td className="p-2">{tip.category}</td>
                  <td className="p-2">
                    <img src={tip.image} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="p-2">
                    <Link
                      to={`/tips/${tip._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      See More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
