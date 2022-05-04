import React from 'react';
import { RouteComponentProps } from 'react-router';

import Indicator from '../Components/Indicator';
import {getChartList} from '../Actions/SeatingChart';

const NotFoundPage: React.FC<RouteComponentProps> = (props) => {

  const [isShowIndicator, setShowIndicator] = React.useState(false);
  const [chartList, setChartList] = React.useState<ChartInfo[]>();
  const [targetChartCd, setTargetChartCd] = React.useState('');

  React.useEffect(() => {
    (async () => {
      setShowIndicator(true);
      const response = await getChartList();
      setChartList(response.map((chart) => {
        return {
          chartCd: chart.chart_cd,
          name: chart.name,
          image: chart.image,
        }
      }))
      setShowIndicator(false);
    })();
  }, []);

  const jumpPage = () => {
    window.location.href = `/seats/${targetChartCd}`
  }

  return (
    <div className='indicator-parent not-found-page'>
      <div className='title'>
        404 Not Found
        <div className='description'>
          ページが見つかりませんでした。
        </div>
      </div>
      <div className='text'>
        ページが見つかりませんでした。<br />
        URLが正しいかをご確認ください。<br />
        以下から各座席表に遷移できます。
      </div>
      <div className='select-chart'>
        <select value={targetChartCd} onChange={(e) => {setTargetChartCd(e.target.value)}}>
          <option value=''>-- 座席表を選択 --</option>
          {chartList?.map((chart) => {
            return (<option key={chart.chartCd} value={chart.chartCd}>{chart.name}</option>)
          })}
        </select>
        <button className='info' onClick={jumpPage} disabled={targetChartCd === ''}>移動</button>
      </div>
      <Indicator show={isShowIndicator}/>
    </div>
  );
}

export default NotFoundPage
