import{a as E,S as $,i}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",H="47417091-7b1b728bfc28f8d5b77701890",h=async(t,r=1,s=15)=>{const a=`${v}?key=${H}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;try{const e=await E.get(a);if(e.status!==200)throw new Error("Failed to fetch images");return e.data}catch(e){throw console.error(e),e}},g=t=>t.map(({webformatURL:r,largeImageURL:s,tags:a,likes:e,views:o,comments:d,downloads:L})=>`
      <a href="${s}" class="gallery-item" title="${a}">
          <img src="${r}" alt="${a}" loading="lazy">
          <div class="info">
              <p><b>Likes</b> ${e}</p>
              <p><b>Views</b> ${o}</p>
              <p><b>Comments</b> ${d}</p>
              <p><b>Downloads</b> ${L}</p>
          </div>
      </a>
  `).join(""),S=t=>{t.innerHTML=""},c=(t,r)=>{t.style.display=r?"block":"none"},b=document.querySelector("#search-form"),f=document.querySelector(".gallery"),l=document.querySelector(".loader"),u=document.querySelector("#load-more");let p=new $(".gallery a"),n=1,y="",m=0;b.addEventListener("submit",async t=>{t.preventDefault();const r=b.elements.searchQuery.value.trim();if(!r){i.error({title:"Error",message:"Please enter a search term!"});return}y=r,n=1,m=0,S(f),c(l,!0),u.style.display="none";try{const s=await h(y,n);if(m=s.totalHits,s.hits.length===0){i.warning({title:"No Results",message:"No images found. Try another keyword!"});return}const a=g(s.hits);f.insertAdjacentHTML("beforeend",a),p.refresh(),u.style.display="block"}catch{i.error({title:"Error",message:"Failed to load images. Please try again!"})}finally{c(l,!1)}});const w=()=>{const t=document.querySelector(".gallery-item");if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}};u.addEventListener("click",async()=>{n+=1,c(l,!0);try{const t=await h(y,n),r=g(t.hits);f.insertAdjacentHTML("beforeend",r),p.refresh(),w(),t.hits.length+(n-1)*15>=m&&(u.style.display="none",i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({title:"Error",message:"Failed to load more images!"})}finally{c(l,!1)}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&!l.style.display){n+=1,c(l,!0);try{const t=await h(y,n),r=g(t.hits);f.insertAdjacentHTML("beforeend",r),p.refresh(),w(),t.hits.length+(n-1)*15>=m&&(u.style.display="none",i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({title:"Error",message:"Failed to load more images!"})}finally{c(l,!1)}}});
//# sourceMappingURL=index.js.map
