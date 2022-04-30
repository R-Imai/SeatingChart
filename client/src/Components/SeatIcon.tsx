import React from 'react';

type Props = {
  notice?: boolean;
  onClickSeat: (seatInfo: SeatInfo) => void;
} & SeatInfo

const SeatIcon: React.FC<Props> = (props) => {

  const seatClassName = props.status === 'add'? 'seat-new': props.status === 'delete'? 'seat-delete' : props.status === 'update'? 'seat-update' : !props.userCd? 'seat-empty': ''

  return (
    <div
      className={`seat ${seatClassName} ${props.notice?'seat-notice':''}`}
      style={{top: props.y - 40/2, left: props.x - 50/2}}
      onClick={(e) => {e.stopPropagation(); props.onClickSeat(props)}}
    >
      {props.name}
    </div>
  );
}

export default SeatIcon
