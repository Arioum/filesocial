import { Key } from 'react';
import { useRecoilValue } from 'recoil';
import { FormattedFile, getFormattedTableView } from '@/recoil/file';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function FileTable() {
  const files = useRecoilValue(getFormattedTableView);

  return (
    <Table className='my-[2em]'>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className='text-right px-0'>Uploaded On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file: FormattedFile, index: Key | null | undefined) => (
          <TableRow key={index} className=''>
            <TableCell>{file.fileName}</TableCell>
            <TableCell>{file.fileSize}</TableCell>
            <TableCell className='text-right px-0'>{file.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className='mt-[2rem] bg-[#eee] rounded-[4px] p-[1em] text-[.8rem] '>
        Files will be automatically deleted after the sharing period ends or if
        sharing is canceled.
      </TableCaption>
    </Table>
  );
}
