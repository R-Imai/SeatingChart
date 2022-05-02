import React from 'react';
import { RouteComponentProps } from 'react-router';

import Seats from '../Components/Seats';
import EditPageHeader from '../Components/EditPageHeader';
import SeatEditDialog from '../Components/SeatEditDialog';
import Indicator from '../Components/Indicator';

import {getChart, getSeats, updateSeats, SeatParameter} from '../Actions/SeatingChart';
import { info } from 'console';
import SeatInfoDialog from '../Components/SeatInfoDialog';


const SeatingSettingPage: React.FC<RouteComponentProps<{chartCd: string}>> = (props) => {

  const [seatImg, setSeatImg] = React.useState('');
  const [seatsInfo, setSeatsInfo] = React.useState<SeatInfo[]>([]);
  const [selectSeat, setSelectSeat] = React.useState<SeatInfo|null>(null);
  const [seatCounter, setSeatCounter] = React.useState(0);
  const [isShowIndicator, setShowIndicator] = React.useState(false);
  
  const chartCd = props.match.params.chartCd;

  const _getSeatsInfo = async () => {
    const response = await getSeats(chartCd);
    setSeatsInfo(response.map(data => {
      return{
        id: data.seat_id,
        x: data.x,
        y: data.y,
      }
    }));  
  }

  React.useEffect(() => {
    (async () => {
      setShowIndicator(true);
      const response = await Promise.all([
        getChart(chartCd),
        _getSeatsInfo()
      ])
      setSeatImg(response[0].image);
      setShowIndicator(false);
    })();
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

  const onClickRegister = async () => {
    interface FilterdSeatInfo extends SeatInfo {
      status: SeatStatus;
    }
    const requestBody:SeatParameter[] = seatsInfo.filter((info): info is FilterdSeatInfo => {
      return typeof info.status !== 'undefined' && info.status !== null;
    }).map(info => {
      return {
        seat_id: info.id,
        x: info.x,
        y: info.y,
        status: info.status
      }
    })
    setShowIndicator(true);
    await updateSeats(chartCd, requestBody);
    await _getSeatsInfo();
    setShowIndicator(false);
  }

  return (
    <div className='indicator-parent'>
      <EditPageHeader seatInfo={seatsInfo} onClickRegister={onClickRegister}/>
      <Seats seatsInfo={seatsInfo} seatImg={seatImg} onClickSeat={onClickSeat} onClickMap={onClickMap}/>
      {selectSeat !== null ? <SeatEditDialog seatInfo={selectSeat} onClose={() => {setSelectSeat(null)}} onUpdate={(x, y) => {onUpdate(selectSeat, x, y)}} onDelete={() => {onDelete(selectSeat)}}/> : ''}
      <Indicator show={isShowIndicator}/>
    </div>
  );
}

export default SeatingSettingPage
