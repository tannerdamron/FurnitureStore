function getFurniture() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", "https://it771mq5n2.execute-api.us-west-2.amazonaws.com/production/furniture/", true);
    request.send();
  });
}

$(document).ready(function () {
  let searchValue = document.getElementById("searchValue");
  let promise = getFurniture();
  promise.then(function(response) {
    let delivery = "Delivery not available"
    let jsonData = JSON.parse(response);
    for (let i = 0; i < jsonData.body.data.length; i++) {
      if (jsonData.body.data[i].deliverable === true) {
        delivery = "Delivery available";
      }
      $('#furnitureList').append(
        $('<p>').html(`<img src=${jsonData.body.data[i].imageUrl}></img>`),
        $('<h2 class="col-md-2">').text(jsonData.body.data[i].name),
        $('<div class="col-md-2">').text(jsonData.body.data[i].description),
        $('<div class="col-md-2">').text(delivery),
        $('<div class="col-md-2">').text(`Price: $${jsonData.body.data[i].cost}`),
      );
    }
  }, function (error) {
    console.log(error);
  });
});