FROM node:18-alpine as base
WORKDIR ./be
EXPOSE 3000
COPY ["test.ts", "package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm install --production=false
COPY . .
CMD ["npm", "start"]
