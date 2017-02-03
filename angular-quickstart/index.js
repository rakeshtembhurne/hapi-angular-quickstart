/**
 * Hapi Plugin Index
 */

var rout_configs = {
  // index: {
  //   description: 'Angular Quickstart App Index',
  //   notes: 'The main page for the Angular quickstart app',
  //   handler: {
  //     file: __dirname + '/public/index.html'
  //   }
  // },

  index: {
    description: 'Angular Quickstart App Index',
    notes: 'The main page for the Angular quickstart app',
    handler: (request, reply) => {
      console.log('searching for:  ' + __dirname + '/public/index.html')
      reply.file(__dirname + '/index.html');
    }
  },

  files: {
    description: 'Angular Quickstart App public files',
    notes: 'Open up the app directory to download files',
    handler: {
      directory: {
        path: __dirname
      }
    }
  },

  node_modules: {
    description: 'Link to node module files',
    notes: 'Make the node_modules directory open to public, too',
    handler: {
      directory: {
        path: 'node_modules'
      }
    }
  }
}

exports.register = (server, options, next) => {

  server.register(require('inert'), (err) => {
    if (err) { throw err; }
  });

  server.route([
    { method: 'GET', path: '/', config: rout_configs.index },
    { method: 'GET', path: '/{filename*}', config: rout_configs.files },
    { method: 'GET', path: '/node_modules/{filename*}', config: rout_configs.node_modules }
  ]);

  next();
};

exports.register.attributes = {
  name: 'angular-quickstart',
  once: true
};