from django.conf.urls.defaults import patterns, url
from django.views.generic.dates import ArchiveIndexView, YearArchiveView, MonthArchiveView, DayArchiveView, DateDetailView

from coltrane.models import Noticia


urlpatterns = patterns('',
    url(r'^$',
        ArchiveIndexView.as_view(
            date_field = 'fecha_publicacion',
            paginate_by = 5,
            allow_empty = True,
            queryset = Noticia.live.all()
        ),
        name='noticia_archivo'
    ),
    url(r'^(?P<year>\d{4})/$',
        YearArchiveView.as_view(
            date_field = 'fecha_publicacion',
            paginate_by= 5,
            allow_empty= True,
            queryset= Noticia.live.all()),
        name='noticia_year'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/$',
        MonthArchiveView.as_view(
            date_field= 'fecha_publicacion',
            month_format = '%m',
            paginate_by= 5,
            allow_empty= True,
            queryset= Noticia.live.all()),
        name='noticia_mes'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$',
        DayArchiveView.as_view(
            date_field= 'fecha_publicacion',
            month_format = '%m',
            paginate_by= 5,
            allow_empty= True,
            queryset= Noticia.live.all()),
        name='noticia_dia'),
    url(r'^(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/(?P<slug>[-\w]+)/$',
        DateDetailView.as_view(
            slug_field = 'slug',
            date_field= 'fecha_publicacion',
            month_format = '%m',
            #model= Noticia),
            queryset= Noticia.live.all()),
        name='noticia-detalle'),    
)
