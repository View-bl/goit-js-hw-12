import{a as $,S as v,i}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const w="https://pixabay.com/api/",E="47417091-7b1b728bfc28f8d5b77701890",g=async(t,r=1,s=15)=>{const a=`${w}?key=${E}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;return(await $.get(a)).data},h=t=>t.map(({webformatURL:r,largeImageURL:s,tags:a,likes:e,views:o,comments:n,downloads:L})=>`
      <a href="${s}" class="gallery-item" title="${a}">
          <img src="${r}" alt="${a}" loading="lazy">
          <div class="info">
              <p><b>Likes</b> ${e}</p>
              <p><b>Views</b> ${o}</p>
              <p><b>Comments</b> ${n}</p>
              <p><b>Downloads</b> ${L}</p>
          </div>
      </a>
  `).join(""),P=t=>{t.innerHTML=""},c=(t,r)=>{t.style.display=r?"block":"none"},p=document.querySelector("#search-form"),f=document.querySelector(".gallery"),d=document.querySelector(".loader"),u=document.querySelector("#load-more");let b=new v(".gallery a"),l=1,m="",y=0;p.addEventListener("submit",async t=>{t.preventDefault();const r=p.elements.searchQuery.value.trim();if(!r){i.error({title:"Error",message:"Please enter a search term!"});return}m=r,l=1,y=0,P(f),c(d,!0),u.style.display="none";try{const s=await g(m,l);if(y=s.totalHits,s.hits.length===0){i.warning({title:"No Results",message:"No images found. Try another keyword!"});return}const a=h(s.hits);f.insertAdjacentHTML("beforeend",a),b.refresh(),s.hits.length===15&&(u.style.display="block")}catch{i.error({title:"Error",message:"Failed to load images. Please try again!"})}finally{c(d,!1)}});u.addEventListener("click",async()=>{l+=1,c(d,!0);try{const t=await g(m,l),r=h(t.hits);f.insertAdjacentHTML("beforeend",r),b.refresh(),(t.hits.length<15||t.hits.length+(l-1)*15>=y)&&(u.style.display="none",i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({title:"Error",message:"Failed to load more images!"})}finally{c(d,!1)}});
//# sourceMappingURL=index.js.map
