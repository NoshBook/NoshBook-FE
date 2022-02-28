let beUrl = '';

function getUrlForType(type) {
  switch (type) {
    case 'STAGING':
      return process.env.REACT_APP_BE_STAGING_URL;
    case 'PROD':
      return process.env.REACT_APP_BE_PROD_URL;
    case 'LOCAL':
      return process.env.REACT_APP_BE_LOCAL_URL;
    default:
      throw new Error('Backend API URL not specified, please reference .env.example and update your env vars');
  }
}

const beType = process.env.REACT_APP_BE_TYPE ?? process.env.REACT_APP_BE_DEFAULT_TYPE;
beUrl = getUrlForType(beType); 

export { beUrl };
