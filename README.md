# GAME DEALS

Zalo Mini App tổng hợp game miễn phí, giveaway và game giảm giá.

## Architecture
- `apps/mini-app`: React + TypeScript + Vite, giao diện mobile-first và tích hợp ZMP SDK.
- `apps/worker`: Cloudflare Workers REST API, Cron đồng bộ 6 giờ/lần.
- Google Sheets: dữ liệu quản trị.
- GitHub Actions: CI, deploy Cloudflare Workers và Pages (bản web preview).

## Mini App compatibility
- Root DOM sử dụng `#app` theo yêu cầu của Zalo Mini App.
- Cấu hình Mini App nằm tại `apps/mini-app/app-config.json`.
- Danh sách game yêu thích dùng Native Storage đồng bộ của ZMP SDK; khi chạy ngoài Zalo, ứng dụng dùng `localStorage` làm fallback cho web preview.
- Mini App chạy trên origin chính thức `https://h5.zdn.vn`; CORS Worker đã cho phép origin này.
- Vite dùng relative asset paths để hỗ trợ môi trường phân phối static assets của Mini App.
- Không yêu cầu Mini App ID để build và kiểm tra mã nguồn. Cần liên kết Mini App ID và đăng nhập Zalo Developer trước khi đóng gói/phát hành chính thức.

## Local development
```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## Data providers
- GamerPower API: giveaway game.
- CheapShark API: game deals.
- Epic Games: game miễn phí từ Epic.

## Google Sheets setup
Tạo hai sheet `Games` và `SyncLogs`. Header Games: `id,title,type,platforms,store_url,image_url,description,worth,discount_percent,normal_price,sale_price,end_date,source,updated_at`.

## Cloudflare secrets
Trong Worker đặt `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEETS_ID`, `ADMIN_API_TOKEN`. Chia sẻ Google Spreadsheet cho service account với quyền Editor. Không commit secrets.

## API
- `GET /api/health`
- `GET /api/games?type=all|giveaway|free|deal&search=...`
- `GET /api/games/:id`
- `POST /api/admin/sync` (Bearer token)

## Zalo setup and publishing
- **Mini App name:** Game Deals
- **Mini App ID:** `4298354197271713214`
- **Project path:** `apps/mini-app`

### Liên kết Mini App ID và phát hành
1. Mở thư mục `apps/mini-app` bằng Zalo Mini App Studio hoặc terminal.
2. Nếu dùng CLI cho dự án có sẵn, chạy `npx zmp-cli init` (hoặc `zmp init` nếu đã cài CLI), nhập Mini App ID ở trên và hoàn tất đăng nhập/xác thực tài khoản có quyền Developer/Admin.
3. Chọn chế độ **Using ZMP to deploy only** để liên kết dự án hiện tại, không tạo lại source project.
4. Chạy thử bằng Simulator; sau đó dùng Device để kiểm tra trên Zalo thật.
5. Khi đã xác thực quyền sở hữu Mini App ID, mới thực hiện deploy lên nền tảng Zalo và gửi duyệt phiên bản.
6. Tạo Zalo OA riêng nếu sau này cần triển khai luồng thông báo qua OA; tính năng này chưa bật khi chưa có OA ID và quyền tương ứng.

**Lưu ý:** Mini App ID là mã định danh công khai, không phải App Secret hay Access Token. Không lưu token/secret đăng nhập vào Git. Cloudflare Pages chỉ là web preview, không thay thế quy trình deploy và xét duyệt trên Zalo.

Cloudflare Pages chỉ là web preview, không thay thế quy trình đóng gói và phát hành Mini App trên nền tảng Zalo.

License: MIT.
