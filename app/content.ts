export type Project = {
  title: string;
  category: string;
  video: string;
  previewVideo: string;
  poster: string;
  alt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  { title: "Glasses", category: "AI Product Film", video: "/showcases/glasses.mp4", previewVideo: "/showcases/glasses-preview.mp4", poster: "/showcases/glasses-poster.png", alt: "Animated glasses product advertisement", featured: true },
  { title: "Nike / Shoes", category: "Motion Advertisement", video: "/showcases/shoes.mp4", previewVideo: "/showcases/shoes-preview.mp4", poster: "/showcases/shoes-poster.png", alt: "Nike shoes product advertisement" },
  { title: "Rolex / Watch", category: "Instagram Campaign", video: "/showcases/rolex.mp4", previewVideo: "/showcases/rolex-preview.mp4", poster: "/showcases/watch-poster.png", alt: "Rolex watch product advertisement" },
  { title: "Kaor / Coffee", category: "Launch Campaign", video: "/showcases/coffee.mp4", previewVideo: "/showcases/coffee-preview.mp4", poster: "/showcases/kaor-poster.png", alt: "Kaor coffee product advertisement" },
  { title: "Marshall / Headphone", category: "Ecommerce Creative", video: "/showcases/headphones.mov", previewVideo: "/showcases/headphones-preview.mp4", poster: "/showcases/marshall-poster.png", alt: "Marshall headphone product advertisement" },
];

export const pricingPlans = [
  { name: "Essential", volume: "10 videos / month", description: "For brands that need a consistent monthly presence.", price: "$390 / month", perVideo: "$39 / video", discount: "Standard rate", cta: "Start Essential", features: ["10 vertical product ads", "Up to 15 seconds each", "1 product or campaign focus", "1 revision round per video", "Instagram-ready 9:16 delivery", "Basic motion typography", "Standard delivery schedule"] },
  { name: "Growth", volume: "20 videos / month", description: "For ecommerce brands actively testing and scaling creative.", price: "$585 / month", perVideo: "$29.25 / video", discount: "Save 25%", cta: "Choose Growth", featured: true, features: ["20 vertical product ads", "Up to 15 seconds each", "Multiple hooks and variations", "2 revision rounds per video", "Premium motion design", "Creative direction included", "Priority production", "Campaign-ready exports"] },
  { name: "Scale", volume: "+40 videos / month", description: "For brands that need a high volume of fresh campaign creatives.", price: "From $858 / month", perVideo: "$21.45 / video", discount: "Save 45%", cta: "Scale With Vanta", features: ["40+ vertical product ads", "Multiple products or campaigns", "Hook and concept variations", "2 revision rounds per video", "Advanced motion and editing", "Priority creative support", "Organized monthly production pipeline", "Paid social and organic formats"] },
];
