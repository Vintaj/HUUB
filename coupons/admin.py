from django.contrib import admin
from .models import Coupon


class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'valid_to', 'discount', 'active']
    list_filter = ['active', 'valid_to']
    search_fields = ['code']
admin.site.register(Coupon, CouponAdmin)
