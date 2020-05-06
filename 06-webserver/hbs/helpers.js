const hbs = require('hbs');

hbs.registerHelper('getAnio', () => new Date().getFullYear() )
