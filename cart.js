let count = 0;
let checkOutDiv = document.getElementById('checkout');

let cart_data = JSON.parse(localStorage.getItem("cart"));
if (localStorage.getItem("cart") == null) {

  localStorage.setItem("cart", JSON.stringify([]));   //we need cart where we can store 

}
var quantity = 0;
var quantity_Inner = 1;
function addtoCart(p) {
  let cart_data = JSON.parse(localStorage.getItem('cart'));
  // for(key in cart_data ){
  //   if(cart_data[key].name === p.name){

  //     alert("Already in cart!!")
  //     return;
  //   }
  // }
  cart_data.push(p);
  localStorage.setItem("cart", JSON.stringify(cart_data));

  //   function Refresh() {
  //     window.parent.location = window.parent.location.href;
  //    }
  // Refresh();
  showInCart(p);

}
// checkCart();

// function removeCartItem(price_total, price) {
//   quantity_Inner--;
//   if (quantity_Inner < 1)
//     return;
//   console.log(price_total)
//   var prices = Number(price)
//   var c = document.getElementById('num_inc').textContent = quantity_Inner;
//   var d = document.getElementById('prc').textContent = parseInt(quantity_Inner * price_total)
  // checkCart();
// }
// checkCart();
function increase(product, s2) {
  // console.log(product)
  console.log('anny2')
  var freq='freq';
  if( product[freq]) {
      product[freq]++
    }
  else
  product[freq] = 1;
  // var p2 = document.getElementsByClassName(`amt${product.pid}`).textContent = product.freq;;//number of items
  var p2 = document.getElementById(`amt${product.pid}`).textContent = product.freq;
  console.log(product.freq)
  console.log(p2)
  // p2.textContent = product.freq;

  var price2 = 'price2';
  if( product[price2]){
      product[price2]=product.freq*product.price;
  }
  else {
   product[price2]=product.price;
  }
  var p3 =document.getElementById(`tot${product.pid}`);
  p3.textContent = product.price2;

}

function decrease(product){
  console.log(product)
  var freq='freq';
 if( product[freq]){
     product[freq]-- 
     
      if(product.freq==0){
          var r = document.getElementById(product.id);
          r.remove();
        }
     
 }
 else
 product[freq] = 1;
 var p2 = document.getElementById(product.name)
 p2.innerText= product.freq;

 var price2 = 'price2';
 if( product[price2]){
     product[price2]=product.freq*product.price;
 }
 else {
  product[price2]=product.price;
 }
 var p3 = document.getElementById(product.price)
 p3.innerText = product.price2;
}

document.getElementById("checkout").addEventListener("click", function (e) {
  //  console.log(e.target);
  var num = document.getElementById('num_inc');

});
function createCart(product) {
  // console.log(quantity_Inner)


  let li = document.createElement('li');
  let d1 = document.createElement('div');
  d1.setAttribute('class', 'cartItem');

  let d2 = document.createElement('div');
  d2.setAttribute('class', 'cartItemDetails');

  let s1 = document.createElement('span');
  s1.setAttribute('class', 'category');

  let d3 = document.createElement('div');

  let p1 = document.createElement('p');
  p1.setAttribute('class', 'cartItemName');
  p1.textContent = product.name;

  let b1 = document.createElement('br');

  d3.append(p1, b1);
  d2.append(s1, d3);

  let d4 = document.createElement('div');
  d4.setAttribute('class', 'cartItemCount');

  let btn1 = document.createElement('button');
  btn1.innerText = '-';
  // btn1.className=product.pid;
  
  btn1.addEventListener('click',function() {    ////  DECREASE BUTTON FUNCTION
    decrease(product);
   
});
     
  let s2 = document.createElement('span');    //Number of items
  s2.innerText = quantity_Inner;
  s2.id=`amt${product.pid}`;

  let btn2 = document.createElement('button');
  btn2.innerText = '+';
  // btn2.className=product.pid;

  btn2.addEventListener('click',function() {  /// INCREASE BUTTON FUNCTION
    increase(product,s2);
       
});

  d4.append(btn1, s2, btn2);

  let d5 = document.createElement('div');
  d5.setAttribute('class', 'cartItemAmount');

  let s3 = document.createElement('span');     //price of items
  // s3.id=product.price;
  s3.innerText = product.price;
  
  s3.id= `tot${product.pid}`


  d5.append(s3);

  d1.append(d2, d4, d5);
  li.append(d1);

  return li;
}



function showInCart(p) {
  // console.log('anny1')
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart == null || cart.length == 0) {
    checkOutDiv.innerHTML = `<h2  style="
      font-size: 20px;color: rgb(51, 51, 51); font-family: 'Mulish', sans-serif;">Empty Cart</h2>
          <div class="emptyCart">
            <img
              id="emptyCartImage"
              src="./images/emptyCart.svg"
              alt="empty cart"
            style="width:270px;margin:20px 2px 2px 20px"/>
            <p style="width:270px;margin:auto;text-align:center; color: rgb(153, 153, 153);
            font-weight: 500;">Empty Cart is a sign of an empty stomach.</p>
          </div>`;
  } else {
    let totalCartAmount = 0;
    //  var div = document.getElementById("allCartItems");
    //  div.parentNode.removeChild(div);
    let allCartItems = document.createElement('div');
    allCartItems.id = 'allCartItems';

    let h2 = document.createElement('h2');

    h2.innerHTML = `Cart: `;  

    let totalItems = document.createElement('span');
    totalItems.id = 'totalItems';
    totalItems.innerHTML = `${cart.length} Item`;
    h2.append(totalItems);

    let cardList = document.createElement('ul');
    cardList.id = 'cardList';

    // for (let i = 0; i < cart.length; i++) {
    //   let li = createCartItem(cart[i],quantity_Inner);
    //   totalCartAmount += cart[i].price;
    //   cardList.append(li);

    // }
    // localStorage.setItem('cart', JSON.stringify([]))
    let li = createCart(p);    /// cart box
    cardList.append(li);



    let subTotal = document.createElement('div');
    subTotal.id = 'subtotal';
    subTotal.innerHTML = `
            <div class="subtotalTitle">
            <h3>SubTotal</h3>
            <p>Extra charges may apply</p>
            </div>
            <div id="subtotalPrice">₹ ${totalCartAmount}</div>`;

    let subtotalButton = document.createElement('button');
    subtotalButton.id = 'subtotalButton';
    subtotalButton.innerText = 'Checkout';
    subtotalButton.onclick = function () {
      window.location.href = '../pages/checkOut.html';
    };
     
    allCartItems.append(h2, cardList, subTotal, subtotalButton);
    // allCartItems.append(cardList);
    checkOutDiv.appendChild(allCartItems);

    localStorage.setItem('totalCartAmount', JSON.stringify(totalCartAmount));
  }
}
start 





end


