import{a as h,S as g,i}from"./assets/vendor-CwlUggAG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();h.defaults.baseURL="https://pixabay.com/api/";const y="53124504-9ef9dc7d083288085c55b9d9d",p=15;async function m(e,t=1){try{return(await h.get("",{params:{key:y,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:t}})).data}catch(a){throw new Error(a.message)}}const b=e=>`
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
  `,o={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more")};let n="",l=1,d=0;const L=new g(".js-gallery a",{captionsData:"alt",captionDelay:250});o.form.addEventListener("submit",w);o.loadMoreBtn.addEventListener("click",v);async function w(e){if(e.preventDefault(),n=e.target.elements.user_query.value.trim(),o.gallery.innerHTML="",l=1,o.loadMoreBtn.classList.add("hidden"),!n){i.warning({message:"Please enter a search query before submitting!",position:"topRight"});return}o.loader.classList.add("is-active");try{const t=await m(n,l);if(d=t.totalHits,!t.hits.length){i.info({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}f(t.hits),t.hits.length<d&&o.loadMoreBtn.classList.remove("hidden")}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{o.loader.classList.remove("is-active"),e.target.reset()}}async function v(){l+=1,o.loader.classList.add("is-active");try{const e=await m(n,l);f(e.hits,!0);const t=Math.ceil(d/15);l>=t&&(o.loadMoreBtn.classList.add("hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),S()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{o.loader.classList.remove("is-active")}}function f(e,t=!1){const a=e.map(b).join("");t?o.gallery.insertAdjacentHTML("beforeend",a):o.gallery.innerHTML=a,L.refresh()}function S(){const{height:e}=o.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
