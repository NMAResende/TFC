import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';
import { mockInProgressFalse, mockInProgressTrue, mockMatches } from './mocks/MatchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches, com sucesso', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (sinon.restore());
  })

 // referencia: https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9
  it('Testando /matches, onde deve retornar as partidas e enviar um status 200', async () => {
    
      sinon.stub(Matches, "findAll")
        .resolves(mockMatches as unknown as Matches[]);
      sinon.stub(jsonwebtoken, 'verify').resolves();
  
    chaiHttpResponse = await chai
       .request(app).get('/matches').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kng'
      );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches);
  });

  it('Testando /matches, onde deve retornar as partidas em progresso e enviar um status 200', async () => {
   
    sinon
        .stub(Matches, "findAll")
        .resolves(mockMatches as unknown as Matches[]);
    sinon.stub(jsonwebtoken, 'verify').resolves();
  
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kng'
      );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockInProgressTrue);
  });
  
  it('Testando /matches, onde deve retornar as partidas finalizadas e enviar um status 200', async () => {
    
    sinon
        .stub(Matches, "findAll")
        .resolves(mockMatches as unknown as Matches[]);
    sinon.stub(jsonwebtoken, 'verify').resolves();
    
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kng'
      );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockInProgressFalse);
  });

  it('Testando /macthes/:id/finish, onde deve retornar as partidas finalizadas e enviar um status 200', async () => {
    
   
    sinon
        .stub(Matches, "update")
        .resolves();
    sinon.stub(jsonwebtoken, 'verify').resolves();

    chaiHttpResponse = await chai
       .request(app).patch('/matches/1/finish').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kng'
      );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Finished');
  });
});

describe('Testando /matches, para editar as partidas', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    (sinon.restore());
  });

  it('Testando criação de uma partida, onde deve retornar um status 200 e uma mensagem de sucesso', async () => {
    sinon
    .stub(Matches, "update")
    .resolves();
    sinon.stub(jsonwebtoken, 'verify').resolves();
    
    chaiHttpResponse = await chai
       .request(app).patch('/matches/1').set('authorization', 
       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kng');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.message).to.be.equal('successfully updated');
   });

});

describe('Testando /matches, em caso de falha no token', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(jsonwebtoken, "verify")
      .resolves();
  });

  afterEach(()=>{
    (sinon.restore());
  });

  it('Testando caso não haja token, onde deve retornar um status 401 e uma mensagem de erro', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/matches').set('authorization', ''
       );

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
   });

   it('Testando o token esteja incorreto, onde deve retornar um status 401 e uma mensagem de erro', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/matches').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMjk1MjY0LCJleHAiOjE2ODA5MDAwNjR9.TaY15B9J8nXC4DP3Ff5Bgvyuz0Yfi4v3GjbE9i01kn'
       );

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
   });

});

