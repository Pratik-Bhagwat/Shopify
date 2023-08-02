const itemsDiv = document.querySelector(".items");
localStorage.setItem("cartItemsDiv", JSON.stringify(itemsDiv));

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsDiv = document.querySelector(".items");
  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    itemDiv.innerHTML = `
          <div class="item-content">
                  <img
                    src="${item.img}"
                    alt="img"
                  />
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

  const checkListPart2Div = document.querySelector(".cl-part2");
  const totalAmountSpan = document.querySelector(".totalAmount");
  const checkOutBtn = document.querySelector("#checkoutBtn");
  let totalAmount = 0;

  function calculateTotalPrice(price) {
    let amount = price.split("$");
    totalAmount += Number(amount[1]);
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
  totalAmountSpan.textContent = `$${totalAmount}`;

  checkOutBtn.addEventListener("click", (event) => {
    const options = {
      key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 82 * 100, //check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shopify",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#122620",
      },
      image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
      handler: function () {
        // run a function when your payment is successfull
        location.href = "../shopPage/shop.html";
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

    const razorPay = new Razorpay(options);
    razorPay.open();
    event.preventDefault();
  });
});
