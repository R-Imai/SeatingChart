import React from 'react';

type Props ={
  onClickSearch: (searchText:string) => void;
}


const SearchForm: React.FC<Props> = (props) => {

  const [searchText, setSearchText] = React.useState('');

  return (
    <div className='header'>
      <div />
      <form className='seach-form'>
        <input value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
        <button className='info' type='submit' onClick={(e) => {e.preventDefault(); props.onClickSearch(searchText)}}>検索</button>
        <button className='danger' type='button' onClick={(e) => {setSearchText(''); props.onClickSearch('')}}>クリア</button>
      </form>
    </div>
  );
}

export default SearchForm
