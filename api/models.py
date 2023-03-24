from django.db import models


# ----- STAFF RELATED TABLES -----

class Staff(models.Model):

    empStatusChoices = [
        ('Active', 'Still working'),
        ('Resigned', 'No longer working')
    ]

    staff_id = models.CharField(max_length=5, primary_key=True)
    emp_type_id = models.ForeignKey('Emp_Type', on_delete=models.CASCADE)
    f_name = models.CharField(max_length=20, null=False)
    l_name = models.CharField(max_length=20, null=False)
    phone = models.PositiveIntegerField(null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=250, null=False)
    emp_status = models.CharField(max_length=50,
                                  choices=empStatusChoices,
                                  default='Active')

class Emp_Type(models.Model):
    emp_type_id = models.CharField(max_length=5, primary_key=True)
    role_desc = models.CharField(max_length=30)

class Checklist(models.Model):
    checklist_id = models.PositiveIntegerField(primary_key=True, default=1)
    emp_type_id = models.ForeignKey('Emp_Type', on_delete=models.CASCADE)
    list_item = models.CharField(max_length=150)

# ----- EXTINGUISHER MAINTENANCE RELATED TABLES -----

class Maint_Staff(models.Model):
    maint_id = models.CharField(max_length=10, primary_key=True)
    staff_id = models.ForeignKey('Staff', on_delete=models.CASCADE)
    emp_type_id = models.ForeignKey('Emp_Type', on_delete=models.CASCADE)
    box_maint_id = models.ForeignKey('Box_Maint', on_delete=models.CASCADE)
    ext_maint_id = models.ForeignKey('Ext_Maint', on_delete=models.CASCADE)

class Box_Maint(models.Model):
    box_maint_id = models.CharField(max_length=10, primary_key=True)
    disc_date_time = models.DateTimeField(auto_now_add=True, null=False) 
    fix_date_time = models.DateField(auto_now=True, null=True, blank=True)
    fix_by = models.CharField(max_length=5, null=True, blank=True)   
    notes = models.TextField(max_length=500, null=True, blank=True)

class Ext_Maint(models.Model):
    ext_maint_id = models.CharField(max_length=10, primary_key=True)
    fail_date_time = models.DateTimeField(auto_now_add=True)
    replace_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)
    replace_by = models.CharField(max_length=5, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)

# ----- EXTINGUISHER TABLES -----

class Extinguisher(models.Model):
    ext_id = models.CharField(max_length=10, primary_key=True)
    tag_id = models.ForeignKey('Ext_Tag', on_delete=models.CASCADE)
    floor = models.PositiveIntegerField()
    box_id = models.ForeignKey('Box', on_delete=models.CASCADE)
    
class Ext_Tag(models.Model):

    boxSizes = [
        ('5', 'Small box'),
        ('10', 'Large box')
    ]

    tag_id = models.CharField(max_length=10, primary_key=True)
    type_id = models.ForeignKey('Ext_Type', on_delete=models.CASCADE)
    size = models.CharField(max_length=2,
                            choices=boxSizes,
                            default=None)  # May need to fix this, not sure if 'None" is right
    status_id = models.ForeignKey('Ext_Status', on_delete=models.CASCADE)

class Ext_Status(models.Model):
    status_id = models.PositiveSmallIntegerField(primary_key=True)
    staff_id = models.ForeignKey('Staff', on_delete=models.CASCADE)
    data_time = models.DateTimeField(auto_now=True, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    insp_status = models.ForeignKey('Insp_Status', on_delete=models.CASCADE)
    
class Insp_Status(models.Model):

    descriptions = [
        ('Pass', 'Extinguisher has 100% Pass'),
        ('Fail', 'Extinguisher did not 100% Pass')
    ]

    insp_status = models.PositiveSmallIntegerField(primary_key=True)
    stat_desc = models.CharField(max_length=4,
                                 choices=descriptions,
                                 default=None)

class Ext_Type(models.Model):
    type_id = models.CharField(max_length=15, primary_key=True)
    type_desc = models.CharField(max_length=30)

# ----- EXTINGUISHER BOX RELATED TABLES -----

class Box(models.Model):
    box_id = models.PositiveSmallIntegerField(primary_key=True)
    box_num = models.PositiveSmallIntegerField()
    box_size = models.PositiveSmallIntegerField()
    location = models.PositiveSmallIntegerField()
    status_id = models.ForeignKey('Ext_Status', on_delete=models.CASCADE)
    build_id = models.ForeignKey('Building', on_delete=models.CASCADE)

class Box_Status(models.Model):
    status_id = models.PositiveSmallIntegerField(primary_key=True)
    log_by = models.CharField(max_length=5)
    disc_date_time = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    comp_by = models.CharField(max_length=5, null=True, blank=True)
    comp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)

class Building(models.Model):
    build_id = models.CharField(max_length=10, primary_key=True)
    build_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    num_floors = models.PositiveSmallIntegerField()
    num_ext = models.PositiveSmallIntegerField()
    num_boxes = models.PositiveSmallIntegerField()

# ----- WAREHOUSE OPS AND TECHNICIAN RELATED TABLES -----

class Ware_Ops(models.Model):
    w_ext_id = models.CharField(max_length=5, primary_key=True)
    ext_id = models.ForeignKey('Extinguisher', on_delete=models.CASCADE)
    rec_by = models.CharField(max_length=10)
    rec_date_time = models.DateTimeField(auto_now_add=True)
    insp_s_id = models.PositiveSmallIntegerField(null=True, blank=True)
    insp_by = models.CharField(max_length=5, null=True, blank=True)
    insp_date_time = models.DateTimeField(auto_now=True, null=True, blank=True)

class EOL_Ext(models.Model):
    eol_id = models.PositiveSmallIntegerField(primary_key=True)
    w_ext_id = models.ForeignKey('Ware_Ops', on_delete=models.CASCADE)
    eol_date_time = models.DateTimeField(auto_now=True)

# Had to change the name of this. Migrating gave errors due to 2 tables with the same name
class W_Insp_Status(models.Model):  
    
    warehouseInspectionStatus = [
        ('Ready', 'Extinguisher ready for deployment'),
        ('Needs Inspection', 'Extinguisher waiting for inspection'),
        ('Send to EOL', 'Extinguisher ready for decommission'),
        ('Decommissioned', 'Extinguisher was terminated')
    ]

    insp_s_id = models.PositiveSmallIntegerField(primary_key=True)
    desc = models.CharField(max_length=150,
                            choices=warehouseInspectionStatus,
                            default='Needs Inspection')

class Ready_Ext(models.Model):
    ready_id = models.CharField(max_length=5, primary_key=True)
    w_ext_id = models.ForeignKey('Ware_Ops', on_delete=models.CASCADE)
    ready_date_time = models.DateTimeField(auto_now=True)

# ----- USER LOGIN RELATED TABLES -----

class Login(models.Model):
    login_id = models.CharField(max_length=30, primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=150)
    staff_id = models.ForeignKey('Staff', on_delete=models.CASCADE)
    auth_id = models.ForeignKey('Auth', on_delete=models.CASCADE)
    c_date = models.DateTimeField(auto_now_add=True)

class Auth(models.Model):
    auth_id = models.CharField(max_length=5, primary_key=True)
    auth_type = models.CharField(max_length=20)

class C_Log(models.Model):
    c_log_id = models.PositiveSmallIntegerField(primary_key=True)
    login_id = models.ForeignKey('Login', on_delete=models.CASCADE)
    t_changed = models.CharField(max_length=30) # Table changed
    i_changed = models.CharField(max_length=30) # Row changed
    change_date_time = models.DateTimeField(auto_now_add=True)