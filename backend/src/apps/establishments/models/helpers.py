from django.db import models


class EsteblishmentPhoto(models.Model):
    image = models.ImageField(upload_to="photos/")

    def __str__(self):
        return f"Photo {self.id}"


class Comment(models.Model):
    content = models.TextField()
    establishment = models.ForeignKey("Establishment", on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment {self.id} on {self.establishment.name}"
