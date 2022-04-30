type SeatInfo = {
  id: string;
  x: number;
  y: number;
  userCd?: string,
  name?: string;
  furigana?: string;
  status? : SeatStatus;
}

type SeatStatus = 'add' | 'delete' | 'update';