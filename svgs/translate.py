#This will work on inkscape files with absolute path coordinates.  To set a file to use absolute, go to File->Inkscape #Preferences->svg output and uncheck 'allow relative coordinates'.  To make sure your current svg starts to use these, #select all and move by a pixel and it'll update as appropriate.

from xml.dom import minidom
from lxml import etree
import json
import sys
from pathparser import PathIterator

def namespace(tag):
	ns =  "{http://www.w3.org/2000/svg}%s" % tag
	return ns

def translate(amount, value):
	return value + amount

def normalisepaths(elements):
	for element in elements:
		print element.tag
		#print element.get("transform")
		xadd = float("inf")
		yadd = float("inf")
		spaces = []
		transform = [0,0]
		
		
		towrite = []
		
		for child in element.iter("*"):
		
			if child.tag == namespace("rect"):
				tstr = child.get("transform")
				scaletrans = [1,1]
				if tstr:
					scaletrans = tstr[tstr.find("(")+1:tstr.find(")")].split(",")
					
			
				
				x = (float(child.get("x")) - float(transform[0])) * float(scaletrans[0])
				y = (float(child.get("y")) - float(transform[1])) * float(scaletrans[1])
			
				xadd = min(xadd, x)
				yadd = min(yadd, y)
				bdata = {"type":"none"}
				
				if "a" in child.get("id"):
					bdata['type'] = "room"
					#bdata['name'] = child.get("id")[5:]
					toks = child.get("id").split("_")
					bdata['id']    = toks[0]
					if len(toks) > 1:
						bdata['floor'] = toks[1]
					
					print bdata
					 
				rect = {"type":"rect", "x":x, "y":y, "width":float(child.get("width")), "height": float(child.get("height")), "data":bdata}
				
				spaces.append(rect)		
				transform = [0,0]
				
			#lasttag = child.tag
		
			if child.tag == namespace("path"):
				
				print "----- seen a path ------"
				
				finalpath = []
				id = child.get("id")
				p = PathIterator(child.get("d"))
				m = []
				mstr = None
				cstr = None
				lstr = None
				#xadd = float("inf")
				#yadd = float("inf")
			
				lxcomp = []
				lycomp = []
				cxcomp = []
				cycomp = []
			
				#this loop should appends each type and components to a list, and then iterates through the list 
				#and at the end to constructs the final translated path
			
				#first pull out all x and y components
				xcomp = []
				ycomp = []
				
			
				for type, char in p:
					
					if type == "M" or type == "L" or type == "C":
						xs = char[0::2]
						ys = char[1::2]
						xcomp.extend(xs)
						ycomp.extend(ys)
						finalpath.append({"type":type, "xcomp":xs, "ycomp":ys})
						
			
				minx = min(xcomp)
				maxx = max(xcomp)
				
				miny = min(ycomp)
				maxy = max(ycomp)
				
				xadd = min(xadd, minx)
				yadd = min(yadd, miny)
				
				width = maxx - minx
				height = maxy - miny
			
				xadjust = -minx
				yadjust = -miny
			 
				pathstring = ""
			
				translatedpath = []

				
				for path in finalpath:
					xtrans = [x + xadjust for x in path['xcomp']]
					ytrans = [y + yadjust for y in path['ycomp']]
					translatedpath.append({"type":path['type'], "xcomp":xtrans, "ycomp":ytrans})
				
				towrite.append({"type":"path", "id":id,"path":translatedpath, "width": width, "height":height})
				translated = [val for pair in zip(xtrans,ytrans) for val in pair] 
				#print pathstring + " " + path["type"] + " " + ', '.join(str(x) for x in translated)
				
				
		
		for rect in spaces:
			rect['x'] = rect['x'] - xadd
			rect['y'] = rect['y'] - yadd
			towrite.append(rect)
		
		return towrite
			
		
			
def getbuilding():
	for element in tree.xpath("//n:g[@id='building']", namespaces={'n':"http://www.w3.org/2000/svg"}):
		xadd = float("inf")
		yadd = float("inf")
		floors = {}
		transform = [0,0]
		floorid = None
		floorname = None
		
		for child in element.iter("*"):
				
			if child.tag == namespace("g"):
				tstr = child.get("transform")
				if tstr:	
					transform = tstr[tstr.find("(")+1:tstr.find(")")].split(",")
				else:
					floorid 	= child.get("id")
					floorname 	= child.get("{http://www.inkscape.org/namespaces/inkscape}label")
						
					
			if child.tag == namespace("rect"):
				tstr = child.get("transform")
				scaletrans = [1,1]
				if tstr:
					scaletrans = tstr[tstr.find("(")+1:tstr.find(")")].split(",")
					
			
				
				x = (float(child.get("x")) - float(transform[0])) * float(scaletrans[0])
				y = (float(child.get("y")) - float(transform[1])) * float(scaletrans[1])
			
				xadd = min(xadd, x)
				yadd = min(yadd, y)
					
				rect = {"x":x, "y":y, "width":float(child.get("width")), "height": float(child.get("height"))}
				if floorid not in floors:
					floors[floorid] = {"id":floorid, "name":floorname, "rects":[]}
				floors[floorid]['rects'].append(rect)		
				transform = [0,0]
				
			lasttag = child.tag
		
		#now apply xadd,yadd to get in tlc
		print "xadd %f, yadd %f" % (xadd,yadd)
		
		minx = float("inf")
		miny = float("inf")
		maxx = -1
		maxy = -1
		
		for key in floors.keys():
			floor = floors[key]
			rects = floor["rects"]
			for rect in rects:
				rect['x'] = rect['x'] - xadd
				minx = min(minx, rect['x'])
				maxx = max(maxx, rect['x']+rect['width'])		
				rect['y'] = rect['y'] - yadd
				miny = min(miny, rect['y'])
				maxy = max(maxy, rect['y']+rect['height'])	
				print rect
		
		print "width is %d" % (maxx-minx)
		print "height is %d" % (maxy-miny)
		print floors.keys()
		
		building = {"width": (maxx-minx), "height": (maxy-miny), "floors":floors}
		
		
		with open('../data/building.json', 'wb') as fp:
			json.dump(building, fp)
		

def overlay(outfile):
	towrite = normalisepaths(tree.xpath("//n:g[@id='layer1']", namespaces={'n':"http://www.w3.org/2000/svg"}))		
	
	with open(outfile, 'wb') as fp:
		json.dump(towrite, fp)


def floorplans():
	towrite = []
	floorplans = ["floorplan%d" % x for x in range(1,10)]
	
	for floorplan in floorplans:
		print "creating floorplan %s" % floorplan
		towrite.append(normalisepaths(tree.xpath("//n:g[@id='" + floorplan + "']", namespaces={'n':"http://www.w3.org/2000/svg"})))
	
	with open('../data/apartment.json', 'wb') as fp:
			json.dump(towrite, fp)
						
if __name__ == "__main__":
    
	filename = sys.argv[1]
	outfile =  sys.argv[2] if len(sys.argv) > 2 else None
	
	with open(filename, 'r') as infile:
		tree = etree.parse(infile)
	
	#overlay(outfile)
	floorplans()	
	#getbuilding()
	
