import Banner from '@/components/Banner';
import FeaturedGardeners from '@/pages/Home/FeaturedGardeners';
import TrendingTips from '@/pages/Home/TrendingTips';
import SuccessStories from './SuccessStories';
import GardeningEvents from './UpcomingEvents';

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4">
        <TrendingTips />
        <GardeningEvents />
        <FeaturedGardeners />
        <SuccessStories />
      </div>
    </>
  );
}
