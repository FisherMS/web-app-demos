import React from 'react';
import categoriesData from "../data/categories.json";

/**
 * CategoryFilter component summary:
 * Displays a horizontal scrollable list of project categories.
 * Allows users to filter projects by clicking on a category.
 */

interface Category {
    name: string;
    visible: boolean;
}

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
    const categories = (categoriesData as Category[]).filter((cat) => cat.visible);

    return (
        <div
            className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100/50 py-4 overflow-x-auto no-scrollbar"
        >
            <div className="flex px-4 space-x-3 min-w-max">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.name;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => onCategoryChange(cat.name)}
                            className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 transform active:scale-95 
              ${isActive ? "bg-black text-white shadow-lg shadow-black/10" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
              whitespace-nowrap tracking-wide`}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </div>
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default CategoryFilter;
