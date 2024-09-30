import { ModeToggle } from "@/components/shared/ModeToggle";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold">LifeSpan Visualizer</CardTitle>
            <CardDescription>Discover and make the most of your life journey</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle/>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
