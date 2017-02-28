exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classifieds').del()
    .then(function() {
      return Promise.all([
          // Inserts seed entries
          knex('classifieds').insert({
            id: 1,
            title: 'NES Classic',
            description: 'I got lucky and found it, and decided to charge 10x what it was worth.',
            price: 600,
            item_image: 'http://www.nintendo.com/images/page/nes-classic/nes-classic-edition-box.png',
            created_at: new Date('2016-06-26T14:26:16.000Z'),
            updated_at: new Date('2016-06-26T14:26:16.000Z')
          }),
          knex('classifieds').insert({
            id: 2,
            title: 'Pikachu 9" Plush Stuffed Toy',
            description: 'Polyester fiber construction Officially licensed.',
            price: 10,
            item_image: 'https://images-na.ssl-images-amazon.com/images/I/41VwGotRZsL._SY300_.jpg',
            created_at: new Date('2016-06-26T14:26:16.000Z'),
            updated_at: new Date('2016-06-26T14:26:16.000Z')
          })
        ])
        .then(() => {
          return knex.raw(
            "SELECT setval('classifieds_id_seq', (SELECT MAX(id) FROM classifieds))"
          );
        });
    });
};
