document.addEventListener("DOMContentLoaded", () => {
  // Constants and Arrays
  const colorsArray = ["red", "blue", "black", "green", "white"];
  const sizeArray = ["S", "M", "L", "XL"];
  const productArray = [];
  const cartItemsDiv = JSON.parse(localStorage.getItem("cartItemsDiv"));
  const shopifyLogo = document.querySelector(".nav-left");

  shopifyLogo.addEventListener("click", () => {
    location.href = "../shopPage/";
  });

  // Fetch Functions
  async function getAllData() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      data.forEach((obj, idx) => {
        obj.color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        obj.size = sizeArray[Math.floor(Math.random() * sizeArray.length)];
        productArray[idx] = obj;
      });
      renderData(productArray);
    } catch (error) {
      console.log(error);
    }
  }
  getAllData();

  // HTML Element References
  const itemsDiv = document.querySelector(".items");
  const searchInput = document.querySelector("#search");
  const allBtn = document.querySelector("#allBtn");
  const mensBtn = document.querySelector("#mensBtn");
  const womensBtn = document.querySelector("#womensBtn");
  const jewelleryBtn = document.querySelector("#jewelleryBtn");
  const electronicsBtn = document.querySelector("#electronicsBtn");
  const redColor = document.querySelector("#red");
  const blueColor = document.querySelector("#blue");
  const greenColor = document.querySelector("#green");
  const blackColor = document.querySelector("#black");
  const whiteColor = document.querySelector("#white");
  const sSize = document.querySelector("#size-s");
  const mSize = document.querySelector("#size-m");
  const lSize = document.querySelector("#size-l");
  const xlSize = document.querySelector("#size-xl");
  const rating = document.querySelector("#rating");
  const zeroToTwentyfive = document.querySelector("#range-0-25");
  const twentyfiveToFifty = document.querySelector("#range-25-50");
  const fiftyToHundred = document.querySelector("#range-50-100");
  const hundredToOnwards = document.querySelector("#range-100-onwards");
  const applyFilterBtn = document.querySelector("#applyFilterBtn");
  const addToCartBtn = document.querySelector("#addToCartBtn");

  // Variables to Track Filters
  let isRedClicked = false;
  let isBlueClicked = false;
  let isGreenClicked = false;
  let isBlackClicked = false;
  let isWhiteClicked = false;
  let isSClicked = false;
  let isMClicked = false;
  let isLClicked = false;
  let isXLClicked = false;
  let isRatingSelected = false;
  let isZeroToTwentyfiveClicked = false;
  let isTwentyfiveToFiftyClicked = false;
  let isFiftyToHundredClicked = false;
  let isHundredToOnwardsClicked = false;

  // Event Listener for Search Button
  searchInput.addEventListener("input", () => toFetchAllTheValidSearchItems());

  // Search Function
  function toFetchAllTheValidSearchItems() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
      // If the search input is empty, show all products
      renderData(productArray);
    } else {
      // Filter products based on the search term
      const filteredProducts = productArray.filter((item) =>
        item.title.toLowerCase().startsWith(searchTerm)
      );
      itemsDiv.innerHTML = "";
      renderData(filteredProducts);
    }
  }

  // Event Listeners for Filter Buttons
  allBtn.addEventListener("click", () => toFetchAllItems());
  mensBtn.addEventListener("click", () => toFetchMensItems());
  womensBtn.addEventListener("click", () => toFetchWomensItems());
  jewelleryBtn.addEventListener("click", () => toFetchJewelleryItems());
  electronicsBtn.addEventListener("click", () => toFetchElectronicsItems());

  // Filter Functions
  function toFetchAllItems() {
    itemsDiv.innerHTML = "";
    renderData(productArray);
  }

  function toFetchMensItems() {
    const mensProduct = productArray.filter(
      (item) => item.category === "men's clothing"
    );
    itemsDiv.innerHTML = "";
    renderData(mensProduct);
  }

  function toFetchWomensItems() {
    const womensProduct = productArray.filter(
      (item) => item.category === "women's clothing"
    );
    itemsDiv.innerHTML = "";
    renderData(womensProduct);
  }

  function toFetchJewelleryItems() {
    const jewelleryProduct = productArray.filter(
      (item) => item.category === "Jewellery"
    );
    itemsDiv.innerHTML = "";
    renderData(jewelleryProduct);
  }

  function toFetchElectronicsItems() {
    const electronicsProduct = productArray.filter(
      (item) => item.category === "Electronics"
    );
    itemsDiv.innerHTML = "";
    renderData(electronicsProduct);
  }

  // Event Listeners for Filter Buttons (Colors)
  for (let colorBtn of [
    redColor,
    blueColor,
    greenColor,
    blackColor,
    whiteColor,
  ]) {
    colorBtn.addEventListener("change", (event) => {
      const colorValue = event.target.value;
      if (colorBtn.checked) {
        isRedClicked = colorValue === "red" ? true : isRedClicked;
        isBlueClicked = colorValue === "blue" ? true : isBlueClicked;
        isGreenClicked = colorValue === "green" ? true : isGreenClicked;
        isBlackClicked = colorValue === "black" ? true : isBlackClicked;
        isWhiteClicked = colorValue === "white" ? true : isWhiteClicked;
      } else {
        isRedClicked = colorValue === "red" ? false : isRedClicked;
        isBlueClicked = colorValue === "blue" ? false : isBlueClicked;
        isGreenClicked = colorValue === "green" ? false : isGreenClicked;
        isBlackClicked = colorValue === "black" ? false : isBlackClicked;
        isWhiteClicked = colorValue === "white" ? false : isWhiteClicked;
      }
    });
  }

  // Event Listeners for Filter Buttons (Sizes)
  for (let size of [sSize, mSize, lSize, xlSize]) {
    size.addEventListener("change", (event) => {
      const sizeValue = event.target.value;
      if (size.checked) {
        isSClicked = sizeValue === "S" ? true : isSClicked;
        isMClicked = sizeValue === "M" ? true : isMClicked;
        isLClicked = sizeValue === "L" ? true : isLClicked;
        isXLClicked = sizeValue === "XL" ? true : isXLClicked;
      } else {
        isSClicked = sizeValue === "S" ? false : isSClicked;
        isMClicked = sizeValue === "M" ? false : isMClicked;
        isLClicked = sizeValue === "L" ? false : isLClicked;
        isXLClicked = sizeValue === "XL" ? false : isXLClicked;
      }
    });
  }

  // Event Listener for Filter Button (Rating)
  rating.addEventListener("change", (event) => {
    ratingValue = event.target.value;
    isRatingSelected = true;
  });

  // Event Listeners for Filter Buttons (Price Range)
  for (let price of [
    zeroToTwentyfive,
    twentyfiveToFifty,
    fiftyToHundred,
    hundredToOnwards,
  ]) {
    price.addEventListener("change", (event) => {
      const priceValue = event.target.value;
      if (price.checked) {
        isZeroToTwentyfiveClicked =
          priceValue === "0-25" ? true : isZeroToTwentyfiveClicked;
        isTwentyfiveToFiftyClicked =
          priceValue === "25-50" ? true : isTwentyfiveToFiftyClicked;
        isFiftyToHundredClicked =
          priceValue === "50-100" ? true : isFiftyToHundredClicked;
        isHundredToOnwardsClicked =
          priceValue === "100-onwards" ? true : isHundredToOnwardsClicked;
      } else {
        isZeroToTwentyfiveClicked =
          priceValue === "0-25" ? false : isZeroToTwentyfiveClicked;
        isTwentyfiveToFiftyClicked =
          priceValue === "25-50" ? false : isTwentyfiveToFiftyClicked;
        isFiftyToHundredClicked =
          priceValue === "50-100" ? false : isFiftyToHundredClicked;
        isHundredToOnwardsClicked =
          priceValue === "100-onwards" ? false : isHundredToOnwardsClicked;
      }
    });
  }

  // Event Listener for Apply Filter Button
  applyFilterBtn.addEventListener("click", applyAllTheSelectedFilters);

  // Apply All Selected Filters Function
  function applyAllTheSelectedFilters() {
    let filteredItemsArray = productArray;

    //(color filters)
    if (isRedClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.color === "red";
      });
    }
    if (isBlueClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.color === "blue";
      });
    }
    if (isGreenClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.color === "green";
      });
    }
    if (isBlackClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.color === "black";
      });
    }
    if (isWhiteClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.color === "white";
      });
    }

    // (size filters)
    if (isSClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.size === "S";
      });
    }
    if (isMClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.size === "M";
      });
    }
    if (isLClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.size === "L";
      });
    }
    if (isXLClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.size === "XL";
      });
    }

    if (isRatingSelected) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        const itemRating = parseFloat(item.rating.rate);
        return itemRating >= ratingValue && itemRating <= ratingValue + 0.9;
      });
    }

    // (price range filters)
    if (isZeroToTwentyfiveClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.price >= 0 && item.price <= 25;
      });
    }
    if (isTwentyfiveToFiftyClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.price >= 25 && item.price <= 50;
      });
    }
    if (isFiftyToHundredClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.price >= 50 && item.price <= 100;
      });
    }
    if (isHundredToOnwardsClicked) {
      filteredItemsArray = filteredItemsArray.filter((item) => {
        return item.price >= 100 && item.price <= 10000;
      });
    }

    itemsDiv.innerHTML = "";
    renderData(filteredItemsArray);
  }

  // Event Listener for add to cart button
  itemsDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("addToCartBtn")) {
      addToCartFunctionality(event);
    }
  });

  // Add to cart Function (modified)
  function addToCartFunctionality(event) {
    const addToCartBtnParentDiv = event.target.parentElement;

    // Get the necessary product information
    const productImage = addToCartBtnParentDiv
      .querySelector(".item-img")
      .getAttribute("src");
    const productTitle =
      addToCartBtnParentDiv.querySelector(".title p").textContent;
    const productPrice = addToCartBtnParentDiv.querySelector(
      ".price-size span:first-child"
    ).textContent;
    const productSize = addToCartBtnParentDiv.querySelector(
      ".price-size span:last-child"
    ).textContent;
    const productColor =
      addToCartBtnParentDiv.querySelector(".colors span").textContent;
    const productRating = addToCartBtnParentDiv
      .querySelector(".ratings")
      .textContent.split(":")[1]
      .trim();

    // Create an object to represent the cart item
    const cartItem = {
      img: productImage,
      title: productTitle,
      price: productPrice,
      size: productSize,
      color: productColor,
      rating: productRating,
    };

    // Save the cart item to localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Render Data Function
  function renderData(data) {
    data.map((obj) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.innerHTML = `<div class="item-content">
      <img src="${obj.image}" alt="img" class="item-img" />
      <div class="item-info">
        <div class="title">
          <p>${obj.title}</p>
        </div>
        <div class="price-size">
          <span>${obj.price}</span>
          <span>${obj.size}</span>
        </div>
        <p class="colors">Colors : <span>${obj.color}</span></p>
        <p class="ratings">Rating : ${obj.rating.rate}</p>
      </div>
      <button class="addToCartBtn">Add to Cart</button>
    </div>`;
      itemsDiv.appendChild(itemDiv);
    });
  }
});
