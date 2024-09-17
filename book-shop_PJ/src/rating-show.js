export function ratingStarsFill(parentContainer, averageRatingNum) {
    const fillRatingStarsPersent = +averageRatingNum / (5 / 100);
    
    parentContainer.querySelector('.book__average-rating')
    .innerHTML = `<svg width="60" height="14" viewBox="0 0 160 32">
  <defs>
    <mask id="perc${averageRatingNum}">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <rect x="${fillRatingStarsPersent}%" y="0" width="100%" height="100%" fill="grey" />
    </mask>
    <symbol viewBox="0 0 32 32" id="star">
      <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
    </symbol>
    <symbol viewBox="0 0 160 32" id="stars">
      <use xlink:href="#star" x="-64" y="0"></use>
      <use xlink:href="#star" x="-32" y="0"></use>
      <use xlink:href="#star" x="0" y="0"></use>
      <use xlink:href="#star" x="32" y="0"></use>
      <use xlink:href="#star" x="64" y="0"></use>
    </symbol>
  </defs>
  <use xlink:href="#stars" fill="orange" mask="url(#perc${averageRatingNum})"></use>
</svg>`
}