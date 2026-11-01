# GAME DEALS VIETNAM

Zalo Mini App tổng hợp game miễn phí, giveaway và game giảm giá.

## Architecture
- `apps/mini-app`: React + TypeScript + Vite, giao diện mobile-first.
- `apps/worker`: Cloudflare Workers REST API, Cron đồng bộ 6 giờ/lần.
- Google Sheets: dữ liệu quản trị.
- GitHub Actions: CI, deploy Cloudflare Workers và Pages.

## Data providers
- GamerPower API: giveaway game.
- CheapShark API: game deals.

## Local development
```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## Google Sheets setup
Tạo hai sheet `Games` và `SyncLogs`. Header Games: `id,title,type,platforms,store_url,image_url,description,worth,discount_percent,normal_price,sale_price,end_date,source,updated_at`.

## Cloudflare secrets
Trong Worker đặt `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_ID`, `ADMIN_API_TOKEN`. Chia sẻ Google Spreadsheet cho service account với quyền Editor. Không commit secrets.

## API
- `GET /api/health`
- `GET /api/games?type=all|giveaway|free|deal&search=...`
- `GET /api/games/:id`
- `POST /api/admin/sync` (Bearer token)

Zalo Mini App domain và App ID cần cấu hình trong Zalo Developer Console. Giao diện hỗ trợ web preview; tích hợp SDK Zalo theo môi trường chạy.

License: MIT.