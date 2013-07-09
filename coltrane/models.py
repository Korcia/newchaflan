#coding=UTF-8
import datetime

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from tinymce.models import HTMLField
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse

MARKUP_HTML = 'h'
MARKUP_MARKDOWN = 'm'
MARKUP_REST = 'r'
MARKUP_TEXTILE = 't'
MARKUP_OPTIONS = getattr(settings, 'ARTICLE_MARKUP_OPTIONS', (
        (MARKUP_HTML, _('HTML/Plain Text')),
        (MARKUP_MARKDOWN, _('Markdown')),
        (MARKUP_REST, _('ReStructured Text')),
        (MARKUP_TEXTILE, _('Textile'))
    ))
MARKUP_DEFAULT = getattr(settings, 'ARTICLE_MARKUP_DEFAULT', MARKUP_HTML)

class LiveNoticiaManager(models.Manager):
    def get_query_set(self):
        return super(LiveNoticiaManager, self).get_query_set().filter(estado=self.model.LIVE_STATUS)

class Noticia(models.Model):
    LIVE_STATUS = 1
    DRAFT_STATUS = 2
    STATUS_CHOICES = (
        (LIVE_STATUS, 'Publico'),
        (DRAFT_STATUS, 'Draft'),
    )

    titulo = models.CharField(max_length=250,
                             help_text="Máximo 250 caracteres.")
    contenido = HTMLField()
    extracto = models.TextField(blank=True,
                               help_text="Un resumen corto de la noticia. Opcional.")    
    fecha_publicacion = models.DateTimeField(default=datetime.datetime.now)
    autor = models.ForeignKey(User, related_name='autores')
    meta_keywords = models.CharField(blank=True, max_length=255,
                                     help_text='Conjunto de keywords SEO separados por comas para los keywords meta tag')
    meta_descripcion = models.CharField(blank=True, max_length=255,
                                        help_text='Contenido para la descripción del meta tag')
    imagen = models.ImageField(blank=True, upload_to='static/images/noticias/grande')
    thumbnail = models.ImageField(blank=True, upload_to='static/images/noticias/thumbnails')
    imagen_texto = models.CharField(blank=True, max_length=200)
    slug = models.SlugField(unique_for_date='fecha_publicacion',
                            help_text="Valor sugerido generado automaticamente por el título. Debe ser único para la fecha de publicación.")
    estado = models.IntegerField(choices=STATUS_CHOICES, default=LIVE_STATUS,
                                 help_text="Sólo noticias con estado Publico serán mostradas.")

    objects = models.Manager()
    live = LiveNoticiaManager()

    class Meta:
        ordering = ['-fecha_publicacion']
        verbose_name_plural = "Noticias"

    def __unicode__(self):
        return self.titulo

    def crear_slug_unico(self):
        if not len(self.slug.strip()):
            year = self.fecha_publicacion.strftime("%Y")
            month = self.fecha_publicacion.strftime("%b").lower()
            day = self.fecha_publicacion.strftime("%d")
            #self.slug = titulo + '-' + day + '-' + month +'-' + year
            self.slug = titulo
        
    def save(self, force_insert=False, force_update=False):
        self.crear_slug_unico()
        super(Noticia, self).save(force_insert, force_update)

    def get_absolute_url(self):
        year = str(self.fecha_publicacion.strftime("%Y"))
        month = str(self.fecha_publicacion.strftime("%m"))
        day = str(self.fecha_publicacion.strftime("%d"))
        slug = str(self.slug)
        return reverse('noticia-detalle', args= (year, month, day, slug))

