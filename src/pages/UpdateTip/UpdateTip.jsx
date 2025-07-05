import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

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
    fetch(`http://localhost:5000/tips/${id}`)
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
      const res = await fetch(`http://localhost:5000/tips/${id}`, {
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
    <div className="max-w-xl mx-auto my-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">✏️ Update Tip</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="plantType">Plant Type / Topic</Label>
          <Input
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            required
          />
        </div>

        <div>
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

        <div>
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

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
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

        <div>
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

        <div>
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
  );
}
