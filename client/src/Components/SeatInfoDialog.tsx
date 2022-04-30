import React from 'react';

type Props = {
  seatInfo: SeatInfo;
  onClose: () => void;
  onRegister: () => void;
}

const SeatInfoDialog: React.FC<Props> = (props) => {

  const isEmpty = typeof props.seatInfo.userCd === 'undefined' || props.seatInfo.userCd === '';

  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h1>座席情報</h1>
        <form className='seatinfo-form'>
          <label className='label'>ユーザコード</label>
          { isEmpty ? <input className='input-form'/> : (
          <div className='info-value'>
            <span>{props.seatInfo.userCd}</span>
          </div>
          )}
          <label className='label'>名前</label>
          { isEmpty ? <input className='input-form'/> : (
          <div className='info-value'>
            <span>{props.seatInfo.name}</span>
          </div>
          )}
          <label className='label'>ふりがな</label>
          { isEmpty ? <input className='input-form'/> : (
          <div className='info-value'>
            <span>{props.seatInfo.furigana}</span>
          </div>
          )}
          <div className='btn-space'>
            <button type='button' onClick={(e) => {e.preventDefault(); props.onClose();}}>閉じる</button>
            { isEmpty ? (<button className='info' type='button' onClick={() => {}}>登録</button>) : ''}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeatInfoDialog
