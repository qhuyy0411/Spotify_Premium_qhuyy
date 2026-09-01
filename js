/*
 * Script xử lý chặn quảng cáo và kích hoạt giao diện Premium cho Spotify trên Shadowrocket
 */

const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // 1. Mở khóa thuộc tính Premium trong tài khoản
    if (url.includes('/bootstrap/v1/bootstrap') || url.includes('/user-customization-service/v1/customize')) {
      if (obj.attributes) {
        obj.attributes.type = 'premium';
        obj.attributes.work_offline = 'true';
      }
    }

    // 2. Vô hiệu hóa cấu hình hiển thị quảng cáo
    if (url.includes('/ad-logic/') || url.includes('/ads/')) {
      obj = {}; // Xóa toàn bộ dữ liệu quảng cáo trả về
    }

    // 3. Xóa các vị trí đề xuất quảng cáo (Promoted content)
    if (obj.promotions) {
      delete obj.promotions;
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({ body });
  }
} else {
  $done({});
}
