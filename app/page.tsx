import { SiteHeader } from "../components/site-header";
import { HeroArrow } from "../components/hero-arrow";
import { ArrowIcon, PlayIcon, SparkIcon } from "../components/icons";
import { projects } from "./content";
import { HomePage } from "../components/home-page";

export default function Home() {
  return <HomePage><SiteHeader /><HeroArrow /></HomePage>;
}