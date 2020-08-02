$(".blur_service_item-a").on("click", function (event) {
  // Анимация появления контента при нажатии

  event.preventDefault();
  let el = $(this).next(".blur_service_item-p");
  let el_item_a = $(".blur_service_item-a");
  if (el.is(":visible")) {
    el.hide(500);
  } else {
    el.show(500);
  }
});

$(".a-search-form").on("click", function (event) {
  // Анимация появления контента при нажатии

  event.preventDefault();
  let el = $(this).next(".form-header");
  if (el.is(":visible")) {
    el.hide(500);
    el.style.left = 0 + "px";
  } else {
    el.show(500);
    el.style.left = 50 + "px";
  }
});
