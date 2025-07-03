import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useActiveGardeners = () => {
  return useQuery({
    queryKey: ['activeGardeners'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://localhost:5000/api/gardeners/active',
      );
      return data;
    },
  });
};
