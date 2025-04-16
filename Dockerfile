FROM node:23-slim


WORKDIR /app


COPY package*.json ./
COPY ./prisma/schema.prisma /app/prisma/schema.prisma
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
RUN npm install
RUN apt-get update -y && apt-get install -y openssl && apt-get install -y postgresql-client

COPY . .


EXPOSE 3000


CMD ["./entrypoint.sh"]