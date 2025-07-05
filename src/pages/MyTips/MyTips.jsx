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
      .catch(() => toast.error('Error loading your tips'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    if (!tipToDelete) return;

    const res = await fetch(`http://localhost:5000/tips/${tipToDelete}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (result.deletedCount > 0) {
      toast.success('Tip deleted!');
      loadData();
    }
    setTipToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">📂 My Tips</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="w-full border text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myTips.map((tip) => (
              <tr key={tip._id} className="border-t">
                <td className="p-2">{tip.title}</td>
                <td className="p-2">{tip.availability}</td>
                <td className="p-2 flex gap-3">
                  <Link
                    to={`/update-tip/${tip._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Update
                  </Link>

                  {/* Delete Button With Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setTipToDelete(tip._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will permanently
                          delete this tip.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          asChild
                          onClick={() => setTipToDelete(null)}
                        >
                          Cancel
                        </DialogClose>
                        <Button onClick={confirmDelete} variant={'destructive'}>
                          Yes, Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
