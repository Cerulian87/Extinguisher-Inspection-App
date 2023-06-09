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
    emp_status = models.CharField(max_length=50,
                                  choices=empStatusChoices,
                                  default='Active')

    def __str__(self) -> str:
        return f"{self.username}, {self.emp_type_id}"
 

class EmpType(models.Model):
    emp_type_id = models.CharField(max_length=5, primary_key=True)
    role_desc = models.CharField(max_length=30)

    def __str__(self):
        return self.role_desc

class InspectorAssignments(models.Model):
    username = models.CharField(max_length=100)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.ext_id} : {self.username}"

class TechAssignments(models.Model):

    warehouseStatuses = [
        ('Pending', 'Has not been inspected yet'),
        ('Pass', 'Passed Warehouse inspection'),
        ('Fail', 'Send to End of Life')
    ]

    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)
    status_id = models.ForeignKey('ExtStatus', on_delete=models.CASCADE)
    model_number = models.CharField(max_length=50, null=True, blank=True)
    warehouse_status = models.CharField(max_length=50,
                                  choices=warehouseStatuses,
                                  default='Pending')

    def __str__(self):
        return f"{self.ext_id}"
    

class Checklist(models.Model):


    checklist_id = models.CharField(max_length=5, primary_key=True, default=1) # Here's a fix for the API int type issue
    emp_type_id = models.ForeignKey('EmpType', on_delete=models.CASCADE)
    list_item = models.CharField(max_length=1500)
    file_txt = models.ImageField(upload_to='images/', null=True, blank=True) 

    def __str__(self):
        return self.list_item

# ----- EXTINGUISHER MAINTENANCE RELATED TABLES -----

class MaintStaff(models.Model):
    maint_id = models.CharField(max_length=10, primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)    
    emp_type_id = models.ForeignKey('EmpType', on_delete=models.CASCADE)
    box_maint_id = models.ForeignKey('BoxMaint', on_delete=models.CASCADE)
    ext_maint_id = models.ForeignKey('ExtMaint', on_delete=models.CASCADE)

class BoxMaint(models.Model):
    box_maint_id = models.CharField(max_length=10, primary_key=True)
    disc_date_time = models.DateTimeField(auto_now_add=True, null=False) 
    fix_date_time = models.DateField(auto_now=True, null=True, blank=True)
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
    
    ext_id = models.CharField(max_length=10, primary_key=True)
    floor = models.CharField(max_length=3) # Here's a fix for the API int type issue
    box_id = models.ForeignKey('Box', on_delete=models.CASCADE)
    type_id = models.ForeignKey('ExtType', on_delete=models.CASCADE)
    size_ID = models.ForeignKey('BoxSizes', on_delete=models.CASCADE)    # This is to create a new table for the box size
    status_id = models.ForeignKey('ExtStatus', on_delete=models.CASCADE)

    def __str__(self):
        return f"Extinguisher: {self.ext_id} | {self.box_id}"
    
class ExtModel(models.Model):
    ext_model_id = models.CharField(max_length=10, primary_key=True)
    box_id = models.ForeignKey('Box', on_delete=models.CASCADE)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)

class BoxSizes(models.Model):
    boxSizes = [
        ('5', 'Small box'),
        ('10', 'Large box')
    ]

    size_ID = models.CharField(max_length=2, primary_key=True) # Here's a fix for the API int type issue
    size = models.CharField(max_length=2,
                            choices=boxSizes,
                            default=None)  

    def __str__(self):
        return self.size


class ExtStatus(models.Model):
    status_id = models.CharField(max_length=5, primary_key=True) # Here's a fix for the API int type issue
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    data_time = models.DateTimeField(auto_now=True, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    insp_status = models.ForeignKey('InspStatus', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.insp_status}"
    
class InspStatus(models.Model):

    descriptions = [
        ('Pass', 'Extinguisher has 100% Pass'),
        ('Fail', 'Extinguisher did not 100% Pass')
    ]
    
    insp_status = models.CharField(max_length=4, primary_key=True) # Here's a fix for the API int type issue
    stat_desc = models.CharField(max_length=4,
                                 choices=descriptions,
                                 default=None)
    
    def __str__(self):
        return self.insp_status

class ExtType(models.Model):
    type_id = models.CharField(max_length=15, primary_key=True)
    type_desc = models.CharField(max_length=30)

    def __str__(self):
        return self.type_desc

# ----- EXTINGUISHER BOX RELATED TABLES -----

class Box(models.Model):
    box_id = models.CharField(max_length=10, primary_key=True)
    box_num = models.CharField(max_length=10)
    box_size = models.CharField(max_length=10)
    status_id = models.ForeignKey('ExtStatus', on_delete=models.CASCADE)
    build_id = models.ForeignKey('Building', on_delete=models.CASCADE)
    x_axis = models.CharField(max_length=10)
    y_axis = models.CharField(max_length=10)

    def __str__(self):
        return f"Box: {self.box_id}"

class BoxStatus(models.Model):
    status_id = models.CharField(max_length=5, primary_key=True)
    log_by = models.ForeignKey(User, on_delete=models.CASCADE)
    disc_date_time = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    comp_by = models.CharField(max_length=100, null=True, blank=True)
    comp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)


class Building(models.Model):
    build_id = models.CharField(max_length=10, primary_key=True)
    build_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    num_floors = models.CharField(max_length=5)
    num_ext = models.CharField(max_length=5)
    num_boxes = models.CharField(max_length=5)
    layout_id = models.ForeignKey('FloorPlan', on_delete=models.CASCADE)

    def __str__(self):
        return self.build_name

class FloorPlan(models.Model):
    layout_id = models.CharField(max_length=10, primary_key=True)
    floor = models.CharField(max_length=5)
    file_txt = models.ImageField() 

    def __str__(self):
        return self.floor


# ----- WAREHOUSE OPS AND TECHNICIAN RELATED TABLES -----

class WareOps(models.Model):
    w_ext_id = models.CharField(max_length=5, primary_key=True)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)
    rec_by = models.ForeignKey(User, on_delete=models.CASCADE)
    rec_date_time = models.DateTimeField(auto_now_add=True)
    insp_s_id = models.CharField(max_length=10, null=True, blank=True)
    insp_by = models.CharField(max_length=100, null=True, blank=True)
    insp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)

class EOLExt(models.Model):
    eol_id = models.CharField(max_length=10, primary_key=True)
    w_ext_id = models.ForeignKey('WareOps', on_delete=models.CASCADE)
    eol_date_time = models.DateTimeField(auto_now=True)

class WInspStatus(models.Model):  
    
    warehouseInspectionStatus = [
        ('Ready', 'Extinguisher ready for deployment'),
        ('Needs Inspection', 'Extinguisher waiting for inspection'),
        ('Send to EOL', 'Extinguisher ready for decommission'),
        ('Decommissioned', 'Extinguisher was terminated')
    ]

    insp_s_id = models.CharField(max_length=10, primary_key=True)
    desc = models.CharField(max_length=150,
                            choices=warehouseInspectionStatus,
                            default='Needs Inspection')

class ReadyExt(models.Model):
    ready_id = models.CharField(max_length=5, primary_key=True)
    w_ext_id = models.ForeignKey('WareOps', on_delete=models.CASCADE)
    ready_date_time = models.DateTimeField(auto_now=True)

# ----- USER LOGIN RELATED TABLES -----


class CLog(models.Model):
    c_log_id = models.CharField(max_length=10, primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    t_changed = models.CharField(max_length=30) # Table changed
    i_changed = models.CharField(max_length=30) # Row changed
    change_date_time = models.DateTimeField(auto_now_add=True)


# TESTING PURPOSES
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()