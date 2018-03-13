const apiHost = 'https://stardewvalleywiki.com/mediawiki/api.php?';

export default {
  async fetchCategories () {
    try {

      const response = await fetch(apiHost + 'action=query&prop=links&titles=Stardew%20Valley%20Wiki&pllimit=500&plnamespace=0&format=json');
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSinglePage (pageName) {
    try {

      const response = await fetch(apiHost + 'action=parse&format=json&disabletoc=true&prop=headhtml|wikitext|text&disableeditsection=true&page=' + pageName);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async fetchSearchResults(searchTerm) {
    try {

      const response = await fetch(apiHost + 'action=opensearch&redirects=resolve&format=json&search=' + searchTerm);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSinglePageFormat (pageName) {
    try {
      const response = await fetch(apiHost + 'action=parse&format=json&disabletoc=true&disableeditsection=true&page=' + pageName);
      const responseJson = await response.json();
      const formatData = '<body>' + responseJson.parse.text['*'] + '</body>';
      //console.log(formatData);
      return formatData;
    } catch (error) {
      console.error(error);
    }}
};
