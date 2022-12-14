export default function markupImg({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
}) {
  return `<div class='photo-card'>
  <a href='${largeImageURL}' class="photo-card__link">
<img src='${webformatURL}' alt='${tags}' title='${tags}' loading='lazy' class="gallery-img"/>
</a>
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>: ${likes}
    </p>
    <p class='info-item'>
      <b>Views</b>: ${views}
    </p>
    <p class='info-item'>
      <b>Comments</b>: ${comments}
    </p>
  </div>
 
</div>`;
}
