import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/UsersModel';
import { mockUsers } from '../tests/mocks/UsersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Post /login, com sucesso', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(mockUsers as Users);
  });

  afterEach(()=>{
    (sinon.restore());
  })

 // referencia: https://dev.to/matheusg18/testes-de-integracao-para-api-com-typescript-mocha-chai-e-sinon-3np9
  it('Testando /login, onde deve retornar um token e enviar um status 200', async () => {
    
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
          email: "admin@admin.com",
          password: "secret_admin"
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.equal(mockToken);
  });
});

describe('Testando /login, em caso de falha', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(null);
  });

  afterEach(()=>{
    (sinon.restore());
  });

  it('Testando caso não haja um email, onde deve retornar um status 400 e uma mensagem de erro', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        password: "secret_admin"
       });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
   });

   it('Testando o email seja inválido, onde deve retornar um status 401 e uma mensagem de erro', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: "adminadmin.com",
        password: "secret_admin"
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
   });

   it('Testando caso não haja um password, onde deve retornar um status 400 e uma mensagem de erro', async () => {
  
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: "admin@admin.com"
       });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
   });

   it('Testando o password com menos de 6 caracteres, onde deve retornar um status 401 e uma mensagem de erro', async () => {
    
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: "adminadmin.com",
        password: "sec"
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
   });
});
