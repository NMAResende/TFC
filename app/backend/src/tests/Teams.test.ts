import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';
import { teamsMocks } from './mocks/TeamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota GET /teams, com sucesso', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (sinon.restore());
  })

 // referencia: https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9
  it('Testando getAll, onde deve retornar um array de times e enviar um status 200', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMocks as Teams[]);
    });

    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks);
  });

  it('Testando getById, onde deve retornar um time com o id especifico e enviar um status 200', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findByPk")
        .resolves(teamsMocks[0] as Teams);
    });
    
    chaiHttpResponse = await chai
       .request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks[0]);
  });
});

describe('Testando /teams, em caso de falha', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(null);
  });

  afterEach(()=>{
    (sinon.restore());
  });

  it('Testando caso não haja um team, onde deve retornar um status 400 e uma mensagem de erro', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/56');

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('Team not Found!');
   });
  });