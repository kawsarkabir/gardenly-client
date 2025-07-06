import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { toast } from 'sonner';
import shareTips from '../../../public/shareTips.json';

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
      const res = await fetch('https://gardenly-server.vercel.app/tips', {
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
    <div className="container mx-auto px-4">
      <div className="py-10">
        <div className="text-center py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#52b788] mb-2 dark:text-foreground">
            Share a Garden Tip
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Help fellow gardeners by sharing your unique gardening experiences,
            tips, and tricks!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pt-10">
          <div>
            <Lottie animationData={shareTips} />
          </div>
          <div className=" my-8 p-6 shadow rounded">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input
                    name="title"
                    placeholder="How I Grow Tomatoes Indoors"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label>Plant Type / Topic</Label>
                  <Input
                    name="plantType"
                    placeholder="Indoor Plant, Tomato"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label>Difficulty Level</Label>
                  <select
                    name="difficulty"
                    className="w-full border px-3 py-2 rounded text-[#71717B]"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>Category</Label>
                  <select
                    name="category"
                    className="w-full border px-3 py-2 rounded text-[#71717B]"
                  >
                    <option>Composting</option>
                    <option>Plant Care</option>
                    <option>Vertical Gardening</option>
                    <option>Balcony Gardening</option>
                    <option>Hydroponics</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>Image URL</Label>
                  <Input
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label>Availability</Label>
                  <select
                    name="availability"
                    className="w-full border px-3 py-2 rounded text-[#71717B]"
                  >
                    <option>Public</option>
                    <option>Hidden</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <textarea
                  name="description"
                  rows="4"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Write your gardening tip in detail..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2 my-2">
                <div className="space-y-1">
                  <Label>Your Email</Label>
                  <Input value={user.email} readOnly disabled />
                </div>

                <div className="space-y-1">
                  <Label>Your Name</Label>
                  <Input value={user.displayName} readOnly disabled />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sharing...' : 'Share Tip'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
