import AllProperties from "@/components/AllProperties";
import HomeLinks from "@/components/HomeLinks";
import SearchView from "@/components/SearchView";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4">
      <SearchView />
      <AllProperties />
      <HomeLinks />
    </main>
  );
}