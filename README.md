# Tương ớt Mường Khương — HTX Hoa Lợi

Website thương mại điện tử cho thương hiệu **Tương ớt Mường Khương** (HTX Hoa Lợi, Lào Cai) — sản phẩm OCOP 4 sao.

Prototype tương tác đầy đủ: trang chủ, giỏ hàng, form đặt hàng, modal chi tiết sản phẩm, Zalo OA.

## Chạy thử

Mở `index.html` bằng trình duyệt, hoặc chạy một web server tĩnh:

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

> Lưu ý: cần mở qua web server (không mở trực tiếp file://) vì các file `.jsx` được nạp động.

## Deploy GitHub Pages

1. Push toàn bộ thư mục lên repo.
2. Vào **Settings → Pages**, chọn branch `main`, thư mục `/ (root)`.

## Cấu trúc

```
index.html          Trang chính + CSS tokens + nạp script
app.jsx             State giỏ hàng, Tweaks biến thể
components.jsx      Icon, Button, Badge, Placeholder
sections.jsx        Navbar, Hero, Trust bar
sections2.jsx       Sản phẩm, Câu chuyện, Lý do chọn, CTA, Footer
cart.jsx            Giỏ hàng, form đặt hàng, modal chi tiết, Zalo
tweaks-panel.jsx    Bảng tùy chỉnh biến thể
assets/data.js      Dữ liệu sản phẩm & nội dung
assets/img/         Hình ảnh
```

## Cần thay khi lên thật

- Ảnh thật: ruộng nương Mường Khương, gạo Séng Cù (hiện là placeholder).
- Link Zalo OA / Facebook / Shopee.
- Google Analytics ID (đã chừa chỗ trong `index.html`).

---
© 2026 HTX Hoa Lợi · htxhoaloilaocai@gmail.com · Huyện Mường Khương, tỉnh Lào Cai
