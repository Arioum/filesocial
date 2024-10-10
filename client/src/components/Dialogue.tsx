import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DialogueButton {
  children: string;
  desc: string;
  title: string;
  handleCancel?: () => void;
  handleContinue: () => void;
}

const Dialogue = ({
  children,
  title,
  desc,
  handleCancel,
  handleContinue,
}: DialogueButton) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='lg' className='h-14 text-[1rem]'>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='dark:bg-[#09090b] dark:text-[#fff]'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className='dark:bg-[#09090b]'
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialogue;
