const apiHost = 'https://stardewvalleywiki.com/mediawiki/api.php?'

export default {
  async fetchCategories () {
        try {

          let response = await fetch(apiHost + 'action=query&prop=links&titles=Stardew%20Valley%20Wiki&pllimit=500&plnamespace=0&format=json');
          let responseJson = await response.json();
          return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSinglePage (pageName) {
        try {

          let response = await fetch(apiHost + 'action=parse&format=json&page=' + pageName);
          let responseJson = await response.json();
          return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
};
