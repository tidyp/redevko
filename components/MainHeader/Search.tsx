import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert('검색어를 입력하세요');
      setSearchQuery('');
      return;
    }
    setSearchQuery('');
    navigate(`/search/${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type='text'
        placeholder='검색어를 입력하세요.'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type='submit'>
        <FaSearch />
      </button>
    </form>
  );
}
