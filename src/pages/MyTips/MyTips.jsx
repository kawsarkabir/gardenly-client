import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function MyTips() {
  const { user } = useAuth();
  const [myTips, setMyTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipToDelete, setTipToDelete] = useState(null);

  const loadData = () => {
    fetch(`http://localhost:5000/tips-by-user?email=${user.email}`)
      .then((res) => res.json())
      .then(setMyTips)
      .catch(() => toast.error('Failed to load your tips'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    if (!tipToDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/tips/${tipToDelete}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        toast.success('Tip successfully deleted.');
        loadData();
      }
    } catch (err) {
      toast.error('Failed to delete tip.');
    } finally {
      setTipToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-[#52b788] mb-10">
        My Garden Tips
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : myTips.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t shared any tips yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow-sm">
          <table className="w-full text-sm md:text-base border">
            <thead className="bg-green-50 border-b">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTips.map((tip) => (
                <tr key={tip._id} className="border-t hover:bg-green-50">
                  <td className="p-3 font-medium">{tip.title}</td>
                  <td className="p-3">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3 capitalize">{tip.availability}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/update-tip/${tip._id}`}>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Update
                        </Button>
                      </Link>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setTipToDelete(tip._id)}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this tip? This
                              action is permanent.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => setTipToDelete(null)}
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={confirmDelete}
                            >
                              Yes, Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
