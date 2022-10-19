import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';

import Seats from '../Components/Seats';
import SearchForm from '../Components/SearchForm';
import SeatInfoDialog from '../Components/SeatInfoDialog';
import Indicator from '../Components/Indicator';

import {getChart, getUserSeats, registerUser, deleteUser, getChartList, UserSeatParam} from '../Actions/SeatingChart';

const isNullable = (value?: string | null): value is null | undefined => {
  return typeof value === 'undefined' || value === null;
}

const SeatingChartPage: React.FC<RouteComponentProps<{chartCd: string}>> = (props) => {

  const [seatImg, setSeatImg] = React.useState('');
  const [seatsInfo, setSeatsInfo] = React.useState<SeatInfo[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [selectSeat, setSelectSeat] = React.useState<SeatInfo|null>(null);
  const [isShowIndicator, setShowIndicator] = React.useState(false);
  const [chartList, setChartList] = React.useState<ChartInfo[]>();
  const [chartName, setChartName] = React.useState('');

  const chartCd = props.match.params.chartCd;

  const _getUserSeatsInfo = async () => {
    const response = await getUserSeats(chartCd);
    setSeatsInfo(response.map(data => {
      return{
        id: data.seat_id,
        x: data.x,
        y: data.y,
        userCd: data.user_cd,
        name: data.name,
        furigana: data.furigana,
      }
    }));  
  }

  React.useEffect(() => {
    window.document.title = '座席表 | Seating Chart';
    (async () => {
      setShowIndicator(true);
      try  {
        const response = await Promise.all([
          getChart(chartCd),
          _getUserSeatsInfo(),
          getChartList()
        ])
        setSeatImg(response[0].image);
        setChartName(response[0].name);
        setChartList(response[2].map((chart) => {
          return {
            chartCd: chart.chart_cd,
            name: chart.name,
            image: chart.image,
          }
        }));
      } catch (e) {
        if(axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            // props.history.push('/error/notfound');
            window.location.href = '/error/notfound';
          }
        }
      }
      setShowIndicator(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickSeat = (seatInfo: SeatInfo) => {
    setSelectSeat(seatInfo);
  }

  const onRegister = async (seatInfo: SeatInfo) => {
    setSelectSeat(null);
    if (isNullable(seatInfo.userCd) || isNullable(seatInfo.name)) {
      return
    }
    const requestBody: UserSeatParam = {
      seat_id: seatInfo.id,
      user_cd: seatInfo.userCd,
      name: seatInfo.name,
      furigana: seatInfo.furigana,
    }
    setShowIndicator(true);
    await registerUser(chartCd, requestBody);
    await _getUserSeatsInfo();
    setShowIndicator(false);
  }

  const onDelete = async () => {
    if (selectSeat === null) {
      return;
    }
    const deleteTargetSeatId = selectSeat.id;
    const deleteTargetUserCd = selectSeat.userCd;
    if (typeof deleteTargetUserCd === 'undefined' || deleteTargetUserCd === null) {
      return;
    }
    setSelectSeat(null);
    setShowIndicator(true);
    await deleteUser(deleteTargetSeatId, deleteTargetUserCd);
    await _getUserSeatsInfo();
    setShowIndicator(false);
  }

  const jumpPage = (targetChartCd: string) => {
    window.location.href = `/seats/${targetChartCd}`
  }

  return (
    <div className='indicator-parent'>
      <SearchForm chartList={chartList} onClickJumpPage={jumpPage} onClickSearch={setSearchText}/>
      <h1>座席表({chartName})</h1>
      <Seats seatsInfo={seatsInfo} seatImg={seatImg} searchText={searchText} onClickSeat={onClickSeat}/>
      {selectSeat !== null ? <SeatInfoDialog seatInfo={selectSeat} onClose={() => {setSelectSeat(null)}} onRegister={onRegister} onDelete={onDelete}/> : ''}
      <Indicator show={isShowIndicator}/>
    </div>
  );
}

export default SeatingChartPage
