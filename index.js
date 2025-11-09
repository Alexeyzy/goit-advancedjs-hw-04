import{a as g,S as f,i}from"./assets/vendor-CwlUggAG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const y="https://pixabay.com/api/",p="53124504-9ef9dc7d083288085c55b9d9d",b=15;async function h(e,t=1){try{return(await g.get(y,{params:{key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:b,page:t}})).data}catch(a){throw new Error(a.message)}}const L=e=>`
    <li class="gallery-card">
      <a href="${e.largeImageURL}">
        <img
          class="gallery-img"
          src="${e.webformatURL}"
          alt="${e.tags}"
        />
      </a>
      <ul class="info">
        <li><b>Likes</b> ${e.likes}</li>
        <li><b>Views</b> ${e.views}</li>
        <li><b>Comments</b> ${e.comments}</li>
        <li><b>Downloads</b> ${e.downloads}</li>
      </ul>
    </li>
  `,o={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more")};let l="",n=1,d=0;const w=new f(".js-gallery a",{captionsData:"alt",captionDelay:250});o.form.addEventListener("submit",v);o.loadMoreBtn.addEventListener("click",S);async function v(e){if(e.preventDefault(),l=e.target.elements.user_query.value.trim(),o.gallery.innerHTML="",n=1,o.loadMoreBtn.classList.add("hidden"),!l){i.warning({message:"Please enter a search query before submitting!",position:"topRight"});return}o.loader.classList.add("is-active");try{const t=await h(l,n);if(d=t.totalHits,!t.hits.length){i.info({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}m(t.hits),t.hits.length<d&&o.loadMoreBtn.classList.remove("hidden")}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{o.loader.classList.remove("is-active"),e.target.reset()}}async function S(){n+=1,o.loader.classList.add("is-active");try{const e=await h(l,n);m(e.hits,!0);const t=Math.ceil(d/15);n>=t&&(o.loadMoreBtn.classList.add("hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),P()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{o.loader.classList.remove("is-active")}}function m(e,t=!1){const a=e.map(L).join("");t?o.gallery.insertAdjacentHTML("beforeend",a):o.gallery.innerHTML=a,w.refresh()}function P(){const{height:e}=o.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
