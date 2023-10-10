const jwt = require('jsonwebtoken');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // get authorization token and verify
    const token = await getToken(ctx)

    jwt.verify(token, process.env.CUSTOMER_JWT_SECRET, { algorithms: ['HS256'] }, function(
      err,
      decoded
    ) {
      if (err) {
        console.error('===== err', err)
        return ctx.badRequest(null, [{ messages: [{ id: 'An error occured', error: 'Authorization error' }]}]);
      }
      // write decoded payload in request and bring to controller
      ctx.state.customer = decoded
    })

    await next();
  };
};

async function getToken(ctx) {
  let token

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
    const parts = ctx.request.header.authorization.split(/\s+/);

    if (parts[0].toLowerCase() !== 'bearer' || parts.length !== 2) {
      return null;
    }

    token = parts[1];
    return token
  } else {
    return null;
  }
}