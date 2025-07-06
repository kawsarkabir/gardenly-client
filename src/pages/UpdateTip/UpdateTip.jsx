import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

export default function UpdateTip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    plantType: '',
    difficulty: 'Easy',
    description: '',
    image: '',
    category: 'Plant Care',
    availability: 'Public',
  });

  useEffect(() => {
    fetch(`https://gardenly-server.vercel.app/tips/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => toast.error('Failed to load tip'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTip = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`https://gardenly-server.vercel.app/tips/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTip),
      });

      if (!res.ok) throw new Error('Update failed');
      toast.success('Tip updated successfully!');
      navigate('/my-tips');
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#52b788] mb-2 dark:text-foreground">
          Edit Your Garden Tip
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          Help fellow gardeners by sharing your unique gardening experiences,
          tips, and tricks!
        </p>
      </div>
      <div className="max-w-xl mx-auto my-8 p-6 shadow rounded">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="plantType">Plant Type / Topic</Label>
              <Input
                name="plantType"
                value={formData.plantType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option>Composting</option>
                <option>Plant Care</option>
                <option>Vertical Gardening</option>
                <option>Balcony Gardens</option>
                <option>Hydroponics</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="image">Image URL</Label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="availability">Availability</Label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option>Public</option>
                <option>Hidden</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="space-y-1">
            <Label>User Info</Label>
            <p className="text-sm text-gray-600 mb-2">
              👤 {user?.displayName || 'Unknown'} ({user?.email})
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update Tip'}
          </Button>
        </form>
      </div>
    </section>
  );
}
