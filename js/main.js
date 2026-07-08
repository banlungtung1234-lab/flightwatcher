// =========================================================
// FlightWatcher Public Page Professional Stable 8.8
// Dùng JS thuần + jQuery + Fetch + MockAPI đúng yêu cầu kỹ thuật FIT4015.
// =========================================================
const dictionary = {
    vi: {
        page_title: 'FlightWatcher - Đặt Vé Thông Minh', skip_content: 'Bỏ qua tới nội dung chính', network_offline: 'Bạn đang ngoại tuyến. Dữ liệu có thể chưa được cập nhật.', back_to_top: 'Lên đầu trang',
        nav_admin: "<i class='fa-solid fa-user-gear me-1'></i> Quản Trị Hệ Thống",
        theme_toggle: 'Chọn chế độ hiển thị', theme_auto: 'Tự động', theme_light: 'Sáng', theme_dark: 'Tối', theme_auto_hint: 'Theo thiết bị', theme_light_hint: 'Tương phản rõ', theme_dark_hint: 'Dịu mắt ban đêm', close: 'Đóng',
        hero_title: 'Khám Phá Thế Giới Với Giá Rẻ Nhất',
        hero_sub: 'Theo dõi giá vé trực tuyến và nhanh chóng nhận biết khi giá chạm mức mục tiêu.',
        search_ph: 'Tìm theo tuyến bay, thành phố hoặc mã chuyến...',
        filter_all: 'Tất cả hãng bay', sort_def: 'Sắp xếp mặc định',
        sort_asc: 'Giá thấp đến cao', sort_desc: 'Giá cao đến thấp',
        title_list: 'Chuyến Bay Khuyến Mãi Nổi Bật', btn_sync: 'Tải lại dữ liệu',
        loading: 'Đang đồng bộ dữ liệu từ MockAPI...',
        last_sync_connecting: 'Cập nhật lần cuối: Đang kết nối...',
        last_sync: 'Cập nhật: {time} • {count} chuyến hợp lệ',
        stat_total: 'Tổng chuyến', stat_deal: 'Deal nổi bật', stat_watch: 'Đang theo dõi', stat_min: 'Giá tốt nhất',
        load_more: 'Xem thêm chuyến bay',
        footer_desc: 'Tìm kiếm chuyến bay, theo dõi mức giá mục tiêu và truy cập nhanh website chính thức của hãng.',
        footer_about: 'Khám phá', footer_partner: 'Đối Tác Liên Kết',
        footer_company: 'Ưu đãi nổi bật', footer_ai: 'Chuyến bay đã lưu',
        footer_careers: 'Đang theo dõi giá', footer_media: 'Hỗ trợ khách hàng', footer_tourism: 'Cục Du lịch Quốc gia Việt Nam',
        footer_live_data: 'Dữ liệu trực tuyến', footer_official_links: 'Liên kết hãng bay chính thức',
        footer_news: 'Bản tin khuyến mãi',
        footer_news_sub: 'Đăng ký email để lưu thông tin nhận ưu đãi và cập nhật giá trên thiết bị này.',
        newsletter_placeholder: 'Nhập địa chỉ email...', btn_sub: 'Đăng ký',
        footer_copy: '© 2026 FlightWatcher. Bảo lưu mọi quyền.',
        footer_terms: 'Điều khoản sử dụng', footer_privacy: 'Bảo mật & quyền riêng tư',
        detail_modal_label: 'Chi tiết chuyến bay', toast_success: 'Thành công!', card_empty: 'Không tìm thấy chuyến bay phù hợp!',
        empty_mock_hint: 'MockAPI đang có {count} bản ghi tự sinh không hợp lệ. Vào Admin và chọn Đồng bộ dữ liệu mẫu.',
        empty_admin_button: 'Sang Admin đồng bộ', empty_add_hint: 'Hãy thêm chuyến bay tại trang Admin để dữ liệu đồng bộ lên MockAPI.',
        label_reached: 'ĐẠT GIÁ MỤC TIÊU', label_deal: 'ƯU ĐÃI NỔI BẬT', label_good: 'GIÁ HỢP LÝ', watch_toggle_title: 'Bật hoặc tắt theo dõi giá',
        departure: 'Khởi hành', flight_time: 'Giờ bay', baggage: 'Hành lý', seats_left: 'Ghế còn', seats_unit: 'ghế',
        current_price: 'Giá hiện tại', target_price: 'Giá mục tiêu', saving: 'Tiết kiệm',
        reached_target: 'Đã chạm giá mục tiêu', target_progress: 'Đạt {percent}% mục tiêu', discount_amount: 'Giảm {amount}', monitoring: 'Đang theo dõi',
        detail: 'Chi tiết', code: 'Mã', date: 'Ngày bay', time: 'Thời gian', duration: 'Thời lượng', expected_saving: 'Tiết kiệm dự kiến',
        rating: 'Đánh giá', status: 'Trạng thái', remaining_seats: 'Còn {count} ghế',
        open_booking: 'Mở trang đặt vé', copy_code: 'Sao chép mã', disable_watch: 'Tắt theo dõi', enable_watch: 'Theo dõi giá',
        newsletter_required: 'Vui lòng nhập địa chỉ email của bạn!', newsletter_invalid: 'Địa chỉ email không hợp lệ!',
        newsletter_success: 'Email đã được lưu trên thiết bị này. Bạn có thể thay đổi hoặc xóa trong dữ liệu trình duyệt.',
        flight_not_found: 'Không tìm thấy dữ liệu chuyến bay. Vui lòng tải lại trang.', modal_error: 'Không thể mở cửa sổ chi tiết. Hãy kiểm tra Bootstrap JS.',
        watch_on: 'Đã bật theo dõi giá cho chuyến bay này.', watch_off: 'Đã tắt theo dõi giá.', api_update_error: 'Không cập nhật được MockAPI. Kiểm tra mạng hoặc endpoint.',
        copied_code: 'Đã sao chép mã {code}', legal_ack: 'Đã ghi nhận xác nhận của bạn trên trình duyệt này.', local_data_cleared: 'Đã xóa tùy chọn, email demo và xác nhận pháp lý lưu trên trình duyệt.',
        legal_search: 'Tìm trong tài liệu', legal_search_placeholder: 'Nhập từ khóa: dữ liệu, MockAPI, quyền...', legal_search_hint: 'Lọc nhanh các mục đang hiển thị',
        legal_print: 'In / Lưu PDF', legal_print_title: 'In hoặc lưu tài liệu dưới dạng PDF', legal_clear_search: 'Xóa tìm kiếm', legal_no_results: 'Không tìm thấy nội dung phù hợp.',
        legal_copy_section: 'Sao chép liên kết mục này', legal_link_copied: 'Đã sao chép liên kết đến mục tài liệu.', legal_security_label: 'MockAPI • Local Storage • HTTPS',
        legal_result_count: '{shown}/{total} mục', legal_reading_progress: 'Tiến độ đọc', legal_switch_language: 'Chuyển ngôn ngữ ngay trong tài liệu', legal_controls: 'Điều khiển tài liệu pháp lý', legal_document_language: 'Ngôn ngữ tài liệu'
    },
    en: {
        page_title: 'FlightWatcher - Smart Flight Deals', skip_content: 'Skip to main content', network_offline: 'You are offline. Data may not be up to date.', back_to_top: 'Back to top',
        nav_admin: "<i class='fa-solid fa-user-gear me-1'></i> Admin Dashboard",
        theme_toggle: 'Choose display mode', theme_auto: 'Auto', theme_light: 'Light', theme_dark: 'Dark', theme_auto_hint: 'Follow device', theme_light_hint: 'Clear contrast', theme_dark_hint: 'Comfortable at night', close: 'Close',
        hero_title: 'Explore More with Smarter Airfares',
        hero_sub: 'Track fares online and quickly see when a flight reaches your target price.',
        search_ph: 'Search by route, city, or flight number...',
        filter_all: 'All airlines', sort_def: 'Recommended order',
        sort_asc: 'Lowest price first', sort_desc: 'Highest price first',
        title_list: 'Featured Flight Deals', btn_sync: 'Refresh data',
        loading: 'Synchronizing data from MockAPI...',
        last_sync_connecting: 'Last update: Connecting...',
        last_sync: 'Updated: {time} • {count} valid flights',
        stat_total: 'Total flights', stat_deal: 'Featured deals', stat_watch: 'Price watches', stat_min: 'Best price',
        load_more: 'Load more flights',
        footer_desc: 'Search flights, track target fares, and continue securely to official airline websites.',
        footer_about: 'Explore', footer_partner: 'Official Partners',
        footer_company: 'Featured offers', footer_ai: 'Saved flights',
        footer_careers: 'Tracked fares', footer_media: 'Customer support', footer_tourism: 'Vietnam National Authority of Tourism',
        footer_live_data: 'Live data', footer_official_links: 'Official airline links',
        footer_news: 'Fare newsletter',
        footer_news_sub: 'Save your email on this device to receive fare and offer updates.',
        newsletter_placeholder: 'Enter your email address...', btn_sub: 'Subscribe',
        footer_copy: '© 2026 FlightWatcher. All rights reserved.',
        footer_terms: 'Terms of Use', footer_privacy: 'Security & Privacy',
        detail_modal_label: 'Flight details', toast_success: 'Success!', card_empty: 'No matching flights found!',
        empty_mock_hint: 'MockAPI contains {count} invalid auto-generated records. Open Admin and choose Sync sample data.',
        empty_admin_button: 'Open Admin to sync', empty_add_hint: 'Add flights in the Admin page to synchronize them with MockAPI.',
        label_reached: 'TARGET FARE REACHED', label_deal: 'FEATURED OFFER', label_good: 'FAIR PRICE', watch_toggle_title: 'Enable or disable fare tracking',
        departure: 'Departure', flight_time: 'Flight time', baggage: 'Baggage', seats_left: 'Seats left', seats_unit: 'seats',
        current_price: 'Current fare', target_price: 'Target fare', saving: 'Savings',
        reached_target: 'Target fare reached', target_progress: '{percent}% toward target', discount_amount: 'Save {amount}', monitoring: 'Monitoring',
        detail: 'Details', code: 'Code', date: 'Flight date', time: 'Time', duration: 'Duration', expected_saving: 'Estimated savings',
        rating: 'Rating', status: 'Status', remaining_seats: '{count} seats remaining',
        open_booking: 'Open booking website', copy_code: 'Copy flight code', disable_watch: 'Stop tracking', enable_watch: 'Track fare',
        newsletter_required: 'Please enter your email address.', newsletter_invalid: 'Please enter a valid email address.',
        newsletter_success: 'Your email has been saved on this device. You can update or remove it from browser data.',
        flight_not_found: 'Flight data could not be found. Please refresh the page.', modal_error: 'The detail window could not be opened. Check Bootstrap JS.',
        watch_on: 'Fare tracking has been enabled for this flight.', watch_off: 'Fare tracking has been disabled.', api_update_error: 'MockAPI could not be updated. Check your connection and endpoint.',
        copied_code: 'Copied flight code {code}', legal_ack: 'Your acknowledgement has been saved in this browser.', local_data_cleared: 'Local preferences, demo emails, and legal acknowledgements have been cleared.',
        legal_search: 'Search this document', legal_search_placeholder: 'Try: data, MockAPI, rights...', legal_search_hint: 'Filter the visible sections instantly',
        legal_print: 'Print / Save PDF', legal_print_title: 'Print or save this document as a PDF', legal_clear_search: 'Clear search', legal_no_results: 'No matching content was found.',
        legal_copy_section: 'Copy link to this section', legal_link_copied: 'Section link copied.', legal_security_label: 'MockAPI • Local Storage • HTTPS',
        legal_result_count: '{shown}/{total} sections', legal_reading_progress: 'Reading progress', legal_switch_language: 'Switch language without closing this document', legal_controls: 'Legal document controls', legal_document_language: 'Document language'
    }
};

const legalDocuments = {
    vi: {
        languageBadge: 'VI • Tiếng Việt', effective: 'Có hiệu lực: 07/07/2026', updated: 'Cập nhật: 07/07/2026', version: 'Phiên bản 8.8',
        terms: {
            eyebrow: 'FLIGHTWATCHER • TÀI LIỆU DỊCH VỤ', title: 'Điều khoản sử dụng',
            subtitle: 'Quy định rõ phạm vi dịch vụ, trách nhiệm và cách sử dụng FlightWatcher an toàn.',
            noticeTitle: 'FlightWatcher là nền tảng tham khảo thông tin chuyến bay',
            noticeText: 'Nền tảng sử dụng MockAPI để minh họa tìm kiếm và theo dõi giá vé. FlightWatcher không phải hãng hàng không, đại lý bán vé hoặc cổng thanh toán.',
            tocTitle: 'Nội dung chính',
            summaries: [
                ['fa-plane-circle-check','Công cụ tham khảo','Dữ liệu hỗ trợ tìm kiếm và so sánh; không phải xác nhận đặt chỗ.'],
                ['fa-money-bill-trend-up','Giá có thể thay đổi','Giá cuối cùng phải được xác nhận trên website của hãng hoặc đối tác.'],
                ['fa-shield-halved','Sử dụng có trách nhiệm','Không lạm dụng API, phá hoại dữ liệu hoặc giả mạo dịch vụ chính thức.']
            ],
            sections: [
                ['scope','01','Phạm vi và chấp thuận','Áp dụng cho trang khách, trang quản trị và mọi chức năng kết nối MockAPI.','Khi truy cập hoặc tiếp tục sử dụng FlightWatcher, bạn xác nhận đã đọc và đồng ý với các điều khoản này. Nếu không đồng ý, bạn nên ngừng sử dụng nền tảng.'],
                ['service','02','Bản chất dịch vụ','FlightWatcher hiển thị, lọc, sắp xếp và theo dõi dữ liệu chuyến bay.','Thông tin về giá, giờ bay, số ghế, hành lý, đánh giá và trạng thái có thể là dữ liệu minh họa. Liên kết đặt vé chuyển tới website bên thứ ba và giao dịch tại đó chịu điều khoản riêng của bên cung cấp.'],
                ['pricing','03','Giá vé và độ chính xác','Giá hàng không có thể thay đổi theo thuế, phí, hạng ghế và tình trạng chỗ.','FlightWatcher không cam kết dữ liệu luôn đầy đủ hoặc theo thời gian thực. Người dùng phải kiểm tra lại hành trình, hành lý, điều kiện vé và tổng số tiền trước khi thanh toán.'],
                ['conduct','04','Sử dụng được phép','Bảo vệ tính ổn định và tính toàn vẹn của dữ liệu.','<ul class="legal-check-list"><li>Không gửi mã độc, dữ liệu giả mạo hoặc nội dung gây lỗi giao diện.</li><li>Không dùng bot, crawler hoặc tập lệnh tạo lượng yêu cầu bất thường.</li><li>Không sửa, xóa hoặc truy cập dữ liệu ngoài phạm vi được cho phép.</li><li>Không giới thiệu FlightWatcher như một dịch vụ bán vé chính thức.</li></ul>'],
                ['thirdparty','05','Liên kết và dịch vụ bên thứ ba','Website hãng bay và tài nguyên CDN có chính sách riêng.','FlightWatcher không kiểm soát tính sẵn sàng, nội dung, giá hoặc cơ chế bảo mật của website bên thứ ba. Việc truy cập liên kết ngoài do người dùng tự quyết định.'],
                ['ip','06','Sở hữu trí tuệ','Tên gọi, giao diện và nội dung hiển thị của FlightWatcher được bảo lưu.','Không sao chép, phân phối hoặc sử dụng toàn bộ nội dung nhận diện của dịch vụ khi chưa có sự đồng ý phù hợp.'],
                ['liability','07','Giới hạn trách nhiệm','FlightWatcher cung cấp thông tin tham khảo và không trực tiếp bán vé hoặc xử lý thanh toán.','Người dùng cần xác nhận lịch bay, giá cuối cùng và điều kiện vé trên website chính thức của hãng. FlightWatcher không chịu trách nhiệm cho thay đổi từ hãng bay hoặc website bên thứ ba.'],
                ['admin-access','08','Quyền truy cập quản trị','Trang Admin sử dụng cổng đăng nhập phía trình duyệt cho mục đích trình diễn.','Thông tin đăng nhập demo không tạo ra bảo mật cấp máy chủ. Người dùng được cấp quyền phải đăng xuất sau khi thao tác, không chia sẻ thông tin truy cập và không sử dụng trang Admin để lưu dữ liệu nhạy cảm.'],
                ['changes','09','Thay đổi và liên hệ','Điều khoản có thể được cập nhật khi chức năng hoặc phương thức xử lý dữ liệu thay đổi.','Ngày cập nhật mới nhất được hiển thị ở đầu tài liệu. Câu hỏi có thể gửi qua địa chỉ hỗ trợ hiển thị trên website.']
            ],
            consent: 'Tôi xác nhận đã đọc và hiểu Điều khoản sử dụng.', close: 'Đóng', accept: '<i class="fa-solid fa-check me-1"></i> Xác nhận đã đọc'
        },
        privacy: {
            eyebrow: 'FLIGHTWATCHER • BẢO MẬT & QUYỀN RIÊNG TƯ', title: 'Chính sách Bảo mật & Quyền riêng tư',
            subtitle: 'Giải thích dữ liệu nào được xử lý, được lưu ở đâu và cách bạn kiểm soát dữ liệu.',
            noticeTitle: 'Minh bạch ngay từ thiết kế',
            noticeText: 'Bản demo có cổng đăng nhập Admin chạy hoàn toàn ở phía trình duyệt để minh họa kiểm soát truy cập; đây không phải xác thực máy chủ. Hệ thống không xử lý thanh toán và không gửi email thật. Không nhập mật khẩu cá nhân, giấy tờ hoặc dữ liệu thanh toán vào biểu mẫu.',
            tocTitle: 'Nội dung chính',
            summaries: [
                ['fa-laptop','Dữ liệu trình duyệt','Ngôn ngữ, giao diện, bộ lọc và xác nhận pháp lý lưu trong Local Storage.'],
                ['fa-cloud','Dữ liệu chuyến bay','Chuyến bay và hãng bay được đọc, thêm, sửa và xóa thông qua API dữ liệu của hệ thống.'],
                ['fa-user-shield','Bạn có quyền kiểm soát','Có thể xóa Local Storage, dừng sử dụng hoặc quản lý dữ liệu tại trang Admin.']
            ],
            sections: [
                ['overview','01','Dữ liệu được xử lý','FlightWatcher chỉ xử lý dữ liệu cần cho giao diện và chức năng demo.','<div class="legal-data-table"><div class="legal-data-row legal-data-head"><span>Nhóm dữ liệu</span><span>Nơi lưu</span><span>Thời hạn</span></div><div class="legal-data-row"><span>Ngôn ngữ, theme, bộ lọc</span><span>Local Storage</span><span>Đến khi bạn xóa</span></div><div class="legal-data-row"><span>Phiên đăng nhập Admin và giới hạn thử lại</span><span>Session/Local Storage</span><span>Đến khi đăng xuất, hết hạn hoặc xóa</span></div><div class="legal-data-row"><span>Chuyến bay, hãng bay</span><span>MockAPI</span><span>Đến khi Admin sửa/xóa</span></div><div class="legal-data-row"><span>Email bản tin</span><span>Local Storage (demo)</span><span>Đến khi bạn xóa</span></div></div>'],
                ['purpose','02','Mục đích xử lý','Dữ liệu được dùng để vận hành và cá nhân hóa trải nghiệm.','Các lựa chọn cục bộ giúp duy trì ngôn ngữ, chế độ hiển thị và bộ lọc. Dữ liệu MockAPI giúp đồng bộ danh sách chuyến bay giữa trang khách và trang quản trị, đồng thời minh họa CRUD bất đồng bộ.'],
                ['storage','03','Lưu trữ và thời hạn','Dữ liệu được chia thành dữ liệu cục bộ trên trình duyệt và dữ liệu chuyến bay trên API.','Bạn có thể xóa dữ liệu cục bộ trong cài đặt trình duyệt. Dữ liệu chuyến bay tồn tại cho tới khi quản trị viên cập nhật, xóa hoặc dịch vụ API ngừng hoạt động.'],
                ['sharing','04','Dịch vụ bên thứ ba','Ứng dụng dùng thư viện CDN, hình ảnh và liên kết ngoài.','Bootstrap, jQuery và Font Awesome được đóng gói cục bộ; ảnh Unsplash và MockAPI có thể nhận thông tin kỹ thuật cơ bản như địa chỉ IP, trình duyệt hoặc thời điểm truy cập theo chính sách riêng của họ. FlightWatcher không bán dữ liệu cá nhân.'],
                ['security','05','An toàn dữ liệu','Dự án áp dụng validation, escape nội dung và kiểm tra URL.','Do endpoint MockAPI phục vụ mục đích học tập và có thể công khai, không sử dụng hệ thống để lưu mật khẩu, số thẻ, giấy tờ định danh hoặc dữ liệu nhạy cảm. Không có biện pháp bảo mật nào bảo đảm an toàn tuyệt đối.'],
                ['rights','06','Quyền và lựa chọn của bạn','Bạn có thể kiểm soát dữ liệu cục bộ và các tùy chọn trong phạm vi chức năng hiện có.','<ul class="legal-check-list"><li>Xóa Local Storage để đặt lại ngôn ngữ, giao diện, bộ lọc và xác nhận.</li><li>Xóa email đăng ký đã lưu trên trình duyệt.</li><li>Sửa hoặc xóa dữ liệu chuyến bay tại trang Admin nếu có quyền truy cập.</li><li>Dừng sử dụng dịch vụ hoặc không mở liên kết bên thứ ba bất kỳ lúc nào.</li></ul>'],
                ['children','07','Dữ liệu trẻ em và dữ liệu nhạy cảm','FlightWatcher không chủ đích thu thập dữ liệu trẻ em hoặc thông tin nhạy cảm.','Nếu phát hiện dữ liệu cá nhân được nhập nhầm vào MockAPI, quản trị viên cần xóa ngay và đổi endpoint nếu cần để hạn chế truy cập tiếp tục.'],
                ['admin-session','08','Đăng nhập và phiên Admin','Cổng Admin lưu trạng thái phiên cục bộ để duy trì đăng nhập và giới hạn số lần thử sai.','Mật khẩu demo được kiểm tra bằng giá trị băm trong JavaScript, nhưng mã nguồn Front-End có thể được xem bởi người dùng. Vì vậy đây chỉ là lớp bảo vệ giao diện cho bài tập, không phải cơ chế bảo mật phù hợp cho dữ liệu thật.'],
                ['updates','09','Cập nhật chính sách','Chính sách có thể thay đổi khi FlightWatcher bổ sung chức năng hoặc phương thức xử lý dữ liệu mới.','Nếu dịch vụ bổ sung tài khoản máy chủ, email, phân tích hành vi hoặc thanh toán, chính sách sẽ được cập nhật trước khi các chức năng đó được sử dụng.']
            ],
            controlsTitle: 'Trung tâm kiểm soát quyền riêng tư', controlsText: 'Bạn có thể xóa dữ liệu cục bộ của bản demo hoặc mở Admin để quản lý dữ liệu chuyến bay trên MockAPI.', clearButton: 'Xóa dữ liệu cục bộ', adminButton: 'Mở trang Admin',
            consent: 'Tôi đã đọc và hiểu cách FlightWatcher xử lý dữ liệu trong bản demo.', close: 'Đóng', accept: '<i class="fa-solid fa-shield-halved me-1"></i> Xác nhận đã đọc'
        }
    },
    en: {
        languageBadge: 'EN • English', effective: 'Effective: 07 Jul 2026', updated: 'Last updated: 07 Jul 2026', version: 'Version 8.8',
        terms: {
            eyebrow: 'FLIGHTWATCHER • SERVICE DOCUMENT', title: 'Terms of Use',
            subtitle: 'Clear rules on the service scope, responsibilities, and responsible use of FlightWatcher.',
            noticeTitle: 'FlightWatcher is a flight-information reference platform',
            noticeText: 'The platform uses MockAPI to demonstrate fare search and tracking. FlightWatcher is not an airline, ticket agency, or payment gateway.',
            tocTitle: 'In this document',
            summaries: [
                ['fa-plane-circle-check','Reference tool','Information supports search and comparison; it is not a booking confirmation.'],
                ['fa-money-bill-trend-up','Fares may change','The final fare must be verified on the airline or partner website.'],
                ['fa-shield-halved','Responsible use','Do not abuse the API, damage data, or impersonate an official booking service.']
            ],
            sections: [
                ['scope','01','Scope and acceptance','These terms apply to the public page, Admin page, and all MockAPI-connected features.','By accessing or continuing to use FlightWatcher, you confirm that you have read and accepted these terms. Stop using the platform if you do not agree.'],
                ['service','02','Nature of the service','FlightWatcher displays, filters, sorts, and tracks flight data.','Fare, schedule, seat, baggage, rating, and status information may be demonstration data. Booking links open third-party websites, and transactions there are governed by the provider’s own terms.'],
                ['pricing','03','Fares and data accuracy','Airfares may change due to taxes, fees, cabin class, and seat availability.','FlightWatcher does not guarantee that all information is complete or real-time. Verify the itinerary, baggage rules, fare conditions, and total amount before payment.'],
                ['conduct','04','Acceptable use','Help protect system stability and data integrity.','<ul class="legal-check-list"><li>Do not submit malware, false data, or content designed to break the interface.</li><li>Do not use bots, crawlers, or scripts that create abnormal API traffic.</li><li>Do not alter, delete, or access data beyond your permitted scope.</li><li>Do not present FlightWatcher as an official ticket-selling service.</li></ul>'],
                ['thirdparty','05','Third-party links and services','Airline websites and CDN resources follow their own policies.','FlightWatcher does not control the availability, content, prices, or security practices of third-party websites. You choose whether to follow external links.'],
                ['ip','06','Intellectual property','The FlightWatcher name, interface, and displayed content are protected.','Do not copy, distribute, or reuse the complete service identity without appropriate permission.'],
                ['liability','07','Limitation of liability','FlightWatcher provides reference information and does not sell tickets or process payments.','Users must verify schedules, final fares, and ticket conditions on the airline official website. FlightWatcher is not responsible for airline changes or third-party incidents.'],
                ['admin-access','08','Administrative access','The Admin page uses a browser-side sign-in gate for demonstration purposes.','Demo credentials do not provide server-grade security. Authorized users should sign out after making changes, avoid sharing access details, and never store sensitive information in the Admin interface.'],
                ['changes','09','Changes and contact','These terms may be updated when features or data practices change.','The latest update date appears at the top of this document. Questions may be sent through the support contact shown on the website.']
            ],
            consent: 'I confirm that I have read and understood the Terms of Use.', close: 'Close', accept: '<i class="fa-solid fa-check me-1"></i> Confirm acknowledgement'
        },
        privacy: {
            eyebrow: 'FLIGHTWATCHER • SECURITY & PRIVACY', title: 'Security & Privacy Policy',
            subtitle: 'What data is processed, where it is stored, and the controls available to you.',
            noticeTitle: 'Transparency by design',
            noticeText: 'This demo includes a browser-side Admin sign-in gate to demonstrate access control; it is not server-side authentication. The system does not process payments or send real emails. Never enter personal passwords, identity documents, or payment information into its forms.',
            tocTitle: 'In this document',
            summaries: [
                ['fa-laptop','Browser data','Language, theme, filters, and legal acknowledgements are stored in Local Storage.'],
                ['fa-cloud','Flight data','Flight and airline records are read, created, updated, and deleted through the service API.'],
                ['fa-user-shield','You stay in control','You can clear Local Storage, stop using the app, or manage records through Admin.']
            ],
            sections: [
                ['overview','01','Data we process','FlightWatcher processes only the information needed for the interface and demo features.','<div class="legal-data-table"><div class="legal-data-row legal-data-head"><span>Data category</span><span>Storage</span><span>Retention</span></div><div class="legal-data-row"><span>Language, theme, filters</span><span>Local Storage</span><span>Until you clear it</span></div><div class="legal-data-row"><span>Admin session and retry lock state</span><span>Session/Local Storage</span><span>Until sign-out, expiry, or deletion</span></div><div class="legal-data-row"><span>Flights and airlines</span><span>MockAPI</span><span>Until Admin changes/deletes it</span></div><div class="legal-data-row"><span>Newsletter email</span><span>Local Storage (demo)</span><span>Until you clear it</span></div></div>'],
                ['purpose','02','Why we process it','Information is used to operate and personalize the demo experience.','Local preferences preserve your language, display mode, and filters. MockAPI records synchronize the public and Admin pages and demonstrate asynchronous CRUD operations.'],
                ['storage','03','Storage and retention','Information is split between local browser data and flight records stored through the API.','You can clear local data in your browser settings. Flight records remain until an administrator updates or deletes them, or the API service becomes unavailable.'],
                ['sharing','04','Third-party services','The app uses CDN libraries, hosted images, and external links.','Google Fonts, Unsplash, MockAPI, and external airline links may receive basic technical information such as IP address, browser type, or access time under their own policies. FlightWatcher does not sell personal data.'],
                ['security','05','Data security','FlightWatcher uses validation, HTML escaping, URL checks, and browser security controls.','Do not store passwords, card numbers, identity documents, or other sensitive information in the flight-data API. No security measure can guarantee absolute protection.'],
                ['rights','06','Your rights and choices','You can control local information and settings within the available features.','<ul class="legal-check-list"><li>Clear Local Storage to reset language, appearance, filters, and acknowledgements.</li><li>Remove the saved newsletter email from your browser.</li><li>Edit or delete flight records from Admin when authorized.</li><li>Stop using the service or avoid third-party links at any time.</li></ul>'],
                ['children','07','Children and sensitive data','FlightWatcher does not intentionally collect children’s data or sensitive information.','If personal data is accidentally entered into MockAPI, the administrator should remove it immediately and change the endpoint if necessary to limit continued access.'],
                ['admin-session','08','Admin sign-in and session','The Admin gate stores local session state to keep authorized users signed in and temporarily limit repeated failed attempts.','Because authentication is implemented in the browser, it should only protect non-sensitive administrative demo data and must not be treated as server-grade security.'],
                ['updates','09','Policy updates','This policy will change if new features alter data practices.','If server-side accounts, real email delivery, analytics, or payments are added later, this policy will be updated before those features are used. The effective date is always shown at the top.']
            ],
            controlsTitle: 'Privacy control center', controlsText: 'Clear local demo data or open Admin to manage flight records stored in MockAPI.', clearButton: 'Clear local data', adminButton: 'Open Admin',
            consent: 'I have read and understood how FlightWatcher processes data in this demo.', close: 'Close', accept: '<i class="fa-solid fa-shield-halved me-1"></i> Confirm acknowledgement'
        }
    }
};

let currentLang = localStorage.getItem('lang') || 'vi';
let allFlights = [];
let filteredFlights = [];
let mockapiGeneratedCount = 0;
let visibleCount = 6;
const PAGE_SIZE = 6;
let lastSyncAt = null;
let currentThemeMode = 'auto';
let legalScrollFrame = null;
const LEGAL_VERSION = '8.8';
const DEFAULT_LEGAL_LANGUAGE = 'vi';
const legalLanguageState = { terms: DEFAULT_LEGAL_LANGUAGE, privacy: DEFAULT_LEGAL_LANGUAGE };

function getI18n(key) {
    return dictionary[currentLang]?.[key] || dictionary.vi[key] || key;
}

function translate(key, variables = {}) {
    let output = String(getI18n(key));
    Object.entries(variables).forEach(([name, value]) => {
        output = output.replaceAll(`{${name}}`, String(value));
    });
    return output;
}

function updateLanguage(lang) {
    currentLang = dictionary[lang] ? lang : 'vi';
    localStorage.setItem('lang', currentLang);
    document.documentElement.lang = currentLang;
    document.title = getI18n('page_title');

    const selector = document.getElementById('lang-selector');
    if (selector) selector.value = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const value = getI18n(element.getAttribute('data-i18n'));
        if (!value) return;
        if (element.matches('input, textarea')) element.placeholder = value;
        else element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = getI18n(element.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        element.title = getI18n(element.getAttribute('data-i18n-title'));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        element.setAttribute('aria-label', getI18n(element.getAttribute('data-i18n-aria-label')));
    });

    renderLegalDocuments();
    updateLastSyncText();
    if (allFlights.length > 0) applyFiltersAndSort(false);
    updateThemeUI(currentThemeMode);
}

function getLegalLanguage(kind) {
    return dictionary[legalLanguageState[kind]] ? legalLanguageState[kind] : DEFAULT_LEGAL_LANGUAGE;
}

function getLegalI18n(kind, key) {
    const lang = getLegalLanguage(kind);
    return dictionary[lang]?.[key] || dictionary.vi[key] || key;
}

function translateLegal(kind, key, variables = {}) {
    let output = String(getLegalI18n(kind, key));
    Object.entries(variables).forEach(([name, value]) => {
        output = output.replaceAll(`{${name}}`, String(value));
    });
    return output;
}

function renderLegalDocuments() {
    ['terms', 'privacy'].forEach(renderLegalDocumentByKind);
    updateLegalLanguageControls();
    syncLegalAcknowledgementState();
    requestAnimationFrame(() => {
        ['terms', 'privacy'].forEach(kind => {
            updateLegalReadingProgress(kind);
            updateActiveLegalSection(kind);
        });
    });
}

function renderLegalDocumentByKind(kind) {
    const lang = getLegalLanguage(kind);
    const source = legalDocuments[lang] || legalDocuments.vi;
    renderLegalDocument(kind, source[kind], source);
    updateLegalLanguageControls(kind);
    syncLegalAcknowledgementState(kind);
}

function renderLegalDocument(kind, documentData, common) {
    const setText = (id, value, html = false) => {
        const element = document.getElementById(id);
        if (!element) return;
        if (html) element.innerHTML = value;
        else element.textContent = value;
    };

    setText(`${kind}Eyebrow`, documentData.eyebrow);
    setText(`${kind}ModalLabel`, documentData.title);
    setText(`${kind}Subtitle`, documentData.subtitle);
    setText(`${kind}ConsentLabel`, documentData.consent);
    setText(`${kind}CloseButton`, documentData.close);
    setText(`${kind}AcceptButton`, documentData.accept, true);

    const meta = document.getElementById(`${kind}Meta`);
    if (meta) {
        meta.className = 'legal-meta-bar';
        meta.innerHTML = `
            <span><i class="fa-regular fa-calendar-check"></i>${common.effective}</span>
            <span><i class="fa-solid fa-rotate"></i>${common.updated}</span>
            <span><i class="fa-solid fa-file-shield"></i>${common.version}</span>
            <span><i class="fa-solid fa-language"></i>${common.languageBadge}</span>`;
    }

    const body = document.getElementById(`${kind}LegalBody`);
    if (!body) return;
    const noticeClass = kind === 'privacy' ? 'legal-notice-success' : 'legal-notice-primary';
    const noticeIcon = kind === 'privacy' ? 'fa-user-shield' : 'fa-circle-info';
    const summaryHtml = documentData.summaries.map(([icon, title, text]) => `
        <article class="legal-summary-card">
            <span><i class="fa-solid ${icon}"></i></span>
            <div><strong>${title}</strong><small>${text}</small></div>
        </article>`).join('');
    const navHtml = documentData.sections.map(section => `
        <a href="#${kind}-${section[0]}" class="legal-nav-link" data-legal-section-id="${kind}-${section[0]}"><span>${section[1]}</span><b>${section[2]}</b></a>`).join('');
    const sectionHtml = documentData.sections.map(section => `
        <section class="legal-section" id="${kind}-${section[0]}" data-legal-search-text="${escapeHTML(removeVietnameseAccent(`${section[2]} ${section[3]} ${stripHTML(section[4])}`))}">
            <div class="legal-section-heading">
                <span>${section[1]}</span>
                <div><h3>${section[2]}</h3><p>${section[3]}</p></div>
                <button type="button" class="legal-section-link" data-legal-action="copy-section" data-target="${kind}-${section[0]}" title="${escapeHTML(getLegalI18n(kind, 'legal_copy_section'))}" aria-label="${escapeHTML(getLegalI18n(kind, 'legal_copy_section'))}"><i class="fa-solid fa-link"></i></button>
            </div>
            <div class="legal-section-content">${section[4]}</div>
        </section>`).join('');

    body.innerHTML = `
        <div class="legal-document-tools">
            <label class="legal-search-field" for="${kind}LegalSearch">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span class="visually-hidden">${getLegalI18n(kind, 'legal_search')}</span>
                <input type="search" id="${kind}LegalSearch" data-legal-search="${kind}" autocomplete="off" placeholder="${escapeHTML(getLegalI18n(kind, 'legal_search_placeholder'))}">
                <button type="button" class="legal-search-clear" data-legal-action="clear-search" data-legal-kind="${kind}" title="${escapeHTML(getLegalI18n(kind, 'legal_clear_search'))}" aria-label="${escapeHTML(getLegalI18n(kind, 'legal_clear_search'))}"><i class="fa-solid fa-xmark"></i></button>
            </label>
            <div class="legal-tool-meta">
                <span><i class="fa-solid fa-wand-magic-sparkles"></i>${getLegalI18n(kind, 'legal_search_hint')}</span>
                <strong id="${kind}ResultCount">${translateLegal(kind, 'legal_result_count', { shown: documentData.sections.length, total: documentData.sections.length })}</strong>
            </div>
        </div>
        <div class="legal-notice ${noticeClass}">
            <i class="fa-solid ${noticeIcon}"></i>
            <div><strong>${documentData.noticeTitle}</strong><p>${documentData.noticeText}</p></div>
        </div>
        <div class="legal-summary-grid">${summaryHtml}</div>
        <div class="legal-layout">
            <aside class="legal-nav-panel">
                <div class="legal-nav-title"><i class="fa-solid fa-list-check"></i>${documentData.tocTitle}</div>
                <nav>${navHtml}</nav>
                <div class="legal-nav-security"><i class="fa-solid fa-lock"></i><span>${getLegalI18n(kind, 'legal_security_label')}</span></div>
            </aside>
            <div class="legal-document">${sectionHtml}<div class="legal-empty-state" id="${kind}LegalEmpty" hidden><i class="fa-regular fa-folder-open"></i><strong>${getLegalI18n(kind, 'legal_no_results')}</strong></div></div>
        </div>
        ${kind === 'privacy' ? `
            <div class="legal-privacy-controls">
                <div><strong>${documentData.controlsTitle}</strong><p>${documentData.controlsText}</p></div>
                <div class="d-flex flex-wrap gap-2">
                    <button type="button" class="btn btn-outline-danger rounded-3 fw-bold" data-legal-action="clear-local"><i class="fa-solid fa-eraser me-1"></i>${documentData.clearButton}</button>
                    <a href="admin.html" class="btn btn-outline-primary rounded-3 fw-bold"><i class="fa-solid fa-user-gear me-1"></i>${documentData.adminButton}</a>
                </div>
            </div>` : ''}`;
}

function stripHTML(value) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = String(value || '');
    return wrapper.textContent || wrapper.innerText || '';
}

function updateLegalLanguageControls(onlyKind = null) {
    document.querySelectorAll('[data-legal-lang]').forEach(button => {
        const kind = button.dataset.legalKind;
        if (onlyKind && kind !== onlyKind) return;
        const active = button.dataset.legalLang === getLegalLanguage(kind);
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
        button.title = getLegalI18n(kind, 'legal_switch_language');
    });

    const kinds = onlyKind ? [onlyKind] : ['terms', 'privacy'];
    kinds.forEach(kind => {
        const modal = document.getElementById(`${kind}Modal`);
        if (!modal) return;
        modal.querySelector('.legal-header-actions')?.setAttribute('aria-label', getLegalI18n(kind, 'legal_controls'));
        modal.querySelector('.legal-language-switcher')?.setAttribute('aria-label', getLegalI18n(kind, 'legal_document_language'));
        const printButton = modal.querySelector('[data-legal-action="print"]');
        if (printButton) {
            printButton.title = getLegalI18n(kind, 'legal_print_title');
            printButton.setAttribute('aria-label', getLegalI18n(kind, 'legal_print'));
        }
        modal.querySelector('.legal-close')?.setAttribute('aria-label', getLegalI18n(kind, 'close'));
    });
}

function getOpenLegalKind() {
    if (document.getElementById('privacyModal')?.classList.contains('show')) return 'privacy';
    if (document.getElementById('termsModal')?.classList.contains('show')) return 'terms';
    return null;
}

function switchLegalLanguage(kind, lang) {
    if (!['terms', 'privacy'].includes(kind) || !dictionary[lang]) return;
    const body = document.getElementById(`${kind}ModalBody`);
    const maxBefore = body ? Math.max(1, body.scrollHeight - body.clientHeight) : 1;
    const ratio = body ? body.scrollTop / maxBefore : 0;

    legalLanguageState[kind] = lang;
    renderLegalDocumentByKind(kind);

    requestAnimationFrame(() => {
        const updatedBody = document.getElementById(`${kind}ModalBody`);
        if (updatedBody) {
            const maxAfter = Math.max(0, updatedBody.scrollHeight - updatedBody.clientHeight);
            updatedBody.scrollTop = Math.min(maxAfter, Math.round(maxAfter * ratio));
            updateLegalReadingProgress(kind);
            updateActiveLegalSection(kind);
        }
    });
}

function resetLegalDocument(kind, { render = true } = {}) {
    if (!['terms', 'privacy'].includes(kind)) return;
    legalLanguageState[kind] = DEFAULT_LEGAL_LANGUAGE;
    if (render) renderLegalDocumentByKind(kind);
    const body = document.getElementById(`${kind}ModalBody`);
    if (body) body.scrollTop = 0;
}

function filterLegalSections(kind, query) {
    const normalizedQuery = removeVietnameseAccent(String(query || '').trim());
    const sections = [...document.querySelectorAll(`#${kind}LegalBody .legal-section`)];
    let shown = 0;
    sections.forEach(section => {
        const match = !normalizedQuery || (section.dataset.legalSearchText || '').includes(normalizedQuery);
        section.hidden = !match;
        const nav = document.querySelector(`#${kind}LegalBody .legal-nav-link[data-legal-section-id="${section.id}"]`);
        if (nav) nav.hidden = !match;
        if (match) shown += 1;
    });
    const empty = document.getElementById(`${kind}LegalEmpty`);
    if (empty) empty.hidden = shown !== 0;
    const count = document.getElementById(`${kind}ResultCount`);
    if (count) count.textContent = translateLegal(kind, 'legal_result_count', { shown, total: sections.length });
    updateLegalReadingProgress(kind);
    updateActiveLegalSection(kind);
}

function updateLegalReadingProgress(kind) {
    const body = document.getElementById(`${kind}ModalBody`);
    const bar = document.getElementById(`${kind}ReadingProgress`);
    if (!body || !bar) return;
    const max = Math.max(1, body.scrollHeight - body.clientHeight);
    const percent = body.scrollHeight <= body.clientHeight ? 100 : Math.min(100, Math.max(0, (body.scrollTop / max) * 100));
    bar.style.width = `${percent}%`;
    bar.parentElement?.setAttribute('aria-label', `${getLegalI18n(kind, 'legal_reading_progress')}: ${Math.round(percent)}%`);
    bar.parentElement?.setAttribute('aria-valuenow', String(Math.round(percent)));
}

function updateActiveLegalSection(kind) {
    const body = document.getElementById(`${kind}ModalBody`);
    if (!body) return;
    const sections = [...body.querySelectorAll('.legal-section:not([hidden])')];
    let activeId = sections[0]?.id || '';
    const bodyTop = body.getBoundingClientRect().top;
    sections.forEach(section => {
        if (section.getBoundingClientRect().top - bodyTop <= 145) activeId = section.id;
    });
    body.querySelectorAll('.legal-nav-link').forEach(link => {
        const active = link.dataset.legalSectionId === activeId;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });
}

function printLegalDocument(kind) {
    document.body.dataset.printLegal = kind;
    const cleanup = () => delete document.body.dataset.printLegal;
    window.addEventListener('afterprint', cleanup, { once: true });
    setTimeout(() => window.print(), 60);
    setTimeout(cleanup, 1500);
}

function getLegalAckKey(kind) {
    return `fw_${kind}_ack_v${LEGAL_VERSION}_${getLegalLanguage(kind)}`;
}

function syncLegalAcknowledgementState(onlyKind = null) {
    const kinds = onlyKind ? [onlyKind] : ['terms', 'privacy'];
    kinds.forEach(kind => {
        const checkbox = document.getElementById(`${kind}Accept`);
        const button = document.getElementById(`${kind}AcceptButton`);
        if (!checkbox || !button) return;
        checkbox.checked = localStorage.getItem(getLegalAckKey(kind)) === 'true';
        button.disabled = !checkbox.checked;
    });
}

function updateLastSyncText() {
    const element = document.getElementById('last-sync-time');
    if (!element) return;
    if (!lastSyncAt) {
        element.textContent = getI18n('last_sync_connecting');
        return;
    }
    const locale = currentLang === 'en' ? 'en-US' : 'vi-VN';
    const time = lastSyncAt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    element.textContent = translate('last_sync', { time, count: allFlights.length });
}

function localizeCity(value) {
    if (currentLang !== 'en') return value;
    const map = {
        'TP. Hồ Chí Minh': 'Ho Chi Minh City', 'Hồ Chí Minh': 'Ho Chi Minh City', 'Sài Gòn': 'Ho Chi Minh City',
        'Hà Nội': 'Hanoi', 'Đà Nẵng': 'Da Nang', 'Đà Lạt': 'Da Lat', 'Phú Quốc': 'Phu Quoc',
        'Nha Trang': 'Nha Trang', 'Huế': 'Hue', 'Quy Nhơn': 'Quy Nhon', 'Cần Thơ': 'Can Tho',
        'Hải Phòng': 'Hai Phong', 'Vinh': 'Vinh', 'Bangkok': 'Bangkok', 'Singapore': 'Singapore'
    };
    return map[value] || value;
}

function localizeFlightText(value, type = '') {
    if (currentLang !== 'en') return value;
    const maps = {
        status: { 'Đang mở bán': 'On sale', 'Sắp hết chỗ': 'Limited seats', 'Tạm dừng': 'Paused', 'Hết chỗ': 'Sold out' },
        cabin: { 'Phổ thông': 'Economy', 'Phổ thông đặc biệt': 'Premium Economy', 'Thương gia': 'Business' },
        baggage: { '7kg xách tay': '7kg cabin baggage', '12kg xách tay': '12kg cabin baggage', '20kg ký gửi': '20kg checked baggage' },
        note: {
            'Giá tốt cho chặng bay cuối tuần.': 'A strong fare for a weekend trip.',
            'Chặng ngắn, thời gian bay đẹp.': 'A convenient schedule for a short route.',
            'Nên đặt sớm vì ghế trống còn ít.': 'Book early because only a few seats remain.',
            'Phù hợp chuyến nghỉ dưỡng ngắn ngày.': 'Suitable for a short leisure trip.',
            'Giá ổn định, bay buổi sáng.': 'Stable fare with a morning departure.',
            'Chuyến quốc tế, giá đang thấp hơn trung bình.': 'International fare currently below the usual range.',
            'Chặng du lịch biển hot mùa hè.': 'A popular summer beach route.',
            'Chuyến quốc tế khu vực Đông Nam Á.': 'A regional international flight in Southeast Asia.',
            'Giá vé có thể thay đổi theo thời điểm.': 'Fares may change at any time.'
        }
    };
    return maps[type]?.[value] || value;
}

function normalize(f) {
    if (!f) return null;
    if (typeof isGeneratedMockRecord === 'function' && isGeneratedMockRecord(f)) return null;
    return {
        id: f.id,
        airline: f.Hang || f.HangBay || f.airline || 'N/A',
        flightCode: f.ChuyenBay || f.MaChuyenBay || f.flightCode || '---',
        route: f.TuyenBay || f.ChangBay || f.route || 'N/A - N/A',
        currentPrice: Number(f.GiaHienTai || f.GiaHienHanh || f.currentPrice || 0),
        targetPrice: Number(f.GiaMucTieu || f.targetPrice || 0),
        imageUrl: f.Anh || f.image || f.imageUrl || '',
        flightDate: f.NgayBay || f.ngayBay || f.flightDate || f.createdAt || '',
        departureTime: f.GioCatCanh || f.departureTime || '08:30',
        arrivalTime: f.GioHaCanh || f.arrivalTime || '10:45',
        isPriority: f.UuTien === true || f.UuTien === 'true' || f.isPriority === true || f.isPriority === 'true',
        cabin: f.HangGhe || f.cabin || 'Phổ thông',
        baggage: f.HanhLy || f.baggage || '7kg xách tay',
        seats: Number(f.SoGheTrong || f.seats || 10),
        rating: Number(f.DiemDanhGia || f.rating || 4.5),
        status: f.TrangThai || f.status || 'Đang mở bán',
        bookingUrl: f.LinkDatVe || f.bookingUrl || '#',
        note: f.GhiChu || f.note || 'Giá vé có thể thay đổi theo thời điểm.'
    };
}

function toApiPayload(flight, override = {}) {
    return {
        HangBay: flight.airline,
        MaChuyenBay: flight.flightCode,
        TuyenBay: flight.route,
        GiaHienTai: flight.currentPrice,
        GiaMucTieu: flight.targetPrice,
        Anh: flight.imageUrl,
        NgayBay: flight.flightDate,
        GioCatCanh: flight.departureTime,
        GioHaCanh: flight.arrivalTime,
        UuTien: flight.isPriority,
        HangGhe: flight.cabin,
        HanhLy: flight.baggage,
        SoGheTrong: flight.seats,
        DiemDanhGia: flight.rating,
        TrangThai: flight.status,
        LinkDatVe: flight.bookingUrl,
        GhiChu: flight.note,
        ...override
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    setupTheme();
    updateLanguage(currentLang);
    loadUserPreferences();
    setupLegalAcknowledgements();
    setupLegalNavigation();
    openLegalDeepLinkFromHash();
    setupQualityOfLife();
    await populateAirlineFilter();
    await fetchAndRenderData();

    const langSel = document.getElementById('lang-selector');
    if (langSel) langSel.addEventListener('change', event => updateLanguage(event.target.value));

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', debounce(() => applyFiltersAndSort(true), 300));

    const airlineSelect = document.getElementById('filter-airline');
    if (airlineSelect) airlineSelect.addEventListener('change', event => {
        localStorage.setItem('pref_airline', event.target.value);
        applyFiltersAndSort(true);
    });

    const sortSelect = document.getElementById('sort-price');
    if (sortSelect) sortSelect.addEventListener('change', event => {
        localStorage.setItem('pref_sort', event.target.value);
        applyFiltersAndSort(true);
    });

    const btnSync = document.getElementById('btn-sync');
    if (btnSync) btnSync.addEventListener('click', handleRefreshClick);

    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) btnLoadMore.addEventListener('click', () => {
        visibleCount += PAGE_SIZE;
        renderFlights(filteredFlights);
    });

    const container = document.getElementById('flights-container');
    if (container) container.addEventListener('click', handleCardAction);

    setupNewsletterForm();
});

function resolveTheme(mode) {
    if (mode === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return mode === 'dark' ? 'dark' : 'light';
}

function updateThemeUI(mode) {
    const resolved = resolveTheme(mode);
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    const iconClass = mode === 'auto' ? 'fa-circle-half-stroke' : (resolved === 'dark' ? 'fa-moon' : 'fa-sun');
    if (icon) icon.className = `fa-solid ${iconClass}`;
    if (label) label.textContent = getI18n(`theme_${mode}`);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.themeOption === mode);
        option.setAttribute('aria-pressed', String(option.dataset.themeOption === mode));
    });
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

function setupTheme() {
    const legacyTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('theme_mode') || (legacyTheme === 'dark' || legacyTheme === 'light' ? legacyTheme : 'auto');
    applyThemeMode(savedMode, false);

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => applyThemeMode(option.dataset.themeOption));
    });

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
        if (currentThemeMode === 'auto') applyThemeMode('auto', false);
    };
    if (typeof media.addEventListener === 'function') media.addEventListener('change', handleSystemThemeChange);
    else if (typeof media.addListener === 'function') media.addListener(handleSystemThemeChange);
}

function setupQualityOfLife() {
    const networkStatus = document.getElementById('network-status');
    const backToTop = document.getElementById('back-to-top');
    const updateNetwork = () => {
        if (!networkStatus) return;
        const offline = !navigator.onLine;
        networkStatus.classList.toggle('show', offline);
        const icon = networkStatus.querySelector('i');
        if (icon) icon.className = offline ? 'fa-solid fa-plug-circle-xmark' : 'fa-solid fa-wifi';
    };
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    updateNetwork();

    const updateBackToTop = () => {
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 520);
    };
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateBackToTop();
}

function setupNewsletterForm() {
    const btnSubscribe = document.getElementById('btn-subscribe');
    if (!btnSubscribe) return;
    $('#btn-subscribe').on('click', function() {
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showClientToast(getI18n('newsletter_required'), 'warning');
            emailInput.focus();
            return;
        }
        if (!emailRegex.test(email)) {
            showClientToast(getI18n('newsletter_invalid'), 'danger');
            emailInput.focus();
            return;
        }

        const stored = JSON.parse(localStorage.getItem('flight_newsletters') || '[]');
        if (!stored.includes(email)) stored.push(email);
        localStorage.setItem('flight_newsletters', JSON.stringify(stored));

        const originalText = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        this.disabled = true;
        setTimeout(() => {
            showClientToast(getI18n('newsletter_success'), 'success');
            emailInput.value = '';
            this.innerHTML = originalText;
            this.disabled = false;
        }, 800);
    });
}
async function handleRefreshClick() {
    const icon = document.getElementById('sync-icon');
    const btn = document.getElementById('btn-sync');
    if (icon) icon.classList.add('fa-spin');
    if (btn) btn.disabled = true;
    await fetchAndRenderData();
    if (icon) icon.classList.remove('fa-spin');
    if (btn) btn.disabled = false;
}

async function populateAirlineFilter() {
    const select = $('#filter-airline');
    if (!select.length) return;
    const selected = localStorage.getItem('pref_airline') || 'all';
    getAirlines().done(data => {
        select.html(`<option value="all" data-i18n="filter_all">${getI18n('filter_all')}</option>`);
        data.forEach(item => {
            const name = item.HangBay || item.name || item.airline;
            if (name) select.append(`<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`);
        });
        select.val(selected);
    });
}

async function fetchAndRenderData() {
    $('#flights-container').fadeOut(150, async () => {
        $('#skeleton-loader').fadeIn(150);
        const rawData = await api.getAll();
        mockapiGeneratedCount = rawData.filter(item => typeof isGeneratedMockRecord === 'function' && isGeneratedMockRecord(item)).length;
        allFlights = rawData.map(normalize).filter(f => f !== null && f.flightCode !== '---');
        lastSyncAt = new Date();
        $('#skeleton-loader').fadeOut(150, () => {
            applyFiltersAndSort(true);
            $('#flights-container').fadeIn(300);
            updateLastSyncText();
        });
    });
}
function loadUserPreferences() {
    const savedAirline = localStorage.getItem('pref_airline');
    const savedSort = localStorage.getItem('pref_sort');
    if (savedAirline && document.getElementById('filter-airline')) document.getElementById('filter-airline').value = savedAirline;
    if (savedSort && document.getElementById('sort-price')) document.getElementById('sort-price').value = savedSort;
}

function applyFiltersAndSort(resetVisible = false) {
    const keyword = removeVietnameseAccent(document.getElementById('search-input')?.value || '');
    const airline = document.getElementById('filter-airline')?.value || 'all';
    const sort = document.getElementById('sort-price')?.value || 'default';

    filteredFlights = allFlights.filter(f => {
        const routeParts = getRouteParts(f.route);
        const localizedRoute = `${localizeCity(routeParts.from)} ${localizeCity(routeParts.to)}`;
        const text = removeVietnameseAccent(`${f.flightCode} ${f.route} ${localizedRoute} ${f.airline}`);
        const compactText = text.replace(/\s+/g, '');
        const compactKeyword = keyword.replace(/\s+/g, '');
        const matchKeyword = text.includes(keyword) || compactText.includes(compactKeyword);
        const matchAirline = airline === 'all' || f.airline === airline;
        return matchKeyword && matchAirline;
    });

    if (sort === 'asc') filteredFlights.sort((a, b) => a.currentPrice - b.currentPrice);
    else if (sort === 'desc') filteredFlights.sort((a, b) => b.currentPrice - a.currentPrice);
    else filteredFlights.sort((a, b) => Number(b.isPriority) - Number(a.isPriority));

    if (resetVisible) visibleCount = PAGE_SIZE;
    updatePublicStats(filteredFlights);
    renderFlights(filteredFlights);
}

function updatePublicStats(flights) {
    const totalEl = document.getElementById('public-stat-total');
    const dealEl = document.getElementById('public-stat-deal');
    const watchEl = document.getElementById('public-stat-watch');
    const minEl = document.getElementById('public-stat-min');
    if (!totalEl || !dealEl || !watchEl || !minEl) return;

    const deals = flights.filter(f => getSavingInfo(f).percent >= 18 || f.isPriority).length;
    let minPrice = 0;
    for (let i = 0; i < flights.length; i++) {
        if (minPrice === 0 || flights[i].currentPrice < minPrice) minPrice = flights[i].currentPrice;
    }

    totalEl.innerHTML = flights.length;
    dealEl.innerHTML = deals;
    watchEl.innerHTML = flights.filter(f => f.isPriority).length;
    minEl.innerHTML = minPrice ? formatMoney(minPrice) : '0 đ';
}

function renderFlights(flights) {
    const container = document.getElementById('flights-container');
    const loadMoreWrap = document.getElementById('load-more-wrap');
    if (!container) return;
    container.innerHTML = '';

    if (flights.length === 0) {
        const syncHint = mockapiGeneratedCount > 0
            ? `<p class="mt-2 mb-3 text-muted">${translate('empty_mock_hint', { count: mockapiGeneratedCount })}</p><a href="admin.html" class="btn btn-primary rounded-pill px-4 fw-bold"><i class="fa-solid fa-database me-1"></i>${getI18n('empty_admin_button')}</a>`
            : `<p class="mt-2 mb-0 text-muted">${getI18n('empty_add_hint')}</p>`;
        container.innerHTML = `<div class="col-12 text-center py-5 text-muted"><div class="radar-scan"></div><h4 class="mt-3">${getI18n('card_empty')}</h4>${syncHint}</div>`;
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';
        return;
    }

    const items = flights.slice(0, visibleCount);
    items.forEach((flight, index) => container.insertAdjacentHTML('beforeend', createFlightCard(flight, index)));

    if (loadMoreWrap) loadMoreWrap.style.display = flights.length > visibleCount ? 'block' : 'none';
    setTimeout(() => {
        document.querySelectorAll('.premium-progress-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 80);
}
function createFlightCard(flight, index) {
    const route = getRouteParts(flight.route);
    const fromName = localizeCity(route.from);
    const toName = localizeCity(route.to);
    const fromCode = getAirportCode(route.from);
    const toCode = getAirportCode(route.to);
    const departTime = normalizeTime(flight.departureTime, '08:30');
    const arriveTime = normalizeTime(flight.arrivalTime, '10:45');
    const duration = calculateDuration(departTime, arriveTime);
    const fallbackImage = getDestinationImage(flight.route);
    const hasLegacyArtwork = /img\/covers\/.*\.svg(?:$|[?#])/i.test(String(flight.imageUrl || ''));
    const coverImage = flight.imageUrl && isValidImageSource(flight.imageUrl) && !hasLegacyArtwork ? flight.imageUrl : fallbackImage;
    const save = getSavingInfo(flight);
    const isDeal = save.reached || save.percent >= 18 || flight.isPriority;
    const label = save.reached ? getI18n('label_reached') : (isDeal ? getI18n('label_deal') : getI18n('label_good'));
    const normalizedStatus = removeVietnameseAccent(flight.status);
    const statusClass = normalizedStatus.includes('het') || normalizedStatus.includes('sap') || normalizedStatus.includes('sold') || normalizedStatus.includes('limited') || flight.seats <= 10 ? 'danger' : 'success';
    const progressText = save.reached ? getI18n('reached_target') : translate('target_progress', { percent: save.progress });
    const baggage = localizeFlightText(flight.baggage, 'baggage');
    const status = localizeFlightText(flight.status, 'status');
    const cabin = localizeFlightText(flight.cabin, 'cabin');
    const airlineProfile = getAirlineProfile(flight.airline);
    const airlinePrimary = /^#[0-9a-f]{3,8}$/i.test(airlineProfile.MauNhan || '') ? airlineProfile.MauNhan : '#0284c7';
    const airlineSecondary = /^#[0-9a-f]{3,8}$/i.test(airlineProfile.MauPhu || '') ? airlineProfile.MauPhu : '#1d4ed8';
    const bookingLink = isValidUrl(flight.bookingUrl) ? flight.bookingUrl : '#';

    return `
        <div class="col-md-6 col-lg-4 stagger-item" style="animation-delay:${index * 0.05}s">
            <article class="ticket-card flight-deal-card h-100" data-flight-id="${escapeHTML(flight.id)}" style="--airline-primary:${airlinePrimary};--airline-secondary:${airlineSecondary}">
                <div class="ticket-cover flight-deal-cover" style="background-image:url('${escapeHTML(coverImage)}'),url('${escapeHTML(fallbackImage)}'),url('img/photos/fallback-flight.webp')">
                    <div class="cover-gradient"></div>
                    <button class="watch-toggle card-watch-toggle ${flight.isPriority ? 'active' : ''}" type="button" data-action="toggle-watch" data-id="${escapeHTML(flight.id)}" title="${escapeHTML(getI18n('watch_toggle_title'))}" aria-label="${escapeHTML(getI18n('watch_toggle_title'))}">
                        <i class="fa-${flight.isPriority ? 'solid' : 'regular'} fa-bell"></i>
                    </button>
                    <div class="airline-brand">
                        ${renderAirlineLogo(flight.airline, 'md', 'airline-card-logo')}
                        <div class="airline-brand-copy"><strong>${escapeHTML(flight.airline)}</strong><small><span class="airline-iata-chip">${escapeHTML(airlineProfile.MaHang || '')}</span>${escapeHTML(flight.flightCode)}</small></div>
                    </div>
                </div>

                <div class="flight-deal-body">
                    <div class="fare-highlight-row">
                        <span class="fare-highlight-chip ${save.reached ? 'is-target' : (isDeal ? 'is-featured' : 'is-standard')}">
                            <i class="fa-solid ${save.reached ? 'fa-circle-check' : (isDeal ? 'fa-star' : 'fa-tag')}"></i>
                            <span>${label}</span>
                        </span>
                        <span class="fare-highlight-value">${save.percent > 0 ? `-${save.percent}%` : '—'}</span>
                    </div>
                    <div class="route-modern">
                        <div class="airport-block"><h3>${escapeHTML(fromCode)}</h3><span title="${escapeHTML(fromName)}">${escapeHTML(fromName)}</span></div>
                        <div class="route-plane"><span class="route-line"></span><i class="fa-solid fa-plane"></i><small>${escapeHTML(duration)}</small></div>
                        <div class="airport-block text-end"><h3>${escapeHTML(toCode)}</h3><span title="${escapeHTML(toName)}">${escapeHTML(toName)}</span></div>
                    </div>

                    <div class="flight-info-grid">
                        <div><small><i class="fa-regular fa-calendar me-1"></i>${getI18n('departure')}</small><strong>${formatFlightDate(flight.flightDate)}</strong></div>
                        <div><small><i class="fa-regular fa-clock me-1"></i>${getI18n('flight_time')}</small><strong>${escapeHTML(departTime)} - ${escapeHTML(arriveTime)}</strong></div>
                        <div><small><i class="fa-solid fa-suitcase-rolling me-1"></i>${getI18n('baggage')}</small><strong>${escapeHTML(baggage)}</strong></div>
                        <div><small><i class="fa-solid fa-chair me-1"></i>${getI18n('seats_left')}</small><strong>${flight.seats} ${getI18n('seats_unit')}</strong></div>
                    </div>

                    <div class="price-modern-grid">
                        <div><small>${getI18n('current_price')}</small><strong class="price-current">${formatMoney(flight.currentPrice)}</strong></div>
                        <div><small>${getI18n('target_price')}</small><strong class="price-target">${formatMoney(flight.targetPrice)}</strong></div>
                        <div><small>${getI18n('saving')}</small><strong class="price-saving">${save.percent}%</strong></div>
                    </div>

                    <div class="price-progress-wrap">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small>${progressText}</small>
                            <small>${save.saving > 0 ? translate('discount_amount', { amount: formatMoney(save.saving) }) : getI18n('monitoring')}</small>
                        </div>
                        <div class="price-chart-container premium-progress"><div class="price-chart-bar premium-progress-bar" style="width:0%" data-width="${save.progress}%"></div></div>
                    </div>

                    <div class="flight-card-meta">
                        <span class="status-pill text-bg-${statusClass}">${escapeHTML(status)}</span>
                        <span><i class="fa-solid fa-star text-warning me-1"></i>${flight.rating.toFixed(1)}</span>
                        <span>${escapeHTML(cabin)}</span>
                    </div>

                    <div class="card-action-grid">
                        <a class="btn btn-primary rounded-3 fw-bold card-booking-btn" href="${escapeHTML(bookingLink)}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square me-1"></i>${getI18n('open_booking')}</a>
                        <button type="button" class="btn btn-light rounded-3 fw-bold card-copy-btn" data-action="copy" data-code="${escapeHTML(flight.flightCode)}"><i class="fa-regular fa-copy me-1"></i>${getI18n('code')}</button>
                    </div>
                </div>
            </article>
        </div>`;
}
function handleCardAction(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const action = button.getAttribute('data-action');
    const id = button.getAttribute('data-id');

    if (action === 'copy') copyText(button.getAttribute('data-code'));
    if (action === 'toggle-watch') toggleWatch(id, button);
}

async function toggleWatch(id, button) {
    const flight = allFlights.find(item => String(item.id) === String(id));
    if (!flight) return;
    const oldHtml = button ? button.innerHTML : '';
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    }

    try {
        const updated = await api.update(id, toApiPayload(flight, { UuTien: !flight.isPriority }));
        const normalized = normalize(updated);
        allFlights = allFlights.map(item => String(item.id) === String(id) ? normalized : item);
        showClientToast(normalized.isPriority ? getI18n('watch_on') : getI18n('watch_off'), 'success');
        applyFiltersAndSort(false);
    } catch (error) {
        console.error(error);
        showClientToast(getI18n('api_update_error'), 'danger');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = oldHtml;
        }
    }
}

async function copyText(text) {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        showClientToast(translate('copied_code', { code: text }), 'success');
    } catch (error) {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showClientToast(translate('copied_code', { code: text }), 'success');
    }
}

function openLegalDeepLinkFromHash() {
    const hash = window.location.hash.replace('#', '');
    const kind = hash.startsWith('privacy-') ? 'privacy' : (hash.startsWith('terms-') ? 'terms' : null);
    if (!kind || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;
    const modalElement = document.getElementById(`${kind}Modal`);
    if (!modalElement) return;
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modalElement.addEventListener('shown.bs.modal', () => {
        const target = document.getElementById(hash);
        const body = document.getElementById(`${kind}ModalBody`);
        if (target && body) body.scrollTo({ top: target.offsetTop - 14, behavior: 'smooth' });
    }, { once: true });
    modal.show();
}

function calculateDuration(dep, arr) {
    const depTime = normalizeTime(dep, '08:30');
    const arrTime = normalizeTime(arr, '10:45');
    let [h1, m1] = depTime.split(':').map(Number);
    let [h2, m2] = arrTime.split(':').map(Number);
    let totalMin1 = h1 * 60 + m1;
    let totalMin2 = h2 * 60 + m2;
    if (totalMin2 < totalMin1) totalMin2 += 24 * 60;
    const diff = totalMin2 - totalMin1;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

function removeVietnameseAccent(str) {
    return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

function getRouteParts(routeText) {
    const parts = String(routeText || '').split(/-|→|–|—/).map(item => item.trim()).filter(Boolean);
    return { from: parts[0] || 'Hà Nội', to: parts[1] || 'TP. Hồ Chí Minh' };
}

function getAirportCode(city) {
    const text = removeVietnameseAccent(city);
    const map = [
        ['ho chi minh', 'SGN'], ['sai gon', 'SGN'], ['ha noi', 'HAN'], ['noi bai', 'HAN'],
        ['da nang', 'DAD'], ['phu quoc', 'PQC'], ['nha trang', 'CXR'], ['cam ranh', 'CXR'],
        ['da lat', 'DLI'], ['hue', 'HUI'], ['quy nhon', 'UIH'], ['can tho', 'VCA'],
        ['vinh', 'VII'], ['hai phong', 'HPH'], ['bangkok', 'BKK'], ['singapore', 'SIN'],
        ['seoul', 'ICN'], ['tokyo', 'NRT'], ['kuala lumpur', 'KUL'], ['taipei', 'TPE']
    ];
    for (const [keyword, code] of map) {
        if (text.includes(keyword)) return code;
    }
    const cleaned = removeVietnameseAccent(city).replace(/[^a-z]/g, '').toUpperCase();
    return cleaned.substring(0, 3) || '---';
}

function getAirlineLogo(airline) {
    return getAirlineProfile(airline).MaHang || 'FW';
}

function normalizeTime(value, fallback) {
    const text = String(value || '').trim();
    const match = text.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return fallback;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return fallback;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function formatFlightDate(value) {
    if (!value) return currentLang === 'en' ? 'Jun 15, 2026' : '15/06/2026';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHTML(value);
    return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'vi-VN', currentLang === 'en'
        ? { year: 'numeric', month: 'short', day: '2-digit' }
        : undefined);
}
function getSavingInfo(flight) {
    const current = Number(flight.currentPrice || 0);
    const target = Number(flight.targetPrice || 0);
    const saving = Math.max(current - target, 0);
    const percent = current > 0 ? Math.round((saving / current) * 100) : 0;
    const progress = target > 0 ? Math.max(8, Math.min(Math.round((target / Math.max(current, 1)) * 100), 100)) : 8;
    const reached = target > 0 && current <= target;
    return { saving, percent, progress, reached };
}

function isValidImageSource(value) {
    const source = String(value || '').trim();
    if (/^(?:\.\/)?img\/[a-z0-9_\-./]+$/i.test(source)) return true;
    return isValidUrl(source);
}

function getDestinationImage(route) {
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

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
    }[char]));
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function showClientToast(message, type) {
    const el = document.getElementById('clientToast');
    if (!el) return;
    el.className = `toast text-bg-${type} border-0 rounded-3 shadow`;
    document.getElementById('client-toast-message').innerText = message;
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        bootstrap.Toast.getOrCreateInstance(el, { delay: 3500 }).show();
    } else {
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3500);
    }
}

function setupLegalNavigation() {
    document.addEventListener('click', async event => {
        const languageButton = event.target.closest('[data-legal-lang]');
        if (languageButton) {
            switchLegalLanguage(languageButton.dataset.legalKind, languageButton.dataset.legalLang);
            return;
        }

        const navLink = event.target.closest('.legal-nav-link');
        if (navLink) {
            event.preventDefault();
            const target = document.querySelector(navLink.getAttribute('href'));
            const modalBody = navLink.closest('.legal-modal-body');
            if (target && modalBody) {
                const offset = target.offsetTop - 14;
                modalBody.scrollTo({ top: offset, behavior: 'smooth' });
            }
            return;
        }

        const actionButton = event.target.closest('[data-legal-action]');
        if (!actionButton) return;
        const action = actionButton.dataset.legalAction;

        if (action === 'print') {
            printLegalDocument(actionButton.dataset.legalKind || getOpenLegalKind() || 'privacy');
            return;
        }
        if (action === 'clear-search') {
            const kind = actionButton.dataset.legalKind;
            const input = document.getElementById(`${kind}LegalSearch`);
            if (input) {
                input.value = '';
                filterLegalSections(kind, '');
                input.focus();
            }
            return;
        }
        if (action === 'copy-section') {
            const targetId = actionButton.dataset.target;
            const url = `${window.location.origin}${window.location.pathname}#${targetId}`;
            try {
                await navigator.clipboard.writeText(url);
                history.replaceState(null, '', `#${targetId}`);
                showClientToast(getLegalI18n(targetId.startsWith('terms-') ? 'terms' : 'privacy', 'legal_link_copied'), 'success');
            } catch (error) {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                showClientToast(getLegalI18n(targetId.startsWith('terms-') ? 'terms' : 'privacy', 'legal_link_copied'), 'success');
            }
            return;
        }
        if (action !== 'clear-local') return;

        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i += 1) {
            const key = localStorage.key(i);
            if (key && (['theme', 'theme_mode', 'pref_airline', 'pref_sort', 'flight_newsletters'].includes(key) || key.startsWith('fw_terms_ack_') || key.startsWith('fw_privacy_ack_'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        syncLegalAcknowledgementState();
        showClientToast(getLegalI18n('privacy', 'local_data_cleared'), 'success');
    });

    document.addEventListener('input', event => {
        const input = event.target.closest('[data-legal-search]');
        if (!input) return;
        filterLegalSections(input.dataset.legalSearch, input.value);
    });

    document.addEventListener('keydown', event => {
        const kind = getOpenLegalKind();
        if (!kind) return;
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
            event.preventDefault();
            document.getElementById(`${kind}LegalSearch`)?.focus();
        }
        if (event.altKey && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            switchLegalLanguage(kind, getLegalLanguage(kind) === 'vi' ? 'en' : 'vi');
        }
    });

    ['terms', 'privacy'].forEach(kind => {
        const body = document.getElementById(`${kind}ModalBody`);
        if (!body) return;
        body.addEventListener('scroll', () => {
            if (legalScrollFrame) cancelAnimationFrame(legalScrollFrame);
            legalScrollFrame = requestAnimationFrame(() => {
                updateLegalReadingProgress(kind);
                updateActiveLegalSection(kind);
            });
        }, { passive: true });

        const modal = document.getElementById(`${kind}Modal`);
        modal?.addEventListener('show.bs.modal', () => {
            // Mỗi lần mở tài liệu pháp lý đều bắt đầu bằng tiếng Việt.
            // Việc đổi ngôn ngữ tại đây không thay đổi ngôn ngữ của trang chính.
            resetLegalDocument(kind);
        });
        modal?.addEventListener('shown.bs.modal', () => {
            const updatedBody = document.getElementById(`${kind}ModalBody`);
            if (updatedBody) updatedBody.scrollTop = 0;
            updateLegalLanguageControls(kind);
            updateLegalReadingProgress(kind);
            updateActiveLegalSection(kind);
        });
        modal?.addEventListener('hidden.bs.modal', () => {
            // Không lưu lựa chọn VI/EN của modal. Lần mở kế tiếp luôn trở về VI.
            resetLegalDocument(kind);
        });
    });
}

function setupLegalAcknowledgements() {
    ['terms', 'privacy'].forEach(kind => {
        const checkbox = document.getElementById(`${kind}Accept`);
        const button = document.getElementById(`${kind}AcceptButton`);
        if (!checkbox || !button) return;

        checkbox.addEventListener('change', () => {
            button.disabled = !checkbox.checked;
        });

        button.addEventListener('click', () => {
            if (!checkbox.checked) return;
            localStorage.setItem(getLegalAckKey(kind), 'true');
            showClientToast(getLegalI18n(kind, 'legal_ack'), 'success');
        });
    });
    syncLegalAcknowledgementState();
}

