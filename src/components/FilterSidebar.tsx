import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useStore } from "@/context/StoreContext";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
];

const FilterSidebar = () => {
  const { selectedCategories, toggleCategory, priceRange, setPriceRange } =
    useStore();

  return (
    <aside className="w-64 bg-white p-6 border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider
            value={[priceRange]}
            onValueChange={([value]) => setPriceRange(value)}
            max={1000}
            step={1}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
