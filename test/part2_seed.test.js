/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Part 2: Seed data for classifieds should be created.', () => {
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

  test('classifieds table: seed data should match test data.', (done) => {
    knex('classifieds').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id: 1,
          title: 'NES Classic',
          description: 'I got lucky and found it, and decided to charge 10x what it was worth.',
          price: 600,
          item_image: 'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          title: 'Pikachu 9" Plush Stuffed Toy',
          description: 'Polyester fiber construction Officially licensed.',
          price: 10,
          item_image: 'https://images-na.ssl-images-amazon.com/images/I/41VwGotRZsL._SY300_.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row where id=${i + 1} does not match.`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
