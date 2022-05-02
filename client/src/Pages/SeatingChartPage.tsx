import React from 'react';
import { RouteComponentProps } from 'react-router';

import Seats from '../Components/Seats';
import SearchForm from '../Components/SearchForm';
import SeatInfoDialog from '../Components/SeatInfoDialog';
import Indicator from '../Components/Indicator';

import {getChart, getUserSeats, registerUser, UserSeatParam} from '../Actions/SeatingChart';

const isNullable = (value?: string | null): value is null | undefined => {
  return typeof value === 'undefined' || value === null;
}

const SeatingChartPage: React.FC<RouteComponentProps<{chartCd: string}>> = (props) => {

  const [seatImg, setSeatImg] = React.useState('');
  const [seatsInfo, setSeatsInfo] = React.useState<SeatInfo[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [selectSeat, setSelectSeat] = React.useState<SeatInfo|null>(null);
  const [isShowIndicator, setShowIndicator] = React.useState(false);

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
    (async () => {
      setShowIndicator(true);
      const response = await Promise.all([
        getChart(chartCd),
        _getUserSeatsInfo()
      ])
      setSeatImg(response[0].image);
      setShowIndicator(false);
    })();
  }, []);

  const onClickSeat = (seatInfo: SeatInfo) => {
    setSelectSeat(seatInfo);
  }

  const onRegister = async (seatInfo: SeatInfo) => {
    setSelectSeat(null);
    console.log(seatInfo);
    if (isNullable(seatInfo.userCd) || isNullable(seatInfo.name) || isNullable(seatInfo.furigana)) {
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

  return (
    <div className='indicator-parent'>
      <SearchForm onClickSearch={setSearchText}/>
      <Seats seatsInfo={seatsInfo} seatImg={seatImg} searchText={searchText} onClickSeat={onClickSeat}/>
      {selectSeat !== null ? <SeatInfoDialog seatInfo={selectSeat} onClose={() => {setSelectSeat(null)}} onRegister={onRegister}/> : ''}
      <Indicator show={isShowIndicator}/>
    </div>
  );
}

export default SeatingChartPage
