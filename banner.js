const { createClient } = microcms;

// ホスト名取得
const hostName = location.hostname;

// 本番環境のホスト名
const production = 'honban';

// APIキー渡す
const bannerClient = createClient({
  serviceDomain: 'test-restaurant',
  apiKey: 'BgN8GTQoC3uCwhOYDpAxnBjv7CFW8HbGxrxv',
});

// プレビュー画面用 draftKey取得
const params = new URLSearchParams(window.location.search);
const draftKey = params.get("draftKey");

(async () => {
  // あとでHTMLを挿入する配列
  const createHtml = [];
  let bannerData;

   // bannerのデータを取得
  if(draftKey && hostName !== production) {
    // 画面プレビューしている下書きのバナー+公開中のバナー全件のデータを取得
    bannerData = await bannerClient.get({
      endpoint: 'banner',
      queries: { draftKey },
    });
  } else {
    // 公開中のバナー全件のデータを取得（公開終了・下書きのバナーは含めない）
    bannerData = await bannerClient.get({
      endpoint: 'banner',
    });
  }

  // 配列にbannerを追加
  bannerData.contents.forEach((item) => {
    const html = `<div class="swiper-slide"><a href="${item.url}"><img src="${item.image.url}" alt="${item.alt}"></a></div>`;
    createHtml.push(html);
  });

  // HTML挿入
  const wrapper = document.querySelector('#slider');
  wrapper.innerHTML = createHtml.join('');

  // Swiper実行
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 16,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
})();
