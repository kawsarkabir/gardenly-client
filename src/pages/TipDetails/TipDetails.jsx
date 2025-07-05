'use client';

import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Heart } from 'lucide-react';

export default function TipDetails() {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/tips/${id}`)
      .then((res) => res.json())
      .then((data) => setTip(data))
      .catch(() => toast.error('Failed to load tip'));
  }, [id]);

  const handleLike = async () => {
    if (liked) return;
    await fetch(`http://localhost:5000/tips/${id}/like`, {
      method: 'PATCH',
    });
    setTip((prev) => ({ ...prev, totalLiked: prev.totalLiked + 1 }));
    setLiked(true);
  };

  if (!tip) return <LoadingSpinner />;

  return (
    <div className=" container mx-auto my-10 px-4">
      <div className="bg-white  shadow rounded-lg overflow-hidden">
        <img
          src={tip.image || '/placeholder.jpg'}
          alt={tip.title}
          onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{tip.title}</h1>

          <div className="flex flex-wrap gap-3 text-sm mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Category: {tip.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-white ${
                tip.difficulty === 'Easy'
                  ? 'bg-green-500'
                  : tip.difficulty === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
            >
              Difficulty: {tip.difficulty}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{tip.description}</p>

          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-1 text-red-500 hover:text-red-600 transition ${
                liked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={liked ? 'You already liked this' : 'Like this tip'}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span className="text-sm font-medium">{tip.totalLiked}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
