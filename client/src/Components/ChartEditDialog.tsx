import React from 'react';

type Props = {
  chartInfo: ChartInfo;
  warningMssage?: string;
  onClose: () => void;
  onRegister: (chartInfo: ChartInfo) => void;
  onDelete: () => void;
}

const ChartEditDialog: React.FC<Props> = (props) => {

  const [chartCd, setChartCd] = React.useState(props.chartInfo.chartCd);
  const [chartName, setChartName] = React.useState(props.chartInfo.name);
  const [image, setImage] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState(props.chartInfo.image);

  const isNew = props.chartInfo.chartCd === '';

  const fileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if(e.target.files !== null){
      reader.onload = (e) => {
        if (e.target !== null && e.target.result !== null) {
          setImageSrc(e.target.result.toString());
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    setImage(e.target.value);
  }

  const onRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onRegister({
      chartCd: chartCd,
      name: chartName,
      image: imageSrc
    })
  }

  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h1>座席表情報</h1>
        {typeof props.warningMssage !== 'undefined' && props.warningMssage !== '' ? <div className='warn-msg'>座席表コードが重複しています。</div>: ''}
        <form className='form'>
          <label className='label'>座席表コード</label>
          {isNew ? <input className='input-form' value={chartCd} onChange={(e) => {setChartCd(e.target.value)}}/> : (
            <div className='info-value'>
              <span>{chartCd}</span>
            </div>
          )}
          <label className='label'>表示名</label>
          <input className='input-form' value={chartName} onChange={(e) => {setChartName(e.target.value)}} />
          <label className='label'>座席表画像</label>
          <div className='img-form'>
            <input className='input-image' accept="image/*" value={image} type='file' onChange={fileImageChange} />
            {typeof image !== 'undefined' && imageSrc !== ''? <img src={imageSrc} alt='座席表画像' width='200'/>:''}
          </div>
          <div className='btn-space'>
            {isNew ? '' : <button className='danger' type='button' onClick={(e) => {e.preventDefault(); props.onDelete();}}>削除</button>}
            <button type='button' onClick={(e) => {e.preventDefault(); props.onClose();}}>閉じる</button>
            <button className='info' type='submit' onClick={onRegister} disabled={chartCd === '' || chartName === '' || imageSrc === ''}>{isNew ? '登録' : '更新'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChartEditDialog
