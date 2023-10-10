module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/customers/add_points/:uuid',
      handler: 'customer.addPoints',
      config: {
        auth: false,
        middlewares: [
          'api::customer.is-customer-verify', 
        ],
      },
    },
    {
      method: 'POST',
      path: '/customers/use_points/:uuid',
      handler: 'customer.usePoints',
      config: {
        auth: false,
        middlewares: [
          'api::customer.is-customer-verify',
        ]
      },
    },
  ],
};