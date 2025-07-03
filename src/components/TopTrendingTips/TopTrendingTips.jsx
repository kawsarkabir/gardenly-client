import { useTrendingTips } from '@/hooks/useTrendingTips';
import TipsCard from './TipsCard';

export default function TopTrendingTips() {
  const { data: tips = [], isLoading, isError } = useTrendingTips();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load tips.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        🌱 Top Trending Gardening Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <TipsCard key={tip._id} tip={tip} />
        ))}
      </div>
    </section>
  );
}
