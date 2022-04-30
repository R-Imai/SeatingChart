import React from 'react';

import SeatIcon from '../Components/SeatIcon';

type Props = {
  seatsInfo: SeatInfo[];
  seatImg: string;
  searchText?: string;
  onClickSeat: (seatInfo: SeatInfo) => void;
  onClickMap?: (x:number, y:number) => void;
}

const isBlink = (seatInfo: SeatInfo, searchText?:string) => {
  if (!seatInfo.userCd || !seatInfo.name || !seatInfo.furigana ||typeof searchText === 'undefined' ||searchText === '') {
    return;
  }
  return seatInfo.userCd.indexOf(searchText) !== -1 || seatInfo.name.indexOf(searchText) !== -1 || seatInfo.furigana.indexOf(searchText) !== -1;
}

const Seats: React.FC<Props> = (props) => {

  const clickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    if (!props.onClickMap) {
      return;
    }
    props.onClickMap(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  return (
    <div className='parent' onClick={clickEvent}>
      <img className='background-img' src={props.seatImg} alt="座席表"/>
      <div className='seat-info'>
        {props.seatsInfo.map((info) => {
          return (
            <SeatIcon {...info} notice={isBlink(info, props.searchText)} onClickSeat={props.onClickSeat} key={info.id}/>
          )
        })}
      </div>
    </div>
  );
}

export default Seats
