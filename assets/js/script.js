const list_of_coins = [
  "bitcoin",
  "ethereum",
  "ripple",
  "cardano",
  "solana",
  "dogecoin",
  "polkadot",
];
var dict_result = {};
var xhttp = [];

createObjects();
requestToApi();

document.querySelector("#reload").addEventListener("click", function (e) {
  dict_result = {};
  xhttp = [];
  createObjects();
  requestToApi();
});

function createObjects() {
  for (var i = 0; i < list_of_coins.length; i++) {
    xhttp[i] = new XMLHttpRequest();
  }

  for (var i = 0; i < list_of_coins.length; i++) {
    xhttp[i].onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = JSON.parse(this.responseText);
        console.log(resp.market_data.current_price.usd);
        dict_result[resp.id] = `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div class="ms-2 me-auto">
                      <div class="fw-bold">${resp.name}</div>
                      ${resp.id}
                  </div>
                  <p class="price mb-0">${resp.market_data.current_price.usd}$</p>
              </li>
          `;
        paint();
      }
    };
  }
}

function requestToApi() {
  document.querySelector("#list-coins ol").innerHTML = "";
  for (var i = 0; i < list_of_coins.length; i++) {
    xhttp[i].open(
      "GET",
      `https://api.coingecko.com/api/v3/coins/${list_of_coins[i]}`,
      true
    );
    xhttp[i].send();
  }
}

function paint() {
  var errors = 0;
  document.querySelector("#list-coins ol").innerHTML = "";
  list_of_coins.forEach(function (e) {
    list_of_coins.forEach(function (e) {
      if (dict_result[e] === undefined) {
        errors++;
      }
    });

    if (errors == 0) {
      document.querySelector("#list-coins ol").innerHTML += dict_result[e];
    }
  });
}
