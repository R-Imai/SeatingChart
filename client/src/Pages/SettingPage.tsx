import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

import Indicator from '../Components/Indicator';
import ChartEditDialog from '../Components/ChartEditDialog';
import {getChartList, registerChart, updateChart, deleteChart, ChartParameter} from '../Actions/SeatingChart';

const SettingPage: React.FC<RouteComponentProps> = (props) => {

  const [isShowIndicator, setShowIndicator] = React.useState(false);
  const [chartList, setChartList] = React.useState<ChartInfo[]>();
  const [selectChart, setSelectChart] = React.useState<ChartInfo|null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const _getChartInfo = async () => {
    const response = await getChartList();
    setChartList(response.map((chart) => {
      return {
        chartCd: chart.chart_cd,
        name: chart.name,
        image: chart.image,
      }
    }))
  }

  React.useEffect(() => {
    window.document.title = '設定 | Seating Chart';
    (async () => {
      setShowIndicator(true);
      await _getChartInfo();
      setShowIndicator(false);
    })();
  }, []);

  const jumpPage = (chartCd:string) => {
    window.location.href = `/seats/${chartCd}/setting`
  }

  const onClickAddChartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectChart({
      chartCd: '',
      name: '',
      image: ''
    });
  }

  const onRegisterChart = async (chartInfo: ChartInfo) => {
    if (selectChart === null || chartInfo.chartCd === ''  || chartInfo.name === '' || chartInfo.image === '') {
      return;
    }
    const isNew = selectChart.chartCd === ''
    setErrorMessage('');

    const requestBody:ChartParameter = {
      chart_cd: chartInfo.chartCd,
      name: chartInfo.name,
      image: chartInfo.image
    }
    setShowIndicator(true);
    try {
      if (isNew) {
        await registerChart(requestBody);
      } else {
        await updateChart(requestBody);
      }
    } catch (e) {
      if(axios.isAxiosError(e)) {
        if (e.response?.status === 409) {
          setShowIndicator(false);
          setErrorMessage('既に使用されている座席表コードです。');
          return;
        }
      }
    }
    setSelectChart(null);
    await _getChartInfo();
    setShowIndicator(false);
  }

  const clickDelete = async () => {
    if (selectChart === null || selectChart.chartCd === '') {
      return;
    }

    const isDelete = window.confirm('座席表情報を削除します。よろしいですか? 関連する座席情報も削除されます。');
    if (!isDelete) {
      return;
    }
    setSelectChart(null);
    setShowIndicator(true);
    await deleteChart(selectChart.chartCd);
    await _getChartInfo();
    setShowIndicator(false);
  }

  return (
    <div className='indicator-parent'>
      <div className='header'>
        <button className='info' type='submit' onClick={onClickAddChartButton}>新規追加する</button>
      </div>
      <h1>座席表一覧</h1>
      <ul className='chart-list'>
        {chartList?.map((chartInfo) => {
          return (
            <li className='item' key={chartInfo.chartCd}>
              <div className='name' onClick={() => {setSelectChart(chartInfo)}}>
                {chartInfo.name}
              </div>
              <div className='image'>
                <img src={chartInfo.image} width='80' alt={chartInfo.name} />
              </div>
              <div className='button'>
                <button onClick={() => {jumpPage(chartInfo.chartCd)}}>
                  設定画面へ
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {selectChart !== null ? <ChartEditDialog chartInfo={selectChart} warningMssage={errorMessage} onRegister={onRegisterChart} onClose={() => {setSelectChart(null)}} onDelete={clickDelete}/> : ''}
      <Indicator show={isShowIndicator}/>
    </div>
  );
}

export default SettingPage
