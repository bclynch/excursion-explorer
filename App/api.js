import fetchJsonp from 'fetch-jsonp';

function fetchData(URL) {
  return fetch(URL).then((response) => response.json())
}

module.exports = {
  grabAllCountries: () => {
    return fetchData('https://restcountries.eu/rest/v1/all');
  },
  countryData: (countryCode, name, key) => {
    p1 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.LND.AGRI.ZS?date=2009&format=json`);
    p2 = fetchData(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.LND.FRST.ZS?date=2009&format=json`);
    p3 = fetchData(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${name},landscape&tag_mode=all&content_type=1&sort=interestingness-desc&format=json&nojsoncallback=1`);

    return Promise.all([p1, p2, p3]);
  },
  destinations: (username, countryCode) => {
    return fetchData(`http://api.geonames.org/searchJSON?formatted=true&country=${countryCode}&orderby=population&featureClass=p&username=${username}`);
  },
  cityInformation: (lat, lng, appID, appCode) => {
    p1 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=shopping&app_id=${appID}&app_code=${appCode}`);
    p2 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=natural-geographical&app_id=${appID}&app_code=${appCode}`);
    p3 = fetchData(`https://places.api.here.com/places/v1/discover/explore?in=${lat}%2C${lon}%3Br%3D10000&cat=restaurant&app_id=${appID}&app_code=${appCode}`);

    return Promise.all([p1, p2, p3]);
  }
  // climate: (countryCode) => {
  //   return fetchJsonp(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/month/${countryCode}?callback=handler`, {name: 'handler'})
  //     .then(function(response) {
  //       return response.json()
  //     }).then(function(json) {
  //       console.log(json);
  //       return json;
  //     }).catch(function(ex) {
  //       console.log('parsing failed', ex)
  //     })
  // }

  //
  // jsonp(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/month/${countryCode}?callback=handler`, {name: 'handler'}, function (err, data) {
  //                   if (err) {
  //                       console.error(err);
  //                   } else {
  //                       const tempData = data;
  //                       console.log('Temp', tempData);
                //         jsonp(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/pr/month/${countryCode}?callback=handler`, {name: 'handler'}, function (err, data) {
                //             if (err) {
                //                 console.error(err);
                //             } else {
                //                 const precipData = data;
                //                 console.log('Precip', precipData);
                //                 const dataObj = {ag: a, frst: b, photos: c.data.photos.photo, temp: tempData, precip: precipData, info: self.state.selectedCountry};
                //                 sessionStorage.setItem(countryCode, JSON.stringify(dataObj));
                //                 self.setState({selectedCountryData: dataObj});
                //             }
                //         })
                //     }
                // });
};
