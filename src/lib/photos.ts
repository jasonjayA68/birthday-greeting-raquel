// Photos live in /public/images. Names are lowercase — keep them that way (Vercel is case-sensitive).
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  { src: "/images/raquel-1.jpg", alt: "Raquel laughing", width: 828, height: 828 },
  { src: "/images/raquel-2.jpg", alt: "Raquel by the sea", width: 828, height: 828 },
  { src: "/images/raquel-3.jpg", alt: "Raquel selfie", width: 828, height: 828 },
  { src: "/images/raquel-4.jpg", alt: "Raquel under the twinkle lights", width: 828, height: 828 },
  { src: "/images/raquel-5.jpg", alt: "Raquel out for a stroll", width: 828, height: 828 },
  { src: "/images/raquel-6.jpg", alt: "Raquel celebrating with cake", width: 900, height: 1200 },
];
