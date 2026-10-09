import ClientPreviewerWrapper from '@/components/ClientPreviewerWrapper';
import { GuideSection } from '@/components/GuideSection';
import { StructuredData } from '@/components/StructuredData';

export default function Page() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="flex flex-col min-h-screen w-full relative">
        {/* Interactive Live Sandbox Playground */}
        <ClientPreviewerWrapper />

        {/* Server-Rendered Developer Guide, Documentation & FAQ */}
        <GuideSection />
      </main>
    </>
  );
}
