import React from 'react';

type Props = {
  seatInfo: SeatInfo;
  onClose: () => void;
  onRegister: (seatInfo: SeatInfo) => void;
  onDelete: () => void;
}

const mkFormValue = (value?: string | null) => {
  return typeof value === 'undefined' || value === null? '': value
}

const isNullable = (value?: string | null) => {
  return typeof value === 'undefined' || value === null || value === ''
}

const SeatInfoDialog: React.FC<Props> = (props) => {

  const [userCd, setUserCd] = React.useState(props.seatInfo.userCd);
  const [name, setName] = React.useState(props.seatInfo.name);
  const [furigana, setFurigana] = React.useState(props.seatInfo.furigana);

  const isEmpty = typeof props.seatInfo.userCd === 'undefined' || props.seatInfo.userCd === null || props.seatInfo.userCd === '';

  const onRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updateInfo = {...props.seatInfo, ...{
      userCd: userCd,
      name: name,
      furigana: furigana
    }};
    
    props.onRegister(updateInfo)
  }

  const isDisabled = () => {
    return isNullable(userCd) || isNullable(name)
  }

  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h1>座席情報</h1>
        <form className='form'>
          <label className='label required'>ユーザコード</label>
          { isEmpty ? <input className='input-form' value={mkFormValue(userCd)} onChange={(e) => {setUserCd(e.target.value)}}/> : (
          <div className='info-value'>
            <span>{props.seatInfo.userCd}</span>
          </div>
          )}
          <label className='label required'>名前</label>
          { isEmpty ? <input className='input-form' value={mkFormValue(name)} onChange={(e) => {setName(e.target.value)}}/> : (
          <div className='info-value'>
            <span>{props.seatInfo.name}</span>
          </div>
          )}
          <label className='label'>ふりがな</label>
          { isEmpty ? <input className='input-form' value={mkFormValue(furigana)} onChange={(e) => {setFurigana(e.target.value)}}/> : (
          <div className='info-value'>
            <span>{props.seatInfo.furigana}</span>
          </div>
          )}
          <div className='btn-space'>
            <button type='button' onClick={(e) => {e.preventDefault(); props.onClose();}}>閉じる</button>
            { isEmpty ? (<button className='info' type='button' disabled={isDisabled()} onClick={onRegister}>登録</button>) : (<button className='danger' type='button' onClick={(e) => {e.preventDefault(); props.onDelete()}}>削除</button>)}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeatInfoDialog
