import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router';

export default function MyTips() {
  const { user } = useAuth();
  const [myTips, setMyTips] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    fetch(`http://localhost:5000/tips-by-user?email=${user.email}`)
      .then((res) => res.json())
      .then(setMyTips)
      .catch(() => toast.error('Error loading your tips'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this tip?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/tips/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (result.deletedCount > 0) {
      toast.success('Tip deleted!');
      loadData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">📂 My Tips</h1>

      {loading ? (
        <p>Loading your tips...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTips.map((tip) => (
              <tr key={tip._id}>
                <td className="p-2">{tip.title}</td>
                <td className="p-2">{tip.availability}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    to={`/update-tip/${tip._id}`}
                    className="text-blue-500 underline"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
