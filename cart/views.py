from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from shop.models import Product
from .cart import Cart
from .forms import CartAddProductForm
from coupons.forms import CouponApplyForm
from django.http import HttpResponse
import json
import pdb
from django.core import serializers


@require_POST
def cart_add(request, product_id):
    # Добавление продуктов в корзину
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    # Чтобы не ссылатся на request.POST который выдает нам ошибку мы сделали form_data который
    # принемает лиш айди
    form = CartAddProductForm(request.POST)
    # Отправка идет в форму(данные отправки), и форма принимая их выдает значение
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product, quantity=cd["quantity"], update_quantity=cd["update"])
        data = {
            "quantity": cart.__len__(),
            "price": str(cart.get_total_price()),
        }
        # pdb.set_trace()
        return HttpResponse(json.dumps(data))
    # print(form.errors)


def cart_remove(request, product_id):
    # Удаление из корзины
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect("cart:cart_detail")


def cart_detail(request):
    # форма с подробным описанием товаров
    cart = Cart(request)
    for item in cart:
        item["update_quantity_form"] = CartAddProductForm(
            initial={"quantity": item["quantity"], "update": True}
        )
    # применение купона в форму купона
    coupon_apply_form = CouponApplyForm()
    return render(
        request,
        "cart/detail.html",
        {"cart": cart, "coupon_apply_form": coupon_apply_form},
    )

