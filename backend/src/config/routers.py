import random

class ReadWriteRouter:
    def __init__(self):
        self.read_databases = ['replica1', 'replica2']

    def db_for_read(self, model, **hints):
        return random.choice(self.read_databases)

    def db_for_write(self, model, **hints):
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        db_list = ['default', 'replica1', 'replica2']
        if obj1._state.db in db_list and obj2._state.db in db_list:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        return db == 'default'
