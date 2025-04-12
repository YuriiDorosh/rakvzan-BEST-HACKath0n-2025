from grappelli.dashboard import Dashboard
from grappelli.dashboard.modules import AppList, ModelList


class CustomIndexDashboard(Dashboard):
    def init_with_context(self, context):
        self.children.append(
            AppList(
                title="Administration",
                models=["django.contrib.*"],
            ),
        )
        self.children.append(
            ModelList(
                title="My Models",
                models=["src.apps.*"],
            ),
        )
