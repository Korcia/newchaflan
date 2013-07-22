#coding=UTF-8
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name="inicio.html")),
    (r'^inicio/$', TemplateView.as_view(template_name="inicio.html")),
    (r'^en/home/$', TemplateView.as_view(template_name="home.html")),
    (r'^reservas/$', TemplateView.as_view(template_name="reservas.html")),
    (r'^en/booking/$', TemplateView.as_view(template_name="booking.html")),
    (r'^alojamiento/$', TemplateView.as_view(template_name="alojamiento.html")),
    (r'^en/rooms/$', TemplateView.as_view(template_name="rooms.html")),
    (r'^experiencias/$', TemplateView.as_view(template_name="experiencias.html")),
    (r'^en/experiences/$', TemplateView.as_view(template_name="experiences.html")),
    (r'^servicios/$', TemplateView.as_view(template_name="servicios.html")),
    (r'^en/services/$', TemplateView.as_view(template_name="services.html")),
    (r'^atico/$', TemplateView.as_view(template_name="atico.html")),
    (r'^en/attic/$', TemplateView.as_view(template_name="attic.html")),
    (r'^restaurante/$', TemplateView.as_view(template_name="restaurante.html")),
    (r'^en/restaurant/$', TemplateView.as_view(template_name="restaurant.html")),
    (r'^cocktail/$', TemplateView.as_view(template_name="cocktail.html")),
    (r'^en/cocktail/$', TemplateView.as_view(template_name="cocktail-en.html")),
    (r'^lounge/$', TemplateView.as_view(template_name="lounge.html")),
    (r'^en/lounge/$', TemplateView.as_view(template_name="lounge-en.html")),
    (r'^biografia/$', TemplateView.as_view(template_name="biografia.html")),
    (r'^en/biography/$', TemplateView.as_view(template_name="biography.html")),
    (r'^consultoria/$', TemplateView.as_view(template_name="consultoria.html")),
    (r'^en/consulting/$', TemplateView.as_view(template_name="consulting.html")),
    (r'^formacion/$', TemplateView.as_view(template_name="formacion.html")),
    (r'^en/experience/$', TemplateView.as_view(template_name="experience.html")),
    (r'^catering/$', TemplateView.as_view(template_name="catering.html")),
    (r'^en/catering/$', TemplateView.as_view(template_name="catering-en.html")),
    (r'^contacto/$', TemplateView.as_view(template_name="contacto.html")),
    (r'^en/contact/$', TemplateView.as_view(template_name="contact.html")),
    (r'^bolsa/$', TemplateView.as_view(template_name="bolsa.html")),
    (r'^en/jobs/$', TemplateView.as_view(template_name="jobs.html")),
    (r'^lacarta/$', TemplateView.as_view(template_name="lacarta.html")),
    (r'^en/menu/$', TemplateView.as_view(template_name="lacarta-en.html")),
    (r'^tinymce/', include('tinymce.urls')),
    (r'^noticias/', include('coltrane.urls.noticias')),
    (r'^las-noches-de-el-chaflan/', include('jarrett.urls.noches')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, }),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
)
