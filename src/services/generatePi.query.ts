export const healthCheck = (request, reply) => {
  reply.send({ status: 'OK' })
}
