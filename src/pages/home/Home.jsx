import Banner from '@/components/Banner';
import TrendingTips from '@/components/TrendingTips';
import GardeningEvents from '@/components/UpcomingEvents';
import FeaturedGardeners from '@/pages/Home/FeaturedGardeners';
import SuccessStories from './SuccessStories';

// import FeaturedGardeners from '@/components/FeaturedGardeners';
// import SuccessStories from '@/components/SuccessStories';
// import TopTrendingTips from '@/components/TopTrendingTips/TopTrendingTips';
// import UpcomingEvents from './UpcomingEvents';
// import BeginnersCorner from './BeginnersCorner';

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
      {/* <HowToStartGardening /> */}
      {/* <FeaturedGardeners />
      <TopTrendingTips />
      <SuccessStories />
      <UpcomingEvents /> */}
    </>
  );
}
