FROM node:lts-alpine AS client-dependencies

WORKDIR /app
COPY package.json package-lock.json  ./

RUN npm ci --omit=dev

FROM node:lts-alpine AS client-builder

WORKDIR /app
COPY --from=client-dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine AS client-production-runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=client-builder /app/next.config.js ./
COPY --from=client-builder /app/public ./public
COPY --from=client-builder /app/package.json ./package.json

COPY --from=client-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=client-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "node", "server.js" ]
