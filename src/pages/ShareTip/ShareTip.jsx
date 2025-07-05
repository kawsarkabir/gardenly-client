import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ShareTip() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const tipData = {
      title: form.title.value.trim(),
      plantType: form.plantType.value.trim(),
      difficulty: form.difficulty.value,
      description: form.description.value.trim(),
      image: form.image.value.trim(),
      category: form.category.value,
      availability: form.availability.value,
      email: user.email,
      name: user.displayName,
    };

    if (!tipData.title || !tipData.description || !tipData.image) {
      toast.error('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tipData),
      });
      const result = await res.json();
      if (result.insertedId) {
        toast.success('Tip shared successfully!');
        form.reset();
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">🌱 Share a Garden Tip</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            placeholder="How I Grow Tomatoes Indoors"
            required
          />
        </div>

        <div>
          <Label>Plant Type / Topic</Label>
          <Input name="plantType" placeholder="Indoor Plant, Tomato" required />
        </div>

        <div>
          <Label>Difficulty Level</Label>
          <select name="difficulty" className="w-full border px-3 py-2 rounded">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            rows="4"
            className="w-full border px-3 py-2 rounded"
            placeholder="Write your gardening tip in detail..."
            required
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            name="image"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div>
          <Label>Category</Label>
          <select name="category" className="w-full border px-3 py-2 rounded">
            <option>Composting</option>
            <option>Plant Care</option>
            <option>Vertical Gardening</option>
            <option>Balcony Gardening</option>
            <option>Hydroponics</option>
          </select>
        </div>

        <div>
          <Label>Availability</Label>
          <select
            name="availability"
            className="w-full border px-3 py-2 rounded"
          >
            <option>Public</option>
            <option>Hidden</option>
          </select>
        </div>

        <div>
          <Label>Your Email</Label>
          <Input value={user.email} readOnly disabled />
        </div>

        <div>
          <Label>Your Name</Label>
          <Input value={user.displayName} readOnly disabled />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sharing...' : 'Share Tip'}
        </Button>
      </form>
    </div>
  );
}
