export type RegPlayerReqType = {
  username: string;
  password: string;
};

export type RegPlayerRespType = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type UpdateWinnerRespType = {
  type: string;
  data: [
    {
      name: string;
      wins: string;
    }
  ];
  id: 0;
};
