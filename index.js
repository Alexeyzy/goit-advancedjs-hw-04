import{S as c,i as n}from"./assets/vendor-B07T6_gy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const u=t=>{const s=new URLSearchParams({key:"53124504-9ef9dc7d083288085c55b9d9d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${s}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})},m=t=>`
    <li class="gallery-card">
      <a href="${t.largeImageURL}">
        <img
          class="gallery-img"
          src="${t.webformatURL}"
          alt="${t.tags}"
        />
      </a>
      <ul class="info">
        <li><b>Likes</b> ${t.likes}</li>
        <li><b>Views</b> ${t.views}</li>
        <li><b>Comments</b> ${t.comments}</li>
        <li><b>Downloads</b> ${t.downloads}</li>
      </ul>
    </li>
  `,a={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")},d=new c(".js-gallery a",{captionsData:"alt",captionDelay:250});a.form.addEventListener("submit",f);function f(t){t.preventDefault();const{target:s}=t,o=s.elements.user_query.value.trim();if(a.gallery.innerHTML="",!o){n.warning({message:"Please enter a search query before submitting!",position:"topRight"});return}a.loader.classList.add("is-active"),u(o).then(i=>{if(!i.hits.length){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const e=i.hits.map(r=>m(r)).join("");a.gallery.innerHTML=e,a.gallery.querySelectorAll(".gallery-card").forEach(r=>setTimeout(()=>r.classList.add("show"),50)),d.refresh()}).catch(()=>{n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{a.loader.classList.remove("is-active"),s.reset()})}
//# sourceMappingURL=index.js.map
