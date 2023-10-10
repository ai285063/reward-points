'use strict';

/**
 * customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer.customer', ({ strapi }) => ({
  // POST /customers/add_points/:uuid
  async addPoints(ctx) {
    const {
      request: {
        params: { uuid },
        body: { points }
      },
      state: {
        customer: {
          customerUuid
        }
      }
    }= ctx

    if (uuid != customerUuid) {
      return ctx.forbidden('You are not allowed to modify this user.')
    }

    if (!points) {
      return ctx.badRequest('Points is required in body.')
    }

    try {
      const existCustomer = await strapi.db.query('api::customer.customer').findOne({
        select: ['id', 'points'],
        where: { uuid }
      })
      
      if (!existCustomer) {
        return ctx.notFound('Customer uuid not found.')
      }

      const entry = await strapi.entityService.update('api::customer.customer', existCustomer.id, {
        data: {
          points: existCustomer.points + points,
        },
      });

      return {
        msg: 'Success',
        data: {
          points: entry.points
        }
      }
    
    } catch (err) {
      console.error('===== customer.addPoints error', err)
      return ctx.badRequest('customer.addPoints err', err.msg)
    }
    
  },
  // POST /customers/use_points/:uuid
  async usePoints(ctx) {
    const {
      request: {
        params: { uuid },
        body: { points }
      },
      state: {
        customer: {
          customerUuid
        }
      }
    }= ctx

    if (uuid != customerUuid) {
      return ctx.forbidden('You are not allowed to modify this user.')
    }

    if (!points) {
      return ctx.badRequest('Points is required in body.')
    }

    try {
      const existCustomer = await strapi.db.query('api::customer.customer').findOne({
        select: ['id', 'points'],
        where: { uuid }
      })
      
      if (!existCustomer) {
        return ctx.notFound('Customer uuid not found.')
      }

      if (existCustomer.points < points) {
        return ctx.badRequest('You don\'t have enougn points to use.')
      }

      const entry = await strapi.entityService.update('api::customer.customer', existCustomer.id, {
        data: {
          points: existCustomer.points - points,
        },
      });

      return {
        msg: 'Success',
        data: {
          points: entry.points
        }
      }
    
    } catch (err) {
      console.error('===== customer.addPoints error', err)
      return ctx.badRequest('customer.addPoints err', err.msg)
    }
  }
}));
