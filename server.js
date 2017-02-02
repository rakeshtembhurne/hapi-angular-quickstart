'use strict';

const hapi = require('hapi');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path:'/',
  handler: (request, reply) => {
    return reply('super basic front page');
  },
  config: {
    description: 'Main Page!',
    notes: 'A dummy page until we forward to SPA'
  }
});

server.register(require('inert'), (err) => {
  if (err) { throw err; }

  server.route({
    method: 'GET',
    path: '/angular/',
    handler:
      function (request, reply) {
      server.log(['file: /client/[index.html]']);
      reply.file('/client/index.html');
    },
    config: {
      description: 'Angular Quickstart App',
      notes: 'The main page for the Angular quickstart app'
    }
  });

  server.route({
    method: 'GET',
    path: '/angular/{filename*}',
    handler: {
        directory: {
            path: 'client'
        }
    }
  });

  server.route({
    method: 'GET',
    path: '/angular/node_modules/{filename*}',
    handler: {
        directory: {
            path: 'node_modules'
        }
    }
  });
});

server.register({
    register: require('good'),
    options: {
      ops: { interval: 60000 },
      reporters: {
        console: [
          { module: 'good-console'}, 'stdout'
        ]
      }
    }
  }, 
  (err) => { if (err) { throw err; }
});

if (!process.env.PRODUCTION) {
  server.register({ 
      register: require('blipp'), 
      options: { showAuth: true } 
    }, 
    (err) => { 
      if (err) { throw err; }
    });
}

server.start((err) => { 
  if (err) { throw err; }
  console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
});

