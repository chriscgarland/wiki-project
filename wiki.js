var text = [];
 text[0] = '# heading';
 text[1] = 'paragraph wiht __bold__ and *italic*';
 text[2] = '## heading2';
 text[3] = 'paragraph wiht **bold** and *italic*';
 text[4] = '----';
 text[5] = 'paragraph wiht __bold__ and *italic*';
 text[6] = '####heading ----'
 text[7] = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
  text[8] = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
	
function test()
{
	var body = document.getElementsByTagName("BODY")[0];
	for(i = 0; text[i] != null; i++)
	{
		body.innerHTML += parseLine(text[i]).toString();
		console.log(parseLine(text[i]));
	}
}
function parseLine(line)
{
	/*BlockLevel*/
	// CheckHeading
	// TODO Function for CheckLineType(); Change this to switch(linetype)
	if (line.charAt(0) == '='|line.charAt(0) == '#')
	{return BuildHeading(line);}

	else if (line.charAt(0) == '-' &&
					 line.charAt(1) == '-' &&
					 line.charAt(2) == '-'
					)
	{
		return BuildHR();
	}
	else
	return BuildParagraph(BuildEmAndStrong(line));
	// CheckBlockQuotes
	// CheckHR
	// CheckTOC
	// CheckLineBreak
	// CheckEmAndStrong
	// CheckItalic
	// CheckMonospace
	// Check
	// if charAt(0) = '#,=', check next char,
	// if its not '#,=' its a <h1>
	// else
	// check to see if the next
	// line also contains part of this block
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
var StripSpaces = function(txt,type = '_')
{
	// var space = /[^\s]*[\s][^\s]*/;
	// return txt.replace(space,type);
	for (i =0; i<txt.length;i++)
	{
		//(txt.charAt(i)== ' ')?txt = txt.substr(0,i-1) + type + txt.substr(i+1):txt=txt;
	}
	return txt;
}
var Truncate = function(txt,maxLength=35)
{
	//return (txt.length > maxLength)?txt.substring(0,maxLength):txt;
}
var Id = function (txt)
{
	//return Truncate(StripSpaces(txt));
}
