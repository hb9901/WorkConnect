'use client';

import { useSearch } from '../../_hooks/useSearch';

const SearchInput = () => {
  const { searchTerm, handleSearch } = useSearch();

  return (
    <div className="mx-4">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded px-3 mb-2 w-full bg-grey50 h-[45px]"
      />
    </div>
  );
};

export default SearchInput;
