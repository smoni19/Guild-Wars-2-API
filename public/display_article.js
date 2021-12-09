makeUrlChangeShowArticleForCurrentPage();

function makeUrlChangeShowArticleForCurrentPage() {
  window.addEventListener("hashchange", showArticleForCurrentPage);
};

function showArticleForCurrentPage() {
  showArticle(getArticleFromUrl(window.location));
};

function getArticleFromUrl(location) {
  return location.hash.split("#")[1];
};

function showArticle(article) {
  document
    .getElementById("articleToDisplay")
    .innerHTML = article;
};

module.exports = makeUrlChangeShowArticleForCurrentPage;