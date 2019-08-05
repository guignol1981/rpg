import RpgApp from './rpg-app';

require('./passport/serializer');
require('./passport/local-strategy');

const rpgApp = new RpgApp(3000);
