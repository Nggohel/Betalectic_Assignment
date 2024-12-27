import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar"; // Import the new SearchBar component

interface NpmPackage {
  name: string;
  description: string;
  npmLink: string; // Added to display a link to the npm package
}

interface SearchInputProps {
  onPackageSelect: (pkg: NpmPackage) => void;
}

export default function SearchInput({ onPackageSelect }: SearchInputProps) {
  const [query, setQuery] = useState<string>(""); // User's search query
  const [results, setResults] = useState<NpmPackage[]>([]); // Search results
  const [selected, setSelected] = useState<string | null>(null); // Selected package

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]); // Clear results if query is empty
        return;
      }

      try {
        const response = await axios.get(
          `https://api.npms.io/v2/search?q=${query}`
        );

        // Map the API response to our NpmPackage structure
        const packages = response.data.results.map((result: any) => ({
          name: result.package.name,
          description: result.package.description || "No description available.",
          npmLink: result.package.links.npm,
        }));

        setResults(packages); // Update the results state
      } catch (error) {
        console.error("Error fetching NPM packages:", error);
      }
    };

    fetchResults();
  }, [query]);

  const handleSelection = (value: string) => {
    setSelected(value); // Update the selected package
    const selectedPkg = results.find((pkg) => pkg.name === value);
    if (selectedPkg) {
      onPackageSelect(selectedPkg); // Notify parent component
    }
  };

  return (
    <div className="mb-4">
      <SearchBar query={query} setQuery={setQuery} />
      <ul
        className="mt-4 overflow-y-auto hide-scrollbar scroll-on-hover"
        style={{ maxHeight: "200px" }} // Limit the height of the list
      >
        {results.map((pkg) => (
          <li key={pkg.name} className="flex items-center mb-2 p-2">
            <input
              type="radio"
              id={pkg.name}
              name="package"
              value={pkg.name}
              checked={selected === pkg.name}
              onChange={(e) => handleSelection(e.target.value)}
            />
            <label htmlFor={pkg.name} className="ml-2">
              <span className="font-bold">{pkg.name}</span> - {pkg.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
