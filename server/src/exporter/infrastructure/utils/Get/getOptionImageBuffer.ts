import axios from 'axios';
import { ContentDTO } from 'src/exporter/application/dtos/exporter.dto';

export async function getOptionImageBuffer(
  options: ContentDTO[],
): Promise<Record<string, Buffer>> {
  const BACKEND_URL = process.env.BACKEND_URL;

  const uniqueUrls = new Set<string>();

  options.forEach((opt) => {
    const imgVars = opt.variables.image;
    if (!imgVars) return;

    Object.values(imgVars).forEach((url) => {
      if (url) uniqueUrls.add(url);
    });
  });

  const imageCache: Record<string, Buffer> = {};

  const urlArray = Array.from(uniqueUrls);

  if (BACKEND_URL) {
    await Promise.all(
      urlArray.map(async (url) => {
        try {
          const response = await axios.get(`${BACKEND_URL}${url}`, {
            responseType: 'arraybuffer',
            timeout: 10000,
          });
          imageCache[url] = Buffer.from(response.data);
        } catch (error) {
          console.error(`Không thể tải ảnh từ URL: ${url}`, error.message);
        }
      }),
    );
  }

  return imageCache;
}
