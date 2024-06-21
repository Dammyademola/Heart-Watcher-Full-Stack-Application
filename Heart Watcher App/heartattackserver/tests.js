// Dynamically import necessary libraries
const chaiPromise = import('chai');
const chaiHttpPromise = import('chai-http');
const sinonPromise = import('sinon');
const mysqlPromise = import('mysql');
const bcryptPromise = import('bcrypt');
const appPromise = import('./server.js');  // Adjust the path as necessary

let chai, chaiHttp, sinon, mysql, bcrypt, app;

// Setup chai and other imports
before(async () => {
  chai = await chaiPromise;
  chaiHttp = await chaiHttpPromise;
  sinon = await sinonPromise;
  mysql = await mysqlPromise;
  bcrypt = await bcryptPromise;
  app = (await appPromise).default;

  chai.use(chaiHttp.default);
});

describe('POST /api/register', () => {
  let mockConnection;
  let queryStub;

  beforeEach(async () => {
    // Mock MySQL connection
    mockConnection = {
      query: sinon.spy()
    };
    sinon.stub(mysql, 'createConnection').returns(mockConnection);

    // Stub bcrypt.hash to avoid actual hashing during tests
    const bcryptModule = await bcrypt;
    sinon.stub(bcryptModule, 'hash').resolves('hashed#password');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should register a new user and return success message', (done) => {
    const userData = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      formattedDateOfBirth: '1990-01-01',
      height: 180,
      weight: 70,
      gender: 'Male'
    };

    queryStub = sinon.stub(mockConnection, 'query').yields(null, { affectedRows: 1 });

    chai.request(app)
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: 'User registered successfully' });
        expect(bcrypt.hash.calledOnce).to.be.true;
        expect(queryStub.calledOnce).to.be.true;
        done();
      });
  });

  it('should handle errors during registration', (done) => {
    const userData = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      formattedDateOfBirth: '1990-01-01',
      height: 180,
      weight: 70,
      gender: 'Male'
    };

    // Simulate a database error
    queryStub = sinon.stub(mockConnection, 'query').yields(new Error('DB error'), null);

    chai.request(app)
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: 'Error registering user' });
        done();
      });
  });
});
