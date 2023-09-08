// get /api/video/id
import video from "@/database/video";

export default defineEventHandler((event) => {
  const { id } = event.context.params || {};

  return video.find((v) => v.bvid === id);
});
