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

class LiveNocheManager(models.Manager):
    def get_query_set(self):
        return super(LiveNocheManager, self).get_query_set().filter(estado=self.model.LIVE_STATUS)

class Noche(models.Model):
    LIVE_STATUS = 1
    DRAFT_STATUS = 2
    STATUS_CHOICES = (
        (LIVE_STATUS, 'Publico'),
        (DRAFT_STATUS, 'Draft'),
    )

    titulo_evento = models.CharField(max_length=250,
                             help_text="Máximo 250 caracteres.")
    titulo_foto = models.CharField(max_length=25,
                             help_text="Máximo 25 caracteres incluidos espacios.")
    contenido = HTMLField()
    fecha_evento = models.DateTimeField(default=datetime.datetime.now)
    autor = models.ForeignKey(User, related_name='autores_noches')
    meta_keywords = models.CharField(blank=True, max_length=255,
                                     help_text='Conjunto de keywords SEO separados por comas para los keywords meta tag')
    meta_descripcion = models.CharField(blank=True, max_length=255,
                                        help_text='Contenido para la descripción del meta tag')
    imagen = models.ImageField(blank=True, upload_to='noches/grande')
    thumbnail = models.ImageField(blank=True, upload_to='noches/thumbnails')
    imagen_texto = models.CharField(blank=True, max_length=200)
    slug = models.SlugField(unique_for_date='fecha_evento',
                            help_text="Valor sugerido generado automaticamente por el título. Debe ser único para la fecha de publicación.")
    estado = models.IntegerField(choices=STATUS_CHOICES, default=LIVE_STATUS,
                                 help_text="Sólo noches con estado Publico serán mostradas.")

    objects = models.Manager()
    live = LiveNocheManager()

    class Meta:
        ordering = ['fecha_evento']
        verbose_name_plural = "Noches"

    def __unicode__(self):
        return self.titulo_evento

    def crear_slug_unico(self):
        if not len(self.slug.strip()):
            year = self.fecha_evento.strftime("%Y")
            month = self.fecha_evento.strftime("%b").lower()
            day = self.fecha_evento.strftime("%d")
            #self.slug = titulo + '-' + day + '-' + month +'-' + year
            self.slug = titulo_evento
        
    def save(self, force_insert=False, force_update=False):
        self.crear_slug_unico()
        super(Noche, self).save(force_insert, force_update)

    def get_absolute_url(self):
        year = str(self.fecha_evento.strftime("%Y"))
        month = str(self.fecha_evento.strftime("%m"))
        day = str(self.fecha_evento.strftime("%d"))
        slug = str(self.slug)
        return reverse('noche-detalle', args= (year, month, day, slug))

