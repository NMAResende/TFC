import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota GET /leaderboard', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (sinon.restore());
  })

 // referencia: https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9
  it('Testando /leaderboard/home, onde deve retornar um array de times da casa e enviar um status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testando /leaderboard/away, onde deve retornar um array de times adversário e enviar um status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
