module.exports = {
  async up(knex) {

    const rows = [
      { name: 'Jack', uuid: 'ccfe4227-962e-4ed3-83e8-9d2a35bf9878', points: 0 },
      { name: 'David', uuid: '9a65278b-b164-4dcc-94b0-0dfe962f96b0', points: 100 },
      { name: 'Melissa', uuid: 'a3029b5c-f53d-4011-ab37-f2420f35c64b', points: 1000}
    ]
    await knex.batchInsert('customers', rows, 3);
  },
};