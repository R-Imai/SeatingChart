import React from 'react';

type Props ={
  chartList?: ChartInfo[];
  onClickSearch: (searchText: string) => void;
  onClickJumpPage: (chartCd: string) => void;
}


const SearchForm: React.FC<Props> = (props) => {

  const [searchText, setSearchText] = React.useState('');
  const [targetChartCd, setTargetChartCd] = React.useState('');

  return (
    <div className='header'>
      <div className='select-chart'>
        <select value={targetChartCd} onChange={(e) => {setTargetChartCd(e.target.value)}}>
          <option value=''>-- 座席表を選択 --</option>
          {props.chartList?.map((chart) => {
            return (<option key={chart.chartCd} value={chart.chartCd}>{chart.name}</option>)
          })}
        </select>
        <button className='info' onClick={(e) => {e.preventDefault(); props.onClickJumpPage(targetChartCd)}} disabled={targetChartCd === ''}>移動</button>
      </div>
      <form className='seach-form'>
        <input value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
        <button className='info' type='submit' onClick={(e) => {e.preventDefault(); props.onClickSearch(searchText)}}>検索</button>
        <button className='danger' type='button' onClick={(e) => {setSearchText(''); props.onClickSearch('')}}>クリア</button>
      </form>
    </div>
  );
}

export default SearchForm
