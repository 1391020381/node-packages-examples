FROM node
RUN npm install pm2@latest -global --quiet

COPY package*json ./

# Bundle app source
COPY . .

RUN npm ci --only=production

CMD ["pm2-runtime","./pm2.json"]