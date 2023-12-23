import { rest } from 'msw'
import { setupServer } from 'msw/node'

const api = 'https://free-nba.p.rapidapi.com'

const handlers = [
    rest.get('/test', async (_, res, ctx) => {
      return res(ctx.json([]))
    })
  ]

const server = setupServer(...handlers)

export { rest, server, api }