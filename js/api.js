// =========================================================
// FlightWatcher - MockAPI service layer
// Resource chính: Flights
// Resource phụ: Airlines
// Endpoint đã đồng bộ theo link người dùng gửi.
// =========================================================
const API_URL = 'https://6a4c7a5bf5eab0bb6b6424fb.mockapi.io/Flights';
const AIRLINE_API_URL = 'https://6a4c7a5bf5eab0bb6b6424fb.mockapi.io/Airlines';

const DEFAULT_AIRLINES = [
    {
        HangBay: 'Vietnam Airlines', MaHang: 'VN', QuocGia: 'Việt Nam',
        MauNhan: '#d99a00', MauPhu: '#006f78', Logo: 'img/airlines/vietnam-airlines.svg',
        Website: 'https://www.vietnamairlines.com/'
    },
    {
        HangBay: 'VietJet Air', MaHang: 'VJ', QuocGia: 'Việt Nam',
        MauNhan: '#e31b2d', MauPhu: '#ffbf00', Logo: 'img/airlines/vietjet-air.svg',
        Website: 'https://www.vietjetair.com/'
    },
    {
        HangBay: 'Bamboo Airways', MaHang: 'QH', QuocGia: 'Việt Nam',
        MauNhan: '#2f9e44', MauPhu: '#0a7fc1', Logo: 'img/airlines/bamboo-airways.svg',
        Website: 'https://www.bambooairways.com/'
    },
    {
        HangBay: 'Vietravel Airlines', MaHang: 'VU', QuocGia: 'Việt Nam',
        MauNhan: '#f6a800', MauPhu: '#123a6d', Logo: 'img/airlines/vietravel-airlines.svg',
        Website: 'https://www.vietravelairlines.com/'
    }
];

// Hồ sơ hãng bay dùng chung cho trang khách và Admin.
// Dữ liệu từ resource Airlines sẽ được gộp với fallback cục bộ để logo luôn hiển thị ổn định.
const AIRLINE_FALLBACK_PROFILE = {
    HangBay: 'FlightWatcher Airline', MaHang: 'FW', QuocGia: '—',
    MauNhan: '#0284c7', MauPhu: '#1d4ed8', Logo: 'img/airlines/default-airline.svg', Website: '#'
};

let AIRLINE_REGISTRY = new Map();

function normalizeAirlineKey(value) {
    return String(value || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function isSafeAirlineAsset(value) {
    const source = String(value || '').trim();
    return /^(https?:\/\/|\.?\/?img\/)/i.test(source) ? source : '';
}

function registerAirlineProfiles(rows = []) {
    AIRLINE_REGISTRY = new Map();
    [...DEFAULT_AIRLINES, ...(Array.isArray(rows) ? rows : [])].forEach(item => {
        const name = String(item?.HangBay || item?.name || item?.airline || '').trim();
        if (!name) return;
        const base = DEFAULT_AIRLINES.find(row => normalizeAirlineKey(row.HangBay) === normalizeAirlineKey(name)) || AIRLINE_FALLBACK_PROFILE;
        const merged = {
            ...base,
            ...item,
            HangBay: name,
            MaHang: String(item?.MaHang || item?.code || base.MaHang || 'FW').trim().toUpperCase(),
            MauNhan: String(item?.MauNhan || item?.color || base.MauNhan || '#0284c7').trim(),
            MauPhu: String(item?.MauPhu || item?.secondaryColor || base.MauPhu || '#1d4ed8').trim(),
            Logo: isSafeAirlineAsset(item?.Logo || item?.logo || base.Logo) || AIRLINE_FALLBACK_PROFILE.Logo,
            Website: String(item?.Website || item?.website || base.Website || '#').trim()
        };
        AIRLINE_REGISTRY.set(normalizeAirlineKey(name), merged);
        AIRLINE_REGISTRY.set(normalizeAirlineKey(merged.MaHang), merged);
    });
    return AIRLINE_REGISTRY;
}

function getAirlineProfile(airlineName) {
    if (!AIRLINE_REGISTRY.size) registerAirlineProfiles(DEFAULT_AIRLINES);
    const key = normalizeAirlineKey(airlineName);
    const direct = AIRLINE_REGISTRY.get(key);
    if (direct) return direct;
    for (const [registeredKey, profile] of AIRLINE_REGISTRY.entries()) {
        if (key.includes(registeredKey) || registeredKey.includes(key)) return profile;
    }
    const initials = String(airlineName || 'FW').trim().split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'FW';
    return { ...AIRLINE_FALLBACK_PROFILE, HangBay: airlineName || AIRLINE_FALLBACK_PROFILE.HangBay, MaHang: initials };
}

function escapeAirlineHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function renderAirlineLogo(airlineName, size = 'md', extraClass = '') {
    const profile = getAirlineProfile(airlineName);
    const source = isSafeAirlineAsset(profile.Logo) || AIRLINE_FALLBACK_PROFILE.Logo;
    const code = escapeAirlineHTML(profile.MaHang || 'FW');
    const name = escapeAirlineHTML(profile.HangBay || airlineName || 'Airline');
    const primary = /^#[0-9a-f]{3,8}$/i.test(profile.MauNhan || '') ? profile.MauNhan : '#0284c7';
    const secondary = /^#[0-9a-f]{3,8}$/i.test(profile.MauPhu || '') ? profile.MauPhu : '#1d4ed8';
    return `<span class="airline-logo-shell airline-logo-${escapeAirlineHTML(size)} ${escapeAirlineHTML(extraClass)}" style="--airline-primary:${primary};--airline-secondary:${secondary}" aria-label="${name}"><img class="airline-logo-image" src="${escapeAirlineHTML(source)}" alt="${name}" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="airline-logo-fallback" hidden>${code}</span></span>`;
}

registerAirlineProfiles(DEFAULT_AIRLINES);

const SAMPLE_FLIGHTS = [
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-201",
        "TuyenBay": "TP. Hồ Chí Minh - Hà Nội",
        "GiaHienTai": 1210000,
        "GiaMucTieu": 870000,
        "UuTien": true,
        "GioCatCanh": "07:15",
        "GioHaCanh": "09:30",
        "NgayBay": "2026-07-12",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 6,
        "DiemDanhGia": 4.2,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-301",
        "TuyenBay": "Hà Nội - TP. Hồ Chí Minh",
        "GiaHienTai": 1350000,
        "GiaMucTieu": 1030000,
        "UuTien": true,
        "GioCatCanh": "12:50",
        "GioHaCanh": "15:05",
        "NgayBay": "2026-07-13",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 9,
        "DiemDanhGia": 4.5,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-401",
        "TuyenBay": "Đà Nẵng - TP. Hồ Chí Minh",
        "GiaHienTai": 940000,
        "GiaMucTieu": 740000,
        "UuTien": true,
        "GioCatCanh": "17:35",
        "GioHaCanh": "18:55",
        "NgayBay": "2026-07-14",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 12,
        "DiemDanhGia": 4.8,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-501",
        "TuyenBay": "TP. Hồ Chí Minh - Đà Nẵng",
        "GiaHienTai": 1050000,
        "GiaMucTieu": 860000,
        "UuTien": false,
        "GioCatCanh": "22:05",
        "GioHaCanh": "23:25",
        "NgayBay": "2026-07-15",
        "Anh": "https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 16,
        "DiemDanhGia": 4.3,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-208",
        "TuyenBay": "Hà Nội - Đà Nẵng",
        "GiaHienTai": 970000,
        "GiaMucTieu": 820000,
        "UuTien": false,
        "GioCatCanh": "09:20",
        "GioHaCanh": "10:45",
        "NgayBay": "2026-07-16",
        "Anh": "https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 20,
        "DiemDanhGia": 4.6,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-308",
        "TuyenBay": "Đà Nẵng - Hà Nội",
        "GiaHienTai": 910000,
        "GiaMucTieu": 800000,
        "UuTien": false,
        "GioCatCanh": "14:45",
        "GioHaCanh": "16:10",
        "NgayBay": "2026-07-17",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 24,
        "DiemDanhGia": 4.9,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-408",
        "TuyenBay": "Hà Nội - Đà Lạt",
        "GiaHienTai": 1390000,
        "GiaMucTieu": 1000000,
        "UuTien": true,
        "GioCatCanh": "19:40",
        "GioHaCanh": "21:30",
        "NgayBay": "2026-07-19",
        "Anh": "https://images.unsplash.com/photo-1638555063519-d009e6f3b28b?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 28,
        "DiemDanhGia": 4.4,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Phù hợp chuyến nghỉ dưỡng ngắn ngày."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-508",
        "TuyenBay": "TP. Hồ Chí Minh - Đà Lạt",
        "GiaHienTai": 840000,
        "GiaMucTieu": 640000,
        "UuTien": true,
        "GioCatCanh": "06:30",
        "GioHaCanh": "07:25",
        "NgayBay": "2026-07-20",
        "Anh": "https://images.unsplash.com/photo-1638555063519-d009e6f3b28b?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 32,
        "DiemDanhGia": 4.7,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Phù hợp chuyến nghỉ dưỡng ngắn ngày."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-215",
        "TuyenBay": "Đà Lạt - Hà Nội",
        "GiaHienTai": 1610000,
        "GiaMucTieu": 1270000,
        "UuTien": true,
        "GioCatCanh": "11:40",
        "GioHaCanh": "13:30",
        "NgayBay": "2026-07-21",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 14,
        "DiemDanhGia": 4.2,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Giá tốt cho chặng bay cuối tuần."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-315",
        "TuyenBay": "Đà Lạt - TP. Hồ Chí Minh",
        "GiaHienTai": 740000,
        "GiaMucTieu": 610000,
        "UuTien": false,
        "GioCatCanh": "16:55",
        "GioHaCanh": "17:50",
        "NgayBay": "2026-07-22",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 18,
        "DiemDanhGia": 4.5,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chặng ngắn, thời gian bay đẹp."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-415",
        "TuyenBay": "Phú Quốc - TP. Hồ Chí Minh",
        "GiaHienTai": 740000,
        "GiaMucTieu": 630000,
        "UuTien": true,
        "GioCatCanh": "21:15",
        "GioHaCanh": "22:20",
        "NgayBay": "2026-07-23",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 6,
        "DiemDanhGia": 4.8,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-515",
        "TuyenBay": "TP. Hồ Chí Minh - Phú Quốc",
        "GiaHienTai": 990000,
        "GiaMucTieu": 870000,
        "UuTien": true,
        "GioCatCanh": "08:30",
        "GioHaCanh": "09:35",
        "NgayBay": "2026-07-24",
        "Anh": "https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 9,
        "DiemDanhGia": 4.3,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-222",
        "TuyenBay": "Hà Nội - Phú Quốc",
        "GiaHienTai": 1690000,
        "GiaMucTieu": 1220000,
        "UuTien": true,
        "GioCatCanh": "13:35",
        "GioHaCanh": "15:45",
        "NgayBay": "2026-07-26",
        "Anh": "https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 12,
        "DiemDanhGia": 4.6,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-322",
        "TuyenBay": "Phú Quốc - Hà Nội",
        "GiaHienTai": 1720000,
        "GiaMucTieu": 1310000,
        "UuTien": true,
        "GioCatCanh": "18:25",
        "GioHaCanh": "20:35",
        "NgayBay": "2026-07-27",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 16,
        "DiemDanhGia": 4.9,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-422",
        "TuyenBay": "Nha Trang - Hà Nội",
        "GiaHienTai": 1170000,
        "GiaMucTieu": 920000,
        "UuTien": true,
        "GioCatCanh": "05:45",
        "GioHaCanh": "07:50",
        "NgayBay": "2026-07-28",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 20,
        "DiemDanhGia": 4.4,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-522",
        "TuyenBay": "Hà Nội - Nha Trang",
        "GiaHienTai": 1180000,
        "GiaMucTieu": 970000,
        "UuTien": false,
        "GioCatCanh": "10:10",
        "GioHaCanh": "12:15",
        "NgayBay": "2026-07-29",
        "Anh": "https://images.unsplash.com/photo-1572198404182-2c115d89fb26?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 24,
        "DiemDanhGia": 4.7,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-229",
        "TuyenBay": "Nha Trang - TP. Hồ Chí Minh",
        "GiaHienTai": 740000,
        "GiaMucTieu": 630000,
        "UuTien": false,
        "GioCatCanh": "15:40",
        "GioHaCanh": "16:40",
        "NgayBay": "2026-07-30",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 28,
        "DiemDanhGia": 4.2,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Giá tốt cho chặng bay cuối tuần."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-329",
        "TuyenBay": "TP. Hồ Chí Minh - Nha Trang",
        "GiaHienTai": 830000,
        "GiaMucTieu": 730000,
        "UuTien": true,
        "GioCatCanh": "20:30",
        "GioHaCanh": "21:30",
        "NgayBay": "2026-07-31",
        "Anh": "https://images.unsplash.com/photo-1572198404182-2c115d89fb26?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 0,
        "DiemDanhGia": 4.5,
        "TrangThai": "Hết chỗ",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-429",
        "TuyenBay": "Huế - Hà Nội",
        "GiaHienTai": 940000,
        "GiaMucTieu": 680000,
        "UuTien": true,
        "GioCatCanh": "07:15",
        "GioHaCanh": "08:30",
        "NgayBay": "2026-08-02",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 14,
        "DiemDanhGia": 4.8,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-529",
        "TuyenBay": "Hà Nội - Huế",
        "GiaHienTai": 860000,
        "GiaMucTieu": 650000,
        "UuTien": true,
        "GioCatCanh": "12:50",
        "GioHaCanh": "14:05",
        "NgayBay": "2026-08-03",
        "Anh": "https://images.unsplash.com/photo-1677662483863-26855f4d5246?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 18,
        "DiemDanhGia": 4.3,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Phù hợp chuyến nghỉ dưỡng ngắn ngày."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-236",
        "TuyenBay": "Huế - TP. Hồ Chí Minh",
        "GiaHienTai": 860000,
        "GiaMucTieu": 680000,
        "UuTien": true,
        "GioCatCanh": "17:35",
        "GioHaCanh": "19:00",
        "NgayBay": "2026-08-04",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 6,
        "DiemDanhGia": 4.6,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-336",
        "TuyenBay": "TP. Hồ Chí Minh - Huế",
        "GiaHienTai": 950000,
        "GiaMucTieu": 780000,
        "UuTien": true,
        "GioCatCanh": "22:05",
        "GioHaCanh": "23:30",
        "NgayBay": "2026-08-05",
        "Anh": "https://images.unsplash.com/photo-1677662483863-26855f4d5246?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 9,
        "DiemDanhGia": 4.9,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-436",
        "TuyenBay": "Quy Nhơn - TP. Hồ Chí Minh",
        "GiaHienTai": 870000,
        "GiaMucTieu": 740000,
        "UuTien": false,
        "GioCatCanh": "09:20",
        "GioHaCanh": "10:30",
        "NgayBay": "2026-08-06",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 12,
        "DiemDanhGia": 4.4,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-536",
        "TuyenBay": "TP. Hồ Chí Minh - Quy Nhơn",
        "GiaHienTai": 950000,
        "GiaMucTieu": 840000,
        "UuTien": false,
        "GioCatCanh": "14:45",
        "GioHaCanh": "15:55",
        "NgayBay": "2026-08-07",
        "Anh": "https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 16,
        "DiemDanhGia": 4.7,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-243",
        "TuyenBay": "Quy Nhơn - Hà Nội",
        "GiaHienTai": 1060000,
        "GiaMucTieu": 760000,
        "UuTien": true,
        "GioCatCanh": "19:40",
        "GioHaCanh": "21:15",
        "NgayBay": "2026-08-09",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 20,
        "DiemDanhGia": 4.2,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Giá tốt cho chặng bay cuối tuần."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-343",
        "TuyenBay": "Hà Nội - Quy Nhơn",
        "GiaHienTai": 1050000,
        "GiaMucTieu": 800000,
        "UuTien": true,
        "GioCatCanh": "06:30",
        "GioHaCanh": "08:05",
        "NgayBay": "2026-08-10",
        "Anh": "https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 24,
        "DiemDanhGia": 4.5,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-443",
        "TuyenBay": "Vinh - TP. Hồ Chí Minh",
        "GiaHienTai": 1250000,
        "GiaMucTieu": 990000,
        "UuTien": true,
        "GioCatCanh": "11:40",
        "GioHaCanh": "13:25",
        "NgayBay": "2026-08-11",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 28,
        "DiemDanhGia": 4.8,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-543",
        "TuyenBay": "TP. Hồ Chí Minh - Vinh",
        "GiaHienTai": 1370000,
        "GiaMucTieu": 1120000,
        "UuTien": false,
        "GioCatCanh": "16:55",
        "GioHaCanh": "18:40",
        "NgayBay": "2026-08-12",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 32,
        "DiemDanhGia": 4.3,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Phù hợp chuyến nghỉ dưỡng ngắn ngày."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-250",
        "TuyenBay": "Vinh - Hà Nội",
        "GiaHienTai": 800000,
        "GiaMucTieu": 680000,
        "UuTien": false,
        "GioCatCanh": "21:15",
        "GioHaCanh": "22:10",
        "NgayBay": "2026-08-13",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 14,
        "DiemDanhGia": 4.6,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Giá ổn định, bay buổi sáng."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-350",
        "TuyenBay": "Hà Nội - Vinh",
        "GiaHienTai": 740000,
        "GiaMucTieu": 650000,
        "UuTien": false,
        "GioCatCanh": "08:30",
        "GioHaCanh": "09:25",
        "NgayBay": "2026-08-14",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 18,
        "DiemDanhGia": 4.9,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-450",
        "TuyenBay": "Cần Thơ - Đà Nẵng",
        "GiaHienTai": 990000,
        "GiaMucTieu": 710000,
        "UuTien": true,
        "GioCatCanh": "13:35",
        "GioHaCanh": "15:05",
        "NgayBay": "2026-08-16",
        "Anh": "https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 6,
        "DiemDanhGia": 4.4,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-550",
        "TuyenBay": "Đà Nẵng - Cần Thơ",
        "GiaHienTai": 1090000,
        "GiaMucTieu": 830000,
        "UuTien": true,
        "GioCatCanh": "18:25",
        "GioHaCanh": "19:55",
        "NgayBay": "2026-08-17",
        "Anh": "https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 9,
        "DiemDanhGia": 4.7,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-257",
        "TuyenBay": "Cần Thơ - Hà Nội",
        "GiaHienTai": 1580000,
        "GiaMucTieu": 1250000,
        "UuTien": true,
        "GioCatCanh": "05:45",
        "GioHaCanh": "07:55",
        "NgayBay": "2026-08-18",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 12,
        "DiemDanhGia": 4.2,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Giá tốt cho chặng bay cuối tuần."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-357",
        "TuyenBay": "Hà Nội - Cần Thơ",
        "GiaHienTai": 1700000,
        "GiaMucTieu": 1390000,
        "UuTien": false,
        "GioCatCanh": "10:10",
        "GioHaCanh": "12:20",
        "NgayBay": "2026-08-19",
        "Anh": "https://images.unsplash.com/photo-1627618712837-4f854fd64f20?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 16,
        "DiemDanhGia": 4.5,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chặng ngắn, thời gian bay đẹp."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-457",
        "TuyenBay": "Hải Phòng - Đà Nẵng",
        "GiaHienTai": 970000,
        "GiaMucTieu": 820000,
        "UuTien": false,
        "GioCatCanh": "15:40",
        "GioHaCanh": "17:00",
        "NgayBay": "2026-08-20",
        "Anh": "https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 20,
        "DiemDanhGia": 4.8,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chặng du lịch biển hot mùa hè."
    },
    {
        "HangBay": "Vietravel Airlines",
        "MaChuyenBay": "VU-557",
        "TuyenBay": "Đà Nẵng - Hải Phòng",
        "GiaHienTai": 960000,
        "GiaMucTieu": 840000,
        "UuTien": false,
        "GioCatCanh": "20:30",
        "GioHaCanh": "21:50",
        "NgayBay": "2026-08-21",
        "Anh": "https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 24,
        "DiemDanhGia": 4.3,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietravelairlines.com/",
        "GhiChu": "Phù hợp chuyến nghỉ dưỡng ngắn ngày."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-264",
        "TuyenBay": "Hải Phòng - TP. Hồ Chí Minh",
        "GiaHienTai": 1390000,
        "GiaMucTieu": 1000000,
        "UuTien": true,
        "GioCatCanh": "07:15",
        "GioHaCanh": "09:20",
        "NgayBay": "2026-08-23",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 0,
        "DiemDanhGia": 4.6,
        "TrangThai": "Hết chỗ",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Nên đặt sớm vì ghế trống còn ít."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-364",
        "TuyenBay": "TP. Hồ Chí Minh - Hải Phòng",
        "GiaHienTai": 1510000,
        "GiaMucTieu": 1150000,
        "UuTien": true,
        "GioCatCanh": "12:50",
        "GioHaCanh": "14:55",
        "NgayBay": "2026-08-24",
        "Anh": "https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 32,
        "DiemDanhGia": 4.9,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-464",
        "TuyenBay": "TP. Hồ Chí Minh - Singapore",
        "GiaHienTai": 2760000,
        "GiaMucTieu": 2180000,
        "UuTien": true,
        "GioCatCanh": "17:35",
        "GioHaCanh": "19:50",
        "NgayBay": "2026-08-25",
        "Anh": "https://images.unsplash.com/photo-1652483614757-1c7d1aafa996?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 14,
        "DiemDanhGia": 4.4,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-271",
        "TuyenBay": "Singapore - TP. Hồ Chí Minh",
        "GiaHienTai": 2540000,
        "GiaMucTieu": 2080000,
        "UuTien": false,
        "GioCatCanh": "22:05",
        "GioHaCanh": "00:20",
        "NgayBay": "2026-08-26",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 18,
        "DiemDanhGia": 4.7,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-371",
        "TuyenBay": "Đà Nẵng - Bangkok",
        "GiaHienTai": 2150000,
        "GiaMucTieu": 1830000,
        "UuTien": true,
        "GioCatCanh": "09:20",
        "GioHaCanh": "11:00",
        "NgayBay": "2026-08-27",
        "Anh": "https://images.unsplash.com/photo-1609763252108-b727080cdd4f?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 6,
        "DiemDanhGia": 4.2,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-471",
        "TuyenBay": "Bangkok - Đà Nẵng",
        "GiaHienTai": 2350000,
        "GiaMucTieu": 2070000,
        "UuTien": true,
        "GioCatCanh": "14:45",
        "GioHaCanh": "16:25",
        "NgayBay": "2026-08-28",
        "Anh": "https://images.unsplash.com/photo-1550749254-143672b82074?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 9,
        "DiemDanhGia": 4.5,
        "TrangThai": "Sắp hết chỗ",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-278",
        "TuyenBay": "Hà Nội - Bangkok",
        "GiaHienTai": 2530000,
        "GiaMucTieu": 1820000,
        "UuTien": true,
        "GioCatCanh": "19:40",
        "GioHaCanh": "21:30",
        "NgayBay": "2026-08-30",
        "Anh": "https://images.unsplash.com/photo-1609763252108-b727080cdd4f?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 12,
        "DiemDanhGia": 4.8,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-378",
        "TuyenBay": "TP. Hồ Chí Minh - Bangkok",
        "GiaHienTai": 2430000,
        "GiaMucTieu": 1850000,
        "UuTien": true,
        "GioCatCanh": "06:30",
        "GioHaCanh": "08:00",
        "NgayBay": "2026-08-31",
        "Anh": "https://images.unsplash.com/photo-1609763252108-b727080cdd4f?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 16,
        "DiemDanhGia": 4.3,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-478",
        "TuyenBay": "Hà Nội - Seoul",
        "GiaHienTai": 3810000,
        "GiaMucTieu": 3010000,
        "UuTien": true,
        "GioCatCanh": "11:40",
        "GioHaCanh": "15:55",
        "NgayBay": "2026-09-01",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 20,
        "DiemDanhGia": 4.6,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-285",
        "TuyenBay": "TP. Hồ Chí Minh - Seoul",
        "GiaHienTai": 3940000,
        "GiaMucTieu": 3230000,
        "UuTien": false,
        "GioCatCanh": "16:55",
        "GioHaCanh": "21:55",
        "NgayBay": "2026-09-02",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông đặc biệt",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 24,
        "DiemDanhGia": 4.9,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-385",
        "TuyenBay": "Hà Nội - Tokyo",
        "GiaHienTai": 4590000,
        "GiaMucTieu": 3900000,
        "UuTien": false,
        "GioCatCanh": "21:15",
        "GioHaCanh": "02:05",
        "NgayBay": "2026-09-03",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 28,
        "DiemDanhGia": 4.4,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Bamboo Airways",
        "MaChuyenBay": "QH-485",
        "TuyenBay": "TP. Hồ Chí Minh - Tokyo",
        "GiaHienTai": 5180000,
        "GiaMucTieu": 4560000,
        "UuTien": false,
        "GioCatCanh": "08:30",
        "GioHaCanh": "14:15",
        "NgayBay": "2026-09-04",
        "Anh": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Thương gia",
        "HanhLy": "20kg ký gửi",
        "SoGheTrong": 32,
        "DiemDanhGia": 4.7,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.bambooairways.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    },
    {
        "HangBay": "Vietnam Airlines",
        "MaChuyenBay": "VN-292",
        "TuyenBay": "TP. Hồ Chí Minh - Kuala Lumpur",
        "GiaHienTai": 2540000,
        "GiaMucTieu": 1830000,
        "UuTien": true,
        "GioCatCanh": "13:35",
        "GioHaCanh": "15:35",
        "NgayBay": "2026-09-06",
        "Anh": "https://images.unsplash.com/photo-1708673438435-28b7fd3e3aa4?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "12kg xách tay",
        "SoGheTrong": 14,
        "DiemDanhGia": 4.2,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietnamairlines.com/",
        "GhiChu": "Chuyến quốc tế khu vực Đông Nam Á."
    },
    {
        "HangBay": "VietJet Air",
        "MaChuyenBay": "VJ-392",
        "TuyenBay": "Hà Nội - Taipei",
        "GiaHienTai": 2730000,
        "GiaMucTieu": 2070000,
        "UuTien": true,
        "GioCatCanh": "18:25",
        "GioHaCanh": "21:10",
        "NgayBay": "2026-09-07",
        "Anh": "https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&fm=jpg&q=72&w=1600",
        "HangGhe": "Phổ thông",
        "HanhLy": "7kg xách tay",
        "SoGheTrong": 18,
        "DiemDanhGia": 4.5,
        "TrangThai": "Đang mở bán",
        "LinkDatVe": "https://www.vietjetair.com/",
        "GhiChu": "Chuyến quốc tế, giá đang thấp hơn trung bình."
    }
];

function isGeneratedMockRecord(item) {
    if (!item) return false;
    const airline = String(item.HangBay || item.Hang || item.airline || '').trim();
    const code = String(item.MaChuyenBay || item.ChuyenBay || item.flightCode || '').trim();
    const route = String(item.TuyenBay || item.ChangBay || item.route || '').trim();
    const dep = String(item.GioCatCanh || item.departureTime || '').trim();
    const arr = String(item.GioHaCanh || item.arrivalTime || '').trim();
    return /^HangBay\s*\d+$/i.test(airline)
        || /^MaChuyenBay\s*\d+$/i.test(code)
        || /^TuyenBay\s*\d+$/i.test(route)
        || /^GioCatCanh\s*\d+$/i.test(dep)
        || /^GioHaCanh\s*\d+$/i.test(arr)
        || /^Anh\s*\d+$/i.test(String(item.Anh || '').trim());
}

function getFlightCodeValue(item) {
    return String(item.MaChuyenBay || item.ChuyenBay || item.flightCode || '').trim().toUpperCase();
}

async function ensureOkResponse(res, message) {
    if (!res.ok) throw new Error(`${message} (HTTP ${res.status})`);
    if (res.status === 204) return null;
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`${message} (JSON không hợp lệ)`);
    }
}

const API_REQUEST_TIMEOUT = 12000;

function requestJSON(url, options = {}, message = 'Yêu cầu API thất bại') {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);
    const headers = { Accept: 'application/json', ...(options.headers || {}) };
    return fetch(url, { ...options, headers, signal: controller.signal })
        .then(res => ensureOkResponse(res, message))
        .catch(error => {
            if (error?.name === 'AbortError') throw new Error(`${message} (quá thời gian ${API_REQUEST_TIMEOUT / 1000}s)`);
            throw error;
        })
        .finally(() => window.clearTimeout(timeout));
}


function wait(ms) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

async function requestJSONWithRetry(url, options = {}, message = 'Yêu cầu API thất bại', retries = 1) {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await requestJSON(url, options, message);
        } catch (error) {
            lastError = error;
            const nonRetryable = /HTTP 4\d\d/.test(String(error?.message || '')) && !/HTTP 408|HTTP 429/.test(String(error?.message || ''));
            if (attempt >= retries || nonRetryable || !navigator.onLine) break;
            await wait(450 * (attempt + 1));
        }
    }
    throw lastError;
}
const api = {
    // Yêu cầu 2: dùng fetch() kết hợp Promise (.then/.catch)
    getAll: () => requestJSONWithRetry(API_URL, { method: 'GET', cache: 'no-store', credentials: 'omit' }, 'Không kết nối được MockAPI Flights', 1)
        .then(data => {
            if (!Array.isArray(data)) throw new Error('MockAPI Flights trả về dữ liệu không đúng định dạng mảng.');
            return data;
        })
        .catch(error => {
            console.error('Lỗi lấy dữ liệu Flights:', error);
            throw error;
        }),

    create: (data) => requestJSON(API_URL, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }, 'Không thể thêm chuyến bay'),

    update: (id, data) => requestJSON(`${API_URL}/${encodeURIComponent(String(id))}`, {
        method: 'PUT',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }, 'Không thể cập nhật chuyến bay'),

    patch: (id, data) => requestJSON(`${API_URL}/${encodeURIComponent(String(id))}`, {
        method: 'PUT',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }, 'Không thể cập nhật trạng thái theo dõi'),

    delete: (id) => requestJSON(`${API_URL}/${encodeURIComponent(String(id))}`, {
        method: 'DELETE',
        credentials: 'omit',
        cache: 'no-store'
    }, 'Không thể xóa chuyến bay'),

    // Xóa toàn bộ Flights theo từng nhóm nhỏ để hạn chế rate-limit của MockAPI.
    deleteAllFlights: async (onProgress = null) => {
        const rows = await api.getAll();
        const ids = rows.map(item => item?.id).filter(Boolean);
        const total = ids.length;
        let deleted = 0;
        const batchSize = 4;

        for (let index = 0; index < ids.length; index += batchSize) {
            const batch = ids.slice(index, index + batchSize);
            const results = await Promise.allSettled(batch.map(id => api.delete(id)));
            const failed = results.filter(result => result.status === 'rejected');
            deleted += results.length - failed.length;
            if (typeof onProgress === 'function') onProgress({ deleted, total });
            if (failed.length) {
                const error = failed[0].reason instanceof Error ? failed[0].reason : new Error('Không thể xóa toàn bộ dữ liệu.');
                error.deleted = deleted;
                error.total = total;
                throw error;
            }
            if (index + batchSize < ids.length) await wait(160);
        }
        return { deleted, total };
    },

    // Dọn record tự sinh của MockAPI rồi nạp bộ chuyến bay mẫu đẹp.
    syncSampleFlights: async () => {
        const current = await api.getAll();
        const junkRecords = current.filter(isGeneratedMockRecord);
        for (const item of junkRecords) {
            if (item.id) await api.delete(item.id);
        }

        const afterClean = await api.getAll();
        const existingCodes = new Set(afterClean.map(getFlightCodeValue).filter(Boolean));
        const missingSamples = SAMPLE_FLIGHTS.filter(sample => !existingCodes.has(sample.MaChuyenBay.toUpperCase()));
        let created = 0;
        const batchSize = 4;
        for (let index = 0; index < missingSamples.length; index += batchSize) {
            const batch = missingSamples.slice(index, index + batchSize);
            await Promise.all(batch.map(sample => api.create(sample)));
            created += batch.length;
        }
        await syncAirlinesResource();
        return { deleted: junkRecords.length, created };
    }
};

// Yêu cầu 4 & 6: dùng jQuery AJAX với resource thứ 2.
const getAirlines = () => {
    const dfd = $.Deferred();
    $.ajax({ url: AIRLINE_API_URL, method: 'GET', timeout: 8000, cache: false })
        .done(data => {
            const rows = Array.isArray(data) && data.length ? data : DEFAULT_AIRLINES;
            registerAirlineProfiles(rows);
            dfd.resolve(rows);
        })
        .fail(() => {
            registerAirlineProfiles(DEFAULT_AIRLINES);
            dfd.resolve(DEFAULT_AIRLINES);
        });
    return dfd.promise();
};

const deleteFlight = (id) => $.ajax({ url: `${API_URL}/${encodeURIComponent(String(id))}`, type: 'DELETE', timeout: 12000 });

async function syncAirlinesResource() {
    try {
        const current = await requestJSONWithRetry(
            AIRLINE_API_URL,
            { method: 'GET', cache: 'no-store', credentials: 'omit' },
            'Không thể tải resource Airlines',
            1
        );
        const rows = Array.isArray(current) ? current : [];
        const currentMap = new Map(rows.map(item => [normalizeAirlineKey(item.HangBay || item.name || item.airline), item]));

        for (const airline of DEFAULT_AIRLINES) {
            const key = normalizeAirlineKey(airline.HangBay);
            const existing = currentMap.get(key);
            if (!existing) {
                await requestJSON(AIRLINE_API_URL, {
                    method: 'POST', credentials: 'omit', cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(airline)
                }, 'Không thể thêm hãng bay');
                continue;
            }

            const merged = { ...existing, ...airline };
            const needsUpdate = ['MaHang', 'QuocGia', 'MauNhan', 'MauPhu', 'Logo', 'Website']
                .some(field => String(existing[field] || '') !== String(airline[field] || ''));
            if (needsUpdate && existing.id) {
                await requestJSON(`${AIRLINE_API_URL}/${encodeURIComponent(String(existing.id))}`, {
                    method: 'PUT', credentials: 'omit', cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(merged)
                }, 'Không thể cập nhật hãng bay');
            }
        }

        const refreshed = await requestJSONWithRetry(
            AIRLINE_API_URL,
            { method: 'GET', cache: 'no-store', credentials: 'omit' },
            'Không thể làm mới resource Airlines',
            1
        );
        registerAirlineProfiles(Array.isArray(refreshed) ? refreshed : DEFAULT_AIRLINES);
        return true;
    } catch (error) {
        console.warn('Không thể đồng bộ resource Airlines:', error);
        registerAirlineProfiles(DEFAULT_AIRLINES);
        return false;
    }
}
// Yêu cầu 1: hàm có tham số và trả về
const formatMoney = (amount) => {
    const value = Number(amount || 0);
    const language = localStorage.getItem('lang') || 'vi';
    const locale = ({ vi:'vi-VN', en:'en-US', zh:'zh-CN', de:'de-DE', ru:'ru-RU', th:'th-TH' })[language] || 'vi-VN';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(value);
};
