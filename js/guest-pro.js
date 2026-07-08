// =========================================================
// FlightWatcher - Professional Stable 8.8
// Nâng cấp trang khách: bộ lọc nâng cao, yêu thích, theo dõi,
// chia sẻ deep-link, lịch sử xem, chế độ danh sách và cache offline.
// =========================================================

(() => {
    'use strict';

    const STORAGE = {
        favorites: 'fw_guest_favorites_v1',
        recent: 'fw_guest_recent_v1',
        filters: 'fw_guest_filters_v1',
        view: 'fw_guest_view_v1',
        cache: 'fw_guest_flights_cache_v1'
    };

    const MAX_RECENT = 10;
    const CACHE_MAX_AGE = 48 * 60 * 60 * 1000;
    const PUBLIC_REFRESH_INTERVAL = 90 * 1000;
    const DETAIL_TRANSITION_TIMEOUT = 760;
    const runtimeStorage = window.FWRuntime?.storage;
    let activeDetailFlightId = null;
    let detailReturnFocus = null;
    let detailOpening = false;
    let publicRefreshTimer = null;
    let publicRefreshInFlight = false;
    let sharedLinkHandled = false;

    const storageGet = (key, fallback = null) => runtimeStorage?.safeGet(key, fallback) ?? (() => {
        try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
    })();
    const storageSet = (key, value) => runtimeStorage?.safeSet(key, value) ?? (() => {
        try { localStorage.setItem(key, String(value)); return true; } catch { return false; }
    })();
    const storageRemove = key => runtimeStorage?.safeRemove(key) ?? (() => {
        try { localStorage.removeItem(key); return true; } catch { return false; }
    })();
    const storageReadJSON = (key, fallback) => runtimeStorage?.readJSON(key, fallback) ?? (() => {
        try { return JSON.parse(storageGet(key, '')) || fallback; } catch { return fallback; }
    })();
    const storageWriteJSON = (key, value) => runtimeStorage?.writeJSON(key, value) ?? storageSet(key, JSON.stringify(value));

    const guestState = {
        favorites: new Set(readArray(STORAGE.favorites)),
        recent: readArray(STORAGE.recent).slice(0, MAX_RECENT),
        quick: 'all',
        view: storageGet(STORAGE.view) === 'list' ? 'list' : 'grid',
        dataSource: 'live',
        authoritative: false,
        lastSuccessfulSync: 0
    };

    extendDictionary();

    const baseUpdateLanguage = updateLanguage;
    updateLanguage = function enhancedUpdateLanguage(lang) {
        baseUpdateLanguage(lang);
        translateEnhancedStaticUI();
        refreshEnhancedUI();
    };

    const baseRenderFlights = renderFlights;
    renderFlights = function enhancedRenderFlights(flights) {
        baseRenderFlights(flights);
        applyViewMode();
        renderSavedDrawer();
        renderRecentFlights();
        updateResultsSummary();
    };

    const baseCreateFlightCard = createFlightCard;
    createFlightCard = function enhancedCreateFlightCard(flight, index) {
        let html = baseCreateFlightCard(flight, index);
        const id = String(flight.id);
        const saved = guestState.favorites.has(id);
        const save = getSavingInfo(flight);
        const recommendation = getRecommendation(flight, save);
        const bookingAvailable = isValidUrl(flight.bookingUrl);
        const bookingLink = bookingAvailable ? flight.bookingUrl : '';

        html = html.replace(
            'class="ticket-card flight-deal-card h-100"',
            `class="ticket-card flight-deal-card guest-pro-card h-100 ${saved ? 'is-favorite' : ''}" tabindex="0" role="button" aria-haspopup="dialog" aria-controls="flightDetailOffcanvas" data-card-detail="true" aria-label="${escapeHTML(translate('guest_open_flight', { code: flight.flightCode }))}"`
        );

        const actionBlock = `
                    <div class="guest-card-recommendation ${recommendation.className}">
                        <span><i class="fa-solid ${recommendation.icon}"></i></span>
                        <div><strong>${escapeHTML(recommendation.title)}</strong><small>${escapeHTML(recommendation.text)}</small></div>
                    </div>
                    <div class="card-detail-cue" aria-hidden="true"><i class="fa-solid fa-circle-info"></i><span>${getI18n('guest_card_detail_hint')}</span><i class="fa-solid fa-chevron-right"></i></div>
                    <div class="card-action-grid card-action-grid-pro">
                        <a class="btn btn-primary rounded-3 fw-bold card-booking-btn ${bookingAvailable ? '' : 'disabled'}" ${bookingAvailable ? `href="${escapeHTML(bookingLink)}" target="_blank" rel="noopener noreferrer"` : `href="#" aria-disabled="true" data-action="booking-unavailable"`}><i class="fa-solid fa-arrow-up-right-from-square"></i><span>${bookingAvailable ? getI18n('open_booking') : getI18n('guest_booking_unavailable')}</span></a>
                        <button type="button" class="btn btn-light rounded-3 fw-bold ${saved ? 'active-action' : ''}" data-action="favorite" data-id="${escapeHTML(id)}"><i class="fa-${saved ? 'solid' : 'regular'} fa-heart"></i><span>${saved ? getI18n('guest_saved') : getI18n('guest_save')}</span></button>
                        <button type="button" class="btn btn-light rounded-3 fw-bold" data-action="share" data-id="${escapeHTML(id)}"><i class="fa-solid fa-share-nodes"></i><span>${getI18n('guest_share')}</span></button>
                    </div>
                </div>
            </article>`;

        html = html.replace(
            /<div class="card-action-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/article>/,
            actionBlock
        );

        return html;
    };

    const baseFetchAndRenderData = fetchAndRenderData;
    fetchAndRenderData = async function enhancedFetchAndRenderData(options = {}) {
        if (publicRefreshInFlight) return false;
        publicRefreshInFlight = true;
        const silent = Boolean(options.silent);
        const container = $('#flights-container');
        const loader = $('#skeleton-loader');
        if (!silent) {
            container.fadeOut(120);
            loader.fadeIn(120);
        }

        try {
            const rawData = await api.getAll();
            mockapiGeneratedCount = rawData.filter(item => typeof isGeneratedMockRecord === 'function' && isGeneratedMockRecord(item)).length;
            const normalized = rawData.map(normalize).filter(item => item && item.flightCode !== '---');
            allFlights = normalized;
            guestState.dataSource = normalized.length ? 'live' : 'empty';
            guestState.authoritative = true;
            guestState.lastSuccessfulSync = Date.now();
            lastSyncAt = new Date();

            if (normalized.length) {
                storageWriteJSON(STORAGE.cache, { savedAt: Date.now(), flights: normalized });
            }
            reconcileStoredFlights({ notify: !silent });
        } catch (error) {
            console.error(error);
            const cache = readCache();
            allFlights = cache;
            guestState.dataSource = cache.length ? 'cache' : 'error';
            guestState.authoritative = false;
            lastSyncAt = new Date();
            if (!silent) {
                showClientToast(cache.length ? getI18n('guest_cache_notice') : getI18n('guest_load_error'), cache.length ? 'warning' : 'danger');
            }
        } finally {
            const finish = () => {
                populateEnhancedFilters();
                applyFiltersAndSort(!silent);
                updateLastSyncText();
                updateDataSourceBadge();
                if (!sharedLinkHandled) openSharedFlightFromUrl();
                if (activeDetailFlightId) {
                    const activeFlight = allFlights.find(item => String(item.id) === String(activeDetailFlightId));
                    if (activeFlight) renderFlightDetail(activeFlight);
                    else if (guestState.authoritative) {
                        const panel = document.getElementById('flightDetailOffcanvas');
                        bootstrap.Offcanvas.getInstance(panel)?.hide();
                        removeStoredFlight(activeDetailFlightId, { recent: true, favorite: true, notify: true });
                    }
                }
                if (!silent) container.fadeIn(260);
                publicRefreshInFlight = false;
            };
            if (!silent) loader.fadeOut(120, finish);
            else finish();
        }
        return true;
    };

    applyFiltersAndSort = function enhancedApplyFiltersAndSort(resetVisible = false) {
        const keyword = removeVietnameseAccent(document.getElementById('search-input')?.value || '');
        const airline = document.getElementById('filter-airline')?.value || 'all';
        const sort = document.getElementById('sort-price')?.value || 'default';
        const origin = document.getElementById('filter-from')?.value || 'all';
        const destination = document.getElementById('filter-to')?.value || 'all';
        let dateFrom = document.getElementById('filter-date-from')?.value || '';
        let dateTo = document.getElementById('filter-date-to')?.value || '';
        if (dateFrom && dateTo && dateFrom > dateTo) {
            [dateFrom, dateTo] = [dateTo, dateFrom];
            const fromInput = document.getElementById('filter-date-from');
            const toInput = document.getElementById('filter-date-to');
            if (fromInput) fromInput.value = dateFrom;
            if (toInput) toInput.value = dateTo;
        }
        const maxPrice = Number(document.getElementById('filter-price-max')?.value || 0);
        const cabin = document.getElementById('filter-cabin')?.value || 'all';
        const status = document.getElementById('filter-status')?.value || 'all';
        const favoritesOnly = Boolean(document.getElementById('filter-favorites')?.checked);

        filteredFlights = allFlights.filter(flight => {
            const routeParts = getRouteParts(flight.route);
            const localizedRoute = `${localizeCity(routeParts.from)} ${localizeCity(routeParts.to)}`;
            const text = removeVietnameseAccent(`${flight.flightCode} ${flight.route} ${localizedRoute} ${flight.airline} ${flight.cabin} ${flight.status}`);
            const compactText = text.replace(/\s+/g, '');
            const compactKeyword = keyword.replace(/\s+/g, '');
            const flightDate = flight.flightDate || '';
            const saving = getSavingInfo(flight);

            const matchKeyword = !keyword || text.includes(keyword) || compactText.includes(compactKeyword);
            const matchAirline = airline === 'all' || flight.airline === airline;
            const matchOrigin = origin === 'all' || removeVietnameseAccent(routeParts.from) === origin;
            const matchDestination = destination === 'all' || removeVietnameseAccent(routeParts.to) === destination;
            const matchDateFrom = !dateFrom || flightDate >= dateFrom;
            const matchDateTo = !dateTo || flightDate <= dateTo;
            const matchPrice = !maxPrice || flight.currentPrice <= maxPrice;
            const matchCabin = cabin === 'all' || removeVietnameseAccent(flight.cabin) === cabin;
            const matchStatus = status === 'all' || removeVietnameseAccent(flight.status) === status;
            const matchFavorite = !favoritesOnly || guestState.favorites.has(String(flight.id));
            const matchQuick = matchQuickFilter(flight, saving, routeParts);

            return matchKeyword && matchAirline && matchOrigin && matchDestination && matchDateFrom && matchDateTo && matchPrice && matchCabin && matchStatus && matchFavorite && matchQuick;
        });

        if (sort === 'asc') filteredFlights.sort((a, b) => a.currentPrice - b.currentPrice);
        else if (sort === 'desc') filteredFlights.sort((a, b) => b.currentPrice - a.currentPrice);
        else if (sort === 'date') filteredFlights.sort((a, b) => String(a.flightDate).localeCompare(String(b.flightDate)));
        else if (sort === 'saving') filteredFlights.sort((a, b) => getSavingInfo(b).percent - getSavingInfo(a).percent);
        else if (sort === 'rating') filteredFlights.sort((a, b) => b.rating - a.rating);
        else if (sort === 'seats') filteredFlights.sort((a, b) => b.seats - a.seats);
        else filteredFlights.sort((a, b) => Number(b.isPriority) - Number(a.isPriority) || getSavingInfo(b).percent - getSavingInfo(a).percent);

        if (resetVisible) visibleCount = PAGE_SIZE;
        persistEnhancedFilters();
        updatePublicStats(filteredFlights);
        renderFlights(filteredFlights);
        updateActiveFilterState();
    };

    const baseCardHandler = handleCardAction;
    handleCardAction = function enhancedCardAction(event) {
        const actionTarget = event.target.closest('[data-action]');
        if (!actionTarget) return;
        const action = actionTarget.dataset.action;
        const id = actionTarget.dataset.id;

        if (['favorite', 'share', 'booking-unavailable'].includes(action)) {
            event.preventDefault();
            event.stopPropagation();
            if (action === 'favorite') toggleFavorite(id);
            if (action === 'share') shareFlight(id);
            if (action === 'booking-unavailable') showClientToast(getI18n('guest_booking_unavailable'), 'warning');
            return;
        }

        baseCardHandler(event);
    };

    document.addEventListener('DOMContentLoaded', () => {
        storageRemove('fw_guest_compare_v1');
        setupEnhancedControls();
        restoreEnhancedFilters();
        translateEnhancedStaticUI();
        applyViewMode();
        renderSavedDrawer();
        renderRecentFlights();
        setupPublicRevealAnimations();
        setupPublicRuntimeSync();
        recoverOverlayState();
        setupLeanRevealObserver();
    });

    function extendDictionary() {
        Object.assign(dictionary.vi, {
            guest_saved_flights: 'Chuyến bay đã lưu',
            guest_saved_short: 'Đã lưu',
            guest_advanced_filters: 'Bộ lọc nâng cao',
            guest_filter_origin: 'Điểm đi',
            guest_filter_destination: 'Điểm đến',
            guest_filter_date_from: 'Từ ngày',
            guest_filter_date_to: 'Đến ngày',
            guest_filter_max_price: 'Giá tối đa',
            guest_filter_cabin: 'Hạng ghế',
            guest_filter_status: 'Trạng thái',
            guest_all: 'Tất cả',
            guest_only_saved: 'Chỉ chuyến đã lưu',
            guest_reset_filters: 'Đặt lại bộ lọc',
            guest_results: '{shown} kết quả phù hợp',
            guest_active_filters: '{count} bộ lọc đang dùng',
            guest_quick_all: 'Tất cả',
            guest_quick_deal: 'Deal tốt nhất',
            guest_quick_upcoming: 'Sắp khởi hành',
            guest_quick_international: 'Quốc tế',
            guest_quick_watch: 'Đang theo dõi',
            guest_view_grid: 'Dạng lưới',
            guest_view_list: 'Dạng danh sách',
            guest_save: 'Lưu',
            guest_saved: 'Đã lưu',
            guest_save_flight: 'Lưu chuyến bay',
            guest_remove_saved: 'Bỏ lưu chuyến bay',
            guest_share: 'Chia sẻ',
            guest_clear: 'Xóa tất cả',
            guest_recent_title: 'Bạn vừa xem',
            guest_recent_sub: 'Tiếp tục xem nhanh các chuyến bay gần đây.',
            guest_recent_clear: 'Xóa lịch sử',
            guest_recent_cleared: 'Đã xóa toàn bộ lịch sử xem.',
            guest_recent_remove: 'Xóa khỏi lịch sử',
            guest_recent_removed: 'Đã xóa chuyến bay khỏi lịch sử xem.',
            guest_recent_count: '{count} chuyến đã xem',
            guest_no_saved: 'Bạn chưa lưu chuyến bay nào.',
            guest_saved_hint: 'Nhấn biểu tượng trái tim trên card để lưu chuyến bay.',
            guest_open_flight: 'Mở chi tiết chuyến {code}',
            guest_card_detail_hint: 'Nhấn vào card để xem thông tin đầy đủ',
            guest_detail_eyebrow: 'THÔNG TIN CHUYẾN BAY',
            guest_detail_title: 'Chi tiết chuyến bay',
            guest_detail_overview: 'Tổng quan hành trình',
            guest_detail_schedule: 'Lịch trình',
            guest_detail_fare: 'Phân tích giá vé',
            guest_detail_service: 'Dịch vụ và tình trạng',
            guest_detail_note: 'Lưu ý chuyến bay',
            guest_detail_click_outside: 'Đóng bằng nút ×, phím Esc hoặc nhấn ra ngoài.',
            guest_detail_save: 'Lưu chuyến',
            guest_detail_unsave: 'Bỏ lưu',
            guest_detail_share: 'Chia sẻ',
            guest_detail_track: 'Theo dõi giá',
            guest_detail_untrack: 'Ngừng theo dõi',
            guest_tracking_enabled: 'Đang bật',
            guest_tracking_disabled: 'Chưa bật',
            guest_detail_book: 'Kiểm tra giá tại hãng',
            guest_detail_target_reached: 'Giá hiện tại đã đạt hoặc thấp hơn mục tiêu.',
            guest_detail_target_pending: 'Giá hiện tại vẫn cao hơn mức mục tiêu.',
            guest_flight_missing_recent: 'Chuyến bay không còn tồn tại. Dữ liệu cũ đã được tự động xóa.',
            guest_recent_missing_title: 'Chuyến bay không còn tồn tại',
            guest_recent_missing_sub: 'Nhấn để xóa dữ liệu lịch sử cũ',
            guest_flight_unavailable_offline: 'Chưa thể xác minh chuyến bay vì dữ liệu đang ngoại tuyến. Mục lịch sử vẫn được giữ lại.',
            guest_stale_cleaned: 'Đã tự động dọn {count} mục chuyến bay không còn tồn tại.',
            guest_detail_smart_title: 'Đánh giá thông minh',
            guest_booking_unavailable: 'Liên kết đặt vé chưa sẵn sàng.',
            guest_share_success: 'Đã sao chép liên kết chuyến bay.',
            guest_share_text: 'Xem chuyến bay {code}: {route} với giá {price}',
            guest_cache_notice: 'Không kết nối được API. Đang hiển thị dữ liệu đã lưu gần nhất.',
            guest_load_error: 'Không thể tải dữ liệu chuyến bay. Vui lòng thử lại.',
            guest_source_live: 'Dữ liệu trực tiếp',
            guest_source_cache: 'Dữ liệu ngoại tuyến',
            guest_source_empty: 'Chưa có dữ liệu',
            guest_filter_toggle: 'Mở bộ lọc nâng cao',
            guest_price_any: 'Không giới hạn',
            guest_recommend_best: 'Giá tốt nổi bật',
            guest_recommend_best_text: 'Mức tiết kiệm cao so với giá mục tiêu.',
            guest_recommend_urgent: 'Sắp hết chỗ',
            guest_recommend_urgent_text: 'Số ghế còn ít, nên cân nhắc đặt sớm.',
            guest_recommend_quality: 'Được đánh giá cao',
            guest_recommend_quality_text: 'Điểm đánh giá tốt và lịch bay thuận tiện.',
            guest_recommend_watch: 'Đang được theo dõi',
            guest_recommend_watch_text: 'Chuyến bay nằm trong danh sách ưu tiên.',
            guest_recommend_standard: 'Lựa chọn cân bằng',
            guest_recommend_standard_text: 'Giá, lịch bay và dịch vụ ở mức hợp lý.',
            guest_best_price: 'Giá thấp nhất',
            guest_best_saving: 'Tiết kiệm cao nhất',
            guest_best_rating: 'Đánh giá tốt nhất',
            guest_remove: 'Bỏ chọn',
            guest_data_source: 'Nguồn dữ liệu',
            sort_date: 'Khởi hành sớm nhất',
            sort_saving: 'Tiết kiệm nhiều nhất',
            sort_rating: 'Đánh giá cao nhất',
            sort_seats: 'Nhiều ghế trống nhất'
        });

        Object.assign(dictionary.en, {
            guest_saved_flights: 'Saved flights',
            guest_saved_short: 'Saved',
            guest_advanced_filters: 'Advanced filters',
            guest_filter_origin: 'Origin',
            guest_filter_destination: 'Destination',
            guest_filter_date_from: 'From date',
            guest_filter_date_to: 'To date',
            guest_filter_max_price: 'Maximum price',
            guest_filter_cabin: 'Cabin',
            guest_filter_status: 'Status',
            guest_all: 'All',
            guest_only_saved: 'Saved flights only',
            guest_reset_filters: 'Reset filters',
            guest_results: '{shown} matching results',
            guest_active_filters: '{count} active filters',
            guest_quick_all: 'All',
            guest_quick_deal: 'Best deals',
            guest_quick_upcoming: 'Departing soon',
            guest_quick_international: 'International',
            guest_quick_watch: 'Price tracked',
            guest_view_grid: 'Grid view',
            guest_view_list: 'List view',
            guest_save: 'Save',
            guest_saved: 'Saved',
            guest_save_flight: 'Save flight',
            guest_remove_saved: 'Remove saved flight',
            guest_share: 'Share',
            guest_clear: 'Clear all',
            guest_recent_title: 'Recently viewed',
            guest_recent_sub: 'Quickly continue viewing your recent flights.',
            guest_recent_clear: 'Clear history',
            guest_recent_cleared: 'Viewing history cleared.',
            guest_recent_remove: 'Remove from history',
            guest_recent_removed: 'Flight removed from viewing history.',
            guest_recent_count: '{count} viewed flights',
            guest_no_saved: 'You have not saved any flights yet.',
            guest_saved_hint: 'Tap the heart icon on a card to save a flight.',
            guest_open_flight: 'Open details for flight {code}',
            guest_card_detail_hint: 'Select the card to view complete information',
            guest_detail_eyebrow: 'FLIGHT INFORMATION',
            guest_detail_title: 'Flight details',
            guest_detail_overview: 'Journey overview',
            guest_detail_schedule: 'Schedule',
            guest_detail_fare: 'Fare analysis',
            guest_detail_service: 'Services and availability',
            guest_detail_note: 'Flight note',
            guest_detail_click_outside: 'Close with ×, Esc, or by clicking outside.',
            guest_detail_save: 'Save flight',
            guest_detail_unsave: 'Remove saved',
            guest_detail_share: 'Share',
            guest_detail_track: 'Track fare',
            guest_detail_untrack: 'Stop tracking',
            guest_tracking_enabled: 'Enabled',
            guest_tracking_disabled: 'Disabled',
            guest_detail_book: 'Check fare with airline',
            guest_detail_target_reached: 'The current fare has reached or beaten the target.',
            guest_detail_target_pending: 'The current fare remains above the target.',
            guest_flight_missing_recent: 'This flight no longer exists. The stale history entry was removed automatically.',
            guest_recent_missing_title: 'Flight no longer exists',
            guest_recent_missing_sub: 'Select to remove this stale history entry',
            guest_flight_unavailable_offline: 'This flight cannot be verified while data is offline. The history entry has been kept.',
            guest_stale_cleaned: 'Removed {count} stale flight item(s) automatically.',
            guest_detail_smart_title: 'Smart assessment',
            guest_booking_unavailable: 'The booking link is not available.',
            guest_share_success: 'Flight link copied.',
            guest_share_text: 'View flight {code}: {route} from {price}',
            guest_cache_notice: 'The API is unavailable. Showing the most recent cached data.',
            guest_load_error: 'Unable to load flight data. Please try again.',
            guest_source_live: 'Live data',
            guest_source_cache: 'Offline cache',
            guest_source_empty: 'No data available',
            guest_filter_toggle: 'Open advanced filters',
            guest_price_any: 'No limit',
            guest_recommend_best: 'Outstanding value',
            guest_recommend_best_text: 'High savings compared with the target price.',
            guest_recommend_urgent: 'Limited seats',
            guest_recommend_urgent_text: 'Only a few seats remain, so booking early is recommended.',
            guest_recommend_quality: 'Highly rated',
            guest_recommend_quality_text: 'Strong review score with a convenient schedule.',
            guest_recommend_watch: 'Price tracked',
            guest_recommend_watch_text: 'This flight is currently on the priority watchlist.',
            guest_recommend_standard: 'Balanced option',
            guest_recommend_standard_text: 'A sensible balance of price, schedule, and service.',
            guest_best_price: 'Lowest price',
            guest_best_saving: 'Highest saving',
            guest_best_rating: 'Best rating',
            guest_remove: 'Remove',
            guest_data_source: 'Data source',
            sort_date: 'Earliest departure',
            sort_saving: 'Highest saving',
            sort_rating: 'Highest rating',
            sort_seats: 'Most available seats'
        });
    }


    function setupEnhancedControls() {
        const filterIds = ['filter-from', 'filter-to', 'filter-date-from', 'filter-date-to', 'filter-price-max', 'filter-cabin', 'filter-status', 'filter-favorites'];
        filterIds.forEach(id => {
            const element = document.getElementById(id);
            if (!element) return;
            element.addEventListener(id === 'filter-price-max' ? 'input' : 'change', () => {
                updatePriceLabel();
                applyFiltersAndSort(true);
            });
        });

        document.querySelectorAll('[data-quick-filter]').forEach(button => {
            button.addEventListener('click', () => {
                guestState.quick = button.dataset.quickFilter || 'all';
                document.querySelectorAll('[data-quick-filter]').forEach(item => item.classList.toggle('active', item === button));
                applyFiltersAndSort(true);
            });
        });

        document.querySelectorAll('[data-view-mode]').forEach(button => {
            button.addEventListener('click', () => setViewMode(button.dataset.viewMode));
        });

        document.getElementById('btn-reset-filters')?.addEventListener('click', resetEnhancedFilters);
        document.querySelector('[data-footer-action="watch-filter"]')?.addEventListener('click', () => {
            guestState.quick = 'watch';
            document.querySelectorAll('[data-quick-filter]').forEach(item => {
                item.classList.toggle('active', item.dataset.quickFilter === 'watch');
            });
            applyFiltersAndSort(true);
            document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        document.getElementById('saved-flights-button')?.addEventListener('click', renderSavedDrawer);
        const savedContent = document.getElementById('saved-flights-content');
        savedContent?.addEventListener('click', handleSavedDrawerAction);
        savedContent?.addEventListener('keydown', event => {
            if (!['Enter', ' '].includes(event.key)) return;
            const item = event.target.closest('[data-open-saved-flight]');
            if (!item || event.target.closest('a,button')) return;
            event.preventDefault();
            item.click();
        });
        document.getElementById('recent-flights')?.addEventListener('click', handleRecentAction);
        document.getElementById('btn-clear-recent')?.addEventListener('click', clearRecentHistory);
        document.getElementById('flights-container')?.addEventListener('click', handleFlightCardOpen);
        document.getElementById('flights-container')?.addEventListener('keydown', handleFlightCardKeydown);
        document.getElementById('flight-detail-content')?.addEventListener('click', handleDetailAction);
        const detailPanel = document.getElementById('flightDetailOffcanvas');
        detailPanel?.addEventListener('hidden.bs.offcanvas', handleDetailHidden);
        detailPanel?.addEventListener('shown.bs.offcanvas', () => {
            detailPanel.setAttribute('aria-modal', 'true');
            recoverOverlayState(false);
        });
        detailPanel?.addEventListener('hide.bs.offcanvas', () => { detailOpening = false; });

        const sort = document.getElementById('sort-price');
        if (sort && !sort.querySelector('[value="date"]')) {
            ['date', 'saving', 'rating', 'seats'].forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.dataset.i18n = `sort_${value}`;
                option.textContent = getI18n(`sort_${value}`);
                sort.append(option);
            });
        }
    }

    function setupPublicRevealAnimations() {
        const items = document.querySelectorAll('.mini-stat-card, .recent-section');
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach(item => item.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: .12 });
        items.forEach((item, index) => {
            item.classList.add('public-reveal');
            item.style.setProperty('--public-delay', `${Math.min(index * 55, 260)}ms`);
            observer.observe(item);
        });
    }

    function translateEnhancedStaticUI() {
        document.querySelectorAll('[data-guest-i18n]').forEach(element => {
            const key = element.dataset.guestI18n;
            element.textContent = getI18n(key);
        });
        document.querySelectorAll('[data-guest-title]').forEach(element => {
            element.title = getI18n(element.dataset.guestTitle);
            element.setAttribute('aria-label', getI18n(element.dataset.guestTitle));
        });
        document.querySelectorAll('[data-quick-filter]').forEach(button => {
            const key = `guest_quick_${button.dataset.quickFilter}`;
            const span = button.querySelector('span');
            if (span) span.textContent = getI18n(key);
        });
        updatePriceLabel();
        updateResultsSummary();
        updateActiveFilterState();
        updateDataSourceBadge();
    }

    function populateEnhancedFilters() {
        populateRouteSelect('filter-from', allFlights.map(item => getRouteParts(item.route).from));
        populateRouteSelect('filter-to', allFlights.map(item => getRouteParts(item.route).to));
        populateValueSelect('filter-cabin', allFlights.map(item => item.cabin), value => localizeFlightText(value, 'cabin'));
        populateValueSelect('filter-status', allFlights.map(item => item.status), value => localizeFlightText(value, 'status'));

        const priceInput = document.getElementById('filter-price-max');
        if (priceInput && allFlights.length) {
            const max = Math.ceil(Math.max(...allFlights.map(item => item.currentPrice)) / 100000) * 100000;
            priceInput.max = String(max);
            if (!Number(priceInput.value)) priceInput.value = String(max);
        }

        const dates = allFlights.map(item => item.flightDate).filter(Boolean).sort();
        const from = document.getElementById('filter-date-from');
        const to = document.getElementById('filter-date-to');
        if (dates.length) {
            if (from) { from.min = dates[0]; from.max = dates.at(-1); }
            if (to) { to.min = dates[0]; to.max = dates.at(-1); }
        }
        restoreEnhancedFilters();
        updatePriceLabel();
    }

    function populateRouteSelect(id, values) {
        const select = document.getElementById(id);
        if (!select) return;
        const selected = select.value;
        const unique = [...new Map(values.filter(Boolean).map(value => [removeVietnameseAccent(value), value])).entries()]
            .sort((a, b) => localizeCity(a[1]).localeCompare(localizeCity(b[1]), currentLang === 'vi' ? 'vi' : 'en'));
        select.innerHTML = `<option value="all">${getI18n('guest_all')}</option>` + unique.map(([key, value]) => `<option value="${escapeHTML(key)}">${escapeHTML(localizeCity(value))}</option>`).join('');
        if ([...select.options].some(option => option.value === selected)) select.value = selected;
    }

    function populateValueSelect(id, values, labeler) {
        const select = document.getElementById(id);
        if (!select) return;
        const selected = select.value;
        const unique = [...new Map(values.filter(Boolean).map(value => [removeVietnameseAccent(value), value])).entries()]
            .sort((a, b) => labeler(a[1]).localeCompare(labeler(b[1]), currentLang === 'vi' ? 'vi' : 'en'));
        select.innerHTML = `<option value="all">${getI18n('guest_all')}</option>` + unique.map(([key, value]) => `<option value="${escapeHTML(key)}">${escapeHTML(labeler(value))}</option>`).join('');
        if ([...select.options].some(option => option.value === selected)) select.value = selected;
    }

    function matchQuickFilter(flight, saving, routeParts) {
        if (guestState.quick === 'deal') return saving.percent >= 20 || saving.reached;
        if (guestState.quick === 'watch') return flight.isPriority;
        if (guestState.quick === 'international') return isInternationalRoute(routeParts);
        if (guestState.quick === 'upcoming') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const limit = new Date(today);
            limit.setDate(limit.getDate() + 14);
            const date = new Date(`${flight.flightDate}T00:00:00`);
            return date >= today && date <= limit;
        }
        return true;
    }

    function isInternationalRoute(routeParts) {
        const domestic = [
            'ha noi', 'tp ho chi minh', 'ho chi minh', 'sai gon', 'da nang', 'da lat', 'phu quoc', 'nha trang',
            'hue', 'hai phong', 'can tho', 'quy nhon', 'vinh', 'buon ma thuot', 'thanh hoa', 'dong hoi', 'chu lai', 'con dao'
        ];
        const from = removeVietnameseAccent(routeParts.from);
        const to = removeVietnameseAccent(routeParts.to);
        return !domestic.some(city => from.includes(city)) || !domestic.some(city => to.includes(city));
    }

    function setViewMode(mode) {
        guestState.view = mode === 'list' ? 'list' : 'grid';
        storageSet(STORAGE.view, guestState.view);
        applyViewMode();
    }

    function applyViewMode() {
        const container = document.getElementById('flights-container');
        if (!container) return;
        container.classList.toggle('view-list-mode', guestState.view === 'list');
        document.querySelectorAll('[data-view-mode]').forEach(button => {
            const active = button.dataset.viewMode === guestState.view;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function toggleFavorite(id) {
        if (!id) return;
        const key = String(id);
        if (guestState.favorites.has(key)) {
            guestState.favorites.delete(key);
            showClientToast(getI18n('guest_remove_saved'), 'secondary');
        } else {
            guestState.favorites.add(key);
            showClientToast(getI18n('guest_save_flight'), 'success');
        }
        writeSet(STORAGE.favorites, guestState.favorites);
        applyFiltersAndSort(false);
    }

    function addRecentFlight(id) {
        const key = String(id);
        guestState.recent = [key, ...guestState.recent.filter(item => item !== key)].slice(0, MAX_RECENT);
        storageWriteJSON(STORAGE.recent, guestState.recent);
        renderRecentFlights();
    }

    function renderRecentFlights() {
        const section = document.getElementById('recent-section');
        const container = document.getElementById('recent-flights');
        const clearButton = document.getElementById('btn-clear-recent');
        const countElement = document.getElementById('recent-count');
        if (!section || !container) return;
        if (!lastSyncAt && !allFlights.length) {
            section.hidden = true;
            return;
        }

        const recentIds = guestState.recent.slice(0, 6);
        section.hidden = recentIds.length === 0;
        if (clearButton) clearButton.hidden = recentIds.length === 0;
        if (countElement) countElement.textContent = translate('guest_recent_count', { count: guestState.recent.length });

        container.innerHTML = recentIds.map(id => {
            const flight = allFlights.find(item => String(item.id) === String(id));
            if (!flight) {
                const sub = guestState.authoritative ? getI18n('guest_recent_missing_sub') : getI18n('guest_flight_unavailable_offline');
                return `<article class="recent-flight-card is-missing" data-recent-id="${escapeHTML(id)}">
                    <button type="button" class="recent-flight-main" data-focus-flight="${escapeHTML(id)}">
                        <span class="recent-missing-icon"><i class="fa-solid fa-plane-circle-xmark"></i></span>
                        <span class="recent-flight-copy"><strong>${getI18n('guest_recent_missing_title')}</strong><small>${escapeHTML(sub)}</small></span>
                        <b>#${escapeHTML(id)}</b><i class="fa-solid ${guestState.authoritative ? 'fa-trash-can' : 'fa-cloud-arrow-down'}"></i>
                    </button>
                    <button type="button" class="recent-remove-button" data-remove-recent="${escapeHTML(id)}" title="${escapeHTML(getI18n('guest_recent_remove'))}" aria-label="${escapeHTML(getI18n('guest_recent_remove'))}"><i class="fa-solid fa-xmark"></i></button>
                </article>`;
            }
            const route = getRouteParts(flight.route);
            return `<article class="recent-flight-card" data-recent-id="${escapeHTML(flight.id)}">
                <button type="button" class="recent-flight-main" data-focus-flight="${escapeHTML(flight.id)}" aria-label="${escapeHTML(translate('guest_open_flight', { code: flight.flightCode }))}">
                    ${renderAirlineLogo(flight.airline, 'md')}
                    <span class="recent-flight-copy"><strong>${escapeHTML(flight.flightCode)}</strong><small>${escapeHTML(localizeCity(route.from))} → ${escapeHTML(localizeCity(route.to))}</small></span>
                    <b>${formatMoney(flight.currentPrice)}</b><i class="fa-solid fa-chevron-right"></i>
                </button>
                <button type="button" class="recent-remove-button" data-remove-recent="${escapeHTML(flight.id)}" title="${escapeHTML(getI18n('guest_recent_remove'))}" aria-label="${escapeHTML(getI18n('guest_recent_remove'))}"><i class="fa-solid fa-xmark"></i></button>
            </article>`;
        }).join('');
    }

    function handleRecentAction(event) {
        const removeButton = event.target.closest('[data-remove-recent]');
        if (removeButton) {
            event.preventDefault();
            event.stopPropagation();
            removeRecentFlight(removeButton.dataset.removeRecent, true);
            return;
        }

        const button = event.target.closest('[data-focus-flight]');
        if (!button) return;
        const id = button.dataset.focusFlight;
        const flight = allFlights.find(item => String(item.id) === String(id));
        if (!flight) {
            if (guestState.authoritative) removeStoredFlight(id, { recent: true, favorite: false, notify: true });
            else showClientToast(getI18n('guest_flight_unavailable_offline'), 'warning');
            return;
        }
        revealFlightInList(id, true);
        window.setTimeout(() => openFlightDetail(id, { source: 'recent' }), 220);
    }

    function removeRecentFlight(id, notify = false) {
        const key = String(id || '');
        if (!key) return;
        guestState.recent = guestState.recent.filter(item => String(item) !== key);
        storageWriteJSON(STORAGE.recent, guestState.recent);
        renderRecentFlights();
        if (notify) showClientToast(getI18n('guest_recent_removed'), 'secondary');
    }

    function clearRecentHistory() {
        if (!guestState.recent.length) return;
        guestState.recent = [];
        storageRemove(STORAGE.recent);
        renderRecentFlights();
        showClientToast(getI18n('guest_recent_cleared'), 'success');
    }

    function renderSavedDrawer() {
        const content = document.getElementById('saved-flights-content');
        const count = document.getElementById('saved-count');
        const badge = document.getElementById('saved-nav-count');
        const flights = [...guestState.favorites].map(id => allFlights.find(item => String(item.id) === id)).filter(Boolean);
        if (count) count.textContent = String(flights.length);
        if (badge) {
            badge.textContent = String(flights.length);
            badge.hidden = flights.length === 0;
        }
        if (!content) return;
        if (!flights.length) {
            content.innerHTML = `<div class="saved-empty"><i class="fa-regular fa-heart"></i><strong>${getI18n('guest_no_saved')}</strong><p>${getI18n('guest_saved_hint')}</p></div>`;
            return;
        }
        content.innerHTML = flights.map(flight => {
            const route = getRouteParts(flight.route);
            return `<article class="saved-flight-item" data-open-saved-flight="${escapeHTML(flight.id)}" tabindex="0" role="button">
                ${renderAirlineLogo(flight.airline, 'lg')}
                <div><strong>${escapeHTML(flight.flightCode)}</strong><small>${escapeHTML(localizeCity(route.from))} → ${escapeHTML(localizeCity(route.to))}</small><b>${formatMoney(flight.currentPrice)}</b></div>
                <div class="saved-item-actions">${isValidUrl(flight.bookingUrl) ? `<a href="${escapeHTML(flight.bookingUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" title="${escapeHTML(getI18n('open_booking'))}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : `<button type="button" class="btn btn-sm btn-primary disabled" aria-disabled="true" title="${escapeHTML(getI18n('guest_booking_unavailable'))}"><i class="fa-solid fa-link-slash"></i></button>`}<button data-saved-remove="${escapeHTML(flight.id)}" class="btn btn-sm btn-light text-danger" title="${escapeHTML(getI18n('guest_remove_saved'))}"><i class="fa-solid fa-trash"></i></button></div>
            </article>`;
        }).join('');
    }

    function handleSavedDrawerAction(event) {
        const remove = event.target.closest('[data-saved-remove]');
        if (remove) {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(remove.dataset.savedRemove);
            return;
        }
        const item = event.target.closest('[data-open-saved-flight]');
        if (!item || event.target.closest('a,button')) return;
        const id = item.dataset.openSavedFlight;
        const flight = allFlights.find(value => String(value.id) === String(id));
        if (!flight) {
            guestState.favorites.delete(String(id));
            writeSet(STORAGE.favorites, guestState.favorites);
            renderSavedDrawer();
            showClientToast(getI18n('guest_flight_missing_recent'), 'warning');
            return;
        }
        const savedElement = document.getElementById('savedFlightsOffcanvas');
        const savedInstance = savedElement && window.bootstrap?.Offcanvas ? bootstrap.Offcanvas.getInstance(savedElement) : null;
        if (savedInstance) {
            savedElement.addEventListener('hidden.bs.offcanvas', () => openFlightDetail(id, { source: 'saved' }), { once: true });
            savedInstance.hide();
        } else openFlightDetail(id, { source: 'saved' });
    }

    async function shareFlight(id) {
        const flight = allFlights.find(item => String(item.id) === String(id));
        if (!flight) {
            showClientToast(getI18n('guest_flight_missing_recent'), 'warning');
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set('flight', String(id));
        url.hash = '';
        const data = {
            title: `FlightWatcher • ${flight.flightCode}`,
            text: translate('guest_share_text', { code: flight.flightCode, route: flight.route, price: formatMoney(flight.currentPrice) }),
            url: url.toString()
        };
        try {
            if (navigator.share) await navigator.share(data);
            else await navigator.clipboard.writeText(data.url);
            showClientToast(getI18n('guest_share_success'), 'success');
        } catch (error) {
            if (error?.name !== 'AbortError') {
                await copyText(data.url);
            }
        }
    }

    function updateFlightQuery(id) {
        const url = new URL(window.location.href);
        if (id) url.searchParams.set('flight', String(id));
        else url.searchParams.delete('flight');
        history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }

    function openSharedFlightFromUrl() {
        if (sharedLinkHandled) return;
        sharedLinkHandled = true;
        const id = new URLSearchParams(window.location.search).get('flight');
        if (!id) return;
        const flight = allFlights.find(item => String(item.id) === String(id));
        if (flight) {
            window.setTimeout(() => {
                revealFlightInList(id, false);
                openFlightDetail(id, { updateUrl: false, source: 'shared' });
            }, 320);
        } else {
            updateFlightQuery(null);
            if (guestState.authoritative) removeStoredFlight(id, { recent: true, favorite: true, notify: true });
            else showClientToast(getI18n('guest_flight_unavailable_offline'), 'warning');
        }
    }

    function focusFlightCard(id) {
        const card = [...document.querySelectorAll('[data-flight-id]')].find(item => String(item.dataset.flightId) === String(id));
        if (!card) return;
        card.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
        card.classList.remove('is-deep-linked');
        requestAnimationFrame(() => card.classList.add('is-deep-linked'));
        window.setTimeout(() => card.classList.remove('is-deep-linked'), 2600);
    }


    function handleFlightCardOpen(event) {
        if (event.target.closest('a,button,input,select,textarea,label,[data-action]')) return;
        const card = event.target.closest('[data-flight-id]');
        if (!card) return;
        detailReturnFocus = card;
        openFlightDetail(card.dataset.flightId, { source: 'card' });
    }

    function handleFlightCardKeydown(event) {
        if (!['Enter', ' '].includes(event.key)) return;
        if (event.target.closest('a,button,input,select,textarea')) return;
        const card = event.target.closest('[data-flight-id]');
        if (!card) return;
        event.preventDefault();
        detailReturnFocus = card;
        openFlightDetail(card.dataset.flightId, { source: 'keyboard' });
    }

    async function openFlightDetail(id, options = {}) {
        const flight = allFlights.find(item => String(item.id) === String(id));
        if (!flight) {
            if (guestState.authoritative) removeStoredFlight(id, { recent: true, favorite: true, notify: true });
            else showClientToast(getI18n('guest_flight_unavailable_offline'), 'warning');
            if (options.updateUrl !== false) updateFlightQuery(null);
            return false;
        }

        const panel = document.getElementById('flightDetailOffcanvas');
        if (!panel || !window.bootstrap?.Offcanvas) {
            revealFlightInList(id, true);
            showClientToast(getI18n('modal_error') || getI18n('guest_load_error'), 'danger');
            recoverOverlayState(true);
            return false;
        }

        if (detailOpening) return false;
        detailOpening = true;
        try {
            activeDetailFlightId = String(id);
            addRecentFlight(id);
            renderFlightDetail(flight);
            if (options.updateUrl !== false) updateFlightQuery(id);

            const detailInstance = bootstrap.Offcanvas.getOrCreateInstance(panel, { backdrop: true, scroll: false, keyboard: true });
            const otherPanels = [...document.querySelectorAll('.offcanvas.show')].filter(item => item !== panel);
            if (otherPanels.length) {
                await Promise.all(otherPanels.map(hideOffcanvasAndWait));
            }
            detailInstance.show();
            window.setTimeout(() => {
                panel.querySelector('[data-bs-dismiss="offcanvas"]')?.focus({ preventScroll: true });
            }, 180);
            return true;
        } catch (error) {
            console.error('Không thể mở chi tiết chuyến bay:', error);
            recoverOverlayState(true);
            showClientToast(getI18n('modal_error') || getI18n('guest_load_error'), 'danger');
            return false;
        } finally {
            window.setTimeout(() => { detailOpening = false; }, 220);
        }
    }

    function renderFlightDetail(flight) {
        const container = document.getElementById('flight-detail-content');
        if (!container || !flight) return;
        const route = getRouteParts(flight.route);
        const fromName = localizeCity(route.from);
        const toName = localizeCity(route.to);
        const fromCode = getAirportCode(route.from);
        const toCode = getAirportCode(route.to);
        const departTime = normalizeTime(flight.departureTime, '08:30');
        const arriveTime = normalizeTime(flight.arrivalTime, '10:45');
        const duration = calculateDuration(departTime, arriveTime);
        const saving = getSavingInfo(flight);
        const saved = guestState.favorites.has(String(flight.id));
        const fallbackCover = getDestinationImage(flight.route);
        const legacyArtwork = /img\/covers\/.*\.svg(?:$|[?#])/i.test(String(flight.imageUrl || ''));
        const cover = flight.imageUrl && isValidImageSource(flight.imageUrl) && !legacyArtwork ? flight.imageUrl : fallbackCover;
        const profile = getAirlineProfile(flight.airline);
        const status = localizeFlightText(flight.status, 'status');
        const cabin = localizeFlightText(flight.cabin, 'cabin');
        const baggage = localizeFlightText(flight.baggage, 'baggage');
        const note = localizeFlightText(flight.note, 'note');
        const bookingAvailable = isValidUrl(flight.bookingUrl);
        const bookingLink = bookingAvailable ? flight.bookingUrl : '';
        const recommendation = getRecommendation(flight, saving);
        const reachedText = saving.reached ? getI18n('guest_detail_target_reached') : getI18n('guest_detail_target_pending');
        const progress = Math.max(0, Math.min(100, saving.progress));

        container.innerHTML = `
            <section class="detail-hero" style="background-image:url('${escapeHTML(cover)}'),url('${escapeHTML(fallbackCover)}'),url('img/photos/fallback-flight.webp')">
                <div class="detail-hero-overlay"></div>
                <div class="detail-hero-brand">${renderAirlineLogo(flight.airline, 'lg', 'detail-airline-logo')}<div><strong>${escapeHTML(flight.airline)}</strong><span>${escapeHTML(profile.MaHang || '')} · ${escapeHTML(flight.flightCode)}</span></div></div>
            </section>
            <section class="detail-route-card">
                <div class="detail-airport"><strong>${escapeHTML(fromCode)}</strong><span>${escapeHTML(fromName)}</span><b>${escapeHTML(departTime)}</b></div>
                <div class="detail-route-line"><span></span><i class="fa-solid fa-plane"></i><small>${escapeHTML(duration)}</small></div>
                <div class="detail-airport text-end"><strong>${escapeHTML(toCode)}</strong><span>${escapeHTML(toName)}</span><b>${escapeHTML(arriveTime)}</b></div>
            </section>
            <section class="detail-section">
                <div class="detail-section-title"><span><i class="fa-regular fa-calendar-check"></i></span><div><small>01</small><h6>${getI18n('guest_detail_schedule')}</h6></div></div>
                <div class="detail-info-grid">
                    <div><small>${getI18n('date')}</small><strong>${formatFlightDate(flight.flightDate)}</strong></div>
                    <div><small>${getI18n('duration')}</small><strong>${escapeHTML(duration)}</strong></div>
                    <div><small>${getI18n('guest_filter_cabin')}</small><strong>${escapeHTML(cabin)}</strong></div>
                    <div><small>${getI18n('status')}</small><strong>${escapeHTML(status)}</strong></div>
                </div>
            </section>
            <section class="detail-section detail-fare-section">
                <div class="detail-section-title"><span><i class="fa-solid fa-chart-line"></i></span><div><small>02</small><h6>${getI18n('guest_detail_fare')}</h6></div></div>
                <div class="detail-price-grid">
                    <div><small>${getI18n('current_price')}</small><strong>${formatMoney(flight.currentPrice)}</strong></div>
                    <div><small>${getI18n('target_price')}</small><strong>${formatMoney(flight.targetPrice)}</strong></div>
                    <div><small>${getI18n('saving')}</small><strong>${saving.percent}%</strong></div>
                </div>
                <div class="detail-progress-copy"><span>${escapeHTML(reachedText)}</span><b>${progress}%</b></div>
                <div class="detail-progress"><span style="width:${progress}%"></span></div>
                <div class="detail-saving-summary"><i class="fa-solid ${saving.reached ? 'fa-circle-check' : 'fa-clock'}"></i><span>${saving.saving > 0 ? translate('discount_amount', { amount: formatMoney(saving.saving) }) : getI18n('monitoring')}</span></div>
            </section>
            <section class="detail-section">
                <div class="detail-section-title"><span><i class="fa-solid fa-suitcase-rolling"></i></span><div><small>03</small><h6>${getI18n('guest_detail_service')}</h6></div></div>
                <div class="detail-service-grid">
                    <div><i class="fa-solid fa-suitcase"></i><span>${getI18n('baggage')}</span><strong>${escapeHTML(baggage)}</strong></div>
                    <div><i class="fa-solid fa-chair"></i><span>${getI18n('seats_left')}</span><strong>${flight.seats} ${getI18n('seats_unit')}</strong></div>
                    <div><i class="fa-solid fa-star"></i><span>${getI18n('rating')}</span><strong>${Number(flight.rating).toFixed(1)} / 5</strong></div>
                    <div><i class="fa-solid fa-bell"></i><span>${getI18n('monitoring')}</span><strong>${flight.isPriority ? getI18n('guest_tracking_enabled') : getI18n('guest_tracking_disabled')}</strong></div>
                </div>
            </section>
            <section class="detail-smart-card ${recommendation.className}"><span><i class="fa-solid ${recommendation.icon}"></i></span><div><small>${getI18n('guest_detail_smart_title')}</small><strong>${escapeHTML(recommendation.title)}</strong><p>${escapeHTML(recommendation.text)}</p></div></section>
            <section class="detail-note-card"><span><i class="fa-solid fa-lightbulb"></i></span><div><small>${getI18n('guest_detail_note')}</small><p>${escapeHTML(note)}</p></div></section>
            <section class="detail-actions-sticky">
                <a class="btn btn-primary detail-book-button ${bookingAvailable ? '' : 'disabled'}" ${bookingAvailable ? `href="${escapeHTML(bookingLink)}" target="_blank" rel="noopener noreferrer"` : `href="#" aria-disabled="true" data-booking-unavailable="true"`}><i class="fa-solid fa-arrow-up-right-from-square"></i><span>${bookingAvailable ? getI18n('guest_detail_book') : getI18n('guest_booking_unavailable')}</span></a>
                <div class="detail-secondary-actions">
                    <button type="button" class="btn btn-light ${saved ? 'is-active' : ''}" data-detail-action="favorite" data-id="${escapeHTML(flight.id)}"><i class="fa-${saved ? 'solid' : 'regular'} fa-heart"></i><span>${saved ? getI18n('guest_detail_unsave') : getI18n('guest_detail_save')}</span></button>
                    <button type="button" class="btn btn-light ${flight.isPriority ? 'is-active' : ''}" data-detail-action="watch" data-id="${escapeHTML(flight.id)}"><i class="fa-${flight.isPriority ? 'solid' : 'regular'} fa-bell"></i><span>${flight.isPriority ? getI18n('guest_detail_untrack') : getI18n('guest_detail_track')}</span></button>
                    <button type="button" class="btn btn-light" data-detail-action="share" data-id="${escapeHTML(flight.id)}"><i class="fa-solid fa-share-nodes"></i><span>${getI18n('guest_detail_share')}</span></button>
                </div>
                <small class="detail-close-hint"><i class="fa-regular fa-circle-xmark"></i>${getI18n('guest_detail_click_outside')}</small>
            </section>`;
    }

    async function handleDetailAction(event) {
        const unavailable = event.target.closest('[data-booking-unavailable]');
        if (unavailable) {
            event.preventDefault();
            showClientToast(getI18n('guest_booking_unavailable'), 'warning');
            return;
        }
        const button = event.target.closest('[data-detail-action]');
        if (!button) return;
        const id = button.dataset.id;
        const action = button.dataset.detailAction;
        if (action === 'favorite') {
            toggleFavorite(id);
            const flight = allFlights.find(item => String(item.id) === String(id));
            if (flight) renderFlightDetail(flight);
        } else if (action === 'share') {
            await shareFlight(id);
        } else if (action === 'watch') {
            await toggleWatch(id, button);
            const flight = allFlights.find(item => String(item.id) === String(id));
            if (flight) renderFlightDetail(flight);
        }
    }

    function handleDetailHidden() {
        const previousId = activeDetailFlightId;
        activeDetailFlightId = null;
        detailOpening = false;
        updateFlightQuery(null);
        recoverOverlayState();
        if (detailReturnFocus?.isConnected) detailReturnFocus.focus({ preventScroll: true });
        else if (previousId) findRenderedFlightCard(previousId)?.focus({ preventScroll: true });
        detailReturnFocus = null;
    }

    function removeRecentFlight(id, notify = false) {
        removeStoredFlight(id, { recent: true, favorite: false, notify });
    }

    function removeStoredFlight(id, options = {}) {
        const key = String(id);
        let changed = 0;
        if (options.recent !== false) {
            const before = guestState.recent.length;
            guestState.recent = guestState.recent.filter(item => String(item) !== key);
            if (before !== guestState.recent.length) {
                storageWriteJSON(STORAGE.recent, guestState.recent);
                changed += 1;
            }
        }
        if (options.favorite) {
            if (guestState.favorites.delete(key)) {
                writeSet(STORAGE.favorites, guestState.favorites);
                changed += 1;
            }
        }
        renderRecentFlights();
        renderSavedDrawer();
        if (options.notify) showClientToast(getI18n('guest_flight_missing_recent'), 'warning');
        return changed;
    }

    function reconcileStoredFlights(options = {}) {
        if (!guestState.authoritative) return 0;
        const validIds = new Set(allFlights.map(item => String(item.id)));
        const staleFavorites = [...guestState.favorites].filter(id => !validIds.has(String(id)));
        if (!staleFavorites.length) {
            renderRecentFlights();
            return 0;
        }

        staleFavorites.forEach(id => guestState.favorites.delete(String(id)));
        writeSet(STORAGE.favorites, guestState.favorites);
        renderRecentFlights();
        renderSavedDrawer();
        const count = staleFavorites.length;
        if (options.notify && count) showClientToast(translate('guest_stale_cleaned', { count }), 'info');
        return count;
    }

    function hideOffcanvasAndWait(panel) {
        return new Promise(resolve => {
            if (!panel?.classList.contains('show') || !window.bootstrap?.Offcanvas) {
                resolve();
                return;
            }
            let done = false;
            const finish = () => {
                if (done) return;
                done = true;
                panel.removeEventListener('hidden.bs.offcanvas', finish);
                resolve();
            };
            panel.addEventListener('hidden.bs.offcanvas', finish, { once: true });
            bootstrap.Offcanvas.getOrCreateInstance(panel).hide();
            window.setTimeout(finish, DETAIL_TRANSITION_TIMEOUT);
        });
    }

    function recoverOverlayState(force = false) {
        if (window.FWRuntime?.releaseDocumentLock) {
            window.FWRuntime.releaseDocumentLock({ force });
            return;
        }
        if (!force && document.querySelector('.modal.show,.offcanvas.show')) return;
        document.querySelectorAll('.modal-backdrop,.offcanvas-backdrop').forEach(node => node.remove());
        document.body.classList.remove('modal-open','offcanvas-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
    }


    function findRenderedFlightCard(id) {
        return [...document.querySelectorAll('[data-flight-id]')].find(item => String(item.dataset.flightId) === String(id)) || null;
    }

    function revealFlightInList(id, clearFilters = false) {
        const flight = allFlights.find(item => String(item.id) === String(id));
        if (!flight) return false;
        let card = findRenderedFlightCard(id);
        if (!card && clearFilters) {
            const search = document.getElementById('search-input');
            const airline = document.getElementById('filter-airline');
            if (search) search.value = flight.flightCode;
            if (airline) airline.value = 'all';
            ['filter-from', 'filter-to', 'filter-cabin', 'filter-status'].forEach(key => { const el = document.getElementById(key); if (el) el.value = 'all'; });
            ['filter-date-from', 'filter-date-to'].forEach(key => { const el = document.getElementById(key); if (el) el.value = ''; });
            const favoriteOnly = document.getElementById('filter-favorites');
            if (favoriteOnly) favoriteOnly.checked = false;
            const price = document.getElementById('filter-price-max');
            if (price) price.value = price.max || price.value;
            guestState.quick = 'all';
            document.querySelectorAll('[data-quick-filter]').forEach(item => item.classList.toggle('active', item.dataset.quickFilter === 'all'));
            visibleCount = Math.max(PAGE_SIZE, allFlights.length);
            applyFiltersAndSort(false);
            card = findRenderedFlightCard(id);
        }
        if (card) {
            focusFlightCard(id);
            return true;
        }
        return false;
    }

    function getRecommendation(flight, saving) {
        if (saving.percent >= 25 || saving.reached) return { className: 'recommend-best', icon: 'fa-arrow-trend-down', title: getI18n('guest_recommend_best'), text: getI18n('guest_recommend_best_text') };
        if (flight.seats <= 10) return { className: 'recommend-urgent', icon: 'fa-hourglass-half', title: getI18n('guest_recommend_urgent'), text: getI18n('guest_recommend_urgent_text') };
        if (flight.rating >= 4.7) return { className: 'recommend-quality', icon: 'fa-award', title: getI18n('guest_recommend_quality'), text: getI18n('guest_recommend_quality_text') };
        if (flight.isPriority) return { className: 'recommend-watch', icon: 'fa-bell', title: getI18n('guest_recommend_watch'), text: getI18n('guest_recommend_watch_text') };
        return { className: 'recommend-standard', icon: 'fa-thumbs-up', title: getI18n('guest_recommend_standard'), text: getI18n('guest_recommend_standard_text') };
    }

    function updateResultsSummary() {
        const result = document.getElementById('guest-result-summary');
        if (result) result.textContent = translate('guest_results', { shown: filteredFlights.length || 0 });
    }

    function updateActiveFilterState() {
        let count = 0;
        const ids = ['filter-from', 'filter-to', 'filter-cabin', 'filter-status'];
        ids.forEach(id => { if ((document.getElementById(id)?.value || 'all') !== 'all') count++; });
        if (document.getElementById('filter-date-from')?.value) count++;
        if (document.getElementById('filter-date-to')?.value) count++;
        const price = document.getElementById('filter-price-max');
        if (price && Number(price.value) < Number(price.max)) count++;
        if (document.getElementById('filter-favorites')?.checked) count++;
        if (guestState.quick !== 'all') count++;
        const badge = document.getElementById('advanced-filter-count');
        const summary = document.getElementById('guest-active-filter-summary');
        if (badge) {
            badge.textContent = String(count);
            badge.hidden = count === 0;
        }
        if (summary) summary.textContent = translate('guest_active_filters', { count });
    }

    function updatePriceLabel() {
        const input = document.getElementById('filter-price-max');
        const label = document.getElementById('filter-price-label');
        if (!input || !label) return;
        label.textContent = Number(input.value) >= Number(input.max) ? getI18n('guest_price_any') : formatMoney(Number(input.value));
    }

    function resetEnhancedFilters() {
        ['filter-from', 'filter-to', 'filter-cabin', 'filter-status'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = 'all';
        });
        ['filter-date-from', 'filter-date-to'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        const price = document.getElementById('filter-price-max');
        if (price) price.value = price.max || '0';
        const favorites = document.getElementById('filter-favorites');
        if (favorites) favorites.checked = false;
        const search = document.getElementById('search-input');
        if (search) search.value = '';
        const airline = document.getElementById('filter-airline');
        if (airline) airline.value = 'all';
        const sort = document.getElementById('sort-price');
        if (sort) sort.value = 'default';
        guestState.quick = 'all';
        document.querySelectorAll('[data-quick-filter]').forEach(button => button.classList.toggle('active', button.dataset.quickFilter === 'all'));
        storageRemove(STORAGE.filters);
        updatePriceLabel();
        applyFiltersAndSort(true);
    }

    function persistEnhancedFilters() {
        const data = {
            from: document.getElementById('filter-from')?.value || 'all',
            to: document.getElementById('filter-to')?.value || 'all',
            dateFrom: document.getElementById('filter-date-from')?.value || '',
            dateTo: document.getElementById('filter-date-to')?.value || '',
            maxPrice: document.getElementById('filter-price-max')?.value || '',
            cabin: document.getElementById('filter-cabin')?.value || 'all',
            status: document.getElementById('filter-status')?.value || 'all',
            favorites: Boolean(document.getElementById('filter-favorites')?.checked),
            quick: guestState.quick
        };
        storageWriteJSON(STORAGE.filters, data);
    }

    function restoreEnhancedFilters() {
        let data = {};
        data = storageReadJSON(STORAGE.filters, {});
        const assign = (id, value) => {
            const element = document.getElementById(id);
            if (!element || value === undefined || value === null) return;
            if (element.type === 'checkbox') element.checked = Boolean(value);
            else if ([...element.options || []].length && ![...element.options].some(option => option.value === value)) return;
            else element.value = value;
        };
        assign('filter-from', data.from);
        assign('filter-to', data.to);
        assign('filter-date-from', data.dateFrom);
        assign('filter-date-to', data.dateTo);
        assign('filter-price-max', data.maxPrice);
        assign('filter-cabin', data.cabin);
        assign('filter-status', data.status);
        assign('filter-favorites', data.favorites);
        guestState.quick = data.quick || guestState.quick || 'all';
        document.querySelectorAll('[data-quick-filter]').forEach(button => button.classList.toggle('active', button.dataset.quickFilter === guestState.quick));
    }

    function updateDataSourceBadge() {
        const badge = document.getElementById('guest-data-source');
        if (!badge) return;
        const map = {
            live: ['guest_source_live', 'fa-cloud-arrow-down', 'source-live'],
            cache: ['guest_source_cache', 'fa-database', 'source-cache'],
            empty: ['guest_source_empty', 'fa-circle-exclamation', 'source-empty'],
            offline: ['guest_source_cache', 'fa-plug-circle-xmark', 'source-cache'],
            error: ['guest_source_empty', 'fa-triangle-exclamation', 'source-empty']
        };
        const [key, icon, className] = map[guestState.dataSource] || map.live;
        badge.className = `guest-data-source ${className}`;
        badge.innerHTML = `<i class="fa-solid ${icon}"></i><span>${getI18n(key)}</span>`;
    }

    function refreshEnhancedUI() {
        if (allFlights.length) {
            populateEnhancedFilters();
            applyFiltersAndSort(false);
        } else {
            renderSavedDrawer();
            renderRecentFlights();
        }
        if (activeDetailFlightId) {
            const flight = allFlights.find(item => String(item.id) === String(activeDetailFlightId));
            if (flight) renderFlightDetail(flight);
        }
    }

    function readArray(key) {
        const value = storageReadJSON(key, []);
        return Array.isArray(value) ? value.map(String) : [];
    }

    function writeSet(key, set) {
        return storageWriteJSON(key, [...set]);
    }

    function readCache() {
        const cached = storageReadJSON(STORAGE.cache, {});
        if (!cached || !Array.isArray(cached.flights)) return [];
        const savedAt = Number(cached.savedAt || 0);
        if (!savedAt || Date.now() - savedAt > CACHE_MAX_AGE) {
            storageRemove(STORAGE.cache);
            return [];
        }
        return cached.flights.map(normalize).filter(Boolean);
    }

    function setupPublicRuntimeSync() {
        window.clearInterval(publicRefreshTimer);
        publicRefreshTimer = window.setInterval(() => {
            if (!document.hidden && navigator.onLine) fetchAndRenderData({ silent: true });
        }, PUBLIC_REFRESH_INTERVAL);

        window.addEventListener('online', () => {
            window.setTimeout(() => fetchAndRenderData({ silent: true }), 250);
        });
        window.addEventListener('pageshow', () => recoverOverlayState());
        window.addEventListener('pagehide', () => recoverOverlayState(true));
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && navigator.onLine && Date.now() - guestState.lastSuccessfulSync > PUBLIC_REFRESH_INTERVAL) {
                fetchAndRenderData({ silent: true });
            }
        });
        window.addEventListener('storage', event => {
            if (event.key === STORAGE.favorites) {
                guestState.favorites = new Set(readArray(STORAGE.favorites));
                applyFiltersAndSort(false);
            }
            if (event.key === STORAGE.recent) {
                guestState.recent = readArray(STORAGE.recent).slice(0, MAX_RECENT);
                renderRecentFlights();
            }
        });
    }
})();

function setupLeanRevealObserver() {
    const nodes = document.querySelectorAll('.reveal-on-scroll');
    if (!nodes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        nodes.forEach(node => node.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach((node, index) => {
        node.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        observer.observe(node);
    });
}
