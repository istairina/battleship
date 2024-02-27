export const responseToHttp = (type: string, data: string) => {
  const response = {
    type: type,
    data: data,
    id: 0,
  };

  console.log('response', JSON.stringify(response));

  return JSON.stringify(response);
};
