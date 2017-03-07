function fetchData(URL) {
  return fetch(URL).then((response) => response.json())
}

module.exports = {
  grabAllCountries: () => {
    return fetchData('https://restcountries.eu/rest/v1/all');
  },
  countryPhotoData: (name, key) => {
    return fetchData(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${name},landscape&tag_mode=all&content_type=1&sort=interestingness-desc&format=json&nojsoncallback=1`);
  },
  countryTerrainData: (countryCode, alpha3) => {
    p1 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.LND.AGRI.ZS?&format=json`); //ag as % land over time
    p2 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.LND.FRST.ZS?&format=json`); //frst as % land over time
    p3 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.URB.TOTL?&format=json`); //total urban pop over time
    p4 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.URB.TOTL.IN.ZS?&format=json`); //% urban pop of total over time
    p5 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.POP.TOTL?&format=json`); //total pop over time
    p6 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.RUR.TOTL?&format=json`); //total rural pop over time
    p7 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.RUR.TOTL.ZS?&format=json`); //% rural pop of total over time
    p8 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/NY.GDP.MKTP.CD?&format=json`); //total gdp over time
    p9 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/NY.GDP.MKTP.KD.ZG?&format=json`); //gdp growth over time
    p10 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SL.UEM.TOTL.ZS?&format=json`); //unemployment % of workforce
    p11 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.DYN.LE00.IN?&format=json`); //life expectency
    p12 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/SP.DYN.TFRT.IN?&format=json`); //Fertility rate
    p13 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/IT.NET.USER.P2?&format=json`); //Internet users (per 100 people)
    p14 =  fetchData(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/month/${alpha3}`);
    p15 =  fetchData(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/pr/month/${alpha3}`);

    return Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15]);
  },
  destinations: (username, countryCode) => {
    return fetchData(`http://api.geonames.org/searchJSON?formatted=true&country=${countryCode}&orderby=population&featureClass=p&username=${username}`);
  },
  cityPhotos: (key, name, country) => {
    return fetchData(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${name},${country}&tag_mode=all&content_type=1&sort=interestingness-desc&format=json&nojsoncallback=1`);
  },
  foodInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=restaurant&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=bar-pub&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=coffee-tea&app_id=${appID}&app_code=${appCode}`);
    p4 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=dance-night-club&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3, p4]);
  },
  accomodationInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=hotel&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=hostel&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=motel&app_id=${appID}&app_code=${appCode}`);
    p4 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=camping&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3, p4]);
  },
  servicesInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=atm-bank-exchange&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=police-emergency&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=hospital&app_id=${appID}&app_code=${appCode}`);
    p4 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=petrol-station&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3, p4]);
  },
  outdoorInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=leisure-outdoor&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=natural-geographical&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2]);
  },
  landmarkInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=landmark-attraction&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=museum&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=religious-place&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3]);
  },
  shoppingInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=pharmacy&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=shop&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=food-drink&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3]);
  },
  transportationInformation: (lat, lon, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=airport&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=public-transport&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=railway-station&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3]);
  },
  currency: (base) => {
    return fetchData(`http://api.fixer.io/latest?base=${base}`);
  },
  climate: (countryCode) => {


    return Promise.all([p1, p2]);
  }
};
