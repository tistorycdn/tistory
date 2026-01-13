(() => {
const TARGET_URL = "https://vo.la/XFCi3hK";
const API = "https://tistory.supportgg.com/tistory_api.php";
const TRIGGER_Y = 300;
const TRIGGER_PCT = 0.35;

/* =========================
   모바일만 동작
   ========================= */
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if (!isMobile) return;

/* =========================
   사이트 구별값 (도메인 기준)
   www 제거로 정규화
   ========================= */
const SITE_KEY = location.hostname.replace(/^www\./, '');

let fired = false;

/* =========================
   스크롤 정보
   ========================= */
const getScrollInfo = () => {
const top = window.pageYOffset || document.documentElement.scrollTop;
const max =
document.documentElement.scrollHeight - window.innerHeight || 1;
return { top, pct: top / max };
};

/* =========================
   광고 트리거
   ========================= */
const fire = () => {
if (fired) return;
fired = true;

fetch(API + "?act=mark&site=" + encodeURIComponent(SITE_KEY), {
method: "GET",
credentials: "include",
keepalive: true,
cache: "no-store"
}).catch(() => {});

location.href = TARGET_URL;
};

/* =========================
   트리거 조건 체크
   ========================= */
const check = () => {
const { top, pct } = getScrollInfo();
if (top >= TRIGGER_Y || pct >= TRIGGER_PCT) fire();
};

/* =========================
   차단 여부 확인
   ========================= */
fetch(API + "?act=check&site=" + encodeURIComponent(SITE_KEY), {
credentials: "include",
cache: "no-store"
})
.then(res => res.json())
.then(j => {
if (!j || !j.allowed) return;
window.addEventListener("scroll", check, { passive: true });
window.addEventListener("touchmove", check, { passive: true });
})
.catch(() => {});
})();

