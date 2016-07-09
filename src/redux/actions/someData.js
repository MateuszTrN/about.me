export function loadSomeData() {
  return {
    key: 'someData.list',
    async: client => client.getSomeData()
  };
}
