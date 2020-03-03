def row():
	print '+','-','-','-','-',
	
def column():
	print '/',' ',' ',' ',' ',
	
def rowEnd():
	print '+'
	
def columnEnd():
	print '/'
	
def do_four(f):
	do_twice(f)
	do_twice(f)

def do_twice(f):
	f()
	f()
	
def fourColumn():
	do_four(column)
	columnEnd()	
	
def twoColumn():
	do_twice(column)
	columnEnd()
	
print ' '
print 'STARKEY EFFECIENCY APPEASMENT DEVICE'
print ' '
print '4x4'
print ' ' 
do_four(row)
rowEnd()
do_four(fourColumn)
do_four(row)
rowEnd()
do_four(fourColumn)
do_four(row)
rowEnd()
do_four(fourColumn)
do_four(row)
rowEnd()
do_four(fourColumn)
do_four(row)
rowEnd()

print ' '
print '2x2'
print ' '

do_twice(row)
rowEnd()
do_four(twoColumn)
do_twice(row)
rowEnd()
do_four(twoColumn)
do_twice(row)
rowEnd()