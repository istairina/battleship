export const responseToHttp = (type: string, data: string) => {
  const response = {
    type: type,
    data: data,
    id: 0,
  };

  return JSON.stringify(response);
};
