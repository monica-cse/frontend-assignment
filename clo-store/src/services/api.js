export const fetchData = async () => {
  const response = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
  return response.json();
};
