import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { OctagonX } from 'lucide-react';

interface AlertCardProps {
  title: string;
  description?: string;
}

export function AlertCard({ title, description }: AlertCardProps) {
  return (
    <Alert className='bg-red-200 border-none'>
      <OctagonX />
      <AlertTitle className='m-0 text-[.85rem]'>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
