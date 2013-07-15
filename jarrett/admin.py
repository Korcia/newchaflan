from django.contrib import admin

from jarrett.models import Noche


class NocheAdmin(admin.ModelAdmin):
    #class Media:
    #    js = ('/static/js/tiny_mce/tiny_mce.js', '/static/js/textareas.js')
    prepopulated_fields = { 'slug': ['titulo_evento'] }

admin.site.register(Noche, NocheAdmin)
