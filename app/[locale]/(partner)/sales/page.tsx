// export default function Sales() {
//   return (
//     <>
//       <h1>Sales not working yet</h1>
//     </>
//   );
// }
'use client';

import { uploadImage } from '@/supabase/storage/client';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { convertBlobUrlToFile } from '@/app/lib/utils';
import Image from 'next/image';

function HomePage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      let urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: 'Services-Images',
        });

        if (error) {
          console.log(error);
          return;
        }

        urls.push(imageUrl);
      }

      console.log(urls);
      setImageUrls([]);
    });
  };

  return (
    <div className="flex  items-center justify-center gap-8 bg-slate-500">
      <input
        type="file"
        hidden
        multiple
        ref={imageInputRef}
        onChange={handleImageChange}
        disabled={isPending}
      />

      <button
        className="w-40 rounded-lg bg-slate-600 py-2"
        onClick={() => imageInputRef.current?.click()}
        disabled={isPending}
      >
        Select Images
      </button>

      <div className="flex gap-4">
        {imageUrls.map((url, index) => (
          <Image
            key={url}
            src={url}
            width={300}
            height={300}
            alt={`img-${index}`}
          />
        ))}
      </div>

      <button
        onClick={handleClickUploadImagesButton}
        className="w-40 rounded-lg bg-slate-600 py-2"
        disabled={isPending}
      >
        {isPending ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
}

export default HomePage;
