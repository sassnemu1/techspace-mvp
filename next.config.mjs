/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeCss: true,
  // Сжатие всех ответов (gzip/brotli) — Vercel делает это автоматически,
  // но явно включаем на случай self-hosted
    compress: true,

    async headers() {
        return [
        {
            // GLB/GLTF модели — кешируем на 1 год (immutable)
            // При изменении файла меняй имя: grand-v2.glb
            source: "/models/:file*.glb",
            headers: [
            {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
            },
            // Подсказываем браузеру тип — ускоряет парсинг
            {
                key: "Content-Type",
                value: "model/gltf-binary",
            },
            ],
        },
        {
            // Draco decoder файлы если хранишь локально
            source: "/draco/:file*",
            headers: [
            {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
            },
            ],
        },
        ];
    },
};

export default nextConfig