import _ from 'lodash';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { tryJsonParse } from '../src/utils';

let server;

before(() => new Promise((resolve, reject) => {
  const app = express();
  app.use(bodyParser.json());

  app.use('/json', (request, response) => {
    response.json({
      body: _.mapValues(request.body, tryJsonParse),
      query: _.mapValues(request.query, tryJsonParse),
      success: true,
    });
  });

  app.use('/text', (request, response) => {
    response.send('Hello World!');
  });

  app.use('/200', (request, response) => {
    response.status(200).send('OK');
  });

  app.use('/404', (request, response) => {
    response.status(404).send('Not Found');
  });

  app.use('/500', (request, response) => {
    response.status(500).send('Server Error');
  });

  app.use('/foo%20bar', (request, response) => {
    response.status(200).send('OK');
  });

  app.use('/xml', (request, response) => {
    response.status(200).send('<foo attr="value">bar</foo>');
  });

  server = http.Server(app)
    .once('error', reject)
    .once('listening', resolve)
    .listen(_.get(process, 'env.PORT', 5678));
}));

after(() => {
  server.close();
});
