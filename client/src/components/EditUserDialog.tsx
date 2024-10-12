import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth, useUser } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface EditUserDialogProps {
  children: React.ReactNode;
}

export function EditUserDialog({ children }: EditUserDialogProps) {
  const user = useUser();
  const { token, updateUser } = useAuth();
  const [username, setUsername] = useState<string>(user?.userName || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/update-profile`,
        {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Username updated:', response.data.updatedUser);
      updateUser({ userName: username });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit py-2 h-fit leading-3">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={username} onChange={handleChange} maxLength={12} className="col-span-3" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}