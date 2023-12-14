import createExpressServer from '../../express/express';

describe('express', () => {
  let server: any;
  afterAll(() => {
    server.close();
  });
  it('calls express', () => {
    // given
    server = createExpressServer();

    // when
    process.env.NODE_ENV = 'development';

    // then
    expect(process.env.APP_URL).toEqual('http://localhost:5173');
    expect(process.env.API_URL).toEqual('http://localhost:1200');
  });
});
