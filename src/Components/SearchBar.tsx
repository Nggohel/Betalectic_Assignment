interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search NPM packages"
      className="border p-2 w-full"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
