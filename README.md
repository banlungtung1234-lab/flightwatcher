# FlightWatcher

Ứng dụng Front-End tìm kiếm và quản lý chuyến bay bằng Vanilla JavaScript, jQuery, Bootstrap 5 và MockAPI.

## Trang chính

- `index.html`: trang khách, tìm kiếm, lọc, lưu, chia sẻ, theo dõi giá, lịch sử xem và chi tiết chuyến bay.
- `login.html`: cổng đăng nhập quản trị demo.
- `admin.html`: dashboard và CRUD chuyến bay với MockAPI.
- `404.html`: trang lỗi khi public.

Tài khoản demo: `admin` / `admin36`.

## Ngôn ngữ

Trang khách, đăng nhập và Admin hỗ trợ:

- Tiếng Việt
- English
- 中文（简体）
- Deutsch
- Русский
- ไทย

Ngôn ngữ của Điều khoản và Chính sách quyền riêng tư hoạt động độc lập với ngôn ngữ trang. Mỗi lần đóng rồi mở lại tài liệu pháp lý, ngôn ngữ mặc định trở về tiếng Việt.

## MockAPI

- Flights: `https://6a4c7a5bf5eab0bb6b6424fb.mockapi.io/Flights`
- Airlines: `https://6a4c7a5bf5eab0bb6b6424fb.mockapi.io/Airlines`

## Chạy cục bộ

1. Mở thư mục bằng VS Code.
2. Chạy `index.html` bằng Live Server.
3. Dùng `login.html` để vào Admin.

## Public bằng Render

1. Đưa toàn bộ thư mục lên một GitHub repository public.
2. Trên Render chọn **New → Blueprint**.
3. Kết nối repository; Render sẽ đọc `render.yaml`.
4. Kiểm tra các route `/`, `/login` và `/admin` sau khi deploy.

## Lưu ý

- Dải xác minh “Dữ liệu đồng bộ từ MockAPI” trong bảng chi tiết đã được loại bỏ để giao diện gọn hơn.
- Các file thư viện quan trọng được lưu cục bộ trong `vendor/` để tránh mất giao diện khi CDN lỗi.
- Đăng nhập Admin là lớp bảo vệ giao diện phía trình duyệt cho mục đích demo, không phải xác thực máy chủ.
