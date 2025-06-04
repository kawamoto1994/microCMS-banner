const { createClient } = microcms;

// APIキー渡す
const bannerClient = createClient({
  serviceDomain: 'test-restaurant',
  apiKey: 'BgN8GTQoC3uCwhOYDpAxnBjv7CFW8HbGxrxv',
});

// プレビュー画面用 コンテンツID、draftKey取得
const params = new URLSearchParams(window.location.search);
const contentId = params.get("id");
const draftKey = params.get("draftKey");

(async () => {
  // あとでHTMLを挿入する配列
  const createHtml = [];

  // bannerのAPIを取得
  const public = await bannerClient.get({ endpoint: 'banner' });

   // プレビュー用のバナーを取得
  if(contentId && draftKey) {
    const private = await bannerClient.get({
      endpoint: 'banner',
      contentId: contentId,
      queries: { draftKey },
    });

    const privateHtml = `<div class="swiper-slide"><a href="${private.url}"><img src="${private.image.url}" alt="${private.alt}"></a></div>`;
    createHtml.push(privateHtml);
  }

  // 配列にbannerを追加
  public.contents.forEach((item) => {
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
