import { useLoaderData } from '@remix-run/react';
import { loader$ } from 'app/routes/api.trpc.$/root';
import { Suspense, lazy, useEffect, useState } from 'react';
import { VideoProvider } from '~/components/video-player/player-provider';

const ShakaPlayer = lazy(() => import('~/components/video-player/shaka-player'));

// export const loader = loader$((caller) => {
//   return caller.setanta.getMatches();
// });

export default function SetantaPage() {
  // const data = useLoaderData<typeof loader>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const props = {
    id: 1,
    title: 'title',
    tournament: 'tournament',
    status: 'status',
    match_id: 'match_id',
    poster: 'poster',
    cover: 'cover',
    stream: 'https://cdn-tbs.adjara.com/test_with_drm4/index',
    without_auth: 'without_auth',
    start_at: '2023-09-27 19:00:00',
    has_dvr: false,
  };

  return (
    <div>
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <VideoProvider>
            <ShakaPlayer {...props} />
          </VideoProvider>
        </Suspense>
      )}
    </div>
  );
}
