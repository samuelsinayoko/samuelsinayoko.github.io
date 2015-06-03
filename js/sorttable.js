// Sort Table Script
// Version: 1.1
//
// Copyright (c) 2006-2008, Mark Schenk
//
// This software is distributed under a Creative Commons Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/

// NB: slow as molasses in FireFox, especially when sorting columns with a lot of text.
// An optimization is implemented which makes speed bearable, toggled by the following variable
var SORT_SPEED_OPT = true;
// a bit of browser preference: Opera does not need optimization
if(window.opera) { SORT_SPEED_OPT=false; }
// the optimization has one limitation on the functionality: when sorting search
// results, the expanded info, e.g. bibtex/review, is collapsed. In the non-optimized
// version they remain visible.


if (window.addEventListener) {
	window.addEventListener("load",initSortTable,false) }
else if (window.attachEvent) {
	window.attachEvent("onload", initSortTable); }

function initSortTable() {
var alltables = document.getElementsByTagName('table');
for(i=0;i<alltables.length;i++) {
	var currentTable = alltables[i];
	if(currentTable.className.indexOf('sortable') !=-1) {
		var thead = currentTable.getElementsByTagName('thead')[0];
		thead.title = 'Click on any column header to sort';
		for (var i=0;cell = thead.getElementsByTagName('th')[i];i++) {
			cell.onclick = function () { resortTable(this); };
			// make it possible to have a default sort column
			if(cell.className.indexOf('sort')!=-1) {
				resortTable(cell)
			}
		}
	}
}
}

var SORT_COLUMN_INDEX

function resortTable(td) {
	var column = td.cellIndex;
	var table = getParent(td,'TABLE');

	var allRows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var newRows = new Array();

	for (var i=0, k=0; i<allRows.length;i++) {

		var rowclass = allRows[i].className;

		if (rowclass.indexOf('entry') != -1) {
	       	newRows[k++] = allRows[i];
		}

		if (SORT_SPEED_OPT) {
		// remove highlight class
		allRows[i].className = rowclass.replace(/highlight/,'');
		// close information
		if(rowclass.indexOf('entry') == -1 && rowclass.indexOf('noshow') == -1) { allRows[i].className = rowclass + ' noshow';}
		}
	}


	// If other sort functions are deemed necessary (e.g. for
	// dates and currencies) they can be added.
	var sortfn = ts_sort_firstchild_caseinsensitive;
	SORT_COLUMN_INDEX = column;
	newRows.sort(sortfn);

	// create a container for showing sort arrow
	var arrow =  td.getElementsByTagName('span')[0];
	if (!arrow) { var arrow = td.appendChild(document.createElement('span'));}

	if (td.className) {
		if (td.className.indexOf('sort_asc') !=-1) {
			td.className = td.className.replace(/_asc/,"_des");
			newRows.reverse();
			arrow.innerHTML = '&uarr;';
		} else if (td.className.indexOf('sort_des') !=-1) {
			td.className = td.className.replace(/_des/,"_asc");
			arrow.innerHTML = '&darr;';
		} else {
			td.className += ' sort_asc';
			arrow.innerHTML = '&darr;';
		}
	} else {
		td.className += 'sort_asc';
		arrow.innerHTML = '&darr;';
	}

	// Remove the classnames and up/down arrows for the other headers
	var ths = table.getElementsByTagName('thead')[0].getElementsByTagName('th');
	for (var i=0; i<ths.length; i++) {
		if(ths[i]!=td && ths[i].className.indexOf('sort_')!=-1) {
		// argh, moronic JabRef thinks (backslash)w is an output field!!
		//ths[i].className = ths[i].className.replace(/sort_(backslash)w{3}/,"");
		ths[i].className = ths[i].className.replace(/sort_asc/,"");
		ths[i].className = ths[i].className.replace(/sort_des/,"");

		// remove span
		var arrow =  ths[i].getElementsByTagName('span')[0];
		if (arrow) { ths[i].removeChild(arrow); }
		}
	}

	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	for (i=0;i<newRows.length;i++) {
		table.getElementsByTagName('tbody')[0].appendChild(newRows[i]);

		if(!SORT_SPEED_OPT){
		// moving additional information, e.g. bibtex/abstract to right locations
		// this allows to sort, even with abstract/review/etc. still open
		var articleid = newRows[i].id;

		var entry = document.getElementById(articleid);
		var abs = document.getElementById('abs_'+articleid);
		var rev = document.getElementById('rev_'+articleid);
		var bib = document.getElementById('bib_'+articleid);

		var tbody = table.getElementsByTagName('tbody')[0];
		// mind the order of adding the entries
		if(abs) { tbody.appendChild(abs); }
		if(rev) { tbody.appendChild(rev); }
		if(bib) { tbody.appendChild(bib); }
		}
	}
}

function ts_sort_firstchild_caseinsensitive(a,b) {
	// only search in .firstChild of the cells. Speeds things up tremendously in FF
	// problem is that it won't find all the text in a cell if the firstChild is an element
	// or if there are other elements in the cell. Risky fix, but the speed boost is worth it.
	var acell = a.cells[SORT_COLUMN_INDEX];
	var bcell = b.cells[SORT_COLUMN_INDEX];

	acell.firstChild? aa = getTextContent(acell.firstChild).toLowerCase():aa = "";
	bcell.firstChild? bb = getTextContent(bcell.firstChild).toLowerCase():bb = "";

	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}

function ts_sort_caseinsensitive(a,b) {
	aa = getTextContent(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
	bb = getTextContent(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}

function ts_sort_default(a,b) {
	aa = getTextContent(a.cells[SORT_COLUMN_INDEX]);
	bb = getTextContent(b.cells[SORT_COLUMN_INDEX]);
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}

function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}
