from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator

# ----- STAFF RELATED TABLES -----




class Staff(models.Model):

    empStatusChoices = [
        ('Active', 'Still working'),
        ('Resigned', 'No longer working')
    ]

    staff_id = models.CharField(max_length=5, primary_key=True)
    emp_type_id = models.ForeignKey('EmpType', on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    # f_name = models.CharField(max_length=20, null=False)
    # l_name = models.CharField(max_length=20, null=False)
    # phone = models.PositiveBigIntegerField(validators=[MinValueValidator(0), MaxValueValidator(9999999999)], null=True, blank=True)
    # phone = models.CharField(max_length=10, null=True, blank=True) # Here's a fix for the API int type issue
    # address = models.CharField(max_length=50, null=True, blank=True)
    # email = models.EmailField(max_length=250, null=False)
    emp_status = models.CharField(max_length=50,
                                  choices=empStatusChoices,
                                  default='Active')
    
    # def __str__(self) -> str:
    #     return self.l_name

    # def __int__(self) -> int:
    #     return self.phone   

class EmpType(models.Model):
    emp_type_id = models.CharField(max_length=5, primary_key=True)
    role_desc = models.CharField(max_length=30)

class Checklist(models.Model):
    # checklist_id = models.PositiveIntegerField(primary_key=True, default=1)
    checklist_id = models.CharField(max_length=5, primary_key=True, default=1) # Here's a fix for the API int type issue
    emp_type_id = models.ForeignKey('EmpType', on_delete=models.CASCADE)
    list_item = models.CharField(max_length=1500)
    file_txt = models.ImageField(null=True, blank=True) # I need to figure out how to update a txt.file for this part

# ----- EXTINGUISHER MAINTENANCE RELATED TABLES -----

class MaintStaff(models.Model):
    maint_id = models.CharField(max_length=10, primary_key=True)
    # staff_id = models.ForeignKey('Staff', on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)    # Possibly change back to staff_id
    emp_type_id = models.ForeignKey('EmpType', on_delete=models.CASCADE)
    box_maint_id = models.ForeignKey('BoxMaint', on_delete=models.CASCADE)
    ext_maint_id = models.ForeignKey('ExtMaint', on_delete=models.CASCADE)

class BoxMaint(models.Model):
    box_maint_id = models.CharField(max_length=10, primary_key=True)
    disc_date_time = models.DateTimeField(auto_now_add=True, null=False) 
    fix_date_time = models.DateField(auto_now=True, null=True, blank=True)
    # fix_by = models.CharField(max_length=5, null=True, blank=True) # Need to add the username to this field
    fix_by = models.ForeignKey(User, on_delete=models.CASCADE)   
    notes = models.TextField(max_length=500, null=True, blank=True)

class ExtMaint(models.Model):
    ext_maint_id = models.CharField(max_length=10, primary_key=True)
    fail_date_time = models.DateTimeField(auto_now_add=True)
    replace_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)
    replace_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)

# ----- EXTINGUISHER TABLES -----

class Extinguisher(models.Model):
    # boxSizes = [
    #     ('5', 'Small box'),
    #     ('10', 'Large box')
    # ]
    
    ext_id = models.CharField(max_length=10, primary_key=True)
    # tag_id = models.ForeignKey('Ext_Tag', on_delete=models.CASCADE)
    # floor = models.PositiveIntegerField()
    floor = models.CharField(max_length=3) # Here's a fix for the API int type issue
    box_id = models.ForeignKey('Box', on_delete=models.CASCADE)
    type_id = models.ForeignKey('ExtType', on_delete=models.CASCADE)
    size_ID = models.ForeignKey('BoxSizes', on_delete=models.CASCADE)    # This is to create a new table for the box size
    # size = models.CharField(max_length=2,
    #                         choices=boxSizes,
    #                         default=None)  # May need to fix this, not sure if 'None" is right
    status_id = models.ForeignKey('ExtStatus', on_delete=models.CASCADE)

class ExtModel(models.Model):
    ext_model_id = models.CharField(max_length=10, primary_key=True)
    box_id = models.ForeignKey('Box', on_delete=models.CASCADE)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)

class BoxSizes(models.Model):
    boxSizes = [
        ('5', 'Small box'),
        ('10', 'Large box')
    ]

    # size_ID = models.PositiveSmallIntegerField(primary_key=True) 
    size_ID = models.CharField(max_length=2, primary_key=True) # Here's a fix for the API int type issue
    size = models.CharField(max_length=2,
                            choices=boxSizes,
                            default=None)  # May need to fix this, not sure if 'None" is right

# class Ext_Tag(models.Model):

#     # boxSizes = [
#     #     ('5', 'Small box'),
#     #     ('10', 'Large box')
#     # ]

#     tag_id = models.CharField(max_length=10, primary_key=True)
#     type_id = models.ForeignKey('Ext_Type', on_delete=models.CASCADE)
#     size = models.CharField(max_length=2,
#                             choices=boxSizes,
#                             default=None)  # May need to fix this, not sure if 'None" is right
#     status_id = models.ForeignKey('Ext_Status', on_delete=models.CASCADE)

class ExtStatus(models.Model):
    # status_id = models.PositiveSmallIntegerField(primary_key=True)
    status_id = models.CharField(max_length=5, primary_key=True) # Here's a fix for the API int type issue
    # staff_id = models.ForeignKey('Staff', on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    data_time = models.DateTimeField(auto_now=True, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    insp_status = models.ForeignKey('InspStatus', on_delete=models.CASCADE)
    
class InspStatus(models.Model):

    descriptions = [
        ('Pass', 'Extinguisher has 100% Pass'),
        ('Fail', 'Extinguisher did not 100% Pass')
    ]
    
    # insp_status = models.PositiveSmallIntegerField(primary_key=True)
    insp_status = models.CharField(max_length=4, primary_key=True) # Here's a fix for the API int type issue
    stat_desc = models.CharField(max_length=4,
                                 choices=descriptions,
                                 default=None)

class ExtType(models.Model):
    type_id = models.CharField(max_length=15, primary_key=True)
    type_desc = models.CharField(max_length=30)

# ----- EXTINGUISHER BOX RELATED TABLES -----

class Box(models.Model):
    # box_id = models.PositiveSmallIntegerField(primary_key=True)
    # box_num = models.PositiveSmallIntegerField()
    # box_size = models.PositiveSmallIntegerField()
    box_id = models.CharField(max_length=10, primary_key=True)
    box_num = models.CharField(max_length=10)
    box_size = models.CharField(max_length=10)
    # location = models.PositiveSmallIntegerField()   # Likely going to delete this for the x/y axis bit
    status_id = models.ForeignKey('ExtStatus', on_delete=models.CASCADE)
    build_id = models.ForeignKey('Building', on_delete=models.CASCADE)
    # x_axis = models.PositiveIntegerField()
    # x_axis = models.PositiveIntegerField()
    x_axis = models.CharField(max_length=10)
    y_axis = models.CharField(max_length=10)
    
class BoxStatus(models.Model):
    # status_id = models.PositiveSmallIntegerField(primary_key=True)
    status_id = models.CharField(max_length=5, primary_key=True)
    log_by = models.ForeignKey(User, on_delete=models.CASCADE)
    disc_date_time = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    # comp_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    comp_by = models.CharField(max_length=100, null=True, blank=True)
    comp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)


class Building(models.Model):
    build_id = models.CharField(max_length=10, primary_key=True)
    build_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    # num_floors = models.PositiveSmallIntegerField()
    num_floors = models.CharField(max_length=5)
    # num_ext = models.PositiveSmallIntegerField()
    num_ext = models.CharField(max_length=5)
    # num_boxes = models.PositiveSmallIntegerFieldeld()
    num_boxes = models.CharField(max_length=5)
    layout_id = models.ForeignKey('FloorPlan', on_delete=models.CASCADE)

class FloorPlan(models.Model):
    layout_id = models.CharField(max_length=10, primary_key=True)
    # floor = models.PositiveSmallIntegerField()
    floor = models.CharField(max_length=5)
    file_txt = models.ImageField() # I need to figure out how to update a txt.file for this part

# ----- WAREHOUSE OPS AND TECHNICIAN RELATED TABLES -----

class WareOps(models.Model):
    w_ext_id = models.CharField(max_length=5, primary_key=True)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)
    rec_by = models.ForeignKey(User, on_delete=models.CASCADE)
    rec_date_time = models.DateTimeField(auto_now_add=True)
    # insp_s_id = models.PositiveSmallIntegerField(null=True, blank=True)
    insp_s_id = models.CharField(max_length=10, null=True, blank=True)
    # insp_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    insp_by = models.CharField(max_length=100, null=True, blank=True)
    insp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)

class EOLExt(models.Model):
    # eol_id = models.PositiveSmallIntegerField(primary_key=True)
    eol_id = models.CharField(max_length=10, primary_key=True)
    w_ext_id = models.ForeignKey('WareOps', on_delete=models.CASCADE)
    eol_date_time = models.DateTimeField(auto_now=True)

# Had to change the name of this. Migrating gave errors due to 2 tables with the same name
class WInspStatus(models.Model):  
    
    warehouseInspectionStatus = [
        ('Ready', 'Extinguisher ready for deployment'),
        ('Needs Inspection', 'Extinguisher waiting for inspection'),
        ('Send to EOL', 'Extinguisher ready for decommission'),
        ('Decommissioned', 'Extinguisher was terminated')
    ]

    # insp_s_id = models.PositiveSmallIntegerField(primary_key=True)
    insp_s_id = models.CharField(max_length=10, primary_key=True)
    desc = models.CharField(max_length=150,
                            choices=warehouseInspectionStatus,
                            default='Needs Inspection')

class ReadyExt(models.Model):
    ready_id = models.CharField(max_length=5, primary_key=True)
    w_ext_id = models.ForeignKey('WareOps', on_delete=models.CASCADE)
    ready_date_time = models.DateTimeField(auto_now=True)

# ----- USER LOGIN RELATED TABLES -----

# class Login(models.Model):
#     login_id = models.CharField(max_length=30, primary_key=True)
#     # login_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     # username = models.CharField(max_length=30, unique=True)
#     username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     password = models.CharField(max_length=30)
#     email = models.EmailField(max_length=150)
#     staff_id = models.ForeignKey(User, on_delete=models.CASCADE)
#     # auth_id = models.ForeignKey('Auth', on_delete=models.CASCADE)
#     c_date = models.DateTimeField(auto_now_add=True)

    

# class Auth(models.Model):
#     auth_id = models.CharField(max_length=5, primary_key=True)
#     auth_type = models.CharField(max_length=20)

class CLog(models.Model):
    # c_log_id = models.PositiveSmallIntegerField(primary_key=True)
    c_log_id = models.CharField(max_length=10, primary_key=True)
    # login_id = models.ForeignKey('Login', on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    t_changed = models.CharField(max_length=30) # Table changed
    i_changed = models.CharField(max_length=30) # Row changed
    change_date_time = models.DateTimeField(auto_now_add=True)


# TESTING PURPOSES
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()