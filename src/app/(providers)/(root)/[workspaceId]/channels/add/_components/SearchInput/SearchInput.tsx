'use client';

import { useSearch } from '../../_hooks/useSearch';

const SearchInput = () => {
  const { searchTerm, handleSearch } = useSearch();

  return (
    <div className="mx-4 py-3 bg-white sticky lg:py-4 top-[52px] lg:top-[84px]">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded px-3 w-full bg-grey50 h-[45px]"
      />
    </div>
  );
};

export default SearchInput;
