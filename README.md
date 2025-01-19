
A) Authentication
Auth.js (Resnd and Google)

B) PWA
-command for Generating Standbyimages
{npx pwa-asset-generator ./public/icon512x512.png ./public/startupimages \
 --splash-only \
 --padding "calc(50vh - 25%) calc(50vw - 25%)" \
 --quality 100
}

C) to update prisma schema
1- npx prisma migrate dev --name init
2- npx prisma migrate dev

