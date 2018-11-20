from django.conf.urls import url


from .views import (ProductsList, ProductsUpdate)

urlpatterns = [
    url(r'^products/$', ProductsList.as_view(), name="products"),
    url(r'^products/(?P<pk>\d+)/edit$', ProductsUpdate.as_view(), name="products_update"),
]
