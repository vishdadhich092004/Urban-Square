import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFormProps {
  onSearch: (query: string, propertyType: string, status: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, propertyType, status);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-background/5 backdrop-blur-md p-6 rounded-lg border border-white/10 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Enter city, address, or ZIP code"
            className="w-full h-10 bg-background/10 text-white placeholder:text-white/70 rounded-md border-0 focus:ring-2 focus:ring-ring focus:bg-background/20 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full h-10 bg-background/10 text-white border-0">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full h-10 bg-background/10 text-white border-0">
              <SelectValue placeholder="For Sale or Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="for-rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {advancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Select>
              <SelectTrigger className="w-full h-10 bg-background/10 text-white border-0">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full h-10 bg-background/10 text-white border-0">
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full h-10 bg-background/10 text-white border-0">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100000">Under $100,000</SelectItem>
                <SelectItem value="200000">Under $200,000</SelectItem>
                <SelectItem value="300000">Under $300,000</SelectItem>
                <SelectItem value="500000">Under $500,000</SelectItem>
                <SelectItem value="750000">Under $750,000</SelectItem>
                <SelectItem value="1000000">Under $1,000,000</SelectItem>
                <SelectItem value="any">Any Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setAdvancedSearch(!advancedSearch)}
          className="text-sm text-white/70 hover:text-white"
        >
          {advancedSearch ? "Simple Search" : "Advanced Search Options"}
        </Button>

        <Button type="submit" className="w-full sm:w-auto">
          Search Properties
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
