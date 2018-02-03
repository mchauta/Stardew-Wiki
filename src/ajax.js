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

          let response = await fetch(apiHost + 'action=parse&format=json&disabletoc=true&prop=headhtml|wikitext|text&disableeditsection=true&page=' + pageName);
          let responseJson = await response.json();
          return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchSearchResults(searchTerm) {
        try {

          let response = await fetch(apiHost + 'action=query&list=search&srwhat=title&srprop=redirecttitle|wordcount&format=json&srsearch=' + searchTerm);
          let responseJson = await response.json();
          return responseJson;
    } catch (error) {
      console.error(error);
    }
  },


async fetchSinglePageFormat (pageName) {
      try {

        let response = await fetch(apiHost + 'action=parse&format=json&disabletoc=true&disableeditsection=true&page=' + pageName);
        let responseJson = await response.json();
        console.log(responseJson);
        let formatData = '<body>' + responseJson.parse.text['*'] + '</body>';
        //console.log(formatData);
        return formatData;
  } catch (error) {
    console.error(error);
  }
}
};
