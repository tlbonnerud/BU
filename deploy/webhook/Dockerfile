# Webhook receiver that redeploys the Next.js service on GitHub push.
FROM alpine:3.20

# webhook (adnanh) + docker CLI & compose plugin (talk to host daemon via the
# mounted socket) + git for pulling the repo.
RUN apk add --no-cache \
      webhook \
      docker-cli \
      docker-cli-compose \
      git \
      ca-certificates

COPY hooks.json /etc/webhook/hooks.json
COPY deploy.sh /etc/webhook/deploy.sh
RUN chmod +x /etc/webhook/deploy.sh

WORKDIR /app
EXPOSE 9000
