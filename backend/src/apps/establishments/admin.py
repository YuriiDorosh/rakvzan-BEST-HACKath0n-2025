from django.contrib import admin

from src.apps.establishments.models import (
    Comment,
    CommentImage,
    CommentLike,
    Establishment,
    EstablishmentPhoto,
)


class EstablishmentAdmin(admin.ModelAdmin):
    pass


class EstablishmentPhotoAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


class CommentImageAdmin(admin.ModelAdmin):
    pass


class CommentLikeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Establishment, EstablishmentAdmin)
admin.site.register(EstablishmentPhoto, EstablishmentPhotoAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentImage, CommentImageAdmin)
admin.site.register(CommentLike, CommentLikeAdmin)
