FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml .
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
