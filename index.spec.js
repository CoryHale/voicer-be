const request = require('supertest');
const server = require('./index.js'); 

// Describing index.js endpoints
describe('index.js', () => {
  describe('GET function on /', () => {
    it('should return a 200 status', async () => {
      const response = await request(server).get('/')
      expect(response.status).toEqual(200);
    });
  });
});