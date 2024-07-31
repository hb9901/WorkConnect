'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';

const ERROR_IMAGE = brokenFileImage.src;

const MediaListPage = () => {
  const { id } = useParams();
  const [mediaList, setMediaList] = useState<any[]>([]);

  useEffect(() => {
    const getMediaList = async () => {
      const res = await supabase
        .from('chat')
        .select('*')
        .eq('channel_id', id)
        .in('type', ['video', 'image'])
        .order('created_at', { ascending: false });
      setMediaList(res.data || []);
    };

    getMediaList();
  }, []);

  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-3">
      {mediaList.map((media) => (
        <li key={media.id}>
          {media.type === 'video' ? (
            <ChatVideo fileUrl={media.content} />
          ) : (
            <Image
              src={media.content}
              width={100}
              height={100}
              alt=""
              unoptimized
              className="w-full h-full object-cover"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const ChatVideo = ({ fileUrl }: { fileUrl: string }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {hasError ? (
        <Image src={ERROR_IMAGE} width={100} height={100} unoptimized alt="" className="w-full h-full object-cover" />
      ) : (
        <video
          src={fileUrl}
          className="rounded-lg"
          width={200}
          controls
          preload="metadata"
          playsInline
          onError={() => setHasError(true)}
        />
      )}
    </>
  );
};

export default MediaListPage;
