const { createClient } = microcms;

const bannerClient = createClient({
  serviceDomain: 'test-restaurant',
  apiKey: 'BgN8GTQoC3uCwhOYDpAxnBjv7CFW8HbGxrxv',
});

(async () => {
  const createHtml = [];
  const res = await bannerClient.get({ endpoint: 'banner' });

  console.log(res);

  res.contents.forEach((item) => {
    const html = `<div class="swiper-slide"><a href="${item.url}"><img src="${item.image.url}" alt="${item.alt}"></a></div>`;
    // createHtml.push([item.createdAt,html]);
  });

  const wrapper = document.querySelector('#slider');
  wrapper.innerHTML = createHtml.join('');
})();
