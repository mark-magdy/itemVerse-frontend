
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  placeholder = "Search for items...",
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-lg ${className}`}>
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 rounded-r-none border-r-0"
        />
      </div>
      <Button 
        type="submit"
        className="bg-marketplace-600 hover:bg-marketplace-700 rounded-l-none"
      >
        <Search className="h-5 w-5 mr-2" />
        <span>Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
