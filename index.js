const adjustCreatorType = () => {
    const removeSmallClass = el => el.classList.remove('params-small');

    const els = [...articles.querySelectorAll('.offer-item-details-bottom ul')];
    els.map(removeSmallClass);
} 

const getArticles = () => [...document.querySelectorAll('article[data-url]')];

const extractPrice = (html) => {
  const re = /"Rent":(\d+)/;
  const pe = /"Price":(\d+)/;
  const de = /"Deposit":(\d+)/;
  return { price: html.match(pe)[1], rent: html.match(re)[1], deposit: html.match(de)[1] };
};

const getPrice = (article) => {
  const url = article.dataset.url;

  fetch(url)
    .then((r) => r.text())
    .then((text) => {
      return { article, price: extractPrice(text) };
    }).then(({ article, price }) => {
        if (price.rent) {
            showRealPrice(article, price);
        }
    });
};

const showRealPrice = (article, newPrice) => {
    const { price, rent, deposit } = newPrice;

    const oldPrice = article.querySelector('.offer-item-price');
    
    const dep = deposit ? `<br> Kaucja: ${deposit} zł` : '';
    const rentText = rent > 10 ? `(+${rent})` : '';

    const newPriceText = `
        ${price} ${rentText} zł/mc
        ${dep}
    `
    
    oldPrice.innerHTML = newPriceText;
};


const init = () => {
    const articles = getArticles()
    
    // Pricings
    articles.map(getPrice);
    
    // Styling
    adjustCreatorType();
}

init();