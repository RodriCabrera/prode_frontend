/*
TODO: Completar esta funcion, que tome el url que viene de la data de los grupos, 
y el tamaño y 
*/
export const getFlagUrl = (url, size) => {
  let newUrl;
  if (!url) newUrl = '';
  newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
};
