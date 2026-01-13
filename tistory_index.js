(() => {
  const TARGET_URL = "https://vo.la/XFCi3hK";

  const TRIGGER_Y = 300;     // 스크롤 px
  const TRIGGER_PCT = 0.35; // 스크롤 비율
  const BLOCK_TIME = 24 * 60 * 60 * 1000; // 24시간

  /* =========================
     모바일만 동작
     ========================= */
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) return;

  /* =========================
     사이트 키 (도메인 기준)
     ========================= */
  const SITE_KEY = location.hostname.replace(/^www\./, '');
  const STORAGE_KEY = "ad_block_" + SITE_KEY;

  /* =========================
     24시간 차단 여부 확인
     ========================= */
  try {
    const lastTime = localStorage.getItem(STORAGE_KEY);
    if (lastTime && Date.now() - Number(lastTime) < BLOCK_TIME) {
      return;
    }
  } catch (e) {
    return;
  }

  let fired = false;

  /* =========================
     스크롤 정보
     ========================= */
  const getScrollInfo = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    const max = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    return { top, pct: top / max };
  };

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
     트리거 조건 체크
     ========================= */
  const check = () => {
    const { top, pct } = getScrollInfo();
    if (top >= TRIGGER_Y || pct >= TRIGGER_PCT) {
      fire();
    }
  };

  /* =========================
     이벤트 등록
     ========================= */
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("touchmove", check, { passive: true });
})();
