// =========================================================
// FlightWatcher Admin Final Public 8.0
// Vanilla JS + jQuery + Fetch/Promise + MockAPI CRUD.
// =========================================================

const adminI18n = {
    vi: {
        page_title: 'FlightWatcher Admin Dashboard',
        nav_workspace: 'Không gian làm việc', nav_overview: 'Tổng quan', nav_editor: 'Biên tập chuyến bay', nav_data: 'Dữ liệu MockAPI', nav_system: 'Hệ thống', nav_public: 'Mở trang khách', nav_help: 'Hướng dẫn nhanh', nav_logout: 'Đăng xuất',
        dashboard_kicker: 'TRUNG TÂM ĐIỀU HÀNH', dashboard_title: 'Quản trị chuyến bay', open_public: 'Trang khách', account_role: 'Quản trị viên', signed_in_as: 'Đã đăng nhập an toàn', lock_admin: 'Khóa trang quản trị', logout: 'Đăng xuất', session_left: 'Phiên còn {time}', session_active: 'Phiên đăng nhập đang hoạt động', collapse_sidebar: 'Thu gọn thanh bên', expand_sidebar: 'Mở rộng thanh bên',
        api_checking: 'Đang kiểm tra', api_online: 'MockAPI hoạt động', api_offline: 'Mất kết nối API', api_excellent: 'Rất nhanh', api_good: 'Ổn định', api_slow: 'Phản hồi chậm', api_timeout: 'Quá thời gian', api_probe_now: 'vừa xong', api_live: 'LIVE', api_probe_seconds: '{seconds}s trước', data_valid: 'Bản ghi hợp lệ', data_invalid: 'Bản ghi cần làm sạch', data_airlines: 'Hãng đang khai thác', data_last_sync: 'Đồng bộ gần nhất', data_live_latency: 'Độ trễ trực tiếp',
        theme_auto: 'Tự động', theme_light: 'Sáng', theme_dark: 'Tối', theme_auto_hint: 'Theo thiết bị', theme_light_hint: 'Độ tương phản cao', theme_dark_hint: 'Dịu mắt ban đêm',
        smart_dashboard: 'Bảng điều khiển thông minh', welcome_title: 'Theo dõi dữ liệu và vận hành FlightWatcher trong một nơi', welcome_text: 'CRUD trực tiếp với MockAPI, kiểm tra chất lượng dữ liệu và cập nhật trang khách ngay lập tức.', refresh: 'Làm mới', add_flight: 'Thêm chuyến bay',
        stat_total: 'Tổng chuyến bay', stat_total_note: 'Dữ liệu hợp lệ', stat_avg: 'Giá trung bình', stat_avg_note: 'Toàn bộ chuyến', stat_watch: 'Đang theo dõi', stat_min: 'Giá thấp nhất', stat_min_note: 'Chưa có dữ liệu',
        analysis: 'PHÂN TÍCH', price_by_airline: 'Mức giá trung bình theo hãng', loading_data: 'Đang tải dữ liệu...', insights: 'THÔNG TIN NHANH', system_insights: 'Chất lượng hệ thống', cheapest_route: 'Tuyến rẻ nhất', watch_rate: 'Tỷ lệ theo dõi', available_seats: 'Tổng ghế còn', data_quality: 'Chất lượng dữ liệu', quality_good: 'Tốt', quality_warning: 'Cần làm sạch',
        editor: 'BIÊN TẬP', form_add_title: 'Thêm chuyến bay mới', form_edit_title: 'Chỉnh sửa chuyến bay', form_basic: 'Thông tin cơ bản', form_schedule: 'Lịch trình & giá', form_service: 'Dịch vụ & hiển thị',
        airline: 'Hãng hàng không', airline_required: 'Vui lòng chọn hãng bay.', flight_code: 'Mã chuyến bay', route: 'Tuyến bay', route_invalid: 'Nhập theo dạng Điểm đi - Điểm đến.', current_price: 'Giá hiện hành', target_price: 'Giá mục tiêu', flight_date: 'Ngày bay', date_required: 'Vui lòng chọn ngày bay.', departure_time: 'Cất cánh', arrival_time: 'Hạ cánh', time_required: 'Nhập giờ.', image_url: 'URL ảnh chuyến bay', cabin: 'Hạng ghế', baggage: 'Hành lý', baggage_required: 'Vui lòng nhập hành lý.', seats: 'Số ghế trống', seats_invalid: 'Số ghế phải từ 0 trở lên.', rating: 'Đánh giá', rating_invalid: 'Đánh giá từ 1 đến 5.', booking_url: 'Link đặt vé', note: 'Ghi chú', tracking: 'Kích hoạt theo dõi giá', tracking_hint: 'Đánh dấu chuyến bay ưu tiên trên trang khách', save: 'Lưu dữ liệu', cancel_edit: 'Hủy chỉnh sửa',
        live_data: 'DỮ LIỆU TRỰC TIẾP', mockapi_data: 'Danh sách chuyến bay MockAPI', export_json: 'Xuất JSON', sync_sample: 'Đồng bộ mẫu', search_placeholder: 'Tìm mã, tuyến hoặc hãng bay...', all_airlines: 'Tất cả hãng', all_status: 'Tất cả trạng thái', watching: 'Đang theo dõi', not_watching: 'Chưa theo dõi', sort_newest: 'Mới nhất', sort_price_asc: 'Giá tăng dần', sort_price_desc: 'Giá giảm dần', sort_date: 'Ngày bay gần nhất', checking_data: 'Đang kiểm tra chất lượng dữ liệu...',
        th_flight: 'Chuyến bay', th_route: 'Tuyến & lịch', th_current: 'Giá hiện tại', th_target: 'Mục tiêu', th_availability: 'Tình trạng', th_tracking: 'Theo dõi', th_actions: 'Thao tác',
        delete_title: 'Xóa chuyến bay?', delete_text: 'Dữ liệu sẽ bị xóa trực tiếp khỏi MockAPI và không thể hoàn tác.', cancel: 'Hủy', delete: 'Xóa',
        delete_all: 'Xóa toàn bộ', delete_all_title: 'Xóa toàn bộ chuyến bay?', delete_all_text: 'Tất cả dữ liệu trong resource Flights sẽ bị xóa vĩnh viễn khỏi MockAPI.', delete_all_summary: 'Hệ thống sẽ xóa {count} bản ghi hiện có. Thao tác này không thể hoàn tác.', delete_all_understand: 'Tôi hiểu rằng toàn bộ chuyến bay sẽ bị xóa khỏi MockAPI và trang khách sẽ không còn dữ liệu.', delete_all_confirm: 'Xóa toàn bộ', delete_all_empty: 'MockAPI hiện không có chuyến bay để xóa.', deleting_all: 'Đang xóa {deleted}/{total}...', delete_all_success: 'Đã xóa toàn bộ {count} chuyến bay.', delete_all_error: 'Không thể xóa toàn bộ dữ liệu. Đã xóa {deleted}/{total} bản ghi.',
        operation_kicker: 'XÁC NHẬN THAO TÁC', continue_action: 'Tiếp tục', sync_title: 'Đồng bộ dữ liệu mẫu?', sync_text: 'Hệ thống sẽ làm sạch bản ghi tự sinh và bổ sung các chuyến bay mẫu còn thiếu.', sync_summary: 'Dữ liệu hợp lệ hiện tại vẫn được giữ lại; chỉ bản ghi rác bị xóa và mã chuyến còn thiếu mới được thêm.', sync_understand: 'Tôi đã kiểm tra kết nối MockAPI và muốn tiếp tục đồng bộ.',
        toast_success_title: 'Thành công', toast_error_title: 'Có lỗi xảy ra', toast_warning_title: 'Cần chú ý', toast_info_title: 'Thông báo',
        quick_guide: 'HƯỚNG DẪN NHANH', help_title: 'Vận hành trang quản trị', help_1_title: 'Kiểm tra kết nối', help_1_text: 'Quan sát trạng thái MockAPI trên thanh trên cùng trước khi thao tác.', help_2_title: 'Nhập dữ liệu hợp lệ', help_2_text: 'Hoàn thành các trường bắt buộc và xử lý lỗi inline trước khi lưu.', help_3_title: 'Đồng bộ dữ liệu mẫu', help_3_text: 'Dùng nút Đồng bộ mẫu khi MockAPI có bản ghi tự sinh không hợp lệ.', help_4_title: 'Kiểm tra trang khách', help_4_text: 'Mở trang khách và tải lại để xác nhận dữ liệu đã cập nhật.',
        select_airline: '-- Chọn hãng --', rows: '{count} chuyến bay', updated: 'Cập nhật {time}', no_data: 'Không có dữ liệu phù hợp.', invalid_records: 'MockAPI có {count} bản ghi tự sinh. Hãy đồng bộ dữ liệu mẫu.', data_clean: 'Dữ liệu sạch và sẵn sàng hiển thị trên trang khách.', sync_warning: 'Có {count} bản ghi tự sinh không hợp lệ. Dùng “Đồng bộ mẫu” để làm sạch.',
        seats_unit: 'ghế', watch_badge: 'Theo dõi', edit: 'Sửa', remove: 'Xóa', available: 'Còn chỗ', low_seats: 'Sắp hết', sold_out: 'Hết chỗ',
        validation_error: 'Vui lòng kiểm tra các trường đang báo lỗi.', code_format: 'Mã chuyến bay phải dạng VN-213, VJ-123...', code_duplicate: 'Mã chuyến bay này đã tồn tại.', target_invalid: 'Giá mục tiêu không nên cao hơn quá nhiều so với giá hiện tại.', current_invalid: 'Giá vé phải lớn hơn 0.', image_invalid: 'URL ảnh phải bắt đầu bằng http hoặc https.', booking_invalid: 'Link đặt vé phải hợp lệ.',
        saving: 'Đang lưu...', create_success: 'Thêm chuyến bay thành công.', update_success: 'Cập nhật chuyến bay thành công.', save_error: 'Không lưu được dữ liệu. Kiểm tra MockAPI hoặc mạng.', load_error: 'Không tải được dữ liệu MockAPI.', delete_success: 'Xóa dữ liệu thành công.', delete_error: 'Không thể xóa dữ liệu.', export_success: 'Đã xuất file JSON.', sync_confirm: 'Đồng bộ sẽ xóa dữ liệu rác tự sinh và nạp bộ dữ liệu mẫu. Tiếp tục?', syncing: 'Đang đồng bộ...', sync_success: 'Đồng bộ xong: xóa {deleted} dữ liệu rác, thêm {created} chuyến bay.', sync_error: 'Đồng bộ thất bại. Kiểm tra endpoint hoặc mạng.', refreshed: 'Đã làm mới dữ liệu.', reset_done: 'Đã đặt lại biểu mẫu.'
    },
    en: {
        page_title: 'FlightWatcher Admin Dashboard',
        nav_workspace: 'Workspace', nav_overview: 'Overview', nav_editor: 'Flight editor', nav_data: 'MockAPI data', nav_system: 'System', nav_public: 'Open public site', nav_help: 'Quick guide', nav_logout: 'Sign out',
        dashboard_kicker: 'OPERATIONS CENTER', dashboard_title: 'Flight administration', open_public: 'Public site', account_role: 'Administrator', signed_in_as: 'Securely signed in', lock_admin: 'Lock admin console', logout: 'Sign out', session_left: 'Session: {time} left', session_active: 'Active authenticated session', collapse_sidebar: 'Collapse sidebar', expand_sidebar: 'Expand sidebar',
        api_checking: 'Checking', api_online: 'MockAPI online', api_offline: 'API unavailable', api_excellent: 'Excellent', api_good: 'Stable', api_slow: 'Slow response', api_timeout: 'Timed out', api_probe_now: 'just now', api_live: 'LIVE', api_probe_seconds: '{seconds}s ago', data_valid: 'Valid records', data_invalid: 'Records to clean', data_airlines: 'Active airlines', data_last_sync: 'Last synchronization', data_live_latency: 'Live latency',
        theme_auto: 'Auto', theme_light: 'Light', theme_dark: 'Dark', theme_auto_hint: 'Follow device', theme_light_hint: 'High contrast', theme_dark_hint: 'Comfortable at night',
        smart_dashboard: 'Smart dashboard', welcome_title: 'Monitor data and operate FlightWatcher in one place', welcome_text: 'Run CRUD operations against MockAPI, validate data quality, and update the public site instantly.', refresh: 'Refresh', add_flight: 'Add flight',
        stat_total: 'Total flights', stat_total_note: 'Valid records', stat_avg: 'Average fare', stat_avg_note: 'Across all flights', stat_watch: 'Price watches', stat_min: 'Lowest fare', stat_min_note: 'No data yet',
        analysis: 'ANALYTICS', price_by_airline: 'Average fare by airline', loading_data: 'Loading data...', insights: 'QUICK INSIGHTS', system_insights: 'System quality', cheapest_route: 'Cheapest route', watch_rate: 'Tracking rate', available_seats: 'Available seats', data_quality: 'Data quality', quality_good: 'Good', quality_warning: 'Cleanup needed',
        editor: 'EDITOR', form_add_title: 'Add a new flight', form_edit_title: 'Edit flight', form_basic: 'Basic information', form_schedule: 'Schedule & fares', form_service: 'Service & display',
        airline: 'Airline', airline_required: 'Please select an airline.', flight_code: 'Flight code', route: 'Route', route_invalid: 'Use the format Origin - Destination.', current_price: 'Current fare', target_price: 'Target fare', flight_date: 'Flight date', date_required: 'Please choose a flight date.', departure_time: 'Departure', arrival_time: 'Arrival', time_required: 'Time is required.', image_url: 'Flight image URL', cabin: 'Cabin class', baggage: 'Baggage', baggage_required: 'Please enter baggage information.', seats: 'Available seats', seats_invalid: 'Seats must be zero or higher.', rating: 'Rating', rating_invalid: 'Rating must be between 1 and 5.', booking_url: 'Booking URL', note: 'Notes', tracking: 'Enable fare tracking', tracking_hint: 'Highlight this flight on the public page', save: 'Save data', cancel_edit: 'Cancel editing',
        live_data: 'LIVE DATA', mockapi_data: 'MockAPI flight records', export_json: 'Export JSON', sync_sample: 'Sync samples', search_placeholder: 'Search code, route, or airline...', all_airlines: 'All airlines', all_status: 'All tracking states', watching: 'Tracked', not_watching: 'Not tracked', sort_newest: 'Newest first', sort_price_asc: 'Fare: low to high', sort_price_desc: 'Fare: high to low', sort_date: 'Nearest flight date', checking_data: 'Checking data quality...',
        th_flight: 'Flight', th_route: 'Route & schedule', th_current: 'Current fare', th_target: 'Target', th_availability: 'Availability', th_tracking: 'Tracking', th_actions: 'Actions',
        delete_title: 'Delete this flight?', delete_text: 'The record will be removed directly from MockAPI and cannot be restored.', cancel: 'Cancel', delete: 'Delete',
        quick_guide: 'QUICK GUIDE', help_title: 'Operating the admin console', help_1_title: 'Check connectivity', help_1_text: 'Confirm the MockAPI status in the top bar before making changes.', help_2_title: 'Enter valid data', help_2_text: 'Complete required fields and resolve inline validation errors before saving.', help_3_title: 'Sync sample data', help_3_text: 'Use Sync samples when MockAPI contains invalid generated records.', help_4_title: 'Verify the public page', help_4_text: 'Open the public site and refresh it to confirm your updates.',
        select_airline: '-- Select airline --', rows: '{count} flights', updated: 'Updated {time}', no_data: 'No matching records.', invalid_records: 'MockAPI contains {count} generated records. Sync the sample data.', data_clean: 'Data is clean and ready for the public page.', sync_warning: '{count} invalid generated records found. Use “Sync samples” to clean them.',
        seats_unit: 'seats', watch_badge: 'Tracked', edit: 'Edit', remove: 'Delete', available: 'Available', low_seats: 'Limited', sold_out: 'Sold out',
        validation_error: 'Please review the highlighted fields.', code_format: 'Use a code such as VN-213 or VJ-123.', code_duplicate: 'This flight code already exists.', target_invalid: 'The target fare should not be much higher than the current fare.', current_invalid: 'The current fare must be greater than zero.', image_invalid: 'The image URL must start with http or https.', booking_invalid: 'Please enter a valid booking URL.',
        saving: 'Saving...', create_success: 'Flight created successfully.', update_success: 'Flight updated successfully.', save_error: 'The record could not be saved. Check MockAPI or your connection.', load_error: 'MockAPI data could not be loaded.', delete_success: 'Record deleted successfully.', delete_error: 'The record could not be deleted.', export_success: 'JSON file exported.', sync_confirm: 'Syncing will remove invalid generated records and load sample flights. Continue?', syncing: 'Synchronizing...', sync_success: 'Sync complete: removed {deleted} invalid records and added {created} flights.', sync_error: 'Synchronization failed. Check the endpoint or connection.', refreshed: 'Data refreshed.', reset_done: 'The form has been reset.'
    }
};

let adminLang = localStorage.getItem('lang') || 'vi';
let currentFlights = [];
let displayedFlights = [];
let mockapiGeneratedCount = 0;
let rawFlightCount = 0;
let deleteModal = null;
let bulkActionModal = null;
let pendingBulkAction = null;
let currentThemeMode = 'auto';
let lastLoadAt = null;
let apiMonitorTimer = null;
let apiAgeTimer = null;
let apiProbeInFlight = false;
let apiLastProbeAt = 0;
let apiLatencySamples = [];
let apiCurrentStatus = 'checking';
let apiCurrentLatency = null;
const API_MONITOR_INTERVAL = 2000;
const API_MONITOR_TIMEOUT = 5000;
const ADMIN_LOCALES = { vi:'vi-VN', en:'en-US', zh:'zh-CN', de:'de-DE', ru:'ru-RU', th:'th-TH' };
const getAdminLocale = () => ADMIN_LOCALES[adminLang] || 'vi-VN';

function t(key, vars = {}) {
    let value = adminI18n[adminLang]?.[key] || adminI18n.vi[key] || key;
    Object.entries(vars).forEach(([name, replacement]) => {
        value = String(value).replaceAll(`{${name}}`, String(replacement));
    });
    return value;
}

function normalize(f) {
    if (!f || (typeof isGeneratedMockRecord === 'function' && isGeneratedMockRecord(f))) return null;
    return {
        id: f.id,
        airline: f.Hang || f.HangBay || f.airline || 'N/A',
        flightCode: f.ChuyenBay || f.MaChuyenBay || f.flightCode || '---',
        route: f.TuyenBay || f.ChangBay || f.route || 'N/A - N/A',
        currentPrice: Number(f.GiaHienTai || f.GiaHienHanh || f.currentPrice || 0),
        targetPrice: Number(f.GiaMucTieu || f.targetPrice || 0),
        imageUrl: f.Anh || f.image || f.imageUrl || '',
        flightDate: f.NgayBay || f.ngayBay || f.flightDate || '',
        departureTime: f.GioCatCanh || f.departureTime || '08:30',
        arrivalTime: f.GioHaCanh || f.arrivalTime || '10:45',
        isPriority: f.UuTien === true || f.UuTien === 'true' || f.isPriority === true || f.isPriority === 'true',
        cabin: f.HangGhe || f.cabin || 'Phổ thông',
        baggage: f.HanhLy || f.baggage || '7kg xách tay',
        seats: Number(f.SoGheTrong ?? f.seats ?? 10),
        rating: Number(f.DiemDanhGia || f.rating || 4.5),
        status: f.TrangThai || f.status || 'Đang mở bán',
        bookingUrl: f.LinkDatVe || f.bookingUrl || '#',
        note: f.GhiChu || f.note || ''
    };
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
        return false;
    }
}

function isValidImageSource(value) {
    const source = String(value || '').trim();
    if (/^(?:\.\/)?img\/[a-z0-9_\-./]+$/i.test(source)) return true;
    return isValidUrl(source);
}

function getAdminDestinationImage(route) {
    const raw = String(route || '');
    const r = removeVietnameseAccent(raw);
    const destination = r.split('-').pop()?.trim() || r;
    const has = (...keys) => keys.some(key => destination.includes(key) || r.includes(key));
    if (has('singapore', ' sin')) return 'https://images.unsplash.com/photo-1652483614757-1c7d1aafa996?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('bangkok', ' bkk')) return 'https://images.unsplash.com/photo-1609763252108-b727080cdd4f?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('seoul', ' icn')) return 'https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('tokyo', ' nrt', ' hnd')) return 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('taipei', ' tpe')) return 'https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('da lat', ' dli')) return 'https://images.unsplash.com/photo-1638555063519-d009e6f3b28b?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('phu quoc', ' pqc')) return 'https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('nha trang', 'cam ranh', ' cxr')) return 'https://images.unsplash.com/photo-1572198404182-2c115d89fb26?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('da nang', ' dad')) return 'https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('hue', ' hui')) return 'https://images.unsplash.com/photo-1677662483863-26855f4d5246?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('hai phong', ' hph')) return 'https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('quy nhon', ' uih')) return 'https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('can tho', ' vca')) return 'https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('ho chi minh', 'sai gon', ' sgn')) return 'https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    if (has('ha noi', ' han')) return 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600';
    return 'https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600';
}

function removeVietnameseAccent(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || '--';
    return new Intl.DateTimeFormat(getAdminLocale(), { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function toInputDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
}

function updateAdminLanguage(lang) {
    adminLang = adminI18n[lang] ? lang : 'vi';
    localStorage.setItem('lang', adminLang);
    document.documentElement.lang = adminLang;
    document.title = t('page_title');
    const selector = document.getElementById('admin-lang-selector');
    if (selector) selector.value = adminLang;

    document.querySelectorAll('[data-admin-i18n]').forEach(element => {
        element.textContent = t(element.dataset.adminI18n);
    });
    document.querySelectorAll('[data-admin-i18n-placeholder]').forEach(element => {
        element.placeholder = t(element.dataset.adminI18nPlaceholder);
    });
    updateThemeUI(currentThemeMode);
    window.updateAdminSessionUI?.();
    setSidebarCollapsed(document.body.classList.contains('admin-sidebar-collapsed'), false);
    const formId = document.getElementById('flight-id')?.value;
    const formTitle = document.getElementById('form-title');
    if (formTitle) formTitle.textContent = formId ? t('form_edit_title') : t('form_add_title');
    const cabinSelect = document.getElementById('cabin-class');
    if (cabinSelect) {
        const labels = adminLang === 'en' ? ['Economy', 'Premium economy', 'Business'] : ['Phổ thông', 'Phổ thông đặc biệt', 'Thương gia'];
        [...cabinSelect.options].forEach((option, index) => { if (labels[index]) option.textContent = labels[index]; });
    }
    populateFilterOptions();
    updateStats(currentFlights);
    renderInsights(currentFlights);
    applyAdminFilters(false);
    refreshActiveSectionLabel();
    setAPIStatus(apiCurrentStatus, apiCurrentLatency);
    updateAPIAge();
}

function resolveTheme(mode) {
    if (mode === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return mode === 'dark' ? 'dark' : 'light';
}

function applyThemeMode(mode, persist = true) {
    currentThemeMode = ['auto', 'light', 'dark'].includes(mode) ? mode : 'auto';
    const resolved = resolveTheme(currentThemeMode);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-mode', currentThemeMode);
    document.body.setAttribute('data-theme', resolved);
    document.body.setAttribute('data-theme-mode', currentThemeMode);
    document.documentElement.style.colorScheme = resolved;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = resolved === 'dark' ? '#08111f' : '#f6f8fc';
    if (persist) {
        localStorage.setItem('theme_mode', currentThemeMode);
        localStorage.setItem('theme', resolved);
    }
    updateThemeUI(currentThemeMode);
}

function updateThemeUI(mode) {
    const resolved = resolveTheme(mode);
    const icon = document.getElementById('admin-theme-icon');
    const label = document.getElementById('admin-theme-label');
    const iconClass = mode === 'auto' ? 'fa-circle-half-stroke' : (resolved === 'dark' ? 'fa-moon' : 'fa-sun');
    if (icon) icon.className = `fa-solid ${iconClass}`;
    if (label) label.textContent = t(`theme_${mode}`);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.themeOption === mode);
    });
}

function setupSmartTheme() {
    const legacy = localStorage.getItem('theme');
    const saved = localStorage.getItem('theme_mode') || (legacy === 'dark' || legacy === 'light' ? legacy : 'auto');
    applyThemeMode(saved, false);
    document.querySelectorAll('.theme-option').forEach(option => option.addEventListener('click', () => applyThemeMode(option.dataset.themeOption)));
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => { if (currentThemeMode === 'auto') applyThemeMode('auto', false); };
    if (typeof media.addEventListener === 'function') media.addEventListener('change', listener);
    else if (typeof media.addListener === 'function') media.addListener(listener);
}

function formatSessionTime(milliseconds) {
    const totalMinutes = Math.max(0, Math.ceil(Number(milliseconds || 0) / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (adminLang !== 'vi') return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
}

function setupAdminAuth() {
    if (!window.FlightWatcherAuth) return false;
    const session = FlightWatcherAuth.requireAuth();
    if (!session) return false;

    const userElements = ['admin-auth-user', 'admin-account-name', 'sidebar-user-name'];
    userElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = session.username;
    });

    const updateSessionUI = () => {
        const remaining = FlightWatcherAuth.getSessionRemaining();
        if (remaining <= 0) {
            FlightWatcherAuth.logout('expired');
            return;
        }
        const formatted = formatSessionTime(remaining);
        const menuValue = document.getElementById('admin-session-remaining');
        const sidebarValue = document.getElementById('sidebar-session-expiry');
        if (menuValue) menuValue.textContent = t('session_left', { time: formatted });
        if (sidebarValue) sidebarValue.textContent = t('session_left', { time: formatted });
    };

    const logout = () => FlightWatcherAuth.logout('logout');
    const lock = () => FlightWatcherAuth.logout('locked');
    document.getElementById('admin-logout')?.addEventListener('click', logout);
    document.getElementById('sidebar-logout')?.addEventListener('click', logout);
    document.getElementById('admin-lock')?.addEventListener('click', lock);
    updateSessionUI();
    window.setInterval(updateSessionUI, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) updateSessionUI(); });
    window.addEventListener('storage', event => {
        if (event.key === 'fw_admin_persistent_session' && !FlightWatcherAuth.isAuthenticated()) lock();
    });
    window.updateAdminSessionUI = updateSessionUI;
    return true;
}

function setSidebarCollapsed(collapsed, persist = true) {
    const desktop = window.matchMedia('(min-width: 1200px)').matches;
    const shouldCollapse = Boolean(collapsed && desktop);
    document.body.classList.toggle('admin-sidebar-collapsed', shouldCollapse);
    const buttons = [document.getElementById('sidebar-collapse-btn'), document.getElementById('admin-sidebar-toggle')];
    buttons.forEach(button => {
        if (!button) return;
        button.setAttribute('aria-label', t(shouldCollapse ? 'expand_sidebar' : 'collapse_sidebar'));
        button.setAttribute('title', t(shouldCollapse ? 'expand_sidebar' : 'collapse_sidebar'));
    });
    const icon = document.querySelector('#sidebar-collapse-btn i');
    if (icon) icon.className = `fa-solid ${shouldCollapse ? 'fa-angles-right' : 'fa-angles-left'}`;
    const topbarIcon = document.querySelector('#admin-sidebar-toggle i');
    if (topbarIcon) topbarIcon.className = `fa-solid ${shouldCollapse ? 'fa-indent' : 'fa-bars-staggered'}`;
    buttons.forEach(button => button?.setAttribute('aria-expanded', String(!shouldCollapse)));
    document.querySelectorAll('.admin-nav-link[data-section-link]').forEach(link => {
        const key = ADMIN_SECTION_KEYS?.[link.dataset.sectionLink];
        if (key) link.title = t(key);
    });
    if (persist) localStorage.setItem('admin_sidebar_collapsed', shouldCollapse ? '1' : '0');
}

const ADMIN_SECTION_KEYS = Object.freeze({
    overview: 'nav_overview',
    'flight-editor': 'nav_editor',
    'flight-data': 'nav_data'
});

let activeAdminSectionId = 'overview';
let adminScrollFrame = 0;
let adminSectionArrivalTimer = 0;

function refreshActiveSectionLabel() {
    const label = document.getElementById('admin-current-section');
    const key = ADMIN_SECTION_KEYS[activeAdminSectionId] || ADMIN_SECTION_KEYS.overview;
    if (label) label.textContent = t(key);
}

function setActiveAdminSection(sectionId, options = {}) {
    const { updateHash = false, focus = false, announce = true } = options;
    if (!ADMIN_SECTION_KEYS[sectionId]) sectionId = 'overview';
    activeAdminSectionId = sectionId;

    document.querySelectorAll('.admin-nav-link[data-section-link]').forEach(link => {
        const active = link.dataset.sectionLink === sectionId;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });

    if (announce) refreshActiveSectionLabel();

    if (updateHash && window.location.hash !== `#${sectionId}`) {
        history.pushState({ adminSection: sectionId }, '', `#${sectionId}`);
    }

    const target = document.getElementById(sectionId);
    if (focus && target) {
        window.clearTimeout(adminSectionArrivalTimer);
        target.classList.remove('admin-section-arrival');
        // Restart the animation even when the same section is selected twice.
        void target.offsetWidth;
        target.classList.add('admin-section-arrival');
        adminSectionArrivalTimer = window.setTimeout(() => target.classList.remove('admin-section-arrival'), 1100);
    }
}

function getAdminScrollOffset() {
    const topbar = document.querySelector('.admin-topbar');
    return (topbar?.offsetHeight || 72) + 28;
}

function scrollToAdminSection(sectionId, options = {}) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - getAdminScrollOffset());
    setActiveAdminSection(sectionId, {
        updateHash: options.updateHash !== false,
        focus: true
    });
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });

    window.setTimeout(() => {
        try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); }
    }, reduceMotion ? 0 : 420);
}

function detectAdminSectionFromScroll() {
    const sections = Object.keys(ADMIN_SECTION_KEYS)
        .map(id => document.getElementById(id))
        .filter(Boolean);
    if (!sections.length) return;

    const marker = window.scrollY + getAdminScrollOffset() + 36;
    let selected = sections[0].id;
    for (const section of sections) {
        if (section.offsetTop <= marker) selected = section.id;
        else break;
    }

    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (nearBottom) selected = sections.at(-1).id;
    setActiveAdminSection(selected, { announce: true });
}

function setupSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('admin-sidebar-backdrop');
    const mobileToggle = document.getElementById('admin-menu-toggle');
    const collapseButtons = [document.getElementById('sidebar-collapse-btn'), document.getElementById('admin-sidebar-toggle')].filter(Boolean);
    const sectionLinks = [...document.querySelectorAll('.admin-nav-link[data-section-link]')];

    const close = () => {
        document.body.classList.remove('admin-sidebar-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    };

    if (mobileToggle) mobileToggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('admin-sidebar-open');
        mobileToggle.setAttribute('aria-expanded', String(open));
    });
    if (backdrop) backdrop.addEventListener('click', close);

    sectionLinks.forEach(link => {
        const text = link.querySelector('span')?.textContent?.trim();
        if (text) link.title = text;
        link.addEventListener('click', event => {
            event.preventDefault();
            const sectionId = link.dataset.sectionLink;
            scrollToAdminSection(sectionId, { updateHash: true });
            close();
        });
    });

    setSidebarCollapsed(localStorage.getItem('admin_sidebar_collapsed') === '1', false);
    collapseButtons.forEach(button => button.addEventListener('click', () => {
        setSidebarCollapsed(!document.body.classList.contains('admin-sidebar-collapsed'));
    }));

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1200) document.body.classList.remove('admin-sidebar-collapsed');
        else setSidebarCollapsed(localStorage.getItem('admin_sidebar_collapsed') === '1', false);
        detectAdminSectionFromScroll();
    });

    window.addEventListener('scroll', () => {
        if (adminScrollFrame) return;
        adminScrollFrame = window.requestAnimationFrame(() => {
            adminScrollFrame = 0;
            detectAdminSectionFromScroll();
        });
    }, { passive: true });

    const handleHistoryNavigation = () => {
        const sectionId = window.location.hash.slice(1);
        if (ADMIN_SECTION_KEYS[sectionId]) scrollToAdminSection(sectionId, { updateHash: false });
        else setActiveAdminSection('overview', { announce: true });
    };
    window.addEventListener('popstate', handleHistoryNavigation);
    window.addEventListener('hashchange', handleHistoryNavigation);

    const initialSection = window.location.hash.slice(1);
    if (ADMIN_SECTION_KEYS[initialSection]) {
        window.setTimeout(() => scrollToAdminSection(initialSection, { updateHash: false }), 120);
    } else {
        setActiveAdminSection('overview', { announce: true });
        detectAdminSectionFromScroll();
    }

    // Expose the navigator for edit buttons and keyboard shortcuts.
    window.navigateAdminSection = scrollToAdminSection;
}

function setupAdminShortcuts() {
    document.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            document.getElementById('admin-search')?.focus();
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') {
            event.preventDefault();
            resetForm(false);
            window.navigateAdminSection?.('flight-editor', { updateHash: true });
            window.setTimeout(() => document.getElementById('airline')?.focus(), 450);
        }
        if (event.key === 'Escape') {
            document.body.classList.remove('admin-sidebar-open');
            document.getElementById('admin-menu-toggle')?.setAttribute('aria-expanded', 'false');
        }
    });
}

function createPayloadFromForm() {
    const seats = Number(document.getElementById('seats').value || 0);
    const status = seats <= 0 ? 'Hết chỗ' : (seats <= 10 ? 'Sắp hết chỗ' : 'Đang mở bán');
    return {
        HangBay: document.getElementById('airline').value,
        MaChuyenBay: document.getElementById('flight-code').value.trim().toUpperCase(),
        TuyenBay: document.getElementById('flight-route').value.trim(),
        GiaHienTai: Number(document.getElementById('current-price').value),
        GiaMucTieu: Number(document.getElementById('target-price').value),
        Anh: document.getElementById('image-url').value.trim() || getAdminDestinationImage(document.getElementById('flight-route').value.trim()),
        NgayBay: document.getElementById('flight-date').value,
        GioCatCanh: document.getElementById('departure-time').value,
        GioHaCanh: document.getElementById('arrival-time').value,
        UuTien: document.getElementById('is-priority').checked,
        HangGhe: document.getElementById('cabin-class').value,
        HanhLy: document.getElementById('baggage').value.trim(),
        SoGheTrong: seats,
        DiemDanhGia: Number(document.getElementById('rating').value || 4.5),
        TrangThai: status,
        LinkDatVe: document.getElementById('booking-url').value.trim(),
        GhiChu: document.getElementById('note').value.trim()
    };
}

function validateForm(formId) {
    let valid = true;
    const ids = ['airline', 'flight-code', 'flight-route', 'current-price', 'target-price', 'flight-date', 'departure-time', 'arrival-time', 'image-url', 'baggage', 'seats', 'rating', 'booking-url'];
    ids.forEach(id => document.getElementById(id)?.classList.remove('is-invalid'));

    const airline = document.getElementById('airline');
    const code = document.getElementById('flight-code');
    const route = document.getElementById('flight-route');
    const currentPrice = document.getElementById('current-price');
    const targetPrice = document.getElementById('target-price');
    const image = document.getElementById('image-url');
    const booking = document.getElementById('booking-url');
    const date = document.getElementById('flight-date');
    const dep = document.getElementById('departure-time');
    const arr = document.getElementById('arrival-time');
    const baggage = document.getElementById('baggage');
    const seats = document.getElementById('seats');
    const rating = document.getElementById('rating');

    const invalidate = element => { element.classList.add('is-invalid'); valid = false; };
    if (!airline.value) invalidate(airline);

    const codeValue = code.value.trim().toUpperCase();
    const codeError = document.getElementById('err-code');
    if (!/^[A-Z]{2}-?\d{2,5}$/.test(codeValue)) {
        codeError.textContent = t('code_format');
        invalidate(code);
    } else if (currentFlights.some(f => f.flightCode.toUpperCase() === codeValue && String(f.id) !== String(formId))) {
        codeError.textContent = t('code_duplicate');
        invalidate(code);
    }

    if (!route.value.includes('-') || route.value.split('-').filter(part => part.trim()).length < 2) invalidate(route);
    if (Number(currentPrice.value) <= 0) { document.getElementById('err-curr-price').textContent = t('current_invalid'); invalidate(currentPrice); }
    if (Number(targetPrice.value) <= 0 || Number(targetPrice.value) > Number(currentPrice.value) * 1.5) { document.getElementById('err-target-price').textContent = t('target_invalid'); invalidate(targetPrice); }
    if (!date.value) invalidate(date);
    if (!dep.value) invalidate(dep);
    if (!arr.value) invalidate(arr);
    if (image.value.trim() && !isValidImageSource(image.value.trim())) { document.getElementById('err-image').textContent = t('image_invalid'); invalidate(image); }
    if (!booking.value || !isValidUrl(booking.value)) { document.getElementById('err-booking').textContent = t('booking_invalid'); invalidate(booking); }
    if (!baggage.value.trim()) invalidate(baggage);
    if (seats.value === '' || Number(seats.value) < 0) invalidate(seats);
    if (rating.value === '' || Number(rating.value) < 1 || Number(rating.value) > 5) invalidate(rating);

    if (!valid) {
        showToast(t('validation_error'), 'warning');
        document.querySelector('.is-invalid')?.focus({ preventScroll: false });
    }
    return valid;
}

function loadAirlinesDropdown() {
    return new Promise(resolve => {
        getAirlines().done(data => {
            const select = $('#airline');
            const current = select.val();
            select.html(`<option value="">${escapeHTML(t('select_airline'))}</option>`);
            data.forEach(item => {
                const name = item.HangBay || item.name || item.airline;
                if (name) select.append(`<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`);
            });
            if (current) select.val(current);
            resolve(data);
        });
    });
}

function getLatencyQuality(latency) {
    if (!Number.isFinite(latency)) return { key: 'api_timeout', className: 'offline' };
    if (latency <= 350) return { key: 'api_excellent', className: 'excellent' };
    if (latency <= 900) return { key: 'api_good', className: 'good' };
    return { key: 'api_slow', className: 'slow' };
}

function renderLatencySparkline() {
    const host = document.getElementById('api-latency-chart');
    if (!host) return;
    const values = apiLatencySamples.slice(-12);
    if (!values.length) {
        host.innerHTML = '<span></span><span></span><span></span><span></span><span></span>';
        host.removeAttribute('title');
        return;
    }
    const max = Math.max(...values, 1);
    const min = Math.min(...values);
    const average = Math.round(values.reduce((total, value) => total + value, 0) / values.length);
    host.title = `Min ${min} ms · Avg ${average} ms · Max ${max} ms`;
    host.setAttribute('aria-label', host.title);
    host.innerHTML = values.map(value => {
        const height = Math.max(18, Math.round(value / max * 100));
        return `<span style="--bar-height:${height}%" title="${value} ms" aria-hidden="true"></span>`;
    }).join('');
}

function updateAPIAge() {
    const element = document.getElementById('api-probe-age');
    if (!element) return;
    if (!apiLastProbeAt) {
        element.textContent = '--';
        return;
    }
    const seconds = Math.max(0, Math.floor((Date.now() - apiLastProbeAt) / 1000));
    element.textContent = seconds < 2 ? t('api_probe_now') : t('api_probe_seconds', { seconds });
}

async function checkAPIHealth(options = {}) {
    if (apiProbeInFlight) return false;
    apiProbeInFlight = true;
    const started = performance.now();
    if (!options.silent) setAPIStatus('checking');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), API_MONITOR_TIMEOUT);
    try {
        const separator = API_URL.includes('?') ? '&' : '?';
        const response = await fetch(`${API_URL}${separator}page=1&limit=1&_probe=${Date.now()}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            cache: 'no-store',
            headers: { Accept: 'application/json' },
            signal: controller.signal
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        await response.json();
        const latency = Math.round(performance.now() - started);
        apiLastProbeAt = Date.now();
        apiLatencySamples.push(latency);
        apiLatencySamples = apiLatencySamples.slice(-12);
        setAPIStatus('online', latency);
        renderLatencySparkline();
        updateAPIAge();
        return true;
    } catch (error) {
        console.warn('MockAPI health check failed:', error);
        apiLastProbeAt = Date.now();
        setAPIStatus('offline');
        updateAPIAge();
        return false;
    } finally {
        window.clearTimeout(timeout);
        apiProbeInFlight = false;
    }
}

function startRealtimeAPIMonitor() {
    window.clearInterval(apiMonitorTimer);
    window.clearInterval(apiAgeTimer);
    apiMonitorTimer = window.setInterval(() => {
        if (!document.hidden && navigator.onLine) checkAPIHealth({ silent: true });
    }, API_MONITOR_INTERVAL);
    apiAgeTimer = window.setInterval(updateAPIAge, 1000);
    window.addEventListener('online', () => checkAPIHealth({ silent: true }));
    window.addEventListener('offline', () => setAPIStatus('offline'));
    window.addEventListener('focus', () => checkAPIHealth({ silent: true }));
    window.addEventListener('pageshow', () => checkAPIHealth({ silent: true }));
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) checkAPIHealth({ silent: true });
    });
    window.addEventListener('pagehide', () => {
        window.clearInterval(apiMonitorTimer);
        window.clearInterval(apiAgeTimer);
    }, { once: true });

    // Đo ngay khi mở Admin và tiếp tục cập nhật theo thời gian thực.
    setAPIStatus('checking');
    checkAPIHealth({ silent: true });
}

function setAPIStatus(status, latency = null) {
    apiCurrentStatus = status;
    apiCurrentLatency = latency;
    const online = status === 'online';
    const checking = status === 'checking';
    const text = checking ? t('api_checking') : (online ? t('api_online') : t('api_offline'));
    ['api-status-dot', 'sidebar-api-dot'].forEach(id => {
        const dot = document.getElementById(id);
        if (dot) dot.className = `api-pulse ${online ? 'online' : (checking ? 'checking' : 'offline')}`;
    });
    const statusText = document.getElementById('api-status-text');
    const sidebarText = document.getElementById('sidebar-api-status');
    if (statusText) statusText.textContent = text;
    if (sidebarText) sidebarText.textContent = text;
    const latencyEl = document.getElementById('api-latency');
    const qualityEl = document.getElementById('api-latency-quality');
    const dataLatency = document.getElementById('data-health-latency');
    const quality = getLatencyQuality(latency);
    if (latencyEl) {
        latencyEl.textContent = latency === null ? '-- ms' : `${latency} ms`;
        latencyEl.title = latency === null ? t('api_checking') : `${text} · ${latency} ms`;
    }
    if (dataLatency) dataLatency.textContent = latency === null ? '-- ms' : `${latency} ms`;
    if (qualityEl) {
        qualityEl.textContent = checking ? t('api_checking') : t(quality.key);
        qualityEl.className = `api-quality-label ${checking ? 'checking' : quality.className}`;
    }
    const chip = document.querySelector('.admin-api-chip');
    if (chip) chip.dataset.state = checking ? 'checking' : (online ? quality.className : 'offline');
}

async function loadTableData(showRefreshToast = false) {
    $('#table-body').html('<tr><td colspan="7" class="text-center py-5"><div class="admin-loader"><span></span><span></span><span></span></div></td></tr>');
    const started = performance.now();
    try {
        const rawData = await api.getAll();
        rawFlightCount = rawData.length;
        mockapiGeneratedCount = rawData.filter(item => typeof isGeneratedMockRecord === 'function' && isGeneratedMockRecord(item)).length;
        currentFlights = rawData.map(normalize).filter(f => f && f.flightCode !== '---');
        lastLoadAt = new Date();
        updateStats(currentFlights);
        renderInsights(currentFlights);
        updateSyncNote();
        populateFilterOptions();
        applyAdminFilters(false);
        updateBulkActionButtons();
        const latency = Math.round(performance.now() - started);
        const tableUpdated = document.getElementById('table-updated-at');
        if (tableUpdated) tableUpdated.dataset.loadLatency = String(latency);
        if (showRefreshToast) showToast(t('refreshed'), 'success');
        return currentFlights;
    } catch (error) {
        console.error(error);
        setAPIStatus('offline');
        $('#table-body').html(`<tr><td colspan="7" class="text-center text-danger py-5"><i class="fa-solid fa-cloud-arrow-down fs-2 mb-2 d-block"></i>${escapeHTML(t('load_error'))}</td></tr>`);
        rawFlightCount = 0;
        updateBulkActionButtons();
        showToast(t('load_error'), 'danger');
        return [];
    }
}

function populateFilterOptions() {
    const select = document.getElementById('admin-airline-filter');
    if (!select) return;
    const selected = select.value || 'all';
    const airlines = [...new Set(currentFlights.map(f => f.airline).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.innerHTML = `<option value="all">${escapeHTML(t('all_airlines'))}</option>` + airlines.map(name => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join('');
    select.value = airlines.includes(selected) ? selected : 'all';
}

function applyAdminFilters(animate = true) {
    const keyword = removeVietnameseAccent(document.getElementById('admin-search')?.value || '');
    const airline = document.getElementById('admin-airline-filter')?.value || 'all';
    const priority = document.getElementById('admin-priority-filter')?.value || 'all';
    const sort = document.getElementById('admin-sort')?.value || 'newest';

    displayedFlights = currentFlights.filter(flight => {
        const haystack = removeVietnameseAccent(`${flight.airline} ${flight.flightCode} ${flight.route} ${flight.status}`);
        const matchesKeyword = !keyword || haystack.includes(keyword);
        const matchesAirline = airline === 'all' || flight.airline === airline;
        const matchesPriority = priority === 'all' || (priority === 'watch' ? flight.isPriority : !flight.isPriority);
        return matchesKeyword && matchesAirline && matchesPriority;
    });

    if (sort === 'price-asc') displayedFlights.sort((a, b) => a.currentPrice - b.currentPrice);
    else if (sort === 'price-desc') displayedFlights.sort((a, b) => b.currentPrice - a.currentPrice);
    else if (sort === 'date') displayedFlights.sort((a, b) => new Date(a.flightDate) - new Date(b.flightDate));
    else displayedFlights.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));

    if (animate) {
        $('#table-body').fadeOut(100, () => { renderAdminTable(displayedFlights); $('#table-body').fadeIn(160); });
    } else renderAdminTable(displayedFlights);
}

function renderAdminTable(flights) {
    const tbody = $('#table-body');
    tbody.html('');
    if (flights.length === 0) {
        const message = mockapiGeneratedCount > 0 ? t('invalid_records', { count: mockapiGeneratedCount }) : t('no_data');
        tbody.html(`<tr><td colspan="7"><div class="admin-empty-state"><span><i class="fa-solid fa-magnifying-glass"></i></span><strong>${escapeHTML(message)}</strong></div></td></tr>`);
        updateTableFooter(0);
        return;
    }

    flights.forEach((flight, rowIndex) => {
        const availabilityClass = flight.seats <= 0 ? 'danger' : (flight.seats <= 10 ? 'warning' : 'success');
        const availabilityLabel = flight.seats <= 0 ? t('sold_out') : (flight.seats <= 10 ? t('low_seats') : t('available'));
        const fallbackImage = getAdminDestinationImage(flight.route);
        const legacyArtwork = /img\/covers\/.*\.svg(?:$|[?#])/i.test(String(flight.imageUrl || ''));
        const image = isValidImageSource(flight.imageUrl) && !legacyArtwork ? flight.imageUrl : fallbackImage;
        const savingPercent = flight.currentPrice > 0 ? Math.max(0, Math.round((1 - flight.targetPrice / flight.currentPrice) * 100)) : 0;
        const row = $('<tr>').attr('id', `row-${flight.id}`).attr('data-flight-id', flight.id).addClass('admin-data-row').css('--row-delay', `${Math.min(rowIndex * 28, 280)}ms`);
        row.append(`
            <td data-label="${escapeHTML(t('th_flight'))}">
                <div class="admin-flight-identity">
                    <div class="admin-flight-media">
                        <img class="admin-flight-thumb" src="${escapeHTML(image)}" alt="" loading="lazy" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${escapeHTML(fallbackImage)}'}else{this.onerror=null;this.src='img/photos/fallback-flight.webp'}">
                        <span class="admin-flight-logo-overlay">${renderAirlineLogo(flight.airline, 'xs', 'admin-table-airline-logo')}</span>
                    </div>
                    <div><strong>${escapeHTML(flight.flightCode)}</strong><span>${escapeHTML(flight.airline)}</span></div>
                </div>
            </td>
            <td data-label="${escapeHTML(t('th_route'))}"><strong class="admin-route-text">${escapeHTML(flight.route)}</strong><span class="admin-route-meta"><i class="fa-regular fa-calendar"></i>${escapeHTML(formatDate(flight.flightDate))}<i class="fa-regular fa-clock ms-2"></i>${escapeHTML(flight.departureTime)}–${escapeHTML(flight.arrivalTime)}</span></td>
            <td data-label="${escapeHTML(t('th_current'))}"><strong class="admin-price-current">${escapeHTML(formatMoney(flight.currentPrice))}</strong><span class="admin-saving-label">-${savingPercent}%</span></td>
            <td data-label="${escapeHTML(t('th_target'))}"><span class="admin-price-target">${escapeHTML(formatMoney(flight.targetPrice))}</span></td>
            <td data-label="${escapeHTML(t('th_availability'))}"><span class="availability-pill ${availabilityClass}">${escapeHTML(availabilityLabel)}</span><small class="d-block mt-1 text-muted">${flight.seats} ${escapeHTML(t('seats_unit'))}</small></td>
            <td data-label="${escapeHTML(t('th_tracking'))}">${flight.isPriority ? `<span class="tracking-pill"><i class="fa-solid fa-bell"></i>${escapeHTML(t('watch_badge'))}</span>` : '<span class="text-muted">—</span>'}</td>
            <td data-label="${escapeHTML(t('th_actions'))}" class="text-end">
                <div class="admin-row-actions">
                    <button class="admin-action-btn edit" type="button" data-row-action="edit" data-id="${escapeHTML(flight.id)}" title="${escapeHTML(t('edit'))}"><i class="fa-solid fa-pen"></i></button>
                    <button class="admin-action-btn delete" type="button" data-row-action="delete" data-id="${escapeHTML(flight.id)}" title="${escapeHTML(t('remove'))}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>`);
        tbody.append(row);
    });
    updateTableFooter(flights.length);
}

function updateTableFooter(count) {
    const countEl = document.getElementById('table-result-count');
    const updatedEl = document.getElementById('table-updated-at');
    const time = lastLoadAt ? lastLoadAt.toLocaleTimeString(getAdminLocale()) : '--';
    if (countEl) countEl.textContent = t('rows', { count });
    if (updatedEl) updatedEl.textContent = t('updated', { time });
    const badge = document.getElementById('last-updated-admin');
    if (badge) badge.textContent = time;
}

function animateMetric(element, target, formatter = value => String(Math.round(value))) {
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = Number(element.dataset.metricValue || 0);
    const to = Number(target || 0);
    element.dataset.metricValue = String(to);
    if (reduceMotion || Math.abs(to - from) < 1) {
        element.textContent = formatter(to);
        return;
    }
    const started = performance.now();
    const duration = 620;
    const frame = now => {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = formatter(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
}

function updateDataHealthPanel(flights) {
    const valid = flights.length;
    const invalid = mockapiGeneratedCount;
    const airlines = new Set(flights.map(flight => flight.airline).filter(Boolean)).size;
    const time = lastLoadAt ? lastLoadAt.toLocaleTimeString(getAdminLocale()) : '--:--:--';
    animateMetric(document.getElementById('data-health-valid'), valid);
    animateMetric(document.getElementById('data-health-invalid'), invalid);
    animateMetric(document.getElementById('data-health-airlines'), airlines);
    const sync = document.getElementById('data-health-sync');
    if (sync) sync.textContent = time;
    const panel = document.getElementById('admin-data-health');
    if (panel) panel.dataset.quality = invalid > 0 ? 'warning' : 'good';
}

function updateStats(flights) {
    let totalPrice = 0;
    let minFlight = null;
    let priorityCount = 0;
    for (let index = 0; index < flights.length; index++) {
        const flight = flights[index];
        totalPrice += flight.currentPrice;
        if (!minFlight || flight.currentPrice < minFlight.currentPrice) minFlight = flight;
        if (flight.isPriority) priorityCount++;
    }
    const average = flights.length ? totalPrice / flights.length : 0;
    const rate = flights.length ? Math.round(priorityCount / flights.length * 100) : 0;
    animateMetric(document.getElementById('stat-total'), flights.length);
    animateMetric(document.getElementById('stat-avg'), average, value => value ? formatMoney(value) : '0 đ');
    animateMetric(document.getElementById('stat-priority'), priorityCount);
    document.getElementById('stat-priority-note').textContent = `${rate}%`;
    animateMetric(document.getElementById('stat-min'), minFlight ? minFlight.currentPrice : 0, value => value ? formatMoney(value) : '0 đ');
    document.getElementById('stat-min-note').textContent = minFlight ? minFlight.flightCode : t('stat_min_note');
    updateDataHealthPanel(flights);
}

function renderInsights(flights) {
    const cheapest = flights.reduce((best, flight) => !best || flight.currentPrice < best.currentPrice ? flight : best, null);
    const totalSeats = flights.reduce((sum, flight) => sum + Math.max(0, flight.seats), 0);
    const priorityRate = flights.length ? Math.round(flights.filter(f => f.isPriority).length / flights.length * 100) : 0;
    document.getElementById('insight-cheapest').textContent = cheapest ? `${cheapest.flightCode} • ${formatMoney(cheapest.currentPrice)}` : '--';
    document.getElementById('insight-priority-rate').textContent = `${priorityRate}%`;
    document.getElementById('insight-seats').textContent = totalSeats.toLocaleString(getAdminLocale());
    const quality = document.getElementById('insight-quality');
    quality.textContent = mockapiGeneratedCount > 0 ? t('quality_warning') : t('quality_good');
    quality.className = mockapiGeneratedCount > 0 ? 'text-warning' : 'text-success';
    renderPriceChart(flights);
}

function renderPriceChart(flights) {
    const chart = document.getElementById('price-chart');
    const groups = {};
    flights.forEach(flight => {
        if (!groups[flight.airline]) groups[flight.airline] = { total: 0, count: 0 };
        groups[flight.airline].total += flight.currentPrice;
        groups[flight.airline].count++;
    });
    const rows = Object.entries(groups).map(([airline, value]) => ({ airline, average: value.total / value.count })).sort((a, b) => b.average - a.average);
    if (!rows.length) { chart.innerHTML = `<div class="chart-empty">${escapeHTML(t('no_data'))}</div>`; return; }
    const max = Math.max(...rows.map(row => row.average), 1);
    chart.innerHTML = rows.map(row => {
        const profile = getAirlineProfile(row.airline);
        return `
        <div class="admin-chart-row" style="--airline-primary:${escapeHTML(profile.MauNhan || '#0284c7')};--airline-secondary:${escapeHTML(profile.MauPhu || '#1d4ed8')}">
            <div class="admin-chart-label">
                <span class="admin-chart-airline">${renderAirlineLogo(row.airline, 'xs', 'admin-chart-logo')}<strong>${escapeHTML(row.airline)}</strong></span>
                <span>${escapeHTML(formatMoney(row.average))}</span>
            </div>
            <div class="admin-chart-track"><span style="width:${Math.max(8, row.average / max * 100).toFixed(1)}%"></span></div>
        </div>`;
    }).join('');
}

function updateSyncNote() {
    const note = document.getElementById('sync-note');
    if (!note) return;
    if (mockapiGeneratedCount > 0) {
        note.className = 'admin-sync-note warning';
        note.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><span>${escapeHTML(t('sync_warning', { count: mockapiGeneratedCount }))}</span>`;
    } else {
        note.className = 'admin-sync-note success';
        note.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${escapeHTML(t('data_clean'))}</span>`;
    }
}

function updatePreview() {
    const route = document.getElementById('flight-route').value.trim() || (adminLang === 'vi' ? 'Hà Nội → Đà Nẵng' : 'Hanoi → Da Nang');
    const code = document.getElementById('flight-code').value.trim().toUpperCase() || 'VN-000';
    const price = Number(document.getElementById('current-price').value || 0);
    const dep = document.getElementById('departure-time').value || '08:30';
    const arr = document.getElementById('arrival-time').value || '10:00';
    const image = document.getElementById('image-url').value.trim();
    document.getElementById('preview-code').textContent = code;
    document.getElementById('preview-route').textContent = route.replace(' - ', ' → ');
    document.getElementById('preview-meta').textContent = `${dep} • ${arr}`;
    document.getElementById('preview-price').textContent = price ? formatMoney(price) : '0 đ';
    const selectedAirline = document.getElementById('airline').value || 'Vietnam Airlines';
    const previewLogo = document.getElementById('preview-airline-logo');
    if (previewLogo) previewLogo.innerHTML = renderAirlineLogo(selectedAirline, 'sm', 'admin-preview-logo');
    const preview = document.getElementById('preview-image');
    const fallbackImage = getAdminDestinationImage(route);
    const primaryImage = isValidImageSource(image) ? image : fallbackImage;
    preview.style.backgroundImage = `linear-gradient(180deg, transparent, rgba(8,17,31,.76)), url('${primaryImage.replace(/'/g, '%27')}'), url('${fallbackImage.replace(/'/g, '%27')}'), url('img/photos/fallback-flight.webp')`;
}

function editFlight(id) {
    const flight = currentFlights.find(item => String(item.id) === String(id));
    if (!flight) return;
    $('#flight-id').val(flight.id);
    $('#airline').val(flight.airline);
    $('#flight-code').val(flight.flightCode);
    $('#flight-route').val(flight.route);
    $('#current-price').val(flight.currentPrice);
    $('#target-price').val(flight.targetPrice);
    $('#image-url').val(flight.imageUrl);
    $('#flight-date').val(toInputDate(flight.flightDate));
    $('#departure-time').val(flight.departureTime);
    $('#arrival-time').val(flight.arrivalTime);
    $('#cabin-class').val(flight.cabin);
    $('#baggage').val(flight.baggage);
    $('#seats').val(flight.seats);
    $('#rating').val(flight.rating);
    $('#booking-url').val(flight.bookingUrl === '#' ? '' : flight.bookingUrl);
    $('#note').val(flight.note);
    $('#is-priority').prop('checked', flight.isPriority);
    document.getElementById('form-title').textContent = t('form_edit_title');
    $('#btn-cancel').slideDown(180);
    updatePreview();
    window.navigateAdminSection?.('flight-editor', { updateHash: true });
    setTimeout(() => document.getElementById('flight-code').focus(), 400);
}

function openDeleteModal(id) {
    $('#delete-id').val(id);
    deleteModal?.show();
}

function updateBulkActionButtons() {
    const deleteAllButton = document.getElementById('btn-delete-all');
    if (!deleteAllButton) return;
    deleteAllButton.disabled = rawFlightCount <= 0;
    deleteAllButton.setAttribute('aria-disabled', String(rawFlightCount <= 0));
}

function configureBulkActionModal(action) {
    const modalElement = document.getElementById('bulkActionModal');
    if (!modalElement) return;
    pendingBulkAction = action;

    const icon = document.getElementById('bulk-action-icon');
    const kicker = document.getElementById('bulk-action-kicker');
    const title = document.getElementById('bulkActionModalLabel');
    const text = document.getElementById('bulk-action-text');
    const summary = document.getElementById('bulk-action-summary');
    const checkWrap = document.getElementById('bulk-action-check-wrap');
    const check = document.getElementById('bulk-action-check');
    const checkLabel = document.getElementById('bulk-action-check-label');
    const confirmButton = document.getElementById('btn-confirm-bulk-action');
    const confirmLabel = document.getElementById('bulk-action-confirm-label');

    kicker.textContent = t('operation_kicker');
    check.checked = false;
    confirmButton.disabled = true;
    confirmButton.className = 'btn rounded-3 px-4 fw-bold';
    icon.className = 'admin-confirm-icon';

    if (action === 'delete-all') {
        icon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        title.textContent = t('delete_all_title');
        text.textContent = t('delete_all_text');
        summary.textContent = t('delete_all_summary', { count: rawFlightCount });
        checkLabel.textContent = t('delete_all_understand');
        confirmLabel.textContent = t('delete_all_confirm');
        confirmButton.classList.add('btn-danger');
        checkWrap.hidden = false;
    } else {
        icon.classList.add('is-sync');
        icon.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
        title.textContent = t('sync_title');
        text.textContent = t('sync_text');
        summary.textContent = t('sync_summary');
        checkLabel.textContent = t('sync_understand');
        confirmLabel.textContent = t('continue_action');
        confirmButton.classList.add('btn-success');
        checkWrap.hidden = false;
    }

    bulkActionModal?.show();
    window.setTimeout(() => check.focus(), 250);
}

async function executeBulkAction() {
    const button = document.getElementById('btn-confirm-bulk-action');
    const label = document.getElementById('bulk-action-confirm-label');
    if (!button || !pendingBulkAction) return;

    const action = pendingBulkAction;
    const originalHtml = button.innerHTML;
    button.disabled = true;

    if (action === 'delete-all') {
        if (!rawFlightCount) {
            bulkActionModal?.hide();
            showToast(t('delete_all_empty'), 'info');
            button.disabled = false;
            button.innerHTML = originalHtml;
            pendingBulkAction = null;
            return;
        }
        try {
            const result = await api.deleteAllFlights(({ deleted, total }) => {
                label.textContent = t('deleting_all', { deleted, total });
            });
            bulkActionModal?.hide();
            currentFlights = [];
            displayedFlights = [];
            rawFlightCount = 0;
            localStorage.removeItem('fw_guest_recent_v1');
            localStorage.removeItem('fw_guest_favorites_v1');
            await loadTableData(false);
            showToast(t('delete_all_success', { count: result.deleted }), 'success');
            checkAPIHealth({ silent: true });
        } catch (error) {
            console.error(error);
            const deleted = Number(error?.deleted || 0);
            const total = Number(error?.total || rawFlightCount || 0);
            bulkActionModal?.hide();
            await loadTableData(false).catch(() => {});
            showToast(t('delete_all_error', { deleted, total }), 'danger');
        }
    } else if (action === 'sync') {
        await performSyncSample();
    }

    button.disabled = false;
    button.innerHTML = originalHtml;
    pendingBulkAction = null;
}

function handleSubmitForm(event) {
    event.preventDefault();
    const formId = document.getElementById('flight-id').value;
    if (!validateForm(formId)) return;
    const payload = createPayloadFromForm();
    const button = document.getElementById('btn-save');
    const oldHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${escapeHTML(t('saving'))}`;
    const request = formId ? api.update(formId, payload) : api.create(payload);
    request.then(() => {
        showToast(formId ? t('update_success') : t('create_success'), 'success');
        resetForm(false);
        checkAPIHealth({ silent: true });
        return loadTableData();
    }).catch(error => {
        console.error(error);
        showToast(t('save_error'), 'danger');
    }).finally(() => {
        button.disabled = false;
        button.innerHTML = oldHtml;
    });
}

function processDelete() {
    const id = $('#delete-id').val();
    const button = document.getElementById('btn-confirm-delete');
    const oldText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    deleteFlight(id).done(() => {
        deleteModal?.hide();
        $(`#row-${id}`).find('td').wrapInner('<div class="row-collapse" />').parent().find('.row-collapse').slideUp(300, function() {
            $(`#row-${id}`).remove();
        });
        currentFlights = currentFlights.filter(f => String(f.id) !== String(id));
        rawFlightCount = Math.max(0, rawFlightCount - 1);
        applyAdminFilters(false);
        updateStats(currentFlights);
        renderInsights(currentFlights);
        updateBulkActionButtons();
        showToast(t('delete_success'), 'success');
        checkAPIHealth({ silent: true });
    }).fail(error => {
        console.error(error);
        showToast(t('delete_error'), 'danger');
    }).always(() => {
        button.disabled = false;
        button.textContent = oldText;
    });
}

function resetForm(showMessage = false) {
    document.getElementById('flight-form').reset();
    $('#flight-id').val('');
    $('#rating').val('4.5');
    $('#seats').val('12');
    $('#baggage').val(adminLang === 'vi' ? '7kg xách tay' : '7kg carry-on');
    $('#booking-url').val('https://www.vietnamairlines.com/');
    $('#image-url').val('');
    document.getElementById('form-title').textContent = t('form_add_title');
    document.querySelectorAll('.is-invalid').forEach(element => element.classList.remove('is-invalid'));
    $('#btn-cancel').fadeOut(160);
    updatePreview();
    if (showMessage) showToast(t('reset_done'), 'info');
}

function exportJSON() {
    const exportData = currentFlights.map(flight => ({
        id: flight.id, HangBay: flight.airline, MaChuyenBay: flight.flightCode, TuyenBay: flight.route,
        GiaHienTai: flight.currentPrice, GiaMucTieu: flight.targetPrice, Anh: flight.imageUrl,
        NgayBay: flight.flightDate, GioCatCanh: flight.departureTime, GioHaCanh: flight.arrivalTime,
        UuTien: flight.isPriority, HangGhe: flight.cabin, HanhLy: flight.baggage,
        SoGheTrong: flight.seats, DiemDanhGia: flight.rating, TrangThai: flight.status,
        LinkDatVe: flight.bookingUrl, GhiChu: flight.note
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `flightwatcher-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    showToast(t('export_success'), 'success');
}

function processSyncSample() {
    configureBulkActionModal('sync');
}

async function performSyncSample() {
    const button = document.getElementById('btn-sync-sample');
    const confirmButton = document.getElementById('btn-confirm-bulk-action');
    if (!button || typeof api.syncSampleFlights !== 'function') return;
    const oldHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>${escapeHTML(t('syncing'))}`;
    if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>${escapeHTML(t('syncing'))}`;
    }
    try {
        const result = await api.syncSampleFlights();
        bulkActionModal?.hide();
        showToast(t('sync_success', result), 'success');
        await Promise.all([loadTableData(), loadAirlinesDropdown(), checkAPIHealth({ silent: true })]);
    } catch (error) {
        console.error(error);
        bulkActionModal?.hide();
        showToast(t('sync_error'), 'danger');
    } finally {
        button.disabled = false;
        button.innerHTML = oldHtml;
    }
}


function showToast(message, type = 'success') {
    const toast = document.getElementById('liveToast');
    const title = document.getElementById('toast-title');
    const icon = document.getElementById('toast-icon');
    if (!toast || !title || !icon) return;

    const normalizedType = ['success', 'danger', 'warning', 'info'].includes(type) ? type : 'info';
    const config = {
        success: { title: t('toast_success_title'), icon: 'fa-circle-check' },
        danger: { title: t('toast_error_title'), icon: 'fa-circle-xmark' },
        warning: { title: t('toast_warning_title'), icon: 'fa-triangle-exclamation' },
        info: { title: t('toast_info_title'), icon: 'fa-circle-info' }
    }[normalizedType];

    toast.classList.remove('is-success', 'is-danger', 'is-warning', 'is-info');
    toast.classList.add(`is-${normalizedType}`);
    title.textContent = config.title;
    icon.innerHTML = `<i class="fa-solid ${config.icon}"></i>`;
    document.getElementById('toast-message').textContent = message;
    bootstrap.Toast.getOrCreateInstance(toast, { delay: 3000, autohide: true }).show();
}


function bindEvents() {
    document.querySelectorAll('[data-public-logout]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            window.FlightWatcherAuth?.clearSession?.();
            window.location.assign(link.getAttribute('href') || 'index.html');
        });
    });

    // jQuery selectors, events, effects and DOM methods required by FIT4015.
    $('#btn-cancel').on('click', () => resetForm(false));
    $('#btn-confirm-delete').on('click', processDelete);
    $('#btn-sync-sample').on('click', processSyncSample);
    $('#btn-delete-all').on('click', () => configureBulkActionModal('delete-all'));
    $('#btn-confirm-bulk-action').on('click', executeBulkAction);
    $('#bulk-action-check').on('change', function() { document.getElementById('btn-confirm-bulk-action').disabled = !this.checked; });
    $('#btn-export-json').click(exportJSON);
    $('#admin-search').on('input', () => applyAdminFilters(true));

    // Vanilla DOM events required by FIT4015.
    document.getElementById('flight-form').addEventListener('submit', handleSubmitForm);
    document.getElementById('btn-reset-form').addEventListener('click', () => resetForm(true));
    document.getElementById('btn-refresh-admin').addEventListener('click', async event => {
        const button = event.currentTarget;
        button.disabled = true;
        button.querySelector('i')?.classList.add('fa-spin');
        await Promise.all([loadTableData(true), checkAPIHealth()]);
        button.disabled = false;
        button.querySelector('i')?.classList.remove('fa-spin');
    });
    document.getElementById('admin-lang-selector').addEventListener('change', event => updateAdminLanguage(event.target.value));
    ['admin-airline-filter', 'admin-priority-filter', 'admin-sort'].forEach(id => document.getElementById(id).addEventListener('change', () => applyAdminFilters(true)));

    document.getElementById('flight-code').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
        this.classList.remove('is-invalid');
        updatePreview();
    });
    document.querySelectorAll('#flight-form input, #flight-form select, #flight-form textarea').forEach(input => {
        input.addEventListener('input', () => { input.classList.remove('is-invalid'); updatePreview(); });
        input.addEventListener('change', () => { input.classList.remove('is-invalid'); updatePreview(); });
    });
    document.getElementById('table-body').addEventListener('click', event => {
        const button = event.target.closest('[data-row-action]');
        if (!button) return;
        if (button.dataset.rowAction === 'edit') editFlight(button.dataset.id);
        if (button.dataset.rowAction === 'delete') openDeleteModal(button.dataset.id);
    });
}

function setupAdminRevealAnimations() {
    const elements = document.querySelectorAll('.admin-stat-card, .admin-panel, .admin-data-health-card, .admin-hero-panel');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(element => element.classList.add('is-revealed'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
        });
    }, { threshold: .12 });
    elements.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 260)}ms`);
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!setupAdminAuth()) return;
    deleteModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('deleteModal'));
    bulkActionModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('bulkActionModal'));
    setupSmartTheme();
    setupSidebar();
    setupAdminShortcuts();
    bindEvents();
    updateAdminLanguage(adminLang);
    resetForm(false);
    // Khởi động giám sát trước để đo ngay một lần, tránh gửi hai request ping trùng nhau.
    startRealtimeAPIMonitor();
    await Promise.all([loadAirlinesDropdown(), loadTableData()]);
    setupAdminRevealAnimations();
});
