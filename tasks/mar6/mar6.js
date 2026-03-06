const products = [
 {id:1,name:"Organic Cotton T-Shirt",price:99,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
 {id:2,name:"Minimalist Watch",price:999,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-watch/c/z/9/1-334gdtg-timewear-men-original-imahjqru6pjuz4rz.jpeg?q=70"},
 {id:3,name:"Parker Pen",price:299,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/pen/l/p/q/-original-imahezgtzgcdcdwt.jpeg?q=70"},
 {id:4,name:"Notebook",price:49,image:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400"},
 {id:5,name:"Wireless Earbuds",price:599,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/b/c/-original-imahhfepsgsh5myf.jpeg?q=70"},
 {id:6,name:"Bamboo Toothbrush",price:199,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/toothbrush/q/u/n/bamboo-toothbrush-pack-of-4-4-bambio-extra-soft-original-imahh3m2prszrjhg.jpeg?q=70"},
 {id:7,name:"Bicycle",price:2999,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/cycle/w/s/x/hulk-20t-bmx-double-disc-fat-tyres-premium-quality-semi-original-imaha69yfnnc76eg.jpeg?q=70"},
 {id:8,name:"Carrom Board",price:199,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/board/s/z/f/carrom-board-small-size-with-glossy-finish-1-3-hoc-original-imahd7xecjw6gxx8.jpeg?q=70"},
 {id:9,name:"Silencer",price:1999,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/bike-exhaust-system/0/5/g/250-exhaust-middle-muffler-bend-pipe-a4s-original-imahjyfatazdhbu8.jpeg?q=70"},
 {id:10,name:"Toy Gun",price:199,image:"https://rukminim2.flixcart.com/image/612/612/xif0q/toy-weapon/y/e/2/musical-army-style-toy-for-kids-with-music-lights-laser-guns-original-imah5g2ravuz425j.jpeg?q=70"}
];

let cart=[];

const $=id=>document.getElementById(id);

function renderProducts(){
 $("products").innerHTML=products.map(p=>`
 <div class="product-card">
   <img src="${p.image}">
   <div class="product-info">
     <h3>${p.name}</h3>
     <div class="price">₹${p.price}</div>
     <button onclick="addToCart(${p.id})">Add</button>
   </div>
 </div>`).join("");
}

function addToCart(id){
 let item=cart.find(i=>i.id===id);
 item?item.quantity++:cart.push({...products.find(p=>p.id===id),quantity:1});
 updateCartCount();
}

function updateCartCount(){
 $("cart-count").textContent=cart.reduce((s,i)=>s+i.quantity,0);
}

function renderCart(){
 $("cart-items").innerHTML=cart.length?cart.map(i=>`
 <div class="cart-item">
   <img src="${i.image}">
   <div>${i.name}<br>₹${i.price} × ${i.quantity}</div>
   <div>₹${i.price*i.quantity}</div>
 </div>`).join(""):"Cart Empty";

 $("cart-total").textContent="₹"+cart.reduce((s,i)=>s+i.price*i.quantity,0);
}

function renderAdminProducts(){
 $("admin-products").innerHTML=products.map(p=>`
 <tr>
  <td><img class="admin-img" src="${p.image}"></td>
  <td>${p.name}</td>
  <td>₹${p.price}</td>
  <td>${Math.floor(Math.random()*70+15)}</td>
  <td style="color:green">Active</td>
 </tr>`).join("");
}

document.addEventListener("DOMContentLoaded",()=>{
 renderProducts();
 renderAdminProducts();

 const modal=$("cart-modal");

 $("open-cart").onclick=()=>{renderCart();modal.style.display="flex";}
 $("close-cart").onclick=()=>modal.style.display="none";

 modal.onclick=e=>e.target===modal&&(modal.style.display="none");

 $("toggle-view").onclick=()=>{
  let shop=$("shop-page"),admin=$("admin-page");
  if(shop.style.display!=="none"){
   shop.style.display="none";admin.style.display="flex";
  }else{
   shop.style.display="block";admin.style.display="none";
  }
 };
});