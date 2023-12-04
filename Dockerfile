FROM node:lts-alpine AS client-dependencies

WORKDIR /app
COPY package.json package-lock.json  ./

# Install only Production dependencies, without dev tools like ESLint
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

# Copy only the least possible amount of files to save final image size
COPY --from=client-builder /app/next.config.js ./
COPY --from=client-builder /app/public ./public
COPY --from=client-builder /app/package.json ./package.json

COPY --from=client-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=client-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configure API server on port 3004
COPY --from=client-builder --chown=nextjs:nodejs /app/db.json ./
RUN npm install -g json-server 
ENV API_URL=http://localhost:3004
# End of Configure API. NOTE Ideally this API server should be a separate Docker image

# USER nextjs # NOTE doesn't work with json-server inside

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "docker-run"]
# NOTE In case of API server deployed separately, the following would be the run command:
# CMD [ "node", "server.js" ]
