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

describe('Testando a rota GET /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

 // referencia: https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9
  it('Testando getAll, onde deve retornar um array de times e enviar um status 200', async () => {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMocks as Teams[]);
    });
  
    after(()=>{
      (Teams.findAll as sinon.SinonStub).restore();
    })

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
  
    after(()=>{
      (Teams.findByPk as sinon.SinonStub).restore();
    })
    
    chaiHttpResponse = await chai
       .request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks[0]);
  });
});
