import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TipDetails() {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tips/${id}`)
      .then((res) => res.json())
      .then((data) => setTip(data))
      .catch(() => toast.error('Failed to load tip'));
  }, [id]);

  const handleLike = async () => {
    await fetch(`http://localhost:5000/tips/${id}/like`, {
      method: 'PATCH',
    });
    setTip((prev) => ({ ...prev, totalLiked: prev.totalLiked + 1 }));
  };

  if (!tip) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto my-6 p-6 bg-white shadow rounded">
      <img src={tip.image} alt={tip.title} className="w-full rounded mb-4" />
      <h1 className="text-2xl font-bold">{tip.title}</h1>
      <p className="mt-2 text-gray-700">{tip.description}</p>
      <p className="mt-2">Category: {tip.category}</p>
      <p>Difficulty: {tip.difficulty}</p>
      <p className="mt-2 text-green-600 font-semibold">
        👍 Likes: {tip.totalLiked}
      </p>
      <button
        onClick={handleLike}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Like
      </button>
    </div>
  );
}
