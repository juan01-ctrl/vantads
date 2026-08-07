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
  { name: "Essential", volume: "10 videos / month", description: "For brands that need a consistent monthly presence.", price: "$390 / month", perVideo: "$39 / video", discount: "Standard rate", cta: "Start Essential", features: ["10 vertical product ads", "Up to 15 seconds each", "1 product or campaign focus", "1 revision round per video", "Instagram-ready 9:16 delivery", "Basic motion typography", "Standard delivery schedule"] },
  { name: "Growth", volume: "20 videos / month", description: "For ecommerce brands actively testing and scaling creative.", price: "$585 / month", perVideo: "$29.25 / video", discount: "Save 25%", cta: "Choose Growth", featured: true, features: ["20 vertical product ads", "Up to 15 seconds each", "Multiple hooks and variations", "2 revision rounds per video", "Premium motion design", "Creative direction included", "Priority production", "Campaign-ready exports"] },
  { name: "Scale", volume: "+40 videos / month", description: "For brands that need a high volume of fresh campaign creatives.", price: "From $858 / month", perVideo: "$21.45 / video", discount: "Save 45%", cta: "Scale With Vanta", features: ["40+ vertical product ads", "Multiple products or campaigns", "Hook and concept variations", "2 revision rounds per video", "Advanced motion and editing", "Priority creative support", "Organized monthly production pipeline", "Paid social and organic formats"] },
];
