import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/events');
      return res.data;
    },
  });
};
