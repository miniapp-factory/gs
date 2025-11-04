import { description, title, url } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import { Quiz } from "@/components/Quiz";
import { Share } from "@/components/share";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <Quiz />
    </main>
  );
}
