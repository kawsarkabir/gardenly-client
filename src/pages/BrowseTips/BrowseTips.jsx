'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router';
import { toast } from 'sonner';

export default function BrowseTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('https://gardenly-server.vercel.app/tips')
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch(() => toast.error('Failed to fetch tips'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTips =
    filter === 'All' ? tips : tips.filter((tip) => tip.difficulty === filter);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <Fade direction="up">
        <div className="py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#52b788] mb-2 dark:text-white">
            Browse Garden Tips
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Explore helpful tips shared by fellow gardeners around the world.
            Learn new techniques, plant care strategies, and more.
          </p>
        </div>
      </Fade>

      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">Filter by Difficulty:</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-100 text-sm text-gray-700">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Difficulty</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Details</th>
              </tr>
            </thead>

            <tbody>
              {filteredTips.length > 0 ? (
                filteredTips.map((tip) => (
                  <tr key={tip._id} className="hover:bg-black/10 text-sm">
                    <td className="p-3 border">{tip.title}</td>
                    <td className="p-3 border">{tip.category}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          tip.difficulty === 'Easy'
                            ? 'bg-green-500'
                            : tip.difficulty === 'Medium'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                      >
                        {tip.difficulty}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <img
                        src={tip.image || '/placeholder.jpg'}
                        alt={tip.title}
                        onError={(e) =>
                          (e.currentTarget.src = '/placeholder.jpg')
                        }
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 border">
                      <Link
                        to={`/tips/${tip._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        <Eye />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No tips found for this difficulty level.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
