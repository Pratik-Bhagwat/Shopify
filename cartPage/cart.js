// Wait for the DOM to be loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart items from local storage or initialize an empty array
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Retrieve the cart items container from the HTML
  const cartItemsDiv = document.querySelector(".items");

  // Loop through each item in the cart and create corresponding HTML elements
  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.innerHTML = `
      <div class="item-content">
        <img src="${item.img}" alt="img" />
        <div class="item-info">
          <div class="title">
            <p>${item.title}</p>
          </div>
          <div class="price-size">
            <span>${item.price}</span>
            <span>${item.size}</span>
          </div>
          <p class="colors">Colors : <span>${item.color}</span></p>
          <p class="ratings">Rating : ${item.rating}</p>
        </div>
      </div>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  // Calculate and display the total price of all items in the cart
  const checkListPart2Div = document.querySelector(".cl-part2");
  const totalAmountSpan = document.querySelector(".totalAmount");
  const checkOutBtn = document.querySelector("#checkoutBtn");
  let totalAmount = 0;

  function calculateTotalPrice(price) {
    totalAmount += Number(price);
  }

  for (let item of cartItems) {
    calculateTotalPrice(item.price);

    const itemNamePriceDiv = document.createElement("div");
    itemNamePriceDiv.classList.add("itemName-price");

    itemNamePriceDiv.innerHTML = `
      <span class="itemName">${item.title}</span>
      <span class="itemPrice">${item.price}</span>
    `;

    checkListPart2Div.insertAdjacentElement("afterbegin", itemNamePriceDiv);
  }

  totalAmountSpan.textContent = `${totalAmount}`;

  // Calculate the final amount to show in Razorpay payment
  let finalAmountToShow = totalAmount * 100;

  // Event listener for the checkout button
  checkOutBtn.addEventListener("click", (event) => {
    // Configure the options for Razorpay payment
    const options = {
      key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
      amount: finalAmountToShow, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shopify",
      description: "This is your order",
      theme: {
        color: "#122620",
      },
      image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
      handler: function () {
        // run a function when your payment is successful
        // Clear the cartItems from local storage
        localStorage.removeItem("cartItems");
        location.href = "../shopPage/"; // Redirect to the shop page after successful payment
      },
      options: {
        checkout: {
          method: {
            netbanking: 0,
            card: 0,
            upi: 1,
            wallet: 0,
          },
        },
      },
    };

    // Create a new Razorpay instance and open the payment window
    const razorPay = new Razorpay(options);
    razorPay.open();
    event.preventDefault();
  });
});

// Event listener for Shopify logo click to redirect to the shop page
const shopifyLogo = document.querySelector(".nav-left");
shopifyLogo.addEventListener("click", () => {
  location.href = "../shopPage/";
});

// Save the cart items container to local storage
const itemsDiv = document.querySelector(".items");
localStorage.setItem("cartItemsDiv", JSON.stringify(itemsDiv));
