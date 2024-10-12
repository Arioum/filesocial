import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  footer: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, footer, value }) => {
  return (
    <Card className="w-[180px] h-[130px] text-center flex flex-col items-center justify-center gap-1">
      <CardHeader className="p-0">
        <CardTitle className="text-[12px] p-0 font-[600]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-[32px] font-secondary font-[800]">{value}</CardContent>
      <CardFooter className="text-[12px] p-0 font-[600]">{footer}</CardFooter>
    </Card>
  );
};

export default StatCard;
