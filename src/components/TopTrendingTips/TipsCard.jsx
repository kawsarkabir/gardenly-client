import { Card, CardContent } from '@/components/ui/card';

export default function TipsCard({ tip }) {
  return (
    <Card className="shadow hover:shadow-md transition-all duration-300">
      <img
        src={tip.image}
        alt={tip.title}
        className="w-full h-40 object-cover rounded-t"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{tip.title}</h3>
        <p className="text-sm text-gray-600">
          {tip.description.slice(0, 70)}...
        </p>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>{tip.category}</span>
          <span>💚 {tip.totalLiked}</span>
        </div>
      </CardContent>
    </Card>
  );
}
