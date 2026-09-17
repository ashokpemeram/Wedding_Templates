import { WeddingExperience } from "@/components/WeddingExperience";
import { weddingData } from "@/data/wedding";

export default function Home() {
  return <WeddingExperience data={weddingData} />;
}
