#coding=UTF-8
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name="inicio.html")),
    (r'^inicio/$', TemplateView.as_view(template_name="inicio.html")),
    (r'^reservas/$', TemplateView.as_view(template_name="reservas.html")),
    (r'^alojamiento/$', TemplateView.as_view(template_name="alojamiento.html")),
    (r'^experiencias/$', TemplateView.as_view(template_name="experiencias.html")),
    (r'^servicios/$', TemplateView.as_view(template_name="servicios.html")),
    (r'^atico/$', TemplateView.as_view(template_name="atico.html")),
    (r'^restaurante/$', TemplateView.as_view(template_name="restaurante.html")),
    (r'^cocktail/$', TemplateView.as_view(template_name="cocktail.html")),
    (r'^lounge/$', TemplateView.as_view(template_name="lounge.html")),
    (r'^biografia/$', TemplateView.as_view(template_name="biografia.html")),
    (r'^consultoria/$', TemplateView.as_view(template_name="consultoria.html")),
    (r'^formacion/$', TemplateView.as_view(template_name="formacion.html")),
    (r'^catering/$', TemplateView.as_view(template_name="catering.html")),
    (r'^contacto/$', TemplateView.as_view(template_name="contacto.html")),
    (r'^bolsa/$', TemplateView.as_view(template_name="bolsa.html")),
    (r'^lacarta/$', TemplateView.as_view(template_name="lacarta.html")),
    (r'^tinymce/', include('tinymce.urls')),
    (r'^noticias/', include('coltrane.urls.noticias')),
    url(r'^admin/', include(admin.site.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
)
