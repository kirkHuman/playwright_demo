//const { expect } = require('@playwright/test');

export const setBrandDetails = async (baseUrl: string) => {
  /**
   * Set country domain, region, and environment variables.
   */
  console.log('FROM BRAND DETAILS URL -> : ' + baseUrl);
  const url = baseUrl.toLowerCase();

  await setCountryDomainAndRegion(url);
  await setEnvironment(url);
};

export const setCountryDomainAndRegion = async (url: string) => {
  /**
   * Set the global country domain and region based on BASE URL pattern.
   */
  global.COUNTRY = await getCountryDomain(url);
  console.log('COUNTRY: ' + global.COUNTRY);

  global.REGION = await getRegion();
  console.log('REGION: ' + global.REGION);
};

export const setEnvironment = async (url: string) => {
  /**
   * Set the Environment QA, Stage, Preview, and Prod using BASE URL.
   * @param {String}  url
   */
  let environment: string = 'NOT SET';

  if (url.includes('stage')) {
    environment = 'STAGE';
  } else if (url.includes('qa')) {
    environment = 'QA';
  } else if (url.includes('preview2')) {
    environment = 'prev2';
  } else if (url.includes('preview')) {
    environment = 'prev';
  } else {
    environment = 'prod';
  }

  global.ENVIRONMENT = environment;
  console.log('ENVIRONMENT FROM SETENVIRONMENT: ' + global.ENVIRONMENT);
};

export const getCountryDomain = async (url: string) => {
  /**
   * Set the country domain using BASE URL.
   * @param {String}  url
   */
  let country: string = '';
  switch (true) {
    case url.includes('.com'):
      country = 'US';
      break;
    case url.includes('.uk'):
      country = 'UK';
      break;
    case url.includes('.fr'):
      country = 'FR';
      break;
    case url.includes('.es'):
      country = 'ES';
      break;
    case url.includes('.de'):
      country = 'DE';
      break;
    case url.includes('.eu'):
      country = 'EU';
      break;
    default:
      console.error(`Please check url "${url}", country domain not matched`);
      throw new Error(`Please check url "${url}", country domain not matched`);
  }
  console.log('COUNTRY FROM GETCOUNTRYDOMAIN: ' + country);
  return country;
};

export const getRegion = async () => {
  /**
   * Set the Region NA or EU using country domain.
   */
  let region = global.COUNTRY === 'US' ? 'NA' : 'EU';
  return region;
};
