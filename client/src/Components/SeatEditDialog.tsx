import React from 'react';

type Props = {
  seatInfo: SeatInfo;
  onClose: () => void;
  onUpdate: (x: number, y:number) => void;
  onDelete: () => void;
}

const SeatEditDialog: React.FC<Props> = (props) => {

  const [x, setX] = React.useState(props.seatInfo.x);
  const [y, setY] = React.useState(props.seatInfo.y);

  React.useEffect(() => {
    setX(props.seatInfo.x);
  }, [props.seatInfo.x]);

  React.useEffect(() => {
    setY(props.seatInfo.y);
  }, [props.seatInfo.y]);

  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h1>座席情報</h1>
        <form className='form'>
          <label className='label'>X座標</label>
          <input className='input-form' value={x} type='number' onChange={(e) => {setX(parseInt(e.target.value))}}/>
          <label className='label'>Y座標</label>
          <input className='input-form' value={y} type='number' onChange={(e) => {setY(parseInt(e.target.value))}} />
          <div className='btn-space'>
            {props.seatInfo.status !== 'delete' ? <button className='danger' type='button' onClick={(e) => {e.preventDefault(); props.onDelete();}}>削除</button> : ''}
            <button type='button' onClick={(e) => {e.preventDefault(); props.onClose();}}>閉じる</button>
            <button className='info' type='submit' onClick={(e) => {e.preventDefault(); props.onUpdate(x, y);}}> {props.seatInfo.status === 'delete'? '元に戻す' : '更新'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeatEditDialog
