import AllProperties from "@/components/AllProperties";
import HomeLinks from "@/components/HomeLinks";
import SearchView from "@/components/SearchView";

export async function fetchDjangoProperties() {
  try {
    const response = await fetch(`http://localhost:8000/api/properties/?page=2`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4">
      <SearchView />
      <AllProperties />
      <HomeLinks />
    </main>
  );
}