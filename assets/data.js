// Dữ liệu sản phẩm & nội dung — Tương ớt Mường Khương / HTX Hoa Lợi
window.PRODUCTS = [
  {
    id: 'tuong-ot-250',
    name: 'Tương ớt Mường Khương 250g',
    origin: 'Mường Khương, Lào Cai',
    price: 45000,
    img: 'assets/img/tuong-ot-bottle.png',
    badge: null,
    tag: 'Bán chạy',
    short: 'Ớt chỉ thiên vùng cao, cay nồng đặc trưng. Không chất bảo quản.',
    desc: 'Được chế biến từ ớt chỉ thiên tươi thu hoạch tại huyện Mường Khương, Lào Cai — vùng đất nổi tiếng với khí hậu lạnh cho ra trái ớt cay nồng đặc trưng. Kết hợp cùng tỏi, muối và gia vị truyền thống của đồng bào dân tộc địa phương. Không chất bảo quản. Không màu nhân tạo. Vị cay tự nhiên thuần khiết.',
    ingredients: 'Ớt chỉ thiên, tỏi, muối, đường, giấm gạo.',
    usage: 'Dùng kèm các món luộc, nướng, chiên, phở, bún. Lắc đều trước khi dùng.',
    expiry: '12 tháng kể từ ngày sản xuất.',
    storage: 'Nơi khô mát, tránh ánh nắng. Sau khi mở nắp để trong tủ lạnh.',
  },
  {
    id: 'gao-seng-cu',
    name: 'Gạo Séng Cù',
    origin: 'Mường Khương, Lào Cai',
    price: 35000,
    unit: '/kg',
    img: null,
    placeholder: 'gạo séng cù',
    badge: null,
    tag: 'Đặc sản',
    short: 'Gạo đặc sản ruộng bậc thang. Hạt tròn, cơm dẻo thơm, ngọt tự nhiên.',
    desc: 'Giống gạo đặc sản của vùng đất Mường Khương, Lào Cai. Hạt tròn, cơm dẻo thơm, vị ngọt tự nhiên. Canh tác theo phương pháp truyền thống trên ruộng bậc thang. Không thuốc trừ sâu. Thu hoạch một vụ mỗi năm vào tháng 10–11.',
    ingredients: '100% gạo Séng Cù nguyên cám tự nhiên.',
    usage: 'Vo nhẹ, nấu với tỉ lệ nước vừa phải để giữ độ dẻo thơm.',
    expiry: '6 tháng kể từ ngày đóng gói.',
    storage: 'Nơi khô ráo, thoáng mát, tránh ẩm mốc.',
  },
  {
    id: 'tuong-ot-cay-dac-biet',
    name: 'Tương ớt cay đặc biệt 250g',
    origin: 'Mường Khương, Lào Cai',
    price: 55000,
    img: 'assets/img/tuong-ot-bottle.png',
    badge: null,
    tag: 'Cực cay',
    short: 'Phiên bản cay mạnh cho người sành ăn cay. Ớt chỉ thiên tuyển chọn.',
    desc: 'Phiên bản cay đậm dành cho người sành ăn cay. Tuyển chọn những trái ớt chỉ thiên cay nhất vùng Mường Khương, chế biến theo công thức truyền thống đậm đặc hơn. Không chất bảo quản, không màu nhân tạo.',
    ingredients: 'Ớt chỉ thiên tuyển chọn, tỏi, muối, đường, giấm gạo.',
    usage: 'Dùng lượng nhỏ cho các món cần vị cay mạnh. Lắc đều trước khi dùng.',
    expiry: '12 tháng kể từ ngày sản xuất.',
    storage: 'Nơi khô mát, tránh ánh nắng. Sau khi mở nắp để trong tủ lạnh.',
  },
  {
    id: 'combo-3-hu',
    name: 'Combo 3 hũ tương ớt',
    origin: 'Mường Khương, Lào Cai',
    price: 115000,
    oldPrice: 135000,
    img: 'assets/img/tuong-ot-bottle.png',
    badge: 'Tiết kiệm 15%',
    highlight: true,
    tag: 'Combo',
    short: 'Bộ 3 hũ tương ớt Mường Khương — quà biếu hoặc dùng dần cả nhà.',
    desc: 'Combo 3 hũ tương ớt Mường Khương 250g — lựa chọn tiết kiệm cho gia đình hoặc làm quà biếu đặc sản vùng cao. Đóng gói an toàn, giao toàn quốc.',
    ingredients: '3 hũ tương ớt Mường Khương 250g.',
    usage: 'Dùng kèm các món ăn hằng ngày. Bảo quản từng hũ theo hướng dẫn.',
    expiry: '12 tháng kể từ ngày sản xuất.',
    storage: 'Nơi khô mát, tránh ánh nắng. Sau khi mở nắp để trong tủ lạnh.',
  },
];

window.TRUST = [
  { k: 'OCOP 4★', v: 'Bộ NN&PTNT công nhận' },
  { k: '100% tự nhiên', v: 'Không chất bảo quản' },
  { k: 'Giao toàn quốc', v: 'GHN 2–3 ngày' },
  { k: 'HTX từ 2001', v: 'Hơn 20 năm gắn bó' },
];

window.WHY = [
  { t: 'OCOP 4 sao', d: 'Sản phẩm được Bộ NN&PTNT công nhận đạt chuẩn OCOP 4 sao của tỉnh Lào Cai.', icon: 'star' },
  { t: 'Truy xuất QR', d: 'Quét mã QR trên mỗi hũ để xem vùng trồng, ngày sản xuất và lô hàng.', icon: 'qr' },
  { t: 'Giao toàn quốc', d: 'Vận chuyển GHN 2–3 ngày, đóng gói an toàn, hỗ trợ COD tận nơi.', icon: 'truck' },
  { t: 'Hỗ trợ cộng đồng', d: 'Mỗi đơn hàng góp phần tạo thu nhập ổn định cho bà con xã viên HTX.', icon: 'hands' },
];

window.STEPS = ['Chọn sản phẩm', 'Giỏ hàng', 'Địa chỉ', 'Nhận hàng'];

window.fmt = (n) => n.toLocaleString('vi-VN') + 'đ';
