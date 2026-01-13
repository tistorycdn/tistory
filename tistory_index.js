(() => {
  const TARGET_URL = "https://vo.la/XFCi3hK";

  const TRIGGER_Y = 300;     // 스크롤 px
  const TRIGGER_PCT = 0.35; // 스크롤 비율
  const BLOCK_TIME = 24 * 60 * 60 * 1000; // 24시간

  /* =========================
     모바일 조건 (디버깅 후 다시 활성화)
     ========================= */
  /*
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) return;
  */

  /* =========================
     사이트 키 (도메인 기준)
     ========================= */
  const SITE_KEY = location.hostname.replace(/^www\./, '');
  const STORAGE_KEY = "ad_block_" + SITE_KEY;

  /* =========================
     24시간 차단 여부
     ========================= */
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (last && Date.now() - Number(last) < BLOCK_TIME) {
      return;
    }
  } catch (e) {}

  let fired = false;

  /* =========================
     스크롤 위치 계산 (워드프레스 대응)
     ========================= */
  const getScrollTop = () =>
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  const getScrollHeight = () =>
    document.documentElement.scrollHeight ||
    document.body.scrollHeight ||
    1;

  /* =========================
     광고 트리거
     ========================= */
  const fire = () => {
    if (fired) return;
    fired = true;

    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (e) {}

    location.href = TARGET_URL;
  };

  /* =========================
     트리거 조건 감시
     ========================= */
  const check = () => {
    const top = getScrollTop();
    const height = getScrollHeight() - window.innerHeight;
    const pct = height > 0 ? top / height : 0;

    if (top >= TRIGGER_Y || pct >= TRIGGER_PCT) {
      fire();
    } else {
      requestAnimationFrame(check);
    }
  };

  /* =========================
     시작 시점 (WP 대응)
     ========================= */
  const start = () => {
    requestAnimationFrame(check);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
