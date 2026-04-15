import { motion } from 'framer-motion';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

export default function VideoCard({ video, onOpen }) {
  const videoUrl = video.youtubeUrl || video.url;
  const videoId = extractYouTubeId(videoUrl);
  const isYouTube = Boolean(videoId);
  const thumbnail = isYouTube
    ? getYouTubeThumbnail(videoUrl)
    : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=960&q=80';

  return (
    <motion.button
      type="button"
      onClick={() => onOpen({ ...video, url: videoUrl })}
      className="group relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/88 text-ink shadow-soft">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
            <path d="M8 6.5v11l9-5.5-9-5.5Z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
        <p className="text-xs uppercase tracking-[0.22em] text-white/80">
          {isYouTube ? 'YouTube Video' : 'Uploaded Video'}
        </p>
        <h3 className="mt-2 font-heading text-2xl">{video.title || `Testimonial ${videoId || 'Video'}`}</h3>
        {video.description ? (
          <p className="mt-2 text-sm leading-7 text-white/80">{video.description}</p>
        ) : null}
      </div>
    </motion.button>
  );
}
