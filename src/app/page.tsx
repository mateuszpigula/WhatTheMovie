import { MessageFiltersProvider } from "@/contexts/MessageFilters/MessageFiltersProvider";
import Chat from "@/modules/Chat/Chat";

export default function Home() {
  return (
    <main className="max-w-[1024px] mx-auto flex flex-col bg-zinc-300 min-h-screen">
      <MessageFiltersProvider>
        <Chat />
      </MessageFiltersProvider>
    </main>
  );
}
