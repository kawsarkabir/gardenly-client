import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTrendingTips = () => {
  return useQuery({
    queryKey: ['trending-tips'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/tips/top');
      return res.data;
    },
  });
};
