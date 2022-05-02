interface SeatInfo {
  id: string;
  x: number;
  y: number;
  userCd?: string | null,
  name?: string | null;
  furigana?: string | null;
  status? : SeatStatus | null;
}

type SeatStatus = 'add' | 'delete' | 'update';