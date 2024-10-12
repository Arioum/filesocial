import { useRecoilValue } from 'recoil';
import { getFormattedShareHistory } from '@/recoil/share';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function HistoryTable() {
  const shares = useRecoilValue(getFormattedShareHistory);

  return (
    <Table className="my-[2em]">
      <TableHeader>
        <TableRow>
          <TableHead>Share Id</TableHead>
          <TableHead>Share Code</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Files Uploaded</TableHead>
          <TableHead className="text-right px-0">Uploaded On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shares.map((share, index: number) => (
          <TableRow key={index} className="">
            <TableCell>{share.id}</TableCell>
            <TableCell>{share.sharableCode}</TableCell>
            <TableCell>{share.status}</TableCell>
            <TableCell>{share.fileCount}</TableCell>
            <TableCell className="text-right px-0">{share.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="mt-[2rem] bg-[#eee] rounded-[4px] p-[1em] text-[.8rem] ">Showing the most recent 10 shares.</TableCaption>
    </Table>
  );
}
