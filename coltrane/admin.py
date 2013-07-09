from django.contrib import admin

from coltrane.models import Noticia


class NoticiaAdmin(admin.ModelAdmin):
    #class Media:
    #    js = ('/static/js/tiny_mce/tiny_mce.js', '/static/js/textareas.js')
    prepopulated_fields = { 'slug': ['titulo'] }

admin.site.register(Noticia, NoticiaAdmin)
