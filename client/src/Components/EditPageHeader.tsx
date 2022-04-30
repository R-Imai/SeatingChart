import React from 'react';

type Props ={
  seatInfo: SeatInfo[];
  onClickRegister: () => void;
}


const EditPageHeader: React.FC<Props> = (props) => {

  const addCount = props.seatInfo.filter(v => v.status === 'add').length;
  const updateCount = props.seatInfo.filter(v => v.status === 'update').length;
  const deleteCount = props.seatInfo.filter(v => v.status === 'delete').length;

  return (
    <div className='header'>
      <div className='edit-seat-info'>
        {addCount} 件追加、{updateCount}件更新、{deleteCount}件削除
      </div>
      <div className='waring-text'>
        ※ 「登録する」ボタンを押すまで変更は保存されません。
      </div>
      <button className='info' type='submit' onClick={(e) => {e.preventDefault(); props.onClickRegister()}}>登録する</button>
    </div>
  );
}

export default EditPageHeader
