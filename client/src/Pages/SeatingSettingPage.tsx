import React from 'react';
import { RouteComponentProps } from 'react-router';

import {seatImg as seatImgOriginal} from '../tmp/seatImg';
import Seats from '../Components/Seats';
import EditPageHeader from '../Components/EditPageHeader';
import SeatEditDialog from '../Components/SeatEditDialog';

const seatsInfoOriginal:SeatInfo[] = [
  {
    id: 'a',
    x: 310,
    y: 271,
  },
  {
    id: 'b',
    x: 309,
    y: 357,
  },
  {
    id: 'c',
    x: 307,
    y: 449,
  },
  {
    id: 'd',
    x: 402,
    y: 445,
  },
  {
    id: 'e',
    x: 398,
    y: 358,
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

const SeatingSettingPage: React.FC<RouteComponentProps<{chartCd?: string}>> = (props) => {

  const [seatImg, setSeatImg] = React.useState('');
  const [seatsInfo, setSeatsInfo] = React.useState<SeatInfo[]>([]);
  const [selectSeat, setSelectSeat] = React.useState<SeatInfo|null>(null);
  const [seatCounter, setSeatCounter] = React.useState(0);

  React.useEffect(() => {
    console.log("start");
    setSeatImg(seatImgOriginal);
    setSeatsInfo(seatsInfoOriginal);
  }, []);

  const onClickSeat = (seatInfo: SeatInfo) => {
    setSelectSeat(seatInfo);
  }

  const onClickMap = (x: number, y:number) => {
    const newSeat:SeatInfo = {
      id: `____new____${seatCounter}`,
      x: x,
      y: y,
      status: 'add',
    };
    setSeatsInfo([...seatsInfo, newSeat]);
    setSeatCounter(seatCounter + 1);
  }

  const onDelete = (seatInfo: SeatInfo) => {
    if (seatInfo.status === 'add') {
      setSeatsInfo(seatsInfo.filter(v => v.id !== seatInfo.id));
    } else {
      const targetSeat:SeatInfo = {...seatInfo, ...{status: 'delete'}, }
      setSeatsInfo(seatsInfo.map(v => v.id === seatInfo.id ? targetSeat : v));
    }
    setSelectSeat(null);
  }

  const onUpdate = (seatInfo: SeatInfo, x:number, y:number) => {
    const targetSeat:SeatInfo = {...seatInfo, ...{
      status: seatInfo.status !== 'add'? 'update': 'add',
      x: x,
      y: y
    }, }
    setSeatsInfo(seatsInfo.map(v => v.id === seatInfo.id ? targetSeat : v));
    setSelectSeat(null);
  }

  return (
    <div>
      <EditPageHeader seatInfo={seatsInfo} onClickRegister={() => {}}/>
      <Seats seatsInfo={seatsInfo} seatImg={seatImg} onClickSeat={onClickSeat} onClickMap={onClickMap}/>
      {selectSeat !== null ? <SeatEditDialog seatInfo={selectSeat} onClose={() => {setSelectSeat(null)}} onUpdate={(x, y) => {onUpdate(selectSeat, x, y)}} onDelete={() => {onDelete(selectSeat)}}/> : ''}
    </div>
  );
}

export default SeatingSettingPage
