const axios = require('axios');

exports.handler = async (event) => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  const qParams = event.queryStringParameters?.q;

  if (!qParams) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      cod: 400,
      message: 'Missing "q" query string'
    });
    return response;
  }

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${qParams}&units=imperial&appid=${process.env.WEATHER_SEARCH_API_KEY}`
    );
    response.statusCode = 200;
    response.body = JSON.stringify(result.data);
    return response;
  } catch (error) {
    response.statusCode = error.response.status;
    response.body = JSON.stringify(error.response.data);
    return response;
  }
};
