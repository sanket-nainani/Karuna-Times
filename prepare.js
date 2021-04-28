const { writeFile } = require('fs').promises;

(async () => {
  await writeFile(
    '.env',
    `NEXT_PUBLIC_APP_NAME = Karuna
    NEXT_PUBLIC_APP = karuna
    NEXT_PUBLIC_ENV = development
    NEXT_PUBLIC_SECURE_EC2_URL = 'https://api.karunatimes.org/api/v1'
    NEXT_PUBLIC_GOOGLE_MAP_KEY = 'AIzaSyAttbEuTtLAQS98dRHzudwU-fpYkKfLGxM'
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZ3Jhc3Nkb29ybWFzdGVyIiwiYSI6ImNqdWprbWk2MDFtZGs0M3AwZHY5d3R3cXoifQ.jw9_rJVTx1E9AunI6Ey1vg"
    `
  );
})();
