import { useActiveGardeners } from '@/hooks/useActiveGardeners ';

export default function FeaturedGardeners() {
  const { data: gardeners = [], isLoading } = useActiveGardeners();

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🌿 Featured Gardeners
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener._id}
              className="bg-white rounded-lg shadow-md p-6 text-center space-y-4"
            >
              <img
                src={gardener.image}
                alt={gardener.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <h3 className="text-xl font-semibold">{gardener.name}</h3>
              <p className="text-sm text-gray-600">{gardener.experience}</p>
              <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
