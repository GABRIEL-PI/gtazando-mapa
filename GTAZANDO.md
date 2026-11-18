# Mapa de Leonida — versão Gtazando

Fork do [Leonida Atlas](https://github.com/navanem/gta6-leonida-atlas) (v0.8.2) com interface em português e a marca Gtazando, para rodar em `gtazando.com/mapa/`.

## O que mudou em relação ao original

- Interface principal em português: barra lateral, busca, filtros, painel do lugar, status e barra do mapa.
- Cabeçalho "MAPA DE LEONIDA" com link de volta para o gtazando.com.
- Rodapé com crédito ao Leonida Atlas, link para o código-fonte desta versão e aviso de não afiliação com a Rockstar.
- Título e descrição da página em português (SEO).
- Variáveis novas: `VITE_GTAZANDO_URL` e `VITE_SOURCE_URL`.

As páginas "Sobre", "Créditos" e "Licenças" e as descrições dos lugares continuam em inglês, porque vêm do catálogo da comunidade.

## Obrigações de licença

- **Código (AGPL-3.0):** como o mapa fica público na internet, o código desta versão precisa estar disponível para quem usa. Publique este repositório (ex.: `github.com/SEU_USUARIO/gtazando-mapa`) e aponte `VITE_SOURCE_URL` para ele antes de subir. Qualquer mudança futura também entra no repositório público.
- **Mapa e catálogo (CC BY 4.0, GTADB / Map GTA):** mantenha a atribuição que já aparece no canto do mapa.
- **Rockstar:** nomes, logos e imagens são da Rockstar/Take-Two. Não acrescente logo nem arte oficial.

## Rodar localmente

Requer Node 22.13+ e pnpm 10+.

```sh
pnpm install --frozen-lockfile
pnpm dev                     # http://127.0.0.1:4330
```

## Build para gtazando.com/mapa/

```sh
ATLAS_BASE_PATH=/mapa/ \
VITE_SOURCE_URL=https://github.com/SEU_USUARIO/gtazando-mapa \
pnpm build
```

O resultado fica em `dist/` (arquivos estáticos, ~65 MB, ~6.400 arquivos).

### Opção A — Nginx que já serve o site

Copie `dist/` para `/var/www/gtazando/mapa/` e adicione:

```nginx
location /mapa/ {
    alias /var/www/gtazando/mapa/;
    try_files $uri $uri/ $uri.html /mapa/index.html;
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
location = /mapa { return 301 /mapa/; }
```

### Opção B — Docker atrás do Traefik

Crie `.env.production.local`:

```dotenv
ATLAS_HOSTNAME=gtazando.com
ATLAS_ROUTE_PREFIX=/mapa
ATLAS_PROXY_NETWORK=proxy
ATLAS_TLS_RESOLVER=letsencrypt
ATLAS_IMAGE=gtazando-mapa:prod
VITE_SOURCE_URL=https://github.com/SEU_USUARIO/gtazando-mapa
```

```sh
docker compose --env-file .env.production.local -f deploy/docker-compose.prod.yml build
docker compose --env-file .env.production.local -f deploy/docker-compose.prod.yml up -d --no-build
```

## Anúncios e pontos

- O mapa pode ter display do AdSense normalmente, mas **não pode dar moedas** a quem navega nele.
- Para ligar o mapa ao sistema de pontos depois, o ponto de entrada é `ATLAS_PRIVATE_ENTRY` (ver `src/capabilities/extension.ts`): um componente próprio que mostra o login do Gtazando no rodapé da barra lateral.

## Atualizar com o original

```sh
git remote add upstream https://github.com/navanem/gta6-leonida-atlas.git
git fetch upstream
git merge upstream/main      # resolver conflitos nos textos traduzidos
```
