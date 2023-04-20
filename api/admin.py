from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *

# Register your models here.
class EmpTypeInline(admin.StackedInline):
    model = EmpType
    can_delete = False
    verbose_name_plural = "EmpType"

class StaffInline(admin.StackedInline):
    model = Staff
    can_delete = False
    verbose_name_plural = "Staff"
    inlines = [EmpTypeInline]

class UserAdmin(BaseUserAdmin):
    inlines = [StaffInline]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Staff)
admin.site.register(EmpType)
admin.site.register(Checklist)
admin.site.register(MaintStaff)
admin.site.register(BoxMaint)
admin.site.register(ExtMaint)
admin.site.register(Extinguisher)
admin.site.register(ExtModel)
admin.site.register(BoxSizes)
admin.site.register(ExtStatus)
admin.site.register(InspStatus)
admin.site.register(ExtType)
admin.site.register(Box)
admin.site.register(BoxStatus)
admin.site.register(Building)
admin.site.register(FloorPlan)
admin.site.register(WareOps)
admin.site.register(EOLExt)
admin.site.register(WInspStatus)
admin.site.register(ReadyExt)
# admin.site.register(Login)
# admin.site.register(Auth)
admin.site.register(CLog)
admin.site.register(Note)