import React from 'react';
import { RouteComponentProps } from 'react-router';

import {seatImg as seatImgOriginal} from '../tmp/seatImg';
import Seats from '../Components/Seats';
import SearchForm from '../Components/SearchForm';
import SeatInfoDialog from '../Components/SeatInfoDialog';

const seatsInfoOriginal:SeatInfo[] = [
  {
    id: 'a',
    x: 310,
    y: 271,
    userCd: 'test1',
    furigana: 'てすと いち',
    name: 'test1',
  },
  {
    id: 'b',
    x: 309,
    y: 357,
    name: 'test2',
    userCd: 'test2',
    furigana: 'てすと に',
  },
  {
    id: 'c',
    x: 307,
    y: 449,
    name: 'test3',
    userCd: 'test3',
    furigana: 'てすと さん',
  },
  {
    id: 'd',
    x: 402,
    y: 445,
    name: 'test4',
    userCd: 'test4',
    furigana: 'てすと よん',
  },
  {
    id: 'e',
    x: 398,
    y: 358,
    name: 'test5',
    userCd: 'test5',
    furigana: 'てすと ご',
  },
  {
    id: 'f',
    x: 400,
    y: 266
  },
  {
    id: 'g',
    x: 161,
    y: 146
  }
];

const SeatingChartPage: React.FC<RouteComponentProps<{chartCd?: string}>> = (props) => {

  const [seatImg, setSeatImg] = React.useState('');
  const [seatsInfo, setSeatsInfo] = React.useState<SeatInfo[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [selectSeat, setSelectSeat] = React.useState<SeatInfo|null>(null);

  React.useEffect(() => {
    console.log("start");
    setSeatImg(seatImgOriginal);
    setSeatsInfo(seatsInfoOriginal);
  }, []);

  const onClickSeat = (seatInfo: SeatInfo) => {
    setSelectSeat(seatInfo);
  }

  return (
    <div>
      <SearchForm onClickSearch={setSearchText}/>
      <Seats seatsInfo={seatsInfo} seatImg={seatImg} searchText={searchText} onClickSeat={onClickSeat}/>
      {selectSeat !== null ? <SeatInfoDialog seatInfo={selectSeat} onClose={() => {setSelectSeat(null)}} onRegister={() => {}}/> : ''}
    </div>
  );
}

export default SeatingChartPage
