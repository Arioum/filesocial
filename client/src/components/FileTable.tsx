import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    shareId: 'fs4bfbeb7',
    fileName: 'image.png',
    fileSize: '2.5 MB',
    uploadTimestamp: 'June 30, 2024',
  },
  {
    shareId: 'fs4bfbeb7',
    fileName: 'image.png',
    fileSize: '234 KB',
    uploadTimestamp: 'June 30, 2024',
  },
  {
    shareId: 'fs4bfbeb7',
    fileName: 'image.png',
    fileSize: '263 KB',
    uploadTimestamp: 'June 30, 2024',
  },
  {
    shareId: 'fs4bfbeb7',
    fileName: 'image.png',
    fileSize: '743 KB',
    uploadTimestamp: 'June 30, 2024',
  },
  {
    shareId: 'fs4bfbeb7',
    fileName: 'image.png',
    fileSize: '1.2 MB',
    uploadTimestamp: 'June 30, 2024',
  },
];

export function FileTable() {
  return (
    <Table className='my-[2em]'>
      <TableCaption className='mt-[2rem] bg-[#eee] rounded-[4px] p-[1em] text-[.8rem] '>
        Files will be automatically deleted after the sharing period ends or if
        sharing is canceled.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px] px-0'>Share ID</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className='text-right px-0'>Uploaded On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className='font-medium px-0'>
              {invoice.shareId}
            </TableCell>
            <TableCell>{invoice.fileName}</TableCell>
            <TableCell>{invoice.fileSize}</TableCell>
            <TableCell className='text-right px-0'>
              {invoice.uploadTimestamp}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
