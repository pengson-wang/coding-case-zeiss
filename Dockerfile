FROM node:16 as builder
WORKDIR /app
COPY . .
RUN yarn
ENV ENVIRONMENT=PRODUCTION
RUN yarn build

FROM node:16-slim
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
CMD ["server.js"]