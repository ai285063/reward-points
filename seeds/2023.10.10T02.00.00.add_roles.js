module.exports = {
  async up(knex) {

    const up_rows = [
      { action: 'api::customer.customer.addPoints', created_at: '2023-10-10 17:53:45.855000', updated_at: '2023-10-10 17:53:45.855000' },
      { action: 'api::customer.customer.usePoints', created_at: '2023-10-10 17:53:45.855000', updated_at: '2023-10-10 17:53:45.855000' }
    ]
    const ids = await knex.batchInsert('up_permissions', up_rows, 2).returning('id')
    const id = ids[0]

    const up_links_rows = [
      { permission_id: id, role_id: 2, permission_order: 1 },
      { permission_id: id + 1, role_id: 2, permission_order: 1 }
    ]
    await knex.batchInsert('up_permissions_role_links', up_links_rows, 2);
  },
};