import Banner from '@/components/Banner';
import TrendingTips from '@/components/TrendingTips';
import GardeningEvents from '@/components/UpcomingEvents';

// import FeaturedGardeners from '@/components/FeaturedGardeners';
// import SuccessStories from '@/components/SuccessStories';
// import TopTrendingTips from '@/components/TopTrendingTips/TopTrendingTips';
// import UpcomingEvents from './UpcomingEvents';
// import BeginnersCorner from './BeginnersCorner';

export default function Home() {
  return (
    <>
      <Banner />
      <TrendingTips />
      <GardeningEvents />
      {/* <FeaturedGardeners />
      <TopTrendingTips />
      <SuccessStories />
      <UpcomingEvents />
      <BeginnersCorner /> */}
    </>
  );
}
