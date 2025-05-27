'use client'
import PdfView from '@/app/components/PdfView'

export default function PdfViewClient({ url }: { url: string }) {
  return (
    <div className='col-span-5 lg:col-span-3 bg-gray-100 border-r-2 border-amber-800 overflow-auto lg:-order-1'>
      <PdfView url={url} />
    </div>
  );
}
