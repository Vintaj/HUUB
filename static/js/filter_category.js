$(".filter_link").on("click", async function (event) {
  const gallery_products_display_div = $(".product-list_item");
  let one_url = this.getAttribute("href").replace("/", "");
  let url = window.location.href + one_url;
  let csrfToken = getCookie("csrftoken");
  event.preventDefault();
  let filter_category = this.getAttribute("href")
    .replace("/", "")
    .replace("/", "");
  let data = {
    filter_category: filter_category,
    csrfmiddlewaretoken: csrfToken,
  };
  // let h1_main = document.getElementById('main').querySelector('h1').textContent;
  gallery_products_display_div.empty();
  // Очистка
  $.ajax({
    type: "POST",
    data: data,
    url: url,
    success: function (response) {
      let getData = JSON.parse(response);
      for (let i = 0; i < getData.length; i++) {
        $(".product-list_item").append(
          $(
            `<div class='item card col-md-3' style="margin: 10px; padding: 15px;" >` +
              '<a class="product_item_slug" href="' +
              "/" +
              getData[String(i)].pk +
              "/" +
              getData[String(i)].fields.slug +
              '">' +
              '<img class="product_item_image" src="' +
              "/media/" +
              getData[String(i)].fields.image +
              '" href=""' +
              "</a>" +
              '<a class="product_item_name" href="' +
              "/" +
              getData[String(i)].pk +
              "/" +
              getData[String(i)].fields.slug +
              '">' +
              getData[String(i)].fields.name +
              "</a>" +
              "<p>" +
              getData[String(i)].fields.price +
              "</p>" +
              "</div>"
          )
        );
      }

      //JSON.parse ожидает строку в параметре. Чтобы решить эту проблему, вам нужно привести в порядок свой JSON-объект.
    },
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    },
  });
});

$(".addToCart").on("click", function (event) {
  let url = "http://127.0.0.1:8000/cart/add/6/";
  let csrfToken = getCookie("csrftoken");
  // let cart_id_href = window.location.href;
  // let cart_id = cart_id_href["22"];
  let e = document.getElementById("id_quantity");
  let quantity = e.value;
  if ($(".cart_info").length > 0) {
    $(".cart_info").empty();
  }
  // let addToCartData = ('6');
  // Данные которые мы передаем и наша форма хочет получить
  event.preventDefault();
  let data = {
    quantity: quantity,
    csrfmiddlewaretoken: csrfToken,
  };
  $.ajax({
    type: "POST",
    data: data,
    url: url,
    success: function (response) {
      let getData = JSON.parse(response);
      $(".cart_info").append(
        "<p>" + getData.quantity + "</p>" + "<p>" + "$" + getData.price + "</p>"
      );
      //JSON.parse ожидает строку в параметре. Чтобы решить эту проблему, вам нужно привести в порядок свой JSON-объект.
    },
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    },
  });
});

// функция для получения куки
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
