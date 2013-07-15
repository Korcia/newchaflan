from django.conf.urls import patterns, url
from django.views.generic.dates import ArchiveIndexView, YearArchiveView, MonthArchiveView, DayArchiveView, DateDetailView

from jarrett.models import Noche
from datetime import date
import datetime

urlpatterns = patterns('',
    url(r'^$',
        ArchiveIndexView.as_view(
            date_field = 'fecha_evento',
            paginate_by = 9,
            allow_empty = True,
            queryset = Noche.live.exclude(fecha_evento__lt=date.today()).reverse(),
            allow_future = True
        ),
        name='noche_archivo'
    ),
    url(r'^(?P<year>\d{4})/$',
        YearArchiveView.as_view(
            date_field = 'fecha_evento',
            paginate_by= 9,
            allow_empty= True,
            queryset= Noche.live.all()),
        name='noche_year'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/$',
        MonthArchiveView.as_view(
            date_field= 'fecha_evento',
            month_format = '%m',
            paginate_by= 9,
            allow_empty= True,
            queryset= Noche.live.exclude(fecha_evento__lt=date.today()).reverse(),
            allow_future = True),
        name='noche_mes'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$',
        DayArchiveView.as_view(
            date_field= 'fecha_evento',
            month_format = '%m',
            paginate_by= 5,
            allow_empty= True,
            queryset= Noche.live.all()),
        name='noche_dia'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$',
        DateDetailView.as_view(
            slug_field = 'slug',
            date_field= 'fecha_evento',
            month_format = '%m',
            allow_future = True,
            queryset= Noche.live.all()),
        name='noche-detalle'),    
)
