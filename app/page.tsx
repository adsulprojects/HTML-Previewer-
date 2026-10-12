import ClientPreviewerWrapper from '@/components/ClientPreviewerWrapper';
import { StructuredData } from '@/components/StructuredData';

export default function Page() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="flex flex-col h-[100dvh] w-full overflow-hidden relative">
        {/* Section 1: Code Section (HTML, CSS & JS Editor and Live Preview) */}
        <section
          id="code-section"
          className="w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden"
          aria-label="HTML Code Editor and Live Preview Workspace"
        >
          <ClientPreviewerWrapper />
        </section>
      </main>
    </>
  );
}

