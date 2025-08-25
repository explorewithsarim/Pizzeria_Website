// const menuBtn = document.getElementById("menu-btn");
// const mobileMenu = document.getElementById("mobile-menu");

// menuBtn?.addEventListener("click", () => {
//   mobileMenu.classList.toggle("hidden");
//   mobileMenu.classList.toggle("scale-95");
//   mobileMenu.classList.toggle("opacity-0");
// });

// function logoutUser() {
  
//   if (typeof Notyf !== "undefined") {
//     new Notyf().success("Logged out successfully!");
//   } else {
//     alert("Logged out successfully!");
//   }

//   localStorage.removeItem("currentUser");

//   setTimeout(() => {
//     window.location.href = "signup.html";
//   }, 1000);
// }

// function flip() {
//   document.querySelector(".flip-card-inner").style.transform =
//     "rotateY(180deg)";
// }
// function flipAgain() {
//   document.querySelector(".flip-card-inner").style.transform = "rotateY(0deg)";
// }

// function signup() {
//   const fullName = document.getElementById("fullName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const confirmPassword = document
//     .getElementById("confirmPassword")
//     ?.value.trim();

//   let users = JSON.parse(localStorage.getItem("data")) || [];

//   if (!fullName || !email || !password) {
//     return alert("Please fill all fields!");
//   }

//   if (confirmPassword && password !== confirmPassword) {
//     return alert("Passwords do not match!");
//   }

//   if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
//     return alert("Email already exists!");
//   }

//   const userData = { fullName, email, password };
//   users.push(userData);
//   localStorage.setItem("data", JSON.stringify(users));
//   localStorage.setItem("currentUser", JSON.stringify(userData));

//   if (typeof Notyf !== "undefined") {
//     new Notyf().success("Signup successful!");
//   } else {
//     alert("Signup successful!");
//   }

//   window.location.href = "index.html";
// }

// function login(event) {
//   event.preventDefault();
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   const users = JSON.parse(localStorage.getItem("data")) || [];

//   const foundUser = users.find(
//     (u) =>
//       u.email.toLowerCase() === email.toLowerCase() && u.password === password
//   );

//   if (foundUser) {
//     localStorage.setItem("currentUser", JSON.stringify(foundUser));

//     if (typeof Notyf !== "undefined") {
//       new Notyf().success("Login successful!");
//     } else {
//       alert("Login successful!");
//     }

//     window.location.href = "index.html";
//   } else {
//     if (typeof Notyf !== "undefined") {
//       new Notyf().error("Invalid email or password!");
//     } else {
//       alert("Invalid email or password");
//     }
//   }
// }

// function displayCurrentUser() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   if (user) {
//     const nameInput = document.getElementById("fullName");
//     const emailInput = document.getElementById("email");
//     const passwordInput = document.getElementById("password");

//     if (nameInput) nameInput.value = user.fullName || "";
//     if (emailInput) emailInput.value = user.email || "";
//     if (passwordInput) {
//       passwordInput.value = user.password || "";
//       passwordInput.type = "password";
//     }
//   }
// }

// window.addEventListener("DOMContentLoaded", displayCurrentUser);

// let isEditing = false;

// function updateProfile(event) {
//   event.preventDefault();
//   const updateBtn = event.target;

//   if (!isEditing) {
//     document.querySelectorAll("#profileForm input").forEach((input) => {
//       input.removeAttribute("readonly");
//     });
//     updateBtn.textContent = "Save Profile";
//     updateBtn.classList.remove("bg-green-800");
//     updateBtn.classList.add("bg-blue-700");
//     isEditing = true;
//   } else {
//     const updatedUser = {
//       fullName: document.getElementById("fullName").value,
//       email: document.getElementById("email").value,
//       password: document.getElementById("password").value,
//     };

//     let users = JSON.parse(localStorage.getItem("data")) || [];
//     let index = users.findIndex(
//       (u) => u.email.toLowerCase() === updatedUser.email.toLowerCase()
//     );
//     if (index !== -1) users[index] = updatedUser;
//     localStorage.setItem("data", JSON.stringify(users));

//     localStorage.setItem("currentUser", JSON.stringify(updatedUser));

//     document.querySelectorAll("#profileForm input").forEach((input) => {
//       input.setAttribute("readonly", true);
//     });

//     updateBtn.textContent = "Update Profile";
//     updateBtn.classList.remove("bg-blue-700");
//     updateBtn.classList.add("bg-green-800");
//     isEditing = false;

//     if (typeof Notyf !== "undefined") {
//       new Notyf().success("Profile updated successfully!");
//     } else {
//       alert("Profile updated successfully!");
//     }
//   }
// }

let carts = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(carts));
}

function addToCart(productName, price, quantity = 1, image) {
  quantity = parseInt(quantity) || 1;
  let existing = carts.find((item) => item.name === productName);

  if (existing) {
    existing.quantity += quantity;
    if (typeof Notyf !== "undefined") {
      new Notyf().success(`${productName} quantity updated!`);
    }
  } else {
    carts.push({ name: productName, price, quantity, image });
    if (typeof Notyf !== "undefined") {
      new Notyf().success(`${productName} added to cart!`);
    }
  }

  saveCart();
  showCart();
}

function showCart() {
  let total = 0;
  let cartList = document.getElementById("cart-items");
  let totalDiv = document.getElementById("totalDiv");

  if (!cartList || !totalDiv) return;

  cartList.innerHTML = "";
  if (carts.length === 0) {
    cartList.innerHTML = `<li class="italic text-gray-500 dark:text-gray-400">Your cart is empty</li>`;
    totalDiv.innerText = "0";
    return;
  }

  carts.forEach((item) => {
    let subTotal = item.price * item.quantity;
    total += subTotal;
    cartList.innerHTML += `
      <li class="flex justify-between border-b pb-1">
        <span>${item.name} (x${item.quantity})</span>
        <span>Rs.${item.price} × ${item.quantity} = <b>Rs.${subTotal}</b></span>
      </li>
    `;
  });

  totalDiv.innerText = total;
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
  let clickTimeout;

  btn.addEventListener("click", () => {
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
      let name = btn.getAttribute("data-name");
      let price = parseFloat(btn.getAttribute("data-price"));
      let qtyInput = document.getElementById(
        btn.getAttribute("data-qty-input")
      );
      let quantity = qtyInput ? qtyInput.value : 1;

      addToCart(name, price, quantity);
    }, 250);
  });

  btn.addEventListener("dblclick", () => {
    clearTimeout(clickTimeout);
    let name = btn.getAttribute("data-name");
    let price = parseFloat(btn.getAttribute("data-price"));
    addToCart(name, price, 1);
  });
});


function placeOrder() {
  let phone = document.getElementById("phoneNumber").value.trim();
  let address = document.getElementById("deliveryAddress").value.trim();
  let checkedOrder = localStorage.getItem("cart");

  if (checkedOrder === null) {
    alert("First Add Order");
    return;
  }

  let total = document.getElementById("totalDiv").innerText;
  if (!phone || !address) {
    alert("Please enter your phone number and delivery address.");
    return;
  }

  let orderDetails = {
    cart: carts,
    total: total,
    phone: phone,
    address: address,
    payment: "Cash on Delivery",
    date: new Date().toLocaleString(),
  };

let itemsText = orderDetails.cart
  .map(
    (item, i) =>
      `${i + 1}. ${item.name}  \n   Qty: ${item.quantity} × Rs.${item.price} = Rs.${item.price * item.quantity}`
  )
  .join("%0A");

let message = `🛒 *New Order Received* %0A%0A
📞 *Phone:* ${orderDetails.phone}%0A
📍 *Address:* ${orderDetails.address}%0A
---------------------------------%0A
🍕 *Items Ordered:* %0A${itemsText}%0A
---------------------------------%0A
💰 *Total:* Rs.${orderDetails.total}%0A
💵 *Payment:* ${orderDetails.payment}%0A
📅 *Date:* ${orderDetails.date}`;

  let url = `https://wa.me/923107225999?text=${message}`;
  window.open(url, "_blank");

  let orderSummary = document.getElementById("orderSummary");
  let orderDetailsDiv = document.getElementById("orderDetails");

  orderSummary.innerHTML = `
    <p><strong>Payment Method:</strong> ${orderDetails.payment}</p>
    <p><strong>Phone:</strong> ${orderDetails.phone}</p>
    <p><strong>Address:</strong> ${orderDetails.address}</p>
    <p><strong>Date:</strong> ${orderDetails.date}</p>
    <p><strong>Total:</strong> Rs.${orderDetails.total}</p>
    <h4 class="font-semibold mt-3">Items:</h4>
    <ul class="list-disc list-inside">
      ${orderDetails.cart
        .map(
          (item) => `
        <li>${item.name} (x${item.quantity}) - Rs.${item.price} × ${
            item.quantity
          } = Rs.${item.price * item.quantity}</li>
      `
        )
        .join("")}
    </ul>
  `;

  orderDetailsDiv.classList.remove("hidden");

  if (typeof Notyf !== "undefined") {
    new Notyf().success("Your order has been placed successfully!");
  } else {
    alert("Your order has been placed successfully!");
  }

  carts = [];
  localStorage.removeItem("cart");
  showCart();
  document.getElementById("phoneNumber").value = "";
  document.getElementById("deliveryAddress").value = "";
}


function showPaymentOptions() {
  const selected = document.querySelector(
    'input[name="payment"]:checked'
  ).value;
  const cardDetails = document.getElementById("cardDetails");

  if (selected === "card") {
    cardDetails.classList.remove("hidden");
  } else {
    cardDetails.classList.add("hidden");
  }
}
