export type Project = {
  id: "glasses" | "shoes" | "watch" | "coffee" | "headphones";
  title: string;
  category: string;
  video: string;
  previewVideo: string;
  poster: string;
  alt: string;
  featured?: boolean;
};

const CDN = "https://assets.vantads.studio";

export const projects: Project[] = [
  { id: "glasses", title: "Glasses", category: "AI Product Film", video: `${CDN}/showcases/glasses.mp4`, previewVideo: `${CDN}/showcases/glasses-preview.mp4`, poster: `${CDN}/showcases/glasses-poster.png`, alt: "Animated glasses product advertisement", featured: true },
  { id: "shoes", title: "Nike / Shoes", category: "Motion Advertisement", video: `${CDN}/showcases/shoes.mp4`, previewVideo: `${CDN}/showcases/shoes-preview.mp4`, poster: `${CDN}/showcases/shoes-poster.png`, alt: "Nike shoes product advertisement" },
  { id: "watch", title: "Rolex / Watch", category: "Instagram Campaign", video: `${CDN}/showcases/rolex.mp4`, previewVideo: `${CDN}/showcases/rolex-preview.mp4`, poster: `${CDN}/showcases/watch-poster.png`, alt: "Rolex watch product advertisement" },
  { id: "coffee", title: "Kaor / Coffee", category: "Launch Campaign", video: `${CDN}/showcases/coffee.mp4`, previewVideo: `${CDN}/showcases/coffee-preview.mp4`, poster: `${CDN}/showcases/kaor-poster.png`, alt: "Kaor coffee product advertisement" },
  { id: "headphones", title: "Marshall / Headphone", category: "Ecommerce Creative", video: `${CDN}/showcases/headphones.mov`, previewVideo: `${CDN}/showcases/headphones-preview.mp4`, poster: `${CDN}/showcases/marshall-poster.png`, alt: "Marshall headphone product advertisement" },
];

export const pricingPlans = [
  {
    name: "Essential",
    volume: "8 videos / month",
    description: "The easiest entry into a monthly creative partnership.",
    price: "$460",
    cta: "Start Essential",
    features: ["8 videos per month", "12 product photos", "Creative direction", "Multiple concepts & hooks", "2 revision rounds"],
  },
  {
    name: "Growth",
    volume: "12 videos / month",
    description: "The best-value monthly partnership for brands testing and scaling creative.",
    price: "$620",
    cta: "Choose Growth",
    featured: true,
    features: ["12 videos per month", "20 product photos", "Creative direction", "Multiple concepts & hooks", "Premium motion & editing", "2 revision rounds"],
  },
  {
    name: "Scale",
    volume: "16+ videos / month",
    description: "For brands that need consistent high-volume creative — pricing starts at $790 and scales with production.",
    price: "$790+",
    cta: "Scale With Vantads",
    features: ["16+ videos per month", "36 product photos", "Higher creative volume", "Multiple concepts & hooks", "Premium motion & editing", "Priority production", "2 revision rounds"],
  },
];
