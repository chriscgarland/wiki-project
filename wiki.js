var text = '';
	var lines = [];
function AddListeners()
{
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
function AddDocumentLinesToArray(doc) {

	var lines = doc.split('\n');
	ParseArrayAndAddToElement(lines,"content");
}
// function ParseArrayAndAddToBody(mdarray)
// {
// 	var body = document.getElementsByTagName("BODY")[0];
// 	for(i = 0; mdarray[i] != null; i++)
// 	{
// 		body.innerHTML += parseLine(text[i]).toString();
// 		//console.log(parseLine(mdarray[i]));
// 	}
// }
function ParseArrayAndAddToElement(mdarray,id = 'content')
{
	for(i = 0; mdarray[i] != null; i++)
	{
		document.getElementById(id).innerHTML += parseLine(mdarray[i]).toString();
		//console.log(parseLine(mdarray[i]));
	}
}
function parseLine(line)
{
	switch(CheckLineType(line))
	{
		case 'HEADING':
			return BuildHeading(line);
			break;
		case 'HR':
			return BuildHR();
			break;
		case 'PARAGRAPH':
			return BuildParagraph(BuildEmAndStrong(line));
			break;
		default:
			return "This element has not yet been implemented";
	}
	/*BlockLevel*/
	// CheckBlockQuotes
	// CheckHR
	// CheckTOC
	// CheckLineBreak
	// CheckMonospace
	// Check
}
function CheckLineType(mdline)
{
	if (mdline.charAt(0) == '='|mdline.charAt(0) == '#')
	{
		return 'HEADING';
	}
	else if (mdline.charAt(0) == '-' &&
					 mdline.charAt(1) == '-' &&
					 mdline.charAt(2) == '-'
					)
	{
		return 'HR';
	}
	else
		return 'PARAGRAPH';
}

function BuildHeading(line)
{
	var i = 0;
	var level = 0;
	var HEADINGregex = /[\#\=]+([^\=\#]*)[\#\=]*/;
	//var HEADINGregex = /(#)[#=]*/;
	do
	{
		if (line.charAt(i) == '#'|'=')
		{
			level = i+1;
		}
		i++;
	}
	while (line.charAt(i) && line.charAt(i)=='#'|'=' && i<6)
	return (level > 0)?
	line.replace(HEADINGregex,Heading(level,'$1'))
	:line;
}
function BuildParagraph(line)
{
	return Paragraph(line);
}
function BuildHR()
{
	return HR()
}
function BuildEmAndStrong(line)
{
	var EMregex = /[_*](.*)[_*]/;
	var STRONGregex = /[_*]{2}(.*)[_*]{2}/;
	line = line.replace(STRONGregex,Strong("$1"));
	line = line.replace(EMregex,Em("$1"));
		return line;
}
/*html generation*/
var Heading = function(level, content){
	return String.raw`<h${level} id="`+Id(content)+String.raw`">${content}</h${level}>`+"\n";
}
var Paragraph = function(content)
{
	return String.raw`<p>${content}</p>`;
}
var Strong = function(content)
{
	return String.raw`<strong>${content}</strong>`;
}
var Em = function(content)
{
	return String.raw`<em>${content}</em>`;
}
var HR = function()
{
	return String.raw`<hr/>`+'\n';
}
/*Utility Functions*/
var StripSpaces = function(txt,type = '-')
{
	txt = txt.replace(/\s+/g, type);
	return txt;
}
var Truncate = function(txt,maxLength=35)
{
	return (txt.length > maxLength)?txt.substring(0,maxLength):txt;
}
var Id = function (txt)
{
	return Truncate(StripSpaces(txt));
}
function startReload()
{
	setInterval(function() {
	  location.reload();
	}, 5000);
}

/*FileIO*/
function handleFileSelect(evt) {
	var file = evt.target.files[0]; // FileList object
	// files is a FileList of File objects. List some properties.
	var lines = [];
	if (file){
			 var reader = new FileReader();
			 reader.onload = function(e) {
					 var contents = e.target.result;
					 text= contents.toString();
					 console.log(String.raw`${text}`);
					 AddDocumentLinesToArray(text);
			 };
			 reader.readAsText(file);
	 }
	 else {
			 alert("Failed to load file");
	 }
}
