'use strict';

process.env.NODE_ENV = 'test';


const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('Part 3: CRUD routes for classifieds resource should be created.', () => {

  before((done) => {
  knex.migrate.latest()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /classifieds should return the id,title, description, price and item_image of all classifieds.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/classifieds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
          id:1,
          title:'NES Classic',
          description:'I got lucky and found it, and decided to charge 10x what it was worth.',
          price:600,
          item_image:'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png'
        },{
          id:2,
          title:'Pikachu 9" Plush Stuffed Toy',
          description:'Polyester fiber construction Officially licensed.',
          price:10,
          item_image:'https://images-na.ssl-images-amazon.com/images/I/41VwGotRZsL._SY300_.jpg'
        }], done);

      /* eslint-enable max-len */
  });

  test('GET /classifieds/:id should return the id,title, description, price and item_image of a single ad.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/classifieds/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
          id:1,
          title:'NES Classic',
          description:'I got lucky and found it, and decided to charge 10x what it was worth.',
          price:600,
          item_image:'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /classifieds should create a new ad and return the id, title, description, price and item_image that were created.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .post('/classifieds')
    .set('Accept', 'application/json')
    .send({
          title:'Teddi\'s iPhone',
          description:'Finders Keepers',
          price:50,
          item_image:'https://cdn.pixabay.com/photo/2014/11/05/17/07/iphone-518101_1280.jpg'
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
          id: 3,
          title:'Teddi\'s iPhone',
          description:'Finders Keepers',
          price:50,
          item_image:'https://cdn.pixabay.com/photo/2014/11/05/17/07/iphone-518101_1280.jpg'
    }, done);

    /* eslint-enable max-len */
  });

  test('PATCH /classifieds/:id should update an ad and return the id, title, description, price and item_image that were updated.', (done) => {
  /* eslint-disable max-len */
  request(server)
    .patch('/classifieds/1')
    .set('Accept', 'application/json')
    .send({
          id:1,
          title:'NES Classic',
          description:'I got lucky and found it, and decided to charge 10x what it was worth.',
          price:1000,
          item_image:'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png'
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
          id:1,
          title:'NES Classic',
          description:'I got lucky and found it, and decided to charge 10x what it was worth.',
          price:1000,
          item_image:'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png'
      }, done);

    /* eslint-enable max-len */
  });

  test('DELETE /classifieds/:id should delete an ad and return the id,title, description, price, and item_image that were deleted.', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/classifieds/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
          id:2,
          title:'Pikachu 9" Plush Stuffed Toy',
          description:'Polyester fiber construction Officially licensed.',
          price:10,
          item_image:'https://images-na.ssl-images-amazon.com/images/I/41VwGotRZsL._SY300_.jpg'
        }, done);

      /* eslint-enable max-len */
  });

});
