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
            `<div class='item product_list-item_item'>` +
              '<div class="product_item_list">' +
              '<a class="product_item_slug" href="' +
              "/" +
              getData[String(i)].pk +
              "/" +
              getData[String(i)].fields.slug +
              '">' +
              "<img height='80px' class='product_item_image' src='" +
              "/media/" +
              getData[String(i)].fields.image +
              "' href=''" +
              "</a>" +
              "</div>" +
              // ------
              "<div class='frstItem_productListName product_item_list'>" +
              '<a class="product_item_name" href="' +
              "/" +
              getData[String(i)].pk +
              "/" +
              getData[String(i)].fields.slug +
              '">' +
              getData[String(i)].fields.name +
              "</a>" +
              "<p>" +
              getData[String(i)].fields.description +
              "</p>" +
              "</div>" +
              "<div class='secondItem_productListName product_item_list'>" +
              "<p style='height: 25px;''>" + "$" +
              getData[String(i)].fields.price +
              "</p>" +
              "</div>" +
              "<div class='product_item_list'>" +
              "<a class='goOverInfoProduct' href='{{ product.get_absolute_url }}'>" +
              "Подробнее" +
              "</a>" +
              "</div>" +
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
  let cart_id_href = window.location.href;
  let cart_id = cart_id_href["22"];
  let e = document.getElementById("id_quantity");
  let cart_price = document.getElementById("cart_price").innerText;
  cart_price = cart_price.replace("$", "");
  console.log(cart_price);
  let quantity = e.value;
  $(".shoping-cart_info").empty();
  // let addToCartData = ('6');
  // Данные которые мы передаем и наша форма хочет получить
  event.preventDefault();
  let data = {
    cart_id: cart_id,
    quantity: quantity,
    cart_price: cart_price,
    csrfmiddlewaretoken: csrfToken,
  };
  $.ajax({
    type: "POST",
    data: data,
    url: url,
    success: function (response) {
      let getData = JSON.parse(response);
      $(".shoping-cart_info").append(
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
