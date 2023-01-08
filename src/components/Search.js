import React from 'react';

const Search = ({ searchTask, setSearchTask }) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const search = form.search.value;

    if (search) {
      setSearchTask(search);
    }
    else {
      setSearchTask(false);
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="input-group">
            <input type="text" name='search' placeholder="Search…" className="input input-bordered" />
            <button type='submit' className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </form>
      {
        searchTask &&
        <div className='mt-2'><span className='text-primary'>Search Result for: </span>{searchTask}</div>
      }
    </>
  );
};

export default Search;