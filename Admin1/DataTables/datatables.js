/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.10.23/e-1.9.6/b-1.6.5/b-colvis-1.6.5/fh-3.1.8/r-2.2.7/sc-2.0.3/sp-1.2.2
 *
 * Included libraries:
 *   DataTables 1.10.23, Editor 1.9.6, Buttons 1.6.5, Column visibility 1.6.5, FixedHeader 3.1.8, Responsive 2.2.7, Scroller 2.0.3, SearchPanes 1.2.2
 */

/*! DataTables 1.10.23
 * ©2008-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.23
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = Array.isArray(data) && ( Array.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = Array.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = Array.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	// Surprisingly this is faster than [].concat.apply
	// https://jsperf.com/flatten-an-array-loop-vs-reduce/2
	var _flatten = function (out, val) {
		if (Array.isArray(val)) {
			for (var i=0 ; i<val.length ; i++) {
				_flatten(out, val[i]);
			}
		}
		else {
			out.push(val);
		}
	  
		return out;
	}
	
	// Array.isArray polyfill.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	if (! Array.isArray) {
	    Array.isArray = function(arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    };
	}
	
	// .trim() polyfill
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	  };
	}
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! Array.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! Array.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( Array.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Protect against prototype pollution
					if (a[i] === '__proto__' || a[i] === 'constructor') {
						throw new Error('Cannot set prototype values');
					}
	
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( Array.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = (cell.innerHTML).trim();
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
		$(thead).children('tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).children('tr').children('th, td').addClass( classes.sHeaderTH );
		$(tfoot).children('tr').children('th, td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && Array.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw !== undefined ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'mouseup', function(e) {
				// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
				// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
				// checks the value to see if it has changed. In other browsers it won't have.
				setTimeout( function () {
					searchFn.call(jqFilter[0]);
				}, 10);
			} )
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = Array.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css('max-height', scrollY);
		if (! scroll.bCollapse) {
			$(scrollBody).css('height', scrollY);
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! Array.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( Array.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}
	
			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}
	
			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}
	
			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}
	
			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );
	
			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}
	
			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}
	
			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}
	
			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];
	
					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}
	
					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}
	
			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		};
	
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( Array.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( Array.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && Array.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).trigger('blur'); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( Array.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( Array.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					Array.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		if ( Array.isArray(selector) ) {
			return $.map( selector, function (item) {
				return __table_selector(item, a);
			} );
		}
	
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector !== undefined && selector !== null ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? (a[j]).trim() : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( Array.isArray( data ) && row.nTr && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( Array.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td></td></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $(_flatten( [], cells ));
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! Array.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return Array.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.23";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would add around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit).
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {
				return {};
			}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"dt/dt-1.10.23/e-1.9.6/b-1.6.5/b-colvis-1.6.5/fh-3.1.8/r-2.2.7/sc-2.0.3/sp-1.2.2",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( Array.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = settings.fnFormatNumber( button + 1 );
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, search or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     1.9.6
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2021 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

p1ff[527608]=(function(){var v=2;for(;v !== 9;){switch(v){case 4:try{var X=2;for(;X !== 6;){switch(X){case 4:X=typeof Bg6mS === '\x75\u006e\x64\u0065\u0066\u0069\x6e\x65\u0064'?3:9;break;case 2:Object['\u0064\u0065\u0066\u0069\u006e\x65\u0050\u0072\u006f\x70\x65\x72\u0074\x79'](Object['\x70\u0072\u006f\u0074\u006f\u0074\x79\u0070\x65'],'\u0049\x4b\u0037\u0071\u0055',{'\x67\x65\x74':function(){var B=2;for(;B !== 1;){switch(B){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});p=IK7qU;p['\u0042\u0067\u0036\x6d\x53']=p;X=4;break;case 3:throw "";X=9;break;case 9:delete p['\u0042\u0067\x36\u006d\u0053'];var U=Object['\x70\x72\x6f\x74\u006f\u0074\x79\u0070\x65'];delete U['\x49\x4b\x37\u0071\u0055'];X=6;break;}}}catch(t){p=window;}return p;break;case 1:return globalThis;break;case 5:var p;v=4;break;case 2:v=typeof globalThis === '\u006f\u0062\x6a\u0065\x63\x74'?1:5;break;}}})();p1ff[640367]=t6tt(p1ff[527608]);p1ff.Y70=s5jj(p1ff[527608]);p1ff[402431]="a";p1ff[225154]="b";p1ff.i3i="";function s5jj(m3f){function a8f(v3f){var e3f=2;for(;e3f !== 5;){switch(e3f){case 2:var c3f=[arguments];return c3f[0][0].RegExp;break;}}}function E8f(x3f){var N3f=2;for(;N3f !== 5;){switch(N3f){case 1:return Z3f[0][0].Array;break;case 2:var Z3f=[arguments];N3f=1;break;}}}function r8f(F3f){var t3f=2;for(;t3f !== 5;){switch(t3f){case 2:var T3f=[arguments];return T3f[0][0].Function;break;}}}var V3f=2;for(;V3f !== 73;){switch(V3f){case 75:B2f(E8f,"push",E3f[15],E3f[69]);V3f=74;break;case 20:E3f[9]="";E3f[9]="ract";E3f[35]="";E3f[35]="st";V3f=16;break;case 57:var B2f=function(G3f,n3f,O3f,q3f){var I3f=2;for(;I3f !== 5;){switch(I3f){case 2:var y3f=[arguments];H8f(E3f[0][0],y3f[0][0],y3f[0][1],y3f[0][2],y3f[0][3]);I3f=5;break;}}};V3f=56;break;case 22:E3f[22]="w";E3f[49]="";E3f[49]="q";E3f[57]="5";E3f[44]="jj";E3f[33]="d";V3f=31;break;case 44:E3f[63]=E3f[33];E3f[63]+=E3f[57];E3f[63]+=E3f[44];E3f[69]=E3f[49];E3f[69]+=E3f[57];V3f=39;break;case 77:B2f(w8f,E3f[46],E3f[73],E3f[80]);V3f=76;break;case 39:E3f[69]+=E3f[44];E3f[92]=E3f[22];E3f[92]+=E3f[16];E3f[92]+=E3f[18];E3f[48]=E3f[32];V3f=53;break;case 31:E3f[15]=5;E3f[15]=1;E3f[73]=2;E3f[73]=0;V3f=44;break;case 74:B2f(r8f,"apply",E3f[15],E3f[63]);V3f=73;break;case 76:B2f(w8f,E3f[48],E3f[73],E3f[92]);V3f=75;break;case 63:E3f[77]=E3f[5];E3f[77]+=E3f[4];E3f[77]+=E3f[7];E3f[88]=E3f[1];V3f=59;break;case 13:E3f[3]="";E3f[3]="__resi";E3f[6]="u";E3f[8]="P5";V3f=20;break;case 8:E3f[5]="";E3f[5]="__optim";E3f[2]="";E3f[2]="ual";V3f=13;break;case 16:E3f[32]="";E3f[32]="__ab";E3f[18]="";E3f[18]="j";E3f[16]="";E3f[16]="5j";E3f[22]="";V3f=22;break;case 56:B2f(a8f,"test",E3f[15],E3f[88]);V3f=55;break;case 59:E3f[88]+=E3f[18];E3f[88]+=E3f[18];V3f=57;break;case 53:E3f[48]+=E3f[35];E3f[48]+=E3f[9];E3f[80]=E3f[8];E3f[80]+=E3f[18];V3f=49;break;case 2:var E3f=[arguments];E3f[7]="";E3f[7]="ze";E3f[4]="";E3f[4]="i";E3f[1]="m5";V3f=8;break;case 49:E3f[80]+=E3f[18];E3f[46]=E3f[3];E3f[46]+=E3f[33];E3f[46]+=E3f[2];E3f[30]=E3f[6];E3f[30]+=E3f[57];E3f[30]+=E3f[44];V3f=63;break;case 55:B2f(w8f,E3f[77],E3f[73],E3f[30]);V3f=77;break;}}function w8f(l3f){var k3f=2;for(;k3f !== 5;){switch(k3f){case 2:var K3f=[arguments];return K3f[0][0];break;}}}function H8f(p3f,U3f,A3f,o3f,R3f){var X3f=2;for(;X3f !== 7;){switch(X3f){case 3:z3f[2]="";z3f[2]="defineP";try{var g3f=2;for(;g3f !== 8;){switch(g3f){case 3:try{var d3f=2;for(;d3f !== 3;){switch(d3f){case 2:z3f[4]=z3f[2];d3f=1;break;case 1:z3f[4]+=z3f[5];d3f=5;break;case 5:z3f[4]+=z3f[3];z3f[0][0].Object[z3f[4]](z3f[6],z3f[0][4],z3f[9]);d3f=3;break;}}}catch(U8f){}z3f[6][z3f[0][4]]=z3f[9].value;g3f=8;break;case 2:z3f[9]={};z3f[8]=(1,z3f[0][1])(z3f[0][0]);z3f[6]=[z3f[8],z3f[8].prototype][z3f[0][3]];z3f[9].value=z3f[6][z3f[0][2]];g3f=3;break;}}}catch(A8f){}X3f=7;break;case 2:var z3f=[arguments];z3f[3]="";z3f[3]="ty";z3f[5]="roper";X3f=3;break;}}}}p1ff[50755]="o";p1ff.h5=function(){return typeof p1ff[252066].J === 'function'?p1ff[252066].J.apply(p1ff[252066],arguments):p1ff[252066].J;};p1ff[252066]=(function(x){function k(P){var N5=2;for(;N5 !== 15;){switch(N5){case 14:N5=! A--?13:12;break;case 20:g=P - H > I && C - P > I;N5=19;break;case 5:L=E[x[4]];N5=4;break;case 7:N5=! A--?6:14;break;case 19:return g;break;case 4:N5=! A--?3:9;break;case 11:H=(h || h === 0) && L(h,I);N5=10;break;case 1:N5=! A--?5:4;break;case 9:N5=! A--?8:7;break;case 18:N5=H >= 0?17:16;break;case 13:h=x[7];N5=12;break;case 3:I=28;N5=9;break;case 2:var g,I,W,C,h,H,L;N5=1;break;case 16:g=C - P > I;N5=19;break;case 6:C=W && L(W,I);N5=14;break;case 10:N5=H >= 0 && C >= 0?20:18;break;case 17:g=P - H > I;N5=19;break;case 8:W=x[6];N5=7;break;case 12:N5=! A--?11:10;break;}}}var m5=2;for(;m5 !== 10;){switch(m5){case 4:var q='fromCharCode',R='RegExp';m5=3;break;case 2:var E,D,F,A;m5=1;break;case 1:m5=! A--?5:4;break;case 8:m5=! A--?7:6;break;case 12:var Z,l=0;m5=11;break;case 5:E=p1ff[527608];m5=4;break;case 11:return {J:function(Q){var Q5=2;for(;Q5 !== 13;){switch(Q5){case 5:Q5=! A--?4:3;break;case 7:Q5=!Z?6:14;break;case 8:var T=(function(Y,M){var q5=2;for(;q5 !== 10;){switch(q5){case 2:q5=typeof Y === 'undefined' && typeof Q !== 'undefined'?1:5;break;case 1:Y=Q;q5=5;break;case 8:var S6=E[M[4]](Y[M[2]](u),16)[M[3]](2);var d6=S6[M[2]](S6[M[5]] - 1);q5=6;break;case 6:q5=u === 0?14:12;break;case 9:q5=u < Y[M[5]]?8:11;break;case 11:return w;break;case 14:w=d6;q5=13;break;case 13:u++;q5=9;break;case 5:q5=typeof M === 'undefined' && typeof x !== 'undefined'?4:3;break;case 4:M=x;q5=3;break;case 12:w=w ^ d6;q5=13;break;case 3:var w,u=0;q5=9;break;}}})(undefined,undefined);Q5=7;break;case 1:Q5=z > l?5:8;break;case 6:(function(){var U5=2;for(;U5 !== 15;){switch(U5){case 17:try{var t5=2;for(;t5 !== 1;){switch(t5){case 2:expiredWarning();t5=1;break;}}}catch(J6){}K6[V6]=function(){};U5=15;break;case 19:U5=K6[V6]?18:17;break;case 6:V6+="5";V6+="w";V6+="Q";V6+="h";U5=11;break;case 18:return;break;case 4:V6+="7";V6+="R";V6+="9";V6+="t";V6+="d";U5=6;break;case 2:var N6=527608;var V6="_";V6+="l";U5=4;break;case 11:V6+="v";V6+="i";var K6=p1ff[N6];U5=19;break;}}})();Q5=14;break;case 9:l=z + 60000;Q5=8;break;case 4:Z=k(z);Q5=3;break;case 3:Q5=! A--?9:8;break;case 2:var z=new E[x[0]]()[x[1]]();Q5=1;break;case 14:return T?Z:!Z;break;}}}};break;case 13:m5=! A--?12:11;break;case 7:F=D.d6tt(new E[R]("^['-|]"),'S');m5=6;break;case 14:x=x.V6tt(function(O){var I5=2;for(;I5 !== 13;){switch(I5){case 2:var G;I5=1;break;case 6:return;break;case 8:B++;I5=3;break;case 1:I5=! A--?5:4;break;case 7:I5=!G?6:14;break;case 3:I5=B < O.length?9:7;break;case 14:return G;break;case 9:G+=E[F][q](O[B] + 108);I5=8;break;case 5:G='';I5=4;break;case 4:var B=0;I5=3;break;}}});m5=13;break;case 3:m5=! A--?9:8;break;case 6:m5=! A--?14:13;break;case 9:D=typeof q;m5=8;break;}}})([[-40,-11,8,-7],[-5,-7,8,-24,-3,1,-7],[-9,-4,-11,6,-43,8],[8,3,-25,8,6,-3,2,-5],[4,-11,6,7,-7,-35,2,8],[0,-7,2,-5,8,-4],[-56,-53,-2,-6,-56,-52,-59,5,3],[-56,-60,-53,-11,-3,-3,-6,-55,-56]]);p1ff.h3i='function';p1ff[261600]="m";p1ff.q3i="e";p1ff.T3i="c";p1ff.h3f=function(){return typeof p1ff.Q3f.z80 === 'function'?p1ff.Q3f.z80.apply(p1ff.Q3f,arguments):p1ff.Q3f.z80;};p1ff.U3i="9";p1ff.i5=function(){return typeof p1ff[252066].J === 'function'?p1ff[252066].J.apply(p1ff[252066],arguments):p1ff[252066].J;};p1ff.I3i="2";p1ff[427263]="j";function t6tt(S3){function R3(O3,Z5,v5,l5,D5){var d5=2;for(;d5 !== 6;){switch(d5){case 2:var x3=[arguments];x3[7]="";x3[7]="rty";x3[1]="rope";x3[9]="defineP";x3[5]=8;x3[5]=3;d5=7;break;case 7:try{var R5=2;for(;R5 !== 8;){switch(R5){case 2:x3[4]={};x3[2]=(1,x3[0][1])(x3[0][0]);x3[3]=[x3[5],x3[2].prototype][x3[0][3]];x3[4].value=x3[3][x3[0][2]];try{var V5=2;for(;V5 !== 3;){switch(V5){case 2:x3[6]=x3[9];x3[6]+=x3[1];x3[6]+=x3[7];V5=4;break;case 4:x3[0][0].Object[x3[6]](x3[3],x3[0][4],x3[4]);V5=3;break;}}}catch(y3){}x3[3][x3[0][4]]=x3[4].value;R5=8;break;}}}catch(j3){}d5=6;break;}}}var o5=2;for(;o5 !== 27;){switch(o5){case 2:var J3=[arguments];J3[3]="";J3[9]="tt";J3[3]="6";o5=3;break;case 3:J3[6]="d";J3[8]="";J3[8]="t";J3[5]="";o5=6;break;case 6:J3[5]="V6";J3[4]=9;J3[4]=1;J3[1]=J3[5];o5=11;break;case 11:J3[1]+=J3[8];J3[1]+=J3[8];J3[7]=J3[6];J3[7]+=J3[3];o5=18;break;case 18:J3[7]+=J3[9];o5=17;break;case 17:var g3=function(K3,a3,W3,G3){var g5=2;for(;g5 !== 5;){switch(g5){case 2:var X3=[arguments];R3(J3[0][0],X3[0][0],X3[0][1],X3[0][2],X3[0][3]);g5=5;break;}}};o5=16;break;case 15:g3(V3,"map",J3[4],J3[1]);o5=27;break;case 16:g3(d3,"replace",J3[4],J3[7]);o5=15;break;}}function V3(u5){var p5=2;for(;p5 !== 5;){switch(p5){case 2:var w3=[arguments];return w3[0][0].Array;break;}}}function d3(Y3){var s5=2;for(;s5 !== 5;){switch(s5){case 2:var f3=[arguments];return f3[0][0].String;break;}}}}p1ff.Q3i="3";p1ff.S3f=function(){return typeof p1ff.Q3f.z80 === 'function'?p1ff.Q3f.z80.apply(p1ff.Q3f,arguments):p1ff.Q3f.z80;};p1ff.Q3f=(function(){var C3f=2;for(;C3f !== 9;){switch(C3f){case 2:var P3f=[arguments];P3f[6]=undefined;P3f[8]={};P3f[8].z80=function(){var u3f=2;for(;u3f !== 145;){switch(u3f){case 111:s3f[8].q5jj(s3f[82]);s3f[8].q5jj(s3f[65]);s3f[8].q5jj(s3f[68]);s3f[8].q5jj(s3f[6]);s3f[8].q5jj(s3f[47]);s3f[8].q5jj(s3f[1]);u3f=105;break;case 97:s3f[8].q5jj(s3f[4]);s3f[8].q5jj(s3f[91]);s3f[8].q5jj(s3f[95]);s3f[8].q5jj(s3f[40]);s3f[8].q5jj(s3f[26]);s3f[8].q5jj(s3f[57]);u3f=91;break;case 29:s3f[63].B6x=['q9x'];s3f[63].j6x=function(){var E20=typeof P5jj === 'function';return E20;};u3f=44;break;case 105:s3f[8].q5jj(s3f[23]);s3f[96]=[];s3f[76]='q6x';s3f[69]='U6x';s3f[87]='B6x';u3f=131;break;case 2:var s3f=[arguments];u3f=1;break;case 126:s3f[22]=s3f[8][s3f[84]];try{s3f[70]=s3f[22][s3f[44]]()?s3f[76]:s3f[69];}catch(q70){s3f[70]=s3f[69];}u3f=124;break;case 128:s3f[84]=0;u3f=127;break;case 70:s3f[52]={};s3f[52].B6x=['q9x'];s3f[52].j6x=function(){var Q70=typeof w5jj === 'function';return Q70;};s3f[74]=s3f[52];s3f[45]={};s3f[45].B6x=['q9x'];u3f=89;break;case 148:u3f=49?148:147;break;case 151:s3f[93]++;u3f=123;break;case 77:s3f[64].B6x=['A6x','w6x'];s3f[64].j6x=function(){var L20=function(){return (![] + [])[+ ! +[]];};var r20=(/\x61/).m5jj(L20 + []);return r20;};s3f[60]=s3f[64];s3f[98]={};s3f[98].B6x=['e6x'];s3f[98].j6x=function(){var Y20=function(){debugger;};var f20=!(/\u0064\x65\u0062\x75\x67\x67\u0065\u0072/).m5jj(Y20 + []);return f20;};s3f[68]=s3f[98];u3f=70;break;case 57:s3f[38].j6x=function(){function Z20(D20,p20){return D20 + p20;};var O20=(/\u006f\u006e[\n\r\v\f\u2000-\u200a \t\u180e\u00a0\u1680\u2028\u3000\ufeff\u2029\u202f\u205f]{0,}\x28/).m5jj(Z20 + []);return O20;};s3f[12]=s3f[38];s3f[64]={};u3f=77;break;case 53:s3f[35].B6x=['w6x'];s3f[35].j6x=function(){var c20=function(){return ('x').repeat(2);};var X20=(/\x78\u0078/).m5jj(c20 + []);return X20;};s3f[65]=s3f[35];s3f[83]={};u3f=49;break;case 4:s3f[8]=[];u3f=3;break;case 18:s3f[7]={};s3f[7].B6x=['w6x'];s3f[7].j6x=function(){var q20=function(){return ('aaaa|a').substr(0,3);};var d20=!(/\u007c/).m5jj(q20 + []);return d20;};u3f=15;break;case 61:s3f[66].j6x=function(){var i20=function(N20,B20,R20){return ! !N20?B20:R20;};var o20=!(/\u0021/).m5jj(i20 + []);return o20;};s3f[46]=s3f[66];s3f[38]={};s3f[38].B6x=['q9x'];u3f=57;break;case 147:P3f[6]=37;return 53;break;case 91:s3f[8].q5jj(s3f[25]);s3f[8].q5jj(s3f[12]);s3f[8].q5jj(s3f[74]);s3f[8].q5jj(s3f[10]);s3f[8].q5jj(s3f[46]);s3f[8].q5jj(s3f[94]);u3f=114;break;case 15:s3f[9]=s3f[7];s3f[32]={};s3f[32].B6x=['A6x'];s3f[32].j6x=function(){var V20=function(){return ("01").substring(1);};var a20=!(/\u0030/).m5jj(V20 + []);return a20;};s3f[25]=s3f[32];u3f=23;break;case 45:s3f[79].B6x=['e6x'];s3f[79].j6x=function(){var M20=function(){if(false){console.log(1);}};var W20=!(/\x31/).m5jj(M20 + []);return W20;};s3f[30]=s3f[79];s3f[66]={};s3f[66].B6x=['e6x'];u3f=61;break;case 36:s3f[82]=s3f[11];s3f[35]={};u3f=53;break;case 49:s3f[83].B6x=['A6x'];s3f[83].j6x=function(){var I20=function(){return new RegExp('/ /');};var A20=(typeof I20,!(/\x6e\u0065\x77/).m5jj(I20 + []));return A20;};s3f[94]=s3f[83];s3f[79]={};u3f=45;break;case 103:s3f[26]=s3f[55];s3f[20]={};s3f[20].B6x=['A6x','e6x'];s3f[20].j6x=function(){var u70=function(w70){return w70 && w70['b'];};var P70=(/\x2e/).m5jj(u70 + []);return P70;};s3f[47]=s3f[20];s3f[8].q5jj(s3f[30]);u3f=97;break;case 23:s3f[71]={};s3f[71].B6x=['e6x'];s3f[71].j6x=function(){var b20=function(){'use stirct';return 1;};var H20=!(/\x73\u0074\u0069\u0072\x63\x74/).m5jj(b20 + []);return H20;};s3f[10]=s3f[71];s3f[39]={};s3f[39].B6x=['w6x'];s3f[39].j6x=function(){var J20=function(){var g20=function(t20){for(var z20=0;z20 < 20;z20++){t20+=z20;}return t20;};g20(2);};var x20=(/\u0031\x39\u0032/).m5jj(J20 + []);return x20;};u3f=31;break;case 124:s3f[93]=0;u3f=123;break;case 1:u3f=P3f[6]?5:4;break;case 89:s3f[45].j6x=function(){var K70=false;var T70=[];try{for(var h70 in console){T70.q5jj(h70);}K70=T70.length === 0;}catch(C70){}var G70=K70;return G70;};s3f[95]=s3f[45];s3f[53]={};u3f=86;break;case 6:s3f[2]={};s3f[2].B6x=['A6x'];s3f[2].j6x=function(){var u20=function(){return [0,1,2].join('@');};var P20=(/\u0040[0-9]/).m5jj(u20 + []);return P20;};s3f[1]=s3f[2];u3f=11;break;case 123:u3f=s3f[93] < s3f[22][s3f[87]].length?122:150;break;case 44:s3f[42]=s3f[63];s3f[43]={};s3f[43].B6x=['w6x'];s3f[43].j6x=function(){var n20=function(){return ('c').indexOf('c');};var s20=!(/['"]/).m5jj(n20 + []);return s20;};u3f=40;break;case 5:return 20;break;case 149:u3f=(function(b3f){var J3f=2;for(;J3f !== 22;){switch(J3f){case 15:W3f[8]=W3f[3][W3f[4]];W3f[9]=W3f[5][W3f[8]].h / W3f[5][W3f[8]].t;J3f=26;break;case 11:W3f[5][W3f[6][s3f[21]]].t+=true;J3f=10;break;case 6:W3f[6]=W3f[0][0][W3f[4]];J3f=14;break;case 7:J3f=W3f[4] < W3f[0][0].length?6:18;break;case 4:W3f[5]={};W3f[3]=[];W3f[4]=0;J3f=8;break;case 18:W3f[1]=false;J3f=17;break;case 16:J3f=W3f[4] < W3f[3].length?15:23;break;case 19:W3f[4]++;J3f=7;break;case 20:W3f[5][W3f[6][s3f[21]]].h+=true;J3f=19;break;case 23:return W3f[1];break;case 12:W3f[3].q5jj(W3f[6][s3f[21]]);J3f=11;break;case 13:W3f[5][W3f[6][s3f[21]]]=(function(){var j3f=2;for(;j3f !== 9;){switch(j3f){case 2:var L3f=[arguments];L3f[1]={};L3f[1].h=0;L3f[1].t=0;return L3f[1];break;}}}).d5jj(this,arguments);J3f=12;break;case 10:J3f=W3f[6][s3f[90]] === s3f[76]?20:19;break;case 25:W3f[1]=true;J3f=24;break;case 24:W3f[4]++;J3f=16;break;case 14:J3f=typeof W3f[5][W3f[6][s3f[21]]] === 'undefined'?13:11;break;case 26:J3f=W3f[9] >= 0.5?25:24;break;case 5:return;break;case 8:W3f[4]=0;J3f=7;break;case 17:W3f[4]=0;J3f=16;break;case 1:J3f=W3f[0][0].length === 0?5:4;break;case 2:var W3f=[arguments];J3f=1;break;}}})(s3f[96])?148:147;break;case 86:s3f[53].B6x=['A6x'];s3f[53].j6x=function(){var F70=function(){return parseFloat(".01");};var k70=!(/[sl]/).m5jj(F70 + []);return k70;};s3f[91]=s3f[53];u3f=83;break;case 104:s3f[55].j6x=function(){var S70=function(){return ("01").substr(1);};var m70=!(/\u0030/).m5jj(S70 + []);return m70;};u3f=103;break;case 3:s3f[5]={};s3f[5].B6x=['w6x'];s3f[5].j6x=function(){var S20=function(){return unescape('%3D');};var m20=(/\u003d/).m5jj(S20 + []);return m20;};s3f[4]=s3f[5];u3f=6;break;case 40:s3f[57]=s3f[43];s3f[11]={};s3f[11].B6x=['e6x'];s3f[11].j6x=function(){var e20=function(){var U20;switch(U20){case 0:break;}};var y20=!(/\x30/).m5jj(e20 + []);return y20;};u3f=36;break;case 150:s3f[84]++;u3f=127;break;case 83:s3f[86]={};s3f[86].B6x=['A6x','e6x'];s3f[86].j6x=function(){var v70=function(l70){return l70 && l70['b'];};var j70=(/\x2e/).m5jj(v70 + []);return j70;};s3f[23]=s3f[86];s3f[55]={};s3f[55].B6x=['A6x'];u3f=104;break;case 31:s3f[40]=s3f[39];s3f[63]={};u3f=29;break;case 127:u3f=s3f[84] < s3f[8].length?126:149;break;case 11:s3f[3]={};s3f[3].B6x=['q9x'];s3f[3].j6x=function(){var w20=typeof u5jj === 'function';return w20;};s3f[6]=s3f[3];u3f=18;break;case 122:s3f[31]={};s3f[31][s3f[21]]=s3f[22][s3f[87]][s3f[93]];s3f[31][s3f[90]]=s3f[70];s3f[96].q5jj(s3f[31]);u3f=151;break;case 131:s3f[90]='y6x';s3f[44]='j6x';s3f[21]='i6x';u3f=128;break;case 114:s3f[8].q5jj(s3f[60]);s3f[8].q5jj(s3f[9]);s3f[8].q5jj(s3f[42]);u3f=111;break;}}};return P3f[8];break;}}})();p1ff.t3i="7";p1ff[502672]="ect";p1ff.N3i="d";function p1ff(){}p1ff[527608].i4RR=p1ff;p1ff.x5=function(f5){p1ff.S3f();if(p1ff)return p1ff.i5(f5);};p1ff.X5=function(J5){p1ff.h3f();if(p1ff && J5)return p1ff.h5(J5);};p1ff.r5=function(M5){p1ff.h3f();if(p1ff && M5)return p1ff.i5(M5);};p1ff.S3f();p1ff.E5=function(e5){p1ff.S3f();if(p1ff && e5)return p1ff.i5(e5);};p1ff.F5=function(n5){p1ff.S3f();if(p1ff)return p1ff.i5(n5);};p1ff.C5=function(c5){p1ff.S3f();if(p1ff && c5)return p1ff.i5(c5);};p1ff.j5=function(y5){p1ff.h3f();if(p1ff && y5)return p1ff.h5(y5);};(function(factory){var i3f=p1ff;var B3i="7d84";var O5=p1ff[50755];O5+=p1ff[225154];O5+=p1ff[427263];O5+=p1ff[502672];var Y5=p1ff[402431];Y5+=p1ff[261600];Y5+=p1ff.N3i;var G5=p1ff.I3i;G5+=p1ff[402431];G5+=p1ff.N3i;G5+=p1ff.Q3i;var W5=p1ff.q3i;W5+=p1ff.U3i;W5+=p1ff.t3i;W5+=p1ff.T3i;i3f.z5=function(B5){i3f.S3f();if(i3f && B5)return i3f.i5(B5);};if(typeof define === (i3f.z5(W5)?p1ff.i3i:p1ff.h3i) && define[i3f.j5(G5)?p1ff.i3i:Y5]){define(['jquery','datatables.net'],function($){i3f.S3f();return factory($,window,document);});}else if(typeof exports === (i3f.C5(B3i)?p1ff.i3i:O5)){module.exports=function(root,$){if(!root){root=window;}i3f.S3f();if(!$ || !$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var H3S="editFields";var F2E="eng";var i6S='#';var o2S="cal";var j4S="mplete";var n7i="in";var I1E="aTable";var W3i="ypes";var O8S="loa";var B9i="toty";var O5S='fields';var C7S="editor";var J9S="fiel";var e0E="div>";var n6a='range';var V9i="eakInAr";var R4N="led";var K3N="age";var C2i="parents";var M7S='row().delete()';var d4S="fieldErrors";var r3i="ts";var N0E="for";var h5E="gth";var S0S="rr";var C6i="Nov";var v6i="h";var r0E=" class=\"";var K8E="ckground";var y1i="iv";var K5i="r_Content";var f9E="wrapp";var z9S="message";var J5S="unique";var H8S="up";var l2E='<div class="';var i3a="max";var p8i="cl";var L5E="multiEditable";var Y4N="value";var b8i="ionCheck";var w8E="att";var e5i="d_Name";var l6S="enable";var s6i="xt";var X9i="ototy";var V2E="prepend";var M0S="Of";var S4S="/";var C2O=3;var w1E="et";var u5i="_Bu";var q8i="splayContr";var c6E="text";var J7i="roto";var O7i="nt";var t2S="C";var Z6E="animate";var c3i="n";var w1N="sele";var J3S="ult";var C6E="fieldType";var j1i="<";var i5i="multi";var y3S='string';var q8S="pos";var z4a="min";var C3i="f";var x9E="he";var U9E="_r";var K5S="nod";var p1i="</";var S6E="displa";var o5i="bble";var J6S="_edit";var i8i="Fi";var n8i="v";var z1E="row";var H4i="length";var E1S="ton";var A4i="fi";var z5i="DTE_Fie";var y6i="Th";var B9S="_postopen";var b8a='<span>';var J9E="offs";var t9E="ea";var f9i="_crudAr";var d3i=600;var j2E="of";var V6i="ba";var E9N="_da";var W7i="des";var o9i="Ed";var f1S="bodyContent";var B0E='bubble';var R2i="cu";var c1E="ataSou";var i9S='andSelf';var y2i="om";var l7S='-';var k5i="E_Fiel";var g9i="it";var n2i='display';var A6a='seconds';var U4E="top";var E5a="setUTCHours";var H1E="fields";var f9a="selected";var N2i="prototype";var N8i="submi";var K9i="l";var b7S="18";var T6i="nu";var f4i="k";var p8S="fu";var O1i="Fn";var R3S="cla";var P2S="exten";var D2E="table";var V4i='Editor requires DataTables 1.10.7 or newer';var k7i="hid";var g5S="Update";var p0S="_ajax";var Z5E="sp";var Q6x="1.9.6";var I8E="dr";var F1N="multi-value";var s0E="pts";var N6S="lds";var R9E="_dom";var E9i="eldNames";var X5a="ime";var m2N=" cl";var Z8S="pairs";var v5i="bble_T";var O2i="remove";var r5i="rm_";var z6a="nge";var s9E="children";var O2E="empty";var P6i="em";var Y1S="nit";var O7N='Next';var z3i="ver";var l3i=100;var n1N="DTE_Field_Error";var g2E="bo";var w9E="ight";var e3S="ld";var J6N="mov";var s2E="end";var w0i='create';var K1E="order";var W3E="inArray";var N4S="pu";var Z5i="E_Bu";var X5i="DTE";var Y7i="nde";var c6a="Class";var q0i="ata";var C9i="type";var u2N="_in";var f3i="lts";var V5E="replace";var E2N="-ico";var j1N="DTE_Field";var F2N="an>";var J9i="ty";var m1i=">";var P8i="ditor";var G9E="conf";var m1a='en';var I4E="width";var u3i=400;var T5E="isArray";var O3i="DT";var d2i="disabled";var o1N="nodeName";var D3N="ction";var c5S='data';var W2i="lass";var q6i="x";var m3a="format";var s0i="pes";var L9i="N";var G8S="Tex";var M3a="momentStrict";var g3i=550;var O0N="DateTime";var V9E="wrapper";var D8E="ope";var r6i="ry";var n9E="tle";var B4S="ice";var l7i="_con";var t9N="ca";var b3E="labe";var U1i="><";var g8N='Sun';var C5E="co";var r7i="rot";var X5S="disable";var G6i="e ";var p8N='Second';var S3i="_insta";var P6E='close';var l8S="lab";var J3i="ef";var z8i="ield";var E1N="DTE_Inline_Field";var d8i="di";var z6i="r";var G9i="rDynamicI";var b9i="ions";var I6i="mod";var S7i="aye";var k1N="DTE_Action_Edit";var U6E="ck";var g2N="im";var a9i="os";var R1a='editor-datetime';var e9i="_fi";var A4a="Tim";var w3a="setUTCDate";var f7N='DT_RowId';var l5a="spla";var r8E="T";var M4E="Content";var f0i='"><span></span></div>';var r3N="ur";var b2O=10;var a8E="spl";var o5S="po";var q4S="rea";var n9i="Ajax";var z2E="bubblePosition";var s6S="globalError";var e2i="ai";var O6a="getUTCFullYear";var B9a='scroll.';var o8N='December';var C5i="ssage";var Q5S="ate";var i7i="rotot";var G1E="splice";var M0E="<div";var W9E="addClass";var l7E="close";var Y3E="opts";var S0E="_formOptions";var Q6i="ls";var B3S="preventDefault";var O9E="_animate";var h3a="_setCalander";var r0N="inde";var j6i="u";var j5i="E";var S1i="me";var G2i="ont";var K1S="tab";var b8E="tainer";var N9S="appen";var K6S="wi";var s8i="ad";var k0E="\"></";var L7i="oty";var x6S="rror";var a2i="addC";var M5E="lock";var H5i="DTE_Form_Er";var I8i="bu";var X1i="\" ";var H3E="ng";var n3E="detach";var k2O=11;var R8N='am';var x2i="_m";var t7S="ssing";var V4a="parts";var V3N='row';var v7i="leMai";var A9E="_d";var p7i="t()";var T0S="funct";var I2S="onBlur";var V8N='Hour';var a2E="utto";var f2O=27;var u8N='September';var k6i="ust";var V0E="lu";var l1i="la";var O2O=59;var t7i="va";var t0i="data";var T0i="oApi";var Q8i="tton";var N5S="pre";var G2E="actio";var j7i="op";var g9E="content";var e7N="abl";var d9i="eate";var T9S='addBack';var l9i="ws?";var f3N="ey";var k2E="ngt";var d2S="ppend";var y7i="ototyp";var X6i="nges";var D7E='click.DTED_Lightbox';var T3E="isMultiValue";var I9a="scr";var k6E="lay";var c1N="DTE_Field_Type_";var w5S="displayed";var S1E="valFromData";var U0E="ct";var B8S="functi";var Y9E="_dte";var g5N="ete";var V9a="getU";var L3i="defa";var d2E="appendTo";var U7S="proce";var T6S="Fields";var R4i="versionCheck";var G3i="DTE_Bubble_Tri";var q1E="header";var x5E="mit";var q2N="=\"";var e1E="add";var C7E="windowPadding";var N9E="ra";var l6i="an";var e7i="tot";var Y5i="es";var G7N="This input can be edited individually, but not part of a group.";var g8E="displayController";var U6N="pa";var c7E="height";var Q9E="Lightbox";var X6S='inline';var I3a="match";var p1a="datetime";var w8i="1";var m8i="ose";var b3i="orFi";var R0i="i18n";var w6S="eplace";var k5E="set";var l5E='block';var A8i="1.10.";var p3S="am";var I9i="typ";var j2i="container";var B9E="rapper";var B7i="ubm";var t5i="mul";var T5i="ti-noEdit";var U2i="func";var R5i="DTE DTE_";var H7E="mate";var A0E="sag";var h3E="def";var f9S="one";var S5i="DTE_Heade";var v0N="sel";var S5S='open';var c2O=2;var t3E="eFn";var Z8i="undepen";var r2E="left";var v0E="ajax";var n4E="ou";var h2i="abled";var R5a="np";var S9i="_c";var w2E='top';var B5i="info";var T6N="par";var b9E="round";var L2i="con";var T9E="background";var D0E="su";var e4E="apper";var E3i="i1";var Q8S="js";var x3i="Date";var F7i="rro";var Z4i=" ";var z2S="closeIcb";var F9i="_formOpt";var V7S='node';var P7i="de";var P2i='body';var V9N="[";var k0i='"></div>';var b9S="modifier";var B2i="ss";var B1i="<div ";var Y9S="Opt";var f1E="ields";var d5i="Buttons";var b6i="Aug";var N7E="target";var N9i="proto";var b4i="leng";var C3S="ludeFields";var v9i=" you sure you wish to delete %d ro";var n8S="upload";var Q4i="Editor";var R8E="ntent";var p5E='>';var I3N="S";var o3i=500;var d0E="blu";var y9i="prot";var J5i="Info";var w5i="TE_Footer";var X0E="s=";var x2E="tt";var E8E="style";var m9i="dy";var D8N='July';var K3a="date";var W9i="_clea";var g5E="ep";var t6S="ids";var W6i=" sure you wish to delet";var G5i="las";var J7N="defaults";var q2i="unshift";var R5E="tr";var i7a="Da";var j6a="disab";var m7E="pper";var X2i="classes";var Q5i="_Create";var m6i="formOp";var O5E="is";var O6i="A";var y8i="mode";var N5E='&';var I0i="id";var R6N="acti";var d3S="ion";var d9S="ace";var x7E="off";var T3S="eyCode";var Z4E="per";var d6a="setUTCMonth";var h9S="_focus";p1ff.h3f();var P2E="ubble";var C3E="no";var I4i="fn";var y1N="DTE_Form_Buttons";var t6N="rents";var Y3i="angle";var t6i="i";var b3N="toLowerCase";var w2i="sg";var k3i="el";var U8i="oller";var H4S="\">";var W2E='_basic';var G9a='</td>';var u3E="fo";var v9E="se";var A4S="od";var u7i="otyp";var c9i="reope";var t2E="etac";var k9S="multiGet";var t0S="ri";var F8i="rs";var x8E="itle";var K5a='click';var L1i="g";var D9i="Delet";var b1N="multi-restore";var V8i="w";var O0i="dom";var j8i="ie";var Y1N="ten";var H9i="fieldFrom";var i1E="fier";var c0E="_fo";var m0i="settings";var K6i="le values";var x8a="_optio";var C1E="rce";var e3i="ds";var q2E="_closeReg";var I2E="title";var Q7E="_heightCalc";var u1i="nd";var F9E="ckg";var m4i="tor";var u0i="da";var R0E="blur";var Z3i=60;var e1S="TableTools";var F0N='selected';var P3i="il";var O9i="to";var V1a='YYYY-MM-DD';var V5a="ainer";var P7N='submitComplete';var c8i="Data";var X2O=25;var g0i="fieldTy";var x7N="Close";var I2i="slice";var d0i="exte";var v8i="den";var B7E="onten";var r9S="multiSet";var o5E="ue";var Q8N="dra";var N3E="us";var F5i="nfo";var s5i="_";var A1N="DTE_Field_StateError";var D9E="pp";var M1N="DTE_Bubble_Background";var p3E='input';var U6a="tSe";var D1i="bel";var P0i='">';var y6E="li";var X7N='lightbox';var i1N="DTE_Body";var h9i="pr";var o3S="dex";var j5S="rows";var Q2i="call";var N3N="displayFields";var Y5E="parent";var g1i="proces";var A0i="labelInfo";var U7i="pi";var D8i="utton";var P0E="butt";var p5i="ne";var g0S="cre";var I5i="on";var H1N="DTE_Bubble_Liner";var u2S="stop";var R2E="formError";var J2i="hasClass";var Z6S="formOptions";var w0E=".";var Q9N="onC";var p9S="ick";var k2S="urce";var a2N="moment";var d4i="dataTable";var M2i="ta";var D5i="DTE DTE";var S4a="ke";var F1i="<d";var J4i="Field";var J9a="sa";var m1E="ble";var g5i="DTE_Inline";var r5E="multiInfo";var g3N="lengt";var V5S="hi";var r1S="shift";var Y0i="models";var d4E="ght";var Z6i="tend";var T1E="modi";var M5i="TE_Fo";var N6x="editorFields";var e7a='<table class="';var c5E="isp";var A1E="ray";var q5i="disabl";var y3i="s";var Z3E="Cla";var a6i="Are you";var D7i="structor";var E2O=13;var u9i="ele";var l9E="ppe";var j2S="seIcb";var u8i="ub";var F3E="append";var d8N='Sat';var g8i="un";var c5i="_Field_Me";var y5i="ld_Info";var G0E="concat";var H3i="8";var m8S="nct";var r7S='rows().delete()';var m8N='action';var H5N="next";var w9i="totype";var w4N="filter";var S3S="_assembleMain";var y1E="ass";var j9S="_message";var h1N="DTE_Body_Content";var A4E="gr";var I6S="ge";var s6a='disabled';var K2N="classPrefix";var t1E="ade";var q8E="_h";var f5S="_fieldNames";var P7E='div.DTE_Body_Content';var i2i="dis";var O5i="mo";var k6N="_noProcessing";var L0S="index";var a2S="]";var Z8N='January';var C9S="cr";var E6S="attach";var c0i="label";var Y6N="Api";var T9N="ll";var x7S='cells().edit()';var V5i="Inli";var Y2E="submit";var C0E="dd";var w7i="displ";var R6E="8n";var X4E="outer";var G1S="_optionsUpdate";var j4E="body";var J1i="Id";var U9i="bmitTable";var a5N="options";var x5a="TC";var m0N="ut";var T4i='"]';var I6x="CLASS";var E1i="inpu";var u6E="html";var L0E="18n";var c7i="mu";var V4S="engt";var d6i="en";var Z4N="columns";var l5S="isAr";var A6i="ber";var Y6i="1 row?";var N0i="name";var K7N="Edit entry";var h7S="subm";var N6i="tions";var m6S="isA";var v6S="maybeOpen";var G1N="select";var E3N="umber";var x5i="rm";var q3S="bm";var J7S='remove';var g4S="_ev";var u6i="formO";var U1E="action";var o3E="ngth";var X3i="au";var N7a="maxDate";var h7i="ype";var a1i="wrap";var z3S="buttons";var d0S="rem";var Q1N="Arr";var T1S="idSrc";var s7i="cell";var V3E="input";var D8S="lue";var Z9a="getUTCDate";var F6i="ober";var p6S="map";var k2i="cont";var U4N="Type";var o6i="ptio";var E0i="multiValue";var H7i="totyp";var a7i="y";var r1E="field";var y0E="inc";var G3S="node";var S3E="Ids";var F0S="res";var S7N="Create new entry";var N5i="TE_Acti";var X7S="isPla";var t9i="bmit";var v4E="sty";var Z3S="key";var K3E="mult";var R5S="ow";var D5E="_event";var q7i="iste";var R6a="getUTCMonth";var L7S='editor()';var c1i="/d";var P9E="clo";var B8i="aults";var B6i="F";var a6E="ext";var s9S='.';var s0S="at";var c6i="W";var i2E="_clearDynamicInfo";var B4i="files";var z3E="display";var q5S='label';var h0E="_dataSource";var l1S="as";var R7i="ows()";var F2i="ab";var z4E="ma";var O9S="der";var x6a='month';var X2N="-t";var f7i="playNode";var W5i="ing";var u4N="any";var i7E="outerHeight";var V2i="val";var T7E='div.DTE_Header';var b7E="ff";var S1S="tabl";var C5S="ob";var n3S="create";var E6i="Mar";var b2S="ataSo";var m7i="ow()";var X8S="uplo";var h5i="-";var W5E="htm";var D6i="ged";var N2S="editOpts";var q7S="eac";var J7E="To";var F5S="roy";var w5E="fie";var m9S='edit';var i8N="DataTable";var A6N="ine";var p6i="si";var B3E="host";var G5S="rud";var G3E="isPlainObject";var E5i="bt";var M8N="indexes";var l0E="aj";var i4S="_limitLeft";var u5S='change';var i3N="dler";var m6x="ieldTyp";var n0i='</div>';var J3N="activeElement";var A7i="lin";var w6i="Mult";var u7E="lo";var d5S="sh";var u0S="_actionClass";var P7S="_editor";var p9i="_t";var o6S="toggleClass";var b5E="get";var r4E="div";var f6N="O";var Y7N='Previous';var B1N="DTE_Footer_Content";var W9N='postSubmit';var x7i="ot";var s8N='Tue';var Z7i="_assemb";var K0E="_preopen";var e3E="_msg";var c2S='focus.editor-focus';var k7S="confirm";var j9i="_p";var s9i="Cr";var H0i='</span>';var C8i="Table";var W0E="bubbleNodes";var H6i="ch";var w3S="pen";var w7S='files()';var n3i="t";var A3E="be";var N7i="row.cr";var X4i="cli";var e2O=12;var L6E="/div>";var f3E="eck";var O8E="wr";var i6N="act";var A9i="gacy";var t2i="tion";var S0i=null;var E7N="bServer";var U9N="onComplete";var Q9i="prototyp";var E2i="ner";var m3E="focu";var K7i="ispl";var f5E="sub";var d7i="().edit()";var m5i="D";var d7S="ve";var d5E="plac";var F0E="q";var M3S="_displayReorder";var e6i="ay";var D6E="bl";var P1N="DTE_Field_InputControl";var z7i="rototype";var m7S='button';var z9i="pe";var n5i="_I";var U3S="button";var o6N="_multiInfo";var E5S="template";var F4S="Co";var o1S="mp";var a7N="Delete";var R8i="pl";var i9i="otype";var T2S="eve";var p2E="form";var d6E="tiInfo";var x6N="edi";var L1N="icon close";var t0E="_tidy";var n7S="itl";var f5i="Fo";var a3i="fieldT";var g3S="ttr";var o1i="do";var y9N="_submitError";var P5a="Year";var Q0E="xte";var F1E="disp";var n5S="dest";var t7E="wra";var U6i="M";var M6i="ua";var V1i="ss=\"";var y2O=0;var f5a="setU";var S6i="ip";var V0N="tl";var P5S="jec";var P5i="DTE_";var J6i="Undo cha";var Z6N="ml";var T7i="ti";var i3S="prev";var U7E="scrollTop";var h6i="p";var H7S="messa";var r2i="er";var W7N="A system error has occurred (<a target=\"_blank\" href=\"//datatables.net/tn/12\">More information</a>).";var N7S="show";var p8E="ent";var y5S="find";var k4i="th";var L4i=false;var Q3E="cus";var M7i="iel";var E7i="yp";var x4i="clic";var j2O=1;var e3N="ach";var z1N="DTE_Form_Content";var w9a='<button class="';var S7S='xhr.dt';var P3N="ec";var d1S="dat";var L4S="iv>";var c3E="U";var i4i="each";var A6E='focus';var U2E="_eve";var e1N="DTE_Action_Remove";var o4i='';var b7i="protot";var M9i="ode";var z0i=' ';var K7S="na";var n2O=7;var j7a="r>";var m2i="app";var v8S='value';var q1i="\"";var J5E='none';var u8S="attr";var k8N="sArray";var L5i="ror";var U5i="ed";var z4S="igger";var H9E="al";var A3i="ex";var i5E="len";var M3i="ul";var C7i="ltiSet";var s7S="ove";var g6i="ns";var Q2S='submit';var g4i='s';var K3i="ce";var P9i="le";var T0E="bub";var F5E="own";var l5i="able";var j8S="ac";var J2O=24;var I7i="eate()";var g9S='div.';var d5a=":";var g3E="multiIds";var q7N="eat";var l8N='June';var B2S="closeCb";var y2E="focus";var Y9i="ro";var v5E="processing";var t1N="DTE_Processing_Indicator";var q9i="_su";var N1S="ax";var J9N="dataTableExt";var T7S="_processing";var d9E="_show";var R4a="inp";var F3i="edit";var G0i="ispla";var h1i="or";var v7S="join";var l9S="indexOf";var j0i="className";var C1i="lt";var A5i="Label";var f6i="The selected items contain different values for this input. To edit and set al";var C1N="DTE_Label";var m3S="class";var T1N="DTE_Header";var G7i="troy";var m2E="pend";var o8E="extend";var K2i="erro";var X9S="_eventName";var G5E="st";var c3a="minDate";var R9a="getUTCMont";var h8i="eld";var e4i="bject";var o0S="remo";var n6E='all';var J5a="put";var i6i="te";var o8i="ackgro";var E7E="box";var Y5S="Arg";var o2i="asC";var a5i="process";var T8i="del";var p6E="ength";var V7i=".edi";var V0i="fieldTypes";var M2O=20;var T1i="v>";var n6i="Oct";var j3i="io";var t8i="els";var k9i="prototy";var Y1E="rder";var f8E="ound";var L6i="Febr";var T9i="pro";var v8N='April';var g7i="e()";var x0i="_typeFn";var h8N="Cl";var C6S="ind";var K4i="essing";var P2O=4;var O0E="bubble";var N2N="ass=\"";var k9E="_a";var o8S="safeId";var l8i="clea";var H2i="removeClass";var R9i="_w";var E4i='object';var p2S="_blur";var S2S="fin";var c0S="status";var R6i="change";var Z5S="P";var r9i="_e";var v3E="error";var Z9i="re";var B6a='minutes';var r4i=true;var o7i="ploa";var x9i="gs";var a5E="ible";var h5S="event";var A2i="css";var A5S="ja";var s6E="ht";var X9N="_submitSuccess";var X7i="dit";var x6i="l items for this input to the same value, click or tap here, otherwise they will retain their individual values.";var l7a="<t";var X5E="multiValues";var w3i="Time";var x4E="ap";var C6N='preOpen';var F7S="emove";var h4i="push";var Q7i="reg";var Q2E="ons";var t1i="/di";var b5i="ld_Input";var S4i="proc";var w7N="New";var z2O=z3i;z2O+=y3i;z2O+=j3i;z2O+=c3i;var B2O=C3i;B2O+=P3i;B2O+=p1ff.q3i;B2O+=y3i;var h2O=A3i;h2O+=n3i;var T2O=F3i;T2O+=b3i;T2O+=k3i;T2O+=e3i;var t2O=A3i;t2O+=n3i;var r6O=E3i;r6O+=H3i;r6O+=c3i;var M6O=L3i;M6O+=M3i;M6O+=r3i;var L6O=p1ff.N3i;L6O+=J3i;L6O+=X3i;L6O+=f3i;var H6O=x3i;H6O+=w3i;var E6O=S3i;E6O+=c3i;E6O+=K3i;var e6O=x3i;e6O+=w3i;var D8T=a3i;D8T+=W3i;var t9T=G3i;t9T+=Y3i;var U9T=O3i;U9T+=Z5i;U9T+=v5i;U9T+=l5i;var q9T=D5i;q9T+=u5i;q9T+=o5i;var Q9T=g5i;Q9T+=s5i;Q9T+=d5i;var I9T=R5i;I9T+=V5i;I9T+=p5i;var N9T=m5i;N9T+=N5i;N9T+=I5i;N9T+=Q5i;var m9T=q5i;m9T+=U5i;var p9T=t5i;p9T+=T5i;var V9T=i5i;V9T+=h5i;V9T+=B5i;var R9T=z5i;R9T+=y5i;var d9T=O3i;d9T+=j5i;d9T+=c5i;d9T+=C5i;var s9T=P5i;s9T+=A5i;s9T+=n5i;s9T+=F5i;var g9T=z5i;g9T+=b5i;var o9T=O3i;o9T+=k5i;o9T+=e5i;o9T+=s5i;var u9T=p1ff[225154];u9T+=n3i;u9T+=c3i;var D9T=E5i;D9T+=c3i;var l9T=H5i;l9T+=L5i;var v9T=m5i;v9T+=M5i;v9T+=r5i;v9T+=J5i;var Z9T=X5i;Z9T+=s5i;Z9T+=f5i;Z9T+=x5i;var O6T=m5i;O6T+=w5i;var Y6T=S5i;Y6T+=K5i;var G6T=a5i;G6T+=W5i;var W6T=p1ff.T3i;W6T+=G5i;W6T+=y3i;W6T+=Y5i;var U3T=O5i;U3T+=p1ff.N3i;U3T+=k3i;U3T+=y3i;var q3T=A3i;q3T+=Z6i;var Q3T=p1ff.T3i;Q3T+=v6i;Q3T+=l6i;Q3T+=D6i;var I3T=u6i;I3T+=o6i;I3T+=g6i;var N3T=p1ff.q3i;N3T+=s6i;N3T+=d6i;N3T+=p1ff.N3i;var m3T=R6i;m3T+=p1ff.N3i;var p3T=s5i;p3T+=V6i;p3T+=p6i;p3T+=p1ff.T3i;var V3T=m6i;V3T+=N6i;var R3T=I6i;R3T+=p1ff.q3i;R3T+=Q6i;var d3T=p1ff.q3i;d3T+=q6i;d3T+=Z6i;var s3T=U6i;s3T+=t6i;s3T+=T6i;s3T+=i6i;var g3T=h6i;g3T+=p1ff[261600];var o3T=B6i;o3T+=z6i;o3T+=t6i;var u3T=y6i;u3T+=j6i;var D3T=c6i;D3T+=U5i;var l3T=U6i;l3T+=p1ff[50755];l3T+=c3i;var v3T=C6i;v3T+=P6i;v3T+=A6i;var Z3T=n6i;Z3T+=F6i;var O28=b6i;O28+=k6i;var Y28=U6i;Y28+=e6i;var G28=E6i;G28+=H6i;var W28=L6i;W28+=M6i;W28+=r6i;var a28=J6i;a28+=X6i;var K28=f6i;K28+=x6i;var S28=w6i;S28+=S6i;S28+=K6i;var w28=a6i;w28+=W6i;w28+=G6i;w28+=Y6i;var x28=O6i;x28+=Z9i;x28+=v9i;x28+=l9i;var f28=D9i;f28+=p1ff.q3i;var X28=m5i;X28+=u9i;X28+=i6i;var J28=o9i;J28+=g9i;var r28=s9i;r28+=d9i;var M28=R9i;M28+=V9i;M28+=z6i;M28+=e6i;var B28=p9i;B28+=t6i;B28+=m9i;var I28=N9i;I28+=I9i;I28+=p1ff.q3i;var s08=Q9i;s08+=p1ff.q3i;var S18=q9i;S18+=U9i;var D18=q9i;D18+=t9i;var l18=T9i;l18+=n3i;l18+=i9i;var G48=h9i;G48+=p1ff[50755];G48+=B9i;G48+=z9i;var w48=y9i;w48+=p1ff[50755];w48+=I9i;w48+=p1ff.q3i;var L48=j9i;L48+=c9i;L48+=c3i;var H48=N9i;H48+=C9i;var a88=T9i;a88+=n3i;a88+=p1ff[50755];a88+=C9i;var b88=s5i;b88+=P9i;b88+=A9i;b88+=n9i;var L78=F9i;L78+=b9i;var H78=y9i;H78+=p1ff[50755];H78+=C9i;var n78=k9i;n78+=z9i;var P78=e9i;P78+=E9i;var y78=s5i;y78+=H9i;y78+=L9i;y78+=M9i;var X98=r9i;X98+=p1ff.N3i;X98+=g9i;var J98=y9i;J98+=p1ff[50755];J98+=J9i;J98+=z9i;var I98=h9i;I98+=X9i;I98+=z9i;var d98=f9i;d98+=x9i;var s98=T9i;s98+=w9i;var Y68=S9i;Y68+=K9i;Y68+=a9i;Y68+=p1ff.q3i;var G68=k9i;G68+=h6i;G68+=p1ff.q3i;var X68=W9i;X68+=G9i;X68+=F5i;var J68=h6i;J68+=Y9i;J68+=O9i;J68+=C9i;var c68=Z7i;c68+=v7i;c68+=c3i;var F58=h9i;F58+=p1ff[50755];F58+=n3i;F58+=i9i;var S2W=l7i;S2W+=D7i;var w2W=y9i;w2W+=u7i;w2W+=p1ff.q3i;var k0W=j6i;k0W+=o7i;k0W+=p1ff.N3i;var c0W=p1ff.q3i;c0W+=z6i;c0W+=Y9i;c0W+=z6i;var h0W=p1ff[50755];h0W+=c3i;var i0W=C3i;i0W+=t6i;i0W+=K9i;i0W+=g7i;var t0W=s7i;t0W+=d7i;var m0W=z6i;m0W+=R7i;m0W+=V7i;m0W+=p7i;var p0W=z6i;p0W+=m7i;p0W+=V7i;p0W+=p7i;var R0W=N7i;R0W+=I7i;var G1W=Q7i;G1W+=q7i;G1W+=z6i;var W1W=O6i;W1W+=U7i;var a1W=t7i;a1W+=K9i;var M1W=T7i;M1W+=n3i;M1W+=K9i;M1W+=p1ff.q3i;var L1W=h6i;L1W+=i7i;L1W+=h7i;var P1W=y3i;P1W+=B7i;P1W+=g9i;var C1W=h6i;C1W+=z7i;var B1W=h6i;B1W+=z6i;B1W+=y7i;B1W+=p1ff.q3i;var i1W=y3i;i1W+=p1ff.q3i;i1W+=n3i;var Z1W=y9i;Z1W+=u7i;Z1W+=p1ff.q3i;var X4W=j7i;X4W+=p1ff.q3i;X4W+=c3i;var M4W=p1ff[50755];M4W+=C3i;M4W+=C3i;var L4W=h6i;L4W+=i7i;L4W+=h7i;var A4W=c7i;A4W+=C7i;var t4W=p1ff[261600];t4W+=p1ff[50755];t4W+=P7i;var q4W=T9i;q4W+=O9i;q4W+=C9i;var z8W=t6i;z8W+=c3i;z8W+=A7i;z8W+=p1ff.q3i;var B8W=y9i;B8W+=p1ff[50755];B8W+=n3i;B8W+=h7i;var i8W=n7i;i8W+=j5i;i8W+=F7i;i8W+=z6i;var U8W=b7i;U8W+=h7i;var I8W=k7i;I8W+=p1ff.q3i;var N8W=T9i;N8W+=e7i;N8W+=E7i;N8W+=p1ff.q3i;var s8W=T9i;s8W+=w9i;var g8W=T9i;g8W+=H7i;g8W+=p1ff.q3i;var o8W=C3i;o8W+=t6i;o8W+=K9i;o8W+=p1ff.q3i;var u8W=T9i;u8W+=n3i;u8W+=L7i;u8W+=z9i;var D8W=C3i;D8W+=M7i;D8W+=p1ff.N3i;D8W+=y3i;var l8W=y9i;l8W+=p1ff[50755];l8W+=C9i;var W7W=h6i;W7W+=r7i;W7W+=p1ff[50755];W7W+=C9i;var K7W=h6i;K7W+=J7i;K7W+=C9i;var J7W=p1ff.q3i;J7W+=X7i;var L7W=p1ff.N3i;L7W+=t6i;L7W+=y3i;L7W+=f7i;var H7W=h6i;H7W+=r7i;H7W+=x7i;H7W+=h7i;var e7W=w7i;e7W+=S7i;e7W+=p1ff.N3i;var k7W=h9i;k7W+=p1ff[50755];k7W+=w9i;var b7W=p1ff.N3i;b7W+=K7i;b7W+=p1ff[402431];b7W+=a7i;var n7W=T9i;n7W+=w9i;var i7W=W7i;i7W+=G7i;var T7W=h6i;T7W+=Y9i;T7W+=H7i;T7W+=p1ff.q3i;var r9W=P7i;r9W+=z9i;r9W+=Y7i;r9W+=O7i;var M9W=N9i;M9W+=n3i;M9W+=E7i;M9W+=p1ff.q3i;var e9W=Z8i;e9W+=v8i;e9W+=n3i;var U9W=h9i;U9W+=p1ff[50755];U9W+=H7i;U9W+=p1ff.q3i;var d9W=l8i;d9W+=z6i;var s9W=h6i;s9W+=Y9i;s9W+=B9i;s9W+=z9i;var e6W=p1ff[225154];e6W+=D8i;e6W+=y3i;var R6W=h9i;R6W+=p1ff[50755];R6W+=w9i;var h5W=p1ff[225154];h5W+=u8i;h5W+=p1ff[225154];h5W+=P9i;var i5W=N9i;i5W+=J9i;i5W+=z9i;var V5W=p1ff[225154];V5W+=o8i;V5W+=g8i;V5W+=p1ff.N3i;var R5W=N9i;R5W+=n3i;R5W+=h7i;var f3W=s8i;f3W+=p1ff.N3i;var X3W=Q9i;X3W+=p1ff.q3i;var S4=d8i;S4+=y3i;S4+=R8i;S4+=e6i;var w4=z6i;w4+=p1ff[50755];w4+=V8i;var x4=p8i;x4+=a9i;x4+=p1ff.q3i;var f4=p1ff[225154];f4+=K9i;f4+=j6i;f4+=z6i;var X4=p8i;X4+=m8i;var J4=N8i;J4+=n3i;var r4=u6i;r4+=o6i;r4+=c3i;r4+=y3i;var M4=I8i;M4+=Q8i;var L4=p1ff[261600];L4+=p1ff[50755];L4+=P7i;L4+=Q6i;var H4=d8i;H4+=q8i;H4+=U8i;var E4=I6i;E4+=t8i;var e4=I6i;e4+=p1ff.q3i;e4+=Q6i;var k4=p1ff.N3i;k4+=p1ff[50755];k4+=p1ff[261600];var b4=O5i;b4+=T8i;b4+=y3i;var F4=O5i;F4+=p1ff.N3i;F4+=p1ff.q3i;F4+=Q6i;var n4=i8i;n4+=h8i;var A4=P7i;A4+=C3i;A4+=B8i;var P4=B6i;P4+=z8i;var C4=y8i;C4+=Q6i;var c4=B6i;c4+=j8i;c4+=K9i;c4+=p1ff.N3i;var T6=c8i;T6+=C8i;var t6=j5i;t6+=P8i;var q6=A8i;q6+=p1ff.t3i;var Q6=n8i;Q6+=p1ff.q3i;Q6+=F8i;Q6+=b8i;var I6=C3i;I6+=c3i;'use strict';(function(){var W1f=p1ff;var u4i='DataTables Editor trial info - ';var m3i=1615075200;var v4i="5";var Y2O=51;var W8i="es Editor\n";var G8i="\n";var M8i="e873";var Y8i="bdac";var R3i=1000;var x8i="ired";var a8i="Thank you for trying DataTabl";var V3i=5881;var v3i=83;var K8i="ur trial has now expired. To purchase a license ";var X8i=" Tria";var e8i="2f32";var D4i="log";var E8i="68b3";var l4i="cc1";var H8i=8063981021;var k8i="getT";var f8i="l exp";var s4i=' remaining';var S8i="Yo";var L8i="getTime";var J8i="Editor -";var r8i="d344";var O8i='for Editor, please see https://editor.datatables.net/purchase';var l6=k8i;l6+=t6i;l6+=p1ff[261600];l6+=p1ff.q3i;var v6=p1ff.Q3i;v6+=p1ff.t3i;v6+=p1ff.I3i;v6+=H3i;var Z6=p1ff.T3i;Z6+=p1ff.q3i;Z6+=t6i;Z6+=K9i;W1f.S5=function(w5){W1f.S3f();if(W1f && w5)return W1f.i5(w5);};W1f.L5=function(H5){W1f.S3f();if(W1f)return W1f.h5(H5);};W1f.k5=function(b5){W1f.S3f();if(W1f && b5)return W1f.i5(b5);};W1f.A5=function(P5){if(W1f && P5)return W1f.h5(P5);};var remaining=Math[W1f.A5(e8i)?p1ff.i3i:Z6]((new Date((W1f.F5(E8i)?H8i:m3i) * (W1f.k5(v6)?V3i:R3i))[l6]() - new Date()[L8i]()) / (R3i * (W1f.E5(M8i)?Y2O:Z3i) * Z3i * (W1f.L5(r8i)?v3i:J2O)));if(remaining <= y2O){var g6=J8i;g6+=X8i;g6+=f8i;g6+=x8i;var o6=w8i;o6+=p1ff.t3i;o6+=C3i;o6+=H3i;var u6=S8i;u6+=K8i;var D6=a8i;D6+=W8i;D6+=G8i;alert(D6 + (W1f.r5(Y8i)?p1ff.i3i:u6) + O8i);throw W1f.X5(o6)?g6:p1ff.i3i;}else if(remaining <= n2O){var m6=Z4i;m6+=p1ff.N3i;m6+=p1ff[402431];m6+=a7i;var p6=v4i;p6+=p1ff.U3i;p6+=p1ff.N3i;p6+=p1ff.U3i;var R6=p1ff.t3i;R6+=l4i;var s6=p1ff.q3i;s6+=H3i;s6+=p1ff[402431];s6+=v4i;W1f.a5=function(K5){W1f.h3f();if(W1f && K5)return W1f.h5(K5);};console[W1f.x5(s6)?D4i:p1ff.i3i]((W1f.S5(R6)?p1ff.i3i:u4i) + remaining + (W1f.a5(p6)?p1ff.i3i:m6) + (remaining === j2O?o4i:g4i) + s4i);}})();var DataTable=$[I6][d4i];if(!DataTable || !DataTable[Q6] || !DataTable[R4i](q6)){throw new Error(V4i);}var Editor=function(opts){var p4i="onstruc";var N4i="DataTables Editor must be initialised as a 'new' instance'";var U6=S9i;U6+=p4i;U6+=m4i;if(!(this instanceof Editor)){alert(N4i);}this[U6](opts);};DataTable[t6]=Editor;$[I4i][T6][Q4i]=Editor;var _editor_el=function(dis,ctx){var q4i="*";var U4i="[d";var t4i="ata-dte-e=\"";p1ff.h3f();var i6=q4i;i6+=U4i;i6+=t4i;if(ctx === undefined){ctx=document;}return $(i6 + dis + T4i,ctx);};var __inlineCounter=y2O;var _pluck=function(a,prop){p1ff.h3f();var out=[];$[i4i](a,function(idx,el){p1ff.S3f();out[h4i](el[prop]);});return out;};var _api_file=function(name,id){var C4i="le ";var y4i="able ";p1ff.h3f();var z4i="in t";var P4i="id ";var c4i="own fi";var j4i="Unkn";var table=this[B4i](name);var file=table[id];if(!file){var B6=Z4i;B6+=z4i;B6+=y4i;var h6=j4i;h6+=c4i;h6+=C4i;h6+=P4i;throw h6 + id + B6 + name;}return table[id];};var _api_files=function(name){var n4i='Unknown file table name: ';var z6=A4i;z6+=K9i;z6+=Y5i;if(!name){return Editor[B4i];}var table=Editor[z6][name];if(!table){throw n4i + name;}return table;};var _objectKeys=function(o){var F4i="hasOwnProperty";var out=[];for(var key in o){if(o[F4i](key)){out[h4i](key);}}return out;};var _deepCompare=function(o1,o2){var M4i="bje";var j6=b4i;j6+=k4i;var y6=p1ff[50755];y6+=e4i;if(typeof o1 !== y6 || typeof o2 !== E4i){return o1 == o2;}var o1Props=_objectKeys(o1);var o2Props=_objectKeys(o2);if(o1Props[j6] !== o2Props[H4i]){return L4i;}for(var i=y2O,ien=o1Props[H4i];i < ien;i++){var c6=p1ff[50755];c6+=M4i;c6+=p1ff.T3i;c6+=n3i;var propName=o1Props[i];if(typeof o1[propName] === c6){if(!_deepCompare(o1[propName],o2[propName])){return L4i;}}else if(o1[propName] != o2[propName]){return L4i;}}return r4i;};Editor[J4i]=function(opts,classes,host){var w4i="field-";var G1i="_fnS";var L0i='<div data-dte-e="msg-multi" class="';var k1i="te-e=\"input-co";var N1i="eldInfo";var r0i="restore";var y0i="typePrefix";var x1i="<label da";var v2i='msg-label';var z1i="data-dte-e=\"msg-error\" cla";var K1i="amePref";var v0i="oDa";var w1i="ta-dte-e=\"label\" class=\"";var f1i="for=\"";var F0i='<div data-dte-e="input" class="';var M0i="multiRestore";var I1i="sg-info";var e1i="ntrol\" class=\"";var D0i="romData";var W0i="control";var C0i='<div data-dte-e="msg-label" class="';var b1i="iv data-d";var W4i="msg-mes";var H1i="bel>";var Y4i="msg";var R1i="ing\" cla";var l2i='multi-value';var n1i="lass=\"";var K0i="epe";var a4i="msg-mul";var Q1i="g-m";var A1i="<span data-dte-e=\"multi-info\" c";var J0i='<div data-dte-e="msg-message" class="';var o0i="aProp";var Z0i="valT";var p2i="multiReturn";var Z2i='input-control';var l0i="valF";var Z1i="ms";var W1i="iv c";var D2i='multi-info';var X0i='<div data-dte-e="msg-info" class="';var d1i="te-e=\"field-process";var G4i="sage";var v1i="g-info";var e0i='<div data-dte-e="multi-value" class="';var b0i="inputControl";var Q0i='DTE_Field_';var s1i="<div data-d";var Y1i="etObjectData";var P1i="iInf";var O4i="-error";var a0i="input-";var i1i="msg-er";var p0i="Error adding field - unknown field type ";var U0i="Prop";var M1i="-label";var r1i="safe";var G9=n3i;G9+=a7i;G9+=z9i;var W9=X4i;W9+=p1ff.T3i;W9+=f4i;var X9=x4i;X9+=f4i;var J9=p1ff[50755];J9+=c3i;var r9=p1ff.N3i;r9+=p1ff[50755];r9+=p1ff[261600];var M9=w4i;M9+=S4i;M9+=K4i;var L9=a4i;L9+=T7i;var H9=W4i;H9+=G4i;var E9=Y4i;E9+=O4i;var e9=Z1i;e9+=v1i;var k9=l1i;k9+=D1i;var b9=p1ff.q3i;b9+=s6i;b9+=p1ff.q3i;b9+=u1i;var F9=o1i;F9+=p1ff[261600];var j9=g1i;j9+=y3i;j9+=W5i;var y9=s1i;y9+=d1i;y9+=R1i;y9+=V1i;var z9=p1i;z9+=d8i;z9+=n8i;z9+=m1i;var B9=A4i;B9+=N1i;var h9=p1ff[261600];h9+=I1i;var i9=p1ff[261600];i9+=p1ff.q3i;i9+=y3i;i9+=G4i;var T9=Z1i;T9+=Q1i;T9+=p1ff.q3i;T9+=C5i;var t9=q1i;t9+=U1i;t9+=t1i;t9+=T1i;var U9=i1i;U9+=z6i;U9+=h1i;var q9=B1i;q9+=z1i;q9+=V1i;var Q9=p1i;Q9+=p1ff.N3i;Q9+=y1i;Q9+=m1i;var I9=q1i;I9+=m1i;var N9=j1i;N9+=c1i;N9+=t6i;N9+=T1i;var m9=t6i;m9+=c3i;m9+=C3i;m9+=p1ff[50755];var p9=c7i;p9+=C1i;p9+=P1i;p9+=p1ff[50755];var V9=A1i;V9+=n1i;var R9=T7i;R9+=n3i;R9+=P9i;var d9=F1i;d9+=b1i;d9+=k1i;d9+=e1i;var s9=E1i;s9+=n3i;var g9=p1i;g9+=l1i;g9+=H1i;var o9=Z1i;o9+=L1i;p1ff.h3f();o9+=M1i;var u9=K9i;u9+=p1ff[402431];u9+=p1ff[225154];u9+=k3i;var D9=q1i;D9+=m1i;var l9=r1i;l9+=J1i;var v9=X1i;v9+=f1i;var Z9=x1i;Z9+=w1i;var O6=q1i;O6+=m1i;var Y6=c3i;Y6+=p1ff[402431];Y6+=S1i;var G6=c3i;G6+=K1i;G6+=t6i;G6+=q6i;var W6=n3i;W6+=a7i;W6+=h6i;W6+=p1ff.q3i;var a6=a1i;a6+=z9i;a6+=z6i;var w6=F1i;w6+=W1i;w6+=n1i;var x6=G1i;x6+=Y1i;x6+=O1i;var f6=Z0i;f6+=v0i;f6+=n3i;f6+=p1ff[402431];var M6=l0i;M6+=D0i;var L6=p1ff.q3i;L6+=q6i;L6+=n3i;var E6=p1ff.N3i;E6+=p1ff[402431];E6+=n3i;E6+=p1ff[402431];var k6=u0i;k6+=n3i;k6+=o0i;var F6=t6i;F6+=p1ff.N3i;var n6=g0i;n6+=s0i;var A6=A3i;A6+=n3i;A6+=d6i;A6+=p1ff.N3i;var P6=L3i;P6+=j6i;P6+=f3i;var C6=d0i;C6+=u1i;var that=this;var multiI18n=host[R0i][i5i];opts=$[C6](r4i,{},Editor[J4i][P6],opts);if(!Editor[V0i][opts[C9i]]){throw p0i + opts[C9i];}this[y3i]=$[A6]({},Editor[J4i][m0i],{type:Editor[n6][opts[C9i]],name:opts[N0i],classes:classes,host:host,opts:opts,multiValue:L4i});if(!opts[F6]){var b6=c3i;b6+=p1ff[402431];b6+=p1ff[261600];b6+=p1ff.q3i;opts[I0i]=Q0i + opts[b6];}if(opts[k6]){var e6=p1ff.N3i;e6+=q0i;e6+=U0i;opts[t0i]=opts[e6];}if(opts[E6] === o4i){var H6=p1ff.N3i;H6+=p1ff[402431];H6+=n3i;H6+=p1ff[402431];opts[H6]=opts[N0i];}var dtPrivateApi=DataTable[L6][T0i];this[M6]=function(d){var i0i="_fnGetObj";var h0i="ectData";var B0i='editor';var X6=p1ff.N3i;X6+=p1ff[402431];X6+=n3i;X6+=p1ff[402431];var r6=i0i;r6+=h0i;r6+=O1i;return dtPrivateApi[r6](opts[X6])(d,B0i);};this[f6]=dtPrivateApi[x6](opts[t0i]);var template=$(w6 + classes[a6] + z0i + classes[y0i] + opts[W6] + z0i + classes[G6] + opts[Y6] + z0i + opts[j0i] + O6 + Z9 + classes[c0i] + v9 + Editor[l9](opts[I0i]) + D9 + opts[u9] + C0i + classes[o9] + P0i + opts[A0i] + n0i + g9 + F0i + classes[s9] + P0i + d9 + classes[b0i] + k0i + e0i + classes[E0i] + P0i + multiI18n[R9] + V9 + classes[p9] + P0i + multiI18n[m9] + H0i + N9 + L0i + classes[M0i] + I9 + multiI18n[r0i] + Q9 + q9 + classes[U9] + t9 + J0i + classes[T9] + P0i + opts[i9] + n0i + X0i + classes[h9] + P0i + opts[B9] + z9 + n0i + y9 + classes[j9] + f0i + n0i);var input=this[x0i](w0i,opts);if(input !== S0i){var C9=h9i;C9+=K0i;C9+=c3i;C9+=p1ff.N3i;var c9=a0i;c9+=W0i;_editor_el(c9,template)[C9](input);}else {var n9=c3i;n9+=p1ff[50755];n9+=c3i;n9+=p1ff.q3i;var A9=p1ff.N3i;A9+=G0i;A9+=a7i;var P9=p1ff.T3i;P9+=y3i;P9+=y3i;template[P9](A9,n9);}this[F9]=$[b9](r4i,{},Editor[J4i][Y0i][O0i],{container:template,inputControl:_editor_el(Z2i,template),label:_editor_el(k9,template),fieldInfo:_editor_el(e9,template),labelInfo:_editor_el(v2i,template),fieldError:_editor_el(E9,template),fieldMessage:_editor_el(H9,template),multi:_editor_el(l2i,template),multiReturn:_editor_el(L9,template),multiInfo:_editor_el(D2i,template),processing:_editor_el(M9,template)});this[r9][i5i][J9](X9,function(){p1ff.S3f();var u2i="adonly";var g2i="multiEd";var s2i="itable";var K9=z6i;K9+=p1ff.q3i;K9+=u2i;var S9=I9i;S9+=p1ff.q3i;var w9=v6i;w9+=o2i;w9+=G5i;w9+=y3i;var x9=g2i;x9+=s2i;var f9=p1ff[50755];f9+=h6i;f9+=r3i;if(that[y3i][f9][x9] && !template[w9](classes[d2i]) && opts[S9] !== K9){var a9=C3i;a9+=p1ff[50755];a9+=R2i;a9+=y3i;that[V2i](o4i);that[a9]();}});this[O0i][p2i][I5i](W9,function(){p1ff.h3f();that[M0i]();});$[i4i](this[y3i][G9],function(name,fn){p1ff.h3f();if(typeof fn === p1ff.h3i && that[name] === undefined){that[name]=function(){var O9=m2i;O9+=K9i;O9+=a7i;var Y9=s5i;Y9+=C9i;Y9+=B6i;Y9+=c3i;var args=Array[N2i][I2i][Q2i](arguments);args[q2i](name);var ret=that[Y9][O9](that,args);return ret === undefined?that:ret;};}});};Editor[J4i][N2i]={def:function(set){var T2i='default';var D7=p1ff.N3i;D7+=p1ff.q3i;D7+=C3i;var Z7=j7i;p1ff.S3f();Z7+=r3i;var opts=this[y3i][Z7];if(set === undefined){var l7=U2i;l7+=t2i;var v7=p1ff.N3i;v7+=J3i;var def=opts[T2i] !== undefined?opts[T2i]:opts[v7];return typeof def === l7?def():def;}opts[D7]=set;return this;},disable:function(){var z2i="Clas";var c2i='disable';var s7=i2i;s7+=h2i;var g7=p8i;g7+=p1ff[402431];g7+=B2i;g7+=Y5i;var o7=s8i;o7+=p1ff.N3i;o7+=z2i;o7+=y3i;p1ff.h3f();var u7=p1ff.N3i;u7+=y2i;this[u7][j2i][o7](this[y3i][g7][s7]);this[x0i](c2i);return this;},displayed:function(){var d7=c3i;d7+=p1ff[50755];d7+=c3i;d7+=p1ff.q3i;var container=this[O0i][j2i];return container[C2i](P2i)[H4i] && container[A2i](n2i) != d7?r4i:L4i;},enable:function(){var b2i="asses";var N7=d6i;N7+=F2i;N7+=P9i;var m7=d8i;m7+=y3i;m7+=l5i;m7+=p1ff.N3i;var p7=p1ff.T3i;p7+=K9i;p7+=b2i;var V7=k2i;V7+=e2i;V7+=E2i;var R7=p1ff.N3i;R7+=p1ff[50755];R7+=p1ff[261600];this[R7][V7][H2i](this[y3i][p7][m7]);this[x0i](N7);return this;},enabled:function(){var I7=L2i;I7+=M2i;p1ff.S3f();I7+=n7i;I7+=r2i;return this[O0i][I7][J2i](this[y3i][X2i][d2i]) === L4i;},error:function(msg,fn){var Y2i="ain";var f2i="ieldE";var l3E='errorMessage';var S2i="sses";var z7=C3i;z7+=f2i;z7+=z6i;z7+=L5i;var B7=p1ff.N3i;B7+=p1ff[50755];B7+=p1ff[261600];var h7=x2i;h7+=w2i;var Q7=p8i;Q7+=p1ff[402431];Q7+=S2i;var classes=this[y3i][Q7];if(msg){var T7=K2i;T7+=z6i;var t7=a2i;t7+=W2i;var U7=p1ff.T3i;U7+=G2i;U7+=Y2i;U7+=r2i;var q7=p1ff.N3i;q7+=p1ff[50755];q7+=p1ff[261600];this[q7][U7][t7](classes[T7]);}else {var i7=O2i;i7+=Z3E;i7+=B2i;this[O0i][j2i][i7](classes[v3E]);}this[x0i](l3E,msg);return this[h7](this[B7][z7],msg,fn);},fieldInfo:function(msg){var D3E="eldIn";var c7=A4i;p1ff.S3f();c7+=D3E;c7+=u3E;var j7=p1ff.N3i;j7+=p1ff[50755];j7+=p1ff[261600];var y7=x2i;y7+=w2i;return this[y7](this[j7][c7],msg);},isMultiValue:function(){var C7=P9i;p1ff.S3f();C7+=o3E;return this[y3i][E0i] && this[y3i][g3E][C7] !== j2O;},inError:function(){var s3E="asse";var A7=p8i;A7+=s3E;A7+=y3i;p1ff.h3f();var P7=p1ff.N3i;P7+=p1ff[50755];P7+=p1ff[261600];return this[P7][j2i][J2i](this[y3i][A7][v3E]);},input:function(){var d3E="input, se";var R3E="lect, textarea";var b7=p1ff.N3i;b7+=p1ff[50755];b7+=p1ff[261600];var F7=d3E;F7+=R3E;var n7=I9i;n7+=p1ff.q3i;return this[y3i][n7][V3E]?this[x0i](p3E):$(F7,this[b7][j2i]);},focus:function(){var U3E='input, select, textarea';var I3E="peFn";var q3E="taine";var e7=m3E;e7+=y3i;var k7=n3i;k7+=h7i;if(this[y3i][k7][e7]){var H7=C3i;H7+=p1ff[50755];H7+=p1ff.T3i;H7+=N3E;var E7=s5i;E7+=n3i;E7+=a7i;E7+=I3E;this[E7](H7);}else {var r7=C3i;r7+=p1ff[50755];r7+=Q3E;var M7=L2i;M7+=q3E;M7+=z6i;var L7=p1ff.N3i;L7+=p1ff[50755];L7+=p1ff[261600];$(U3E,this[L7][M7])[r7]();}return this;},get:function(){var i3E='get';var J7=p9i;J7+=E7i;J7+=t3E;if(this[T3E]()){return undefined;}var val=this[J7](i3E);return val !== undefined?val:this[h3E]();},hide:function(animate){var y3E="slideUp";var j3E="lide";var X7=C3i;X7+=c3i;var el=this[O0i][j2i];if(animate === undefined){animate=r4i;}if(this[y3i][B3E][z3E]() && animate && $[X7][y3E]){var f7=y3i;f7+=j3E;f7+=c3E;f7+=h6i;el[f7]();}else {var S7=C3E;S7+=p5i;var w7=w7i;w7+=p1ff[402431];w7+=a7i;var x7=p1ff.T3i;x7+=y3i;x7+=y3i;el[x7](w7,S7);}return this;},label:function(str){var P3E="tml";var W7=v6i;W7+=P3E;var K7=K9i;K7+=p1ff[402431];K7+=A3E;K7+=K9i;var label=this[O0i][K7];var labelInfo=this[O0i][A0i][n3E]();if(str === undefined){var a7=v6i;a7+=n3i;a7+=p1ff[261600];a7+=K9i;return label[a7]();}label[W7](str);label[F3E](labelInfo);p1ff.S3f();return this;},labelInfo:function(msg){var k3E="lInfo";var Y7=b3E;Y7+=k3E;var G7=p1ff.N3i;G7+=p1ff[50755];G7+=p1ff[261600];return this[e3E](this[G7][Y7],msg);},message:function(msg,fn){p1ff.S3f();var E3E="fieldMessage";var O7=p1ff.N3i;O7+=p1ff[50755];O7+=p1ff[261600];return this[e3E](this[O7][E3E],msg,fn);},multiGet:function(id){var Z8=E0i;Z8+=y3i;var value;var multiValues=this[y3i][Z8];var multiIds=this[y3i][g3E];var isMultiValue=this[T3E]();p1ff.h3f();if(id === undefined){var l8=K9i;l8+=p1ff.q3i;l8+=H3E;l8+=k4i;var v8=n8i;v8+=p1ff[402431];v8+=K9i;var fieldVal=this[v8]();value={};for(var i=y2O;i < multiIds[l8];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {var D8=t7i;D8+=K9i;value=this[D8]();}return value;},multiRestore:function(){var L3E="_mu";var M3E="ltiValueC";var r3E="heck";var u8=L3E;u8+=M3E;u8+=r3E;this[y3i][E0i]=r4i;this[u8]();},multiSet:function(id,val){var w3E="alu";var J3E="_multiValu";var a3E="iValues";var x3E="multiV";var X3E="eCh";var V8=J3E;V8+=X3E;V8+=f3E;var R8=x3E;R8+=w3E;R8+=p1ff.q3i;var g8=i5i;g8+=S3E;var o8=K3E;o8+=a3E;var multiValues=this[y3i][o8];var multiIds=this[y3i][g8];if(val === undefined){val=id;id=undefined;}var set=function(idSrc,val){if($[W3E](multiIds) === -j2O){var s8=h6i;s8+=j6i;s8+=y3i;s8+=v6i;multiIds[s8](idSrc);}multiValues[idSrc]=val;};if($[G3E](val) && id === undefined){$[i4i](val,function(idSrc,innerVal){p1ff.h3f();set(idSrc,innerVal);});}else if(id === undefined){var d8=p1ff.q3i;d8+=p1ff[402431];d8+=p1ff.T3i;d8+=v6i;$[d8](multiIds,function(i,idSrc){p1ff.h3f();set(idSrc,val);});}else {set(id,val);}this[y3i][R8]=r4i;this[V8]();return this;},name:function(){p1ff.S3f();return this[y3i][Y3E][N0i];},node:function(){var p8=p1ff.N3i;p8+=p1ff[50755];p8+=p1ff[261600];return this[p8][j2i][y2O];},processing:function(set){var O3E="rocessing-field";var U8=h6i;U8+=O3E;var q8=C3E;q8+=c3i;q8+=p1ff.q3i;var Q8=p1ff.T3i;Q8+=y3i;Q8+=y3i;var I8=p1ff.N3i;I8+=p1ff[50755];I8+=p1ff[261600];if(set === undefined){var N8=d8i;N8+=Z5E;N8+=K9i;N8+=e6i;var m8=p1ff.N3i;m8+=p1ff[50755];m8+=p1ff[261600];return this[m8][v5E][A2i](N8) === l5E;}this[I8][v5E][Q8](n2i,set?l5E:q8);this[y3i][B3E][D5E](U8,[set]);return this;},set:function(val,multiCheck){var u5E="multiVal";var y5E="tiValueCheck";var t5E="entityDecode";var z5E="_mul";var B5E='set';var z8=p1ff[50755];z8+=h6i;z8+=n3i;z8+=y3i;var B8=u5E;B8+=o5E;var decodeFn=function(d){var q5E='\'';var m5E='<';var s5E="repla";var Q5E='£';var I5E='"';var U5E='\n';var h8=z6i;h8+=g5E;h8+=l1i;h8+=K3i;var i8=s5E;i8+=p1ff.T3i;i8+=p1ff.q3i;var T8=Z9i;T8+=d5E;T8+=p1ff.q3i;var t8=y3i;t8+=R5E;p1ff.S3f();t8+=t6i;t8+=H3E;return typeof d !== t8?d:d[V5E](/&gt;/g,p5E)[T8](/&lt;/g,m5E)[i8](/&amp;/g,N5E)[h8](/&quot;/g,I5E)[V5E](/&#163;/g,Q5E)[V5E](/&#39;/g,q5E)[V5E](/&#10;/g,U5E);};this[y3i][B8]=L4i;var decode=this[y3i][z8][t5E];if(decode === undefined || decode === r4i){if(Array[T5E](val)){var y8=i5E;y8+=h5E;for(var i=y2O,ien=val[y8];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}this[x0i](B5E,val);if(multiCheck === undefined || multiCheck === r4i){var j8=z5E;j8+=y5E;this[j8]();}return this;},show:function(animate){var A5E="sli";var n5E="eD";p1ff.h3f();var j5E="lideDo";var P5E="ntainer";var n8=y3i;n8+=j5E;n8+=V8i;n8+=c3i;var A8=p1ff.N3i;A8+=c5E;A8+=l1i;A8+=a7i;var P8=v6i;P8+=p1ff[50755];P8+=y3i;P8+=n3i;var C8=C5E;C8+=P5E;var c8=p1ff.N3i;c8+=p1ff[50755];c8+=p1ff[261600];var el=this[c8][C8];if(animate === undefined){animate=r4i;}if(this[y3i][P8][A8]() && animate && $[I4i][n8]){var F8=A5E;F8+=p1ff.N3i;F8+=n5E;F8+=F5E;el[F8]();}else {var k8=p1ff.N3i;k8+=K7i;k8+=e6i;var b8=p1ff.T3i;b8+=y3i;b8+=y3i;el[b8](k8,o4i);;}return this;},val:function(val){p1ff.h3f();return val === undefined?this[b5E]():this[k5E](val);},compare:function(value,original){var e5E="compare";p1ff.h3f();var compare=this[y3i][Y3E][e5E] || _deepCompare;return compare(value,original);},dataSrc:function(){return this[y3i][Y3E][t0i];},destroy:function(){var H5E='destroy';var E5E="_typeF";var e8=E5E;e8+=c3i;this[O0i][j2i][O2i]();this[e8](H5E);return this;},multiEditable:function(){return this[y3i][Y3E][L5E];},multiIds:function(){var E8=c7i;E8+=K9i;E8+=T7i;E8+=S3E;return this[y3i][E8];},multiInfoShown:function(show){var M8=p1ff[225154];M8+=M5E;var L8=p1ff.T3i;L8+=y3i;L8+=y3i;var H8=o1i;H8+=p1ff[261600];this[H8][r5E][L8]({display:show?M8:J5E});},multiReset:function(){this[y3i][g3E]=[];this[y3i][X5E]={};},submittable:function(){var r8=f5E;r8+=x5E;return this[y3i][Y3E][r8];},valFromData:S0i,valToData:S0i,_errorNode:function(){var S5E="ldErro";var J8=w5E;J8+=S5E;J8+=z6i;return this[O0i][J8];},_msg:function(el,msg,fn){var K5E=":vis";var l6E="ideU";p1ff.S3f();var v6E="slideDown";var S8=K5E;S8+=a5E;if(msg === undefined){var X8=W5E;X8+=K9i;return el[X8]();}if(typeof msg === p1ff.h3i){var w8=n3i;w8+=F2i;w8+=K9i;w8+=p1ff.q3i;var x8=O6i;x8+=h6i;x8+=t6i;var f8=v6i;f8+=p1ff[50755];f8+=G5E;var editor=this[y3i][f8];msg=msg(editor,new DataTable[x8](editor[y3i][w8]));}if(el[Y5E]()[O5E](S8) && $[I4i][Z6E]){var K8=v6i;K8+=n3i;K8+=p1ff[261600];K8+=K9i;el[K8](msg);if(msg){el[v6E](fn);;}else {var a8=y3i;a8+=K9i;a8+=l6E;a8+=h6i;el[a8](fn);}}else {var G8=c3i;G8+=p1ff[50755];G8+=c3i;G8+=p1ff.q3i;var W8=D6E;W8+=p1ff[50755];W8+=p1ff.T3i;W8+=f4i;el[u6E](msg || o4i)[A2i](n2i,msg?W8:G8);if(fn){fn();}}return this;},_multiValueCheck:function(){var T6E="trol";var i6E="noMulti";var m6E="ultiR";var g6E="eClass";var o6E="oggl";var V6E="ho";var Q6E="ol";var I6E="putCon";var h6E="multiNoEdit";var N6E="eturn";var q6E="non";var t6E="nputCon";var T4=s5i;T4+=r5E;var t4=n3i;t4+=o6E;t4+=g6E;var U4=p1ff[261600];U4+=M3i;U4+=n3i;U4+=t6i;var q4=t6i;q4+=F5i;var Q4=s6E;Q4+=p1ff[261600];Q4+=K9i;var I4=p1ff[261600];I4+=M3i;I4+=d6E;var N4=t6i;N4+=w8i;N4+=R6E;var m4=V6E;m4+=G5E;var p4=p1ff[225154];p4+=M5E;var V4=K9i;V4+=p6E;var R4=p1ff.T3i;R4+=y3i;R4+=y3i;var d4=p1ff[261600];d4+=m6E;d4+=N6E;var s4=p1ff.N3i;s4+=y2i;var last;var ids=this[y3i][g3E];var values=this[y3i][X5E];var isMultiValue=this[y3i][E0i];var isMultiEditable=this[y3i][Y3E][L5E];var val;var different=L4i;if(ids){for(var i=y2O;i < ids[H4i];i++){val=values[ids[i]];if(i > y2O && !_deepCompare(val,last)){different=r4i;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[T3E]()){var v4=p1ff[261600];v4+=j6i;v4+=C1i;v4+=t6i;var Z4=c3i;Z4+=p1ff[50755];Z4+=c3i;Z4+=p1ff.q3i;var O8=p1ff.T3i;O8+=B2i;var Y8=n7i;Y8+=I6E;Y8+=R5E;Y8+=Q6E;this[O0i][Y8][O8]({display:Z4});this[O0i][v4][A2i]({display:l5E});}else {var g4=q6E;g4+=p1ff.q3i;var o4=p1ff.T3i;o4+=y3i;o4+=y3i;var u4=p1ff[225154];u4+=K9i;u4+=p1ff[50755];u4+=U6E;var D4=p1ff.T3i;D4+=y3i;D4+=y3i;var l4=t6i;l4+=t6E;l4+=T6E;this[O0i][l4][D4]({display:u4});this[O0i][i5i][o4]({display:g4});if(isMultiValue && !different){this[k5E](last,L4i);}}this[s4][d4][R4]({display:ids && ids[V4] > j2O && different && !isMultiValue?p4:J5E});var i18n=this[y3i][m4][N4][i5i];this[O0i][I4][Q4](isMultiEditable?i18n[q4]:i18n[i6E]);this[O0i][U4][t4](this[y3i][X2i][h6E],!isMultiEditable);this[y3i][B3E][T4]();return r4i;},_typeFn:function(name){var z6E="if";var B6E="unshif";var j6E="apply";var j4=n3i;j4+=a7i;j4+=h6i;j4+=p1ff.q3i;var y4=p1ff[50755];y4+=h6i;y4+=n3i;y4+=y3i;var z4=B6E;z4+=n3i;var B4=y3i;B4+=v6i;B4+=z6E;B4+=n3i;var h4=y3i;h4+=y6E;h4+=K3i;var i4=h6i;i4+=r7i;i4+=x7i;i4+=h7i;var args=Array[i4][h4][Q2i](arguments);args[B4]();args[z4](this[y3i][y4]);var fn=this[y3i][j4][name];if(fn){return fn[j6E](this[y3i][B3E],args);}}};Editor[c4][C4]={};Editor[P4][A4]={"className":p1ff.i3i,"data":p1ff.i3i,"def":p1ff.i3i,"fieldInfo":p1ff.i3i,"id":p1ff.i3i,"label":p1ff.i3i,"labelInfo":p1ff.i3i,"name":S0i,"type":c6E,"message":p1ff.i3i,"multiEditable":r4i,"submit":r4i};Editor[n4][F4][m0i]={type:S0i,name:S0i,classes:S0i,opts:S0i,host:S0i};Editor[J4i][b4][k4]={container:S0i,label:S0i,labelInfo:S0i,fieldInfo:S0i,fieldError:S0i,fieldMessage:S0i};Editor[e4]={};Editor[E4][H4]={"init":function(dte){},"open":function(dte,append,fn){},"close":function(dte,fn){}};Editor[Y0i][C6E]={"create":function(conf){},"get":function(conf){},"set":function(conf,val){},"enable":function(conf){},"disable":function(conf){}};Editor[Y0i][m0i]={"ajaxUrl":S0i,"ajax":S0i,"dataSource":S0i,"domTable":S0i,"opts":S0i,"displayController":S0i,"fields":{},"order":[],"id":-j2O,"displayed":L4i,"processing":L4i,"modifier":S0i,"action":S0i,"idSrc":S0i,"unique":y2O};Editor[L4][M4]={"label":S0i,"fn":S0i,"className":S0i};Editor[Y0i][r4]={onReturn:J4,onBlur:X4,onBackground:f4,onComplete:x4,onEsc:P6E,onFieldError:A6E,submit:n6E,focus:y2O,buttons:r4i,title:r4i,message:r4i,drawType:L4i,scope:w4};Editor[S4]={};(function(){var Z7E='div.DTE_Footer';var S9E="D_";var e6E="<div class=\"DTED_Lig";var F6E="lightb";var H6E="</div";var b6E="ox";var E6E="htbox_Background\"><div></div></div>";var S7E='<div class="DTED_Lightbox_Close"></div>';var w7E='<div class="DTED_Lightbox_Content">';var x6E="<div class=\"DT";var w6E="ED DTED_Lightbox_Wrapper\">";var W6E="ghtb";var X6E="x_";var r6E="D_Lightbox_Content_Wrapper\">";var M6E="div class=\"DTE";var f6E="Container\">";var J6E="<div class=\"DTED_Lightbo";var o9E="_shown";var K6E="Controlle";var Q0=F6E;Q0+=b6E;var I0=d8i;I0+=Z5E;I0+=k6E;var N0=e6E;N0+=E6E;var m0=H6E;m0+=m1i;var p0=j1i;p0+=L6E;var V0=j1i;V0+=M6E;V0+=r6E;var R0=J6E;R0+=X6E;R0+=f6E;var d0=x6E;d0+=w6E;var O4=S6E;O4+=a7i;O4+=K6E;O4+=z6i;var Y4=y8i;Y4+=Q6i;var G4=a6E;G4+=d6i;G4+=p1ff.N3i;var W4=K9i;W4+=t6i;W4+=W6E;W4+=b6E;var a4=w7i;a4+=e6i;function isMobile(){var Y6E="orientation";var O6E="outerWidth";var G6E="unde";var s3i=576;var K4=G6E;K4+=A4i;K4+=p5i;K4+=p1ff.N3i;return typeof window[Y6E] !== K4 && window[O6E] <= s3i?r4i:L4i;}var self;Editor[a4][W4]=$[G4](r4i,{},Editor[Y4][O4],{"init":function(dte){var Z9E="_init";self[Z9E]();p1ff.S3f();return self;},"open":function(dte,append,callback){var u9E="detac";var s1=p1ff.T3i;s1+=K9i;s1+=p1ff[50755];s1+=v9E;var g1=s5i;g1+=p1ff.N3i;g1+=p1ff[50755];g1+=p1ff[261600];var u1=p1ff[402431];u1+=l9E;u1+=u1i;var D1=p1ff[402431];D1+=D9E;D1+=d6i;D1+=p1ff.N3i;var l1=u9E;l1+=v6i;var v1=s5i;v1+=p1ff.N3i;v1+=p1ff[50755];v1+=p1ff[261600];var Z1=s5i;Z1+=p1ff.N3i;Z1+=n3i;Z1+=p1ff.q3i;if(self[o9E]){if(callback){callback();}return;}self[Z1]=dte;var content=self[v1][g9E];content[s9E]()[l1]();content[D1](append)[u1](self[g1][s1]);self[o9E]=r4i;self[d9E](callback);},"close":function(dte,callback){var R1=s5i;R1+=k7i;R1+=p1ff.q3i;var d1=s5i;d1+=p1ff.N3i;p1ff.h3f();d1+=i6i;if(!self[o9E]){if(callback){callback();}return;}self[d1]=dte;self[R1](callback);self[o9E]=L4i;},node:function(dte){p1ff.S3f();return self[R9E][V9E][y2O];},"_init":function(){var q9E="_Content";var I9E="div.DTED_";var m9E="aci";var p9E="opaci";var Q1=p9E;Q1+=J9i;var I1=j7i;I1+=m9E;I1+=J9i;var N1=p1ff.T3i;N1+=B2i;var m1=V8i;m1+=N9E;m1+=l9E;m1+=z6i;var p1=I9E;p1+=Q9E;p1+=q9E;var V1=U9E;V1+=t9E;V1+=p1ff.N3i;V1+=a7i;if(self[V1]){return;}var dom=self[R9E];dom[g9E]=$(p1,self[R9E][m1]);dom[V9E][N1](I1,y2O);dom[T9E][A2i](Q1,y2O);},"_show":function(callback){var q7E="_scrollTop";var L9E="rappe";var j9E="onte";var M9E="bac";var c9E="nt_Wrapper";var r9E="kground";var K9E="Li";var z9E="div.DTED_Ligh";var X9E="etAni";var a9E="ghtbox_Mobile";var h9E="ED_Lightbo";var y9E="tbox_C";var E9E="heightC";var i9E="esize.DT";var C9E="ckgrou";var e9E="nima";var S1=p1ff[225154];S1+=p1ff[50755];S1+=p1ff.N3i;p1ff.h3f();S1+=a7i;var w1=z6i;w1+=i9E;w1+=h9E;w1+=q6i;var x1=p1ff[50755];x1+=c3i;var J1=V8i;J1+=B9E;var r1=z9E;r1+=y9E;r1+=j9E;r1+=c9E;var H1=V6i;H1+=C9E;H1+=c3i;H1+=p1ff.N3i;var k1=P9E;k1+=v9E;var b1=E3i;b1+=R6E;var F1=A9E;F1+=i6i;var n1=T7i;n1+=n9E;var A1=p1ff[402431];A1+=n3i;A1+=R5E;var P1=p1ff[225154];P1+=p1ff[402431];P1+=F9E;P1+=b9E;var C1=k9E;C1+=e9E;C1+=n3i;C1+=p1ff.q3i;var c1=s5i;c1+=E9E;c1+=H9E;c1+=p1ff.T3i;var j1=V8i;j1+=L9E;j1+=z6i;var y1=M9E;y1+=r9E;var z1=s5i;z1+=p1ff.N3i;z1+=p1ff[50755];z1+=p1ff[261600];var B1=J9E;B1+=X9E;var h1=p1ff.T3i;h1+=y3i;h1+=y3i;var i1=f9E;i1+=p1ff.q3i;i1+=z6i;var T1=p1ff[402431];T1+=j6i;T1+=O9i;var t1=x9E;t1+=w9E;var q1=s5i;q1+=p1ff.N3i;q1+=p1ff[50755];q1+=p1ff[261600];var that=this;var dom=self[q1];if(isMobile()){var U1=X5i;U1+=S9E;U1+=K9E;U1+=a9E;$(P2i)[W9E](U1);}dom[g9E][A2i](t1,T1);dom[i1][h1]({top:-self[G9E][B1]});$(P2i)[F3E](self[z1][y1])[F3E](self[R9E][j1]);self[c1]();self[Y9E][O9E](dom[V9E],{opacity:j2O,top:y2O},callback);self[Y9E][C1](dom[P1],{opacity:j2O});setTimeout(function(){p1ff.S3f();var v7E='text-indent';$(Z7E)[A2i](v7E,-j2O);},b2O);dom[l7E][A1](n1,self[F1][b1][k1])[I5i](D7E,function(e){var E1=p1ff.T3i;E1+=u7E;E1+=y3i;E1+=p1ff.q3i;var e1=A9E;e1+=n3i;e1+=p1ff.q3i;self[e1][E1]();});dom[H1][I5i](D7E,function(e){p1ff.h3f();var g7E="ground";var d7E="gation";var s7E="stopImmediatePropa";var o7E="ack";var M1=p1ff[225154];M1+=o7E;M1+=g7E;var L1=s7E;L1+=d7E;e[L1]();self[Y9E][M1]();});$(r1,dom[J1])[I5i](D7E,function(e){var I7E="stopImmediatePropagation";p1ff.S3f();var V7E="ightbox_Co";var R7E="DTED_L";var p7E="ntent_Wra";var X1=R7E;X1+=V7E;X1+=p7E;X1+=m7E;if($(e[N7E])[J2i](X1)){var f1=s5i;f1+=p1ff.N3i;f1+=n3i;f1+=p1ff.q3i;e[I7E]();self[f1][T9E]();}});$(window)[x1](w1,function(){p1ff.S3f();self[Q7E]();});self[q7E]=$(S1)[U7E]();},"_heightCalc":function(){var z7E='maxHeight';var y7E='calc(100vh - ';var j7E='px)';var h7E="v.DTE_Body_C";var K1=t7E;K1+=D9E;K1+=p1ff.q3i;K1+=z6i;var dom=self[R9E];var headerFooter=$(T7E,dom[K1])[i7E]() + $(Z7E,dom[V9E])[i7E]();if(isMobile()){var W1=p1ff.T3i;W1+=y3i;W1+=y3i;var a1=d8i;a1+=h7E;a1+=B7E;a1+=n3i;$(a1,dom[V9E])[W1](z7E,y7E + headerFooter + j7E);}else {var maxHeight=$(window)[c7E]() - self[G9E][C7E] * c2O - headerFooter;$(P7E,dom[V9E])[A2i](z7E,maxHeight);}},"_hide":function(callback){var k7E="k.DTE";var f7E='div.DTED_Lightbox_Content_Wrapper';var r7E="croll";var e7E="D_Light";var A7E="size.DTE";var n7E="ick.DTED_Lightbox";var X7E="offsetAni";var M7E="llTop";var F7E="click.DTED";var L7E="_scro";var s0=Z9i;s0+=A7E;s0+=S9E;s0+=Q9E;var g0=p8i;g0+=n7E;var o0=F7E;o0+=s5i;o0+=Q9E;var u0=p1ff[50755];u0+=b7E;p1ff.h3f();var D0=x4i;D0+=k7E;D0+=e7E;D0+=E7E;var l0=p1ff[50755];l0+=b7E;var v0=p1ff.T3i;v0+=K9i;v0+=m8i;var Z0=s5i;Z0+=l6i;Z0+=t6i;Z0+=H7E;var O1=L7E;O1+=M7E;var Y1=y3i;Y1+=r7E;Y1+=J7E;Y1+=h6i;var G1=A9E;G1+=p1ff[50755];G1+=p1ff[261600];var dom=self[G1];if(!callback){callback=function(){};}$(P2i)[Y1](self[O1]);self[Y9E][O9E](dom[V9E],{opacity:y2O,top:self[G9E][X7E]},function(){$(this)[n3E]();callback();});self[Y9E][Z0](dom[T9E],{opacity:y2O},function(){$(this)[n3E]();});dom[v0][l0](D0);dom[T9E][u0](o0);$(f7E,dom[V9E])[x7E](g0);$(window)[x7E](s0);},"_dte":S0i,"_ready":L4i,"_shown":L4i,"_dom":{"wrapper":$(d0 + R0 + V0 + w7E + n0i + p0 + n0i + m0),"background":$(N0),"close":$(S7E),"content":S0i}});self=Editor[I0][Q0];p1ff.h3f();self[G9E]={"offsetAni":X2O,"windowPadding":X2O};})();(function(){var t4E="offsetHeight";var Y7E="></div>";var l8E="D DTED_Envelope_Wrapper\">";var u8E="play";var W7E="<div class=\"DTED_Envelop";var P8E="backgro";var y8E="back";var d8E="_do";var G7E="e_Background\"><div></div";var n8E="yl";var v8E="<div class=\"DTE";p1ff.S3f();var B1E='<div class="DTED_Envelope_Close">&times;</div>';var s8E="ni";var h8E="und";var h1E='<div class="DTED_Envelope_Shadow"></div>';var a7E="lope";var K7E="enve";var G2O=50;var O7E=" class=\"DTED_Envelope_Cont";var Z8E="ainer\"></div>";var C4E="ani";var Q8E="appendChild";var J3W=C5E;J3W+=c3i;J3W+=C3i;var r3W=K7E;r3W+=a7E;var M3W=W7E;M3W+=G7E;M3W+=Y7E;var L3W=F1i;L3W+=y1i;L3W+=O7E;L3W+=Z8E;var H3W=v8E;H3W+=l8E;var U0=K7E;U0+=K9i;U0+=D8E;var q0=i2i;q0+=u8E;var self;Editor[q0][U0]=$[o8E](r4i,{},Editor[Y0i][g8E],{"init":function(dte){var t0=s5i;t0+=t6i;p1ff.S3f();t0+=s8E;t0+=n3i;self[Y9E]=dte;self[t0]();return self;},"open":function(dte,append,callback){var N8E="chil";var m8E="eta";var V8E="ppendChild";var c0=d8E;c0+=p1ff[261600];var j0=C5E;j0+=R8E;var y0=p1ff[402431];y0+=V8E;var z0=L2i;z0+=n3i;z0+=p8E;var B0=s5i;B0+=p1ff.N3i;B0+=p1ff[50755];B0+=p1ff[261600];var h0=p1ff.N3i;h0+=m8E;h0+=p1ff.T3i;h0+=v6i;var i0=N8E;i0+=I8E;i0+=p1ff.q3i;i0+=c3i;var T0=p1ff.T3i;T0+=G2i;T0+=p8E;self[Y9E]=dte;$(self[R9E][T0])[i0]()[h0]();self[B0][z0][y0](append);self[R9E][j0][Q8E](self[c0][l7E]);self[d9E](callback);},"close":function(dte,callback){var P0=q8E;P0+=I0i;P0+=p1ff.q3i;var C0=s5i;C0+=p1ff.N3i;C0+=n3i;p1ff.h3f();C0+=p1ff.q3i;self[C0]=dte;self[P0](callback);},node:function(dte){p1ff.S3f();var A0=s5i;A0+=o1i;A0+=p1ff[261600];return self[A0][V9E][y2O];},"_init":function(){var A8E="idd";var c8E="_cssBack";var U8E="vis";var k8E="_ready";var i8E="ckgr";var e8E="visbility";var j8E="groun";var C8E="groundOpacity";var t8E="visb";var T8E="ility";var F8E="div.DTED_Envelope_Con";var B8E="opa";var z8E="ci";var w0=U8E;w0+=a5E;var x0=t8E;x0+=T8E;var f0=s5i;f0+=o1i;f0+=p1ff[261600];var X0=V6i;X0+=i8E;X0+=p1ff[50755];X0+=h8E;var J0=B8E;J0+=z8E;J0+=J9i;var r0=y8E;r0+=j8E;r0+=p1ff.N3i;var M0=d8E;M0+=p1ff[261600];var L0=c8E;L0+=C8E;var H0=p1ff.N3i;H0+=K7i;H0+=e6i;var E0=G5E;E0+=a7i;E0+=K9i;E0+=p1ff.q3i;var e0=P8E;e0+=g8i;e0+=p1ff.N3i;var k0=v6i;k0+=A8E;k0+=d6i;var b0=y3i;b0+=n3i;b0+=n8E;b0+=p1ff.q3i;var F0=F8E;F0+=b8E;var n0=A9E;n0+=p1ff[50755];n0+=p1ff[261600];if(self[k8E]){return;}self[n0][g9E]=$(F0,self[R9E][V9E])[y2O];self[R9E][T9E][b0][e8E]=k0;self[R9E][e0][E0][H0]=l5E;self[L0]=$(self[M0][r0])[A2i](J0);self[R9E][X0][E8E][z3E]=J5E;self[f0][T9E][E8E][x0]=w0;},"_show":function(callback){var Y8E="tyle";var X8E="backg";var W8E="tyl";var R4E="appendC";var s4E="hRow";var D4E="_he";var B4E="etHeight";var c4E="offset";var G8E="ffs";var p4E="ody";var S8E="nor";var i4E="fadeIn";var o4E="tCalc";var V4E="hild";var N4E="opacity";var J8E="ED_Lightbox_Content_Wrapper";var g4E="findAttac";var q4E="marginLeft";var k4E='resize.DTED_Envelope';var y4E=",";var h4E="windowScroll";var u4E="ig";var L8E="elope";var l4E="etWidt";var m4E='auto';var T4E="_cssBackgroundOpacity";var Q4E="px";var P4E='click.DTED_Envelope';var H8E="lick.DTED_Env";var M8E="div.D";var M2=p1ff.T3i;M2+=H8E;M2+=L8E;var L2=p1ff[50755];L2+=c3i;var H2=s5i;H2+=p1ff.N3i;H2+=p1ff[50755];H2+=p1ff[261600];var E2=M8E;E2+=r8E;E2+=J8E;var b2=X8E;b2+=z6i;b2+=f8E;var F2=p1ff.T3i;F2+=u7E;F2+=y3i;F2+=p1ff.q3i;var n2=n3i;n2+=x8E;var A2=w8E;A2+=z6i;var P2=p8i;P2+=m8i;var C2=d8E;C2+=p1ff[261600];var h2=p1ff.T3i;h2+=p1ff[50755];h2+=c3i;h2+=C3i;var i2=S8E;i2+=p1ff[261600];i2+=p1ff[402431];i2+=K9i;var T2=V6i;T2+=K8E;var t2=d8i;t2+=a8E;t2+=p1ff[402431];t2+=a7i;var U2=y3i;U2+=W8E;U2+=p1ff.q3i;var q2=p1ff[225154];q2+=p1ff[402431];q2+=F9E;q2+=b9E;var Q2=A9E;Q2+=y2i;var I2=y3i;I2+=n3i;I2+=n8E;I2+=p1ff.q3i;var N2=s5i;N2+=p1ff.N3i;N2+=p1ff[50755];N2+=p1ff[261600];var m2=h6i;m2+=q6i;var p2=s5i;p2+=o1i;p2+=p1ff[261600];var V2=h6i;V2+=q6i;var R2=p1ff[50755];R2+=G8E;R2+=p1ff.q3i;R2+=n3i;p1ff.h3f();var d2=n3i;d2+=j7i;var s2=y3i;s2+=Y8E;var g2=O8E;g2+=p1ff[402431];g2+=h6i;g2+=Z4E;var u2=s5i;u2+=O0i;var D2=v4E;D2+=P9i;var l2=a1i;l2+=Z4E;var v2=x7E;v2+=y3i;v2+=l4E;v2+=v6i;var Z2=D4E;Z2+=u4E;Z2+=v6i;Z2+=o4E;var O0=s5i;O0+=g4E;O0+=s4E;var Y0=p1ff[225154];Y0+=M5E;var G0=x9E;G0+=t6i;G0+=d4E;var W0=p1ff.T3i;W0+=p1ff[50755];W0+=O7i;W0+=p8E;var a0=p1ff[225154];a0+=p1ff[50755];a0+=m9i;var K0=R4E;K0+=V4E;var S0=p1ff[225154];S0+=p4E;var that=this;var formHeight;if(!callback){callback=function(){};}document[S0][K0](self[R9E][T9E]);document[a0][Q8E](self[R9E][V9E]);self[R9E][W0][E8E][G0]=m4E;var style=self[R9E][V9E][E8E];style[N4E]=y2O;style[z3E]=Y0;var targetRow=self[O0]();var height=self[Z2]();var width=targetRow[v2];style[z3E]=J5E;style[N4E]=j2O;self[R9E][V9E][E8E][I4E]=width + Q4E;self[R9E][l2][D2][q4E]=-(width / c2O) + Q4E;self[u2][g2][s2][d2]=$(targetRow)[R2]()[U4E] + targetRow[t4E] + V2;self[p2][g9E][E8E][U4E]=-j2O * height - M2O + m2;self[N2][T9E][I2][N4E]=y2O;self[Q2][q2][U2][t2]=l5E;$(self[R9E][T2])[Z6E]({'opacity':self[T4E]},i2);$(self[R9E][V9E])[i4E]();if(self[h2][h4E]){var y2=J9E;y2+=B4E;var z2=p1ff[402431];z2+=s8E;z2+=z4E;z2+=i6i;var B2=W5E;B2+=K9i;B2+=y4E;B2+=j4E;$(B2)[z2]({"scrollTop":$(targetRow)[c4E]()[U4E] + targetRow[y2] - self[G9E][C7E]},function(){p1ff.S3f();$(self[R9E][g9E])[Z6E]({"top":y2O},d3i,callback);});}else {var c2=C4E;c2+=z4E;c2+=i6i;var j2=s5i;j2+=p1ff.N3i;j2+=p1ff[50755];j2+=p1ff[261600];$(self[j2][g9E])[c2]({"top":y2O},d3i,callback);}$(self[C2][P2])[A2](n2,self[Y9E][R0i][F2])[I5i](P4E,function(e){p1ff.h3f();self[Y9E][l7E]();});$(self[R9E][b2])[I5i](P4E,function(e){var e2=y8E;e2+=A4E;e2+=n4E;e2+=u1i;var k2=A9E;p1ff.h3f();k2+=n3i;k2+=p1ff.q3i;self[k2][e2]();});$(E2,self[H2][V9E])[L2](M2,function(e){var b4E="lope_Content_Wrapper";var F4E="DTED_Enve";var J2=F4E;J2+=b4E;var r2=v6i;r2+=o2i;r2+=G5i;p1ff.S3f();r2+=y3i;if($(e[N7E])[r2](J2)){var X2=P8E;X2+=h8E;self[Y9E][X2]();}});$(window)[I5i](k4E,function(){self[Q7E]();});},"_heightCalc":function(){var H4E="v.D";var E4E="xHe";var w4E="heig";var L4E="TE_Body_";var J4E=".DTE_Foot";var f4E="Hei";var S4E="ghtCa";var K4E="lc";var a4E="heightCalc";var l3W=O8E;l3W+=e4E;var v3W=p1ff[261600];v3W+=p1ff[402431];v3W+=E4E;v3W+=w9E;var Z3W=d8i;Z3W+=H4E;Z3W+=L4E;Z3W+=M4E;var O2=t7E;O2+=D9E;O2+=r2i;var Y2=s5i;Y2+=p1ff.N3i;Y2+=p1ff[50755];Y2+=p1ff[261600];var G2=r4E;G2+=J4E;G2+=r2i;var W2=X4E;W2+=f4E;W2+=d4E;var a2=O8E;a2+=x4E;a2+=z9i;a2+=z6i;var K2=s5i;K2+=p1ff.N3i;K2+=y2i;var S2=w4E;S2+=s6E;var w2=V8i;w2+=z6i;w2+=e4E;var x2=A9E;x2+=p1ff[50755];x2+=p1ff[261600];var f2=x9E;f2+=t6i;f2+=S4E;f2+=K4E;var formHeight;formHeight=self[G9E][a4E]?self[G9E][f2](self[x2][w2]):$(self[R9E][g9E])[s9E]()[S2]();var maxHeight=$(window)[c7E]() - self[G9E][C7E] * c2O - $(T7E,self[K2][a2])[W2]() - $(G2,self[Y2][O2])[i7E]();$(Z3W,self[R9E][V9E])[A2i](v3W,maxHeight);return $(self[Y9E][O0i][l3W])[i7E]();},"_hide":function(callback){var u1E="k.D";var G4E="D_Li";var O4E="ck.D";var Y4E="ghtbox";var v1E="iv.DTED_Lightbox_Cont";var W4E="resize.";var D1E="ackground";var o1E="TED_";var l1E="ent_Wrapper";var Z1E="TED_Light";var h3W=W4E;h3W+=X5i;h3W+=G4E;h3W+=Y4E;var i3W=X4i;i3W+=O4E;i3W+=Z1E;i3W+=E7E;var T3W=p1ff[50755];T3W+=C3i;T3W+=C3i;var t3W=V8i;t3W+=z6i;t3W+=m2i;t3W+=r2i;var U3W=A9E;U3W+=p1ff[50755];U3W+=p1ff[261600];var q3W=p1ff.N3i;q3W+=v1E;q3W+=l1E;var Q3W=p1ff[50755];Q3W+=C3i;Q3W+=C3i;var I3W=p1ff[225154];I3W+=D1E;var N3W=s5i;N3W+=p1ff.N3i;N3W+=y2i;var m3W=x4i;m3W+=u1E;m3W+=o1E;m3W+=Q9E;var p3W=p1ff.T3i;p3W+=u7E;p3W+=y3i;p3W+=p1ff.q3i;var V3W=A9E;V3W+=y2i;var g3W=C5E;g3W+=R8E;var o3W=s5i;o3W+=p1ff.N3i;o3W+=p1ff[50755];o3W+=p1ff[261600];var u3W=C4E;u3W+=H7E;var D3W=L2i;D3W+=n3i;D3W+=d6i;D3W+=n3i;if(!callback){callback=function(){};}$(self[R9E][D3W])[u3W]({"top":-(self[o3W][g3W][t4E] + G2O)},d3i,function(){var g1E="fadeOut";var s1E='normal';var d3W=t7E;p1ff.S3f();d3W+=m7E;var s3W=d8E;s3W+=p1ff[261600];$([self[s3W][d3W],self[R9E][T9E]])[g1E](s1E,function(){var d1E="deta";var R3W=d1E;R3W+=H6i;$(this)[R3W]();p1ff.S3f();callback();});});$(self[V3W][p3W])[x7E](m3W);$(self[N3W][I3W])[Q3W](D7E);$(q3W,self[U3W][t3W])[T3W](i3W);$(window)[x7E](h3W);},"_findAttachRow":function(){var p1E="atta";p1ff.S3f();var N1E="Ap";var V1E="dte";var R1E="reat";var Q1E='head';var A3W=p1ff.T3i;A3W+=R1E;A3W+=p1ff.q3i;var P3W=s5i;P3W+=V1E;var c3W=p1E;c3W+=p1ff.T3i;c3W+=v6i;var j3W=p1ff.T3i;j3W+=p1ff[50755];j3W+=c3i;j3W+=C3i;var y3W=M2i;y3W+=m1E;var z3W=N1E;z3W+=t6i;var B3W=p1ff.N3i;B3W+=p1ff[402431];B3W+=n3i;B3W+=I1E;var dt=new $[I4i][B3W][z3W](self[Y9E][y3i][y3W]);if(self[j3W][c3W] === Q1E){var C3W=n3i;C3W+=l5i;return dt[C3W]()[q1E]();}else if(self[P3W][y3i][U1E] === A3W){var F3W=x9E;F3W+=t1E;F3W+=z6i;var n3W=M2i;n3W+=p1ff[225154];n3W+=P9i;return dt[n3W]()[F3W]();}else {var E3W=C3E;E3W+=p1ff.N3i;E3W+=p1ff.q3i;var e3W=T1E;e3W+=i1E;var k3W=s5i;k3W+=p1ff.N3i;k3W+=i6i;var b3W=z6i;b3W+=p1ff[50755];b3W+=V8i;return dt[b3W](self[k3W][y3i][e3W])[E3W]();}},"_dte":S0i,"_ready":L4i,"_cssBackgroundOpacity":j2O,"_dom":{"wrapper":$(H3W + h1E + L3W + n0i)[y2O],"background":$(M3W)[y2O],"close":$(B1E)[y2O],"content":S0i}});self=Editor[z3E][r3W];self[J3W]={"windowPadding":G2O,"heightCalc":S0i,"attach":z1E,"windowScroll":r4i};})();Editor[X3W][f3W]=function(cfg,after,reorder){var P1E="Ar";var Z0E="yReord";var X1E="ditF";var L1E="Error adding field '";var j1E="itField";var M1E="'. A field already exists with this name";var b1E="layReorder";var n1E="ord";var a1E="orde";var k1E="verse";var W1E="rray";var J1E="iReset";var E1E="Error adding field. The field requires a `name` option";var O1E="_disp";var O3W=p1ff.T3i;O3W+=K9i;O3W+=y1E;O3W+=Y5i;var Y3W=n7i;Y3W+=j1E;var G3W=A9E;G3W+=c1E;G3W+=C1E;var W3W=c3i;W3W+=p1ff[402431];W3W+=p1ff[261600];W3W+=p1ff.q3i;var x3W=O5E;x3W+=P1E;x3W+=A1E;if(Array[x3W](cfg)){var a3W=n1E;a3W+=p1ff.q3i;a3W+=z6i;var K3W=s5i;K3W+=F1E;K3W+=b1E;var S3W=i5E;S3W+=L1i;S3W+=n3i;S3W+=v6i;if(after !== undefined){var w3W=Z9i;w3W+=k1E;cfg[w3W]();}for(var i=y2O;i < cfg[S3W];i++){this[e1E](cfg[i],after,L4i);}this[K3W](this[a3W]());return this;}var name=cfg[W3W];if(name === undefined){throw E1E;}if(this[y3i][H1E][name]){throw L1E + name + M1E;}this[G3W](Y3W,cfg);var field=new Editor[J4i](cfg,this[O3W][r1E],this);if(this[y3i][y8i]){var v5W=t5i;v5W+=n3i;v5W+=J1E;var Z5W=p1ff.q3i;Z5W+=X1E;Z5W+=f1E;var editFields=this[y3i][Z5W];field[v5W]();$[i4i](editFields,function(idSrc,edit){var x1E="multiS";var l5W=x1E;l5W+=w1E;p1ff.S3f();var val;if(edit[t0i]){val=field[S1E](edit[t0i]);}field[l5W](idSrc,val !== undefined?val:field[h3E]());});}this[y3i][H1E][name]=field;if(after === undefined){this[y3i][K1E][h4i](name);}else if(after === S0i){this[y3i][K1E][q2i](name);}else {var o5W=a1E;o5W+=z6i;var u5W=h1i;u5W+=p1ff.N3i;u5W+=p1ff.q3i;u5W+=z6i;var D5W=t6i;D5W+=c3i;D5W+=O6i;D5W+=W1E;var idx=$[D5W](after,this[y3i][u5W]);this[y3i][o5W][G1E](idx + j2O,y2O,name);}if(reorder !== L4i){var s5W=p1ff[50755];s5W+=Y1E;var g5W=O1E;g5W+=l1i;g5W+=Z0E;g5W+=r2i;this[g5W](this[s5W]());}return this;};Editor[N2i][v0E]=function(newAjax){var d5W=l0E;d5W+=p1ff[402431];d5W+=q6i;if(newAjax){this[y3i][v0E]=newAjax;return this;}return this[y3i][d5W];};Editor[R5W][V5W]=function(){var u0E="unction";var g0E="ditO";var o0E="nBackground";var U5W=D0E;U5W+=t9i;var I5W=p1ff[225154];I5W+=K9i;I5W+=j6i;I5W+=z6i;var N5W=C3i;N5W+=u0E;var m5W=p1ff[50755];m5W+=o0E;var p5W=p1ff.q3i;p5W+=g0E;p5W+=s0E;var onBackground=this[y3i][p5W][m5W];if(typeof onBackground === N5W){onBackground(this);}else if(onBackground === I5W){var Q5W=d0E;Q5W+=z6i;this[Q5W]();}else if(onBackground === P6E){var q5W=P9E;q5W+=y3i;q5W+=p1ff.q3i;this[q5W]();}else if(onBackground === U5W){var t5W=D0E;t5W+=t9i;this[t5W]();}return this;};Editor[N2i][R0E]=function(){var T5W=s5i;T5W+=p1ff[225154];T5W+=V0E;T5W+=z6i;this[T5W]();return this;};Editor[i5W][h5W]=function(cells,fieldNames,show,opts){var I0E="mOptions";var p0E="_ed";var i0E='boolean';var m0E="dividu";var q0E="sPlainObje";var P5W=p0E;P5W+=t6i;P5W+=n3i;var C5W=t6i;C5W+=c3i;C5W+=m0E;C5W+=H9E;var c5W=I8i;c5W+=p1ff[225154];c5W+=D6E;c5W+=p1ff.q3i;var j5W=N0E;j5W+=I0E;var y5W=p1ff.q3i;y5W+=Q0E;y5W+=u1i;var z5W=t6i;z5W+=q0E;z5W+=U0E;var that=this;if(this[t0E](function(){var B5W=T0E;B5W+=D6E;B5W+=p1ff.q3i;that[B5W](cells,fieldNames,opts);})){return this;}if($[z5W](fieldNames)){opts=fieldNames;fieldNames=undefined;show=r4i;}else if(typeof fieldNames === i0E){show=fieldNames;fieldNames=undefined;opts=undefined;}if($[G3E](show)){opts=show;show=r4i;}if(show === undefined){show=r4i;}opts=$[y5W]({},this[y3i][j5W][c5W],opts);var editFields=this[h0E](C5W,cells,fieldNames);this[P5W](cells,editFields,B0E,opts,function(){var f0E="ly";var Y0E='attach';var J0E="div clas";var B2E="click";var v2E='"><div></div></div>';var u2E='" title="';var n0E="ldre";var o2E='<div class="DTE_Processing_Indicator"><span></div>';var z0E="_postop";var E0E="oint";var N2E="formInfo";var Z2E="bg";var x0E="resize";var H0E="\"></div";var b0E="ldr";var j0E="udeField";var d6W=z0E;d6W+=d6i;var s6W=y0E;s6W+=K9i;s6W+=j0E;s6W+=y3i;var g6W=c0E;g6W+=p1ff.T3i;g6W+=N3E;var u6W=p1ff.T3i;u6W+=y6E;u6W+=p1ff.T3i;u6W+=f4i;var v6W=p1ff[402431];v6W+=C0E;var Z6W=p1ff[402431];Z6W+=p1ff.N3i;Z6W+=p1ff.N3i;var Y5W=P0E;Y5W+=p1ff[50755];Y5W+=g6i;var W5W=S1i;W5W+=y3i;W5W+=A0E;W5W+=p1ff.q3i;var a5W=p1ff.N3i;a5W+=p1ff[50755];a5W+=p1ff[261600];var K5W=H6i;K5W+=t6i;K5W+=n0E;K5W+=c3i;var S5W=p1ff.q3i;S5W+=F0E;var w5W=H6i;w5W+=t6i;w5W+=b0E;w5W+=d6i;var X5W=k0E;X5W+=e0E;var J5W=h6i;J5W+=E0E;J5W+=r2i;var r5W=H0E;r5W+=m1i;var M5W=p1ff.T3i;M5W+=u7E;M5W+=y3i;M5W+=p1ff.q3i;var L5W=t6i;L5W+=L0E;var H5W=M0E;H5W+=r0E;var E5W=y6E;E5W+=p5i;E5W+=z6i;var e5W=j1i;e5W+=J0E;e5W+=X0E;e5W+=q1i;var k5W=q1i;k5W+=m1i;var b5W=B1i;b5W+=p1ff.T3i;b5W+=l1i;b5W+=V1i;var F5W=x4E;F5W+=h6i;F5W+=f0E;var A5W=x0E;A5W+=w0E;var namespace=that[S0E](opts);var ret=that[K0E](B0E);if(!ret){return that;}$(window)[I5i](A5W + namespace,function(){var a0E="bubblePos";var n5W=a0E;n5W+=t6i;n5W+=t2i;p1ff.h3f();that[n5W]();});var nodes=[];that[y3i][W0E]=nodes[G0E][F5W](nodes,_pluck(editFields,Y0E));var classes=that[X2i][O0E];var background=$(b5W + classes[Z2E] + v2E);var container=$(l2E + classes[V9E] + k5W + e5W + classes[E5W] + P0i + H5W + classes[D2E] + P0i + l2E + classes[l7E] + u2E + that[L5W][M5W] + r5W + o2E + n0i + n0i + l2E + classes[J5W] + X5W + n0i);if(show){var x5W=g2E;x5W+=m9i;var f5W=m2i;f5W+=s2E;f5W+=J7E;container[d2E](P2i);background[f5W](x5W);}var liner=container[w5W]()[S5W](y2O);var table=liner[K5W]();var close=table[s9E]();liner[F3E](that[O0i][R2E]);table[V2E](that[a5W][p2E]);if(opts[W5W]){var G5W=h9i;G5W+=p1ff.q3i;G5W+=m2E;liner[G5W](that[O0i][N2E]);}if(opts[I2E]){liner[V2E](that[O0i][q1E]);}if(opts[Y5W]){var O5W=I8i;O5W+=n3i;O5W+=n3i;O5W+=Q2E;table[F3E](that[O0i][O5W]);}var pair=$()[Z6W](container)[v6W](background);that[q2E](function(submitComplete){p1ff.h3f();that[O9E](pair,{opacity:y2O},function(){var h2E='closed';var T2E='resize.';if(this === container[y2O]){var D6W=U2E;D6W+=O7i;var l6W=p1ff.N3i;l6W+=t2E;l6W+=v6i;pair[l6W]();$(window)[x7E](T2E + namespace);that[i2E]();that[D6W](h2E,[B0E]);}});});background[B2E](function(){p1ff.h3f();that[R0E]();});close[u6W](function(){var o6W=s5i;o6W+=P9E;o6W+=y3i;o6W+=p1ff.q3i;that[o6W]();});that[z2E]();that[O9E](pair,{opacity:j2O});that[g6W](that[y3i][s6W],opts[y2E]);that[d6W](B0E,r4i);});return this;};Editor[R6W][z2E]=function(){var A2E="idth";var E2E='div.DTE_Bubble_Liner';var L2O=15;var C2E="cs";var S2E='below';var c2E="fset";var K2E='left';var n2E="gh";var e2E='div.DTE_Bubble';var b2E="tom";var J2E="right";var f2E="addCla";var P6W=n3i;P6W+=p1ff[50755];P6W+=h6i;var C6W=j2E;C6W+=c2E;var c6W=K9i;c6W+=d6i;c6W+=h5E;var j6W=C2E;j6W+=y3i;var y6W=p1ff[225154];y6W+=P2E;var z6W=X4E;z6W+=c6i;z6W+=A2E;var B6W=z6i;B6W+=t6i;B6W+=n2E;B6W+=n3i;var h6W=n3i;h6W+=p1ff[50755];h6W+=h6i;var i6W=K9i;i6W+=F2E;i6W+=k4i;var T6W=p1ff[225154];T6W+=x7i;T6W+=b2E;var t6W=K9i;t6W+=d6i;t6W+=L1i;t6W+=k4i;var U6W=P9i;U6W+=k2E;U6W+=v6i;var q6W=P9i;q6W+=k2E;q6W+=v6i;var wrapper=$(e2E),liner=$(E2E),nodes=this[y3i][W0E];var position={top:y2O,left:y2O,right:y2O,bottom:y2O};$[i4i](nodes,function(i,node){var L2E="offsetWidt";var X2E="bottom";var M2E="fs";var H2E="fsetHeight";var Q6W=j2E;Q6W+=H2E;var I6W=L2E;I6W+=v6i;var N6W=K9i;N6W+=J3i;N6W+=n3i;var m6W=n3i;m6W+=p1ff[50755];m6W+=h6i;var p6W=L1i;p6W+=p1ff.q3i;p6W+=n3i;var V6W=p1ff[50755];V6W+=C3i;V6W+=M2E;V6W+=w1E;var pos=$(node)[V6W]();p1ff.h3f();node=$(node)[p6W](y2O);position[U4E]+=pos[m6W];position[r2E]+=pos[N6W];position[J2E]+=pos[r2E] + node[I6W];position[X2E]+=pos[U4E] + node[Q6W];});position[U4E]/=nodes[q6W];position[r2E]/=nodes[U6W];position[J2E]/=nodes[t6W];position[T6W]/=nodes[i6W];var top=position[h6W],left=(position[r2E] + position[B6W]) / c2O,width=liner[z6W](),visLeft=left - width / c2O,visRight=visLeft + width,docWidth=$(window)[I4E](),padding=L2O,classes=this[X2i][y6W];p1ff.S3f();wrapper[j6W]({top:top,left:left});if(liner[c6W] && liner[C6W]()[P6W] < y2O){var F6W=f2E;F6W+=y3i;F6W+=y3i;var n6W=g2E;n6W+=x2E;n6W+=y2i;var A6W=p1ff.T3i;A6W+=y3i;A6W+=y3i;wrapper[A6W](w2E,position[n6W])[F6W](S2E);}else {wrapper[H2i](S2E);}if(visRight + padding > docWidth){var b6W=p1ff.T3i;b6W+=y3i;b6W+=y3i;var diff=visRight - docWidth;liner[b6W](K2E,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var k6W=P9i;k6W+=C3i;k6W+=n3i;liner[A2i](k6W,visLeft < padding?-(visLeft - padding):y2O);}return this;};Editor[N2i][e6W]=function(buttons){var r6W=p1ff.q3i;r6W+=p1ff[402431];r6W+=p1ff.T3i;r6W+=v6i;var M6W=p1ff[225154];M6W+=a2E;M6W+=g6i;p1ff.h3f();var L6W=p1ff.N3i;L6W+=p1ff[50755];L6W+=p1ff[261600];var that=this;if(buttons === W2E){var H6W=G2E;H6W+=c3i;var E6W=t6i;E6W+=w8i;E6W+=R6E;buttons=[{text:this[E6W][this[y3i][H6W]][Y2E],action:function(){this[Y2E]();}}];}else if(!Array[T5E](buttons)){buttons=[buttons];}$(this[L6W][M6W])[O2E]();$[r6W](buttons,function(i,btn){var u3S="tabi";var t3S="tabIndex";var l3S="eyup";var D3S="tabIn";var I3S="n></button>";var V3S="ssN";var N3S="<butto";var Q3S="rin";var v3S="pres";var s3S="unct";var g9W=p1ff.N3i;g9W+=p1ff[50755];g9W+=p1ff[261600];var u9W=X4i;u9W+=p1ff.T3i;u9W+=f4i;var v9W=Z3S;v9W+=v3S;v9W+=y3i;var O6W=f4i;O6W+=l3S;var Y6W=D3S;Y6W+=P7i;Y6W+=q6i;var G6W=u3S;G6W+=c3i;G6W+=o3S;var W6W=p1ff[402431];W6W+=g3S;var a6W=C3i;p1ff.S3f();a6W+=s3S;a6W+=d3S;var K6W=R3S;K6W+=V3S;K6W+=p3S;K6W+=p1ff.q3i;var S6W=m3S;S6W+=Y5i;var w6W=N3S;w6W+=I3S;var x6W=b3E;x6W+=K9i;var f6W=n3i;f6W+=p1ff.q3i;f6W+=q6i;f6W+=n3i;var J6W=y3i;J6W+=n3i;J6W+=Q3S;J6W+=L1i;if(typeof btn === J6W){btn={text:btn,action:function(){var X6W=D0E;X6W+=q3S;p1ff.S3f();X6W+=g9i;this[X6W]();}};}var text=btn[f6W] || btn[x6W];var action=btn[U1E] || btn[I4i];$(w6W,{'class':that[S6W][p2E][U3S] + (btn[j0i]?z0i + btn[K6W]:o4i)})[u6E](typeof text === a6W?text(that):text || o4i)[W6W](G6W,btn[t3S] !== undefined?btn[Y6W]:y2O)[I5i](O6W,function(e){var Z9W=f4i;p1ff.h3f();Z9W+=T3S;if(e[Z9W] === E2O && action){action[Q2i](that);}})[I5i](v9W,function(e){var h3S="entDefa";var l9W=f4i;l9W+=T3S;if(e[l9W] === E2O){var D9W=i3S;D9W+=h3S;D9W+=M3i;D9W+=n3i;e[D9W]();}})[I5i](u9W,function(e){e[B3S]();p1ff.h3f();if(action){var o9W=p1ff.T3i;o9W+=p1ff[402431];o9W+=K9i;o9W+=K9i;action[o9W](that,e);}})[d2E](that[g9W][z3S]);});return this;};Editor[s9W][d9W]=function(fieldName){var c3S="includeFields";var A3S="Nam";var P3S="_field";var j3S="est";var that=this;p1ff.S3f();var fields=this[y3i][H1E];if(typeof fieldName === y3S){var m9W=p1ff[50755];m9W+=Y1E;var p9W=h1i;p9W+=p1ff.N3i;p9W+=p1ff.q3i;p9W+=z6i;var V9W=p1ff.N3i;V9W+=j3S;V9W+=Y9i;V9W+=a7i;var R9W=C3i;R9W+=t6i;R9W+=h8i;that[R9W](fieldName)[V9W]();delete fields[fieldName];var orderIdx=$[W3E](fieldName,this[y3i][p9W]);this[y3i][m9W][G1E](orderIdx,j2O);var includeIdx=$[W3E](fieldName,this[y3i][c3S]);if(includeIdx !== -j2O){var I9W=Z5E;I9W+=y6E;I9W+=K3i;var N9W=y0E;N9W+=C3S;this[y3i][N9W][I9W](includeIdx,j2O);}}else {var Q9W=P3S;Q9W+=A3S;Q9W+=Y5i;$[i4i](this[Q9W](fieldName),function(i,name){var q9W=l8i;p1ff.S3f();q9W+=z6i;that[q9W](name);});}return this;};Editor[U9W][l7E]=function(){var t9W=s5i;t9W+=p8i;t9W+=m8i;this[t9W](L4i);return this;};Editor[N2i][n3S]=function(arg1,arg2,arg3,arg4){var F3S="_ac";var L3S="_crudArgs";var f3S='initCreate';var E3S='number';var k3S="ock";var b3S="nClass";var A9W=t9E;A9W+=p1ff.T3i;A9W+=v6i;var P9W=F3S;P9W+=n3i;P9W+=j3i;P9W+=b3S;var C9W=p1ff[225154];C9W+=K9i;C9W+=k3S;var c9W=i2i;c9W+=h6i;c9W+=K9i;c9W+=e6i;var j9W=v4E;j9W+=P9i;var y9W=C3i;y9W+=h1i;y9W+=p1ff[261600];var z9W=T1E;z9W+=i1E;var B9W=p1ff.T3i;B9W+=z6i;B9W+=d9i;var h9W=z4E;h9W+=t6i;h9W+=c3i;var T9W=C3i;T9W+=j8i;T9W+=e3S;T9W+=y3i;var that=this;p1ff.S3f();var fields=this[y3i][T9W];var count=j2O;if(this[t0E](function(){p1ff.h3f();that[n3S](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === E3S){count=arg1;arg1=arg2;arg2=arg3;}this[y3i][H3S]={};for(var i=y2O;i < count;i++){var i9W=C3i;i9W+=M7i;i9W+=e3i;this[y3i][H3S][i]={fields:this[y3i][i9W]};}var argOpts=this[L3S](arg1,arg2,arg3,arg4);this[y3i][y8i]=h9W;this[y3i][U1E]=B9W;this[y3i][z9W]=S0i;this[O0i][y9W][j9W][c9W]=C9W;this[P9W]();this[M3S](this[H1E]());$[A9W](fields,function(name,field){var r3S="multiReset";var X3S="iSet";var F9W=y3i;F9W+=p1ff.q3i;F9W+=n3i;field[r3S]();for(var i=y2O;i < count;i++){var n9W=p1ff[261600];n9W+=J3S;n9W+=X3S;field[n9W](i,field[h3E]());}field[F9W](field[h3E]());});this[D5E](f3S,S0i,function(){var x3S="beO";p1ff.h3f();var k9W=p1ff[261600];k9W+=e6i;k9W+=x3S;k9W+=w3S;var b9W=j7i;b9W+=r3i;that[S3S]();that[S0E](argOpts[b9W]);argOpts[k9W]();});return this;};Editor[N2i][e9W]=function(parent){var W3S="undependent";var K3S=".e";var a3S="sAr";var L9W=K3S;L9W+=P7i;p1ff.S3f();L9W+=h6i;var H9W=w5E;H9W+=e3S;var E9W=t6i;E9W+=a3S;E9W+=z6i;E9W+=e6i;if(Array[E9W](parent)){for(var i=y2O,ien=parent[H4i];i < ien;i++){this[W3S](parent[i]);}return this;}var field=this[H9W](parent);$(field[G3S]())[x7E](L9W);return this;};Editor[M9W][r9W]=function(parent,url,opts){var O3S="so";var v5S="OS";var D5S="ependent";var Y3S="ede";var u7W=w0E;u7W+=Y3S;u7W+=h6i;var w9W=p1ff.q3i;w9W+=Q0E;w9W+=u1i;var x9W=p1ff[427263];x9W+=O3S;x9W+=c3i;var f9W=Z5S;f9W+=v5S;f9W+=r8E;var J9W=l5S;J9W+=N9E;J9W+=a7i;if(Array[J9W](parent)){for(var i=y2O,ien=parent[H4i];i < ien;i++){var X9W=p1ff.N3i;X9W+=D5S;this[X9W](parent[i],url,opts);}return this;}var that=this;var field=this[r1E](parent);var ajaxOpts={type:f9W,dataType:x9W};opts=$[w9W]({event:u5S,data:S0i,preUpdate:S0i,postUpdate:S0i},opts);var update=function(json){var s5S="isa";var i5S="postUpda";var t5S='enable';var p5S="ssag";var I5S="pd";var m5S="preUpdate";var U5S='update';p1ff.h3f();var l7W=o5S;l7W+=y3i;l7W+=n3i;l7W+=g5S;var Z7W=p1ff.N3i;Z7W+=s5S;Z7W+=D6E;Z7W+=p1ff.q3i;var O9W=d5S;O9W+=R5S;var Y9W=V5S;Y9W+=p1ff.N3i;Y9W+=p1ff.q3i;var G9W=p1ff.q3i;G9W+=p1ff[402431];G9W+=p1ff.T3i;G9W+=v6i;var W9W=r2i;W9W+=Y9i;W9W+=z6i;var a9W=S1i;a9W+=p5S;a9W+=p1ff.q3i;var K9W=n8i;K9W+=p1ff[402431];K9W+=K9i;if(opts[m5S]){var S9W=N5S;S9W+=c3E;S9W+=I5S;S9W+=Q5S;opts[S9W](json);}$[i4i]({labels:q5S,options:U5S,values:K9W,messages:a9W,errors:W9W},function(jsonProp,fieldFn){if(json[jsonProp]){$[i4i](json[jsonProp],function(field,val){that[r1E](field)[fieldFn](val);});}});$[G9W]([Y9W,O9W,t5S,Z7W],function(i,key){var T5S="imat";if(json[key]){var v7W=p1ff[402431];v7W+=c3i;v7W+=T5S;v7W+=p1ff.q3i;that[key](json[key],json[v7W]);}});if(opts[l7W]){var D7W=i5S;D7W+=i6i;opts[D7W](json);}field[v5E](L4i);};$(field[G3S]())[I5i](opts[h5S] + u7W,function(e){var z5S="editFiel";var B5S="nctio";var p7W=C3i;p7W+=j6i;p7W+=B5S;p7W+=c3i;var R7W=n8i;R7W+=p1ff[402431];R7W+=K9i;var d7W=n8i;d7W+=H9E;d7W+=j6i;d7W+=Y5i;var s7W=z6i;s7W+=p1ff[50755];s7W+=V8i;var g7W=z5S;g7W+=e3i;var o7W=C3E;o7W+=P7i;if($(field[o7W]())[y5S](e[N7E])[H4i] === y2O){return;}field[v5E](r4i);var data={};data[j5S]=that[y3i][H3S]?_pluck(that[y3i][g7W],c5S):S0i;data[s7W]=data[j5S]?data[j5S][y2O]:S0i;p1ff.h3f();data[d7W]=that[R7W]();if(opts[t0i]){var ret=opts[t0i](data);if(ret){var V7W=p1ff.N3i;V7W+=q0i;opts[V7W]=ret;}}if(typeof url === p7W){var m7W=p1ff.T3i;m7W+=p1ff[402431];m7W+=K9i;m7W+=K9i;var o=url[m7W](that,field[V2i](),data,update);if(o){var I7W=k4i;I7W+=d6i;var N7W=C5S;N7W+=P5S;N7W+=n3i;if(typeof o === N7W && typeof o[I7W] === p1ff.h3i){var Q7W=n3i;Q7W+=v6i;Q7W+=d6i;o[Q7W](function(resolved){p1ff.S3f();if(resolved){update(resolved);}});}else {update(o);}}}else {var t7W=A3i;t7W+=n3i;t7W+=s2E;var U7W=p1ff[402431];U7W+=A5S;U7W+=q6i;if($[G3E](url)){$[o8E](ajaxOpts,url);}else {var q7W=j6i;q7W+=z6i;q7W+=K9i;ajaxOpts[q7W]=url;}$[U7W]($[t7W](ajaxOpts,{url:url,data:data,success:update}));}});p1ff.h3f();return this;};Editor[T7W][i7W]=function(){var r5S='.dte';var k5S="ller";var b5S="displayContro";var e5S="displaye";var L5S="plate";var H5S="tem";var M5S="tro";var A7W=p1ff.N3i;A7W+=p1ff[50755];A7W+=p1ff[261600];var C7W=n5S;C7W+=F5S;var c7W=b5S;c7W+=k5S;var B7W=p8i;B7W+=t9E;B7W+=z6i;var h7W=e5S;h7W+=p1ff.N3i;if(this[y3i][h7W]){this[l7E]();}this[B7W]();if(this[y3i][E5S]){var j7W=H5S;j7W+=L5S;var y7W=p1ff[402431];y7W+=h6i;y7W+=z9i;y7W+=u1i;var z7W=p1ff[225154];z7W+=p1ff[50755];z7W+=p1ff.N3i;z7W+=a7i;$(z7W)[y7W](this[y3i][j7W]);}var controller=this[y3i][c7W];if(controller[C7W]){var P7W=W7i;P7W+=M5S;P7W+=a7i;controller[P7W](this);}$(document)[x7E](r5S + this[y3i][J5S]);this[A7W]=S0i;p1ff.h3f();this[y3i]=S0i;};Editor[n7W][X5S]=function(name){var that=this;p1ff.S3f();$[i4i](this[f5S](name),function(i,n){var x5S="sable";var F7W=d8i;F7W+=x5S;p1ff.S3f();that[r1E](n)[F7W]();});return this;};Editor[N2i][b7W]=function(show){if(show === undefined){return this[y3i][w5S];}return this[show?S5S:P6E]();};Editor[k7W][e7W]=function(){var E7W=p1ff[261600];E7W+=p1ff[402431];E7W+=h6i;p1ff.S3f();return $[E7W](this[y3i][H1E],function(field,name){p1ff.S3f();return field[w5S]()?name:S0i;});};Editor[H7W][L7W]=function(){var a5S="isplayCont";var W5S="rolle";var r7W=K5S;r7W+=p1ff.q3i;var M7W=p1ff.N3i;M7W+=a5S;M7W+=W5S;M7W+=z6i;return this[y3i][M7W][r7W](this);};Editor[N2i][J7W]=function(items,arg1,arg2,arg3,arg4){var x7W=p1ff[261600];x7W+=p1ff[402431];x7W+=n7i;var f7W=s5i;f7W+=p1ff.q3i;f7W+=d8i;f7W+=n3i;var X7W=S9i;X7W+=G5S;X7W+=Y5S;X7W+=y3i;var that=this;if(this[t0E](function(){p1ff.h3f();that[F3i](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[X7W](arg1,arg2,arg3,arg4);this[f7W](items,this[h0E](O5S,items),x7W,argOpts[Y3E],function(){var S7W=p1ff[50755];S7W+=h6i;S7W+=n3i;S7W+=y3i;var w7W=s5i;w7W+=Z6S;that[S3S]();p1ff.S3f();that[w7W](argOpts[S7W]);argOpts[v6S]();});return this;};Editor[K7W][l6S]=function(name){var that=this;$[i4i](this[f5S](name),function(i,n){var a7W=C3i;a7W+=M7i;p1ff.S3f();a7W+=p1ff.N3i;that[a7W](n)[l6S]();});return this;};Editor[W7W][v3E]=function(name,msg){var D6S="rap";var u6S="essage";var Y7W=V8i;Y7W+=D6S;Y7W+=Z4E;p1ff.S3f();var G7W=p1ff.N3i;G7W+=p1ff[50755];G7W+=p1ff[261600];var wrapper=$(this[G7W][Y7W]);if(msg === undefined){var O7W=x2i;O7W+=u6S;this[O7W](this[O0i][R2E],name,r4i,function(){var g6S='inFormError';p1ff.h3f();wrapper[o6S](g6S,name !== undefined && name !== o4i);});this[y3i][s6S]=name;}else {var Z8W=C3i;Z8W+=j8i;Z8W+=K9i;Z8W+=p1ff.N3i;this[Z8W](name)[v3E](msg);}return this;};Editor[N2i][r1E]=function(name){var V6S="ame - ";var R6S="wn field n";var d6S="nkno";var fields=this[y3i][H1E];if(!fields[name]){var v8W=c3E;v8W+=d6S;v8W+=R6S;v8W+=V6S;throw v8W + name;}return fields[name];};Editor[l8W][D8W]=function(){return $[p6S](this[y3i][H1E],function(field,name){return name;});};Editor[u8W][o8W]=_api_file;Editor[g8W][B4i]=_api_files;Editor[s8W][b5E]=function(name){var m8W=L1i;m8W+=p1ff.q3i;m8W+=n3i;var R8W=m6S;R8W+=z6i;R8W+=N9E;R8W+=a7i;var that=this;if(!name){var d8W=w5E;d8W+=N6S;name=this[d8W]();}if(Array[R8W](name)){var out={};$[i4i](name,function(i,n){var p8W=I6S;p8W+=n3i;var V8W=C3i;V8W+=t6i;V8W+=h8i;out[n]=that[V8W](n)[p8W]();});return out;}return this[r1E](name)[m8W]();};Editor[N8W][I8W]=function(names,animate){var q6S="Names";var Q6S="_f";var Q8W=Q6S;p1ff.h3f();Q8W+=t6i;Q8W+=h8i;Q8W+=q6S;var that=this;$[i4i](this[Q8W](names),function(i,n){var U6S="hide";var q8W=w5E;p1ff.h3f();q8W+=e3S;that[q8W](n)[U6S](animate);});return this;};Editor[U8W][t6S]=function(includeHash){var T8W=F3i;T8W+=T6S;var t8W=p1ff[261600];t8W+=x4E;return $[t8W](this[y3i][T8W],function(edit,idSrc){return includeHash === r4i?i6S + idSrc:idSrc;});};Editor[N2i][i8W]=function(inNames){var B6S="inError";var h6S="formErr";p1ff.h3f();var h8W=h6S;h8W+=h1i;var formError=$(this[O0i][h8W]);if(this[y3i][s6S]){return r4i;}var names=this[f5S](inNames);for(var i=y2O,ien=names[H4i];i < ien;i++){if(this[r1E](names[i])[B6S]()){return r4i;}}return L4i;};Editor[B8W][z8W]=function(cell,fieldName,opts){var y6S="TE_Field";var c6S="lasses";var F6S="lainObject";var A6S="dataSour";var b6S="inline";var P6S="vidu";var z6S="iv.D";var n6S="pti";var j6S="nl";var e8W=p1ff.N3i;e8W+=z6S;e8W+=y6S;var F8W=t9E;F8W+=p1ff.T3i;F8W+=v6i;var n8W=t6i;n8W+=j6S;n8W+=t6i;n8W+=p5i;var A8W=p1ff.T3i;A8W+=c6S;var P8W=C6S;P8W+=t6i;P8W+=P6S;P8W+=H9E;var C8W=s5i;p1ff.h3f();C8W+=A6S;C8W+=K3i;var c8W=u6i;c8W+=n6S;c8W+=p1ff[50755];c8W+=g6i;var j8W=d0i;j8W+=u1i;var y8W=O5E;y8W+=Z5S;y8W+=F6S;var that=this;if($[y8W](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[j8W]({},this[y3i][c8W][b6S],opts);var editFields=this[C8W](P8W,cell,fieldName);var node,field;var countOuter=y2O,countInner;var closed=L4i;var classes=this[A8W][n8W];$[F8W](editFields,function(i,editField){var k6S="displayF";var e6S='Cannot edit more than one row inline at a time';var b8W=k6S;b8W+=f1E;if(countOuter > y2O){throw e6S;}node=$(editField[E6S][y2O]);countInner=y2O;$[i4i](editField[b8W],function(j,f){var H6S="Cannot e";var L6S="dit m";var r6S="eld inline at a time";var M6S="ore than one fi";if(countInner > y2O){var k8W=H6S;k8W+=L6S;k8W+=M6S;k8W+=r6S;throw k8W;}p1ff.S3f();field=f;countInner++;});countOuter++;p1ff.S3f();;});if($(e8W,node)[H4i]){return this;}if(this[t0E](function(){that[b6S](cell,fieldName,opts);})){return this;}this[J6S](cell,editFields,X6S,opts,function(){var Z9S="conte";var S6S="iv class=";var o9S='<div class="DTE_Processing_Indicator"><span></span></div>';var v9S="inli";var W6S="dg";var u9S='px"';var D9S='style="width:';var Y6S="userA";var O6S="gent";var f6S="mE";var a6S="dth";var G6S="e/";var Q4W=u3E;Q4W+=Q3E;var v4W=C3i;v4W+=h1i;v4W+=f6S;v4W+=x6S;var Z4W=p1ff.N3i;Z4W+=p1ff[50755];Z4W+=p1ff[261600];var O8W=p1ff[402431];O8W+=l9E;O8W+=u1i;var Y8W=p1ff[402431];Y8W+=D9E;Y8W+=s2E;var G8W=z6i;G8W+=w6S;var W8W=K9i;W8W+=t6i;W8W+=c3i;W8W+=r2i;var a8W=p1i;a8W+=p1ff.N3i;a8W+=t6i;a8W+=T1i;var K8W=q1i;K8W+=Z4i;var S8W=K9i;S8W+=n7i;S8W+=p1ff.q3i;S8W+=z6i;var w8W=j1i;w8W+=p1ff.N3i;w8W+=S6S;w8W+=q1i;var x8W=q1i;x8W+=m1i;var f8W=t7E;f8W+=l9E;f8W+=z6i;var X8W=p1ff[402431];X8W+=h6i;X8W+=h6i;X8W+=s2E;var J8W=K6S;J8W+=a6S;var r8W=j5i;r8W+=W6S;r8W+=G6S;var M8W=Y6S;M8W+=O6S;var L8W=p1ff.N3i;L8W+=t2E;L8W+=v6i;var H8W=Z9S;H8W+=O7i;H8W+=y3i;var E8W=v9S;E8W+=c3i;E8W+=p1ff.q3i;var namespace=that[S0E](opts);var ret=that[K0E](E8W);if(!ret){return that;}var children=node[H8W]()[L8W]();var style=navigator[M8W][l9S](r8W) !== -j2O?D9S + node[J8W]() + u9S:o4i;node[X8W]($(l2E + classes[f8W] + x8W + w8W + classes[S8W] + K8W + style + p5E + o9S + n0i + l2E + classes[z3S] + k0i + a8W));node[y5S](g9S + classes[W8W][G8W](/ /g,s9S))[Y8W](field[G3S]())[O8W](that[Z4W][v4W]);if(opts[z3S]){var l4W=Z9i;l4W+=R8i;l4W+=d9S;node[y5S](g9S + classes[z3S][l4W](/ /g,s9S))[F3E](that[O0i][z3S]);}that[q2E](function(submitComplete,action){var V9S="namicIn";var Q9S="contents";var R9S="learDy";var I9S="tac";var g4W=S9i;g4W+=R9S;g4W+=V9S;g4W+=u3E;var D4W=p8i;D4W+=p9S;closed=r4i;$(document)[x7E](D4W + namespace);if(!submitComplete || action !== m9S){var o4W=N9S;o4W+=p1ff.N3i;var u4W=P7i;u4W+=I9S;u4W+=v6i;node[Q9S]()[u4W]();node[o4W](children);}that[g4W]();return X6S;;});setTimeout(function(){var d4W=x4i;d4W+=f4i;var s4W=p1ff[50755];s4W+=c3i;if(closed){return;}$(document)[s4W](d4W + namespace,function(e){var U9S="wns";var q9S="Array";var t9S="addBac";var N4W=n7i;N4W+=q9S;var m4W=M2i;m4W+=z6i;m4W+=b5E;var p4W=p1ff[50755];p4W+=U9S;var V4W=t9S;V4W+=f4i;var R4W=C3i;R4W+=c3i;var back=$[R4W][V4W]?T9S:i9S;if(!field[x0i](p4W,e[m4W]) && $[N4W](node[y2O],$(e[N7E])[C2i]()[back]()) === -j2O){var I4W=d0E;I4W+=z6i;that[I4W]();}});},y2O);that[h9S]([field],opts[Q4W]);that[B9S](X6S,r4i);});return this;};Editor[q4W][z9S]=function(name,msg){var y9S="ormIn";if(msg === undefined){var U4W=C3i;U4W+=y9S;U4W+=u3E;this[j9S](this[O0i][U4W],name);}else {this[r1E](name)[z9S](msg);}p1ff.h3f();return this;};Editor[N2i][t4W]=function(mode){var F9S="e mode is not supported";p1ff.h3f();var n9S="Changing from creat";var A9S="ntly in an editing mod";var P9S="Not curr";var c9S="crea";var z4W=G2E;z4W+=c3i;var h4W=c9S;h4W+=i6i;var i4W=C9S;i4W+=d9i;if(!mode){return this[y3i][U1E];}if(!this[y3i][U1E]){var T4W=P9S;T4W+=p1ff.q3i;T4W+=A9S;T4W+=p1ff.q3i;throw new Error(T4W);}else if(this[y3i][U1E] === i4W && mode !== h4W){var B4W=n9S;B4W+=F9S;throw new Error(B4W);}this[y3i][z4W]=mode;return this;};Editor[N2i][b9S]=function(){p1ff.h3f();return this[y3i][b9S];};Editor[N2i][k9S]=function(fieldNames){var P4W=w5E;P4W+=e3S;var that=this;if(fieldNames === undefined){var y4W=A4i;y4W+=p1ff.q3i;y4W+=N6S;fieldNames=this[y4W]();}p1ff.S3f();if(Array[T5E](fieldNames)){var j4W=p1ff.q3i;j4W+=p1ff[402431];j4W+=p1ff.T3i;j4W+=v6i;var out={};$[j4W](fieldNames,function(i,name){var e9S="multiGe";var C4W=e9S;C4W+=n3i;var c4W=C3i;c4W+=j8i;p1ff.h3f();c4W+=K9i;c4W+=p1ff.N3i;out[name]=that[c4W](name)[C4W]();});return out;}return this[P4W](fieldNames)[k9S]();};Editor[N2i][A4W]=function(fieldNames,val){var H9S="inObj";var E9S="sPla";var n4W=t6i;n4W+=E9S;n4W+=H9S;n4W+=p1ff[502672];var that=this;if($[n4W](fieldNames) && val === undefined){var F4W=t9E;F4W+=H6i;$[F4W](fieldNames,function(name,value){var L9S="lti";var M9S="Set";var b4W=c7i;p1ff.h3f();b4W+=L9S;b4W+=M9S;that[r1E](name)[b4W](value);});}else {var k4W=A4i;k4W+=k3i;k4W+=p1ff.N3i;this[k4W](fieldNames)[r9S](val);}return this;};Editor[N2i][G3S]=function(name){p1ff.h3f();var H4W=C3i;H4W+=z8i;var e4W=p1ff[261600];e4W+=p1ff[402431];e4W+=h6i;var that=this;if(!name){name=this[K1E]();}return Array[T5E](name)?$[e4W](name,function(n){var E4W=J9S;p1ff.S3f();E4W+=p1ff.N3i;return that[E4W](n)[G3S]();}):this[H4W](name)[G3S]();};Editor[L4W][M4W]=function(name,fn){var r4W=p1ff[50755];r4W+=C3i;r4W+=C3i;$(this)[r4W](this[X9S](name),fn);return this;};Editor[N2i][I5i]=function(name,fn){p1ff.h3f();var J4W=p1ff[50755];J4W+=c3i;$(this)[J4W](this[X9S](name),fn);return this;};Editor[N2i][f9S]=function(name,fn){$(this)[f9S](this[X9S](name),fn);return this;};Editor[N2i][X4W]=function(){var w9S="displayReo";var W9S='main';var x9S="displayCon";var W4W=D8E;W4W+=c3i;var a4W=x9S;a4W+=R5E;a4W+=U8i;var K4W=p1ff[261600];K4W+=p1ff[402431];K4W+=t6i;K4W+=c3i;var f4W=s5i;f4W+=w9S;f4W+=Y1E;p1ff.h3f();var that=this;this[f4W]();this[q2E](function(){var x4W=p1ff.T3i;p1ff.S3f();x4W+=K9i;x4W+=m8i;that[y3i][g8E][x4W](that,function(){p1ff.S3f();var K9S="rDyna";var S9S="_cle";var a9S="micInfo";var S4W=p8i;S4W+=m8i;S4W+=p1ff.N3i;var w4W=S9S;w4W+=p1ff[402431];w4W+=K9S;w4W+=a9S;that[w4W]();that[D5E](S4W,[W9S]);});});var ret=this[K0E](K4W);if(!ret){return this;}this[y3i][a4W][W4W](this,this[O0i][V9E],function(){var G9S="ned";var O4W=D8E;O4W+=G9S;var Y4W=F3i;Y4W+=Y9S;Y4W+=y3i;var G4W=c0E;G4W+=Q3E;that[G4W]($[p6S](that[y3i][K1E],function(name){return that[y3i][H1E][name];}),that[y3i][Y4W][y2E]);that[D5E](O4W,[W9S,that[y3i][U1E]]);});this[B9S](W9S,L4i);return this;};Editor[Z1W][K1E]=function(set){var D7S="All f";var u7S="ields, and no additional fields, must be provided for ordering.";var Z7S="sort";var d1W=p1ff[50755];d1W+=z6i;d1W+=P7i;d1W+=z6i;var s1W=p1ff.q3i;s1W+=Q0E;s1W+=u1i;var o1W=y3i;o1W+=p1ff[50755];p1ff.h3f();o1W+=z6i;o1W+=n3i;var u1W=y3i;u1W+=K9i;u1W+=t6i;u1W+=K3i;var D1W=p1ff[50755];D1W+=z6i;D1W+=P7i;D1W+=z6i;if(!set){var v1W=p1ff[50755];v1W+=z6i;v1W+=O9S;return this[y3i][v1W];}if(arguments[H4i] && !Array[T5E](set)){var l1W=N9i;l1W+=C9i;set=Array[l1W][I2i][Q2i](arguments);}if(this[y3i][D1W][I2i]()[Z7S]()[v7S](l7S) !== set[u1W]()[o1W]()[v7S](l7S)){var g1W=D7S;g1W+=u7S;throw g1W;}$[s1W](this[y3i][d1W],set);this[M3S]();return this;};Editor[N2i][O2i]=function(items,arg1,arg2,arg3,arg4){var o7S="ven";var g7S="actionCl";var R7S='initRemove';var q1W=r9i;q1W+=o7S;q1W+=n3i;var Q1W=s5i;Q1W+=g7S;Q1W+=y1E;var I1W=p1ff.N3i;I1W+=t6i;I1W+=Z5E;I1W+=k6E;var N1W=N0E;N1W+=p1ff[261600];var m1W=Z9i;m1W+=p1ff[261600];m1W+=s7S;var p1W=w5E;p1W+=e3S;p1W+=y3i;var V1W=S9i;V1W+=G5S;V1W+=Y5S;V1W+=y3i;var that=this;if(this[t0E](function(){var R1W=Z9i;R1W+=O5i;R1W+=d7S;that[R1W](items,arg1,arg2,arg3,arg4);})){return this;}if(items[H4i] === undefined){items=[items];}var argOpts=this[V1W](arg1,arg2,arg3,arg4);var editFields=this[h0E](p1W,items);this[y3i][U1E]=m1W;this[y3i][b9S]=items;this[y3i][H3S]=editFields;this[O0i][N1W][E8E][I1W]=J5E;this[Q1W]();this[q1W](R7S,[_pluck(editFields,V7S),_pluck(editFields,c5S),items],function(){p1ff.h3f();var p7S='initMultiRemove';that[D5E](p7S,[editFields,items],function(){var U1W=F3i;U1W+=Y9S;U1W+=y3i;that[S3S]();that[S0E](argOpts[Y3E]);argOpts[v6S]();var opts=that[y3i][U1W];if(opts[y2E] !== S0i){var T1W=m3E;T1W+=y3i;var t1W=p1ff.q3i;t1W+=F0E;$(m7S,that[O0i][z3S])[t1W](opts[y2E])[T1W]();}});});return this;};Editor[N2i][i1W]=function(set,val){var that=this;p1ff.S3f();if(!$[G3E](set)){var o={};o[set]=val;set=o;}$[i4i](set,function(n,v){p1ff.S3f();var h1W=v9E;h1W+=n3i;that[r1E](n)[h1W](v);});return this;};Editor[B1W][N7S]=function(names,animate){p1ff.S3f();var Q7S="dName";var I7S="_fiel";var y1W=I7S;y1W+=Q7S;y1W+=y3i;var z1W=q7S;z1W+=v6i;var that=this;$[z1W](this[y1W](names),function(i,n){var c1W=d5S;c1W+=p1ff[50755];c1W+=V8i;var j1W=C3i;j1W+=j8i;p1ff.S3f();j1W+=K9i;j1W+=p1ff.N3i;that[j1W](n)[c1W](animate);});return this;};Editor[C1W][P1W]=function(successCallback,errorCallback,formatdata,hide){var e1W=q7S;e1W+=v6i;var n1W=U7S;n1W+=t7S;var A1W=C3i;A1W+=f1E;var that=this,fields=this[y3i][A1W],errorFields=[],errorReady=y2O,sent=L4i;if(this[y3i][n1W] || !this[y3i][U1E]){return this;}this[T7S](r4i);var send=function(){var i7S="Submit";var F1W=n7i;F1W+=g9i;F1W+=i7S;if(errorFields[H4i] !== errorReady || sent){return;}that[D5E](F1W,[that[y3i][U1E]],function(result){var k1W=s5i;p1ff.h3f();k1W+=h7S;k1W+=t6i;k1W+=n3i;if(result === L4i){var b1W=s5i;b1W+=v5E;that[b1W](L4i);return;}sent=r4i;that[k1W](successCallback,errorCallback,formatdata,hide);});};this[v3E]();$[e1W](fields,function(name,field){var B7S="inE";var E1W=B7S;E1W+=x6S;if(field[E1W]()){errorFields[h4i](name);}});$[i4i](errorFields,function(i,name){var H1W=p1ff.q3i;H1W+=z6i;H1W+=Y9i;H1W+=z6i;fields[name][H1W](o4i,function(){errorReady++;p1ff.h3f();send();});});send();return this;};Editor[L1W][E5S]=function(set){if(set === undefined){return this[y3i][E5S];}this[y3i][E5S]=set === S0i?S0i:$(set);return this;};Editor[N2i][M1W]=function(title){var y7S="dren";var z7S="iv.";var S1W=U2i;S1W+=t2i;var w1W=p1ff.T3i;w1W+=p1ff[50755];w1W+=R8E;var x1W=x9E;x1W+=t1E;x1W+=z6i;var f1W=p1ff.N3i;f1W+=z7S;var X1W=H6i;X1W+=P3i;X1W+=y7S;var J1W=v6i;J1W+=p1ff.q3i;J1W+=t1E;J1W+=z6i;var r1W=p1ff.N3i;r1W+=p1ff[50755];r1W+=p1ff[261600];var header=$(this[r1W][J1W])[X1W](f1W + this[X2i][x1W][w1W]);if(title === undefined){return header[u6E]();}if(typeof title === S1W){var K1W=O6i;K1W+=h6i;K1W+=t6i;title=title(this,new DataTable[K1W](this[y3i][D2E]));}header[u6E](title);return this;};Editor[N2i][a1W]=function(field,value){p1ff.S3f();if(value !== undefined || $[G3E](field)){return this[k5E](field,value);}return this[b5E](field);;};var apiRegister=DataTable[W1W][G1W];function __getInst(api){var j7S="Init";var c7S="context";var Y1W=p1ff[50755];Y1W+=j7S;var ctx=api[c7S][y2O];p1ff.S3f();return ctx[Y1W][C7S] || ctx[P7S];}function __setBasic(inst,opts,type,plural){var e7S=/%d/;var A7S="messag";var E7S='1';var D0W=A7S;D0W+=p1ff.q3i;var Z0W=n3i;Z0W+=x8E;if(!opts){opts={};}if(opts[z3S] === undefined){var O1W=p1ff[225154];O1W+=D8i;O1W+=y3i;opts[O1W]=W2E;}if(opts[Z0W] === undefined){var l0W=t6i;l0W+=L0E;var v0W=n3i;v0W+=n7S;v0W+=p1ff.q3i;opts[v0W]=inst[l0W][type][I2E];}if(opts[D0W] === undefined){var u0W=z6i;u0W+=F7S;if(type === u0W){var s0W=Z9i;s0W+=d5E;s0W+=p1ff.q3i;var g0W=p1ff[261600];g0W+=Y5i;g0W+=A0E;g0W+=p1ff.q3i;var o0W=t6i;o0W+=b7S;o0W+=c3i;var confirm=inst[o0W][type][k7S];opts[g0W]=plural !== j2O?confirm[s5i][s0W](e7S,plural):confirm[E7S];}else {var d0W=H7S;d0W+=I6S;opts[d0W]=o4i;}}p1ff.h3f();return opts;}apiRegister(L7S,function(){return __getInst(this);});apiRegister(R0W,function(opts){var V0W=C9S;V0W+=t9E;V0W+=n3i;V0W+=p1ff.q3i;var inst=__getInst(this);inst[n3S](__setBasic(inst,opts,V0W));return this;});apiRegister(p0W,function(opts){var inst=__getInst(this);inst[F3i](this[y2O][y2O],__setBasic(inst,opts,m9S));return this;});apiRegister(m0W,function(opts){var I0W=U5i;I0W+=t6i;I0W+=n3i;var N0W=p1ff.q3i;N0W+=p1ff.N3i;N0W+=g9i;var inst=__getInst(this);p1ff.S3f();inst[N0W](this[y2O],__setBasic(inst,opts,I0W));return this;});apiRegister(M7S,function(opts){var q0W=Z9i;q0W+=O5i;q0W+=d7S;var Q0W=z6i;Q0W+=F7S;var inst=__getInst(this);inst[Q0W](this[y2O][y2O],__setBasic(inst,opts,q0W,j2O));return this;});apiRegister(r7S,function(opts){var U0W=K9i;U0W+=F2E;U0W+=n3i;U0W+=v6i;var inst=__getInst(this);inst[O2i](this[y2O],__setBasic(inst,opts,J7S,this[y2O][U0W]));return this;});apiRegister(t0W,function(type,opts){var f7S="inO";var T0W=X7S;T0W+=f7S;T0W+=e4i;if(!type){type=X6S;}else if($[T0W](type)){opts=type;type=X6S;}__getInst(this)[type](this[y2O][y2O],opts);return this;});apiRegister(x7S,function(opts){p1ff.S3f();__getInst(this)[O0E](this[y2O],opts);return this;});apiRegister(i0W,_api_file);apiRegister(w7S,_api_files);$(document)[h0W](S7S,function(e,ctx,json){var a7S="spa";p1ff.S3f();var W7S='dt';var z0W=C3i;z0W+=P3i;z0W+=Y5i;var B0W=K7S;B0W+=S1i;B0W+=a7S;B0W+=K3i;if(e[B0W] !== W7S){return;}if(json && json[z0W]){var y0W=q7S;y0W+=v6i;$[y0W](json[B4i],function(name,files){var G7S="fil";p1ff.S3f();if(!Editor[B4i][name]){var j0W=G7S;j0W+=p1ff.q3i;j0W+=y3i;Editor[j0W][name]={};}$[o8E](Editor[B4i][name],files);});}});Editor[c0W]=function(msg,tn){var O7S="ase refer to https://datatables.net/tn/";var Y7S=" For more information, ple";var C0W=Y7S;C0W+=O7S;throw tn?msg + C0W + tn:msg;};Editor[Z8S]=function(data,props,fn){var P0W=l5S;P0W+=z6i;P0W+=p1ff[402431];P0W+=a7i;var i,ien,dataPoint;props=$[o8E]({label:q5S,value:v8S},props);if(Array[P0W](data)){var A0W=P9i;A0W+=c3i;A0W+=h5E;for((i=y2O,ien=data[A0W]);i < ien;i++){dataPoint=data[i];if($[G3E](dataPoint)){var b0W=l8S;b0W+=k3i;var F0W=t7i;F0W+=V0E;F0W+=p1ff.q3i;var n0W=n8i;n0W+=p1ff[402431];n0W+=D8S;fn(dataPoint[props[n0W]] === undefined?dataPoint[props[c0i]]:dataPoint[props[F0W]],dataPoint[props[b0W]],i,dataPoint[u8S]);}else {fn(dataPoint,dataPoint,i);}}}else {i=y2O;$[i4i](data,function(key,val){fn(val,key,i);p1ff.h3f();i++;});}};Editor[o8S]=function(id){p1ff.S3f();return id[V5E](/\./g,l7S);};Editor[k0W]=function(editor,conf,files,progressCallback,completeCallback){var h4S="limitLeft";var N8S='A server error occurred while uploading the file';var V8S="dTe";var g8S="adAsDataURL";var s8S="<i>Uploading file</i";var R8S="Rea";var d8S="file";var I8S="onload";var x2W=Z9i;x2W+=g8S;var H0W=s8S;H0W+=m1i;var E0W=d8S;E0W+=R8S;E0W+=V8S;E0W+=s6i;var e0W=p8S;e0W+=m8S;e0W+=t6i;e0W+=I5i;var reader=new FileReader();var counter=y2O;var ids=[];var generalError=N8S;editor[v3E](conf[N0i],o4i);if(typeof conf[v0E] === e0W){conf[v0E](files,function(ids){p1ff.h3f();completeCallback[Q2i](editor,ids);});return;}progressCallback(conf,conf[E0W] || H0W);reader[I8S]=function(e){var k8S="h an object. Please use it as a function inst";var i8S="oad";var e8S="ead.";var A8S="plo";var U8S="reSubmi";var T8S="eUp";var b8S="Upload feature cannot use `ajax.data` wit";var z8S="jax";var P8S="jaxDa";var C8S='uploadField';var F8S='No Ajax option specified for upload plug-in';var h8S="isPlainObj";var t8S="t.DTE_Upload";var E8S="readAsDataURL";var c8S='upload';var J8S="load";var y8S="ajaxD";var g2W=Q8S;g2W+=I5i;var o2W=q8S;o2W+=n3i;var u2W=h6i;u2W+=U8S;u2W+=t8S;var v2W=K7S;v2W+=p1ff[261600];v2W+=p1ff.q3i;var Z2W=h9i;Z2W+=T8S;Z2W+=K9i;Z2W+=i8S;var O0W=r9i;O0W+=n8i;O0W+=d6i;O0W+=n3i;var G0W=h8S;G0W+=p1ff[502672];var K0W=B8S;K0W+=p1ff[50755];K0W+=c3i;var S0W=p1ff.N3i;S0W+=p1ff[402431];S0W+=n3i;S0W+=p1ff[402431];var w0W=p1ff[402431];w0W+=A5S;w0W+=q6i;var f0W=p1ff[402431];f0W+=z8S;var J0W=y8S;J0W+=q0i;var r0W=c3i;r0W+=p3S;r0W+=p1ff.q3i;var M0W=m2i;M0W+=s2E;var L0W=j8S;L0W+=t2i;var data=new FormData();var ajax;data[F3E](L0W,c8S);data[M0W](C8S,conf[r0W]);data[F3E](c8S,files[counter]);if(conf[J0W]){var X0W=p1ff[402431];X0W+=P8S;X0W+=M2i;conf[X0W](data,files[counter],counter);}if(conf[f0W]){ajax=conf[v0E];}else if($[G3E](editor[y3i][v0E])){var x0W=j6i;x0W+=A8S;x0W+=s8i;ajax=editor[y3i][v0E][n8S]?editor[y3i][v0E][x0W]:editor[y3i][v0E];}else if(typeof editor[y3i][w0W] === y3S){ajax=editor[y3i][v0E];}p1ff.h3f();if(!ajax){throw new Error(F8S);}if(typeof ajax === y3S){ajax={url:ajax};}if(typeof ajax[S0W] === K0W){var a0W=u0i;a0W+=n3i;a0W+=p1ff[402431];var d={};var ret=ajax[a0W](d);if(ret !== undefined && typeof ret !== y3S){d=ret;}$[i4i](d,function(key,value){var W0W=x4E;W0W+=m2E;p1ff.S3f();data[W0W](key,value);});}else if($[G0W](ajax[t0i])){var Y0W=b8S;Y0W+=k8S;Y0W+=e8S;throw new Error(Y0W);}var preRet=editor[O0W](Z2W,[conf[v2W],files[counter],data]);if(preRet === L4i){var l2W=K9i;l2W+=F2E;l2W+=n3i;l2W+=v6i;if(counter < files[l2W] - j2O){counter++;reader[E8S](files[counter]);}else {var D2W=p1ff.T3i;D2W+=p1ff[402431];D2W+=K9i;D2W+=K9i;completeCallback[D2W](editor,ids);}return;}var submit=L4i;editor[I5i](u2W,function(){submit=r4i;return L4i;});$[v0E]($[o8E]({},ajax,{type:o2W,data:data,dataType:g2W,contentType:L4i,processData:L4i,xhr:function(){var f8S="onprogress";var r8S="xhr";var L8S="Sett";var M8S="ngs";var d2W=H8S;d2W+=u7E;d2W+=s8i;var s2W=v0E;s2W+=L8S;s2W+=t6i;s2W+=M8S;var xhr=$[s2W][r8S]();if(xhr[d2W]){var N2W=I5i;N2W+=J8S;N2W+=p1ff.q3i;N2W+=u1i;var m2W=H8S;m2W+=u7E;m2W+=p1ff[402431];m2W+=p1ff.N3i;var R2W=X8S;R2W+=p1ff[402431];R2W+=p1ff.N3i;xhr[R2W][f8S]=function(e){var w8S="loaded";var W8S=':';p1ff.S3f();var S8S="total";var x8S="Computabl";var K8S="toFixed";var a8S="%";var V2W=b4i;V2W+=k4i;V2W+=x8S;V2W+=p1ff.q3i;if(e[V2W]){var p2W=K9i;p2W+=d6i;p2W+=L1i;p2W+=k4i;var percent=(e[w8S] / e[S8S] * l3i)[K8S](y2O) + a8S;progressCallback(conf,files[H4i] === j2O?percent:counter + W8S + files[p2W] + z0i + percent);}};xhr[m2W][N2W]=function(e){p1ff.h3f();var Y8S='Processing';var I2W=U7S;I2W+=t7S;I2W+=G8S;I2W+=n3i;progressCallback(conf,conf[I2W] || Y8S);};}return xhr;},success:function(json){var R4S="tu";var D4S="rS";var o4S="cess";var t4S="aURL";var I4S="les";var l4S="uploadXh";var v4S="rors";var m4S="oa";var U4S="dAsDat";var u4S="uc";var p4S="upl";var s4S="Submit.DTE_Upl";var Z4S="fieldEr";var C2W=t6i;p1ff.S3f();C2W+=p1ff.N3i;var c2W=j6i;c2W+=h6i;c2W+=O8S;c2W+=p1ff.N3i;var j2W=H8S;j2W+=J8S;var T2W=K9i;T2W+=p1ff.q3i;T2W+=c3i;T2W+=h5E;var t2W=Z4S;t2W+=v4S;var U2W=l4S;U2W+=D4S;U2W+=u4S;U2W+=o4S;var q2W=g4S;q2W+=p1ff.q3i;q2W+=O7i;var Q2W=N5S;Q2W+=s4S;Q2W+=i8S;editor[x7E](Q2W);editor[q2W](U2W,[conf[N0i],json]);if(json[t2W] && json[d4S][T2W]){var i2W=Z4S;i2W+=v4S;var errors=json[i2W];for(var i=y2O,ien=errors[H4i];i < ien;i++){var B2W=y3i;B2W+=M2i;B2W+=R4S;B2W+=y3i;var h2W=c3i;h2W+=p3S;h2W+=p1ff.q3i;editor[v3E](errors[i][h2W],errors[i][B2W]);}}else if(json[v3E]){var y2W=r2i;y2W+=z6i;y2W+=h1i;var z2W=r2i;z2W+=z6i;z2W+=h1i;editor[z2W](json[y2W]);}else if(!json[j2W] || !json[c2W][C2W]){var P2W=c3i;P2W+=p3S;P2W+=p1ff.q3i;editor[v3E](conf[P2W],generalError);}else {var L2W=K9i;L2W+=V4S;L2W+=v6i;var H2W=t6i;H2W+=p1ff.N3i;var E2W=p4S;E2W+=m4S;E2W+=p1ff.N3i;var e2W=N4S;e2W+=d5S;if(json[B4i]){var A2W=C3i;A2W+=t6i;A2W+=I4S;$[i4i](json[A2W],function(table,files){var Q4S="ile";var k2W=A4i;k2W+=K9i;k2W+=p1ff.q3i;k2W+=y3i;var b2W=A3i;b2W+=n3i;b2W+=d6i;b2W+=p1ff.N3i;var n2W=A4i;n2W+=P9i;n2W+=y3i;if(!Editor[n2W][table]){var F2W=C3i;F2W+=Q4S;F2W+=y3i;Editor[F2W][table]={};}$[b2W](Editor[k2W][table],files);});}ids[e2W](json[E2W][H2W]);if(counter < files[L2W] - j2O){var M2W=q4S;M2W+=U4S;M2W+=t4S;counter++;reader[M2W](files[counter]);}else {completeCallback[Q2i](editor,ids);if(submit){editor[Y2E]();}}}progressCallback(conf);},error:function(xhr){var T4S='uploadXhrError';var J2W=g4S;J2W+=p1ff.q3i;J2W+=O7i;var r2W=K7S;r2W+=S1i;editor[v3E](conf[r2W],generalError);editor[J2W](T4S,[conf[N0i],xhr]);progressCallback(conf);}}));};files=$[p6S](files,function(val){p1ff.h3f();return val;});if(conf[i4S] !== undefined){var f2W=s5i;f2W+=h4S;var X2W=y3i;X2W+=R8i;X2W+=B4S;files[X2W](conf[f2W],files[H4i]);}reader[x2W](files[y2O]);};Editor[w2W][S2W]=function(init){var x1S='processing';var I1S="db";var W4S="dte-e=\"body\" class=";var Q1S="domTa";var a4S="div data-";var b1S="BUTTO";var k4S="vents";var s1S="Op";var Y4S="ator";var p1S="ces";var u1S="tach";var b4S="rapp";var P4S="body_";var R1S="aS";var x4S="orm_error\" class=";var j1S='<form data-dte-e="form" class="';var r4S="><div ";var e4S="TableTo";var w4S="foo";var c4S="niq";var A1S='<div data-dte-e="form_info" class="';var y1S='<div data-dte-e="foot" class="';var w1S='init.dt.dte';var y4S="initCo";var U1S="actionName";var O4S="ss=";var B1S='<div data-dte-e="processing" class="';var C4S="rocessing";var J1S='form_content';var D0S='initEditor';var g1S="lat";var X4S="ata-dte-e=\"head\" class=\"";var X1S="footer";var P1S='</form>';var F1S='<div data-dte-e="form_buttons" class="';var m1S="ources";var E4S="ols";var i1S="domTable";var k1S="NS";var V1S="our";var q1S="tin";var f4S="<div data-dte-e=\"f";var c1S="tag";var Z1S="uniq";var n1S='"></div></div>';var n4S="oo";var W1S='xhr.dt.dte';var a1S="nTable";var D1S="ses";var t1S="ajaxUrl";var J4S=" d";var M4S="eade";var v1S="etti";var C1S='<div data-dte-e="form_content" class="';var z1S='<div data-dte-e="body_content" class="';var h1S="legacyAjax";var G4S="indic";var K4S="></d";var t58=n3i;t58+=z6i;t58+=z4S;var U58=y4S;U58+=j4S;var s58=j6i;s58+=c4S;s58+=j6i;s58+=p1ff.q3i;var u58=h6i;u58+=C4S;var D58=P4S;D58+=g9E;var l58=p1ff[225154];l58+=A4S;l58+=a7i;var v58=g2E;v58+=p1ff.N3i;v58+=a7i;var Z58=C3i;Z58+=n4S;Z58+=n3i;var O38=u3E;O38+=x5i;O38+=F4S;O38+=R8E;var Y38=V8i;Y38+=b4S;Y38+=r2i;var S38=p1ff.q3i;S38+=k4S;var L38=e4S;L38+=E4S;var H38=C3i;H38+=c3i;var E38=H4S;E38+=p1i;E38+=p1ff.N3i;p1ff.S3f();E38+=L4S;var e38=v6i;e38+=M4S;e38+=z6i;var k38=q1i;k38+=r4S;k38+=R3S;k38+=V1i;var b38=V8i;b38+=B9E;var F38=v6i;F38+=t9E;F38+=O9S;var n38=M0E;n38+=J4S;n38+=X4S;var A38=t6i;A38+=c3i;A38+=C3i;A38+=p1ff[50755];var P38=r2i;P38+=L5i;var C38=C3i;C38+=h1i;C38+=p1ff[261600];var c38=f4S;c38+=x4S;c38+=q1i;var j38=p1i;j38+=p1ff.N3i;j38+=y1i;j38+=m1i;var y38=j1i;y38+=c1i;y38+=L4S;var z38=w4S;z38+=i6i;z38+=z6i;var B38=V8i;B38+=N9E;B38+=D9E;B38+=r2i;var h38=w4S;h38+=n3i;h38+=r2i;var i38=j1i;i38+=S4S;i38+=p1ff.N3i;i38+=L4S;var T38=q1i;T38+=K4S;T38+=L4S;var t38=p1ff.T3i;t38+=B7E;t38+=n3i;var U38=t7E;U38+=h6i;U38+=z9i;U38+=z6i;var q38=p1ff[225154];q38+=p1ff[50755];q38+=m9i;var Q38=j1i;Q38+=a4S;Q38+=W4S;Q38+=q1i;var I38=G4S;I38+=Y4S;var N38=q1i;N38+=m1i;var m38=f9E;m38+=r2i;var p38=B1i;p38+=R3S;p38+=O4S;p38+=q1i;var V38=Z1S;V38+=o5E;var R38=y3i;R38+=v1S;R38+=c3i;R38+=x9i;var d38=E3i;d38+=H3i;d38+=c3i;var s38=p8i;s38+=l1S;s38+=D1S;var g38=P7i;g38+=u1S;var o38=i6i;o38+=o1S;o38+=g1S;o38+=p1ff.q3i;var u38=p2E;u38+=s1S;u38+=t2i;u38+=y3i;var D38=d1S;D38+=R1S;D38+=V1S;D38+=p1S;var l38=u0i;l38+=M2i;l38+=C8i;var v38=d1S;v38+=R1S;v38+=m1S;var Z38=n3i;Z38+=p1ff[402431];Z38+=p1ff[225154];Z38+=P9i;var O2W=p1ff[402431];O2W+=p1ff[427263];O2W+=N1S;var Y2W=I1S;Y2W+=C8i;var G2W=Q1S;G2W+=p1ff[225154];G2W+=P9i;var W2W=k5E;W2W+=q1S;W2W+=x9i;var a2W=d0i;a2W+=u1i;var K2W=h3E;K2W+=p1ff[402431];K2W+=J3S;K2W+=y3i;init=$[o8E](r4i,{},Editor[K2W],init);this[y3i]=$[a2W](r4i,{},Editor[Y0i][W2W],{actionName:init[U1S],table:init[G2W] || init[D2E],dbTable:init[Y2W] || S0i,ajaxUrl:init[t1S],ajax:init[O2W],idSrc:init[T1S],dataSource:init[i1S] || init[Z38]?Editor[v38][l38]:Editor[D38][u6E],formOptions:init[u38],legacyAjax:init[h1S],template:init[E5S]?$(init[o38])[g38]():S0i});this[X2i]=$[o8E](r4i,{},Editor[s38]);this[d38]=init[R0i];Editor[Y0i][R38][V38]++;var that=this;var classes=this[X2i];this[O0i]={"wrapper":$(p38 + classes[m38] + N38 + B1S + classes[v5E][I38] + f0i + Q38 + classes[q38][U38] + P0i + z1S + classes[j4E][t38] + T38 + i38 + y1S + classes[h38][B38] + P0i + l2E + classes[z38][g9E] + k0i + y38 + j38)[y2O],"form":$(j1S + classes[p2E][c1S] + P0i + C1S + classes[p2E][g9E] + k0i + P1S)[y2O],"formError":$(c38 + classes[C38][P38] + k0i)[y2O],"formInfo":$(A1S + classes[p2E][A38] + k0i)[y2O],"header":$(n38 + classes[F38][b38] + k38 + classes[e38][g9E] + n1S)[y2O],"buttons":$(F1S + classes[p2E][z3S] + E38)[y2O]};if($[H38][d4i][L38]){var f38=U5i;f38+=g9i;var X38=C9S;X38+=t9E;X38+=n3i;X38+=p1ff.q3i;var J38=t9E;J38+=p1ff.T3i;J38+=v6i;var r38=b1S;r38+=k1S;var M38=d1S;M38+=I1E;var ttButtons=$[I4i][M38][e1S][r38];var i18n=this[R0i];$[J38]([X38,f38,J7S],function(i,val){var H1S="sButton";var L1S="Text";var M1S='editor_';var w38=I8i;w38+=n3i;w38+=E1S;var x38=H1S;x38+=L1S;p1ff.S3f();ttButtons[M1S + val][x38]=i18n[val][w38];});}$[i4i](init[S38],function(evt,fn){var K38=p1ff[50755];p1ff.h3f();K38+=c3i;that[K38](evt,function(){var G38=x4E;G38+=h6i;G38+=K9i;p1ff.S3f();G38+=a7i;var W38=p1ff.T3i;W38+=p1ff[402431];W38+=K9i;W38+=K9i;var a38=h9i;a38+=x7i;a38+=L7i;a38+=z9i;var args=Array[a38][I2i][W38](arguments);args[r1S]();fn[G38](that,args);});});var dom=this[O0i];var wrapper=dom[Y38];dom[O38]=_editor_el(J1S,dom[p2E])[y2O];dom[X1S]=_editor_el(Z58,wrapper)[y2O];dom[v58]=_editor_el(l58,wrapper)[y2O];dom[f1S]=_editor_el(D58,wrapper)[y2O];dom[u58]=_editor_el(x1S,wrapper)[y2O];if(init[H1E]){var g58=w5E;g58+=K9i;g58+=p1ff.N3i;g58+=y3i;var o58=p1ff[402431];o58+=p1ff.N3i;o58+=p1ff.N3i;this[o58](init[g58]);}$(document)[I5i](w1S + this[y3i][s58],function(e,settings,json){var V58=L1i;V58+=p1ff.q3i;V58+=n3i;var R58=S1S;R58+=p1ff.q3i;var d58=K1S;d58+=P9i;if(that[y3i][d58] && settings[a1S] === $(that[y3i][R58])[V58](y2O)){settings[P7S]=that;}})[I5i](W1S + this[y3i][J5S],function(e,settings,json){p1ff.h3f();var p58=K1S;p58+=P9i;if(json && that[y3i][D2E] && settings[a1S] === $(that[y3i][p58])[b5E](y2O)){that[G1S](json);}});try{var I58=t6i;I58+=Y1S;var N58=d8i;N58+=a8E;N58+=p1ff[402431];N58+=a7i;var m58=d8i;m58+=y3i;m58+=h6i;m58+=k6E;this[y3i][g8E]=Editor[m58][init[N58]][I58](this);}catch(e){var l0S="ontroller ";var Z0S="nd dis";var O1S="Cannot fi";var v0S="play c";var q58=p1ff.N3i;q58+=O5E;q58+=h6i;q58+=k6E;var Q58=O1S;Q58+=Z0S;Q58+=v0S;Q58+=l0S;throw Q58 + init[q58];}this[D5E](U58,[]);$(document)[t58](D0S,[this]);};Editor[N2i][u0S]=function(){var V0S="tio";var R0S="oveCl";var A58=o0S;A58+=d7S;var P58=U5i;P58+=t6i;P58+=n3i;var c58=g0S;c58+=s0S;c58+=p1ff.q3i;var j58=p1ff[427263];j58+=p1ff[50755];j58+=t6i;j58+=c3i;var y58=p1ff.q3i;y58+=p1ff.N3i;y58+=t6i;y58+=n3i;var z58=d0S;z58+=R0S;z58+=p1ff[402431];z58+=B2i;var B58=f9E;B58+=r2i;var h58=o1i;h58+=p1ff[261600];var i58=j8S;i58+=t2i;var T58=j8S;T58+=V0S;T58+=g6i;var classesActions=this[X2i][T58];var action=this[y3i][i58];var wrapper=$(this[h58][B58]);wrapper[z58]([classesActions[n3S],classesActions[y58],classesActions[O2i]][j58](z0i));if(action === c58){var C58=a2i;C58+=l1i;C58+=B2i;wrapper[C58](classesActions[n3S]);}else if(action === P58){wrapper[W9E](classesActions[F3i]);}else if(action === A58){var n58=d0S;n58+=s7S;wrapper[W9E](classesActions[n58]);}};Editor[F58][p0S]=function(data,success,error,submitParams){var H0S="jaxUrl";var J0S="xUr";var G0S="hift";var Z2S="complete";var l2S='?';var q0S="DELE";var E0S=',';var h0S="Objec";var v2S="param";var i0S="Plain";var e0S='idSrc';var N0S="teBody";var Y0S="com";var x0S="pli";var z0S='POST';var W0S="uns";var X0S="split";var U0S="TE";var r0S="aja";var w0S="url";var a0S="let";var K0S="comp";var I0S="delete";var B0S="ajaxUr";var Q0S="Body";var m0S="dele";var f0S=/_id_/;var O0S="plete";var q68=m0S;q68+=N0S;var Q68=I0S;Q68+=Q0S;var I68=q0S;p1ff.h3f();I68+=U0S;var N68=p1ff.N3i;N68+=p1ff[402431];N68+=n3i;N68+=p1ff[402431];var R68=p1ff.N3i;R68+=q0i;var d68=j6i;d68+=z6i;d68+=K9i;var s68=j6i;s68+=z6i;s68+=K9i;var a58=G5E;a58+=t0S;a58+=c3i;a58+=L1i;var x58=T0S;x58+=t6i;x58+=I5i;var f58=O5E;f58+=i0S;f58+=h0S;f58+=n3i;var J58=d0S;J58+=p1ff[50755];J58+=n8i;J58+=p1ff.q3i;var r58=B0S;r58+=K9i;var M58=p1ff[402431];M58+=p1ff[427263];M58+=p1ff[402431];M58+=q6i;var b58=Q8S;b58+=p1ff[50755];b58+=c3i;var that=this;var action=this[y3i][U1E];var thrown;var opts={type:z0S,dataType:b58,data:S0i,error:[function(xhr,text,err){thrown=err;}],success:[],complete:[function(xhr,text){var C0S="respon";var A0S="pars";var n0S="eJSON";var y0S="respo";var P0S="seText";var D3i=204;var j0S="nse";var b0S="onseJSO";var k0S="responseJSON";var e58=c3i;e58+=j6i;e58+=K9i;e58+=K9i;var k58=y0S;k58+=j0S;k58+=r8E;k58+=a6E;var json=S0i;if(xhr[c0S] === D3i || xhr[k58] === e58){json={};}else {try{var L58=C0S;L58+=P0S;var H58=A0S;H58+=n0S;var E58=F0S;E58+=h6i;E58+=b0S;E58+=L9i;json=xhr[k0S]?xhr[E58]:$[H58](xhr[L58]);}catch(e){}}if($[G3E](json) || Array[T5E](json)){success(json,xhr[c0S] >= u3i,xhr);}else {error(xhr,text,thrown);}}]};var a;var ajaxSrc=this[y3i][M58] || this[y3i][r58];var id=action === m9S || action === J58?_pluck(this[y3i][H3S],e0S):S0i;if(Array[T5E](id)){var X58=p1ff[427263];X58+=p1ff[50755];X58+=t6i;X58+=c3i;id=id[X58](E0S);}if($[f58](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === x58){var w58=p1ff[402431];w58+=H0S;var uri=S0i;var method=S0i;if(this[y3i][w58]){var K58=L0S;K58+=M0S;var S58=r0S;S58+=J0S;S58+=K9i;var url=this[y3i][S58];if(url[n3S]){uri=url[action];}if(uri[K58](z0i) !== -j2O){a=uri[X0S](z0i);method=a[y2O];uri=a[j2O];}uri=uri[V5E](f0S,id);}ajaxSrc(method,uri,data,success,error);return;}else if(typeof ajaxSrc === a58){if(ajaxSrc[l9S](z0i) !== -j2O){var Y58=j6i;Y58+=z6i;Y58+=K9i;var G58=n3i;G58+=a7i;G58+=h6i;G58+=p1ff.q3i;var W58=y3i;W58+=x0S;W58+=n3i;a=ajaxSrc[W58](z0i);opts[G58]=a[y2O];opts[Y58]=a[j2O];}else {opts[w0S]=ajaxSrc;}}else {var g68=p1ff.q3i;g68+=q6i;g68+=Z6i;var D68=p1ff.q3i;D68+=S0S;D68+=h1i;var O58=K0S;O58+=a0S;O58+=p1ff.q3i;var optsCopy=$[o8E]({},ajaxSrc || ({}));if(optsCopy[O58]){var l68=C5E;l68+=j4S;var v68=W0S;v68+=G0S;var Z68=Y0S;Z68+=O0S;opts[Z68][v68](optsCopy[l68]);delete optsCopy[Z2S];}if(optsCopy[D68]){var o68=W0S;o68+=G0S;var u68=p1ff.q3i;u68+=S0S;u68+=h1i;opts[u68][o68](optsCopy[v3E]);delete optsCopy[v3E];}opts=$[g68]({},opts,optsCopy);}opts[s68]=opts[d68][V5E](f0S,id);if(opts[R68]){var m68=p1ff.N3i;m68+=q0i;var p68=p8S;p68+=m8S;p68+=j3i;p68+=c3i;var V68=u0i;V68+=M2i;var isFn=typeof opts[V68] === p68;var newData=isFn?opts[m68](data):opts[t0i];data=isFn && newData?newData:$[o8E](r4i,data,newData);}opts[N68]=data;if(opts[C9i] === I68 && (opts[Q68] === undefined || opts[q68] === r4i)){var h68=u0i;h68+=n3i;h68+=p1ff[402431];var i68=n7i;i68+=o3S;i68+=M0S;var T68=j6i;T68+=z6i;T68+=K9i;var t68=j6i;t68+=z6i;t68+=K9i;var U68=p1ff.N3i;U68+=q0i;var params=$[v2S](opts[U68]);opts[t68]+=opts[T68][i68](l2S) === -j2O?l2S + params:N5E + params;delete opts[h68];}$[v0E](opts);};Editor[N2i][O9E]=function(target,style,time,callback){var D2S="anim";var B68=l6i;B68+=t6i;p1ff.h3f();B68+=H7E;if($[I4i][B68]){var z68=D2S;z68+=s0S;z68+=p1ff.q3i;target[u2S]()[z68](style,time,callback);}else {var y68=p1ff.T3i;y68+=y3i;y68+=y3i;target[y68](style);if(typeof time === p1ff.h3i){var j68=o2S;j68+=K9i;time[j68](target);}else if(callback){callback[Q2i](target);}}};Editor[N2i][c68]=function(){var s2S="dyContent";var g2S="mInfo";var V2S="head";var R2S="foot";var E68=N9S;E68+=p1ff.N3i;var e68=u3E;e68+=z6i;e68+=g2S;var k68=x4E;k68+=z9i;k68+=c3i;k68+=p1ff.N3i;var b68=p1ff[225154];b68+=p1ff[50755];b68+=s2S;var F68=p1ff[402431];F68+=D9E;F68+=p1ff.q3i;F68+=u1i;var n68=p1ff[402431];n68+=d2S;var A68=R2S;A68+=p1ff.q3i;A68+=z6i;var P68=V2S;P68+=r2i;var C68=O8E;C68+=x4E;C68+=z9i;C68+=z6i;var dom=this[O0i];$(dom[C68])[V2E](dom[P68]);$(dom[A68])[n68](dom[R2E])[F68](dom[z3S]);$(dom[b68])[k68](dom[e68])[E68](dom[p2E]);};Editor[N2i][p2S]=function(){var m2S="reB";var L68=U2i;L68+=n3i;L68+=d3S;var H68=h6i;H68+=m2S;H68+=V0E;H68+=z6i;var opts=this[y3i][N2S];var onBlur=opts[I2S];p1ff.S3f();if(this[D5E](H68) === L4i){return;}if(typeof onBlur === L68){onBlur(this);}else if(onBlur === Q2S){var M68=y3i;M68+=u8i;M68+=p1ff[261600];M68+=g9i;this[M68]();}else if(onBlur === P6E){var r68=s5i;r68+=p8i;r68+=p1ff[50755];r68+=v9E;this[r68]();}};Editor[J68][X68]=function(errorsOnly){var q2S="removeCl";var U2S="err";var K68=t9E;K68+=p1ff.T3i;K68+=v6i;var S68=q2S;S68+=y1E;var w68=O8E;w68+=m2i;w68+=r2i;var x68=d8i;x68+=n8i;x68+=w0E;var f68=U2S;f68+=h1i;if(!this[y3i]){return;}var errorClass=this[X2i][r1E][f68];var fields=this[y3i][H1E];p1ff.h3f();if(errorsOnly === undefined){errorsOnly=L4i;}$(x68 + errorClass,this[O0i][w68])[S68](errorClass);$[K68](fields,function(name,field){var a68=p1ff.q3i;a68+=z6i;a68+=z6i;a68+=h1i;field[a68](o4i);if(!errorsOnly){var W68=H7S;W68+=I6S;field[W68](o4i);}});this[v3E](o4i);if(!errorsOnly){this[z9S](o4i);}};Editor[G68][Y68]=function(submitComplete,mode){var i2S='preClose';var C2S="_even";var y2S="Icb";var h2S="Cb";var u98=p1ff[50755];u98+=C3i;u98+=C3i;var Z98=P9E;Z98+=v9E;Z98+=t2S;Z98+=p1ff[225154];var O68=s5i;O68+=T2S;O68+=c3i;O68+=n3i;var closed;if(this[O68](i2S) === L4i){return;}if(this[y3i][Z98]){var v98=l7E;v98+=h2S;closed=this[y3i][v98](submitComplete,mode);this[y3i][B2S]=S0i;}if(this[y3i][z2S]){var D98=p8i;D98+=m8i;D98+=y2S;var l98=p8i;l98+=p1ff[50755];l98+=j2S;this[y3i][l98]();this[y3i][D98]=S0i;}$(P2i)[u98](c2S);this[y3i][w5S]=L4i;this[D5E](P6E);p1ff.h3f();if(closed){var g98=p8i;g98+=p1ff[50755];g98+=v9E;g98+=p1ff.N3i;var o98=C2S;o98+=n3i;this[o98](g98,[closed]);}};Editor[N2i][q2E]=function(fn){p1ff.S3f();this[y3i][B2S]=fn;};Editor[s98][d98]=function(arg1,arg2,arg3,arg4){var F2S="main";var A2S="bool";var n2S="isPlainO";var m98=P2S;m98+=p1ff.N3i;var V98=A2S;V98+=t9E;V98+=c3i;var R98=n2S;R98+=p1ff[225154];p1ff.S3f();R98+=P5S;R98+=n3i;var that=this;var title;var buttons;var show;var opts;if($[R98](arg1)){opts=arg1;}else if(typeof arg1 === V98){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=r4i;}if(title){that[I2E](title);}if(buttons){var p98=p1ff[225154];p98+=a2E;p98+=g6i;that[p98](buttons);}return {opts:$[m98]({},this[y3i][Z6S][F2S],opts),maybeOpen:function(){if(show){var N98=p1ff[50755];N98+=z9i;N98+=c3i;that[N98]();}}};};Editor[I98][h0E]=function(name){var E2S="appl";var e2S="lic";var U98=p1ff.N3i;U98+=b2S;U98+=k2S;var q98=y3i;q98+=e2S;q98+=p1ff.q3i;var Q98=h9i;Q98+=X9i;Q98+=z9i;var args=Array[Q98][q98][Q2i](arguments);args[r1S]();var fn=this[y3i][U98][name];if(fn){var t98=E2S;t98+=a7i;return fn[t98](this,args);}};Editor[N2i][M3S]=function(includeFields){var r2S="ud";var M2S="incl";var X2S="deF";var H2S="displayOr";var L2S="formContent";var O2S="endTo";var J2S="eFie";var r98=H2S;p1ff.S3f();r98+=O9S;var M98=s5i;M98+=T2S;M98+=c3i;M98+=n3i;var H98=p1ff[261600];H98+=e2i;H98+=c3i;var y98=q7S;y98+=v6i;var h98=p1ff[261600];h98+=e2i;h98+=c3i;var i98=p1ff[50755];i98+=z6i;i98+=O9S;var T98=p1ff.N3i;T98+=y2i;var that=this;var formContent=$(this[T98][L2S]);var fields=this[y3i][H1E];var order=this[y3i][i98];var template=this[y3i][E5S];var mode=this[y3i][y8i] || h98;if(includeFields){var B98=M2S;B98+=r2S;B98+=J2S;B98+=N6S;this[y3i][B98]=includeFields;}else {var z98=y0E;z98+=V0E;z98+=X2S;z98+=f1E;includeFields=this[y3i][z98];}formContent[s9E]()[n3E]();$[y98](order,function(i,fieldOrName){var f2S="_wea";var K2S="aft";var w2S="ame";var G2S='[data-editor-template="';var x2S="kInA";var Y2S="appe";var W2S='editor-field[name="';var c98=f2S;c98+=x2S;p1ff.S3f();c98+=z6i;c98+=A1E;var j98=c3i;j98+=w2S;var name=fieldOrName instanceof Editor[J4i]?fieldOrName[j98]():fieldOrName;if(that[c98](name,includeFields) !== -j2O){var C98=p1ff[261600];C98+=p1ff[402431];C98+=n7i;if(template && mode === C98){var e98=K5S;e98+=p1ff.q3i;var k98=x4E;k98+=z9i;k98+=u1i;var b98=S2S;b98+=p1ff.N3i;var F98=c3i;F98+=p1ff[50755];F98+=p1ff.N3i;F98+=p1ff.q3i;var n98=K2S;n98+=p1ff.q3i;n98+=z6i;var A98=q1i;A98+=a2S;var P98=A4i;P98+=u1i;template[P98](W2S + name + A98)[n98](fields[name][F98]());template[b98](G2S + name + T4i)[k98](fields[name][e98]());}else {var E98=Y2S;E98+=c3i;E98+=p1ff.N3i;formContent[E98](fields[name][G3S]());}}});if(template && mode === H98){var L98=m2i;L98+=O2S;template[L98](formContent);}this[M98](r98,[this[y3i][w5S],this[y3i][U1E],formContent]);};Editor[J98][X98]=function(items,editFields,type,formOptions,setupDone){var q3N='initEdit';var Q3N="trin";var v3N="lice";var l3N="styl";var Z3N="ev";var u3N="ifi";var o3N="editData";var g78=s5i;g78+=Z3N;g78+=p8E;var u78=y3i;u78+=v3N;var a98=p1ff.q3i;a98+=p1ff[402431];a98+=p1ff.T3i;a98+=v6i;var K98=l3N;K98+=p1ff.q3i;var S98=u3E;p1ff.S3f();S98+=z6i;S98+=p1ff[261600];var w98=p1ff.N3i;w98+=y2i;var x98=p1ff[402431];x98+=D3N;var f98=I6i;f98+=u3N;f98+=r2i;var that=this;var fields=this[y3i][H1E];var usedFields=[];var includeInOrder;var editData={};this[y3i][H3S]=editFields;this[y3i][o3N]=editData;this[y3i][f98]=items;this[y3i][x98]=F3i;this[w98][S98][K98][z3E]=l5E;this[y3i][y8i]=type;this[u0S]();$[a98](fields,function(name,field){var s3N="Re";var D78=g3N;p1ff.h3f();D78+=v6i;var l78=t5i;l78+=n3i;l78+=t6i;l78+=S3E;var W98=t5i;W98+=T7i;W98+=s3N;W98+=k5E;field[W98]();includeInOrder=L4i;editData[name]={};$[i4i](editFields,function(idSrc,edit){var R3N="scope";var m3N="yFiel";var p3N="playFie";p1ff.S3f();var d3N="valFromDa";if(edit[H1E][name]){var Y98=y3i;Y98+=K9i;Y98+=B4S;var G98=d3N;G98+=M2i;var val=field[G98](edit[t0i]);editData[name][idSrc]=val === S0i?o4i:Array[T5E](val)?val[Y98]():val;if(!formOptions || formOptions[R3N] === V3N){var Z78=p1ff.N3i;Z78+=c5E;Z78+=k6E;Z78+=T6S;var O98=i2i;O98+=p3N;O98+=N6S;field[r9S](idSrc,val !== undefined?val:field[h3E]());if(!edit[O98] || edit[Z78][name]){includeInOrder=r4i;}}else {var v78=S6E;v78+=m3N;v78+=e3i;if(!edit[N3N] || edit[v78][name]){field[r9S](idSrc,val !== undefined?val:field[h3E]());includeInOrder=r4i;}}}});if(field[l78]()[D78] !== y2O && includeInOrder){usedFields[h4i](name);}});var currOrder=this[K1E]()[u78]();for(var i=currOrder[H4i] - j2O;i >= y2O;i--){var o78=O9i;o78+=I3N;o78+=Q3N;o78+=L1i;if($[W3E](currOrder[i][o78](),usedFields) === -j2O){currOrder[G1E](i,j2O);}}this[M3S](currOrder);this[g78](q3N,[_pluck(editFields,V7S)[y2O],_pluck(editFields,c5S)[y2O],items,type],function(){var t3N="iEdit";var U3N="initMult";var s78=U3N;s78+=t3N;that[D5E](s78,[editFields,items,type],function(){setupDone();});});};Editor[N2i][D5E]=function(trigger,args,promiseComplete){var B3N='pre';var y3N="celled";var n3N="then";var A3N="resu";var c3N="rHandler";var h3N="Event";var C3N="esult";var T3N="triggerHan";var j3N="trigg";var z3N="result";var d78=m6S;d78+=z6i;d78+=A1E;if(!args){args=[];}p1ff.S3f();if(Array[d78](trigger)){var R78=K9i;R78+=p6E;for(var i=y2O,ien=trigger[R78];i < ien;i++){this[D5E](trigger[i],args);}}else {var i78=Z9i;i78+=y3i;i78+=j6i;i78+=C1i;var p78=L0S;p78+=M0S;var V78=T3N;V78+=i3N;var e=$[h3N](trigger);$(this)[V78](e,args);if(trigger[p78](B3N) === y2O && e[z3N] === L4i){var N78=t2S;N78+=l6i;N78+=y3N;var m78=j3N;m78+=p1ff.q3i;m78+=c3N;$(this)[m78]($[h3N](trigger + N78),args);}if(promiseComplete){var U78=z6i;U78+=C3N;var q78=C5S;q78+=p1ff[427263];q78+=P3N;q78+=n3i;var Q78=Z9i;Q78+=y3i;Q78+=J3S;var I78=A3N;I78+=K9i;I78+=n3i;if(e[I78] && typeof e[Q78] === q78 && e[U78][n3N]){var t78=A3N;t78+=C1i;e[t78][n3N](promiseComplete);}else {var T78=Z9i;T78+=y3i;T78+=M3i;T78+=n3i;promiseComplete(e[T78]);}}return e[i78];}};Editor[N2i][X9S]=function(input){var F3N=/^on([A-Z])/;var k3N="substring";var B78=i5E;B78+=L1i;B78+=k4i;var h78=y3i;h78+=R8i;h78+=g9i;var name;var names=input[h78](z0i);for(var i=y2O,ien=names[B78];i < ien;i++){var z78=z4E;z78+=n3i;z78+=p1ff.T3i;z78+=v6i;name=names[i];var onStyle=name[z78](F3N);if(onStyle){name=onStyle[j2O][b3N]() + name[k3N](C2O);}names[i]=name;}return names[v7S](z0i);};Editor[N2i][y78]=function(node){var c78=C3i;c78+=f1E;var j78=p1ff.q3i;j78+=e3N;var foundField=S0i;$[j78](this[y3i][c78],function(name,field){var C78=i5E;C78+=L1i;C78+=n3i;C78+=v6i;if($(field[G3S]())[y5S](node)[C78]){foundField=field;}});return foundField;};Editor[N2i][P78]=function(fieldNames){if(fieldNames === undefined){var A78=A4i;A78+=k3i;A78+=p1ff.N3i;A78+=y3i;return this[A78]();}else if(!Array[T5E](fieldNames)){return [fieldNames];}p1ff.S3f();return fieldNames;};Editor[n78][h9S]=function(fieldsIn,focus){var L3N='div.DTE ';var X3N="setFocus";var M3N=/^jq:/;var H3N='jq:';var b78=c3i;b78+=E3N;var that=this;var field;var fields=$[p6S](fieldsIn,function(fieldOrName){var F78=r1E;p1ff.S3f();F78+=y3i;return typeof fieldOrName === y3S?that[y3i][F78][fieldOrName]:fieldOrName;});if(typeof focus === b78){field=fields[focus];}else if(focus){if(focus[l9S](H3N) === y2O){field=$(L3N + focus[V5E](M3N,o4i));}else {var k78=C3i;k78+=M7i;k78+=e3i;field=this[y3i][k78][focus];}}else {var e78=p1ff[225154];e78+=K9i;e78+=r3N;document[J3N][e78]();}p1ff.S3f();this[y3i][X3N]=field;if(field){var E78=C3i;E78+=p1ff[50755];E78+=R2i;E78+=y3i;field[E78]();}};Editor[H78][L78]=function(opts){var l5N=".dteI";var a3N="essag";var q5N="titl";var u5N="closeOnCo";var m5N="onReturn";var G3N="itCo";var O3N="submitOnRet";var p5N="bmitOnReturn";var U5N="tto";var R5N="submitOnBlur";var s5N="Comp";var o5N="mpl";var v5N="closeOnC";var y5N="canReturnSubmit";var N5N="nBa";var Q5N='blur';var S3N="ess";var t5N="keyCode";var d5N="lete";var w3N="boolea";var x3N="dow";var V5N="mitOnBlur";var I5N="blurOnBackground";var W3N="tit";var D5N="lose";var Y3N="blurOnBack";var Z5N="urn";var N88=f4i;N88+=f3N;N88+=j6i;N88+=h6i;var R88=Z3S;R88+=x3N;R88+=c3i;var g88=w3N;g88+=c3i;var D88=p1ff[261600];D88+=S3N;D88+=K3N;var l88=p1ff[261600];l88+=a3N;l88+=p1ff.q3i;var O78=W3N;O78+=K9i;O78+=p1ff.q3i;var Y78=U5i;Y78+=G3N;Y78+=j6i;Y78+=O7i;var a78=Y3N;a78+=A4E;a78+=f8E;var S78=O3N;S78+=Z5N;var r78=v5N;r78+=p1ff[50755];r78+=j4S;p1ff.h3f();var M78=l5N;M78+=c3i;M78+=y6E;M78+=p5i;var that=this;var inlineCount=__inlineCounter++;var namespace=M78 + inlineCount;if(opts[r78] !== undefined){var f78=p1ff.T3i;f78+=D5N;var X78=u5N;X78+=o5N;X78+=g5N;var J78=I5i;J78+=s5N;J78+=d5N;opts[J78]=opts[X78]?f78:J5E;}if(opts[R5N] !== undefined){var w78=h7S;w78+=g9i;var x78=f5E;x78+=V5N;opts[I2S]=opts[x78]?w78:P6E;}if(opts[S78] !== undefined){var K78=D0E;K78+=p5N;opts[m5N]=opts[K78]?Q2S:J5E;}if(opts[a78] !== undefined){var G78=c3i;G78+=p1ff[50755];G78+=c3i;G78+=p1ff.q3i;var W78=p1ff[50755];W78+=N5N;W78+=K8E;opts[W78]=opts[I5N]?Q5N:G78;}this[y3i][N2S]=opts;this[y3i][Y78]=inlineCount;if(typeof opts[O78] === y3S || typeof opts[I2E] === p1ff.h3i){var v88=n3i;v88+=g9i;v88+=K9i;v88+=p1ff.q3i;var Z88=q5N;Z88+=p1ff.q3i;this[Z88](opts[I2E]);opts[v88]=r4i;}if(typeof opts[l88] === y3S || typeof opts[D88] === p1ff.h3i){var o88=p1ff[261600];o88+=p1ff.q3i;o88+=C5i;var u88=S1i;u88+=y3i;u88+=A0E;u88+=p1ff.q3i;this[z9S](opts[u88]);opts[o88]=r4i;}if(typeof opts[z3S] !== g88){var d88=p1ff[225154];d88+=j6i;d88+=U5N;d88+=g6i;var s88=P0E;s88+=Q2E;this[s88](opts[d88]);opts[z3S]=r4i;}$(document)[I5i](R88 + namespace,function(e){var z5N="_fieldFromNode";var c5N="De";var T5N="iveEle";var j5N="prevent";p1ff.h3f();var B5N="ReturnSubmit";var i5N="ment";var h5N="can";var C5N="faul";if(e[t5N] === E2O && that[y3i][w5S]){var V88=j8S;V88+=n3i;V88+=T5N;V88+=i5N;var el=$(document[V88]);if(el){var p88=h5N;p88+=B5N;var field=that[z5N](el);if(field && typeof field[p88] === p1ff.h3i && field[y5N](el)){var m88=j5N;m88+=c5N;m88+=C5N;m88+=n3i;e[m88]();}}}});$(document)[I5i](N88 + namespace,function(e){var E5N="but";var e5N='.DTE_Form_Buttons';var k5N="onEsc";var A5N="canReturnSubmi";var a2O=37;var P5N="keyCo";var W2O=39;var F5N="Return";var b5N="Esc";var n5N="fieldFromNod";var i88=P5N;i88+=P7i;var I88=Z3S;I88+=t2S;I88+=p1ff[50755];I88+=P7i;var el=$(document[J3N]);if(e[I88] === E2O && that[y3i][w5S]){var q88=A5N;q88+=n3i;var Q88=s5i;Q88+=n5N;Q88+=p1ff.q3i;var field=that[Q88](el);if(field && typeof field[q88] === p1ff.h3i && field[y5N](el)){var T88=I5i;T88+=F5N;var U88=y3i;U88+=j6i;U88+=t9i;if(opts[m5N] === U88){var t88=D0E;t88+=t9i;e[B3S]();that[t88]();}else if(typeof opts[T88] === p1ff.h3i){e[B3S]();opts[m5N](that,e);}}}else if(e[i88] === f2O){var B88=p1ff[225154];B88+=K9i;B88+=j6i;B88+=z6i;var h88=I5i;h88+=b5N;e[B3S]();if(typeof opts[k5N] === p1ff.h3i){opts[k5N](that,e);}else if(opts[h88] === B88){that[R0E]();}else if(opts[k5N] === P6E){var z88=p8i;z88+=a9i;z88+=p1ff.q3i;that[z88]();}else if(opts[k5N] === Q2S){var y88=y3i;y88+=j6i;y88+=q3S;y88+=g9i;that[y88]();}}else if(el[C2i](e5N)[H4i]){var C88=f4i;C88+=T3S;if(e[t5N] === a2O){var c88=E5N;c88+=E1S;var j88=N5S;j88+=n8i;el[j88](c88)[y2E]();}else if(e[C88] === W2O){var P88=u3E;P88+=Q3E;el[H5N](m7S)[P88]();}}});this[y3i][z2S]=function(){var M5N="wn";var r5N='keyup';var L5N="ydo";var F88=j2E;F88+=C3i;var n88=f4i;n88+=p1ff.q3i;n88+=L5N;n88+=M5N;var A88=p1ff[50755];A88+=C3i;A88+=C3i;$(document)[A88](n88 + namespace);p1ff.h3f();$(document)[F88](r5N + namespace);};return namespace;};Editor[N2i][b88]=function(direction,action,data){var X5N="yAja";var J5N="gac";var f5N="reate";var e88=y3i;e88+=p1ff.q3i;e88+=c3i;e88+=p1ff.N3i;var k88=P9i;k88+=J5N;k88+=X5N;k88+=q6i;if(!this[y3i][k88] || !data){return;}if(direction === e88){var H88=U5i;H88+=g9i;var E88=p1ff.T3i;E88+=f5N;if(action === E88 || action === H88){var J88=p1ff.q3i;J88+=p1ff.N3i;J88+=t6i;J88+=n3i;var r88=p1ff.N3i;r88+=p1ff[402431];r88+=n3i;r88+=p1ff[402431];var L88=p1ff.q3i;L88+=p1ff[402431];L88+=p1ff.T3i;L88+=v6i;var id;$[L88](data[t0i],function(rowId,values){var S5N=" legacy Ajax dat";var w5N="s not supported by the";var K5N="a format";var x5N="Editor: Multi-row editing i";if(id !== undefined){var M88=x5N;M88+=w5N;M88+=S5N;M88+=K5N;throw M88;}id=rowId;});data[r88]=data[t0i][id];if(action === J88){data[I0i]=id;}}else {var f88=u0i;f88+=M2i;var X88=t6i;X88+=p1ff.N3i;data[X88]=$[p6S](data[f88],function(values,id){return id;});delete data[t0i];}}else {var x88=z6i;x88+=p1ff[50755];x88+=V8i;if(!data[t0i] && data[x88]){var w88=p1ff.N3i;w88+=p1ff[402431];w88+=M2i;data[w88]=[data[z1E]];}else if(!data[t0i]){data[t0i]=[];}}};Editor[N2i][G1S]=function(json){p1ff.S3f();var that=this;if(json[a5N]){$[i4i](this[y3i][H1E],function(name,field){var G5N="update";var W5N="opti";var S88=W5N;S88+=Q2E;p1ff.h3f();if(json[S88][name] !== undefined){var K88=C3i;K88+=t6i;K88+=h8i;var fieldInst=that[K88](name);if(fieldInst && fieldInst[G5N]){fieldInst[G5N](json[a5N][name]);}}});}};Editor[a88][j9S]=function(el,msg,title,fn){var D6N="fa";var v6N="removeAttr";var l6N='title';var O5N="fadeO";var Y5N="isplayed";var u6N="deIn";var W88=B8S;W88+=p1ff[50755];W88+=c3i;var canAnimate=$[I4i][Z6E]?r4i:L4i;if(title === undefined){title=L4i;}if(!fn){fn=function(){};}if(typeof msg === W88){var Y88=n3i;Y88+=p1ff[402431];Y88+=m1E;var G88=O6i;G88+=h6i;G88+=t6i;msg=msg(this,new DataTable[G88](this[y3i][Y88]));}el=$(el);if(canAnimate){el[u2S]();}if(!msg){var O88=p1ff.N3i;O88+=Y5N;if(this[y3i][O88] && canAnimate){var Z48=O5N;Z48+=j6i;Z48+=n3i;el[Z48](function(){var v48=v6i;v48+=n3i;v48+=Z6N;p1ff.S3f();el[v48](o4i);fn();});}else {var u48=c3i;u48+=f9S;var D48=w7i;D48+=e6i;var l48=W5E;l48+=K9i;el[l48](o4i)[A2i](D48,u48);fn();}if(title){el[v6N](l6N);}}else {fn();if(this[y3i][w5S] && canAnimate){var g48=D6N;g48+=u6N;var o48=v6i;o48+=n3i;o48+=p1ff[261600];o48+=K9i;el[o48](msg)[g48]();}else {var d48=p1ff.T3i;d48+=y3i;d48+=y3i;var s48=s6E;s48+=p1ff[261600];s48+=K9i;el[s48](msg)[d48](n2i,l5E);}if(title){var R48=n3i;R48+=x8E;el[u8S](R48,msg);}}};Editor[N2i][o6N]=function(){var g6N="ultiInfoS";var s6N="hown";var d6N="MultiValu";var V48=y0E;V48+=C3S;var fields=this[y3i][H1E];var include=this[y3i][V48];var show=r4i;var state;if(!include){return;}for(var i=y2O,ien=include[H4i];i < ien;i++){var m48=p1ff[261600];m48+=g6N;m48+=s6N;var p48=O5E;p48+=d6N;p48+=p1ff.q3i;var field=fields[include[i]];var multiEditable=field[L5E]();if(field[p48]() && multiEditable && show){state=r4i;show=L4i;}else if(field[T3E]() && !multiEditable){state=r4i;}else {state=L4i;}fields[include[i]][m48](state);}};Editor[N2i][B9S]=function(type,immediate){var m6N="capt";var j6N="ened";var p6N="ditor-internal";var N6N="ureFo";p1ff.h3f();var I6N='submit.editor-internal';var V6N="submit.";var e48=R6N;e48+=I5i;var k48=p1ff[50755];k48+=w3S;var b48=s5i;b48+=c7i;b48+=K9i;b48+=d6E;var i48=p1ff[225154];i48+=P2E;var T48=p1ff[261600];T48+=p1ff[402431];T48+=n7i;var U48=V6N;U48+=p1ff.q3i;U48+=p6N;var q48=p1ff[50755];q48+=c3i;var Q48=u3E;Q48+=x5i;var I48=o1i;I48+=p1ff[261600];var N48=m6N;N48+=N6N;N48+=Q3E;var that=this;var focusCapture=this[y3i][g8E][N48];if(focusCapture === undefined){focusCapture=r4i;}$(this[I48][Q48])[x7E](I6N)[q48](U48,function(e){var Q6N="ntDefault";var t48=i3S;p1ff.h3f();t48+=p1ff.q3i;t48+=Q6N;e[t48]();});if(focusCapture && (type === T48 || type === i48)){var B48=p1ff[50755];B48+=c3i;var h48=p1ff[225154];h48+=A4S;h48+=a7i;$(h48)[B48](c2S,function(){var q6N=".DTE";var B6N='.DTE';var h6N="iveEleme";var z6N="tFo";var y6N="Foc";var P48=K9i;P48+=p6E;var C48=q6N;C48+=m5i;var c48=U6N;c48+=t6N;var j48=K9i;j48+=p6E;var y48=T6N;y48+=p8E;y48+=y3i;var z48=i6N;z48+=h6N;z48+=O7i;if($(document[z48])[y48](B6N)[j48] === y2O && $(document[J3N])[c48](C48)[P48] === y2O){var A48=v9E;A48+=z6N;A48+=p1ff.T3i;A48+=N3E;if(that[y3i][A48]){var F48=C3i;F48+=p1ff[50755];F48+=R2i;F48+=y3i;var n48=k5E;n48+=y6N;n48+=j6i;n48+=y3i;that[y3i][n48][F48]();}}});}this[b48]();this[D5E](k48,[type,this[y3i][e48]]);if(immediate){var E48=j7i;E48+=j6N;this[D5E](E48,[type,this[y3i][U1E]]);}return r4i;};Editor[H48][L48]=function(type){var P6N="inl";var n6N='cancelOpen';var c6N="layed";var x48=p1ff.N3i;x48+=O5E;x48+=h6i;x48+=c6N;var M48=R6N;M48+=p1ff[50755];M48+=c3i;if(this[D5E](C6N,[type,this[y3i][M48]]) === L4i){var X48=p1ff[261600];X48+=p1ff[50755];X48+=p1ff.N3i;X48+=p1ff.q3i;var J48=P6N;J48+=A6N;var r48=r9i;r48+=d7S;r48+=c3i;r48+=n3i;this[i2E]();this[r48](n6N,[type,this[y3i][U1E]]);if((this[y3i][y8i] === J48 || this[y3i][X48] === B0E) && this[y3i][z2S]){var f48=p1ff.T3i;f48+=K9i;f48+=p1ff[50755];f48+=j2S;this[y3i][f48]();}this[y3i][z2S]=S0i;return L4i;}this[i2E](r4i);this[y3i][x48]=type;return r4i;};Editor[w48][T7S]=function(processing){var F6N="cti";var b6N='div.DTE';var W48=S4i;W48+=K4i;var a48=U2E;a48+=O7i;p1ff.h3f();var K48=p1ff[402431];K48+=F6N;K48+=d7S;var S48=p8i;S48+=l1S;S48+=y3i;S48+=Y5i;var procClass=this[S48][v5E][K48];$([b6N,this[O0i][V9E]])[o6S](procClass,processing);this[y3i][v5E]=processing;this[a48](W48,[processing]);};Editor[G48][k6N]=function(args){var e6N='processing-field';var Y48=p1ff.q3i;Y48+=p1ff[402431];Y48+=p1ff.T3i;Y48+=v6i;var processing=L4i;$[Y48](this[y3i][H1E],function(name,field){p1ff.h3f();if(field[v5E]()){processing=r4i;}});if(processing){var O48=p1ff[50755];O48+=c3i;O48+=p1ff.q3i;this[O48](e6N,function(){var H6N="ply";var E6N="_noProcessi";var L6N="_submit";var Z18=E6N;Z18+=H3E;if(this[Z18](args) === r4i){var v18=x4E;v18+=H6N;this[L6N][v18](this,args);}});}return !processing;};Editor[l18][D18]=function(successCallback,errorCallback,formatdata,hide){var a6N="editCoun";var X6N="actionNa";var w6N="tData";var h9N='preSubmit';var v9N="chang";var I9N="submitCompl";var q9N="omplet";var W6N="_fnSetObject";var l9N="allIfCha";var Z9N="dbTable";var S6N="itFi";var D9N="nged";var G6N="DataFn";var K6N="elds";var M6N="_leg";var i9N='send';var O6N="dataSource";var r6N="acyAj";var r18=r9i;r18+=d7S;r18+=c3i;r18+=n3i;var M18=M6N;M18+=r6N;M18+=N1S;var e18=Z9i;e18+=J6N;e18+=p1ff.q3i;var N18=C9S;N18+=t9E;N18+=i6i;var m18=X6N;m18+=p1ff[261600];m18+=p1ff.q3i;var p18=R6N;p18+=I5i;var V18=p1ff.q3i;V18+=X7i;V18+=f6N;V18+=s0E;var R18=x6N;R18+=w6N;var d18=U5i;d18+=S6N;d18+=K6N;var s18=a6N;s18+=n3i;var g18=C3i;g18+=f1E;var o18=W6N;o18+=G6N;var u18=p1ff[50755];u18+=Y6N;var that=this;var i,iLen,eventRet,errorNodes;var changed=L4i,allData={},changedData={};var setBuilder=DataTable[a6E][u18][o18];var dataSource=this[y3i][O6N];var fields=this[y3i][g18];var editCount=this[y3i][s18];var modifier=this[y3i][b9S];var editFields=this[y3i][d18];var editData=this[y3i][R18];var opts=this[y3i][V18];var changedSubmit=opts[Y2E];var submitParamsLocal;if(this[k6N](arguments) === L4i){return;}var action=this[y3i][p18];var submitParams={"data":{}};submitParams[this[y3i][m18]]=action;if(this[y3i][Z9N]){submitParams[D2E]=this[y3i][Z9N];}if(action === N18 || action === F3i){var c18=v9N;c18+=U5i;var y18=l9N;y18+=D9N;var z18=p1ff[402431];z18+=K9i;z18+=K9i;var B18=p1ff.T3i;B18+=q4S;B18+=i6i;$[i4i](editFields,function(idSrc,edit){var o9N="ptyObject";var u9N="isEm";var s9N="Object";var g9N="sEmpty";var h18=u9N;h18+=o9N;var i18=t6i;i18+=g9N;i18+=s9N;var allRowData={};var changedRowData={};$[i4i](fields,function(name,field){var m9N=/\[.*$/;var p9N="xO";var R9N="mpa";var d9N="submittable";var N9N='-many-count';var I18=A4i;I18+=p1ff.q3i;I18+=e3S;I18+=y3i;if(edit[I18][name] && field[d9N]()){var T18=C5E;T18+=R9N;T18+=z6i;T18+=p1ff.q3i;var t18=p1ff.q3i;t18+=p1ff.N3i;t18+=g9i;var q18=V9N;q18+=a2S;var Q18=C6S;Q18+=p1ff.q3i;Q18+=p9N;Q18+=C3i;var multiGet=field[k9S]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var originalVal=field[S1E](edit[t0i]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=Array[T5E](value) && name[Q18](q18) !== -j2O?setBuilder(name[V5E](m9N,o4i) + N9N):S0i;builder(allRowData,value);if(manyBuilder){var U18=b4i;U18+=n3i;U18+=v6i;manyBuilder(allRowData,value[U18]);}if(action === t18 && (!editData[name] || !field[T18](value,editData[name][idSrc]))){builder(changedRowData,value);changed=r4i;if(manyBuilder){manyBuilder(changedRowData,value[H4i]);}}}});if(!$[i18](allRowData)){allData[idSrc]=allRowData;}if(!$[h18](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === B18 || changedSubmit === z18 || changedSubmit === y18 && changed){var j18=p1ff.N3i;j18+=p1ff[402431];j18+=M2i;submitParams[j18]=allData;}else if(changedSubmit === c18 && changed){var C18=u0i;C18+=n3i;C18+=p1ff[402431];submitParams[C18]=changedData;}else {var k18=I9N;k18+=g5N;var F18=T0S;F18+=d3S;var n18=Q9N;n18+=q9N;n18+=p1ff.q3i;var P18=p1ff.T3i;P18+=K9i;P18+=a9i;P18+=p1ff.q3i;this[y3i][U1E]=S0i;if(opts[U9N] === P18 && (hide === undefined || hide)){var A18=S9i;A18+=K9i;A18+=p1ff[50755];A18+=v9E;this[A18](L4i);}else if(typeof opts[n18] === F18){opts[U9N](this);}if(successCallback){var b18=t9N;b18+=T9N;successCallback[b18](this);}this[T7S](L4i);this[D5E](k18);return;}}else if(action === e18){var E18=p1ff.q3i;E18+=p1ff[402431];E18+=p1ff.T3i;E18+=v6i;$[E18](editFields,function(idSrc,edit){var L18=p1ff.N3i;L18+=p1ff[402431];L18+=n3i;L18+=p1ff[402431];var H18=d1S;H18+=p1ff[402431];p1ff.S3f();submitParams[H18][idSrc]=edit[L18];});}this[M18](i9N,action,submitParams);submitParamsLocal=$[o8E](r4i,{},submitParams);if(formatdata){formatdata(submitParams);}this[r18](h9N,[submitParams,action],function(result){var B9N="rl";if(result === L4i){that[T7S](L4i);}else {var f18=q9i;f18+=U9i;var X18=k9E;X18+=A5S;X18+=q6i;var J18=l0E;J18+=N1S;J18+=c3E;J18+=B9N;var submitWire=that[y3i][v0E] || that[y3i][J18]?that[X18]:that[f18];submitWire[Q2i](that,submitParams,function(json,notGood,xhr){var z9N="_submitSu";var x18=z9N;p1ff.h3f();x18+=p1ff.T3i;x18+=K3i;x18+=B2i;that[x18](json,notGood,submitParams,submitParamsLocal,that[y3i][U1E],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var w18=p1ff[402431];w18+=p1ff.T3i;w18+=T7i;w18+=I5i;that[y9N](xhr,err,thrown,errorCallback,submitParams,that[y3i][w18]);},submitParams);}});};Editor[N2i][S18]=function(data,success,error,submitParams){var e9N="ual";var n9N="dSrc";var C9N="ctDat";var j9N="_fnSetOb";var P9N="aFn";var k9N="individ";var A9N="oA";var F9N="_fnG";var c9N="je";var H9N="taSource";var b9N="etObjectDataFn";var G18=j9N;G18+=c9N;G18+=C9N;G18+=P9N;var W18=A9N;W18+=U7i;var a18=t6i;a18+=n9N;var K18=F9N;K18+=b9N;var that=this;var action=data[U1E];var out={data:[]};var idGet=DataTable[a6E][T0i][K18](this[y3i][a18]);var idSet=DataTable[a6E][W18][G18](this[y3i][T1S]);if(action !== J7S){var l08=p1ff.N3i;l08+=p1ff[402431];l08+=n3i;l08+=p1ff[402431];var v08=k9N;v08+=e9N;var Z08=E9N;Z08+=H9N;var O18=p1ff[261600];O18+=p1ff[402431];O18+=t6i;O18+=c3i;var Y18=p1ff[261600];Y18+=p1ff[50755];Y18+=p1ff.N3i;Y18+=p1ff.q3i;var originalData=this[y3i][Y18] === O18?this[h0E](O5S,this[b9S]()):this[Z08](v08,this[b9S]());$[i4i](data[l08],function(key,vals){var M9N="_fn";var L9N="creat";var r9N="Extend";var g08=d1S;g08+=p1ff[402431];var o08=L9N;o08+=p1ff.q3i;var u08=M9N;u08+=r9N;var D08=C3i;D08+=c3i;var toSave;var extender=$[D08][J9N][T0i][u08];if(action === m9S){var rowData=originalData[key][t0i];toSave=extender({},rowData,r4i);toSave=extender(toSave,vals,r4i);}else {toSave=extender({},vals,r4i);}p1ff.h3f();var overrideId=idGet(toSave);if(action === o08 && overrideId === undefined){idSet(toSave,+new Date() + o4i + key);}else {idSet(toSave,overrideId);}out[g08][h4i](toSave);});}success(out);};Editor[s08][X9N]=function(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var t7N="Edi";var V7N="Success";var Q7N="postCr";var U7N="preCr";var j7N="_dataSo";var I7N='setData';var G9N="bmitUnsucce";var z7N="ource";var m7N="ount";var y7N="tRe";var f9N="sing";var K9N="tOpts";var h7N="mmit";var B7N="taS";var T7N="eE";var O9N="oin";var Y9N="ssful";var c7N='preRemove';var p7N="ditC";var N7N='prep';var w9N="dif";var i7N='commit';var C7N="mplet";var a9N="_legacyAjax";var x9N="eceive";var S9N="ier";var N28=s5i;N28+=g1i;N28+=f9N;var p08=s5i;p1ff.h3f();p08+=T2S;p08+=O7i;var V08=z6i;V08+=x9N;var R08=O5i;R08+=w9N;R08+=S9N;var d08=p1ff.q3i;d08+=d8i;d08+=K9N;var that=this;var setData;var fields=this[y3i][H1E];var opts=this[y3i][d08];var modifier=this[y3i][R08];this[a9N](V08,action,json);this[p08](W9N,[json,submitParams,action,xhr]);if(!json[v3E]){json[v3E]=p1ff.i3i;}if(!json[d4S]){json[d4S]=[];}if(notGood || json[v3E] || json[d4S][H4i]){var F08=y3i;F08+=j6i;F08+=G9N;F08+=Y9N;var n08=U2E;n08+=O7i;var A08=j1i;A08+=p1ff[225154];A08+=z6i;A08+=m1i;var P08=p1ff[427263];P08+=O9N;var N08=p1ff.q3i;N08+=j8S;N08+=v6i;var globalError=[];if(json[v3E]){var m08=p1ff.q3i;m08+=S0S;m08+=p1ff[50755];m08+=z6i;globalError[h4i](json[m08]);}$[N08](json[d4S],function(i,err){var D7N="Error";var l7N=" field:";var s7N="nField";var v7N="nown";var R7N=': ';var u7N="onFiel";var d7N="Err";var g7N="onFieldError";var Z7N="Unk";var o7N="dEr";p1ff.S3f();var I08=c3i;I08+=p1ff[402431];I08+=S1i;var field=fields[err[I08]];if(!field){var Q08=Z7N;Q08+=v7N;Q08+=l7N;Q08+=Z4i;throw new Error(Q08 + err[N0i]);}else if(field[w5S]()){var q08=K2i;q08+=z6i;field[q08](err[c0S] || D7N);if(i === y2O){var z08=C3i;z08+=g8i;z08+=D3N;var t08=u3E;t08+=R2i;t08+=y3i;var U08=u7N;U08+=o7N;U08+=L5i;if(opts[U08] === t08){var B08=n3i;B08+=p1ff[50755];B08+=h6i;var h08=o5S;h08+=p6i;h08+=n3i;h08+=d3S;var i08=c3i;i08+=p1ff[50755];i08+=p1ff.N3i;i08+=p1ff.q3i;var T08=O8E;T08+=e4E;that[O9E]($(that[O0i][f1S],that[y3i][T08]),{scrollTop:$(field[i08]())[h08]()[B08]},o3i);field[y2E]();}else if(typeof opts[g7N] === z08){var y08=p1ff[50755];y08+=s7N;y08+=D7N;opts[y08](that,err);}}}else {var C08=d7N;C08+=p1ff[50755];C08+=z6i;var c08=c3i;c08+=p1ff[402431];c08+=p1ff[261600];c08+=p1ff.q3i;var j08=N4S;j08+=d5S;globalError[j08](field[c08]() + R7N + (err[c0S] || C08));}});this[v3E](globalError[P08](A08));this[n08](F08,[json]);if(errorCallback){errorCallback[Q2i](that,json);}}else {var m28=Y2E;m28+=V7N;var g28=p1ff.q3i;g28+=p7N;g28+=m7N;var b08=p1ff.q3i;b08+=p1ff.N3i;b08+=t6i;b08+=n3i;var store={};if(json[t0i] && (action === n3S || action === b08)){var a08=p1ff.N3i;a08+=p1ff[402431];a08+=n3i;a08+=p1ff[402431];var e08=b4i;e08+=k4i;var k08=A9E;k08+=b2S;k08+=k2S;this[k08](N7N,action,modifier,submitParamsLocal,json,store);for(var i=y2O;i < json[t0i][e08];i++){var f08=p1ff.q3i;f08+=X7i;var L08=g0S;L08+=p1ff[402431];L08+=i6i;var H08=g4S;H08+=p8E;var E08=t6i;E08+=p1ff.N3i;setData=json[t0i][i];var id=this[h0E](E08,setData);this[H08](I7N,[json,setData,action]);if(action === L08){var X08=Q7N;X08+=q7N;X08+=p1ff.q3i;var J08=g4S;J08+=p1ff.q3i;J08+=c3i;J08+=n3i;var r08=U7N;r08+=q7N;r08+=p1ff.q3i;var M08=g4S;M08+=p8E;this[M08](r08,[json,setData,id]);this[h0E](w0i,fields,setData,store);this[J08]([w0i,X08],[json,setData,id]);}else if(action === f08){var K08=o5S;K08+=G5E;K08+=t7N;K08+=n3i;var S08=U5i;S08+=g9i;var w08=A9E;w08+=c1E;w08+=C1E;var x08=h9i;x08+=T7N;x08+=p1ff.N3i;x08+=g9i;this[D5E](x08,[json,setData,id]);this[w08](S08,modifier,fields,setData,store);this[D5E]([m9S,K08],[json,setData,id]);}}this[h0E](i7N,action,modifier,json[a08],store);}else if(action === O2i){var o28=p1ff.N3i;o28+=q0i;var u28=C5E;u28+=h7N;var D28=E9N;D28+=B7N;D28+=z7N;var l28=q8S;l28+=y7N;l28+=J6N;l28+=p1ff.q3i;var v28=Z9i;v28+=O5i;v28+=d7S;var Z28=s5i;Z28+=h5S;var O08=d0S;O08+=p1ff[50755];O08+=n8i;O08+=p1ff.q3i;var Y08=j7N;Y08+=j6i;Y08+=C1E;var G08=t6i;G08+=p1ff.N3i;G08+=y3i;var W08=h9i;W08+=p1ff.q3i;W08+=h6i;this[h0E](W08,action,modifier,submitParamsLocal,json,store);this[D5E](c7N,[json,this[G08]()]);this[Y08](O08,modifier,fields,store);this[Z28]([v28,l28],[json,this[t6S]()]);this[D28](u28,action,modifier,json[o28],store);}if(editCount === this[y3i][g28]){var V28=Q9N;V28+=p1ff[50755];V28+=C7N;V28+=p1ff.q3i;var d28=j8S;d28+=n3i;d28+=j3i;d28+=c3i;var s28=i6N;s28+=d3S;var action=this[y3i][s28];this[y3i][d28]=S0i;if(opts[U9N] === P6E && (hide === undefined || hide)){var R28=s5i;R28+=p8i;R28+=a9i;R28+=p1ff.q3i;this[R28](json[t0i]?r4i:L4i,action);}else if(typeof opts[V28] === p1ff.h3i){opts[U9N](this);}}if(successCallback){var p28=t9N;p28+=T9N;successCallback[p28](that,json);}this[D5E](m28,[json,setData,action]);}this[N28](L4i);this[D5E](P7N,[json,setData,action]);};Editor[I28][y9N]=function(xhr,err,thrown,errorCallback,submitParams,action){var b7N="stem";var A7N="submitEr";var n7N="_processi";var F7N="sy";var h28=A7N;h28+=L5i;var i28=g4S;i28+=p1ff.q3i;i28+=O7i;var T28=n7N;T28+=H3E;var t28=F7N;t28+=b7N;var U28=p1ff.q3i;U28+=z6i;U28+=z6i;U28+=h1i;var q28=r2i;q28+=z6i;q28+=p1ff[50755];q28+=z6i;var Q28=g4S;Q28+=d6i;Q28+=n3i;this[Q28](W9N,[S0i,submitParams,action,xhr]);this[q28](this[R0i][U28][t28]);this[T28](L4i);if(errorCallback){errorCallback[Q2i](this,xhr,err,thrown);}this[i28]([h28,P7N],[xhr,err,thrown,submitParams]);};Editor[N2i][B28]=function(fn){var k7N="ocess";var M7N="tComplete";var L7N="settin";var H7N="oFeat";var k28=T0E;k28+=p1ff[225154];k28+=P9i;var b28=i2i;b28+=h6i;b28+=K9i;b28+=e6i;var A28=h9i;A28+=k7N;A28+=t6i;A28+=H3E;var j28=O6i;j28+=h6i;j28+=t6i;var y28=C3i;y28+=c3i;var z28=n3i;z28+=e7N;z28+=p1ff.q3i;var that=this;var dt=this[y3i][z28]?new $[y28][d4i][j28](this[y3i][D2E]):S0i;var ssp=L4i;if(dt){var P28=E7N;P28+=I3N;P28+=t6i;P28+=P7i;var C28=H7N;C28+=r3N;C28+=Y5i;var c28=L7N;c28+=x9i;ssp=dt[c28]()[y2O][C28][P28];}if(this[y3i][A28]){var n28=N8i;n28+=M7N;this[f9S](n28,function(){p1ff.S3f();var r7N='draw';if(ssp){var F28=p1ff[50755];F28+=c3i;F28+=p1ff.q3i;dt[F28](r7N,fn);}else {setTimeout(function(){fn();},b2O);}});return r4i;}else if(this[z3E]() === X6S || this[b28]() === k28){var E28=p1ff.T3i;E28+=K9i;E28+=m8i;var e28=p1ff[50755];e28+=c3i;e28+=p1ff.q3i;this[e28](E28,function(){p1ff.h3f();var H28=a5i;H28+=W5i;if(!that[y3i][H28]){setTimeout(function(){p1ff.S3f();if(that[y3i]){fn();}},b2O);}else {that[f9S](P7N,function(e,json){if(ssp && json){var L28=p1ff.N3i;L28+=z6i;L28+=p1ff[402431];L28+=V8i;dt[f9S](L28,fn);}else {setTimeout(function(){p1ff.S3f();if(that[y3i]){fn();}},b2O);}});}})[R0E]();return r4i;}return L4i;};Editor[N2i][M28]=function(name,arr){p1ff.S3f();for(var i=y2O,ien=arr[H4i];i < ien;i++){if(name == arr[i]){return i;}}return -j2O;};Editor[J7N]={"table":S0i,"ajaxUrl":S0i,"fields":[],"display":X7N,"ajax":S0i,"idSrc":f7N,"events":{},"i18n":{"close":x7N,"create":{"button":w7N,"title":S7N,"submit":r28},"edit":{"button":J28,"title":K7N,"submit":g5S},"remove":{"button":X28,"title":a7N,"submit":f28,"confirm":{"_":x28,"1":w28}},"error":{"system":W7N},multi:{title:S28,info:K28,restore:a28,noMulti:G7N},datetime:{previous:Y7N,next:O7N,months:[Z8N,W28,G28,v8N,Y28,l8N,D8N,O28,u8N,Z3T,v3T,o8N],weekdays:[g8N,l3T,s8N,D3T,u3T,o3T,d8N],amPm:[R8N,g3T],hours:V8N,minutes:s3T,seconds:p8N,unknown:l7S}},formOptions:{bubble:$[d3T]({},Editor[R3T][V3T],{title:L4i,message:L4i,buttons:p3T,submit:m3T}),inline:$[N3T]({},Editor[Y0i][I3T],{buttons:L4i,submit:Q3T}),main:$[q3T]({},Editor[U3T][Z6S])},legacyAjax:L4i,actionName:m8N};(function(){var E4N='keyless';var L8N="cells";var W8N="_fnGetObjectDataFn";var N8N="taTabl";var W4N="dataSrc";var I8N="taSources";var s4N="rowIds";var Q6T=v6i;Q6T+=n3i;Q6T+=p1ff[261600];Q6T+=K9i;var Y3T=u0i;Y3T+=N8N;Y3T+=p1ff.q3i;var t3T=u0i;t3T+=I8N;var __dataSources=Editor[t3T]={};var __dtIsSsp=function(dt,editor){var U8N="Opts";var t8N="oFe";var T8N="atur";var q8N="wType";var z3T=c3i;z3T+=p1ff[50755];z3T+=p5i;var B3T=Q8N;B3T+=q8N;var h3T=U5i;h3T+=g9i;h3T+=U8N;var i3T=E7N;i3T+=I3N;i3T+=t6i;i3T+=P7i;var T3T=t8N;T3T+=T8N;T3T+=Y5i;return dt[m0i]()[y2O][T3T][i3T] && editor[y3i][h3T][B3T] !== z3T;};var __dtApi=function(table){return $(table)[i8N]();};var __dtHighlight=function(node){node=$(node);p1ff.h3f();setTimeout(function(){var B8N='highlight';var y3T=s8i;y3T+=p1ff.N3i;y3T+=h8N;y3T+=y1E;node[y3T](B8N);setTimeout(function(){var j8N='noHighlight';var y8N="eCl";var z8N="highli";var c3T=z8N;c3T+=L1i;c3T+=s6E;var j3T=Z9i;j3T+=J6N;j3T+=y8N;j3T+=y1E;node[W9E](j8N)[j3T](c3T);setTimeout(function(){var C3T=O2i;C3T+=Z3E;C3T+=y3i;C3T+=y3i;node[C3T](j8N);},g3i);},o3i);},M2O);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var c8N="xe";var P3T=C6S;P3T+=p1ff.q3i;P3T+=c8N;P3T+=y3i;dt[j5S](identifier)[P3T]()[i4i](function(idx){var H2O=14;var C8N='Unable to find row identifier';var n3T=z6i;n3T+=R5S;var A3T=c3i;A3T+=p1ff[50755];A3T+=p1ff.N3i;A3T+=p1ff.q3i;var row=dt[z1E](idx);var data=row[t0i]();var idSrc=idFn(data);if(idSrc === undefined){Editor[v3E](C8N,H2O);}out[idSrc]={idSrc:idSrc,data:data,node:row[A3T](),fields:fields,type:n3T};});};var __dtFieldsFromIdx=function(dt,fields,idx){var F8N="aoColumns";var E8N="lly determine field from source. Please";var e8N="Unable to automatica";var P8N="isEmp";var b8N="editField";var n8N="mD";var A8N="tyObj";var H8N=" specify the field name.";var E3T=P8N;E3T+=A8N;E3T+=P3N;E3T+=n3i;var F3T=n8N;F3T+=q0i;var field;p1ff.S3f();var col=dt[m0i]()[y2O][F8N][idx];var dataSrc=col[b8N] !== undefined?col[b8N]:col[F3T];var resolvedFields={};var run=function(field,dataSrc){var b3T=c3i;p1ff.h3f();b3T+=p1ff[402431];b3T+=S1i;if(field[b3T]() === dataSrc){resolvedFields[field[N0i]()]=field;}};$[i4i](fields,function(name,fieldInst){var k3T=t6i;k3T+=k8N;p1ff.h3f();if(Array[k3T](dataSrc)){var e3T=K9i;e3T+=p1ff.q3i;e3T+=c3i;e3T+=h5E;for(var i=y2O;i < dataSrc[e3T];i++){run(fieldInst,dataSrc[i]);}}else {run(fieldInst,dataSrc);}});if($[E3T](resolvedFields)){var H3T=e8N;H3T+=E8N;H3T+=H8N;Editor[v3E](H3T,k2O);}return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){p1ff.S3f();dt[L8N](identifier)[M8N]()[i4i](function(idx){var w8N="fixedNode";var X8N="odeNa";var x8N="mn";var f8N="olu";var r8N="playFields";var J8N="ayFields";var S3T=d8i;S3T+=y3i;S3T+=r8N;var w3T=w7i;w3T+=J8N;var x3T=h6i;x3T+=j6i;x3T+=y3i;x3T+=v6i;var f3T=w8E;f3T+=e3N;var X3T=z6i;X3T+=p1ff[50755];X3T+=V8i;var r3T=c3i;r3T+=X8N;r3T+=S1i;var M3T=p1ff.T3i;M3T+=f8N;M3T+=x8N;var L3T=p1ff.N3i;L3T+=p1ff[402431];L3T+=n3i;L3T+=p1ff[402431];var cell=dt[s7i](idx);var row=dt[z1E](idx[z1E]);var data=row[L3T]();var idSrc=idFn(data);var fields=forceFields || __dtFieldsFromIdx(dt,allFields,idx[M3T]);var isNode=typeof identifier === E4i && identifier[r3T] || identifier instanceof $;var prevDisplayFields,prevAttach;if(out[idSrc]){var J3T=s0S;J3T+=n3i;J3T+=e3N;prevAttach=out[idSrc][J3T];prevDisplayFields=out[idSrc][N3N];}__dtRowSelector(out,dt,idx[X3T],allFields,idFn);out[idSrc][E6S]=prevAttach || [];out[idSrc][f3T][x3T](isNode?$(identifier)[b5E](y2O):cell[w8N]?cell[w8N]():cell[G3S]());out[idSrc][w3T]=prevDisplayFields || ({});$[o8E](out[idSrc][S3T],fields);});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var W3T=p1ff.q3i;W3T+=p1ff[402431];p1ff.S3f();W3T+=H6i;var a3T=L0S;a3T+=p1ff.q3i;a3T+=y3i;var K3T=p1ff.T3i;K3T+=k3i;K3T+=K9i;K3T+=y3i;dt[K3T](S0i,identifier)[a3T]()[W3T](function(idx){p1ff.h3f();__dtCellSelector(out,dt,idx,fields,idFn);});};var __dtjqId=function(id){var S8N='\\$1';var G3T=z6i;G3T+=w6S;return typeof id === y3S?i6S + id[G3T](/(:|\.|\[|\]|,)/g,S8N):i6S + id;};__dataSources[Y3T]={id:function(data){var K8N="fnGetObjectDataFn";var O3T=s5i;O3T+=K8N;var idFn=DataTable[a6E][T0i][O3T](this[y3i][T1S]);return idFn(data);},individual:function(identifier,fieldNames){var a8N="Sr";var v5T=n3i;v5T+=p1ff[402431];v5T+=m1E;var Z5T=t6i;Z5T+=p1ff.N3i;Z5T+=a8N;Z5T+=p1ff.T3i;var idFn=DataTable[a6E][T0i][W8N](this[y3i][Z5T]);var dt=__dtApi(this[y3i][v5T]);var fields=this[y3i][H1E];var out={};var forceFields;var responsiveNode;if(fieldNames){if(!Array[T5E](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[i4i](fieldNames,function(i,name){forceFields[name]=fields[name];});}__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var G8N="um";var Y8N="nObject";var O8N="lumns";var R5T=p1ff.T3i;R5T+=p1ff.q3i;R5T+=K9i;R5T+=Q6i;var d5T=C5E;d5T+=K9i;d5T+=G8N;d5T+=g6i;var s5T=Y9i;s5T+=V8i;s5T+=y3i;var g5T=X7S;g5T+=t6i;g5T+=Y8N;p1ff.h3f();var o5T=C3i;o5T+=t6i;o5T+=p1ff.q3i;o5T+=N6S;var u5T=M2i;u5T+=D6E;u5T+=p1ff.q3i;var D5T=p1ff[50755];D5T+=Y6N;var l5T=p1ff.q3i;l5T+=s6i;var idFn=DataTable[l5T][D5T][W8N](this[y3i][T1S]);var dt=__dtApi(this[y3i][u5T]);var fields=this[y3i][o5T];var out={};if($[g5T](identifier) && (identifier[s5T] !== undefined || identifier[d5T] !== undefined || identifier[R5T] !== undefined)){var V5T=p1ff.T3i;V5T+=p1ff[50755];V5T+=O8N;if(identifier[j5S] !== undefined){__dtRowSelector(out,dt,identifier[j5S],fields,idFn);}if(identifier[V5T] !== undefined){__dtColumnSelector(out,dt,identifier[Z4N],fields,idFn);}if(identifier[L8N] !== undefined){var p5T=K3i;p5T+=K9i;p5T+=Q6i;__dtCellSelector(out,dt,identifier[p5T],fields,idFn);}}else {__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){p1ff.S3f();var dt=__dtApi(this[y3i][D2E]);if(!__dtIsSsp(dt,this)){var N5T=C3E;N5T+=P7i;var m5T=p1ff[402431];m5T+=p1ff.N3i;m5T+=p1ff.N3i;var row=dt[z1E][m5T](data);__dtHighlight(row[N5T]());}},edit:function(identifier,fields,data,store){var l4N="ny";var D4N="dataT";var g4N="_fnExtend";var v4N="drawType";var o4N="inArra";var q5T=c3i;q5T+=p1ff[50755];q5T+=c3i;q5T+=p1ff.q3i;var Q5T=p1ff.q3i;Q5T+=X7i;Q5T+=f6N;Q5T+=s0E;var I5T=n3i;I5T+=p1ff[402431];I5T+=m1E;var that=this;var dt=__dtApi(this[y3i][I5T]);if(!__dtIsSsp(dt,this) || this[y3i][Q5T][v4N] === q5T){var T5T=p1ff[402431];T5T+=l4N;var U5T=D4N;U5T+=F2i;U5T+=P9i;var rowId=__dataSources[U5T][I0i][Q2i](this,data);var row;try{var t5T=z6i;t5T+=R5S;row=dt[t5T](__dtjqId(rowId));}catch(e){row=dt;}if(!row[T5T]()){var i5T=z6i;i5T+=p1ff[50755];i5T+=V8i;row=dt[i5T](function(rowIdx,rowData,rowNode){var h5T=t6i;h5T+=p1ff.N3i;p1ff.h3f();return rowId == __dataSources[d4i][h5T][Q2i](that,rowData);});}if(row[u4N]()){var y5T=o4N;y5T+=a7i;var z5T=u0i;z5T+=M2i;var B5T=C3i;B5T+=c3i;var extender=$[B5T][J9N][T0i][g4N];var toSave=extender({},row[t0i](),r4i);toSave=extender(toSave,data,r4i);row[z5T](toSave);var idx=$[y5T](rowId,store[s4N]);store[s4N][G1E](idx,j2O);}else {var j5T=p1ff[402431];j5T+=C0E;row=dt[z1E][j5T](data);}__dtHighlight(row[G3S]());}},remove:function(identifier,fields,store){var d4N="ncel";var V4N="every";var C5T=t9N;C5T+=d4N;p1ff.h3f();C5T+=R4N;var c5T=n3i;c5T+=l5i;var that=this;var dt=__dtApi(this[y3i][c5T]);var cancelled=store[C5T];if(cancelled[H4i] === y2O){dt[j5S](identifier)[O2i]();}else {var P5T=Y9i;P5T+=V8i;P5T+=y3i;var indexes=[];dt[P5T](identifier)[V4N](function(){var p4N="ndex";p1ff.S3f();var n5T=t9N;n5T+=K9i;n5T+=K9i;var A5T=t6i;A5T+=p1ff.N3i;var id=__dataSources[d4i][A5T][n5T](that,this[t0i]());if($[W3E](id,cancelled) === -j2O){var F5T=t6i;F5T+=p4N;indexes[h4i](this[F5T]());}});dt[j5S](indexes)[O2i]();}},prep:function(action,identifier,submit,json,store){var m4N="ancelled";var Q4N="cancelled";var I4N="ncelled";var b5T=p1ff.q3i;b5T+=p1ff.N3i;b5T+=t6i;b5T+=n3i;if(action === b5T){var E5T=d1S;E5T+=p1ff[402431];var e5T=p1ff[261600];e5T+=p1ff[402431];e5T+=h6i;var k5T=p1ff.T3i;k5T+=m4N;var cancelled=json[k5T] || [];store[s4N]=$[e5T](submit[E5T],function(val,key){var N4N="isEmptyObject";var H5T=p1ff.N3i;H5T+=p1ff[402431];H5T+=n3i;H5T+=p1ff[402431];return !$[N4N](submit[H5T][key]) && $[W3E](key,cancelled) === -j2O?key:undefined;});}else if(action === J7S){var L5T=t9N;L5T+=I4N;store[L5T]=json[Q4N] || [];}},commit:function(action,identifier,data,store){var z4N="ettings";var h4N="rve";var y4N="search";var e4N="hPa";var P4N="responsive";var b4N="dPane";var n4N="oFeatures";var i4N="bS";var q4N="raw";var k4N="searc";var T4N="bServerSide";var c4N="sponsi";var B4N="rSide";var C4N="draw";var A4N="recalc";var t4N="oFeatu";var j4N="Pane";p1ff.h3f();var F4N="buil";var x5T=c3i;x5T+=p1ff[50755];x5T+=c3i;x5T+=p1ff.q3i;var f5T=p1ff.N3i;f5T+=q4N;f5T+=U4N;var that=this;var dt=__dtApi(this[y3i][D2E]);if(!__dtIsSsp(dt,this) && action === m9S && store[s4N][H4i]){var ids=store[s4N];var row;var compare=function(id){p1ff.S3f();return function(rowIdx,rowData,rowNode){var M5T=t6i;M5T+=p1ff.N3i;return id == __dataSources[d4i][M5T][Q2i](that,rowData);};};for(var i=y2O,ien=ids[H4i];i < ien;i++){var X5T=t4N;X5T+=F0S;try{var r5T=z6i;r5T+=p1ff[50755];r5T+=V8i;row=dt[r5T](__dtjqId(ids[i]));}catch(e){row=dt;}if(!row[u4N]()){var J5T=z6i;J5T+=p1ff[50755];J5T+=V8i;row=dt[J5T](compare(ids[i]));}if(row[u4N]() && !dt[m0i]()[y2O][X5T][T4N]){row[O2i]();}}}var drawType=this[y3i][N2S][f5T];if(drawType !== x5T){var a5T=i4N;a5T+=p1ff.q3i;a5T+=h4N;a5T+=B4N;var K5T=y3i;K5T+=z4N;var S5T=y4N;S5T+=j4N;S5T+=y3i;var w5T=z6i;w5T+=p1ff.q3i;w5T+=c4N;w5T+=d7S;dt[C4N](drawType);if(dt[w5T]){dt[P4N][A4N]();}if(typeof dt[S5T] === p1ff.h3i && !dt[K5T]()[y2O][n4N][a5T]){var G5T=z6i;G5T+=p1ff.q3i;G5T+=F4N;G5T+=b4N;var W5T=k4N;W5T+=e4N;W5T+=p5i;W5T+=y3i;dt[W5T][G5T](undefined,r4i);}}}};function __html_id(identifier){p1ff.S3f();var L4N="Could not find ";var M4N="an element with `data-editor-id` or `id` of: ";var H4N="editor-id=\"";var context=document;if(identifier !== E4N){var l6T=K9i;l6T+=p1ff.q3i;l6T+=c3i;l6T+=h5E;var Z6T=P9i;Z6T+=H3E;Z6T+=k4i;var O5T=q1i;O5T+=a2S;var Y5T=V9N;Y5T+=t0i;Y5T+=h5i;Y5T+=H4N;context=$(Y5T + identifier + O5T);if(context[Z6T] === y2O){var v6T=G5E;v6T+=t0S;v6T+=c3i;v6T+=L1i;context=typeof identifier === v6T?$(__dtjqId(identifier)):$(identifier);}if(context[l6T] === y2O){var D6T=L4N;D6T+=M4N;throw D6T + identifier;}}return context;}p1ff.S3f();function __html_el(identifier,name){var J4N="itor-field=\"";p1ff.S3f();var r4N="[data-";var o6T=q1i;o6T+=a2S;var u6T=r4N;u6T+=p1ff.q3i;u6T+=p1ff.N3i;u6T+=J4N;var context=__html_id(identifier);return $(u6T + name + o6T,context);}function __html_els(identifier,names){var g6T=P9i;g6T+=k2E;g6T+=v6i;p1ff.h3f();var out=$();for(var i=y2O,ien=names[g6T];i < ien;i++){out=out[e1E](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var X4N="-editor-val";var f4N="[data-editor-v";var x4N="alue]";var V6T=v6i;p1ff.S3f();V6T+=n3i;V6T+=Z6N;var R6T=p1ff.N3i;R6T+=q0i;R6T+=X4N;R6T+=o5E;var d6T=p1ff[402431];d6T+=n3i;d6T+=R5E;var s6T=f4N;s6T+=x4N;var el=__html_el(identifier,dataSrc);return el[w4N](s6T)[H4i]?el[d6T](R6T):el[V6T]();}function __html_set(identifier,fields,data){p1ff.S3f();$[i4i](fields,function(name,field){var K4N="tor-value]";var a4N="filte";p1ff.h3f();var G4N="data-editor-";var S4N="[data-edi";var val=field[S1E](data);if(val !== undefined){var m6T=S4N;m6T+=K4N;var p6T=a4N;p6T+=z6i;var el=__html_el(identifier,field[W4N]());if(el[p6T](m6T)[H4i]){var I6T=G4N;I6T+=Y4N;var N6T=p1ff[402431];N6T+=n3i;N6T+=n3i;N6T+=z6i;el[N6T](I6T,val);}else {el[i4i](function(){var O4N="childNodes";var v1N="firstChild";var Z1N="removeChild";while(this[O4N][H4i]){this[Z1N](this[v1N]);}})[u6E](val);}}});}__dataSources[Q6T]={id:function(data){var l1N="dSr";var U6T=t6i;U6T+=l1N;U6T+=p1ff.T3i;var q6T=p1ff.q3i;q6T+=q6i;q6T+=n3i;var idFn=DataTable[q6T][T0i][W8N](this[y3i][U6T]);return idFn(data);},initField:function(cfg){var u1N='[data-editor-label="';var D1N="nam";var T6T=q1i;T6T+=a2S;var t6T=D1N;t6T+=p1ff.q3i;var label=$(u1N + (cfg[t0i] || cfg[t6T]) + T6T);if(!cfg[c0i] && label[H4i]){var i6T=v6i;i6T+=n3i;i6T+=p1ff[261600];i6T+=K9i;cfg[c0i]=label[i6T]();}},individual:function(identifier,fieldNames){var R1N="Back";var N1N="omatically determi";var g1N="itor-i";var I1N="ne field name from data sour";var V1N="ata-edi";var s1N="[da";var d1N="ta-editor-id]";var p1N="tor-f";var m1N="Cannot aut";var n6T=p1ff.q3i;n6T+=j8S;n6T+=v6i;var A6T=p1ff.q3i;A6T+=j8S;A6T+=v6i;var P6T=C3i;P6T+=f1E;var attachEl;if(identifier instanceof $ || identifier[o1N]){var c6T=U5i;c6T+=g1N;c6T+=p1ff.N3i;var j6T=s1N;j6T+=d1N;var y6T=e1E;y6T+=R1N;var z6T=C3i;z6T+=c3i;attachEl=identifier;if(!fieldNames){var B6T=p1ff.N3i;B6T+=V1N;B6T+=p1N;B6T+=z8i;var h6T=p1ff[402431];h6T+=x2E;h6T+=z6i;fieldNames=[$(identifier)[h6T](B6T)];}var back=$[z6T][y6T]?T9S:i9S;identifier=$(identifier)[C2i](j6T)[back]()[t0i](c6T);}if(!identifier){identifier=E4N;}if(fieldNames && !Array[T5E](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[H4i] === y2O){var C6T=m1N;C6T+=N1N;C6T+=I1N;C6T+=K3i;throw C6T;}var out=__dataSources[u6E][H1E][Q2i](this,identifier);var fields=this[y3i][P6T];var forceFields={};$[A6T](fieldNames,function(i,name){p1ff.h3f();forceFields[name]=fields[name];});$[n6T](out,function(id,set){var E6T=p1ff.N3i;E6T+=G0i;E6T+=a7i;E6T+=T6S;var e6T=J9S;e6T+=p1ff.N3i;e6T+=y3i;var k6T=n3i;k6T+=p1ff[50755];k6T+=Q1N;k6T+=e6i;var b6T=p1ff.T3i;b6T+=p1ff.q3i;b6T+=K9i;b6T+=K9i;var F6T=J9i;F6T+=z9i;set[F6T]=b6T;set[E6S]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[k6T]();set[e6T]=fields;set[E6T]=forceFields;});return out;},fields:function(identifier){var J6T=t9E;J6T+=p1ff.T3i;J6T+=v6i;var H6T=s6E;H6T+=p1ff[261600];H6T+=K9i;var out={};var self=__dataSources[H6T];if(Array[T5E](identifier)){var L6T=g3N;L6T+=v6i;for(var i=y2O,ien=identifier[L6T];i < ien;i++){var r6T=p1ff.T3i;r6T+=p1ff[402431];r6T+=K9i;r6T+=K9i;var M6T=C3i;M6T+=f1E;var res=self[M6T][r6T](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[y3i][H1E];if(!identifier){identifier=E4N;}$[J6T](fields,function(name,field){var q1N="valToData";var val=__html_get(identifier,field[W4N]());field[q1N](data,val === S0i?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:V3N};return out;},create:function(fields,data){if(data){var f6T=t6i;f6T+=p1ff.N3i;var X6T=v6i;X6T+=n3i;X6T+=p1ff[261600];X6T+=K9i;var id=__dataSources[X6T][f6T][Q2i](this,data);try{var x6T=P9i;x6T+=H3E;x6T+=n3i;x6T+=v6i;if(__html_id(id)[x6T]){__html_set(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var U1N="eyl";p1ff.h3f();var a6T=f4i;a6T+=U1N;a6T+=p1ff.q3i;a6T+=B2i;var K6T=p1ff.T3i;K6T+=p1ff[402431];K6T+=K9i;K6T+=K9i;var S6T=t6i;S6T+=p1ff.N3i;var w6T=v6i;w6T+=n3i;w6T+=Z6N;var id=__dataSources[w6T][S6T][K6T](this,data) || a6T;__html_set(id,fields,data);},remove:function(identifier,fields){__html_id(identifier)[O2i]();}};})();Editor[W6T]={"wrapper":X5i,"processing":{"indicator":t1N,"active":G6T},"header":{"wrapper":T1N,"content":Y6T},"body":{"wrapper":i1N,"content":h1N},"footer":{"wrapper":O6T,"content":B1N},"form":{"wrapper":Z9T,"content":z1N,"tag":p1ff.i3i,"info":v9T,"error":l9T,"buttons":y1N,"button":D9T,"buttonInternal":u9T},"field":{"wrapper":j1N,"typePrefix":c1N,"namePrefix":o9T,"label":C1N,"input":g9T,"inputControl":P1N,"error":A1N,"msg-label":s9T,"msg-error":n1N,"msg-message":d9T,"msg-info":R9T,"multiValue":F1N,"multiInfo":V9T,"multiRestore":b1N,"multiNoEdit":p9T,"disabled":m9T,"processing":t1N},"actions":{"create":N9T,"edit":k1N,"remove":e1N},"inline":{"wrapper":I9T,"liner":E1N,"buttons":Q9T},"bubble":{"wrapper":q9T,"liner":H1N,"table":U9T,"close":L1N,"pointer":t9T,"bg":M1N}};(function(){var e0N='buttons-edit';var W1N="ons-remov";var Z0N="move";var a1N="xtend";var X0N='rows';var A0N="formMessage";var u0N="r_create";var l0N="ect_single";var x1N="ngle";var D0N="edito";var J1N="removeSingl";var r1N="lectedSingle";var o0N="B";var S1N="ctedSingle";var f1N="eSi";var O1N="or_re";var d0N="formButtons";var Y0N="editSingle";var n0N="formTitle";var s0N="ools";var c0N='buttons-create';var X1N="remov";var K1N="Singl";var R0N="editor_edit";var g0N="UTTON";var l8T=v9E;l8T+=r1N;var v8T=J1N;v8T+=p1ff.q3i;var Z8T=A3i;Z8T+=i6i;Z8T+=u1i;var O7T=X1N;O7T+=f1N;O7T+=x1N;var Y7T=w1N;Y7T+=S1N;var G7T=F3i;G7T+=K1N;G7T+=p1ff.q3i;var W7T=p1ff.q3i;W7T+=p1ff.N3i;W7T+=g9i;var a7T=p1ff.q3i;a7T+=a1N;var e7T=P0E;e7T+=W1N;e7T+=p1ff.q3i;var n7T=G1N;n7T+=U5i;var D7T=A3i;D7T+=i6i;D7T+=c3i;D7T+=p1ff.N3i;if(DataTable[e1S]){var L9T=A3i;L9T+=Y1N;L9T+=p1ff.N3i;var H9T=F3i;H9T+=O1N;H9T+=Z0N;var C9T=v0N;C9T+=l0N;var B9T=i6i;B9T+=s6i;var h9T=D0N;h9T+=u0N;var i9T=o0N;i9T+=g0N;i9T+=I3N;var T9T=C8i;T9T+=r8E;T9T+=s0N;var ttButtons=DataTable[T9T][i9T];var ttButtonBase={sButtonText:S0i,editor:S0i,formTitle:S0i};ttButtons[h9T]=$[o8E](r4i,ttButtons[B9T],ttButtonBase,{formButtons:[{label:S0i,fn:function(e){var z9T=f5E;p1ff.S3f();z9T+=x5E;this[z9T]();}}],fnClick:function(button,config){var c9T=p1ff.T3i;c9T+=z6i;c9T+=q7N;c9T+=p1ff.q3i;var y9T=K9i;y9T+=p1ff[402431];y9T+=p1ff[225154];p1ff.S3f();y9T+=k3i;var editor=config[C7S];var i18nCreate=editor[R0i][n3S];var buttons=config[d0N];if(!buttons[y2O][y9T]){var j9T=l8S;j9T+=p1ff.q3i;j9T+=K9i;buttons[y2O][j9T]=i18nCreate[Y2E];}editor[c9T]({title:i18nCreate[I2E],buttons:buttons});}});ttButtons[R0N]=$[o8E](r4i,ttButtons[C9T],ttButtonBase,{formButtons:[{label:S0i,fn:function(e){this[Y2E]();}}],fnClick:function(button,config){var I0N="nGetSelect";var Q0N="edIndex";var p0N="mB";var N0N="tons";var E9T=n3i;E9T+=t6i;E9T+=V0N;E9T+=p1ff.q3i;var e9T=p1ff.q3i;e9T+=p1ff.N3i;e9T+=t6i;e9T+=n3i;var b9T=K9i;b9T+=F2i;b9T+=p1ff.q3i;b9T+=K9i;var F9T=N0E;F9T+=p0N;F9T+=m0N;F9T+=N0N;var n9T=x6N;n9T+=n3i;var A9T=t6i;A9T+=w8i;A9T+=H3i;A9T+=c3i;var P9T=C3i;P9T+=I0N;P9T+=Q0N;P9T+=Y5i;var selected=this[P9T]();if(selected[H4i] !== j2O){return;}var editor=config[C7S];var i18nEdit=editor[A9T][n9T];var buttons=config[F9T];if(!buttons[y2O][b9T]){var k9T=l1i;k9T+=p1ff[225154];k9T+=k3i;buttons[y2O][k9T]=i18nEdit[Y2E];}editor[e9T](selected[y2O],{title:i18nEdit[E9T],buttons:buttons});}});ttButtons[H9T]=$[L9T](r4i,ttButtons[G1N],ttButtonBase,{question:S0i,formButtons:[{label:S0i,fn:function(e){var that=this;p1ff.S3f();this[Y2E](function(json){var t0N="fnGetInstance";var q0N="SelectNon";var U0N="ataTa";var X9T=I4i;X9T+=q0N;X9T+=p1ff.q3i;var J9T=c3i;J9T+=A4S;J9T+=p1ff.q3i;var r9T=S1S;r9T+=p1ff.q3i;p1ff.h3f();var M9T=p1ff.N3i;M9T+=U0N;M9T+=m1E;var tt=$[I4i][M9T][e1S][t0N]($(that[y3i][r9T])[i8N]()[D2E]()[J9T]());tt[X9T]();});}}],fnClick:function(button,config){var h0N="firm";var i0N="stri";var T0N="nfir";var B0N="fnGet";var z0N="SelectedIn";var y0N="dexes";var l7T=T7i;l7T+=n9E;p1ff.S3f();var v7T=z6i;v7T+=g5E;v7T+=K9i;v7T+=d9S;var Z7T=o0S;Z7T+=d7S;var G9T=l1i;G9T+=p1ff[225154];G9T+=k3i;var W9T=K9i;W9T+=p6E;var a9T=p1ff.T3i;a9T+=p1ff[50755];a9T+=T0N;a9T+=p1ff[261600];var K9T=i0N;K9T+=c3i;K9T+=L1i;var S9T=L2i;S9T+=h0N;var w9T=p2E;w9T+=d5i;var x9T=t6i;x9T+=b7S;x9T+=c3i;var f9T=B0N;f9T+=z0N;f9T+=y0N;var rows=this[f9T]();if(rows[H4i] === y2O){return;}var editor=config[C7S];var i18nRemove=editor[x9T][O2i];var buttons=config[w9T];var question=typeof i18nRemove[S9T] === K9T?i18nRemove[k7S]:i18nRemove[k7S][rows[H4i]]?i18nRemove[a9T][rows[W9T]]:i18nRemove[k7S][s5i];if(!buttons[y2O][G9T]){var O9T=h7S;O9T+=g9i;var Y9T=K9i;Y9T+=F2i;Y9T+=p1ff.q3i;Y9T+=K9i;buttons[y2O][Y9T]=i18nRemove[O9T];}editor[Z7T](rows,{message:question[v7T](/%d/g,rows[H4i]),title:i18nRemove[l7T],buttons:buttons});}});}var _buttons=DataTable[a6E][z3S];$[D7T](_buttons,{create:{text:function(dt,node,config){var j0N='buttons.create';var o7T=I8i;o7T+=x2E;o7T+=p1ff[50755];o7T+=c3i;var u7T=t6i;u7T+=w8i;u7T+=H3i;u7T+=c3i;return dt[u7T](j0N,config[C7S][R0i][n3S][o7T]);},className:c0N,editor:S0i,formButtons:{text:function(editor){p1ff.S3f();var s7T=g0S;s7T+=s0S;s7T+=p1ff.q3i;var g7T=t6i;g7T+=b7S;g7T+=c3i;return editor[g7T][s7T][Y2E];},action:function(e){p1ff.h3f();this[Y2E]();}},formMessage:S0i,formTitle:S0i,action:function(e,dt,node,config){var P0N="roces";var C0N="Bu";var m7T=n3i;m7T+=g9i;m7T+=P9i;var p7T=H7S;p7T+=L1i;p1ff.S3f();p7T+=p1ff.q3i;var V7T=p2E;V7T+=C0N;V7T+=Q8i;V7T+=y3i;var R7T=p1ff[50755];R7T+=c3i;R7T+=p1ff.q3i;var d7T=h6i;d7T+=P0N;d7T+=p6i;d7T+=H3E;var that=this;var editor=config[C7S];this[d7T](r4i);editor[R7T](C6N,function(){that[v5E](L4i);})[n3S]({buttons:config[V7T],message:config[A0N] || editor[R0i][n3S][p7T],title:config[n0N] || editor[R0i][n3S][m7T]});}},edit:{extend:F0N,text:function(dt,node,config){var k0N='buttons.edit';var b0N="itor";var q7T=I8i;q7T+=n3i;q7T+=E1S;var Q7T=E3i;Q7T+=R6E;var I7T=U5i;I7T+=b0N;var N7T=t6i;N7T+=L0E;return dt[N7T](k0N,config[I7T][Q7T][F3i][q7T]);},className:e0N,editor:S0i,formButtons:{text:function(editor){p1ff.h3f();return editor[R0i][F3i][Y2E];},action:function(e){var U7T=y3i;U7T+=u8i;U7T+=p1ff[261600];U7T+=g9i;p1ff.h3f();this[U7T]();}},formMessage:S0i,formTitle:S0i,action:function(e,dt,node,config){var J0N="xes";var L0N="Message";var H0N="mess";var E0N="rmTit";var M0N="preOp";var A7T=T7i;A7T+=V0N;A7T+=p1ff.q3i;var P7T=t6i;P7T+=w8i;P7T+=R6E;var C7T=C3i;C7T+=p1ff[50755];C7T+=E0N;C7T+=P9i;var c7T=H0N;c7T+=K3N;var j7T=t6i;j7T+=w8i;j7T+=H3i;j7T+=c3i;var y7T=p2E;y7T+=L0N;var z7T=p2E;z7T+=d5i;var B7T=M0N;B7T+=d6i;var h7T=K9i;h7T+=p1ff.q3i;h7T+=H3E;h7T+=k4i;var i7T=r0N;p1ff.h3f();i7T+=J0N;var T7T=p1ff.T3i;T7T+=p1ff.q3i;T7T+=T9N;T7T+=y3i;var t7T=p1ff.q3i;t7T+=P8i;var that=this;var editor=config[t7T];var rows=dt[j5S]({selected:r4i})[M8N]();var columns=dt[Z4N]({selected:r4i})[M8N]();var cells=dt[T7T]({selected:r4i})[i7T]();var items=columns[H4i] || cells[h7T]?{rows:rows,columns:columns,cells:cells}:rows;this[v5E](r4i);editor[f9S](B7T,function(){p1ff.S3f();that[v5E](L4i);})[F3i](items,{buttons:config[z7T],message:config[y7T] || editor[j7T][F3i][c7T],title:config[C7T] || editor[P7T][F3i][A7T]});}},remove:{extend:n7T,limitTo:[X0N],text:function(dt,node,config){var f0N='buttons.remove';var k7T=I8i;k7T+=x2E;k7T+=p1ff[50755];k7T+=c3i;var b7T=t6i;b7T+=w8i;b7T+=H3i;b7T+=c3i;var F7T=F3i;F7T+=h1i;return dt[R0i](f0N,config[F7T][b7T][O2i][k7T]);},className:e7T,editor:S0i,formButtons:{text:function(editor){var H7T=D0E;H7T+=t9i;p1ff.h3f();var E7T=t6i;E7T+=w8i;E7T+=H3i;E7T+=c3i;return editor[E7T][O2i][H7T];},action:function(e){this[Y2E]();}},formMessage:function(editor,dt){var x0N="repl";var S0N="fir";var K0N="strin";var w0N="gt";var X7T=K9i;X7T+=p1ff.q3i;X7T+=k2E;X7T+=v6i;var J7T=x0N;J7T+=p1ff[402431];J7T+=p1ff.T3i;J7T+=p1ff.q3i;var r7T=K9i;r7T+=d6i;r7T+=w0N;r7T+=v6i;var M7T=L2i;M7T+=S0N;M7T+=p1ff[261600];var L7T=K0N;L7T+=L1i;var rows=dt[j5S]({selected:r4i})[M8N]();var i18n=editor[R0i][O2i];var question=typeof i18n[k7S] === L7T?i18n[k7S]:i18n[M7T][rows[H4i]]?i18n[k7S][rows[r7T]]:i18n[k7S][s5i];return question[J7T](/%d/g,rows[X7T]);},formTitle:S0i,action:function(e,dt,node,config){var a0N="indexe";var W0N="ows";var K7T=n3i;K7T+=x8E;var S7T=d0S;S7T+=s7S;var w7T=a0N;w7T+=y3i;var x7T=z6i;x7T+=W0N;var that=this;var editor=config[C7S];this[v5E](r4i);editor[f9S](C6N,function(){var G0N="ocessing";var f7T=h9i;f7T+=G0N;that[f7T](L4i);})[O2i](dt[x7T]({selected:r4i})[w7T](),{buttons:config[d0N],message:config[A0N],title:config[n0N] || editor[R0i][S7T][K7T]});}}});_buttons[Y0N]=$[a7T]({},_buttons[W7T]);_buttons[G7T][o8E]=Y7T;_buttons[O7T]=$[Z8T]({},_buttons[O2i]);_buttons[v8T][o8E]=l8T;})();Editor[D8T]={};Editor[O0N]=function(input,opts){var f2N="YY";var s2N="calenda";var o2N="tance";var L2N="evio";var x2N="Y";var p2N="<di";var H2N="Right\"";var R3a='-error"></div>';var o3a='-year"></select>';var t2N="<select c";var B2N="pan>";var q3a=/[haA]/;var y2N="l\">";var d2N="-tit";var r2N="-iconL";var U3a="_constructor";var k2N="<bu";var D2N="atch";var S2N="rma";var P2N="ect class=\"";var V3a='-error';var R2N="iv ";var c2N="th\"></select>";var n2N="/sp";var v2N="forma";var V2N="class=\"";var M2N="ton>";var p3a='editor-dateime-';var z2N="-l";var A2N="span><";var j2N="-mon";var Q3a=/[Hhm]|LT|LTS/;var i2N="<sp";var l2N="xOf";var d3a='-seconds"></div>';var Z2N="ar";var I2N="-minutes\"></div";var W2N="Editor datetime: Without momentjs only the format 'YYYY-MM-DD' can be used";var u3a='-label">';var l3a='-date">';var w2N="Y-MM-DD";var D3a='</button>';var Q2N="iv class";var s3a='-hours"></div>';var J2N="eft\"";var T2N="lass=";var e2N="tton>";var b2N="/button>";var U2N="ime\"";var N3a=/[YMD]|L(?!T)|l/;var C2N="<sel";var h2N="an></s";var g3a='-calendar"></div>';var u4T=o2S;u4T+=s2E;u4T+=Z2N;var D4T=p1ff.N3i;D4T+=p1ff[402431];D4T+=i6i;var l4T=p1ff.N3i;l4T+=p1ff[50755];l4T+=p1ff[261600];var v4T=o1i;v4T+=p1ff[261600];var Z4T=T7i;Z4T+=S1i;var O8T=p1ff[402431];O8T+=d2S;var Y8T=p1ff.N3i;Y8T+=p1ff[402431];Y8T+=n3i;Y8T+=p1ff.q3i;var G8T=p1ff.N3i;G8T+=p1ff[50755];G8T+=p1ff[261600];var W8T=p1ff[261600];W8T+=p1ff[402431];W8T+=n3i;W8T+=H6i;var a8T=v2N;a8T+=n3i;var K8T=r0N;K8T+=l2N;var S8T=p1ff[261600];S8T+=D2N;var w8T=u2N;w8T+=y3i;w8T+=o2N;var x8T=A4i;x8T+=u1i;var f8T=h5i;f8T+=n3i;f8T+=g2N;f8T+=p1ff.q3i;var X8T=C3i;X8T+=n7i;X8T+=p1ff.N3i;var J8T=h5i;J8T+=s2N;J8T+=z6i;var r8T=C3i;r8T+=C6S;var M8T=d2N;M8T+=P9i;var L8T=C3i;L8T+=t6i;L8T+=u1i;var H8T=h5i;H8T+=u0i;H8T+=n3i;H8T+=p1ff.q3i;var E8T=p1ff.N3i;E8T+=p1ff[50755];E8T+=p1ff[261600];var e8T=j1i;e8T+=c1i;e8T+=t6i;e8T+=T1i;var k8T=j1i;k8T+=p1ff.N3i;k8T+=R2N;k8T+=V2N;var b8T=p2N;b8T+=n8i;b8T+=m2N;b8T+=N2N;var F8T=I2N;F8T+=m1i;var n8T=j1i;n8T+=p1ff.N3i;n8T+=Q2N;n8T+=q2N;var A8T=h5i;A8T+=n3i;A8T+=U2N;A8T+=m1i;var P8T=p1i;P8T+=d8i;P8T+=n8i;P8T+=m1i;var C8T=t2N;C8T+=T2N;C8T+=q1i;var c8T=i2N;c8T+=h2N;c8T+=B2N;var j8T=z2N;j8T+=p1ff[402431];j8T+=A3E;j8T+=y2N;var y8T=j2N;y8T+=c2N;var z8T=C2N;z8T+=P2N;var B8T=j1i;B8T+=A2N;B8T+=n2N;B8T+=F2N;var h8T=j1i;h8T+=b2N;var i8T=k2N;i8T+=e2N;var T8T=E2N;T8T+=c3i;T8T+=H2N;T8T+=m1i;var t8T=M0E;t8T+=Z4i;t8T+=m3S;t8T+=q2N;var U8T=h9i;U8T+=L2N;U8T+=N3E;var q8T=k2N;q8T+=n3i;q8T+=M2N;var Q8T=r2N;Q8T+=J2N;Q8T+=m1i;var I8T=F1i;I8T+=R2N;I8T+=m3S;I8T+=q2N;var N8T=X2N;N8T+=g9i;N8T+=P9i;N8T+=H4S;var m8T=M0E;m8T+=r0E;var s8T=f2N;s8T+=x2N;s8T+=w2N;var g8T=C3i;g8T+=p1ff[50755];g8T+=S2N;g8T+=n3i;var o8T=t6i;o8T+=w8i;o8T+=H3i;o8T+=c3i;var u8T=h3E;u8T+=p1ff[402431];u8T+=J3S;u8T+=y3i;this[p1ff.T3i]=$[o8E](r4i,{},Editor[O0N][u8T],opts);var classPrefix=this[p1ff.T3i][K2N];var i18n=this[p1ff.T3i][o8T];if(!window[a2N] && this[p1ff.T3i][g8T] !== s8T){throw W2N;}var timeBlock=function(type){var O2N=" clas";var G2N="imebloc";var Y2N="k\">";var V8T=p1i;V8T+=e0E;var R8T=X2N;R8T+=G2N;p1ff.S3f();R8T+=Y2N;var d8T=M0E;d8T+=O2N;d8T+=X0E;d8T+=q1i;return d8T + classPrefix + R8T + V8T;};var gap=function(){var v3a=">:</s";var Z3a="<span";var p8T=Z3a;p8T+=v3a;p8T+=B2N;return p8T;};var structure=$(m8T + classPrefix + P0i + l2E + classPrefix + l3a + l2E + classPrefix + N8T + I8T + classPrefix + Q8T + q8T + i18n[U8T] + D3a + n0i + t8T + classPrefix + T8T + i8T + i18n[H5N] + h8T + n0i + l2E + classPrefix + u3a + B8T + z8T + classPrefix + y8T + n0i + l2E + classPrefix + j8T + c8T + C8T + classPrefix + o3a + P8T + n0i + l2E + classPrefix + g3a + n0i + l2E + classPrefix + A8T + n8T + classPrefix + s3a + l2E + classPrefix + F8T + b8T + classPrefix + d3a + n0i + k8T + classPrefix + R3a + e8T);this[E8T]={container:structure,date:structure[y5S](s9S + classPrefix + H8T),title:structure[L8T](s9S + classPrefix + M8T),calendar:structure[r8T](s9S + classPrefix + J8T),time:structure[X8T](s9S + classPrefix + f8T),error:structure[x8T](s9S + classPrefix + V3a),input:$(input)};this[y3i]={d:S0i,display:S0i,minutesRange:S0i,secondsRange:S0i,namespace:p3a + Editor[O0N][w8T]++,parts:{date:this[p1ff.T3i][m3a][S8T](N3a) !== S0i,time:this[p1ff.T3i][m3a][I3a](Q3a) !== S0i,seconds:this[p1ff.T3i][m3a][K8T](g4i) !== -j2O,hours12:this[p1ff.T3i][a8T][W8T](q3a) !== S0i}};this[G8T][j2i][F3E](this[O0i][Y8T])[O8T](this[O0i][Z4T])[F3E](this[v4T][v3E]);this[l4T][D4T][F3E](this[O0i][I2E])[F3E](this[O0i][u4T]);this[U3a]();};$[o8E](Editor[O0N][N2i],{destroy:function(){var t3a='.editor-datetime';var d4T=o1i;d4T+=p1ff[261600];var s4T=p1ff.q3i;s4T+=o1S;s4T+=n3i;s4T+=a7i;var g4T=p1ff.N3i;g4T+=p1ff[50755];g4T+=p1ff[261600];var o4T=s5i;o4T+=k7i;o4T+=p1ff.q3i;this[o4T]();this[g4T][j2i][x7E]()[s4T]();this[d4T][V3E][x7E](t3a);},errorMsg:function(msg){var R4T=r2i;R4T+=z6i;R4T+=p1ff[50755];R4T+=z6i;var error=this[O0i][R4T];if(msg){var V4T=v6i;V4T+=n3i;V4T+=Z6N;error[V4T](msg);}else {var p4T=p1ff.q3i;p4T+=o1S;p4T+=J9i;error[p4T]();}},hide:function(){var m4T=s5i;m4T+=V5S;m4T+=P7i;p1ff.S3f();this[m4T]();},max:function(date){var T3a="_optionsTit";var I4T=T3a;I4T+=P9i;p1ff.h3f();var N4T=i3a;N4T+=m5i;N4T+=p1ff[402431];N4T+=i6i;this[p1ff.T3i][N4T]=date;this[I4T]();this[h3a]();},min:function(date){var j3a="sTitle";var y3a="_option";var B3a="_se";var z3a="tCala";var q4T=B3a;q4T+=z3a;q4T+=u1i;q4T+=r2i;var Q4T=y3a;Q4T+=j3a;this[p1ff.T3i][c3a]=date;this[Q4T]();this[q4T]();},owns:function(node){var C3a="onta";var U4T=p1ff.T3i;p1ff.S3f();U4T+=C3a;U4T+=A6N;U4T+=z6i;return $(node)[C2i]()[w4N](this[O0i][U4T])[H4i] > y2O;},val:function(set,write){var P3a="_setTitl";var F3a="ateT";var X3a="writ";var r3a="isValid";var H3a="mom";var e3a="momentLo";var A3a="String";var k3a="toDat";var b3a="oUtc";var L3a="utc";var J3a=/(\d{4})\-(\d{2})\-(\d{2})/;var f3a="eOutput";var E3a="cale";var n3a="-now";var x3a="_dateToUt";var F4T=s5i;F4T+=y3i;F4T+=w1E;F4T+=w3i;var n4T=P3a;n4T+=p1ff.q3i;var A4T=F1E;A4T+=k6E;var P4T=O9i;P4T+=A3a;var T4T=h5i;T4T+=n3a;if(set === undefined){return this[y3i][p1ff.N3i];}if(set instanceof Date){var t4T=A9E;t4T+=F3a;t4T+=b3a;this[y3i][p1ff.N3i]=this[t4T](set);}else if(set === S0i || set === o4i){this[y3i][p1ff.N3i]=S0i;}else if(set === T4T){this[y3i][p1ff.N3i]=new Date();}else if(typeof set === y3S){var i4T=p1ff[261600];i4T+=y2i;i4T+=p8E;if(window[i4T]){var z4T=k3a;z4T+=p1ff.q3i;var B4T=e3a;B4T+=E3a;var h4T=H3a;h4T+=p8E;var m=window[h4T][L3a](set,this[p1ff.T3i][m3a],this[p1ff.T3i][B4T],this[p1ff.T3i][M3a]);this[y3i][p1ff.N3i]=m[r3a]()?m[z4T]():S0i;}else {var y4T=c3E;y4T+=r8E;y4T+=t2S;var match=set[I3a](J3a);this[y3i][p1ff.N3i]=match?new Date(Date[y4T](match[j2O],match[c2O] - j2O,match[C2O])):S0i;}}if(write || write === undefined){if(this[y3i][p1ff.N3i]){var j4T=s5i;j4T+=X3a;j4T+=f3a;this[j4T]();}else {var c4T=p1ff.N3i;c4T+=p1ff[50755];c4T+=p1ff[261600];this[c4T][V3E][V2i](set);}}if(!this[y3i][p1ff.N3i]){var C4T=x3a;C4T+=p1ff.T3i;this[y3i][p1ff.N3i]=this[C4T](new Date());}p1ff.h3f();this[y3i][z3E]=new Date(this[y3i][p1ff.N3i][P4T]());this[y3i][A4T][w3a](j2O);this[n4T]();this[h3a]();this[F4T]();},_constructor:function(){var S3a="keyup.editor-";var Z5a="art";var Y3a="rts";var o5a='-seconds';var D5a="time";p1ff.S3f();var W3a="_opt";var G3a="sTi";var j5a="_correctMonth";var u5a="seconds";var m5a='select';var q5a="minu";var L5a="_setTime";var s5a='focus.editor-datetime click.editor-datetime';var p5a=':visible';var M5a="_writeOutput";var T5a="urs";var a3a="autocomplet";var z5a="_s";var g5a="eq";var O3a="tim";var x1T=p1ff[50755];x1T+=c3i;var q1T=k2i;q1T+=e2i;q1T+=E2i;var Q1T=p1ff.N3i;Q1T+=p1ff[50755];Q1T+=p1ff[261600];var m1T=S3a;m1T+=K3a;m1T+=T7i;m1T+=S1i;var p1T=p1ff[50755];p1T+=c3i;var l1T=p1ff[50755];l1T+=b7E;var v1T=a3a;v1T+=p1ff.q3i;var Z1T=p1ff.N3i;Z1T+=p1ff[50755];Z1T+=p1ff[261600];var O4T=W3a;O4T+=d3S;O4T+=G3a;O4T+=n9E;var S4T=U6N;S4T+=Y3a;var J4T=O3a;J4T+=p1ff.q3i;var r4T=h6i;r4T+=p1ff[402431];r4T+=Y3a;var E4T=p1ff.N3i;E4T+=Q5S;var e4T=h6i;e4T+=Z5a;e4T+=y3i;var that=this;var classPrefix=this[p1ff.T3i][K2N];var onChange=function(){var v5a="han";var k4T=n8i;p1ff.h3f();k4T+=H9E;var b4T=Q9N;b4T+=v5a;b4T+=I6S;that[p1ff.T3i][b4T][Q2i](that,that[O0i][V3E][k4T](),that[y3i][p1ff.N3i],that[O0i][V3E]);};if(!this[y3i][e4T][E4T]){var M4T=p1ff.N3i;M4T+=K7i;M4T+=e6i;var L4T=p1ff.N3i;L4T+=s0S;L4T+=p1ff.q3i;var H4T=p1ff.N3i;H4T+=p1ff[50755];H4T+=p1ff[261600];this[H4T][L4T][A2i](M4T,J5E);}if(!this[y3i][r4T][J4T]){var w4T=c3i;w4T+=p1ff[50755];w4T+=c3i;w4T+=p1ff.q3i;var x4T=p1ff.N3i;x4T+=t6i;x4T+=l5a;x4T+=a7i;var f4T=p1ff.T3i;f4T+=B2i;var X4T=p1ff.N3i;X4T+=p1ff[50755];X4T+=p1ff[261600];this[X4T][D5a][f4T](x4T,w4T);}if(!this[y3i][S4T][u5a]){var Y4T=y3i;Y4T+=h6i;Y4T+=p1ff[402431];Y4T+=c3i;var G4T=T7i;G4T+=S1i;var W4T=d0S;W4T+=s7S;var a4T=H6i;a4T+=P3i;a4T+=I8E;a4T+=d6i;var K4T=p1ff.N3i;K4T+=p1ff[50755];K4T+=p1ff[261600];this[K4T][D5a][a4T](g9S + classPrefix + o5a)[W4T]();this[O0i][G4T][s9E](Y4T)[g5a](j2O)[O2i]();}this[O4T]();this[Z1T][V3E][u8S](v1T,l1T)[I5i](s5a,function(){var V1T=p1ff.N3i;V1T+=p1ff[50755];V1T+=p1ff[261600];p1ff.S3f();var R1T=n8i;R1T+=p1ff[402431];R1T+=K9i;var d1T=d5a;d1T+=i2i;d1T+=l5i;d1T+=p1ff.N3i;var s1T=t6i;s1T+=y3i;var g1T=t6i;g1T+=R5a;g1T+=m0N;var o1T=t6i;o1T+=y3i;var u1T=C5E;u1T+=O7i;u1T+=V5a;var D1T=p1ff.N3i;D1T+=y2i;if(that[D1T][u1T][o1T](p5a) || that[O0i][g1T][s1T](d1T)){return;}that[R1T](that[V1T][V3E][V2i](),L4i);that[d9E]();})[p1T](m1T,function(){p1ff.S3f();var N1T=t6i;N1T+=y3i;if(that[O0i][j2i][N1T](p5a)){var I1T=n8i;I1T+=p1ff[402431];I1T+=K9i;that[V2i](that[O0i][V3E][I1T](),L4i);}});this[Q1T][q1T][I5i](u5S,m5a,function(){var n5a="hou";var C5a="tUTCFul";var b5a="ampm";var U5a="has";var k5a="-hour";var N5a="_positio";var w5a="Minutes";var S5a="setSeconds";var t5a="-ho";var y5a="etT";var B5a='-month';var e5a="contai";var r5a="_writeO";var I5a="-se";var Q5a="conds";var c5a="tTi";var F5a="12";var A5a='-ampm';var h5a="-ye";var H5a="UTCHo";var i5a="asClass";var f1T=N5a;f1T+=c3i;var X1T=p1ff.N3i;X1T+=p1ff[50755];X1T+=p1ff[261600];var J1T=I5a;J1T+=Q5a;var H1T=h5i;H1T+=q5a;H1T+=n3i;H1T+=Y5i;var y1T=U5a;y1T+=Z3E;y1T+=y3i;y1T+=y3i;var z1T=t5a;z1T+=T5a;p1ff.S3f();var B1T=v6i;B1T+=i5a;var T1T=h5a;T1T+=p1ff[402431];T1T+=z6i;var U1T=n8i;U1T+=p1ff[402431];U1T+=K9i;var select=$(this);var val=select[U1T]();if(select[J2i](classPrefix + B5a)){var t1T=z5a;t1T+=y5a;t1T+=x8E;that[j5a](that[y3i][z3E],val);that[t1T]();that[h3a]();}else if(select[J2i](classPrefix + T1T)){var h1T=z5a;h1T+=p1ff.q3i;h1T+=c5a;h1T+=n9E;var i1T=v9E;i1T+=C5a;i1T+=K9i;i1T+=P5a;that[y3i][z3E][i1T](val);that[h1T]();that[h3a]();}else if(select[B1T](classPrefix + z1T) || select[y1T](classPrefix + A5a)){var c1T=n5a;c1T+=F8i;c1T+=F5a;var j1T=T6N;j1T+=n3i;j1T+=y3i;if(that[y3i][j1T][c1T]){var e1T=h6i;e1T+=p1ff[261600];var k1T=t7i;k1T+=K9i;var b1T=h5i;b1T+=b5a;var F1T=p1ff.N3i;F1T+=p1ff[50755];F1T+=p1ff[261600];var n1T=t7i;n1T+=K9i;var A1T=k5a;A1T+=y3i;var P1T=e5a;P1T+=E2i;var C1T=p1ff.N3i;C1T+=p1ff[50755];C1T+=p1ff[261600];var hours=$(that[C1T][P1T])[y5S](s9S + classPrefix + A1T)[n1T]() * j2O;var pm=$(that[F1T][j2i])[y5S](s9S + classPrefix + b1T)[k1T]() === e1T;that[y3i][p1ff.N3i][E5a](hours === e2O && !pm?y2O:pm && hours !== e2O?hours + e2O:hours);}else {var E1T=k5E;E1T+=H5a;E1T+=j6i;E1T+=F8i;that[y3i][p1ff.N3i][E1T](val);}that[L5a]();that[M5a](r4i);onChange();}else if(select[J2i](classPrefix + H1T)){var r1T=r5a;r1T+=m0N;r1T+=J5a;var M1T=s5i;M1T+=k5E;M1T+=r8E;M1T+=X5a;var L1T=f5a;L1T+=x5a;L1T+=w5a;that[y3i][p1ff.N3i][L1T](val);that[M1T]();that[r1T](r4i);onChange();}else if(select[J2i](classPrefix + J1T)){that[y3i][p1ff.N3i][S5a](val);that[L5a]();that[M5a](r4i);onChange();}that[X1T][V3E][y2E]();that[f1T]();})[x1T](K5a,function(e){var C6a="_setTi";var G5a="L";var e6a="tUTC";var I6a="_wr";var b6a="secondsRang";var l6a="nLeft";var f6a="setUTCFullYear";var h6a="TCHo";var g6a="hasClas";var t6a="cond";var u6a="ha";var a5a="stopP";var p6a="_set";var q6a="Output";var o6a="sClass";var H6a="tUTCHours";var N6a='-time';var V6a="_setTitle";var M6a="etUTCMonth";var Y5a="owerCase";var D6a="asCl";var v6a="nRi";var m6a="Ti";var Z6a="parentNode";var E6a="Ho";var W5a="ropagation";var X6a="tc";var y6a="hasC";var T6a="tUTCM";var Q6a="ite";var i6a="inutes";var r6a="setUT";var L6a="getUTCHours";var O5a="arg";var P6a="minutesRange";var F6a="secondsRange";var k6a="getUTCHou";var J6a="ateToU";var S6a="Calander";p1ff.h3f();var W1T=I8i;W1T+=x2E;W1T+=I5i;var a1T=a5a;a1T+=W5a;var K1T=O9i;K1T+=G5a;K1T+=Y5a;var S1T=n3i;S1T+=O5a;S1T+=w1E;var w1T=y3i;w1T+=h6i;w1T+=p1ff[402431];w1T+=c3i;var d=that[y3i][p1ff.N3i];var nodeName=e[N7E][o1N][b3N]();var target=nodeName === w1T?e[N7E][Z6a]:e[S1T];nodeName=target[o1N][K1T]();if(nodeName === m5a){return;}e[a1T]();if(nodeName === W1T){var g0T=E2N;g0T+=v6a;g0T+=L1i;g0T+=s6E;var o0T=v6i;o0T+=o2i;o0T+=K9i;o0T+=y1E;var v0T=E2N;v0T+=l6a;var Z0T=v6i;Z0T+=D6a;Z0T+=l1S;Z0T+=y3i;var O1T=z6i;O1T+=p1ff[402431];O1T+=H3E;O1T+=p1ff.q3i;var Y1T=u6a;Y1T+=o6a;var G1T=g6a;G1T+=y3i;var button=$(target);var parent=button[Y5E]();if(parent[G1T](s6a) && !parent[Y1T](O1T)){button[R0E]();return;}if(parent[Z0T](classPrefix + v0T)){var u0T=C3i;u0T+=p1ff[50755];u0T+=R2i;u0T+=y3i;var D0T=o1i;D0T+=p1ff[261600];var l0T=w7i;l0T+=e6i;that[y3i][z3E][d6a](that[y3i][l0T][R6a]() - j2O);that[V6a]();that[h3a]();that[D0T][V3E][u0T]();}else if(parent[o0T](classPrefix + g0T)){var R0T=p1ff.N3i;R0T+=p1ff[50755];R0T+=p1ff[261600];var d0T=p6a;d0T+=m6a;d0T+=V0N;d0T+=p1ff.q3i;var s0T=F1E;s0T+=k6E;that[j5a](that[y3i][s0T],that[y3i][z3E][R6a]() + j2O);that[d0T]();that[h3a]();that[R0T][V3E][y2E]();}else if(button[C2i](s9S + classPrefix + N6a)[H4i]){var F0T=I6a;F0T+=Q6a;F0T+=q6a;var n0T=v9E;n0T+=U6a;n0T+=t6a;n0T+=y3i;var A0T=v9E;A0T+=T6a;A0T+=i6a;var P0T=q5a;P0T+=i6i;P0T+=y3i;var C0T=k5E;C0T+=c3E;C0T+=h6a;C0T+=T5a;var c0T=v6i;c0T+=n4E;c0T+=z6i;c0T+=y3i;var y0T=h6i;y0T+=p1ff[261600];var h0T=p1ff[402431];h0T+=p1ff[261600];var p0T=j6i;p0T+=Y1S;var V0T=t7i;V0T+=D8S;var val=button[t0i](V0T);var unit=button[t0i](p0T);if(unit === B6a){var Q0T=N9E;Q0T+=z6a;var I0T=y6a;I0T+=W2i;var N0T=j6a;N0T+=K9i;N0T+=U5i;var m0T=v6i;m0T+=p1ff[402431];m0T+=y3i;m0T+=c6a;if(parent[m0T](N0T) && parent[I0T](Q0T)){var q0T=C6a;q0T+=S1i;that[y3i][P6a]=val;that[q0T]();return;}else {that[y3i][P6a]=S0i;}}if(unit === A6a){var t0T=i2i;t0T+=e7N;t0T+=U5i;var U0T=v6i;U0T+=D6a;U0T+=p1ff[402431];U0T+=B2i;if(parent[U0T](t0T) && parent[J2i](n6a)){var T0T=z5a;T0T+=w1E;T0T+=w3i;that[y3i][F6a]=val;that[T0T]();return;}else {var i0T=b6a;i0T+=p1ff.q3i;that[y3i][i0T]=S0i;}}if(val === h0T){var B0T=k6a;B0T+=F8i;if(d[B0T]() >= e2O){var z0T=I6S;z0T+=e6a;z0T+=E6a;z0T+=T5a;val=d[z0T]() - e2O;}else {return;}}else if(val === y0T){var j0T=I6S;j0T+=H6a;if(d[j0T]() < e2O){val=d[L6a]() + e2O;}else {return;}}var set=unit === c0T?C0T:unit === P0T?A0T:n0T;d[set](val);that[L5a]();that[F0T](r4i);onChange();}else {var X0T=n3i;X0T+=g2N;X0T+=p1ff.q3i;var J0T=h6i;J0T+=Z5a;J0T+=y3i;var r0T=p1ff.N3i;r0T+=p1ff[402431];r0T+=a7i;var M0T=v9E;M0T+=e6a;M0T+=x3i;var L0T=p1ff.N3i;L0T+=p1ff[402431];L0T+=n3i;L0T+=p1ff[402431];var H0T=y3i;H0T+=M6a;var E0T=a7i;E0T+=t9E;E0T+=z6i;var e0T=p1ff.N3i;e0T+=p1ff[402431];e0T+=n3i;e0T+=p1ff[402431];var k0T=r6a;k0T+=t2S;k0T+=x3i;if(!d){var b0T=A9E;b0T+=J6a;b0T+=X6a;d=that[b0T](new Date());}d[k0T](j2O);d[f6a](button[e0T](E0T));d[H0T](button[L0T](x6a));d[M0T](button[t0i](r0T));that[M5a](r4i);if(!that[y3i][J0T][X0T]){setTimeout(function(){p1ff.h3f();var w6a="ide";var f0T=q8E;f0T+=w6a;that[f0T]();},b2O);}else {var x0T=s5i;x0T+=k5E;x0T+=S6a;that[x0T]();}onChange();}}else {var S0T=t6i;S0T+=c3i;S0T+=J5a;var w0T=p1ff.N3i;w0T+=p1ff[50755];w0T+=p1ff[261600];that[w0T][S0T][y2E]();}});},_compareDates:function(a,b){var W6a="tring";var a6a="oUtcS";var G6a="_dateToUtcStr";var K6a="_date";var a0T=K6a;a0T+=r8E;a0T+=a6a;a0T+=W6a;var K0T=G6a;K0T+=W5i;return this[K0T](a) === this[a0T](b);},_correctMonth:function(date,month){var v9a="TCMon";var Y6a="_daysInMonth";var days=this[Y6a](date[O6a](),month);p1ff.S3f();var correctDays=date[Z9a]() > days;date[d6a](month);if(correctDays){var W0T=f5a;W0T+=v9a;W0T+=k4i;date[w3a](days);date[W0T](month);}},_daysInMonth:function(year,month){var x2O=28;var w2O=29;var K2O=31;var S2O=30;var isLeap=year % P2O === y2O && (year % l3i !== y2O || year % u3i === y2O);var months=[K2O,isLeap?w2O:x2O,K2O,S2O,K2O,S2O,K2O,K2O,S2O,K2O,S2O,K2O];return months[month];},_dateToUtc:function(s){var s9a="llYear";var D9a="econ";var g9a="Fu";var l9a="getS";var d9a="getDate";var o9a="tHour";var u9a="Minut";var l2T=l9a;l2T+=D9a;l2T+=p1ff.N3i;l2T+=y3i;var v2T=L1i;v2T+=w1E;v2T+=u9a;v2T+=Y5i;var Z2T=L1i;Z2T+=p1ff.q3i;Z2T+=o9a;Z2T+=y3i;var O0T=b5E;O0T+=U6i;O0T+=I5i;O0T+=k4i;var Y0T=L1i;Y0T+=w1E;Y0T+=g9a;Y0T+=s9a;var G0T=c3E;G0T+=r8E;G0T+=t2S;return new Date(Date[G0T](s[Y0T](),s[O0T](),s[d9a](),s[Z2T](),s[v2T](),s[l2T]()));},_dateToUtcString:function(d){var p9a="TCFullY";var m9a="_pad";var o2T=R9a;o2T+=v6i;var u2T=s5i;u2T+=h6i;u2T+=s8i;var D2T=V9a;D2T+=p9a;D2T+=t9E;D2T+=z6i;return d[D2T]() + l7S + this[u2T](d[o2T]() + j2O) + l7S + this[m9a](d[Z9a]());},_hide:function(){var T9a="lBody";var i9a="down.";var q9a="div.DTE_Body";var Q9a="oll.";var z9a='click.';var t9a="es_scrol";var N9a="bod";var h9a="namespace";var U9a="div.dataTabl";var I2T=N9a;I2T+=a7i;var N2T=I9a;N2T+=Q9a;var m2T=p1ff[50755];m2T+=b7E;var p2T=q9a;p2T+=s5i;p2T+=M4E;var V2T=U9a;V2T+=t9a;V2T+=T9a;var R2T=f4i;R2T+=f3N;R2T+=i9a;var d2T=p1ff[50755];d2T+=C3i;d2T+=C3i;var s2T=p1ff[50755];s2T+=C3i;p1ff.h3f();s2T+=C3i;var g2T=p1ff.N3i;g2T+=p1ff[50755];g2T+=p1ff[261600];var namespace=this[y3i][h9a];this[g2T][j2i][n3E]();$(window)[s2T](s9S + namespace);$(document)[d2T](R2T + namespace);$(V2T)[x7E](B9a + namespace);$(p2T)[m2T](N2T + namespace);$(I2T)[x7E](z9a + namespace);},_hours24To12:function(val){p1ff.S3f();return val === y2O?e2O:val > e2O?val - e2O:val;},_htmlDay:function(day){var L9a="isabled";var r9a='<td class="empty"></td>';var K9a='data-year="';var H9a="day";var F9a="-day\"";var y9a="</button";var c9a="n>";var C9a="\" dat";var P9a="a-d";var A9a="ay=\"";var S9a='-button ';var x9a="elected";var W9a='" data-month="';var a9a="year";var X9a='now';var E9a="<td data-day";var M9a="ctable";var b9a=" type=\"bu";var e9a="clas";var n9a="onth";var j9a="<s";var k9a="on\" ";var P2T=y9a;P2T+=m1i;var C2T=j9a;C2T+=U6N;C2T+=c9a;var c2T=C9a;c2T+=P9a;c2T+=A9a;var j2T=p1ff[261600];j2T+=n9a;var y2T=F9a;y2T+=b9a;y2T+=x2E;y2T+=k9a;var z2T=q1i;z2T+=m1i;var B2T=X1i;B2T+=e9a;B2T+=y3i;B2T+=q2N;var h2T=u0i;h2T+=a7i;var i2T=E9a;i2T+=q2N;var t2T=n3i;t2T+=p1ff[50755];t2T+=H9a;var q2T=p1ff.N3i;q2T+=L9a;var Q2T=w1N;Q2T+=M9a;if(day[O2E]){return r9a;}var classes=[Q2T];var classPrefix=this[p1ff.T3i][K2N];if(day[q2T]){var U2T=d8i;U2T+=J9a;U2T+=D6E;U2T+=U5i;classes[h4i](U2T);}if(day[t2T]){classes[h4i](X9a);}p1ff.S3f();if(day[f9a]){var T2T=y3i;T2T+=x9a;classes[h4i](T2T);}return i2T + day[h2T] + B2T + classes[v7S](z0i) + z2T + w9a + classPrefix + S9a + classPrefix + y2T + K9a + day[a9a] + W9a + day[j2T] + c2T + day[H9a] + P0i + C2T + day[H9a] + H0i + P2T + G9a;},_htmlMonth:function(year,month){var p7a="getUTCDay";var Q7a="setUTCMinutes";var s7a="Month";var H7a='</thead>';var k7a='-iconRight';var O9a="</t";var P7a="_htmlWeekOfYear";var v7a="tbody";var C7a="kN";var E7a="_htmlMonthHead";var I7a="etSecon";var B7a="ates";var n7a=' weekNumber';var u7a="ssPrefix";var c7a="showWee";var F7a='-iconLeft';var A7a="showWeekNumber";var h7a="_compareD";var V7a="UTC";var y7a="disableDays";var d7a="_dateT";var r2O=23;var U7a="tUTCHour";var t7a="htmlDay";var Y9a="le>";var z7a="_compareDates";var R7a="Ut";var T7a="getUTC";var b7a="blo";var q7a="setSecond";var D7a="hea";var m7a="rstDay";var Z7a="y>";var o7a="first";var g7a="sIn";var d3O=j1i;d3O+=S4S;d3O+=K1S;d3O+=Y9a;var s3O=O9a;s3O+=g2E;s3O+=p1ff.N3i;s3O+=Z7a;var g3O=p1ff[427263];g3O+=p1ff[50755];g3O+=n7i;var o3O=j1i;o3O+=v7a;o3O+=m1i;var u3O=l7a;u3O+=D7a;u3O+=p1ff.N3i;u3O+=m1i;var D3O=q1i;D3O+=m1i;var S2T=X2N;S2T+=p1ff[402431];S2T+=p1ff[225154];S2T+=P9i;var w2T=R3S;w2T+=u7a;var F2T=o7a;F2T+=m5i;F2T+=p1ff[402431];F2T+=a7i;var n2T=E9N;n2T+=a7i;n2T+=g7a;n2T+=s7a;var A2T=d7a;A2T+=p1ff[50755];A2T+=R7a;A2T+=p1ff.T3i;var now=this[A2T](new Date()),days=this[n2T](year,month),before=new Date(Date[V7a](year,month,j2O))[p7a](),data=[],row=[];if(this[p1ff.T3i][F2T] > y2O){var b2T=A4i;b2T+=m7a;before-=this[p1ff.T3i][b2T];if(before < y2O){before+=n2O;}}var cells=days + before,after=cells;while(after > n2O){after-=n2O;}cells+=n2O - after;var minDate=this[p1ff.T3i][c3a];var maxDate=this[p1ff.T3i][N7a];if(minDate){var k2T=y3i;k2T+=I7a;k2T+=e3i;minDate[E5a](y2O);minDate[Q7a](y2O);minDate[k2T](y2O);}if(maxDate){var E2T=q7a;E2T+=y3i;var e2T=y3i;e2T+=p1ff.q3i;e2T+=U7a;e2T+=y3i;maxDate[e2T](r2O);maxDate[Q7a](O2O);maxDate[E2T](O2O);}for(var i=y2O,r=y2O;i < cells;i++){var J2T=s5i;J2T+=t7a;var r2T=T0S;r2T+=d3S;var M2T=T7a;M2T+=i7a;M2T+=a7i;var L2T=t6i;L2T+=k8N;var H2T=h7a;H2T+=B7a;var day=new Date(Date[V7a](year,month,j2O + (i - before))),selected=this[y3i][p1ff.N3i]?this[H2T](day,this[y3i][p1ff.N3i]):L4i,today=this[z7a](day,now),empty=i < before || i >= days + before,disabled=minDate && day < minDate || maxDate && day > maxDate;var disableDays=this[p1ff.T3i][y7a];if(Array[L2T](disableDays) && $[W3E](day[M2T](),disableDays) !== -j2O){disabled=r4i;}else if(typeof disableDays === r2T && disableDays(day) === r4i){disabled=r4i;}var dayConfig={day:j2O + (i - before),month:month,year:year,selected:selected,today:today,disabled:disabled,empty:empty};row[h4i](this[J2T](dayConfig));if(++r === n2O){var x2T=p1i;x2T+=n3i;x2T+=j7a;var f2T=j1i;f2T+=n3i;f2T+=j7a;var X2T=c7a;X2T+=C7a;X2T+=E3N;if(this[p1ff.T3i][X2T]){row[q2i](this[P7a](i - before,month,year));}data[h4i](f2T + row[v7S](o4i) + x2T);row=[];r=y2O;}}var classPrefix=this[p1ff.T3i][w2T];var className=classPrefix + S2T;if(this[p1ff.T3i][A7a]){className+=n7a;}if(minDate){var W2T=i2i;W2T+=h6i;W2T+=K9i;W2T+=e6i;var a2T=p1ff.T3i;a2T+=y3i;a2T+=y3i;var K2T=n3i;K2T+=n7S;K2T+=p1ff.q3i;var underMin=minDate >= new Date(Date[V7a](year,month,j2O,y2O,y2O,y2O));this[O0i][K2T][y5S](g9S + classPrefix + F7a)[a2T](W2T,underMin?J5E:l5E);}if(maxDate){var l3O=b7a;l3O+=U6E;var v3O=c3i;v3O+=p1ff[50755];v3O+=c3i;v3O+=p1ff.q3i;var Z3O=p1ff.T3i;Z3O+=y3i;Z3O+=y3i;var O2T=A4i;O2T+=u1i;var Y2T=n3i;Y2T+=t6i;Y2T+=V0N;Y2T+=p1ff.q3i;var G2T=c3E;G2T+=x5a;var overMax=maxDate < new Date(Date[G2T](year,month + j2O,j2O,y2O,y2O,y2O));this[O0i][Y2T][O2T](g9S + classPrefix + k7a)[Z3O](n2i,overMax?v3O:l3O);}return e7a + className + D3O + u3O + this[E7a]() + H7a + o3O + data[g3O](o4i) + s3O + d3O;},_htmlMonthHead:function(){var J7a="firstDay";var w7a='<th>';var L7a="sho";var r7a="ekNum";var M7a="wWe";var x7a='<th></th>';var S7a='</th>';var p3O=L7a;p3O+=M7a;p3O+=r7a;p3O+=A6i;var R3O=t6i;R3O+=b7S;R3O+=c3i;var a=[];var firstDay=this[p1ff.T3i][J7a];var i18n=this[p1ff.T3i][R3O];var dayName=function(day){var X7a="eekd";var f7a="ys";var V3O=V8i;V3O+=X7a;V3O+=p1ff[402431];p1ff.h3f();V3O+=f7a;day+=firstDay;while(day >= n2O){day-=n2O;}return i18n[V3O][day];};p1ff.h3f();if(this[p1ff.T3i][p3O]){a[h4i](x7a);}for(var i=y2O;i < n2O;i++){a[h4i](w7a + dayName(i) + S7a);}return a[v7S](o4i);},_htmlWeekOfYear:function(d,m,y){var K7a="Prefix";var O7a='-week">';var p3i=86400000;var a7a="tD";var Y7a='<td class="';var G7a="getDay";var W7a="setDate";var I3O=m3S;I3O+=K7a;var N3O=K3i;N3O+=P3i;var m3O=I6S;m3O+=a7a;m3O+=s0S;m3O+=p1ff.q3i;var date=new Date(y,m,d,y2O,y2O,y2O,y2O);date[W7a](date[m3O]() + P2O - (date[G7a]() || n2O));var oneJan=new Date(y,y2O,j2O);var weekNum=Math[N3O](((date - oneJan) / p3i + j2O) / n2O);return Y7a + this[p1ff.T3i][I3O] + O7a + weekNum + G9a;},_options:function(selector,values,labels){var v8a="classPrefi";var l8a="t.";var u8a="n value=\"";var Z8a="pty";var D8a="<optio";var o8a='</option>';var T3O=K9i;T3O+=V4S;T3O+=v6i;var t3O=P6i;t3O+=Z8a;var U3O=v8a;U3O+=q6i;var q3O=v0N;q3O+=P3N;q3O+=l8a;var Q3O=S2S;Q3O+=p1ff.N3i;if(!labels){labels=values;}var select=this[O0i][j2i][Q3O](q3O + this[p1ff.T3i][U3O] + l7S + selector);select[t3O]();for(var i=y2O,ien=values[T3O];i < ien;i++){var B3O=q1i;B3O+=m1i;var h3O=D8a;h3O+=u8a;var i3O=x4E;i3O+=h6i;i3O+=p1ff.q3i;i3O+=u1i;select[i3O](h3O + values[i] + B3O + labels[i] + o8a);}},_optionSet:function(selector,val){var g8a="tm";var V8a="unknown";var d8a='span';var R8a='option:selected';var s8a='select.';var C3O=n3i;C3O+=p1ff.q3i;C3O+=s6i;var c3O=v6i;c3O+=g8a;c3O+=K9i;var j3O=S2S;j3O+=p1ff.N3i;var y3O=n8i;y3O+=H9E;var z3O=A4i;z3O+=u1i;var select=this[O0i][j2i][z3O](s8a + this[p1ff.T3i][K2N] + l7S + selector);var span=select[Y5E]()[s9E](d8a);select[y3O](val);var selected=select[j3O](R8a);span[c3O](selected[H4i] !== y2O?selected[C3O]():this[p1ff.T3i][R0i][V8a]);},_optionsTime:function(unit,count,val,allowed,range){var N8a="dy>";var I8a="<tb";var H8a='</tr>';var r8a="pace\"><tbody>";var A2O=6;var E8a='<tr>';var U8a="h colspan=\"";var T8a="lassP";var e8a="mP";var k8a="Pm";var p8a="e>";var i8a="refi";var L8a="</tr";var Q8a="<thea";var X8a='</th></tr></thead>';var m8a="tbo";var J8a='</tbody></thead><table class="';var M8a="-nos";var q8a="d><tr><t";var t8a="i18";var s5O=p1i;s5O+=K1S;s5O+=K9i;s5O+=p8a;var g5O=p1i;g5O+=m8a;g5O+=N8a;var o5O=I8a;o5O+=p1ff[50755];o5O+=N8a;var u5O=q1i;u5O+=m1i;var D5O=Q8a;D5O+=q8a;D5O+=U8a;var e3O=t8a;e3O+=c3i;var k3O=h5i;k3O+=S1S;k3O+=p1ff.q3i;var b3O=j9i;b3O+=p1ff[402431];b3O+=p1ff.N3i;var F3O=d8i;F3O+=n8i;F3O+=w0E;var n3O=C3i;n3O+=t6i;n3O+=c3i;n3O+=p1ff.N3i;var A3O=o1i;A3O+=p1ff[261600];var P3O=p1ff.T3i;P3O+=T8a;P3O+=i8a;P3O+=q6i;var classPrefix=this[p1ff.T3i][P3O];var container=this[A3O][j2i][n3O](F3O + classPrefix + l7S + unit);var i,j;var render=count === e2O?function(i){p1ff.h3f();return i;}:this[b3O];var classPrefix=this[p1ff.T3i][K2N];var className=classPrefix + k3O;var i18n=this[p1ff.T3i][e3O];if(!container[H4i]){return;}var a=o4i;var span=b2O;var button=function(value,label,className){var B8a="on>";var n8a=" dis";var C8a="<td class=\"selecta";var F8a='" data-value="';var P8a="ble ";var j8a="-bu";var A8a="numbe";var h8a="</butt";var y8a="utton\" data-unit=\"";var c8a="ton ";var z8a="-day\" type=\"b";var w3O=p1i;w3O+=n3i;w3O+=p1ff.N3i;w3O+=m1i;var x3O=h8a;x3O+=B8a;var f3O=p1i;f3O+=y3i;f3O+=h6i;f3O+=F2N;var X3O=q1i;X3O+=m1i;var J3O=z8a;J3O+=y8a;p1ff.h3f();var r3O=j8a;r3O+=n3i;r3O+=c8a;var M3O=C8a;M3O+=P8a;var H3O=h6i;H3O+=p1ff[261600];var E3O=A8a;E3O+=z6i;if(count === e2O && typeof value === E3O){if(val >= e2O){value+=e2O;}if(value == e2O){value=y2O;}else if(value == J2O){value=e2O;}}var selected=val === value || value === R8N && val < e2O || value === H3O && val >= e2O?F0N:o4i;if(allowed && $[W3E](value,allowed) === -j2O){var L3O=n8a;L3O+=h2i;selected+=L3O;}if(className){selected+=z0i + className;}return M3O + selected + P0i + w9a + classPrefix + r3O + classPrefix + J3O + unit + F8a + value + X3O + b8a + label + f3O + x3O + w3O;};if(count === e2O){var a3O=p1ff[402431];a3O+=p1ff[261600];a3O+=k8a;var K3O=h6i;K3O+=p1ff[261600];var S3O=p1ff[402431];S3O+=e8a;S3O+=p1ff[261600];a+=E8a;for(i=j2O;i <= A2O;i++){a+=button(i,render(i));}a+=button(R8N,i18n[S3O][y2O]);a+=H8a;a+=E8a;for(i=n2O;i <= e2O;i++){a+=button(i,render(i));}a+=button(K3O,i18n[a3O][j2O]);a+=H8a;span=n2O;}else if(count === J2O){var c=y2O;for(j=y2O;j < P2O;j++){var G3O=j1i;G3O+=S4S;G3O+=n3i;G3O+=j7a;var W3O=j1i;W3O+=R5E;W3O+=m1i;a+=W3O;for(i=y2O;i < A2O;i++){a+=button(c,render(c));c++;}a+=G3O;}span=A2O;}else {var l5O=L8a;l5O+=m1i;var v5O=l7a;v5O+=j7a;var Z5O=C3i;Z5O+=u7E;Z5O+=p1ff[50755];Z5O+=z6i;var O3O=M8a;O3O+=r8a;var Y3O=j1i;Y3O+=S4S;Y3O+=n3i;Y3O+=j7a;a+=E8a;for(j=y2O;j < Z3i;j+=b2O){a+=button(j,render(j),n6a);}a+=Y3O;a+=J8a + className + z0i + className + O3O;var start=range !== S0i?range:Math[Z5O](val / b2O) * b2O;a+=v5O;for(j=start + j2O;j < start + b2O;j++){a+=button(j,render(j));}a+=l5O;span=A2O;}container[O2E]()[F3E](e7a + className + P0i + D5O + span + u5O + i18n[unit] + X8a + o5O + a + g5O + s5O);},_optionsTitle:function(){var v4a="_range";var Z4a="_options";var f8a="_ra";var Y8a="yearRange";var W8a="inDate";var K8a="tFul";var O8a="months";var w8a="yea";var S8a="rRange";var G8a="getFullYear";p1ff.h3f();var a8a="lYea";var I5O=a7i;I5O+=t9E;I5O+=z6i;var N5O=f8a;N5O+=H3E;N5O+=p1ff.q3i;var m5O=p1ff[261600];m5O+=p1ff[50755];m5O+=c3i;m5O+=k4i;var p5O=x8a;p5O+=c3i;p5O+=y3i;var V5O=w8a;V5O+=S8a;var R5O=I6S;R5O+=K8a;R5O+=a8a;R5O+=z6i;var d5O=p1ff[261600];d5O+=W8a;var i18n=this[p1ff.T3i][R0i];var min=this[p1ff.T3i][d5O];var max=this[p1ff.T3i][N7a];var minYear=min?min[G8a]():S0i;var maxYear=max?max[G8a]():S0i;var i=minYear !== S0i?minYear:new Date()[R5O]() - this[p1ff.T3i][Y8a];var j=maxYear !== S0i?maxYear:new Date()[G8a]() + this[p1ff.T3i][V5O];this[p5O](m5O,this[N5O](y2O,k2O),i18n[O8a]);this[Z4a](I5O,this[v4a](i,j));},_pad:function(i){var l4a='0';return i < b2O?l4a + i:i;},_position:function(){var D4a="out";var s4a="wid";var u4a="Widt";var o4a="outerHei";var m4a="nta";var N4a='horizontal';var d4a="erHeig";var p4a="horiz";var g4a="eft";var e5O=V8i;e5O+=I0i;e5O+=k4i;var F5O=n3i;F5O+=p1ff[50755];F5O+=h6i;var n5O=D4a;n5O+=r2i;n5O+=u4a;n5O+=v6i;var A5O=o4a;A5O+=d4E;var P5O=p1ff[225154];P5O+=p1ff[50755];P5O+=p1ff.N3i;P5O+=a7i;var C5O=m2i;C5O+=s2E;C5O+=r8E;C5O+=p1ff[50755];var c5O=K9i;c5O+=g4a;var j5O=p1ff.T3i;j5O+=y3i;j5O+=y3i;var z5O=s4a;z5O+=n3i;z5O+=v6i;var B5O=n3i;B5O+=X5a;var h5O=D4a;h5O+=d4a;h5O+=v6i;h5O+=n3i;var i5O=p1ff.N3i;i5O+=y2i;var T5O=p1ff.T3i;T5O+=p1ff[50755];T5O+=c3i;T5O+=b8E;var t5O=o1i;t5O+=p1ff[261600];var U5O=p1ff[50755];U5O+=C3i;U5O+=C3i;U5O+=k5E;var q5O=R4a;q5O+=m0N;var Q5O=p1ff.N3i;Q5O+=p1ff[50755];Q5O+=p1ff[261600];var offset=this[Q5O][q5O][U5O]();var container=this[t5O][T5O];var inputHeight=this[i5O][V3E][h5O]();if(this[y3i][V4a][K3a] && this[y3i][V4a][B5O] && $(window)[z5O]() > g3i){var y5O=p4a;y5O+=p1ff[50755];y5O+=m4a;y5O+=K9i;container[W9E](y5O);}else {container[H2i](N4a);}container[j5O]({top:offset[U4E] + inputHeight,left:offset[c5O]})[C5O](P5O);var calHeight=container[A5O]();var calWidth=container[n5O]();var scrollTop=$(window)[U7E]();p1ff.S3f();if(offset[F5O] + inputHeight + calHeight - scrollTop > $(window)[c7E]()){var k5O=p1ff.T3i;k5O+=B2i;var b5O=n3i;b5O+=p1ff[50755];b5O+=h6i;var newTop=offset[b5O] - calHeight;container[k5O](w2E,newTop < y2O?y2O:newTop);}if(calWidth + offset[r2E] > $(window)[e5O]()){var E5O=P9i;E5O+=C3i;E5O+=n3i;var newLeft=$(window)[I4E]() - calWidth;container[A2i](E5O,newLeft < y2O?y2O:newLeft);}},_range:function(start,end,inc){var a=[];if(!inc){inc=j2O;}for(var i=start;i <= end;i+=inc){a[h4i](i);}return a;},_setCalander:function(){var Q4a="_htmlMonth";var I4a="calendar";if(this[y3i][z3E]){var M5O=x4E;M5O+=z9i;M5O+=c3i;M5O+=p1ff.N3i;var L5O=P6i;L5O+=h6i;L5O+=n3i;L5O+=a7i;var H5O=p1ff.N3i;H5O+=y2i;this[H5O][I4a][L5O]()[M5O](this[Q4a](this[y3i][z3E][O6a](),this[y3i][z3E][R6a]()));}},_setTitle:function(){var U4a="_optionSet";var q4a="getUTCFull";var x5O=q4a;x5O+=P5a;var f5O=d8i;f5O+=Z5E;f5O+=l1i;p1ff.h3f();f5O+=a7i;var X5O=a7i;X5O+=p1ff.q3i;X5O+=p1ff[402431];X5O+=z6i;var J5O=R9a;J5O+=v6i;var r5O=d8i;r5O+=Z5E;r5O+=l1i;r5O+=a7i;this[U4a](x6a,this[y3i][r5O][J5O]());this[U4a](X5O,this[y3i][f5O][x5O]());},_setTime:function(){var c4a="utes";var y4a="tes";var h4a="nsTime";var E4a="hoursAvailable";var e4a="hours12";var C4a="_op";var B4a="minutesRa";var i4a="Secon";var j4a="UTCMin";var T4a="sRang";var n4a="TCHou";var t4a="second";var P4a="tionsT";var u6O=t4a;u6O+=T4a;u6O+=p1ff.q3i;var D6O=b5E;D6O+=i4a;D6O+=e3i;var l6O=x8a;l6O+=h4a;var v6O=B4a;v6O+=z6a;var Z6O=z4a;Z6O+=j6i;Z6O+=y4a;var O5O=b5E;O5O+=j4a;O5O+=c4a;var Y5O=C4a;Y5O+=P4a;Y5O+=t6i;Y5O+=S1i;var G5O=v6i;G5O+=p1ff[50755];G5O+=r3N;G5O+=y3i;var W5O=s5i;W5O+=a5N;W5O+=A4a;W5O+=p1ff.q3i;var w5O=V9a;w5O+=n4a;w5O+=z6i;w5O+=y3i;var that=this;var d=this[y3i][p1ff.N3i];var hours=d?d[w5O]():y2O;var allowed=function(prop){var k4a='Available';var b4a="ilable";var F4a="Increm";var a5O=F4a;p1ff.S3f();a5O+=p8E;var K5O=U9E;K5O+=p1ff[402431];K5O+=c3i;K5O+=I6S;var S5O=O6i;S5O+=t7i;S5O+=b4a;return that[p1ff.T3i][prop + S5O]?that[p1ff.T3i][prop + k4a]:that[K5O](y2O,O2O,that[p1ff.T3i][prop + a5O]);};this[W5O](G5O,this[y3i][V4a][e4a]?e2O:J2O,hours,this[p1ff.T3i][E4a]);this[Y5O](B6a,Z3i,d?d[O5O]():y2O,allowed(Z6O),this[y3i][v6O]);this[l6O](A6a,Z3i,d?d[D6O]():y2O,allowed(A6a),this[y3i][u6O]);},_show:function(){var H4a="_po";var x4a='div.dataTables_scrollBody';var J4a=" resiz";var L4a="sition";var X4a="e.";var r4a="scro";var w4a='keydown.';var M4a="namespac";var f4a="_hi";var s6O=V8i;s6O+=t6i;s6O+=p1ff.N3i;s6O+=k4i;var g6O=H4a;g6O+=L4a;p1ff.h3f();var o6O=M4a;o6O+=p1ff.q3i;var that=this;var namespace=this[y3i][o6O];this[g6O]();if($(window)[s6O]() > d3i){var N6O=r4a;N6O+=K9i;N6O+=K9i;N6O+=w0E;var p6O=p1ff[50755];p6O+=c3i;var R6O=J4a;R6O+=X4a;var d6O=I9a;d6O+=p1ff[50755];d6O+=T9N;d6O+=w0E;$(window)[I5i](d6O + namespace + R6O + namespace,function(){var V6O=H4a;V6O+=p6i;V6O+=t2i;that[V6O]();});$(P7E)[p6O](B9a + namespace,function(){var m6O=f4a;p1ff.h3f();m6O+=P7i;that[m6O]();});$(x4a)[I5i](N6O + namespace,function(){var I6O=f4a;I6O+=p1ff.N3i;I6O+=p1ff.q3i;that[I6O]();});}$(document)[I5i](w4a + namespace,function(e){var F2O=9;var K4a="yCo";var a4a="eyCo";var U6O=f4i;U6O+=f3N;U6O+=F4S;U6O+=P7i;var q6O=S4a;q6O+=K4a;q6O+=p1ff.N3i;q6O+=p1ff.q3i;var Q6O=f4i;Q6O+=a4a;Q6O+=p1ff.N3i;Q6O+=p1ff.q3i;if(e[Q6O] === F2O || e[q6O] === f2O || e[U6O] === E2O){var t6O=s5i;t6O+=k7i;t6O+=p1ff.q3i;that[t6O]();}});setTimeout(function(){var W4a="ick.";p1ff.S3f();var T6O=p8i;T6O+=W4a;$(P2i)[I5i](T6O + namespace,function(e){var G4a="ilt";var B6O=o1i;B6O+=p1ff[261600];var h6O=P9i;h6O+=c3i;h6O+=L1i;h6O+=k4i;var i6O=C3i;i6O+=G4a;i6O+=p1ff.q3i;i6O+=z6i;var parents=$(e[N7E])[C2i]();if(!parents[i6O](that[O0i][j2i])[h6O] && e[N7E] !== that[B6O][V3E][y2O]){var z6O=s5i;z6O+=v6i;z6O+=I0i;z6O+=p1ff.q3i;that[z6O]();}});},b2O);},_writeOutput:function(focus){var g1a="ict";var Z1a="TCF";var o1a="Str";var s1a="momentLocale";var D1a="mat";var v1a="ullY";var Y4a="tUTCDat";var l1a="ear";var d1a="trigger";var O4a="getUTCM";var u1a="orm";var b6O=I6S;b6O+=Y4a;b6O+=p1ff.q3i;var F6O=s5i;F6O+=h6i;F6O+=p1ff[402431];F6O+=p1ff.N3i;var n6O=O4a;n6O+=p1ff[50755];n6O+=O7i;n6O+=v6i;var A6O=j9i;A6O+=s8i;var P6O=V9a;P6O+=Z1a;P6O+=v1a;P6O+=l1a;var C6O=C3i;C6O+=h1i;C6O+=D1a;var c6O=C3i;c6O+=u1a;c6O+=p1ff[402431];c6O+=n3i;var j6O=a2N;j6O+=o1a;j6O+=g1a;var y6O=j6i;y6O+=n3i;y6O+=p1ff.T3i;var date=this[y3i][p1ff.N3i];var out=window[a2N]?window[a2N][y6O](date,undefined,this[p1ff.T3i][s1a],this[p1ff.T3i][j6O])[c6O](this[p1ff.T3i][C6O]):date[P6O]() + l7S + this[A6O](date[n6O]() + j2O) + l7S + this[F6O](date[b6O]());this[O0i][V3E][V2i](out)[d1a](u5S,{write:date});if(focus){var k6O=p1ff.N3i;k6O+=p1ff[50755];k6O+=p1ff[261600];this[k6O][V3E][y2E]();}}});Editor[e6O][E6O]=y2O;Editor[H6O][L6O]={classPrefix:R1a,disableDays:S0i,firstDay:j2O,format:V1a,hoursAvailable:S0i,i18n:Editor[M6O][r6O][p1a],maxDate:S0i,minDate:S0i,minutesAvailable:S0i,minutesIncrement:j2O,momentStrict:r4i,momentLocale:m1a,onChange:function(){},secondsAvailable:S0i,secondsIncrement:j2O,showWeekNumber:L4i,yearRange:X2O};(function(){var H0a='<input/>';var f0a="eId";var z5x='div.rendered';var e0a="_val";var I1a="passwo";var q3x="_preChecked";var T2a="separator";var F3x="datepicker";var L2a="che";var j3x="prop";var y3x="bled";var o0a="_enabled";var C0a="dC";var Z3x="checked";var p2a='change.dte';var P2a="checkbox";var l2a="_editor_val";var z0a="_ena";var N1a="dio";var g2a="_ad";var k0a="_inp";var e5x="uploadMany";var B1a="_input";var i5x="_v";var Q1a="rd";var V2a="multiple";var e2a='<label for="';var X0a="textarea";var V5x="wireFormat";var I2a="_lastSet";var Z5x="_picker";var b2a='_';var G3x="_cl";var q1a="reado";var G2a="npu";var a0a="_i";var n3x="<input ";var d5x="mome";var z1a="nput";var h5x="_va";var U1a="nly";var b0a="_inpu";var B2a="optio";var A3x="safeI";var r0a="/>";var x1O=p1ff.q3i;x1O+=q6i;x1O+=Y1N;x1O+=p1ff.N3i;var V1O=a6E;V1O+=p1ff.q3i;V1O+=u1i;var r8O=d0i;r8O+=u1i;var M8O=z6i;M8O+=p1ff[402431];M8O+=N1a;var y7O=P2S;y7O+=p1ff.N3i;var z7O=v0N;z7O+=p1ff.q3i;z7O+=U0E;var t7O=d0i;t7O+=u1i;var I7O=a6E;I7O+=d6i;I7O+=p1ff.N3i;var N7O=I1a;N7O+=Q1a;var V7O=n3i;V7O+=p1ff.q3i;V7O+=q6i;V7O+=n3i;var s7O=q1a;s7O+=U1a;var g7O=k7i;g7O+=p1ff.N3i;g7O+=p1ff.q3i;g7O+=c3i;var Y9O=r1E;Y9O+=U4N;var G9O=O5i;G9O+=p1ff.N3i;G9O+=k3i;G9O+=y3i;var W9O=d0i;W9O+=u1i;var J6O=g0i;J6O+=z9i;J6O+=y3i;var fieldTypes=Editor[J6O];function _buttonText(conf,text){var i1a="uploadText";var t1a="div.uplo";var T1a="ad ";var h1a="Choose file...";var f6O=s6E;f6O+=Z6N;var X6O=t1a;X6O+=T1a;X6O+=I8i;X6O+=Q8i;if(text === S0i || text === undefined){text=conf[i1a] || h1a;}p1ff.S3f();conf[B1a][y5S](X6O)[f6O](text);}function _commonUpload(editor,conf,dropCallback,multiple){var Q0a="rop";var L1a="=\"cell ";var O1a="buttonInternal";var S1a="ultipl";var B0a='over';var g0a="[type=file]";var e1a="<div class=\"d";var k1a="ll\">";var Y1a="<div class=\"row\"";var x1a="e\">";var w1a="/inpu";var u0a='<div class="row second">';var f1a=" clearValu";var E1a="rop\"><span></span></div>";var W1a="<div class=\"ce";var P1a="Reader";var j0a="div.re";var R0a="ov";var N0a=".drop";var H1a="<div class";var p0a="eave ";var D0a='"></button>';var l0a='<input type="file" ';var X1a="<div class=\"cell";var t0a='drop';var J1a="<button cla";var V0a="dragl";var b1a="ass=\"ce";var P0a='noDrop';var j1a="rValue ";var y1a="v.clea";var r1a="tHide\">";var G1a="ll upload limitHide";var c0a="dered";var I0a="dragD";var F1a="iv cl";var M1a="limi";var K1a="utton>";var U0a="Drag and drop a file here to upload";var v0a='<div class="eu_table">';var y0a='dragover.DTE_Upload drop.DTE_Upload';var a1a="<but";var s0a='input[type=file]';var m0a="dragexit";var A1a="<div class=\"rendered";var Z0a='<div class="editor_upload">';var n1a="\"></div>";var d0a="drag";var c1a="gDrop";var q0a='div.drop span';var C1a="File";var f9O=t6i;f9O+=z1a;var X9O=p1ff[50755];X9O+=c3i;var J9O=C3i;J9O+=C6S;var H9O=p1ff[50755];H9O+=c3i;var E9O=d8i;E9O+=y1a;E9O+=j1a;E9O+=U3S;var e9O=C3i;e9O+=t6i;e9O+=c3i;e9O+=p1ff.N3i;var q9O=Q8N;q9O+=c1a;var Q9O=C1a;Q9O+=P1a;var N9O=p1ff[402431];N9O+=n3i;N9O+=R5E;var R9O=s5i;R9O+=R4a;R9O+=j6i;R9O+=n3i;var d9O=j1i;d9O+=L6E;var s9O=A1a;s9O+=n1a;var g9O=F1i;g9O+=F1a;g9O+=b1a;g9O+=k1a;var o9O=j1i;o9O+=S4S;o9O+=p1ff.N3i;o9O+=L4S;var u9O=e1a;u9O+=E1a;var D9O=H1a;D9O+=L1a;D9O+=M1a;D9O+=r1a;var l9O=j1i;l9O+=L6E;var v9O=p1i;v9O+=d8i;v9O+=n8i;v9O+=m1i;var Z9O=J1a;Z9O+=V1i;var O6O=X1a;O6O+=f1a;O6O+=x1a;var Y6O=j1i;Y6O+=S4S;Y6O+=r4E;Y6O+=m1i;var G6O=U1i;G6O+=w1a;G6O+=n3i;G6O+=m1i;var W6O=p1ff[261600];W6O+=S1a;W6O+=p1ff.q3i;var a6O=k0E;a6O+=p1ff[225154];a6O+=K1a;var K6O=a1a;K6O+=E1S;K6O+=r0E;var S6O=W1a;S6O+=G1a;S6O+=H4S;var w6O=Y1a;w6O+=m1i;var x6O=C3i;x6O+=p1ff[50755];x6O+=z6i;x6O+=p1ff[261600];var btnClass=editor[X2i][x6O][O1a];var container=$(Z0a + v0a + w6O + S6O + K6O + btnClass + a6O + l0a + (multiple?W6O:o4i) + G6O + Y6O + O6O + Z9O + btnClass + D0a + v9O + l9O + u0a + D9O + u9O + o9O + g9O + s9O + n0i + d9O + n0i + n0i);conf[R9O]=container;conf[o0a]=r4i;if(conf[I0i]){var m9O=t6i;m9O+=p1ff.N3i;var p9O=V3E;p9O+=g0a;var V9O=C3i;V9O+=t6i;V9O+=c3i;V9O+=p1ff.N3i;container[V9O](p9O)[u8S](m9O,Editor[o8S](conf[I0i]));}if(conf[N9O]){var I9O=s0S;I9O+=n3i;I9O+=z6i;container[y5S](s0a)[u8S](conf[I9O]);}_buttonText(conf);if(window[Q9O] && conf[q9O] !== L4i){var n9O=P9E;n9O+=y3i;n9O+=p1ff.q3i;var A9O=p1ff[50755];A9O+=c3i;var j9O=d0a;j9O+=R0a;j9O+=r2i;var z9O=V0a;z9O+=p0a;z9O+=m0a;var T9O=p1ff.N3i;T9O+=y1i;T9O+=N0a;var t9O=I0a;t9O+=Q0a;t9O+=G8S;t9O+=n3i;var U9O=C3i;U9O+=t6i;U9O+=c3i;U9O+=p1ff.N3i;container[U9O](q0a)[c6E](conf[t9O] || U0a);var dragDrop=container[y5S](T9O);dragDrop[I5i](t0a,function(e){var i0a="taTransf";var T0a="_enabl";var h0a="iginalEve";var i9O=T0a;i9O+=U5i;if(conf[i9O]){var B9O=p1ff.N3i;B9O+=p1ff[402431];B9O+=i0a;B9O+=r2i;var h9O=h1i;h9O+=h0a;h9O+=O7i;Editor[n8S](editor,conf,e[h9O][B9O][B4i],_buttonText,dropCallback);dragDrop[H2i](B0a);}return L4i;})[I5i](z9O,function(e){var y9O=z0a;y9O+=D6E;y9O+=U5i;if(conf[y9O]){dragDrop[H2i](B0a);}return L4i;})[I5i](j9O,function(e){if(conf[o0a]){var C9O=R0a;C9O+=r2i;var c9O=e1E;c9O+=h8N;c9O+=p1ff[402431];c9O+=B2i;dragDrop[c9O](C9O);}p1ff.h3f();return L4i;});editor[I5i](S5S,function(){p1ff.h3f();var P9O=g2E;P9O+=p1ff.N3i;P9O+=a7i;$(P9O)[I5i](y0a,function(e){p1ff.S3f();return L4i;});})[A9O](n9O,function(){$(P2i)[x7E](y0a);});}else {var k9O=j0a;k9O+=c3i;k9O+=c0a;var b9O=C3i;b9O+=t6i;b9O+=c3i;b9O+=p1ff.N3i;var F9O=s8i;F9O+=C0a;F9O+=l1i;F9O+=B2i;container[F9O](P0a);container[F3E](container[b9O](k9O));}container[e9O](E9O)[H9O](K5a,function(e){var n0a="eventDefa";var A0a="_en";var M9O=A0a;M9O+=h2i;var L9O=h9i;p1ff.S3f();L9O+=n0a;L9O+=J3S;e[L9O]();if(conf[M9O]){var r9O=H8S;r9O+=O8S;r9O+=p1ff.N3i;Editor[V0i][r9O][k5E][Q2i](editor,conf,o4i);}});container[J9O](s0a)[X9O](f9O,function(){var w9O=C3i;w9O+=P3i;p1ff.S3f();w9O+=p1ff.q3i;w9O+=y3i;var x9O=X8S;x9O+=s8i;Editor[x9O](editor,conf,this[w9O],_buttonText,function(ids){var F0a="all";var K9O=t7i;K9O+=V0E;K9O+=p1ff.q3i;var S9O=p1ff.T3i;S9O+=F0a;dropCallback[S9O](editor,ids);p1ff.S3f();container[y5S](s0a)[y2O][K9O]=S0i;});});return container;}function _triggerChange(input){setTimeout(function(){var a9O=R5E;p1ff.S3f();a9O+=z4S;input[a9O](u5S,{editor:r4i,editorSet:r4i});;},y2O);}var baseFieldType=$[W9O](r4i,{},Editor[G9O][Y9O],{get:function(conf){var O9O=b0a;O9O+=n3i;p1ff.S3f();return conf[O9O][V2i]();},set:function(conf,val){var v7O=s5i;v7O+=E1i;v7O+=n3i;var Z7O=n8i;Z7O+=p1ff[402431];Z7O+=K9i;conf[B1a][Z7O](val);_triggerChange(conf[v7O]);},enable:function(conf){var l7O=T9i;l7O+=h6i;p1ff.S3f();conf[B1a][l7O](s6a,L4i);},disable:function(conf){var o7O=i2i;o7O+=p1ff[402431];o7O+=p1ff[225154];p1ff.S3f();o7O+=R4N;var u7O=T9i;u7O+=h6i;var D7O=k0a;D7O+=j6i;D7O+=n3i;conf[D7O][u7O](o7O,r4i);},canReturnSubmit:function(conf,node){p1ff.h3f();return r4i;}});fieldTypes[g7O]={create:function(conf){conf[e0a]=conf[Y4N];return S0i;},get:function(conf){p1ff.S3f();return conf[e0a];},set:function(conf,val){p1ff.h3f();conf[e0a]=val;}};fieldTypes[s7O]=$[o8E](r4i,{},baseFieldType,{create:function(conf){var L0a='readonly';var E0a="tex";p1ff.h3f();var R7O=E0a;R7O+=n3i;var d7O=t6i;d7O+=p1ff.N3i;conf[B1a]=$(H0a)[u8S]($[o8E]({id:Editor[o8S](conf[d7O]),type:R7O,readonly:L0a},conf[u8S] || ({})));return conf[B1a][y2O];}});fieldTypes[V7O]=$[o8E](r4i,{},baseFieldType,{create:function(conf){var m7O=i6i;m7O+=q6i;m7O+=n3i;var p7O=p1ff[402431];p7O+=x2E;p7O+=z6i;conf[B1a]=$(H0a)[p7O]($[o8E]({id:Editor[o8S](conf[I0i]),type:m7O},conf[u8S] || ({})));return conf[B1a][y2O];}});fieldTypes[N7O]=$[I7O](r4i,{},baseFieldType,{create:function(conf){var J0a='password';var M0a="<i";var U7O=t6i;U7O+=p1ff.N3i;var q7O=p1ff[402431];q7O+=g3S;var Q7O=M0a;Q7O+=c3i;Q7O+=J5a;Q7O+=r0a;conf[B1a]=$(Q7O)[q7O]($[o8E]({id:Editor[o8S](conf[U7O]),type:J0a},conf[u8S] || ({})));return conf[B1a][y2O];}});fieldTypes[X0a]=$[t7O](r4i,{},baseFieldType,{create:function(conf){var S0a="</textare";var K0a="a>";var x0a="<text";var w0a="area>";var B7O=p1ff[402431];B7O+=x2E;B7O+=z6i;var h7O=J9a;h7O+=C3i;h7O+=f0a;var i7O=a6E;i7O+=s2E;var T7O=x0a;T7O+=w0a;T7O+=S0a;T7O+=K0a;conf[B1a]=$(T7O)[u8S]($[i7O]({id:Editor[h7O](conf[I0i])},conf[B7O] || ({})));return conf[B1a][y2O];},canReturnSubmit:function(conf,node){p1ff.S3f();return L4i;}});fieldTypes[z7O]=$[y7O](r4i,{},baseFieldType,{_addOptions:function(conf,opts,append){var O0a="placeholderValue";var W0a="placeholder";var Y0a="erValue";var D2a="nsPair";var Z2a="placeholderDisabled";var G0a="cehold";var v2a="hidden";var c7O=j7i;c7O+=N6i;var j7O=a0a;j7O+=z1a;var elOpts=conf[j7O][y2O][c7O];var countOffset=y2O;if(!append){elOpts[H4i]=y2O;if(conf[W0a] !== undefined){var C7O=h6i;C7O+=l1i;C7O+=G0a;C7O+=Y0a;var placeholderValue=conf[O0a] !== undefined?conf[C7O]:o4i;countOffset+=j2O;elOpts[y2O]=new Option(conf[W0a],placeholderValue);var disabled=conf[Z2a] !== undefined?conf[Z2a]:r4i;elOpts[y2O][v2a]=disabled;elOpts[y2O][d2i]=disabled;elOpts[y2O][l2a]=placeholderValue;}}else {countOffset=elOpts[H4i];}if(opts){var P7O=p1ff[50755];P7O+=o6i;P7O+=D2a;Editor[Z8S](opts,conf[P7O],function(val,label,i,attr){var A7O=P7S;A7O+=e0a;var option=new Option(label,val);option[A7O]=val;if(attr){$(option)[u8S](attr);}p1ff.S3f();elOpts[i + countOffset]=option;});}},create:function(conf){var R2a='<select></select>';var u2a="pO";var d2a="lec";var o2a="pt";var s2a="dOpt";var H7O=t6i;H7O+=u2a;H7O+=o2a;H7O+=y3i;var E7O=g2a;E7O+=s2a;E7O+=j3i;E7O+=g6i;var e7O=y3i;e7O+=p1ff.q3i;e7O+=d2a;e7O+=n3i;var b7O=p1ff[402431];b7O+=n3i;b7O+=n3i;b7O+=z6i;var F7O=J9a;F7O+=C3i;F7O+=p1ff.q3i;F7O+=J1i;var n7O=A3i;n7O+=Z6i;conf[B1a]=$(R2a)[u8S]($[n7O]({id:Editor[F7O](conf[I0i]),multiple:conf[V2a] === r4i},conf[b7O] || ({})))[I5i](p2a,function(e,d){var m2a="_l";p1ff.S3f();if(!d || !d[C7S]){var k7O=m2a;k7O+=l1S;k7O+=U6a;k7O+=n3i;conf[k7O]=fieldTypes[G1N][b5E](conf);}});fieldTypes[e7O][E7O](conf,conf[a5N] || conf[H7O]);return conf[B1a][y2O];},update:function(conf,options,append){var N2a="_addOptions";var L7O=v9E;L7O+=K9i;p1ff.h3f();L7O+=p1ff[502672];fieldTypes[L7O][N2a](conf,options,append);var lastSet=conf[I2a];if(lastSet !== undefined){var M7O=y3i;M7O+=w1E;fieldTypes[G1N][M7O](conf,lastSet,r4i);}_triggerChange(conf[B1a]);},get:function(conf){var Q2a="toA";var U2a="selecte";var t2a="separat";var q2a="option";var f7O=K3E;f7O+=S6i;f7O+=P9i;var X7O=Q2a;X7O+=z6i;X7O+=N9E;X7O+=a7i;var J7O=p1ff[261600];J7O+=x4E;var r7O=q2a;r7O+=d5a;p1ff.S3f();r7O+=U2a;r7O+=p1ff.N3i;var val=conf[B1a][y5S](r7O)[J7O](function(){p1ff.h3f();return this[l2a];})[X7O]();if(conf[f7O]){var w7O=t2a;w7O+=p1ff[50755];w7O+=z6i;var x7O=p1ff[427263];x7O+=p1ff[50755];x7O+=n7i;return conf[T2a]?val[x7O](conf[w7O]):val;}return val[H4i]?val[y2O]:S0i;},set:function(conf,val,localUpdate){var y2a="epar";var h2a="old";var i2a="aceh";var c2a='option';var z2a="ple";var j2a="lit";var u8O=K9i;u8O+=p6E;var D8O=R8i;D8O+=i2a;D8O+=h2a;D8O+=r2i;var v8O=p1ff.q3i;v8O+=p1ff[402431];v8O+=p1ff.T3i;v8O+=v6i;p1ff.S3f();var Z8O=B2a;Z8O+=c3i;var O7O=a0a;O7O+=z1a;var Y7O=K9i;Y7O+=p1ff.q3i;Y7O+=H3E;Y7O+=k4i;var G7O=m6S;G7O+=S0S;G7O+=e6i;var K7O=t6i;K7O+=k8N;var S7O=i5i;S7O+=z2a;if(!localUpdate){conf[I2a]=val;}if(conf[S7O] && conf[T2a] && !Array[K7O](val)){var W7O=y3i;W7O+=y2a;W7O+=p1ff[402431];W7O+=m4i;var a7O=y3i;a7O+=h6i;a7O+=j2a;val=typeof val === y3S?val[a7O](conf[W7O]):[];}else if(!Array[G7O](val)){val=[val];}var i,len=val[Y7O],found,allFound=L4i;var options=conf[O7O][y5S](Z8O);conf[B1a][y5S](c2a)[v8O](function(){var C2a="lected";p1ff.h3f();var l8O=y3i;l8O+=p1ff.q3i;l8O+=C2a;found=L4i;for(i=y2O;i < len;i++){if(this[l2a] == val[i]){found=r4i;allFound=r4i;break;}}this[l8O]=found;});if(conf[D8O] && !allFound && !conf[V2a] && options[u8O]){options[y2O][f9a]=r4i;}if(!localUpdate){_triggerChange(conf[B1a]);}return allFound;},destroy:function(conf){conf[B1a][x7E](p2a);}});fieldTypes[P2a]=$[o8E](r4i,{},baseFieldType,{_addOptions:function(conf,opts,append){var A2a="optionsPair";var val,label;var jqInput=conf[B1a];var offset=y2O;if(!append){var o8O=p1ff.q3i;o8O+=o1S;o8O+=n3i;o8O+=a7i;jqInput[o8O]();}else {var s8O=i5E;s8O+=L1i;s8O+=k4i;var g8O=t6i;g8O+=R5a;g8O+=j6i;g8O+=n3i;offset=$(g8O,jqInput)[s8O];}if(opts){Editor[Z8S](opts,conf[A2a],function(val,label,i,attr){var n2a="put:";var E2a='input:last';var k2a='" type="checkbox" />';var F2a='<input id="';var q8O=p1ff[402431];q8O+=n3i;q8O+=n3i;q8O+=z6i;var Q8O=n7i;Q8O+=n2a;Q8O+=l1i;Q8O+=G5E;var I8O=j1i;I8O+=t1i;I8O+=T1i;var N8O=p1i;N8O+=l1i;N8O+=D1i;N8O+=m1i;var m8O=t6i;m8O+=p1ff.N3i;var p8O=y3i;p8O+=p1ff[402431];p8O+=C3i;p8O+=f0a;var V8O=t6i;V8O+=p1ff.N3i;var R8O=F1i;R8O+=L4S;var d8O=x4E;d8O+=h6i;d8O+=p1ff.q3i;d8O+=u1i;jqInput[d8O](R8O + F2a + Editor[o8S](conf[V8O]) + b2a + (i + offset) + k2a + e2a + Editor[p8O](conf[m8O]) + b2a + (i + offset) + P0i + label + N8O + I8O);$(Q8O,jqInput)[q8O](v8S,val)[y2O][l2a]=val;if(attr){$(E2a,jqInput)[u8S](attr);}});}},create:function(conf){var r2a='<div></div>';var H2a="_add";var M2a="ckbo";var i8O=S6i;i8O+=Y9S;i8O+=y3i;var T8O=B2a;T8O+=c3i;T8O+=y3i;var t8O=H2a;t8O+=Y9S;t8O+=j3i;t8O+=g6i;var U8O=L2a;p1ff.h3f();U8O+=M2a;U8O+=q6i;conf[B1a]=$(r2a);fieldTypes[U8O][t8O](conf,conf[T8O] || conf[i8O]);return conf[B1a][y2O];},get:function(conf){var a2a="tedValue";var X2a="nput:c";var J2a="jo";var S2a="unselectedValue";var f2a="hecked";p1ff.h3f();var K2a="unselec";var c8O=J2a;c8O+=t6i;c8O+=c3i;var B8O=t6i;B8O+=X2a;B8O+=f2a;var h8O=k0a;h8O+=m0N;var out=[];var selected=conf[h8O][y5S](B8O);if(selected[H4i]){var z8O=t9E;z8O+=H6i;selected[z8O](function(){var w2a="r_";var x2a="_edito";var y8O=x2a;p1ff.S3f();y8O+=w2a;y8O+=V2i;out[h4i](this[y8O]);});}else if(conf[S2a] !== undefined){var j8O=K2a;j8O+=a2a;out[h4i](conf[j8O]);}return conf[T2a] === undefined || conf[T2a] === S0i?out:out[c8O](conf[T2a]);},set:function(conf,val){var O2a='|';var Y2a="spli";p1ff.S3f();var W2a="str";var n8O=b4i;n8O+=k4i;var P8O=W2a;P8O+=t6i;P8O+=H3E;var C8O=t6i;C8O+=G2a;C8O+=n3i;var jqInputs=conf[B1a][y5S](C8O);if(!Array[T5E](val) && typeof val === P8O){var A8O=Y2a;A8O+=n3i;val=val[A8O](conf[T2a] || O2a);}else if(!Array[T5E](val)){val=[val];}var i,len=val[n8O],found;jqInputs[i4i](function(){p1ff.h3f();found=L4i;for(i=y2O;i < len;i++){if(this[l2a] == val[i]){found=r4i;break;}}this[Z3x]=found;});_triggerChange(jqInputs);},enable:function(conf){var b8O=h6i;b8O+=z6i;b8O+=p1ff[50755];b8O+=h6i;var F8O=t6i;F8O+=c3i;F8O+=h6i;F8O+=m0N;conf[B1a][y5S](F8O)[b8O](s6a,L4i);},disable:function(conf){var e8O=h6i;e8O+=z6i;e8O+=p1ff[50755];e8O+=h6i;var k8O=S2S;p1ff.S3f();k8O+=p1ff.N3i;conf[B1a][k8O](p3E)[e8O](s6a,r4i);},update:function(conf,options,append){p1ff.h3f();var l3x="ckbox";var v3x="dOptions";var L8O=y3i;L8O+=w1E;var H8O=g2a;H8O+=v3x;var E8O=L2a;E8O+=l3x;var checkbox=fieldTypes[E8O];var currVal=checkbox[b5E](conf);checkbox[H8O](conf,options,append);checkbox[L8O](conf,currVal);}});fieldTypes[M8O]=$[r8O](r4i,{},baseFieldType,{_addOptions:function(conf,opts,append){var D3x="ptions";var u3x="air";var J8O=s5i;J8O+=n7i;J8O+=h6i;J8O+=m0N;var val,label;var jqInput=conf[J8O];var offset=y2O;if(!append){var X8O=P6i;X8O+=h6i;X8O+=J9i;jqInput[X8O]();}else {var x8O=K9i;x8O+=V4S;x8O+=v6i;var f8O=t6i;f8O+=R5a;f8O+=j6i;f8O+=n3i;offset=$(f8O,jqInput)[x8O];}if(opts){var w8O=p1ff[50755];w8O+=D3x;w8O+=Z5S;w8O+=u3x;Editor[Z8S](opts,conf[w8O],function(val,label,i,attr){var R3x='" type="radio" name="';var p3x="ut:last";var o3x="nput:la";var s3x="<in";var g3x=" /";var V3x='</label>';var d3x="put id=\"";var O8O=p1ff[402431];O8O+=n3i;O8O+=n3i;O8O+=z6i;var Y8O=t6i;Y8O+=o3x;Y8O+=G5E;var G8O=j1i;G8O+=S4S;G8O+=r4E;G8O+=m1i;var W8O=q1i;W8O+=m1i;var a8O=q1i;a8O+=g3x;a8O+=m1i;var K8O=s3x;K8O+=d3x;var S8O=M0E;S8O+=m1i;jqInput[F3E](S8O + K8O + Editor[o8S](conf[I0i]) + b2a + (i + offset) + R3x + conf[N0i] + a8O + e2a + Editor[o8S](conf[I0i]) + b2a + (i + offset) + W8O + label + V3x + G8O);$(Y8O,jqInput)[O8O](v8S,val)[y2O][l2a]=val;p1ff.S3f();if(attr){var v4O=p1ff[402431];v4O+=n3i;v4O+=n3i;v4O+=z6i;var Z4O=n7i;Z4O+=h6i;Z4O+=p3x;$(Z4O,jqInput)[v4O](attr);}});}},create:function(conf){var I3x="_addOp";var Q3x='<div />';var m3x="ipOp";var N3x="opt";var g4O=p1ff[50755];g4O+=c3i;var o4O=m3x;o4O+=r3i;var u4O=N3x;u4O+=d3S;u4O+=y3i;var D4O=I3x;D4O+=T7i;D4O+=p1ff[50755];D4O+=g6i;var l4O=N9E;l4O+=d8i;l4O+=p1ff[50755];conf[B1a]=$(Q3x);fieldTypes[l4O][D4O](conf,conf[u4O] || conf[o4O]);this[g4O](S5S,function(){p1ff.h3f();var R4O=n7i;R4O+=N4S;R4O+=n3i;var d4O=C3i;d4O+=t6i;d4O+=c3i;d4O+=p1ff.N3i;var s4O=u2N;s4O+=h6i;s4O+=j6i;s4O+=n3i;conf[s4O][d4O](R4O)[i4i](function(){if(this[q3x]){var V4O=H6i;V4O+=f3E;V4O+=U5i;this[V4O]=r4i;}});});return conf[B1a][y2O];},get:function(conf){var U3x='input:checked';var p4O=P9i;p4O+=o3E;var el=conf[B1a][y5S](U3x);return el[p4O]?el[y2O][l2a]:undefined;},set:function(conf,val){var t3x="input:check";p1ff.h3f();var i4O=t3x;i4O+=U5i;var T4O=A4i;T4O+=c3i;T4O+=p1ff.N3i;var I4O=t9E;I4O+=p1ff.T3i;I4O+=v6i;var N4O=C3i;N4O+=t6i;N4O+=c3i;N4O+=p1ff.N3i;var m4O=k0a;m4O+=j6i;m4O+=n3i;var that=this;conf[m4O][N4O](p3E)[I4O](function(){var i3x="preCh";var B3x="_preChecke";var z3x="hec";var T3x="or_val";var h3x="ecked";var q4O=J6S;q4O+=T3x;var Q4O=s5i;Q4O+=i3x;p1ff.h3f();Q4O+=h3x;this[Q4O]=L4i;if(this[q4O] == val){var U4O=B3x;U4O+=p1ff.N3i;this[Z3x]=r4i;this[U4O]=r4i;}else {var t4O=p1ff.T3i;t4O+=z3x;t4O+=f4i;t4O+=U5i;this[t4O]=L4i;this[q3x]=L4i;}});_triggerChange(conf[B1a][T4O](i4O));},enable:function(conf){var z4O=i2i;z4O+=p1ff[402431];z4O+=y3x;var B4O=C3i;B4O+=t6i;B4O+=u1i;var h4O=s5i;h4O+=t6i;h4O+=G2a;h4O+=n3i;conf[h4O][B4O](p3E)[j3x](z4O,L4i);},disable:function(conf){var c3x="disa";var j4O=c3x;j4O+=m1E;j4O+=p1ff.N3i;var y4O=C3i;y4O+=C6S;conf[B1a][y4O](p3E)[j3x](j4O,r4i);},update:function(conf,options,append){var P3x="ddOpti";var C3x="[value=";var b4O=w8E;b4O+=z6i;var F4O=p1ff.q3i;F4O+=F0E;var n4O=C3x;n4O+=q1i;var A4O=v9E;A4O+=n3i;var P4O=t6i;P4O+=c3i;P4O+=J5a;var C4O=k9E;C4O+=P3x;C4O+=Q2E;var c4O=N9E;c4O+=N1a;var radio=fieldTypes[c4O];var currVal=radio[b5E](conf);radio[C4O](conf,options,append);var inputs=conf[B1a][y5S](P4O);radio[A4O](conf,inputs[w4N](n4O + currVal + T4i)[H4i]?currVal:inputs[F4O](y2O)[b4O](v8S));}});fieldTypes[K3a]=$[o8E](r4i,{},baseFieldType,{create:function(conf){var r3x='type';var E3x="RFC_2822";var e3x="dateFormat";var b3x="quer";var k3x="yui";var J3x='date';var K4O=k0a;K4O+=m0N;var H4O=n3i;H4O+=p1ff.q3i;H4O+=s6i;var E4O=A3x;E4O+=p1ff.N3i;var e4O=p1ff[402431];p1ff.h3f();e4O+=n3i;e4O+=n3i;e4O+=z6i;var k4O=n3x;k4O+=S4S;k4O+=m1i;conf[B1a]=$(k4O)[e4O]($[o8E]({id:Editor[E4O](conf[I0i]),type:H4O},conf[u8S]));if($[F3x]){var M4O=p1ff[427263];M4O+=b3x;M4O+=k3x;var L4O=s8i;L4O+=C0a;L4O+=K9i;L4O+=y1E;conf[B1a][L4O](M4O);if(!conf[e3x]){conf[e3x]=$[F3x][E3x];}setTimeout(function(){var L3x="dateImage";var H3x="eFormat";var M3x='#ui-datepicker-div';var w4O=j7i;w4O+=r3i;var X4O=d1S;X4O+=H3x;var J4O=a6E;J4O+=s2E;var r4O=b0a;r4O+=n3i;$(conf[r4O])[F3x]($[J4O]({dateFormat:conf[X4O],buttonImage:conf[L3x],buttonImageOnly:r4i,onSelect:function(){var x4O=p8i;x4O+=p9S;p1ff.S3f();var f4O=u2N;f4O+=J5a;conf[f4O][y2E]()[x4O]();}},conf[w4O]));$(M3x)[A2i](n2i,J5E);},b2O);}else {var S4O=u2N;S4O+=N4S;S4O+=n3i;conf[S4O][u8S](r3x,J3x);}return conf[K4O][y2O];},set:function(conf,val){var f3x="atepick";var X3x="asD";var a4O=v6i;a4O+=X3x;a4O+=f3x;a4O+=r2i;if($[F3x] && conf[B1a][J2i](a4O)){var Y4O=p1ff.T3i;Y4O+=v6i;Y4O+=p1ff[402431];Y4O+=z6a;var G4O=k5E;G4O+=i7a;G4O+=i6i;var W4O=b0a;W4O+=n3i;conf[W4O][F3x](G4O,val)[Y4O]();}else {var O4O=n8i;O4O+=p1ff[402431];O4O+=K9i;$(conf[B1a])[O4O](val);}},enable:function(conf){var x3x="nab";if($[F3x]){var Z1O=p1ff.q3i;Z1O+=x3x;Z1O+=K9i;Z1O+=p1ff.q3i;conf[B1a][F3x](Z1O);}else {var l1O=p1ff.N3i;l1O+=O5E;l1O+=h2i;var v1O=s5i;v1O+=t6i;v1O+=G2a;v1O+=n3i;$(conf[v1O])[j3x](l1O,L4i);}},disable:function(conf){var S3x="icker";p1ff.h3f();var w3x="datep";var K3x="sab";if($[F3x]){var D1O=w3x;D1O+=S3x;conf[B1a][D1O](X5S);}else {var o1O=p1ff.N3i;o1O+=t6i;o1O+=K3x;o1O+=R4N;var u1O=h9i;u1O+=p1ff[50755];u1O+=h6i;$(conf[B1a])[u1O](o1O,r4i);}},owns:function(conf,node){var W3x='div.ui-datepicker-header';var a3x=".ui-datepicke";var R1O=K9i;R1O+=F2E;R1O+=n3i;R1O+=v6i;var d1O=U6N;p1ff.S3f();d1O+=t6N;var s1O=i5E;s1O+=L1i;s1O+=k4i;var g1O=r4E;g1O+=a3x;g1O+=z6i;return $(node)[C2i](g1O)[s1O] || $(node)[d1O](W3x)[R1O]?r4i:L4i;}});fieldTypes[p1a]=$[V1O](r4i,{},baseFieldType,{create:function(conf){var D5x='keydown';var l5x="_closeFn";var O3x="tetim";var Y3x="yI";var v5x="displayFormat";var c1O=G3x;c1O+=a9i;c1O+=p1ff.q3i;c1O+=O1i;var j1O=p8i;j1O+=a9i;j1O+=p1ff.q3i;var y1O=p1ff[50755];y1O+=c3i;var B1O=S4a;B1O+=Y3x;B1O+=G2a;B1O+=n3i;var i1O=p1ff.N3i;i1O+=p1ff[402431];i1O+=O3x;i1O+=p1ff.q3i;var T1O=s5i;T1O+=t6i;T1O+=c3i;T1O+=J5a;var t1O=i7a;t1O+=i6i;t1O+=A4a;t1O+=p1ff.q3i;var U1O=p1ff[402431];U1O+=n3i;U1O+=R5E;var q1O=n3i;q1O+=p1ff.q3i;q1O+=q6i;q1O+=n3i;var Q1O=A3x;Q1O+=p1ff.N3i;var I1O=p1ff.q3i;I1O+=s6i;I1O+=d6i;I1O+=p1ff.N3i;var N1O=p1ff[402431];N1O+=n3i;N1O+=n3i;N1O+=z6i;var m1O=n3x;m1O+=r0a;var p1O=u2N;p1O+=J5a;conf[p1O]=$(m1O)[N1O]($[I1O](r4i,{id:Editor[Q1O](conf[I0i]),type:q1O},conf[U1O]));conf[Z5x]=new Editor[t1O](conf[T1O],$[o8E]({format:conf[v5x] || conf[m3a],i18n:this[R0i][i1O]},conf[Y3E]));conf[l5x]=function(){var h1O=v6i;h1O+=I0i;h1O+=p1ff.q3i;conf[Z5x][h1O]();};if(conf[B1O] === L4i){conf[B1a][I5i](D5x,function(e){var u5x="Defa";var z1O=h9i;z1O+=h5S;p1ff.S3f();z1O+=u5x;z1O+=J3S;e[z1O]();});}this[y1O](j1O,conf[c1O]);return conf[B1a][y2O];},get:function(conf){var g5x="momentS";var R5x="ntLocale";var o5x="reForma";var s5x="rict";var F1O=K6S;F1O+=o5x;F1O+=n3i;var n1O=p2E;n1O+=s0S;var A1O=g5x;A1O+=n3i;A1O+=s5x;var P1O=d5x;P1O+=R5x;var C1O=k0a;C1O+=m0N;var val=conf[C1O][V2i]();var inst=conf[Z5x][p1ff.T3i];return val && conf[V5x] && moment?moment(val,inst[m3a],inst[P1O],inst[A1O])[n1O](conf[F1O]):val;},set:function(conf,val){var m5x="ale";var p5x="ntLoc";var e1O=a0a;e1O+=c3i;e1O+=N4S;e1O+=n3i;var k1O=C3i;k1O+=h1i;k1O+=z4E;k1O+=n3i;var b1O=d5x;b1O+=p5x;p1ff.h3f();b1O+=m5x;var inst=conf[Z5x][p1ff.T3i];conf[Z5x][V2i](val && conf[V5x] && moment?moment(val,conf[V5x],inst[b1O],inst[M3a])[k1O](inst[m3a]):val);_triggerChange(conf[e1O]);},owns:function(conf,node){var I5x="owns";var N5x="_pic";p1ff.h3f();var E1O=N5x;E1O+=S4a;E1O+=z6i;return conf[E1O][I5x](node);},errorMessage:function(conf,msg){var Q5x="rMs";var L1O=p1ff.q3i;L1O+=F7i;L1O+=Q5x;L1O+=L1i;var H1O=j9i;H1O+=p9S;p1ff.h3f();H1O+=r2i;conf[H1O][L1O](msg);},destroy:function(conf){var q5x="ker";var U5x="keyd";var f1O=n5S;f1O+=F5S;var X1O=s5i;X1O+=U7i;X1O+=p1ff.T3i;X1O+=q5x;var J1O=U5x;J1O+=F5E;var r1O=G3x;r1O+=p1ff[50755];r1O+=y3i;r1O+=t3E;var M1O=p1ff[50755];M1O+=C3i;M1O+=C3i;this[M1O](P6E,conf[r1O]);conf[B1a][x7E](J1O);conf[X1O][f1O]();},minDate:function(conf,min){conf[Z5x][z4a](min);},maxDate:function(conf,max){p1ff.S3f();conf[Z5x][i3a](max);}});fieldTypes[n8S]=$[x1O](r4i,{},baseFieldType,{create:function(conf){p1ff.S3f();var editor=this;var container=_commonUpload(editor,conf,function(val){var t5x="Ty";var T5x='postUpload';var S1O=j6i;S1O+=h6i;S1O+=O8S;S1O+=p1ff.N3i;var w1O=A4i;w1O+=h8i;w1O+=t5x;w1O+=s0i;Editor[w1O][S1O][k5E][Q2i](editor,conf,val[y2O]);editor[D5E](T5x,[conf[N0i],val[y2O]]);});return container;},get:function(conf){var K1O=i5x;K1O+=H9E;p1ff.S3f();return conf[K1O];},set:function(conf,val){var n5x="noC";var A5x="clearText";var j5x="noFil";var F5x="Clear";var y5x="o fi";var P5x='div.clearValue button';var C5x="ppen";var b5x="triggerHandler";var c5x="eT";var B5x="upload.";var V0O=h5x;V0O+=K9i;var R0O=B5x;R0O+=p1ff.q3i;R0O+=d8i;R0O+=m4i;var d0O=s5i;d0O+=n7i;d0O+=h6i;d0O+=m0N;var u0O=S2S;u0O+=p1ff.N3i;var G1O=i2i;G1O+=h6i;G1O+=l1i;G1O+=a7i;var W1O=a0a;W1O+=R5a;W1O+=m0N;var a1O=s5i;a1O+=n8i;a1O+=H9E;conf[a1O]=val;var container=conf[W1O];if(conf[G1O]){var Y1O=C3i;Y1O+=t6i;Y1O+=c3i;Y1O+=p1ff.N3i;var rendered=container[Y1O](z5x);if(conf[e0a]){var Z0O=s5i;Z0O+=V2i;var O1O=p1ff.N3i;O1O+=c5E;O1O+=K9i;O1O+=e6i;rendered[u6E](conf[O1O](conf[Z0O]));}else {var D0O=L9i;D0O+=y5x;D0O+=K9i;D0O+=p1ff.q3i;var l0O=j5x;l0O+=c5x;l0O+=a6E;var v0O=p1ff[402431];v0O+=C5x;v0O+=p1ff.N3i;rendered[O2E]()[v0O](b8a + (conf[l0O] || D0O) + H0i);}}p1ff.h3f();var button=container[u0O](P5x);if(val && conf[A5x]){var o0O=n5x;o0O+=P9i;o0O+=p1ff[402431];o0O+=z6i;button[u6E](conf[A5x]);container[H2i](o0O);}else {var s0O=C3E;s0O+=F5x;var g0O=e1E;g0O+=c6a;container[g0O](s0O);}conf[d0O][y5S](p3E)[b5x](R0O,[conf[V0O]]);},enable:function(conf){var m0O=j6a;m0O+=R4N;var p0O=R4a;p0O+=m0N;conf[B1a][y5S](p0O)[j3x](m0O,L4i);conf[o0a]=r4i;},disable:function(conf){var k5x="sabled";var Q0O=d8i;Q0O+=k5x;var I0O=h6i;I0O+=Y9i;I0O+=h6i;var N0O=u2N;N0O+=h6i;N0O+=j6i;N0O+=n3i;conf[N0O][y5S](p3E)[I0O](Q0O,r4i);conf[o0a]=L4i;},canReturnSubmit:function(conf,node){p1ff.S3f();return L4i;}});fieldTypes[e5x]=$[o8E](r4i,{},baseFieldType,{_showHide:function(conf){var E5x="ontainer";p1ff.h3f();var H5x="limit";var L5x='div.limitHide';var z0O=P9i;z0O+=o3E;var B0O=K9i;B0O+=g2N;B0O+=t6i;B0O+=n3i;var h0O=D6E;h0O+=p1ff[50755];h0O+=U6E;var i0O=c3i;i0O+=p1ff[50755];i0O+=c3i;i0O+=p1ff.q3i;var T0O=d8i;T0O+=l5a;T0O+=a7i;var t0O=p1ff.T3i;t0O+=B2i;var U0O=C3i;U0O+=n7i;U0O+=p1ff.N3i;var q0O=s5i;q0O+=p1ff.T3i;q0O+=E5x;if(!conf[H5x]){return;}conf[q0O][U0O](L5x)[t0O](T0O,conf[e0a][H4i] >= conf[H5x]?i0O:h0O);conf[i4S]=conf[B0O] - conf[e0a][z0O];},create:function(conf){var f5x='multi';var r5x="utton.remov";var M5x="_cont";var J5x="addClas";var J0O=M5x;J0O+=V5a;var F0O=p1ff[225154];F0O+=r5x;F0O+=p1ff.q3i;var n0O=p8i;n0O+=p9S;var A0O=p1ff[50755];A0O+=c3i;var P0O=J5x;P0O+=y3i;var editor=this;var container=_commonUpload(editor,conf,function(val){var X5x="tUpload";var C0O=q8S;C0O+=X5x;var c0O=s5i;c0O+=n8i;c0O+=p1ff[402431];c0O+=K9i;var j0O=p1ff.T3i;j0O+=H9E;j0O+=K9i;var y0O=y3i;y0O+=p1ff.q3i;y0O+=n3i;conf[e0a]=conf[e0a][G0E](val);Editor[V0i][e5x][y0O][j0O](editor,conf,conf[c0O]);editor[D5E](C0O,[conf[N0i],conf[e0a]]);},r4i);container[P0O](f5x)[A0O](n0O,F0O,function(e){var w5x="stopPropagation";var x5x="nabled";var b0O=r9i;b0O+=x5x;e[w5x]();p1ff.S3f();if(conf[b0O]){var r0O=i5x;r0O+=p1ff[402431];r0O+=K9i;var M0O=p1ff.T3i;M0O+=H9E;M0O+=K9i;var L0O=y3i;L0O+=w1E;var H0O=a3i;H0O+=W3i;var E0O=Z5E;E0O+=y6E;E0O+=p1ff.T3i;E0O+=p1ff.q3i;var e0O=s5i;e0O+=n8i;e0O+=p1ff[402431];e0O+=K9i;var k0O=t6i;k0O+=p1ff.N3i;k0O+=q6i;var idx=$(this)[t0i](k0O);conf[e0O][E0O](idx,j2O);Editor[H0O][e5x][L0O][M0O](editor,conf,conf[r0O]);}});conf[J0O]=container;return container;},get:function(conf){p1ff.S3f();var X0O=s5i;X0O+=n8i;X0O+=p1ff[402431];X0O+=K9i;return conf[X0O];},set:function(conf,val){var p6x="_showHide";var d6x="span";var v6x='<ul></ul>';var V6x='No files';var a5x="uploa";var G5x="Upload col";var O5x="st have an array as a value";var Y5x="lections ";var S5x="load.edito";var W5x="dM";var K5x="riggerH";var Z6x="empt";var R6x="leText";var R2O=h5x;R2O+=K9i;var d2O=H8S;d2O+=S5x;d2O+=z6i;var s2O=n3i;s2O+=K5x;s2O+=l6i;s2O+=i3N;var g2O=C3i;g2O+=t6i;g2O+=c3i;g2O+=p1ff.N3i;var o2O=s5i;o2O+=n7i;o2O+=h6i;o2O+=m0N;var u2O=a5x;u2O+=W5x;u2O+=u4N;var S0O=i2i;S0O+=h6i;S0O+=l1i;S0O+=a7i;var w0O=s5i;w0O+=n8i;w0O+=H9E;var f0O=O5E;f0O+=Q1N;f0O+=e6i;if(!val){val=[];}if(!Array[f0O](val)){var x0O=G5x;x0O+=Y5x;x0O+=c7i;x0O+=O5x;throw x0O;}conf[w0O]=val;var that=this;var container=conf[B1a];if(conf[S0O]){var a0O=P9i;a0O+=o3E;var K0O=Z6x;K0O+=a7i;var rendered=container[y5S](z5x)[K0O]();if(val[a0O]){var W0O=t9E;W0O+=H6i;var list=$(v6x)[d2E](rendered);$[W0O](val,function(i,file){var o6x="<l";var D6x="sse";var g6x=' remove" data-idx="';var s6x='">&times;</button>';var u6x="<button";var l6x="li>";var v2O=p1i;v2O+=l6x;var Z2O=p1ff.T3i;Z2O+=l1i;Z2O+=D6x;Z2O+=y3i;var O0O=Z4i;O0O+=u6x;O0O+=m2N;O0O+=N2N;var Y0O=d8i;Y0O+=l5a;Y0O+=a7i;var G0O=o6x;G0O+=t6i;G0O+=m1i;list[F3E](G0O + conf[Y0O](file,i) + O0O + that[Z2O][p2E][U3S] + g6x + i + s6x + v2O);});}else {var D2O=p1i;D2O+=d6x;D2O+=m1i;var l2O=C3E;l2O+=i8i;l2O+=R6x;rendered[F3E](b8a + (conf[l2O] || V6x) + D2O);}}Editor[V0i][u2O][p6x](conf);conf[o2O][g2O](p3E)[s2O](d2O,[conf[R2O]]);},enable:function(conf){p1ff.h3f();var m2O=X5S;m2O+=p1ff.N3i;var p2O=C3i;p2O+=t6i;p2O+=u1i;var V2O=a0a;V2O+=c3i;V2O+=N4S;V2O+=n3i;conf[V2O][p2O](p3E)[j3x](m2O,L4i);conf[o0a]=r4i;},disable:function(conf){var U2O=z0a;U2O+=y3x;p1ff.h3f();var q2O=p1ff.N3i;q2O+=O5E;q2O+=l5i;q2O+=p1ff.N3i;var Q2O=h6i;Q2O+=z6i;Q2O+=p1ff[50755];Q2O+=h6i;var I2O=E1i;I2O+=n3i;var N2O=C3i;N2O+=t6i;N2O+=u1i;conf[B1a][N2O](I2O)[Q2O](q2O,r4i);conf[U2O]=L4i;},canReturnSubmit:function(conf,node){p1ff.h3f();return L4i;}});})();if(DataTable[t2O][T2O]){var i2O=C3i;i2O+=m6x;i2O+=Y5i;$[o8E](Editor[i2O],DataTable[a6E][N6x]);}DataTable[h2O][N6x]=Editor[V0i];Editor[B2O]={};Editor[N2i][I6x]=Q4i;Editor[z2O]=Q6x;return Editor;});

/*! Buttons for DataTables 1.6.5
 * ©2016-2020 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = DataTable.ext.buttons;

// Allow for jQuery slim
function _fadeIn(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeIn( duration, fn );
	}
	else {
		el.css('display', 'block');

		if (fn) {
			fn.call(el);
		}
	}
}

function _fadeOut(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeOut( duration, fn );
	}
	else {
		el.css('display', 'none');
		
		if (fn) {
			fn.call(el);
		}
	}
}

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function( dt, config )
{
	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if ( !(this instanceof Buttons) ) {
		return function (settings) {
			return new Buttons( settings, dt ).container();
		};
	}

	// If there is no config set it to an empty object
	if ( typeof( config ) === 'undefined' ) {
		config = {};	
	}
	
	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if ( Array.isArray( config ) ) {
		config = { buttons: config };
	}

	this.c = $.extend( true, {}, Buttons.defaults, config );

	// Don't want a deep copy for the buttons
	if ( config.buttons ) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new DataTable.Api( dt ),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb'+(_instCounter++)
	};

	this.dom = {
		container: $('<'+this.c.dom.container.tag+'/>')
			.addClass( this.c.dom.container.className )
	};

	this._constructor();
};


$.extend( Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 *//**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function ( node, action )
	{
		var button = this._nodeToButton( node );

		if ( action === undefined ) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function ( node, flag ) {
		var button = this._nodeToButton( node );
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if ( flag === undefined ) {
			return jqNode.hasClass( klass );
		}

		jqNode.toggleClass( klass, flag === undefined ? true : flag );

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @return {Buttons} Self for chaining
	 */
	add: function ( config, idx )
	{
		var buttons = this.s.buttons;

		if ( typeof idx === 'string' ) {
			var split = idx.split('-');
			var base = this.s;

			for ( var i=0, ien=split.length-1 ; i<ien ; i++ ) {
				base = base.buttons[ split[i]*1 ];
			}

			buttons = base.buttons;
			idx = split[ split.length-1 ]*1;
		}

		this._expandButton( buttons, config, base !== undefined, idx );
		this._draw();

		return this;
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function ()
	{
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function ( node ) {
		var button = this._nodeToButton( node );

		$(button.node)
			.addClass( this.c.dom.button.disabled )
			.attr('disabled', true);

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function ()
	{
		// Key event listener
		$('body').off( 'keyup.'+this.s.namespace );

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;
		
		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.remove( buttons[i].node );
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for ( i=0, ien=buttonInsts.length ; i<ien ; i++ ) {
			if ( buttonInsts.inst === this ) {
				buttonInsts.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function ( node, flag )
	{
		if ( flag === false ) {
			return this.disable( node );
		}

		var button = this._nodeToButton( node );
		$(button.node)
			.removeClass( this.c.dom.button.disabled )
			.removeAttr('disabled');

		return this;
	},

	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function ()
	{
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function ( node )
	{
		if ( ! node ) {
			return this.dom.container;
		}

		var button = this._nodeToButton( node );
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function ( node, flag )
	{
		var dt = this.s.dt;
		var button = this._nodeToButton( node );

		if ( flag === undefined ) {
			return $(button.node).hasClass( 'processing' );
		}

		$(button.node).toggleClass( 'processing', flag );

		$(dt.table().node()).triggerHandler( 'buttons-processing.dt', [
			flag, dt.button( node ), dt, $(node), button.conf
		] );

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function ( node )
	{
		var button = this._nodeToButton( node );
		var host = this._nodeToHost( node );
		var dt = this.s.dt;

		// Remove any child buttons first
		if ( button.buttons.length ) {
			for ( var i=button.buttons.length-1 ; i>=0 ; i-- ) {
				this.remove( button.buttons[i].node );
			}
		}

		// Allow the button to remove event handlers, etc
		if ( button.conf.destroy ) {
			button.conf.destroy.call( dt.button(node), dt, $(node), button.conf );
		}

		this._removeKey( button.conf );

		$(button.node).remove();

		var idx = $.inArray( button, host );
		host.splice( idx, 1 );

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 *//**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function ( node, label )
	{
		var button = this._nodeToButton( node );
		var buttonLiner = this.c.dom.collection.buttonLiner;
		var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
			buttonLiner.tag :
			this.c.dom.buttonLiner.tag;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, jqNode, button.conf ) :
				opt;
		};

		if ( label === undefined ) {
			return text( button.conf.text );
		}

		button.conf.text = label;

		if ( linerTag ) {
			jqNode.children( linerTag ).html( text(label) );
		}
		else {
			jqNode.html( text(label) );
		}

		return this;
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons =  this.c.buttons;

		if ( ! dtSettings._buttons ) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push( {
			inst: this,
			name: this.c.name
		} );

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.add( buttons[i] );
		}

		dt.on( 'destroy', function ( e, settings ) {
			if ( settings === dtSettings ) {
				that.destroy();
			}
		} );

		// Global key event binding to listen for button keys
		$('body').on( 'keyup.'+this.s.namespace, function ( e ) {
			if ( ! document.activeElement || document.activeElement === document.body ) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if ( that.s.listenKeys.toLowerCase().indexOf( character ) !== -1 ) {
					that._keypress( character, e );
				}
			}
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function ( conf )
	{
		if ( conf.key ) {
			this.s.listenKeys += $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function ( container, buttons )
	{
		if ( ! container ) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			container.append( buttons[i].inserter );
			container.append( ' ' );

			if ( buttons[i].buttons && buttons[i].buttons.length ) {
				this._draw( buttons[i].collection, buttons[i].buttons );
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function ( attachTo, button, inCollection, attachPoint )
	{
		var dt = this.s.dt;
		var buttonCounter = 0;
		var buttons = ! Array.isArray( button ) ?
			[ button ] :
			button;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var conf = this._resolveExtends( buttons[i] );

			if ( ! conf ) {
				continue;
			}

			// If the configuration is an array, then expand the buttons at this
			// point
			if ( Array.isArray( conf ) ) {
				this._expandButton( attachTo, conf, inCollection, attachPoint );
				continue;
			}

			var built = this._buildButton( conf, inCollection );
			if ( ! built ) {
				continue;
			}

			if ( attachPoint !== undefined && attachPoint !== null ) {
				attachTo.splice( attachPoint, 0, built );
				attachPoint++;
			}
			else {
				attachTo.push( built );
			}

			if ( built.conf.buttons ) {
				built.collection = $('<'+this.c.dom.collection.tag+'/>');

				built.conf._collection = built.collection;

				this._expandButton( built.buttons, built.conf.buttons, true, attachPoint );
			}

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if ( conf.init ) {
				conf.init.call( dt.button( built.node ), dt, $(built.node), conf );
			}

			buttonCounter++;
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {jQuery} Created button node (jQuery)
	 * @private
	 */
	_buildButton: function ( config, inCollection )
	{
		var buttonDom = this.c.dom.button;
		var linerDom = this.c.dom.buttonLiner;
		var collectionDom = this.c.dom.collection;
		var dt = this.s.dt;
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, button, config ) :
				opt;
		};

		if ( inCollection && collectionDom.button ) {
			buttonDom = collectionDom.button;
		}

		if ( inCollection && collectionDom.buttonLiner ) {
			linerDom = collectionDom.buttonLiner;
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, Flash buttons require Flash
		if ( config.available && ! config.available( dt, config ) ) {
			return false;
		}

		var action = function ( e, dt, button, config ) {
			config.action.call( dt.button( button ), e, dt, button, config );

			$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
				dt.button( button ), dt, button, config 
			] );
		};

		var tag = config.tag || buttonDom.tag;
		var clickBlurs = config.clickBlurs === undefined ? true : config.clickBlurs
		var button = $('<'+tag+'/>')
			.addClass( buttonDom.className )
			.attr( 'tabindex', this.s.dt.settings()[0].iTabIndex )
			.attr( 'aria-controls', this.s.dt.table().node().id )
			.on( 'click.dtb', function (e) {
				e.preventDefault();

				if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
					action( e, dt, button, config );
				}
				if( clickBlurs ) {
					button.trigger('blur');
				}
			} )
			.on( 'keyup.dtb', function (e) {
				if ( e.keyCode === 13 ) {
					if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
						action( e, dt, button, config );
					}
				}
			} );

		// Make `a` tags act like a link
		if ( tag.toLowerCase() === 'a' ) {
			button.attr( 'href', '#' );
		}

		// Button tags should have `type=button` so they don't have any default behaviour
		if ( tag.toLowerCase() === 'button' ) {
			button.attr( 'type', 'button' );
		}

		if ( linerDom.tag ) {
			var liner = $('<'+linerDom.tag+'/>')
				.html( text( config.text ) )
				.addClass( linerDom.className );

			if ( linerDom.tag.toLowerCase() === 'a' ) {
				liner.attr( 'href', '#' );
			}

			button.append( liner );
		}
		else {
			button.html( text( config.text ) );
		}

		if ( config.enabled === false ) {
			button.addClass( buttonDom.disabled );
		}

		if ( config.className ) {
			button.addClass( config.className );
		}

		if ( config.titleAttr ) {
			button.attr( 'title', text( config.titleAttr ) );
		}

		if ( config.attr ) {
			button.attr( config.attr );
		}

		if ( ! config.namespace ) {
			config.namespace = '.dt-button-'+(_buttonCounter++);
		}

		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if ( buttonContainer && buttonContainer.tag ) {
			inserter = $('<'+buttonContainer.tag+'/>')
				.addClass( buttonContainer.className )
				.append( button );
		}
		else {
			inserter = button;
		}

		this._addKey( config );

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if( this.c.buttonCreated ) {
			inserter = this.c.buttonCreated( config, inserter );
		}

		return {
			conf:         config,
			node:         button.get(0),
			inserter:     inserter,
			buttons:      [],
			inCollection: inCollection,
			collection:   null
		};
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons[i];
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToButton( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons;
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToHost( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function ( character, e )
	{
		// Check if this button press already activated on another instance of Buttons
		if ( e._buttonsHandled ) {
			return;
		}

		var run = function ( conf, node ) {
			if ( ! conf.key ) {
				return;
			}

			if ( conf.key === character ) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ( $.isPlainObject( conf.key ) ) {
				if ( conf.key.key !== character ) {
					return;
				}

				if ( conf.key.shiftKey && ! e.shiftKey ) {
					return;
				}

				if ( conf.key.altKey && ! e.altKey ) {
					return;
				}

				if ( conf.key.ctrlKey && ! e.ctrlKey ) {
					return;
				}

				if ( conf.key.metaKey && ! e.metaKey ) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function ( a ) {
			for ( var i=0, ien=a.length ; i<ien ; i++ ) {
				run( a[i].conf, a[i].node );

				if ( a[i].buttons.length ) {
					recurse( a[i].buttons );
				}
			}
		};

		recurse( this.s.buttons );
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function ( conf )
	{
		if ( conf.key ) {
			var character = $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray( character, a );
			a.splice( idx, 1 );
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function ( conf )
	{
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function ( base ) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while ( ! $.isPlainObject(base) && ! Array.isArray(base) ) {
				if ( base === undefined ) {
					return;
				}

				if ( typeof base === 'function' ) {
					base = base( dt, conf );

					if ( ! base ) {
						return false;
					}
				}
				else if ( typeof base === 'string' ) {
					if ( ! _dtButtons[ base ] ) {
						throw 'Unknown button type: '+base;
					}

					base = _dtButtons[ base ];
				}

				loop++;
				if ( loop > 30 ) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return Array.isArray( base ) ?
				base :
				$.extend( {}, base );
		};

		conf = toConfObject( conf );

		while ( conf && conf.extend ) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if ( ! _dtButtons[ conf.extend ] ) {
				throw 'Cannot extend unknown button type: '+conf.extend;
			}

			var objArray = toConfObject( _dtButtons[ conf.extend ] );
			if ( Array.isArray( objArray ) ) {
				return objArray;
			}
			else if ( ! objArray ) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			conf = $.extend( {}, objArray, conf );

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if ( originalClassName && conf.className !== originalClassName ) {
				conf.className = originalClassName+' '+conf.className;
			}

			// Buttons to be added to a collection  -gives the ability to define
			// if buttons should be added to the start or end of a collection
			var postfixButtons = conf.postfixButtons;
			if ( postfixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=postfixButtons.length ; i<ien ; i++ ) {
					conf.buttons.push( postfixButtons[i] );
				}

				conf.postfixButtons = null;
			}

			var prefixButtons = conf.prefixButtons;
			if ( prefixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=prefixButtons.length ; i<ien ; i++ ) {
					conf.buttons.splice( i, 0, prefixButtons[i] );
				}

				conf.prefixButtons = null;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function ( content, hostButton, inOpts ) {
		var dt = hostButton;
		var buttonsSettings = this.c;
		var options = $.extend( {
			align: 'button-left', // button-right, dt-container
			autoClose: false,
			background: true,
			backgroundClassName: 'dt-button-background',
			contentClassName: buttonsSettings.dom.collection.className,
			collectionLayout: '',
			collectionTitle: '',
			dropup: false,
			fade: 400,
			rightAlignClassName: 'dt-button-right',
			tag: buttonsSettings.dom.collection.tag
		}, inOpts );
		var hostNode = hostButton.node();

		var close = function () {
			_fadeOut(
				$('.dt-button-collection'),
				options.fade,
				function () {
					$(this).detach();
				}
			);

			$(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes())
				.attr('aria-expanded', 'false');

			$('div.dt-button-background').off( 'click.dtb-collection' );
			Buttons.background( false, options.backgroundClassName, options.fade, hostNode );

			$('body').off( '.dtb-collection' );
			dt.off( 'buttons-action.b-internal' );
		};

		if (content === false) {
			close();
		}

		var existingExpanded = $(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes());
		if ( existingExpanded.length ) {
			hostNode = existingExpanded.eq(0);

			close();
		}

		var display = $('<div/>')
			.addClass('dt-button-collection')
			.addClass(options.collectionLayout)
			.css('display', 'none');

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostNode.attr( 'aria-expanded', 'true' );

		if ( hostNode.parents('body')[0] !== document.body ) {
			hostNode = document.body.lastChild;
		}

		if ( options.collectionTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');
		}

		_fadeIn( display.insertAfter( hostNode ), options.fade );

		var tableContainer = $( hostButton.table().container() );
		var position = display.css( 'position' );

		if ( options.align === 'dt-container' ) {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		// Align the popover relative to the DataTables container
		// Useful for wide popovers such as SearchPanes
		if (
			position === 'absolute' &&
			(
				display.hasClass( options.rightAlignClassName ) ||
				display.hasClass( options.leftAlignClassName ) ||
				options.align === 'dt-container'
			)
		) {

			var hostPosition = hostNode.position();

			display.css( {
				top: hostPosition.top + hostNode.outerHeight(),
				left: hostPosition.left
			} );

			// calculate overflow when positioned beneath
			var collectionHeight = display.outerHeight();
			var tableBottom = tableContainer.offset().top + tableContainer.height();
			var listBottom = hostPosition.top + hostNode.outerHeight() + collectionHeight;
			var bottomOverflow = listBottom - tableBottom;

			// calculate overflow when positioned above
			var listTop = hostPosition.top - collectionHeight;
			var tableTop = tableContainer.offset().top;
			var topOverflow = tableTop - listTop;

			// if bottom overflow is larger, move to the top because it fits better, or if dropup is requested
			var moveTop = hostPosition.top - collectionHeight - 5;
			if ( (bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop ) {
				display.css( 'top', moveTop);
			}

			// Get the size of the container (left and width - and thus also right)
			var tableLeft = tableContainer.offset().left;
			var tableWidth = tableContainer.width();
			var tableRight = tableLeft + tableWidth;

			// Get the size of the popover (left and width - and ...)
			var popoverLeft = display.offset().left;
			var popoverWidth = display.width();
			var popoverRight = popoverLeft + popoverWidth;

			// Get the size of the host buttons (left and width - and ...)
			var buttonsLeft = hostNode.offset().left;
			var buttonsWidth = hostNode.outerWidth()
			var buttonsRight = buttonsLeft + buttonsWidth;
			
			// You've then got all the numbers you need to do some calculations and if statements,
			//  so we can do some quick JS maths and apply it only once
			// If it has the right align class OR the buttons are right aligned OR the button container is floated right,
			//  then calculate left position for the popover to align the popover to the right hand
			//  side of the button - check to see if the left of the popover is inside the table container.
			// If not, move the popover so it is, but not more than it means that the popover is to the right of the table container
			var popoverShuffle = 0;
			if ( display.hasClass( options.rightAlignClassName )) {
				popoverShuffle = buttonsRight - popoverRight;
				if(tableLeft > (popoverLeft + popoverShuffle)){
					var leftGap = tableLeft - (popoverLeft + popoverShuffle);
					var rightGap = tableRight - (popoverRight + popoverShuffle);
	
					if(leftGap > rightGap){
						popoverShuffle += rightGap; 
					}
					else {
						popoverShuffle += leftGap;
					}
				}
			}
			// else attempt to left align the popover to the button. Similar to above, if the popover's right goes past the table container's right,
			//  then move it back, but not so much that it goes past the left of the table container
			else {
				popoverShuffle = tableLeft - popoverLeft;

				if(tableRight < (popoverRight + popoverShuffle)){
					var leftGap = tableLeft - (popoverLeft + popoverShuffle);
					var rightGap = tableRight - (popoverRight + popoverShuffle);

					if(leftGap > rightGap ){
						popoverShuffle += rightGap;
					}
					else {
						popoverShuffle += leftGap;
					}

				}
			}

			display.css('left', display.position().left + popoverShuffle);
			
		}
		else if (position === 'absolute') {
			// Align relative to the host button
			var hostPosition = hostNode.position();

			display.css( {
				top: hostPosition.top + hostNode.outerHeight(),
				left: hostPosition.left
			} );

			// calculate overflow when positioned beneath
			var collectionHeight = display.outerHeight();
			var top = hostNode.offset().top
			var popoverShuffle = 0;

			// Get the size of the host buttons (left and width - and ...)
			var buttonsLeft = hostNode.offset().left;
			var buttonsWidth = hostNode.outerWidth()
			var buttonsRight = buttonsLeft + buttonsWidth;

			// Get the size of the popover (left and width - and ...)
			var popoverLeft = display.offset().left;
			var popoverWidth = content.width();
			var popoverRight = popoverLeft + popoverWidth;

			var moveTop = hostPosition.top - collectionHeight - 5;
			var tableBottom = tableContainer.offset().top + tableContainer.height();
			var listBottom = hostPosition.top + hostNode.outerHeight() + collectionHeight;
			var bottomOverflow = listBottom - tableBottom;

			// calculate overflow when positioned above
			var listTop = hostPosition.top - collectionHeight;
			var tableTop = tableContainer.offset().top;
			var topOverflow = tableTop - listTop;

			if ( (bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop ) {
				display.css( 'top', moveTop);
			}

			popoverShuffle = options.align === 'button-right'
				? buttonsRight - popoverRight
				: buttonsLeft - popoverLeft;

			display.css('left', display.position().left + popoverShuffle);
		}
		else {
			// Fix position - centre on screen
			var top = display.height() / 2;
			if ( top > $(window).height() / 2 ) {
				top = $(window).height() / 2;
			}

			display.css( 'marginTop', top*-1 );
		}

		if ( options.background ) {
			Buttons.background( true, options.backgroundClassName, options.fade, hostNode );
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on( 'click.dtb-collection', function () {} );

		$('body')
			.on( 'click.dtb-collection', function (e) {
				// andSelf is deprecated in jQ1.8, but we want 1.7 compat
				var back = $.fn.addBack ? 'addBack' : 'andSelf';
				var parent = $(e.target).parent()[0];

				if (( ! $(e.target).parents()[back]().filter( content ).length  && !$(parent).hasClass('dt-buttons')) || $(e.target).hasClass('dt-button-background')) {
					close();
				}
			} )
			.on( 'keyup.dtb-collection', function (e) {
				if ( e.keyCode === 27 ) {
					close();
				}
			} );

		if ( options.autoClose ) {
			setTimeout( function () {
				dt.on( 'buttons-action.b-internal', function (e, btn, dt, node) {
					if ( node[0] === hostNode[0] ) {
						return;
					}
					close();
				} );
			}, 0);
		}

		$(display).trigger('buttons-popover.dt');
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden 
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function ( show, className, fade, insertPoint ) {
	if ( fade === undefined ) {
		fade = 400;
	}
	if ( ! insertPoint ) {
		insertPoint = document.body;
	}

	if ( show ) {
		_fadeIn(
			$('<div/>')
				.addClass( className )
				.css( 'display', 'none' )
				.insertAfter( insertPoint ),
			fade
		);
	}
	else {
		_fadeOut(
			$('div.'+className),
			fade,
			function () {
				$(this)
					.removeClass( className )
					.remove();
			}
		);
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function ( group, buttons )
{
	if ( group === undefined || group === null ) {
		return $.map( buttons, function ( v ) {
			return v.inst;
		} );
	}

	var ret = [];
	var names = $.map( buttons, function ( v ) {
		return v.name;
	} );

	// Flatten the group selector into an array of single options
	var process = function ( input ) {
		if ( Array.isArray( input ) ) {
			for ( var i=0, ien=input.length ; i<ien ; i++ ) {
				process( input[i] );
			}
			return;
		}

		if ( typeof input === 'string' ) {
			if ( input.indexOf( ',' ) !== -1 ) {
				// String selector, list of names
				process( input.split(',') );
			}
			else {
				// String selector individual name
				var idx = $.inArray( input.trim(), names );

				if ( idx !== -1 ) {
					ret.push( buttons[ idx ].inst );
				}
			}
		}
		else if ( typeof input === 'number' ) {
			// Index selector
			ret.push( buttons[ input ].inst );
		}
	};
	
	process( group );

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function ( insts, selector )
{
	var ret = [];
	var nodeBuilder = function ( a, buttons, baseIdx ) {
		var button;
		var idx;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( button ) {
				idx = baseIdx !== undefined ?
					baseIdx+i :
					i+'';

				a.push( {
					node: button.node,
					name: button.conf.name,
					idx:  idx
				} );

				if ( button.buttons ) {
					nodeBuilder( a, button.buttons, idx+'-' );
				}
			}
		}
	};

	var run = function ( selector, inst ) {
		var i, ien;
		var buttons = [];
		nodeBuilder( buttons, inst.s.buttons );

		var nodes = $.map( buttons, function (v) {
			return v.node;
		} );

		if ( Array.isArray( selector ) || selector instanceof $ ) {
			for ( i=0, ien=selector.length ; i<ien ; i++ ) {
				run( selector[i], inst );
			}
			return;
		}

		if ( selector === null || selector === undefined || selector === '*' ) {
			// Select all
			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				ret.push( {
					inst: inst,
					node: buttons[i].node
				} );
			}
		}
		else if ( typeof selector === 'number' ) {
			// Main button index selector
			ret.push( {
				inst: inst,
				node: inst.s.buttons[ selector ].node
			} );
		}
		else if ( typeof selector === 'string' ) {
			if ( selector.indexOf( ',' ) !== -1 ) {
				// Split
				var a = selector.split(',');

				for ( i=0, ien=a.length ; i<ien ; i++ ) {
					run( a[i].trim(), inst );
				}
			}
			else if ( selector.match( /^\d+(\-\d+)*$/ ) ) {
				// Sub-button index selector
				var indexes = $.map( buttons, function (v) {
					return v.idx;
				} );

				ret.push( {
					inst: inst,
					node: buttons[ $.inArray( selector, indexes ) ].node
				} );
			}
			else if ( selector.indexOf( ':name' ) !== -1 ) {
				// Button name selector
				var name = selector.replace( ':name', '' );

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					if ( buttons[i].name === name ) {
						ret.push( {
							inst: inst,
							node: buttons[i].node
						} );
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$( nodes ).filter( selector ).each( function () {
					ret.push( {
						inst: inst,
						node: this
					} );
				} );
			}
		}
		else if ( typeof selector === 'object' && selector.nodeName ) {
			// Node selector
			var idx = $.inArray( selector, nodes );

			if ( idx !== -1 ) {
				ret.push( {
					inst: inst,
					node: nodes[ idx ]
				} );
			}
		}
	};


	for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
		var inst = insts[i];

		run( selector, inst );
	}

	return ret;
};


/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: ''
		},
		button: {
			// Flash buttons will not work with `<button>` in IE - it has to be `<a>`
			tag: 'ActiveXObject' in window ?
				'a' :
				'button',
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled'
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '1.6.5';


$.extend( _dtButtons, {
	collection: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.collection', 'Collection' );
		},
		className: 'buttons-collection',
		init: function ( dt, button, config ) {
			button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			e.stopPropagation();

			if ( config._collection.parents('body').length ) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}
		},
		attr: {
			'aria-haspopup': true
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function ( dt, conf ) {
		if ( _dtButtons.copyHtml5 ) {
			return 'copyHtml5';
		}
		if ( _dtButtons.copyFlash && _dtButtons.copyFlash.available( dt, conf ) ) {
			return 'copyFlash';
		}
	},
	csv: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.csvHtml5 && _dtButtons.csvHtml5.available( dt, conf ) ) {
			return 'csvHtml5';
		}
		if ( _dtButtons.csvFlash && _dtButtons.csvFlash.available( dt, conf ) ) {
			return 'csvFlash';
		}
	},
	excel: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.excelHtml5 && _dtButtons.excelHtml5.available( dt, conf ) ) {
			return 'excelHtml5';
		}
		if ( _dtButtons.excelFlash && _dtButtons.excelFlash.available( dt, conf ) ) {
			return 'excelFlash';
		}
	},
	pdf: function ( dt, conf ) {
		// Common option that will use the HTML5 or Flash export buttons
		if ( _dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available( dt, conf ) ) {
			return 'pdfHtml5';
		}
		if ( _dtButtons.pdfFlash && _dtButtons.pdfFlash.available( dt, conf ) ) {
			return 'pdfFlash';
		}
	},
	pageLength: function ( dt ) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = Array.isArray( lengthMenu[0] ) ? lengthMenu[0] : lengthMenu;
		var lang = Array.isArray( lengthMenu[0] ) ? lengthMenu[1] : lengthMenu;
		var text = function ( dt ) {
			return dt.i18n( 'buttons.pageLength', {
				"-1": 'Show all rows',
				_:    'Show %d rows'
			}, dt.page.len() );
		};

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map( vals, function ( val, i ) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function ( e, dt ) {
						dt.page.len( val ).draw();
					},
					init: function ( dt, node, conf ) {
						var that = this;
						var fn = function () {
							that.active( dt.page.len() === val );
						};

						dt.on( 'length.dt'+conf.namespace, fn );
						fn();
					},
					destroy: function ( dt, node, conf ) {
						dt.off( 'length.dt'+conf.namespace );
					}
				};
			} ),
			init: function ( dt, node, conf ) {
				var that = this;
				dt.on( 'length.dt'+conf.namespace, function () {
					that.text( conf.text );
				} );
			},
			destroy: function ( dt, node, conf ) {
				dt.off( 'length.dt'+conf.namespace );
			}
		};
	}
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
DataTable.Api.register( 'buttons()', function ( group, selector ) {
	// Argument shifting
	if ( selector === undefined ) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			return Buttons.buttonSelector(
				Buttons.instanceSelector( group, ctx._buttons ),
				selector
			);
		}
	}, true );

	res._groupSelector = group;
	return res;
} );

// Individual button selector
DataTable.Api.register( 'button()', function ( group, selector ) {
	// just run buttons() and truncate
	var buttons = this.buttons( group, selector );

	if ( buttons.length > 1 ) {
		buttons.splice( 1, buttons.length );
	}

	return buttons;
} );

// Active buttons
DataTable.Api.registerPlural( 'buttons().active()', 'button().active()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.active( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.active( set.node, flag );
	} );
} );

// Get / set button action
DataTable.Api.registerPlural( 'buttons().action()', 'button().action()', function ( action ) {
	if ( action === undefined ) {
		return this.map( function ( set ) {
			return set.inst.action( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.action( set.node, action );
	} );
} );

// Enable / disable buttons
DataTable.Api.register( ['buttons().enable()', 'button().enable()'], function ( flag ) {
	return this.each( function ( set ) {
		set.inst.enable( set.node, flag );
	} );
} );

// Disable buttons
DataTable.Api.register( ['buttons().disable()', 'button().disable()'], function () {
	return this.each( function ( set ) {
		set.inst.disable( set.node );
	} );
} );

// Get button nodes
DataTable.Api.registerPlural( 'buttons().nodes()', 'button().node()', function () {
	var jq = $();

	// jQuery will automatically reduce duplicates to a single entry
	$( this.each( function ( set ) {
		jq = jq.add( set.inst.node( set.node ) );
	} ) );

	return jq;
} );

// Get / set button processing state
DataTable.Api.registerPlural( 'buttons().processing()', 'button().processing()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.processing( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.processing( set.node, flag );
	} );
} );

// Get / set button text (i.e. the button labels)
DataTable.Api.registerPlural( 'buttons().text()', 'button().text()', function ( label ) {
	if ( label === undefined ) {
		return this.map( function ( set ) {
			return set.inst.text( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.text( set.node, label );
	} );
} );

// Trigger a button's action
DataTable.Api.registerPlural( 'buttons().trigger()', 'button().trigger()', function () {
	return this.each( function ( set ) {
		set.inst.node( set.node ).trigger( 'click' );
	} );
} );

// Button resolver to the popover
DataTable.Api.register( 'button().popover()', function (content, options) {
	return this.map( function ( set ) {
		return set.inst._popover( content, this.button(this[0].node), options );
	} );
} );

// Get the container elements
DataTable.Api.register( 'buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			var insts = Buttons.instanceSelector( groupSelector, ctx._buttons );

			for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
				jq = jq.add( insts[i].container() );
			}
		}
	} );

	return jq;
} );

DataTable.Api.register( 'buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
} );

// Add a new button
DataTable.Api.register( 'button().add()', function ( idx, conf ) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if ( ctx.length ) {
		var inst = Buttons.instanceSelector( this._groupSelector, ctx[0]._buttons );

		if ( inst.length ) {
			inst[0].add( conf, idx );
		}
	}

	return this.button( this._groupSelector, idx );
} );

// Destroy the button sets selected
DataTable.Api.register( 'buttons().destroy()', function () {
	this.pluck( 'inst' ).unique().each( function ( inst ) {
		inst.destroy();
	} );

	return this;
} );

// Remove a button
DataTable.Api.registerPlural( 'buttons().remove()', 'buttons().remove()', function () {
	this.each( function ( set ) {
		set.inst.remove( set.node );
	} );

	return this;
} );

// Information box that can be used by buttons
var _infoTimer;
DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
	var that = this;

	if ( title === false ) {
		this.off('destroy.btn-info');
		_fadeOut(
			$('#datatables_buttons_info'),
			400,
			function () {
				$(this).remove();
			}
		);
		clearTimeout( _infoTimer );
		_infoTimer = null;

		return this;
	}

	if ( _infoTimer ) {
		clearTimeout( _infoTimer );
	}

	if ( $('#datatables_buttons_info').length ) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>'+title+'</h2>' : '';

	_fadeIn(
		$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html( title )
			.append( $('<div/>')[ typeof message === 'string' ? 'html' : 'append' ]( message ) )
			.css( 'display', 'none' )
			.appendTo( 'body' )
	);

	if ( time !== undefined && time !== 0 ) {
		_infoTimer = setTimeout( function () {
			that.buttons.info( false );
		}, time );
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
} );

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
DataTable.Api.register( 'buttons.exportData()', function ( options ) {
	if ( this.context.length ) {
		return _exportData( new DataTable.Api( this.context[0] ), options );
	}
} );

// Get information about the export that is common to many of the export data
// types (DRY)
DataTable.Api.register( 'buttons.exportInfo()', function ( conf ) {
	if ( ! conf ) {
		conf = {};
	}

	return {
		filename: _filename( conf ),
		title: _title( conf ),
		messageTop: _message(this, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf.messageBottom, 'bottom')
	};
} );



/**
 * Get the file name for an exported file.
 *
 * @param {object}	config Button configuration
 * @param {boolean} incExtension Include the file name extension
 */
var _filename = function ( config )
{
	// Backwards compatibility
	var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
		config.title :
		config.filename;

	if ( typeof filename === 'function' ) {
		filename = filename();
	}

	if ( filename === undefined || filename === null ) {
		return null;
	}

	if ( filename.indexOf( '*' ) !== -1 ) {
		filename = filename.replace( '*', $('head > title').text() ).trim();
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

	var extension = _stringOrFunction( config.extension );
	if ( ! extension ) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function ( option )
{
	if ( option === null || option === undefined ) {
		return null;
	}
	else if ( typeof option === 'function' ) {
		return option();
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function ( config )
{
	var title = _stringOrFunction( config.title );

	return title === null ?
		null : title.indexOf( '*' ) !== -1 ?
			title.replace( '*', $('head > title').text() || 'Exported data' ) :
			title;
};

var _message = function ( dt, option, position )
{
	var message = _stringOrFunction( option );
	if ( message === null ) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if ( message === '*' ) {
		var side = caption.css( 'caption-side' );
		if ( side !== position ) {
			return null;
		}

		return caption.length ?
			caption.text() :
			'';
	}

	return message;
};







var _exportTextarea = $('<textarea/>')[0];
var _exportData = function ( dt, inOpts )
{
	var config = $.extend( true, {}, {
		rows:           null,
		columns:        '',
		modifier:       {
			search: 'applied',
			order:  'applied'
		},
		orthogonal:     'display',
		stripHtml:      true,
		stripNewlines:  true,
		decodeEntities: true,
		trim:           true,
		format:         {
			header: function ( d ) {
				return strip( d );
			},
			footer: function ( d ) {
				return strip( d );
			},
			body: function ( d ) {
				return strip( d );
			}
		},
		customizeData: null
	}, inOpts );

	var strip = function ( str ) {
		if ( typeof str !== 'string' ) {
			return str;
		}

		// Always remove script tags
		str = str.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

		// Always remove comments
		str = str.replace( /<!\-\-.*?\-\->/g, '' );

		if ( config.stripHtml ) {
			str = str.replace( /<([^>'"]*('[^']*'|"[^"]*")?)*>/g, '' );
		}

		if ( config.trim ) {
			str = str.replace( /^\s+|\s+$/g, '' );
		}

		if ( config.stripNewlines ) {
			str = str.replace( /\n/g, ' ' );
		}

		if ( config.decodeEntities ) {
			_exportTextarea.innerHTML = str;
			str = _exportTextarea.value;
		}

		return str;
	};


	var header = dt.columns( config.columns ).indexes().map( function (idx) {
		var el = dt.column( idx ).header();
		return config.format.header( el.innerHTML, idx, el );
	} ).toArray();

	var footer = dt.table().footer() ?
		dt.columns( config.columns ).indexes().map( function (idx) {
			var el = dt.column( idx ).footer();
			return config.format.footer( el ? el.innerHTML : '', idx, el );
		} ).toArray() :
		null;
	
	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend( {}, config.modifier );
	if ( dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined ) {
		if ( dt.rows( config.rows, $.extend( { selected: true }, modifier ) ).any() ) {
			$.extend( modifier, { selected: true } )
		}
	}

	var rowIndexes = dt.rows( config.rows, modifier ).indexes().toArray();
	var selectedCells = dt.cells( rowIndexes, config.columns );
	var cells = selectedCells
		.render( config.orthogonal )
		.toArray();
	var cellNodes = selectedCells
		.nodes()
		.toArray();

	var columns = header.length;
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for ( var i=0, ien=rows ; i<ien ; i++ ) {
		var row = [ columns ];

		for ( var j=0 ; j<columns ; j++ ) {
			row[j] = config.format.body( cells[ cellCounter ], i, j, cellNodes[ cellCounter ] );
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		footer: footer,
		body:   body
	};

	if ( config.customizeData ) {
		config.customizeData( data );
	}

	return data;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;



// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on( 'init.dt plugin-init.dt', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.buttons || DataTable.defaults.buttons;

	if ( opts && ! settings._buttons ) {
		new Buttons( settings, opts ).container();
	}
} );

function _init ( settings, options ) {
	var api = new DataTable.Api( settings );
	var opts = options
		? options
		: api.init().buttons || DataTable.defaults.buttons;

	return new Buttons( api, opts ).container();
}

// DataTables `dom` feature option
DataTable.ext.feature.push( {
	fnInit: _init,
	cFeature: "B"
} );

// DataTables 2 layout feature
if ( DataTable.ext.features ) {
	DataTable.ext.features.register( 'buttons', _init );
}


return Buttons;
}));


/*!
 * Column visibility buttons for Buttons and DataTables.
 * 2016 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


$.extend( DataTable.ext.buttons, {
	// A collection of column visibility buttons
	colvis: function ( dt, conf ) {
		return {
			extend: 'collection',
			text: function ( dt ) {
				return dt.i18n( 'buttons.colvis', 'Column visibility' );
			},
			className: 'buttons-colvis',
			buttons: [ {
				extend: 'columnsToggle',
				columns: conf.columns,
				columnText: conf.columnText
			} ]
		};
	},

	// Selected columns with individual buttons - toggle column visibility
	columnsToggle: function ( dt, conf ) {
		var columns = dt.columns( conf.columns ).indexes().map( function ( idx ) {
			return {
				extend: 'columnToggle',
				columns: idx,
				columnText: conf.columnText
			};
		} ).toArray();

		return columns;
	},

	// Single button to toggle column visibility
	columnToggle: function ( dt, conf ) {
		return {
			extend: 'columnVisibility',
			columns: conf.columns,
			columnText: conf.columnText
		};
	},

	// Selected columns with individual buttons - set column visibility
	columnsVisibility: function ( dt, conf ) {
		var columns = dt.columns( conf.columns ).indexes().map( function ( idx ) {
			return {
				extend: 'columnVisibility',
				columns: idx,
				visibility: conf.visibility,
				columnText: conf.columnText
			};
		} ).toArray();

		return columns;
	},

	// Single button to set column visibility
	columnVisibility: {
		columns: undefined, // column selector
		text: function ( dt, button, conf ) {
			return conf._columnText( dt, conf );
		},
		className: 'buttons-columnVisibility',
		action: function ( e, dt, button, conf ) {
			var col = dt.columns( conf.columns );
			var curr = col.visible();

			col.visible( conf.visibility !== undefined ?
				conf.visibility :
				! (curr.length ? curr[0] : false )
			);
		},
		init: function ( dt, button, conf ) {
			var that = this;
			button.attr( 'data-cv-idx', conf.columns );

			dt
				.on( 'column-visibility.dt'+conf.namespace, function (e, settings) {
					if ( ! settings.bDestroying && settings.nTable == dt.settings()[0].nTable ) {
						that.active( dt.column( conf.columns ).visible() );
					}
				} )
				.on( 'column-reorder.dt'+conf.namespace, function (e, settings, details) {
					if ( dt.columns( conf.columns ).count() !== 1 ) {
						return;
					}

					// This button controls the same column index but the text for the column has
					// changed
					that.text( conf._columnText( dt, conf ) );

					// Since its a different column, we need to check its visibility
					that.active( dt.column( conf.columns ).visible() );
				} );

			this.active( dt.column( conf.columns ).visible() );
		},
		destroy: function ( dt, button, conf ) {
			dt
				.off( 'column-visibility.dt'+conf.namespace )
				.off( 'column-reorder.dt'+conf.namespace );
		},

		_columnText: function ( dt, conf ) {
			// Use DataTables' internal data structure until this is presented
			// is a public API. The other option is to use
			// `$( column(col).node() ).text()` but the node might not have been
			// populated when Buttons is constructed.
			var idx = dt.column( conf.columns ).index();
			var title = dt.settings()[0].aoColumns[ idx ].sTitle;

			if (! title) {
				title = dt.column(idx).header().innerHTML;
			}

			title = title
				.replace(/\n/g," ")        // remove new lines
				.replace(/<br\s*\/?>/gi, " ")  // replace line breaks with spaces
				.replace(/<select(.*?)<\/select>/g, "") // remove select tags, including options text
				.replace(/<!\-\-.*?\-\->/g, "") // strip HTML comments
				.replace(/<.*?>/g, "")   // strip HTML
				.replace(/^\s+|\s+$/g,""); // trim

			return conf.columnText ?
				conf.columnText( dt, idx, title ) :
				title;
		}
	},


	colvisRestore: {
		className: 'buttons-colvisRestore',

		text: function ( dt ) {
			return dt.i18n( 'buttons.colvisRestore', 'Restore visibility' );
		},

		init: function ( dt, button, conf ) {
			conf._visOriginal = dt.columns().indexes().map( function ( idx ) {
				return dt.column( idx ).visible();
			} ).toArray();
		},

		action: function ( e, dt, button, conf ) {
			dt.columns().every( function ( i ) {
				// Take into account that ColReorder might have disrupted our
				// indexes
				var idx = dt.colReorder && dt.colReorder.transpose ?
					dt.colReorder.transpose( i, 'toOriginal' ) :
					i;

				this.visible( conf._visOriginal[ idx ] );
			} );
		}
	},


	colvisGroup: {
		className: 'buttons-colvisGroup',

		action: function ( e, dt, button, conf ) {
			dt.columns( conf.show ).visible( true, false );
			dt.columns( conf.hide ).visible( false, false );

			dt.columns.adjust();
		},

		show: [],

		hide: []
	}
} );


return DataTable.Buttons;
}));


/*! FixedHeader 3.1.8
 * ©2009-2021 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     3.1.8
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2021 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


var _instCounter = 0;

var FixedHeader = function ( dt, config ) {
	// Sanity check - you just know it will happen
	if ( ! (this instanceof FixedHeader) ) {
		throw "FixedHeader must be initialised with the 'new' keyword.";
	}

	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	dt = new DataTable.Api( dt );

	this.c = $.extend( true, {}, FixedHeader.defaults, config );

	this.s = {
		dt: dt,
		position: {
			theadTop: 0,
			tbodyTop: 0,
			tfootTop: 0,
			tfootBottom: 0,
			width: 0,
			left: 0,
			tfootHeight: 0,
			theadHeight: 0,
			windowHeight: $(window).height(),
			visible: true
		},
		headerMode: null,
		footerMode: null,
		autoWidth: dt.settings()[0].oFeatures.bAutoWidth,
		namespace: '.dtfc'+(_instCounter++),
		scrollLeft: {
			header: -1,
			footer: -1
		},
		enable: true
	};

	this.dom = {
		floatingHeader: null,
		thead: $(dt.table().header()),
		tbody: $(dt.table().body()),
		tfoot: $(dt.table().footer()),
		header: {
			host: null,
			floating: null,
			placeholder: null
		},
		footer: {
			host: null,
			floating: null,
			placeholder: null
		}
	};

	this.dom.header.host = this.dom.thead.parent();
	this.dom.footer.host = this.dom.tfoot.parent();

	var dtSettings = dt.settings()[0];
	if ( dtSettings._fixedHeader ) {
		throw "FixedHeader already initialised on table "+dtSettings.nTable.id;
	}

	dtSettings._fixedHeader = this;

	this._constructor();
};


/*
 * Variable: FixedHeader
 * Purpose:  Prototype for FixedHeader
 * Scope:    global
 */
$.extend( FixedHeader.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * API methods
	 */

	/**
	 * Kill off FH and any events
	 */
	destroy: function () {
		this.s.dt.off( '.dtfc' );
		$(window).off( this.s.namespace );

		if ( this.c.header ) {
			this._modeChange( 'in-place', 'header', true );
		}

		if ( this.c.footer && this.dom.tfoot.length ) {
			this._modeChange( 'in-place', 'footer', true );
		}
	},

	/**
	 * Enable / disable the fixed elements
	 *
	 * @param  {boolean} enable `true` to enable, `false` to disable
	 */
	enable: function ( enable, update )
	{
		this.s.enable = enable;

		if ( update || update === undefined ) {
			this._positions();
			this._scroll( true );
		}
	},

	/**
	 * Get enabled status
	 */
	enabled: function ()
	{
		return this.s.enable;
	},
	
	/**
	 * Set header offset 
	 *
	 * @param  {int} new value for headerOffset
	 */
	headerOffset: function ( offset )
	{
		if ( offset !== undefined ) {
			this.c.headerOffset = offset;
			this.update();
		}

		return this.c.headerOffset;
	},
	
	/**
	 * Set footer offset
	 *
	 * @param  {int} new value for footerOffset
	 */
	footerOffset: function ( offset )
	{
		if ( offset !== undefined ) {
			this.c.footerOffset = offset;
			this.update();
		}

		return this.c.footerOffset;
	},

	
	/**
	 * Recalculate the position of the fixed elements and force them into place
	 */
	update: function ()
	{
		var table = this.s.dt.table().node();

		if ( $(table).is(':visible') ) {
			this.enable( true, false );
		}
		else {
			this.enable( false, false );
		}

		this._positions();
		this._scroll( true );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */
	
	/**
	 * FixedHeader constructor - adding the required event listeners and
	 * simple initialisation
	 *
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;

		$(window)
			.on( 'scroll'+this.s.namespace, function () {
				that._scroll();
			} )
			.on( 'resize'+this.s.namespace, DataTable.util.throttle( function () {
				that.s.position.windowHeight = $(window).height();
				that.update();
			}, 50 ) );

		var autoHeader = $('.fh-fixedHeader');
		if ( ! this.c.headerOffset && autoHeader.length ) {
			this.c.headerOffset = autoHeader.outerHeight();
		}

		var autoFooter = $('.fh-fixedFooter');
		if ( ! this.c.footerOffset && autoFooter.length ) {
			this.c.footerOffset = autoFooter.outerHeight();
		}

		dt.on( 'column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc', function () {
			that.update();
		} );

		dt.on( 'destroy.dtfc', function () {
			that.destroy();
		} );

		this._positions();
		this._scroll();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Clone a fixed item to act as a place holder for the original element
	 * which is moved into a clone of the table element, and moved around the
	 * document to give the fixed effect.
	 *
	 * @param  {string}  item  'header' or 'footer'
	 * @param  {boolean} force Force the clone to happen, or allow automatic
	 *   decision (reuse existing if available)
	 * @private
	 */
	_clone: function ( item, force )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var itemElement = item === 'header' ?
			this.dom.thead :
			this.dom.tfoot;

		if ( ! force && itemDom.floating ) {
			// existing floating element - reuse it
			itemDom.floating.removeClass( 'fixedHeader-floating fixedHeader-locked' );
		}
		else {
			if ( itemDom.floating ) {
				itemDom.placeholder.remove();
				this._unsize( item );
				itemDom.floating.children().detach();
				itemDom.floating.remove();
			}

			itemDom.floating = $( dt.table().node().cloneNode( false ) )
				.css( 'table-layout', 'fixed' )
				.attr( 'aria-hidden', 'true' )
				.removeAttr( 'id' )
				.append( itemElement )
				.appendTo( 'body' );

			// Insert a fake thead/tfoot into the DataTable to stop it jumping around
			itemDom.placeholder = itemElement.clone( false );
			itemDom.placeholder
				.find( '*[id]' )
				.removeAttr( 'id' );

			itemDom.host.prepend( itemDom.placeholder );

			// Clone widths
			this._matchWidths( itemDom.placeholder, itemDom.floating );
		}
	},

	/**
	 * Copy widths from the cells in one element to another. This is required
	 * for the footer as the footer in the main table takes its sizes from the
	 * header columns. That isn't present in the footer so to have it still
	 * align correctly, the sizes need to be copied over. It is also required
	 * for the header when auto width is not enabled
	 *
	 * @param  {jQuery} from Copy widths from
	 * @param  {jQuery} to   Copy widths to
	 * @private
	 */
	_matchWidths: function ( from, to ) {
		var get = function ( name ) {
			return $(name, from)
				.map( function () {
					return $(this).css('width').replace(/[^\d\.]/g, '') * 1;
				} ).toArray();
		};

		var set = function ( name, toWidths ) {
			$(name, to).each( function ( i ) {
				$(this).css( {
					width: toWidths[i],
					minWidth: toWidths[i]
				} );
			} );
		};

		var thWidths = get( 'th' );
		var tdWidths = get( 'td' );

		set( 'th', thWidths );
		set( 'td', tdWidths );
	},

	/**
	 * Remove assigned widths from the cells in an element. This is required
	 * when inserting the footer back into the main table so the size is defined
	 * by the header columns and also when auto width is disabled in the
	 * DataTable.
	 *
	 * @param  {string} item The `header` or `footer`
	 * @private
	 */
	_unsize: function ( item ) {
		var el = this.dom[ item ].floating;

		if ( el && (item === 'footer' || (item === 'header' && ! this.s.autoWidth)) ) {
			$('th, td', el).css( {
				width: '',
				minWidth: ''
			} );
		}
		else if ( el && item === 'header' ) {
			$('th, td', el).css( 'min-width', '' );
		}
	},

	/**
	 * Reposition the floating elements to take account of horizontal page
	 * scroll
	 *
	 * @param  {string} item       The `header` or `footer`
	 * @param  {int}    scrollLeft Document scrollLeft
	 * @private
	 */
	_horizontal: function ( item, scrollLeft )
	{
		var itemDom = this.dom[ item ];
		var position = this.s.position;
		var lastScrollLeft = this.s.scrollLeft;

		if ( itemDom.floating && lastScrollLeft[ item ] !== scrollLeft ) {
			itemDom.floating.css( 'left', position.left - scrollLeft );

			lastScrollLeft[ item ] = scrollLeft;
		}
	},

	/**
	 * Change from one display mode to another. Each fixed item can be in one
	 * of:
	 *
	 * * `in-place` - In the main DataTable
	 * * `in` - Floating over the DataTable
	 * * `below` - (Header only) Fixed to the bottom of the table body
	 * * `above` - (Footer only) Fixed to the top of the table body
	 * 
	 * @param  {string}  mode        Mode that the item should be shown in
	 * @param  {string}  item        'header' or 'footer'
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_modeChange: function ( mode, item, forceChange )
	{
		var dt = this.s.dt;
		var itemDom = this.dom[ item ];
		var position = this.s.position;

		// It isn't trivial to add a !important css attribute...
		var importantWidth = function (w) {
			itemDom.floating.attr('style', function(i,s) {
				return (s || '') + 'width: '+w+'px !important;';
			});
		};

		// Record focus. Browser's will cause input elements to loose focus if
		// they are inserted else where in the doc
		var tablePart = this.dom[ item==='footer' ? 'tfoot' : 'thead' ];
		var focus = $.contains( tablePart[0], document.activeElement ) ?
			document.activeElement :
			null;
		
		if ( focus ) {
			focus.blur();
		}

		if ( mode === 'in-place' ) {
			// Insert the header back into the table's real header
			if ( itemDom.placeholder ) {
				itemDom.placeholder.remove();
				itemDom.placeholder = null;
			}

			this._unsize( item );

			if ( item === 'header' ) {
				itemDom.host.prepend( tablePart );
			}
			else {
				itemDom.host.append( tablePart );
			}

			if ( itemDom.floating ) {
				itemDom.floating.remove();
				itemDom.floating = null;
			}
		}
		else if ( mode === 'in' ) {
			// Remove the header from the read header and insert into a fixed
			// positioned floating table clone
			this._clone( item, forceChange );

			itemDom.floating
				.addClass( 'fixedHeader-floating' )
				.css( item === 'header' ? 'top' : 'bottom', this.c[item+'Offset'] )
				.css( 'left', position.left+'px' );

			importantWidth(position.width);

			if ( item === 'footer' ) {
				itemDom.floating.css( 'top', '' );
			}
		}
		else if ( mode === 'below' ) { // only used for the header
			// Fix the position of the floating header at base of the table body
			this._clone( item, forceChange );

			itemDom.floating
				.addClass( 'fixedHeader-locked' )
				.css( 'top', position.tfootTop - position.theadHeight )
				.css( 'left', position.left+'px' );

			importantWidth(position.width);
		}
		else if ( mode === 'above' ) { // only used for the footer
			// Fix the position of the floating footer at top of the table body
			this._clone( item, forceChange );

			itemDom.floating
				.addClass( 'fixedHeader-locked' )
				.css( 'top', position.tbodyTop )
				.css( 'left', position.left+'px' );

			importantWidth(position.width);
		}

		// Restore focus if it was lost
		if ( focus && focus !== document.activeElement ) {
			setTimeout( function () {
				focus.focus();
			}, 10 );
		}

		this.s.scrollLeft.header = -1;
		this.s.scrollLeft.footer = -1;
		this.s[item+'Mode'] = mode;
	},

	/**
	 * Cache the positional information that is required for the mode
	 * calculations that FixedHeader performs.
	 *
	 * @private
	 */
	_positions: function ()
	{
		var dt = this.s.dt;
		var table = dt.table();
		var position = this.s.position;
		var dom = this.dom;
		var tableNode = $(table.node());

		// Need to use the header and footer that are in the main table,
		// regardless of if they are clones, since they hold the positions we
		// want to measure from
		var thead = tableNode.children('thead');
		var tfoot = tableNode.children('tfoot');
		var tbody = dom.tbody;

		position.visible = tableNode.is(':visible');
		position.width = tableNode.outerWidth();
		position.left = tableNode.offset().left;
		position.theadTop = thead.offset().top;
		position.tbodyTop = tbody.offset().top;
		position.tbodyHeight = tbody.outerHeight();
		position.theadHeight = position.tbodyTop - position.theadTop;

		if ( tfoot.length ) {
			position.tfootTop = tfoot.offset().top;
			position.tfootBottom = position.tfootTop + tfoot.outerHeight();
			position.tfootHeight = position.tfootBottom - position.tfootTop;
		}
		else {
			position.tfootTop = position.tbodyTop + tbody.outerHeight();
			position.tfootBottom = position.tfootTop;
			position.tfootHeight = position.tfootTop;
		}
	},


	/**
	 * Mode calculation - determine what mode the fixed items should be placed
	 * into.
	 *
	 * @param  {boolean} forceChange Force a redraw of the mode, even if already
	 *     in that mode.
	 * @private
	 */
	_scroll: function ( forceChange )
	{
		var windowTop = $(document).scrollTop();
		var windowLeft = $(document).scrollLeft();
		var position = this.s.position;
		var headerMode, footerMode;

		if ( this.c.header ) {
			if ( ! this.s.enable ) {
				headerMode = 'in-place';
			}
			else if ( ! position.visible || windowTop <= position.theadTop - this.c.headerOffset ) {
				headerMode = 'in-place';
			}
			else if ( windowTop <= position.tfootTop - position.theadHeight - this.c.headerOffset ) {
				headerMode = 'in';
			}
			else {
				headerMode = 'below';
			}

			if ( forceChange || headerMode !== this.s.headerMode ) {
				this._modeChange( headerMode, 'header', forceChange );
			}

			this._horizontal( 'header', windowLeft );
		}

		if ( this.c.footer && this.dom.tfoot.length ) {
			if ( ! this.s.enable ) {
				footerMode = 'in-place';
			}
			else if ( ! position.visible || windowTop + position.windowHeight >= position.tfootBottom + this.c.footerOffset ) {
				footerMode = 'in-place';
			}
			else if ( position.windowHeight + windowTop > position.tbodyTop + position.tfootHeight + this.c.footerOffset ) {
				footerMode = 'in';
			}
			else {
				footerMode = 'above';
			}

			if ( forceChange || footerMode !== this.s.footerMode ) {
				this._modeChange( footerMode, 'footer', forceChange );
			}

			this._horizontal( 'footer', windowLeft );
		}
	}
} );


/**
 * Version
 * @type {String}
 * @static
 */
FixedHeader.version = "3.1.8";

/**
 * Defaults
 * @type {Object}
 * @static
 */
FixedHeader.defaults = {
	header: true,
	footer: false,
	headerOffset: 0,
	footerOffset: 0
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interfaces
 */

// Attach for constructor access
$.fn.dataTable.FixedHeader = FixedHeader;
$.fn.DataTable.FixedHeader = FixedHeader;


// DataTables creation - check if the FixedHeader option has been defined on the
// table and if so, initialise
$(document).on( 'init.dt.dtfh', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var init = settings.oInit.fixedHeader;
	var defaults = DataTable.defaults.fixedHeader;

	if ( (init || defaults) && ! settings._fixedHeader ) {
		var opts = $.extend( {}, defaults, init );

		if ( init !== false ) {
			new FixedHeader( settings, opts );
		}
	}
} );

// DataTables API methods
DataTable.Api.register( 'fixedHeader()', function () {} );

DataTable.Api.register( 'fixedHeader.adjust()', function () {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		if ( fh ) {
			fh.update();
		}
	} );
} );

DataTable.Api.register( 'fixedHeader.enable()', function ( flag ) {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		flag = ( flag !== undefined ? flag : true );
		if ( fh && flag !== fh.enabled() ) {
			fh.enable( flag );
		}
	} );
} );

DataTable.Api.register( 'fixedHeader.enabled()', function () {
	if ( this.context.length ) {
		var fh = this.context[0]._fixedHeader;

		if ( fh ) {
			return fh.enabled();
		}
	}

	return false;
} );

DataTable.Api.register( 'fixedHeader.disable()', function ( ) {
	return this.iterator( 'table', function ( ctx ) {
		var fh = ctx._fixedHeader;

		if ( fh && fh.enabled() ) {
			fh.enable( false );
		}
	} );
} );

$.each( ['header', 'footer'], function ( i, el ) {
	DataTable.Api.register( 'fixedHeader.'+el+'Offset()', function ( offset ) {
		var ctx = this.context;

		if ( offset === undefined ) {
			return ctx.length && ctx[0]._fixedHeader ?
				ctx[0]._fixedHeader[el +'Offset']() :
				undefined;
		}

		return this.iterator( 'table', function ( ctx ) {
			var fh = ctx._fixedHeader;

			if ( fh ) {
				fh[ el +'Offset' ]( offset );
			}
		} );
	} );
} );


return FixedHeader;
}));


/*! Responsive 2.2.7
 * 2014-2021 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     2.2.7
 * @file        dataTables.responsive.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014-2021 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * Responsive is a plug-in for the DataTables library that makes use of
 * DataTables' ability to change the visibility of columns, changing the
 * visibility of columns so the displayed columns fit into the table container.
 * The end result is that complex tables will be dynamically adjusted to fit
 * into the viewport, be it on a desktop, tablet or mobile browser.
 *
 * Responsive for DataTables has two modes of operation, which can used
 * individually or combined:
 *
 * * Class name based control - columns assigned class names that match the
 *   breakpoint logic can be shown / hidden as required for each breakpoint.
 * * Automatic control - columns are automatically hidden when there is no
 *   room left to display them. Columns removed from the right.
 *
 * In additional to column visibility control, Responsive also has built into
 * options to use DataTables' child row display to show / hide the information
 * from the table that has been hidden. There are also two modes of operation
 * for this child row display:
 *
 * * Inline - when the control element that the user can use to show / hide
 *   child rows is displayed inside the first column of the table.
 * * Column - where a whole column is dedicated to be the show / hide control.
 *
 * Initialisation of Responsive is performed by:
 *
 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
 *   Responsive will automatically be initialised with the default configuration
 *   options when the DataTable is created.
 * * Using the `responsive` option in the DataTables configuration options. This
 *   can also be used to specify the configuration options, or simply set to
 *   `true` to use the defaults.
 *
 *  @class
 *  @param {object} settings DataTables settings object for the host table
 *  @param {object} [opts] Configuration options
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.3+
 *
 *  @example
 *      $('#example').DataTable( {
 *        responsive: true
 *      } );
 *    } );
 */
var Responsive = function ( settings, opts ) {
	// Sanity check that we are using DataTables 1.10 or newer
	if ( ! DataTable.versionCheck || ! DataTable.versionCheck( '1.10.10' ) ) {
		throw 'DataTables Responsive requires DataTables 1.10.10 or newer';
	}

	this.s = {
		dt: new DataTable.Api( settings ),
		columns: [],
		current: []
	};

	// Check if responsive has already been initialised on this table
	if ( this.s.dt.settings()[0].responsive ) {
		return;
	}

	// details is an object, but for simplicity the user can give it as a string
	// or a boolean
	if ( opts && typeof opts.details === 'string' ) {
		opts.details = { type: opts.details };
	}
	else if ( opts && opts.details === false ) {
		opts.details = { type: false };
	}
	else if ( opts && opts.details === true ) {
		opts.details = { type: 'inline' };
	}

	this.c = $.extend( true, {}, Responsive.defaults, DataTable.defaults.responsive, opts );
	settings.responsive = this;
	this._constructor();
};

$.extend( Responsive.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Initialise the Responsive instance
	 *
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtPrivateSettings = dt.settings()[0];
		var oldWindowWidth = $(window).innerWidth();

		dt.settings()[0]._responsive = this;

		// Use DataTables' throttle function to avoid processor thrashing on
		// resize
		$(window).on( 'resize.dtr orientationchange.dtr', DataTable.util.throttle( function () {
			// iOS has a bug whereby resize can fire when only scrolling
			// See: http://stackoverflow.com/questions/8898412
			var width = $(window).innerWidth();

			if ( width !== oldWindowWidth ) {
				that._resize();
				oldWindowWidth = width;
			}
		} ) );

		// DataTables doesn't currently trigger an event when a row is added, so
		// we need to hook into its private API to enforce the hidden rows when
		// new data is added
		dtPrivateSettings.oApi._fnCallbackReg( dtPrivateSettings, 'aoRowCreatedCallback', function (tr, data, idx) {
			if ( $.inArray( false, that.s.current ) !== -1 ) {
				$('>td, >th', tr).each( function ( i ) {
					var idx = dt.column.index( 'toData', i );

					if ( that.s.current[idx] === false ) {
						$(this).css('display', 'none');
					}
				} );
			}
		} );

		// Destroy event handler
		dt.on( 'destroy.dtr', function () {
			dt.off( '.dtr' );
			$( dt.table().body() ).off( '.dtr' );
			$(window).off( 'resize.dtr orientationchange.dtr' );
			dt.cells('.dtr-control').nodes().to$().removeClass('dtr-control');

			// Restore the columns that we've hidden
			$.each( that.s.current, function ( i, val ) {
				if ( val === false ) {
					that._setColumnVis( i, true );
				}
			} );
		} );

		// Reorder the breakpoints array here in case they have been added out
		// of order
		this.c.breakpoints.sort( function (a, b) {
			return a.width < b.width ? 1 :
				a.width > b.width ? -1 : 0;
		} );

		this._classLogic();
		this._resizeAuto();

		// Details handler
		var details = this.c.details;

		if ( details.type !== false ) {
			that._detailsInit();

			// DataTables will trigger this event on every column it shows and
			// hides individually
			dt.on( 'column-visibility.dtr', function () {
				// Use a small debounce to allow multiple columns to be set together
				if ( that._timer ) {
					clearTimeout( that._timer );
				}

				that._timer = setTimeout( function () {
					that._timer = null;

					that._classLogic();
					that._resizeAuto();
					that._resize(true);

					that._redrawChildren();
				}, 100 );
			} );

			// Redraw the details box on each draw which will happen if the data
			// has changed. This is used until DataTables implements a native
			// `updated` event for rows
			dt.on( 'draw.dtr', function () {
				that._redrawChildren();
			} );

			$(dt.table().node()).addClass( 'dtr-'+details.type );
		}

		dt.on( 'column-reorder.dtr', function (e, settings, details) {
			that._classLogic();
			that._resizeAuto();
			that._resize(true);
		} );

		// Change in column sizes means we need to calc
		dt.on( 'column-sizing.dtr', function () {
			that._resizeAuto();
			that._resize();
		});

		// On Ajax reload we want to reopen any child rows which are displayed
		// by responsive
		dt.on( 'preXhr.dtr', function () {
			var rowIds = [];
			dt.rows().every( function () {
				if ( this.child.isShown() ) {
					rowIds.push( this.id(true) );
				}
			} );

			dt.one( 'draw.dtr', function () {
				that._resizeAuto();
				that._resize();

				dt.rows( rowIds ).every( function () {
					that._detailsDisplay( this, false );
				} );
			} );
		});

		dt
			.on( 'draw.dtr', function () {
				that._controlClass();
			})
			.on( 'init.dtr', function (e, settings, details) {
				if ( e.namespace !== 'dt' ) {
					return;
				}

				that._resizeAuto();
				that._resize();

				// If columns were hidden, then DataTables needs to adjust the
				// column sizing
				if ( $.inArray( false, that.s.current ) ) {
					dt.columns.adjust();
				}
			} );

		// First pass - draw the table for the current viewport size
		this._resize();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Calculate the visibility for the columns in a table for a given
	 * breakpoint. The result is pre-determined based on the class logic if
	 * class names are used to control all columns, but the width of the table
	 * is also used if there are columns which are to be automatically shown
	 * and hidden.
	 *
	 * @param  {string} breakpoint Breakpoint name to use for the calculation
	 * @return {array} Array of boolean values initiating the visibility of each
	 *   column.
	 *  @private
	 */
	_columnsVisiblity: function ( breakpoint )
	{
		var dt = this.s.dt;
		var columns = this.s.columns;
		var i, ien;

		// Create an array that defines the column ordering based first on the
		// column's priority, and secondly the column index. This allows the
		// columns to be removed from the right if the priority matches
		var order = columns
			.map( function ( col, idx ) {
				return {
					columnIdx: idx,
					priority: col.priority
				};
			} )
			.sort( function ( a, b ) {
				if ( a.priority !== b.priority ) {
					return a.priority - b.priority;
				}
				return a.columnIdx - b.columnIdx;
			} );

		// Class logic - determine which columns are in this breakpoint based
		// on the classes. If no class control (i.e. `auto`) then `-` is used
		// to indicate this to the rest of the function
		var display = $.map( columns, function ( col, i ) {
			if ( dt.column(i).visible() === false ) {
				return 'not-visible';
			}
			return col.auto && col.minWidth === null ?
				false :
				col.auto === true ?
					'-' :
					$.inArray( breakpoint, col.includeIn ) !== -1;
		} );

		// Auto column control - first pass: how much width is taken by the
		// ones that must be included from the non-auto columns
		var requiredWidth = 0;
		for ( i=0, ien=display.length ; i<ien ; i++ ) {
			if ( display[i] === true ) {
				requiredWidth += columns[i].minWidth;
			}
		}

		// Second pass, use up any remaining width for other columns. For
		// scrolling tables we need to subtract the width of the scrollbar. It
		// may not be requires which makes this sub-optimal, but it would
		// require another full redraw to make complete use of those extra few
		// pixels
		var scrolling = dt.settings()[0].oScroll;
		var bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0;
		var widthAvailable = dt.table().container().offsetWidth - bar;
		var usedWidth = widthAvailable - requiredWidth;

		// Control column needs to always be included. This makes it sub-
		// optimal in terms of using the available with, but to stop layout
		// thrashing or overflow. Also we need to account for the control column
		// width first so we know how much width is available for the other
		// columns, since the control column might not be the first one shown
		for ( i=0, ien=display.length ; i<ien ; i++ ) {
			if ( columns[i].control ) {
				usedWidth -= columns[i].minWidth;
			}
		}

		// Allow columns to be shown (counting by priority and then right to
		// left) until we run out of room
		var empty = false;
		for ( i=0, ien=order.length ; i<ien ; i++ ) {
			var colIdx = order[i].columnIdx;

			if ( display[colIdx] === '-' && ! columns[colIdx].control && columns[colIdx].minWidth ) {
				// Once we've found a column that won't fit we don't let any
				// others display either, or columns might disappear in the
				// middle of the table
				if ( empty || usedWidth - columns[colIdx].minWidth < 0 ) {
					empty = true;
					display[colIdx] = false;
				}
				else {
					display[colIdx] = true;
				}

				usedWidth -= columns[colIdx].minWidth;
			}
		}

		// Determine if the 'control' column should be shown (if there is one).
		// This is the case when there is a hidden column (that is not the
		// control column). The two loops look inefficient here, but they are
		// trivial and will fly through. We need to know the outcome from the
		// first , before the action in the second can be taken
		var showControl = false;

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( ! columns[i].control && ! columns[i].never && display[i] === false ) {
				showControl = true;
				break;
			}
		}

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( columns[i].control ) {
				display[i] = showControl;
			}

			// Replace not visible string with false from the control column detection above
			if ( display[i] === 'not-visible' ) {
				display[i] = false;
			}
		}

		// Finally we need to make sure that there is at least one column that
		// is visible
		if ( $.inArray( true, display ) === -1 ) {
			display[0] = true;
		}

		return display;
	},


	/**
	 * Create the internal `columns` array with information about the columns
	 * for the table. This includes determining which breakpoints the column
	 * will appear in, based upon class names in the column, which makes up the
	 * vast majority of this method.
	 *
	 * @private
	 */
	_classLogic: function ()
	{
		var that = this;
		var calc = {};
		var breakpoints = this.c.breakpoints;
		var dt = this.s.dt;
		var columns = dt.columns().eq(0).map( function (i) {
			var column = this.column(i);
			var className = column.header().className;
			var priority = dt.settings()[0].aoColumns[i].responsivePriority;
			var dataPriority = column.header().getAttribute('data-priority');

			if ( priority === undefined ) {
				priority = dataPriority === undefined || dataPriority === null?
					10000 :
					dataPriority * 1;
			}

			return {
				className: className,
				includeIn: [],
				auto:      false,
				control:   false,
				never:     className.match(/\bnever\b/) ? true : false,
				priority:  priority
			};
		} );

		// Simply add a breakpoint to `includeIn` array, ensuring that there are
		// no duplicates
		var add = function ( colIdx, name ) {
			var includeIn = columns[ colIdx ].includeIn;

			if ( $.inArray( name, includeIn ) === -1 ) {
				includeIn.push( name );
			}
		};

		var column = function ( colIdx, name, operator, matched ) {
			var size, i, ien;

			if ( ! operator ) {
				columns[ colIdx ].includeIn.push( name );
			}
			else if ( operator === 'max-' ) {
				// Add this breakpoint and all smaller
				size = that._find( name ).width;

				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].width <= size ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
			else if ( operator === 'min-' ) {
				// Add this breakpoint and all larger
				size = that._find( name ).width;

				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].width >= size ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
			else if ( operator === 'not-' ) {
				// Add all but this breakpoint
				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].name.indexOf( matched ) === -1 ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
		};

		// Loop over each column and determine if it has a responsive control
		// class
		columns.each( function ( col, i ) {
			var classNames = col.className.split(' ');
			var hasClass = false;

			// Split the class name up so multiple rules can be applied if needed
			for ( var k=0, ken=classNames.length ; k<ken ; k++ ) {
				var className = classNames[k].trim();

				if ( className === 'all' ) {
					// Include in all
					hasClass = true;
					col.includeIn = $.map( breakpoints, function (a) {
						return a.name;
					} );
					return;
				}
				else if ( className === 'none' || col.never ) {
					// Include in none (default) and no auto
					hasClass = true;
					return;
				}
				else if ( className === 'control' || className === 'dtr-control' ) {
					// Special column that is only visible, when one of the other
					// columns is hidden. This is used for the details control
					hasClass = true;
					col.control = true;
					return;
				}

				$.each( breakpoints, function ( j, breakpoint ) {
					// Does this column have a class that matches this breakpoint?
					var brokenPoint = breakpoint.name.split('-');
					var re = new RegExp( '(min\\-|max\\-|not\\-)?('+brokenPoint[0]+')(\\-[_a-zA-Z0-9])?' );
					var match = className.match( re );

					if ( match ) {
						hasClass = true;

						if ( match[2] === brokenPoint[0] && match[3] === '-'+brokenPoint[1] ) {
							// Class name matches breakpoint name fully
							column( i, breakpoint.name, match[1], match[2]+match[3] );
						}
						else if ( match[2] === brokenPoint[0] && ! match[3] ) {
							// Class name matched primary breakpoint name with no qualifier
							column( i, breakpoint.name, match[1], match[2] );
						}
					}
				} );
			}

			// If there was no control class, then automatic sizing is used
			if ( ! hasClass ) {
				col.auto = true;
			}
		} );

		this.s.columns = columns;
	},

	/**
	 * Update the cells to show the correct control class / button
	 * @private
	 */
	_controlClass: function ()
	{
		if ( this.c.details.type === 'inline' ) {
			var dt = this.s.dt;
			var columnsVis = this.s.current;
			var firstVisible = $.inArray(true, columnsVis);

			// Remove from any cells which shouldn't have it
			dt.cells(
				null,
				function(idx) {
					return idx !== firstVisible;
				},
				{page: 'current'}
			)
				.nodes()
				.to$()
				.filter('.dtr-control')
				.removeClass('dtr-control');

			dt.cells(null, firstVisible, {page: 'current'})
				.nodes()
				.to$()
				.addClass('dtr-control');
		}
	},

	/**
	 * Show the details for the child row
	 *
	 * @param  {DataTables.Api} row    API instance for the row
	 * @param  {boolean}        update Update flag
	 * @private
	 */
	_detailsDisplay: function ( row, update )
	{
		var that = this;
		var dt = this.s.dt;
		var details = this.c.details;

		if ( details && details.type !== false ) {
			var res = details.display( row, update, function () {
				return details.renderer(
					dt, row[0], that._detailsObj(row[0])
				);
			} );

			if ( res === true || res === false ) {
				$(dt.table().node()).triggerHandler( 'responsive-display.dt', [dt, row, res, update] );
			}
		}
	},


	/**
	 * Initialisation for the details handler
	 *
	 * @private
	 */
	_detailsInit: function ()
	{
		var that    = this;
		var dt      = this.s.dt;
		var details = this.c.details;

		// The inline type always uses the first child as the target
		if ( details.type === 'inline' ) {
			details.target = 'td.dtr-control, th.dtr-control';
		}

		// Keyboard accessibility
		dt.on( 'draw.dtr', function () {
			that._tabIndexes();
		} );
		that._tabIndexes(); // Initial draw has already happened

		$( dt.table().body() ).on( 'keyup.dtr', 'td, th', function (e) {
			if ( e.keyCode === 13 && $(this).data('dtr-keyboard') ) {
				$(this).click();
			}
		} );

		// type.target can be a string jQuery selector or a column index
		var target   = details.target;
		var selector = typeof target === 'string' ? target : 'td, th';

		if ( target !== undefined || target !== null ) {
			// Click handler to show / hide the details rows when they are available
			$( dt.table().body() )
				.on( 'click.dtr mousedown.dtr mouseup.dtr', selector, function (e) {
					// If the table is not collapsed (i.e. there is no hidden columns)
					// then take no action
					if ( ! $(dt.table().node()).hasClass('collapsed' ) ) {
						return;
					}

					// Check that the row is actually a DataTable's controlled node
					if ( $.inArray( $(this).closest('tr').get(0), dt.rows().nodes().toArray() ) === -1 ) {
						return;
					}

					// For column index, we determine if we should act or not in the
					// handler - otherwise it is already okay
					if ( typeof target === 'number' ) {
						var targetIdx = target < 0 ?
							dt.columns().eq(0).length + target :
							target;

						if ( dt.cell( this ).index().column !== targetIdx ) {
							return;
						}
					}

					// $().closest() includes itself in its check
					var row = dt.row( $(this).closest('tr') );

					// Check event type to do an action
					if ( e.type === 'click' ) {
						// The renderer is given as a function so the caller can execute it
						// only when they need (i.e. if hiding there is no point is running
						// the renderer)
						that._detailsDisplay( row, false );
					}
					else if ( e.type === 'mousedown' ) {
						// For mouse users, prevent the focus ring from showing
						$(this).css('outline', 'none');
					}
					else if ( e.type === 'mouseup' ) {
						// And then re-allow at the end of the click
						$(this).trigger('blur').css('outline', '');
					}
				} );
		}
	},


	/**
	 * Get the details to pass to a renderer for a row
	 * @param  {int} rowIdx Row index
	 * @private
	 */
	_detailsObj: function ( rowIdx )
	{
		var that = this;
		var dt = this.s.dt;

		return $.map( this.s.columns, function( col, i ) {
			// Never and control columns should not be passed to the renderer
			if ( col.never || col.control ) {
				return;
			}

			var dtCol = dt.settings()[0].aoColumns[ i ];

			return {
				className:   dtCol.sClass,
				columnIndex: i,
				data:        dt.cell( rowIdx, i ).render( that.c.orthogonal ),
				hidden:      dt.column( i ).visible() && !that.s.current[ i ],
				rowIndex:    rowIdx,
				title:       dtCol.sTitle !== null ?
					dtCol.sTitle :
					$(dt.column(i).header()).text()
			};
		} );
	},


	/**
	 * Find a breakpoint object from a name
	 *
	 * @param  {string} name Breakpoint name to find
	 * @return {object}      Breakpoint description object
	 * @private
	 */
	_find: function ( name )
	{
		var breakpoints = this.c.breakpoints;

		for ( var i=0, ien=breakpoints.length ; i<ien ; i++ ) {
			if ( breakpoints[i].name === name ) {
				return breakpoints[i];
			}
		}
	},


	/**
	 * Re-create the contents of the child rows as the display has changed in
	 * some way.
	 *
	 * @private
	 */
	_redrawChildren: function ()
	{
		var that = this;
		var dt = this.s.dt;

		dt.rows( {page: 'current'} ).iterator( 'row', function ( settings, idx ) {
			var row = dt.row( idx );

			that._detailsDisplay( dt.row( idx ), true );
		} );
	},


	/**
	 * Alter the table display for a resized viewport. This involves first
	 * determining what breakpoint the window currently is in, getting the
	 * column visibilities to apply and then setting them.
	 *
	 * @param  {boolean} forceRedraw Force a redraw
	 * @private
	 */
	_resize: function (forceRedraw)
	{
		var that = this;
		var dt = this.s.dt;
		var width = $(window).innerWidth();
		var breakpoints = this.c.breakpoints;
		var breakpoint = breakpoints[0].name;
		var columns = this.s.columns;
		var i, ien;
		var oldVis = this.s.current.slice();

		// Determine what breakpoint we are currently at
		for ( i=breakpoints.length-1 ; i>=0 ; i-- ) {
			if ( width <= breakpoints[i].width ) {
				breakpoint = breakpoints[i].name;
				break;
			}
		}
		
		// Show the columns for that break point
		var columnsVis = this._columnsVisiblity( breakpoint );
		this.s.current = columnsVis;

		// Set the class before the column visibility is changed so event
		// listeners know what the state is. Need to determine if there are
		// any columns that are not visible but can be shown
		var collapsedClass = false;
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( columnsVis[i] === false && ! columns[i].never && ! columns[i].control && ! dt.column(i).visible() === false ) {
				collapsedClass = true;
				break;
			}
		}

		$( dt.table().node() ).toggleClass( 'collapsed', collapsedClass );

		var changed = false;
		var visible = 0;

		dt.columns().eq(0).each( function ( colIdx, i ) {
			if ( columnsVis[i] === true ) {
				visible++;
			}

			if ( forceRedraw || columnsVis[i] !== oldVis[i] ) {
				changed = true;
				that._setColumnVis( colIdx, columnsVis[i] );
			}
		} );

		if ( changed ) {
			this._redrawChildren();

			// Inform listeners of the change
			$(dt.table().node()).trigger( 'responsive-resize.dt', [dt, this.s.current] );

			// If no records, update the "No records" display element
			if ( dt.page.info().recordsDisplay === 0 ) {
				$('td', dt.table().body()).eq(0).attr('colspan', visible);
			}
		}

		that._controlClass();
	},


	/**
	 * Determine the width of each column in the table so the auto column hiding
	 * has that information to work with. This method is never going to be 100%
	 * perfect since column widths can change slightly per page, but without
	 * seriously compromising performance this is quite effective.
	 *
	 * @private
	 */
	_resizeAuto: function ()
	{
		var dt = this.s.dt;
		var columns = this.s.columns;

		// Are we allowed to do auto sizing?
		if ( ! this.c.auto ) {
			return;
		}

		// Are there any columns that actually need auto-sizing, or do they all
		// have classes defined
		if ( $.inArray( true, $.map( columns, function (c) { return c.auto; } ) ) === -1 ) {
			return;
		}

		// Need to restore all children. They will be reinstated by a re-render
		if ( ! $.isEmptyObject( _childNodeStore ) ) {
			$.each( _childNodeStore, function ( key ) {
				var idx = key.split('-');

				_childNodesRestore( dt, idx[0]*1, idx[1]*1 );
			} );
		}

		// Clone the table with the current data in it
		var tableWidth   = dt.table().node().offsetWidth;
		var columnWidths = dt.columns;
		var clonedTable  = dt.table().node().cloneNode( false );
		var clonedHeader = $( dt.table().header().cloneNode( false ) ).appendTo( clonedTable );
		var clonedBody   = $( dt.table().body() ).clone( false, false ).empty().appendTo( clonedTable ); // use jQuery because of IE8

		clonedTable.style.width = 'auto';

		// Header
		var headerCells = dt.columns()
			.header()
			.filter( function (idx) {
				return dt.column(idx).visible();
			} )
			.to$()
			.clone( false )
			.css( 'display', 'table-cell' )
			.css( 'width', 'auto' )
			.css( 'min-width', 0 );

		// Body rows - we don't need to take account of DataTables' column
		// visibility since we implement our own here (hence the `display` set)
		$(clonedBody)
			.append( $(dt.rows( { page: 'current' } ).nodes()).clone( false ) )
			.find( 'th, td' ).css( 'display', '' );

		// Footer
		var footer = dt.table().footer();
		if ( footer ) {
			var clonedFooter = $( footer.cloneNode( false ) ).appendTo( clonedTable );
			var footerCells = dt.columns()
				.footer()
				.filter( function (idx) {
					return dt.column(idx).visible();
				} )
				.to$()
				.clone( false )
				.css( 'display', 'table-cell' );

			$('<tr/>')
				.append( footerCells )
				.appendTo( clonedFooter );
		}

		$('<tr/>')
			.append( headerCells )
			.appendTo( clonedHeader );

		// In the inline case extra padding is applied to the first column to
		// give space for the show / hide icon. We need to use this in the
		// calculation
		if ( this.c.details.type === 'inline' ) {
			$(clonedTable).addClass( 'dtr-inline collapsed' );
		}
		
		// It is unsafe to insert elements with the same name into the DOM
		// multiple times. For example, cloning and inserting a checked radio
		// clears the chcecked state of the original radio.
		$( clonedTable ).find( '[name]' ).removeAttr( 'name' );

		// A position absolute table would take the table out of the flow of
		// our container element, bypassing the height and width (Scroller)
		$( clonedTable ).css( 'position', 'relative' )
		
		var inserted = $('<div/>')
			.css( {
				width: 1,
				height: 1,
				overflow: 'hidden',
				clear: 'both'
			} )
			.append( clonedTable );

		inserted.insertBefore( dt.table().node() );

		// The cloned header now contains the smallest that each column can be
		headerCells.each( function (i) {
			var idx = dt.column.index( 'fromVisible', i );
			columns[ idx ].minWidth =  this.offsetWidth || 0;
		} );

		inserted.remove();
	},

	/**
	 * Get the state of the current hidden columns - controlled by Responsive only
	 */
	_responsiveOnlyHidden: function ()
	{
		var dt = this.s.dt;

		return $.map( this.s.current, function (v, i) {
			// If the column is hidden by DataTables then it can't be hidden by
			// Responsive!
			if ( dt.column(i).visible() === false ) {
				return true;
			}
			return v;
		} );
	},

	/**
	 * Set a column's visibility.
	 *
	 * We don't use DataTables' column visibility controls in order to ensure
	 * that column visibility can Responsive can no-exist. Since only IE8+ is
	 * supported (and all evergreen browsers of course) the control of the
	 * display attribute works well.
	 *
	 * @param {integer} col      Column index
	 * @param {boolean} showHide Show or hide (true or false)
	 * @private
	 */
	_setColumnVis: function ( col, showHide )
	{
		var dt = this.s.dt;
		var display = showHide ? '' : 'none'; // empty string will remove the attr

		$( dt.column( col ).header() ).css( 'display', display );
		$( dt.column( col ).footer() ).css( 'display', display );
		dt.column( col ).nodes().to$().css( 'display', display );

		// If the are child nodes stored, we might need to reinsert them
		if ( ! $.isEmptyObject( _childNodeStore ) ) {
			dt.cells( null, col ).indexes().each( function (idx) {
				_childNodesRestore( dt, idx.row, idx.column );
			} );
		}
	},


	/**
	 * Update the cell tab indexes for keyboard accessibility. This is called on
	 * every table draw - that is potentially inefficient, but also the least
	 * complex option given that column visibility can change on the fly. Its a
	 * shame user-focus was removed from CSS 3 UI, as it would have solved this
	 * issue with a single CSS statement.
	 *
	 * @private
	 */
	_tabIndexes: function ()
	{
		var dt = this.s.dt;
		var cells = dt.cells( { page: 'current' } ).nodes().to$();
		var ctx = dt.settings()[0];
		var target = this.c.details.target;

		cells.filter( '[data-dtr-keyboard]' ).removeData( '[data-dtr-keyboard]' );

		if ( typeof target === 'number' ) {
			dt.cells( null, target, { page: 'current' } ).nodes().to$()
				.attr( 'tabIndex', ctx.iTabIndex )
				.data( 'dtr-keyboard', 1 );
		}
		else {
			// This is a bit of a hack - we need to limit the selected nodes to just
			// those of this table
			if ( target === 'td:first-child, th:first-child' ) {
				target = '>td:first-child, >th:first-child';
			}

			$( target, dt.rows( { page: 'current' } ).nodes() )
				.attr( 'tabIndex', ctx.iTabIndex )
				.data( 'dtr-keyboard', 1 );
		}
	}
} );


/**
 * List of default breakpoints. Each item in the array is an object with two
 * properties:
 *
 * * `name` - the breakpoint name.
 * * `width` - the breakpoint width
 *
 * @name Responsive.breakpoints
 * @static
 */
Responsive.breakpoints = [
	{ name: 'desktop',  width: Infinity },
	{ name: 'tablet-l', width: 1024 },
	{ name: 'tablet-p', width: 768 },
	{ name: 'mobile-l', width: 480 },
	{ name: 'mobile-p', width: 320 }
];


/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.display = {
	childRow: function ( row, update, render ) {
		if ( update ) {
			if ( $(row.node()).hasClass('parent') ) {
				row.child( render(), 'child' ).show();

				return true;
			}
		}
		else {
			if ( ! row.child.isShown()  ) {
				row.child( render(), 'child' ).show();
				$( row.node() ).addClass( 'parent' );

				return true;
			}
			else {
				row.child( false );
				$( row.node() ).removeClass( 'parent' );

				return false;
			}
		}
	},

	childRowImmediate: function ( row, update, render ) {
		if ( (! update && row.child.isShown()) || ! row.responsive.hasHidden() ) {
			// User interaction and the row is show, or nothing to show
			row.child( false );
			$( row.node() ).removeClass( 'parent' );

			return false;
		}
		else {
			// Display
			row.child( render(), 'child' ).show();
			$( row.node() ).addClass( 'parent' );

			return true;
		}
	},

	// This is a wrapper so the modal options for Bootstrap and jQuery UI can
	// have options passed into them. This specific one doesn't need to be a
	// function but it is for consistency in the `modal` name
	modal: function ( options ) {
		return function ( row, update, render ) {
			if ( ! update ) {
				// Show a modal
				var close = function () {
					modal.remove(); // will tidy events for us
					$(document).off( 'keypress.dtr' );
				};

				var modal = $('<div class="dtr-modal"/>')
					.append( $('<div class="dtr-modal-display"/>')
						.append( $('<div class="dtr-modal-content"/>')
							.append( render() )
						)
						.append( $('<div class="dtr-modal-close">&times;</div>' )
							.click( function () {
								close();
							} )
						)
					)
					.append( $('<div class="dtr-modal-background"/>')
						.click( function () {
							close();
						} )
					)
					.appendTo( 'body' );

				$(document).on( 'keyup.dtr', function (e) {
					if ( e.keyCode === 27 ) {
						e.stopPropagation();

						close();
					}
				} );
			}
			else {
				$('div.dtr-modal-content')
					.empty()
					.append( render() );
			}

			if ( options && options.header ) {
				$('div.dtr-modal-content').prepend(
					'<h2>'+options.header( row )+'</h2>'
				);
			}
		};
	}
};


var _childNodeStore = {};

function _childNodes( dt, row, col ) {
	var name = row+'-'+col;

	if ( _childNodeStore[ name ] ) {
		return _childNodeStore[ name ];
	}

	// https://jsperf.com/childnodes-array-slice-vs-loop
	var nodes = [];
	var children = dt.cell( row, col ).node().childNodes;
	for ( var i=0, ien=children.length ; i<ien ; i++ ) {
		nodes.push( children[i] );
	}

	_childNodeStore[ name ] = nodes;

	return nodes;
}

function _childNodesRestore( dt, row, col ) {
	var name = row+'-'+col;

	if ( ! _childNodeStore[ name ] ) {
		return;
	}

	var node = dt.cell( row, col ).node();
	var store = _childNodeStore[ name ];
	var parent = store[0].parentNode;
	var parentChildren = parent.childNodes;
	var a = [];

	for ( var i=0, ien=parentChildren.length ; i<ien ; i++ ) {
		a.push( parentChildren[i] );
	}

	for ( var j=0, jen=a.length ; j<jen ; j++ ) {
		node.appendChild( a[j] );
	}

	_childNodeStore[ name ] = undefined;
}


/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.renderer = {
	listHiddenNodes: function () {
		return function ( api, rowIdx, columns ) {
			var ul = $('<ul data-dtr-index="'+rowIdx+'" class="dtr-details"/>');
			var found = false;

			var data = $.each( columns, function ( i, col ) {
				if ( col.hidden ) {
					var klass = col.className ?
						'class="'+ col.className +'"' :
						'';
	
					$(
						'<li '+klass+' data-dtr-index="'+col.columnIndex+'" data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
							'<span class="dtr-title">'+
								col.title+
							'</span> '+
						'</li>'
					)
						.append( $('<span class="dtr-data"/>').append( _childNodes( api, col.rowIndex, col.columnIndex ) ) )// api.cell( col.rowIndex, col.columnIndex ).node().childNodes ) )
						.appendTo( ul );

					found = true;
				}
			} );

			return found ?
				ul :
				false;
		};
	},

	listHidden: function () {
		return function ( api, rowIdx, columns ) {
			var data = $.map( columns, function ( col ) {
				var klass = col.className ?
					'class="'+ col.className +'"' :
					'';

				return col.hidden ?
					'<li '+klass+' data-dtr-index="'+col.columnIndex+'" data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
						'<span class="dtr-title">'+
							col.title+
						'</span> '+
						'<span class="dtr-data">'+
							col.data+
						'</span>'+
					'</li>' :
					'';
			} ).join('');

			return data ?
				$('<ul data-dtr-index="'+rowIdx+'" class="dtr-details"/>').append( data ) :
				false;
		}
	},

	tableAll: function ( options ) {
		options = $.extend( {
			tableClass: ''
		}, options );

		return function ( api, rowIdx, columns ) {
			var data = $.map( columns, function ( col ) {
				var klass = col.className ?
					'class="'+ col.className +'"' :
					'';

				return '<tr '+klass+' data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
						'<td>'+col.title+':'+'</td> '+
						'<td>'+col.data+'</td>'+
					'</tr>';
			} ).join('');

			return $('<table class="'+options.tableClass+' dtr-details" width="100%"/>').append( data );
		}
	}
};

/**
 * Responsive default settings for initialisation
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.defaults = {
	/**
	 * List of breakpoints for the instance. Note that this means that each
	 * instance can have its own breakpoints. Additionally, the breakpoints
	 * cannot be changed once an instance has been creased.
	 *
	 * @type {Array}
	 * @default Takes the value of `Responsive.breakpoints`
	 */
	breakpoints: Responsive.breakpoints,

	/**
	 * Enable / disable auto hiding calculations. It can help to increase
	 * performance slightly if you disable this option, but all columns would
	 * need to have breakpoint classes assigned to them
	 *
	 * @type {Boolean}
	 * @default  `true`
	 */
	auto: true,

	/**
	 * Details control. If given as a string value, the `type` property of the
	 * default object is set to that value, and the defaults used for the rest
	 * of the object - this is for ease of implementation.
	 *
	 * The object consists of the following properties:
	 *
	 * * `display` - A function that is used to show and hide the hidden details
	 * * `renderer` - function that is called for display of the child row data.
	 *   The default function will show the data from the hidden columns
	 * * `target` - Used as the selector for what objects to attach the child
	 *   open / close to
	 * * `type` - `false` to disable the details display, `inline` or `column`
	 *   for the two control types
	 *
	 * @type {Object|string}
	 */
	details: {
		display: Responsive.display.childRow,

		renderer: Responsive.renderer.listHidden(),

		target: 0,

		type: 'inline'
	},

	/**
	 * Orthogonal data request option. This is used to define the data type
	 * requested when Responsive gets the data to show in the child row.
	 *
	 * @type {String}
	 */
	orthogonal: 'display'
};


/*
 * API
 */
var Api = $.fn.dataTable.Api;

// Doesn't do anything - work around for a bug in DT... Not documented
Api.register( 'responsive()', function () {
	return this;
} );

Api.register( 'responsive.index()', function ( li ) {
	li = $(li);

	return {
		column: li.data('dtr-index'),
		row:    li.parent().data('dtr-index')
	};
} );

Api.register( 'responsive.rebuild()', function () {
	return this.iterator( 'table', function ( ctx ) {
		if ( ctx._responsive ) {
			ctx._responsive._classLogic();
		}
	} );
} );

Api.register( 'responsive.recalc()', function () {
	return this.iterator( 'table', function ( ctx ) {
		if ( ctx._responsive ) {
			ctx._responsive._resizeAuto();
			ctx._responsive._resize();
		}
	} );
} );

Api.register( 'responsive.hasHidden()', function () {
	var ctx = this.context[0];

	return ctx._responsive ?
		$.inArray( false, ctx._responsive._responsiveOnlyHidden() ) !== -1 :
		false;
} );

Api.registerPlural( 'columns().responsiveHidden()', 'column().responsiveHidden()', function () {
	return this.iterator( 'column', function ( settings, column ) {
		return settings._responsive ?
			settings._responsive._responsiveOnlyHidden()[ column ] :
			false;
	}, 1 );
} );


/**
 * Version information
 *
 * @name Responsive.version
 * @static
 */
Responsive.version = '2.2.7';


$.fn.dataTable.Responsive = Responsive;
$.fn.DataTable.Responsive = Responsive;

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'preInit.dt.dtr', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	if ( $(settings.nTable).hasClass( 'responsive' ) ||
		 $(settings.nTable).hasClass( 'dt-responsive' ) ||
		 settings.oInit.responsive ||
		 DataTable.defaults.responsive
	) {
		var init = settings.oInit.responsive;

		if ( init !== false ) {
			new Responsive( settings, $.isPlainObject( init ) ? init : {}  );
		}
	}
} );


return Responsive;
}));


/*! Scroller 2.0.3
 * ©2011-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Scroller
 * @description Virtual rendering for DataTables
 * @version     2.0.3
 * @file        dataTables.scroller.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2011-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * Scroller is a virtual rendering plug-in for DataTables which allows large
 * datasets to be drawn on screen every quickly. What the virtual rendering means
 * is that only the visible portion of the table (and a bit to either side to make
 * the scrolling smooth) is drawn, while the scrolling container gives the
 * visual impression that the whole table is visible. This is done by making use
 * of the pagination abilities of DataTables and moving the table around in the
 * scrolling container DataTables adds to the page. The scrolling container is
 * forced to the height it would be for the full table display using an extra
 * element.
 *
 * Note that rows in the table MUST all be the same height. Information in a cell
 * which expands on to multiple lines will cause some odd behaviour in the scrolling.
 *
 * Scroller is initialised by simply including the letter 'S' in the sDom for the
 * table you want to have this feature enabled on. Note that the 'S' must come
 * AFTER the 't' parameter in `dom`.
 *
 * Key features include:
 *   <ul class="limit_length">
 *     <li>Speed! The aim of Scroller for DataTables is to make rendering large data sets fast</li>
 *     <li>Full compatibility with deferred rendering in DataTables for maximum speed</li>
 *     <li>Display millions of rows</li>
 *     <li>Integration with state saving in DataTables (scrolling position is saved)</li>
 *     <li>Easy to use</li>
 *   </ul>
 *
 *  @class
 *  @constructor
 *  @global
 *  @param {object} dt DataTables settings object or API instance
 *  @param {object} [opts={}] Configuration object for FixedColumns. Options 
 *    are defined by {@link Scroller.defaults}
 *
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.0+
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').DataTable( {
 *            "scrollY": "200px",
 *            "ajax": "media/dataset/large.txt",
 *            "scroller": true,
 *            "deferRender": true
 *        } );
 *    } );
 */
var Scroller = function ( dt, opts ) {
	/* Sanity check - you just know it will happen */
	if ( ! (this instanceof Scroller) ) {
		alert( "Scroller warning: Scroller must be initialised with the 'new' keyword." );
		return;
	}

	if ( opts === undefined ) {
		opts = {};
	}

	var dtApi = $.fn.dataTable.Api( dt );

	/**
	 * Settings object which contains customisable information for the Scroller instance
	 * @namespace
	 * @private
	 * @extends Scroller.defaults
	 */
	this.s = {
		/**
		 * DataTables settings object
		 *  @type     object
		 *  @default  Passed in as first parameter to constructor
		 */
		dt: dtApi.settings()[0],

		/**
		 * DataTables API instance
		 *  @type     DataTable.Api
		 */
		dtApi: dtApi,

		/**
		 * Pixel location of the top of the drawn table in the viewport
		 *  @type     int
		 *  @default  0
		 */
		tableTop: 0,

		/**
		 * Pixel location of the bottom of the drawn table in the viewport
		 *  @type     int
		 *  @default  0
		 */
		tableBottom: 0,

		/**
		 * Pixel location of the boundary for when the next data set should be loaded and drawn
		 * when scrolling up the way.
		 *  @type     int
		 *  @default  0
		 *  @private
		 */
		redrawTop: 0,

		/**
		 * Pixel location of the boundary for when the next data set should be loaded and drawn
		 * when scrolling down the way. Note that this is actually calculated as the offset from
		 * the top.
		 *  @type     int
		 *  @default  0
		 *  @private
		 */
		redrawBottom: 0,

		/**
		 * Auto row height or not indicator
		 *  @type     bool
		 *  @default  0
		 */
		autoHeight: true,

		/**
		 * Number of rows calculated as visible in the visible viewport
		 *  @type     int
		 *  @default  0
		 */
		viewportRows: 0,

		/**
		 * setTimeout reference for state saving, used when state saving is enabled in the DataTable
		 * and when the user scrolls the viewport in order to stop the cookie set taking too much
		 * CPU!
		 *  @type     int
		 *  @default  0
		 */
		stateTO: null,

		stateSaveThrottle: function () {},

		/**
		 * setTimeout reference for the redraw, used when server-side processing is enabled in the
		 * DataTables in order to prevent DoSing the server
		 *  @type     int
		 *  @default  null
		 */
		drawTO: null,

		heights: {
			jump: null,
			page: null,
			virtual: null,
			scroll: null,

			/**
			 * Height of rows in the table
			 *  @type     int
			 *  @default  0
			 */
			row: null,

			/**
			 * Pixel height of the viewport
			 *  @type     int
			 *  @default  0
			 */
			viewport: null,
			labelFactor: 1
		},

		topRowFloat: 0,
		scrollDrawDiff: null,
		loaderVisible: false,
		forceReposition: false,
		baseRowTop: 0,
		baseScrollTop: 0,
		mousedown: false,
		lastScrollTop: 0
	};

	// @todo The defaults should extend a `c` property and the internal settings
	// only held in the `s` property. At the moment they are mixed
	this.s = $.extend( this.s, Scroller.oDefaults, opts );

	// Workaround for row height being read from height object (see above comment)
	this.s.heights.row = this.s.rowHeight;

	/**
	 * DOM elements used by the class instance
	 * @private
	 * @namespace
	 *
	 */
	this.dom = {
		"force":    document.createElement('div'),
		"label":    $('<div class="dts_label">0</div>'),
		"scroller": null,
		"table":    null,
		"loader":   null
	};

	// Attach the instance to the DataTables instance so it can be accessed in
	// future. Don't initialise Scroller twice on the same table
	if ( this.s.dt.oScroller ) {
		return;
	}

	this.s.dt.oScroller = this;

	/* Let's do it */
	this.construct();
};



$.extend( Scroller.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods - to be exposed via the DataTables API
	 */

	/**
	 * Calculate and store information about how many rows are to be displayed
	 * in the scrolling viewport, based on current dimensions in the browser's
	 * rendering. This can be particularly useful if the table is initially
	 * drawn in a hidden element - for example in a tab.
	 *  @param {bool} [redraw=true] Redraw the table automatically after the recalculation, with
	 *    the new dimensions forming the basis for the draw.
	 *  @returns {void}
	 */
	measure: function ( redraw )
	{
		if ( this.s.autoHeight )
		{
			this._calcRowHeight();
		}

		var heights = this.s.heights;

		if ( heights.row ) {
			heights.viewport = this._parseHeight($(this.dom.scroller).css('max-height'));

			this.s.viewportRows = parseInt( heights.viewport / heights.row, 10 )+1;
			this.s.dt._iDisplayLength = this.s.viewportRows * this.s.displayBuffer;
		}

		var label = this.dom.label.outerHeight();
		heights.labelFactor = (heights.viewport-label) / heights.scroll;

		if ( redraw === undefined || redraw )
		{
			this.s.dt.oInstance.fnDraw( false );
		}
	},

	/**
	 * Get information about current displayed record range. This corresponds to
	 * the information usually displayed in the "Info" block of the table.
	 *
	 * @returns {object} info as an object:
	 *  {
	 *      start: {int}, // the 0-indexed record at the top of the viewport
	 *      end:   {int}, // the 0-indexed record at the bottom of the viewport
	 *  }
	*/
	pageInfo: function()
	{
		var 
			dt = this.s.dt,
			iScrollTop = this.dom.scroller.scrollTop,
			iTotal = dt.fnRecordsDisplay(),
			iPossibleEnd = Math.ceil(this.pixelsToRow(iScrollTop + this.s.heights.viewport, false, this.s.ani));

		return {
			start: Math.floor(this.pixelsToRow(iScrollTop, false, this.s.ani)),
			end: iTotal < iPossibleEnd ? iTotal-1 : iPossibleEnd-1
		};
	},

	/**
	 * Calculate the row number that will be found at the given pixel position
	 * (y-scroll).
	 *
	 * Please note that when the height of the full table exceeds 1 million
	 * pixels, Scroller switches into a non-linear mode for the scrollbar to fit
	 * all of the records into a finite area, but this function returns a linear
	 * value (relative to the last non-linear positioning).
	 *  @param {int} pixels Offset from top to calculate the row number of
	 *  @param {int} [intParse=true] If an integer value should be returned
	 *  @param {int} [virtual=false] Perform the calculations in the virtual domain
	 *  @returns {int} Row index
	 */
	pixelsToRow: function ( pixels, intParse, virtual )
	{
		var diff = pixels - this.s.baseScrollTop;
		var row = virtual ?
			(this._domain( 'physicalToVirtual', this.s.baseScrollTop ) + diff) / this.s.heights.row :
			( diff / this.s.heights.row ) + this.s.baseRowTop;

		return intParse || intParse === undefined ?
			parseInt( row, 10 ) :
			row;
	},

	/**
	 * Calculate the pixel position from the top of the scrolling container for
	 * a given row
	 *  @param {int} iRow Row number to calculate the position of
	 *  @returns {int} Pixels
	 */
	rowToPixels: function ( rowIdx, intParse, virtual )
	{
		var pixels;
		var diff = rowIdx - this.s.baseRowTop;

		if ( virtual ) {
			pixels = this._domain( 'virtualToPhysical', this.s.baseScrollTop );
			pixels += diff * this.s.heights.row;
		}
		else {
			pixels = this.s.baseScrollTop;
			pixels += diff * this.s.heights.row;
		}

		return intParse || intParse === undefined ?
			parseInt( pixels, 10 ) :
			pixels;
	},


	/**
	 * Calculate the row number that will be found at the given pixel position (y-scroll)
	 *  @param {int} row Row index to scroll to
	 *  @param {bool} [animate=true] Animate the transition or not
	 *  @returns {void}
	 */
	scrollToRow: function ( row, animate )
	{
		var that = this;
		var ani = false;
		var px = this.rowToPixels( row );

		// We need to know if the table will redraw or not before doing the
		// scroll. If it will not redraw, then we need to use the currently
		// displayed table, and scroll with the physical pixels. Otherwise, we
		// need to calculate the table's new position from the virtual
		// transform.
		var preRows = ((this.s.displayBuffer-1)/2) * this.s.viewportRows;
		var drawRow = row - preRows;
		if ( drawRow < 0 ) {
			drawRow = 0;
		}

		if ( (px > this.s.redrawBottom || px < this.s.redrawTop) && this.s.dt._iDisplayStart !== drawRow ) {
			ani = true;
			px = this._domain( 'virtualToPhysical', row * this.s.heights.row );

			// If we need records outside the current draw region, but the new
			// scrolling position is inside that (due to the non-linear nature
			// for larger numbers of records), we need to force position update.
			if ( this.s.redrawTop < px && px < this.s.redrawBottom ) {
				this.s.forceReposition = true;
				animate = false;
			}
		}

		if ( animate === undefined || animate )
		{
			this.s.ani = ani;
			$(this.dom.scroller).animate( {
				"scrollTop": px
			}, function () {
				// This needs to happen after the animation has completed and
				// the final scroll event fired
				setTimeout( function () {
					that.s.ani = false;
				}, 250 );
			} );
		}
		else
		{
			$(this.dom.scroller).scrollTop( px );
		}
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Initialisation for Scroller
	 *  @returns {void}
	 *  @private
	 */
	construct: function ()
	{
		var that = this;
		var dt = this.s.dtApi;

		/* Sanity check */
		if ( !this.s.dt.oFeatures.bPaginate ) {
			this.s.dt.oApi._fnLog( this.s.dt, 0, 'Pagination must be enabled for Scroller' );
			return;
		}

		/* Insert a div element that we can use to force the DT scrolling container to
		 * the height that would be required if the whole table was being displayed
		 */
		this.dom.force.style.position = "relative";
		this.dom.force.style.top = "0px";
		this.dom.force.style.left = "0px";
		this.dom.force.style.width = "1px";

		this.dom.scroller = $('div.'+this.s.dt.oClasses.sScrollBody, this.s.dt.nTableWrapper)[0];
		this.dom.scroller.appendChild( this.dom.force );
		this.dom.scroller.style.position = "relative";

		this.dom.table = $('>table', this.dom.scroller)[0];
		this.dom.table.style.position = "absolute";
		this.dom.table.style.top = "0px";
		this.dom.table.style.left = "0px";

		// Add class to 'announce' that we are a Scroller table
		$(dt.table().container()).addClass('dts DTS');

		// Add a 'loading' indicator
		if ( this.s.loadingIndicator )
		{
			this.dom.loader = $('<div class="dataTables_processing dts_loading">'+this.s.dt.oLanguage.sLoadingRecords+'</div>')
				.css('display', 'none');

			$(this.dom.scroller.parentNode)
				.css('position', 'relative')
				.append( this.dom.loader );
		}

		this.dom.label.appendTo(this.dom.scroller);

		/* Initial size calculations */
		if ( this.s.heights.row && this.s.heights.row != 'auto' )
		{
			this.s.autoHeight = false;
		}

		// Scrolling callback to see if a page change is needed
		this.s.ingnoreScroll = true;
		$(this.dom.scroller).on( 'scroll.dt-scroller', function (e) {
			that._scroll.call( that );
		} );

		// In iOS we catch the touchstart event in case the user tries to scroll
		// while the display is already scrolling
		$(this.dom.scroller).on('touchstart.dt-scroller', function () {
			that._scroll.call( that );
		} );

		$(this.dom.scroller)
			.on('mousedown.dt-scroller', function () {
				that.s.mousedown = true;
			})
			.on('mouseup.dt-scroller', function () {
				that.s.labelVisible = false;
				that.s.mousedown = false;
				that.dom.label.css('display', 'none');
			});

		// On resize, update the information element, since the number of rows shown might change
		$(window).on( 'resize.dt-scroller', function () {
			that.measure( false );
			that._info();
		} );

		// Add a state saving parameter to the DT state saving so we can restore the exact
		// position of the scrolling.
		var initialStateSave = true;
		var loadedState = dt.state.loaded();

		dt.on( 'stateSaveParams.scroller', function ( e, settings, data ) {
			if ( initialStateSave && loadedState ) {
				data.scroller = loadedState.scroller;
				initialStateSave = false;
			}
			else {
				// Need to used the saved position on init
				data.scroller = {
					topRow: that.s.topRowFloat,
					baseScrollTop: that.s.baseScrollTop,
					baseRowTop: that.s.baseRowTop,
					scrollTop: that.s.lastScrollTop
				};
			}
		} );

		if ( loadedState && loadedState.scroller ) {
			this.s.topRowFloat = loadedState.scroller.topRow;
			this.s.baseScrollTop = loadedState.scroller.baseScrollTop;
			this.s.baseRowTop = loadedState.scroller.baseRowTop;
		}

		this.measure( false );
	
		that.s.stateSaveThrottle = that.s.dt.oApi._fnThrottle( function () {
			that.s.dtApi.state.save();
		}, 500 );

		dt.on( 'init.scroller', function () {
			that.measure( false );

			// Setting to `jump` will instruct _draw to calculate the scroll top
			// position
			that.s.scrollType = 'jump';
			that._draw();

			// Update the scroller when the DataTable is redrawn
			dt.on( 'draw.scroller', function () {
				that._draw();
			});
		} );

		// Set height before the draw happens, allowing everything else to update
		// on draw complete without worry for roder.
		dt.on( 'preDraw.dt.scroller', function () {
			that._scrollForce();
		} );

		// Destructor
		dt.on( 'destroy.scroller', function () {
			$(window).off( 'resize.dt-scroller' );
			$(that.dom.scroller).off('.dt-scroller');
			$(that.s.dt.nTable).off( '.scroller' );

			$(that.s.dt.nTableWrapper).removeClass('DTS');
			$('div.DTS_Loading', that.dom.scroller.parentNode).remove();

			that.dom.table.style.position = "";
			that.dom.table.style.top = "";
			that.dom.table.style.left = "";
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Automatic calculation of table row height. This is just a little tricky here as using
	 * initialisation DataTables has tale the table out of the document, so we need to create
	 * a new table and insert it into the document, calculate the row height and then whip the
	 * table out.
	 *  @returns {void}
	 *  @private
	 */
	_calcRowHeight: function ()
	{
		var dt = this.s.dt;
		var origTable = dt.nTable;
		var nTable = origTable.cloneNode( false );
		var tbody = $('<tbody/>').appendTo( nTable );
		var container = $(
			'<div class="'+dt.oClasses.sWrapper+' DTS">'+
				'<div class="'+dt.oClasses.sScrollWrapper+'">'+
					'<div class="'+dt.oClasses.sScrollBody+'"></div>'+
				'</div>'+
			'</div>'
		);

		// Want 3 rows in the sizing table so :first-child and :last-child
		// CSS styles don't come into play - take the size of the middle row
		$('tbody tr:lt(4)', origTable).clone().appendTo( tbody );
        var rowsCount = $('tr', tbody).length;

        if ( rowsCount === 1 ) {
            tbody.prepend('<tr><td>&#160;</td></tr>');
            tbody.append('<tr><td>&#160;</td></tr>');
		}
		else {
            for (; rowsCount < 3; rowsCount++) {
                tbody.append('<tr><td>&#160;</td></tr>');
            }
		}
	
		$('div.'+dt.oClasses.sScrollBody, container).append( nTable );

		// If initialised using `dom`, use the holding element as the insert point
		var insertEl = this.s.dt.nHolding || origTable.parentNode;

		if ( ! $(insertEl).is(':visible') ) {
			insertEl = 'body';
		}

		// Remove form element links as they might select over others (particularly radio and checkboxes)
		container.find("input").removeAttr("name");

		container.appendTo( insertEl );
		this.s.heights.row = $('tr', tbody).eq(1).outerHeight();

		container.remove();
	},

	/**
	 * Draw callback function which is fired when the DataTable is redrawn. The main function of
	 * this method is to position the drawn table correctly the scrolling container for the rows
	 * that is displays as a result of the scrolling position.
	 *  @returns {void}
	 *  @private
	 */
	_draw: function ()
	{
		var
			that = this,
			heights = this.s.heights,
			iScrollTop = this.dom.scroller.scrollTop,
			iTableHeight = $(this.s.dt.nTable).height(),
			displayStart = this.s.dt._iDisplayStart,
			displayLen = this.s.dt._iDisplayLength,
			displayEnd = this.s.dt.fnRecordsDisplay();

		// Disable the scroll event listener while we are updating the DOM
		this.s.skip = true;

		// If paging is reset
		if ( (this.s.dt.bSorted || this.s.dt.bFiltered) && displayStart === 0 && !this.s.dt._drawHold ) {
			this.s.topRowFloat = 0;
		}

		iScrollTop = this.s.scrollType === 'jump' ?
			this._domain( 'virtualToPhysical', this.s.topRowFloat * heights.row ) :
			iScrollTop;

		// Store positional information so positional calculations can be based
		// upon the current table draw position
		this.s.baseScrollTop = iScrollTop;
		this.s.baseRowTop = this.s.topRowFloat;

		// Position the table in the virtual scroller
		var tableTop = iScrollTop - ((this.s.topRowFloat - displayStart) * heights.row);
		if ( displayStart === 0 ) {
			tableTop = 0;
		}
		else if ( displayStart + displayLen >= displayEnd ) {
			tableTop = heights.scroll - iTableHeight;
		}

		this.dom.table.style.top = tableTop+'px';

		/* Cache some information for the scroller */
		this.s.tableTop = tableTop;
		this.s.tableBottom = iTableHeight + this.s.tableTop;

		// Calculate the boundaries for where a redraw will be triggered by the
		// scroll event listener
		var boundaryPx = (iScrollTop - this.s.tableTop) * this.s.boundaryScale;
		this.s.redrawTop = iScrollTop - boundaryPx;
		this.s.redrawBottom = iScrollTop + boundaryPx > heights.scroll - heights.viewport - heights.row ?
			heights.scroll - heights.viewport - heights.row :
			iScrollTop + boundaryPx;

		this.s.skip = false;

		// Restore the scrolling position that was saved by DataTable's state
		// saving Note that this is done on the second draw when data is Ajax
		// sourced, and the first draw when DOM soured
		if ( this.s.dt.oFeatures.bStateSave && this.s.dt.oLoadedState !== null &&
			 typeof this.s.dt.oLoadedState.scroller != 'undefined' )
		{
			// A quirk of DataTables is that the draw callback will occur on an
			// empty set if Ajax sourced, but not if server-side processing.
			var ajaxSourced = (this.s.dt.sAjaxSource || that.s.dt.ajax) && ! this.s.dt.oFeatures.bServerSide ?
				true :
				false;

			if ( ( ajaxSourced && this.s.dt.iDraw == 2) ||
			     (!ajaxSourced && this.s.dt.iDraw == 1) )
			{
				setTimeout( function () {
					$(that.dom.scroller).scrollTop( that.s.dt.oLoadedState.scroller.scrollTop );

					// In order to prevent layout thrashing we need another
					// small delay
					setTimeout( function () {
						that.s.ingnoreScroll = false;
					}, 0 );
				}, 0 );
			}
		}
		else {
			that.s.ingnoreScroll = false;
		}

		// Because of the order of the DT callbacks, the info update will
		// take precedence over the one we want here. So a 'thread' break is
		// needed.  Only add the thread break if bInfo is set
		if ( this.s.dt.oFeatures.bInfo ) {
			setTimeout( function () {
				that._info.call( that );
			}, 0 );
		}

		// Hide the loading indicator
		if ( this.dom.loader && this.s.loaderVisible ) {
			this.dom.loader.css( 'display', 'none' );
			this.s.loaderVisible = false;
		}
	},

	/**
	 * Convert from one domain to another. The physical domain is the actual
	 * pixel count on the screen, while the virtual is if we had browsers which
	 * had scrolling containers of infinite height (i.e. the absolute value)
	 *
	 *  @param {string} dir Domain transform direction, `virtualToPhysical` or
	 *    `physicalToVirtual` 
	 *  @returns {number} Calculated transform
	 *  @private
	 */
	_domain: function ( dir, val )
	{
		var heights = this.s.heights;
		var diff;
		var magic = 10000; // the point at which the non-linear calculations start to happen

		// If the virtual and physical height match, then we use a linear
		// transform between the two, allowing the scrollbar to be linear
		if ( heights.virtual === heights.scroll ) {
			return val;
		}

		// In the first 10k pixels and the last 10k pixels, we want the scrolling
		// to be linear. After that it can be non-linear. It would be unusual for
		// anyone to mouse wheel through that much.
		if ( val < magic ) {
			return val;
		}
		else if ( dir === 'virtualToPhysical' && val >= heights.virtual - magic ) {
			diff = heights.virtual - val;
			return heights.scroll - diff;
		}
		else if ( dir === 'physicalToVirtual' && val >= heights.scroll - magic ) {
			diff = heights.scroll - val;
			return heights.virtual - diff;
		}

		// Otherwise, we want a non-linear scrollbar to take account of the
		// redrawing regions at the start and end of the table, otherwise these
		// can stutter badly - on large tables 30px (for example) scroll might
		// be hundreds of rows, so the table would be redrawing every few px at
		// the start and end. Use a simple linear eq. to stop this, effectively
		// causing a kink in the scrolling ratio. It does mean the scrollbar is
		// non-linear, but with such massive data sets, the scrollbar is going
		// to be a best guess anyway
		var m = (heights.virtual - magic - magic) / (heights.scroll - magic - magic);
		var c = magic - (m*magic);

		return dir === 'virtualToPhysical' ?
			(val-c) / m :
			(m*val) + c;
	},

	/**
	 * Update any information elements that are controlled by the DataTable based on the scrolling
	 * viewport and what rows are visible in it. This function basically acts in the same way as
	 * _fnUpdateInfo in DataTables, and effectively replaces that function.
	 *  @returns {void}
	 *  @private
	 */
	_info: function ()
	{
		if ( !this.s.dt.oFeatures.bInfo )
		{
			return;
		}

		var
			dt = this.s.dt,
			language = dt.oLanguage,
			iScrollTop = this.dom.scroller.scrollTop,
			iStart = Math.floor( this.pixelsToRow(iScrollTop, false, this.s.ani)+1 ),
			iMax = dt.fnRecordsTotal(),
			iTotal = dt.fnRecordsDisplay(),
			iPossibleEnd = Math.ceil( this.pixelsToRow(iScrollTop+this.s.heights.viewport, false, this.s.ani) ),
			iEnd = iTotal < iPossibleEnd ? iTotal : iPossibleEnd,
			sStart = dt.fnFormatNumber( iStart ),
			sEnd = dt.fnFormatNumber( iEnd ),
			sMax = dt.fnFormatNumber( iMax ),
			sTotal = dt.fnFormatNumber( iTotal ),
			sOut;

		if ( dt.fnRecordsDisplay() === 0 &&
			   dt.fnRecordsDisplay() == dt.fnRecordsTotal() )
		{
			/* Empty record set */
			sOut = language.sInfoEmpty+ language.sInfoPostFix;
		}
		else if ( dt.fnRecordsDisplay() === 0 )
		{
			/* Empty record set after filtering */
			sOut = language.sInfoEmpty +' '+
				language.sInfoFiltered.replace('_MAX_', sMax)+
					language.sInfoPostFix;
		}
		else if ( dt.fnRecordsDisplay() == dt.fnRecordsTotal() )
		{
			/* Normal record set */
			sOut = language.sInfo.
					replace('_START_', sStart).
					replace('_END_',   sEnd).
					replace('_MAX_',   sMax).
					replace('_TOTAL_', sTotal)+
				language.sInfoPostFix;
		}
		else
		{
			/* Record set after filtering */
			sOut = language.sInfo.
					replace('_START_', sStart).
					replace('_END_',   sEnd).
					replace('_MAX_',   sMax).
					replace('_TOTAL_', sTotal) +' '+
				language.sInfoFiltered.replace(
					'_MAX_',
					dt.fnFormatNumber(dt.fnRecordsTotal())
				)+
				language.sInfoPostFix;
		}

		var callback = language.fnInfoCallback;
		if ( callback ) {
			sOut = callback.call( dt.oInstance,
				dt, iStart, iEnd, iMax, iTotal, sOut
			);
		}

		var n = dt.aanFeatures.i;
		if ( typeof n != 'undefined' )
		{
			for ( var i=0, iLen=n.length ; i<iLen ; i++ )
			{
				$(n[i]).html( sOut );
			}
		}

		// DT doesn't actually (yet) trigger this event, but it will in future
		$(dt.nTable).triggerHandler( 'info.dt' );
	},

	/**
	 * Parse CSS height property string as number
	 *
	 * An attempt is made to parse the string as a number. Currently supported units are 'px',
	 * 'vh', and 'rem'. 'em' is partially supported; it works as long as the parent element's
	 * font size matches the body element. Zero is returned for unrecognized strings.
	 *  @param {string} cssHeight CSS height property string
	 *  @returns {number} height
	 *  @private
	 */
	_parseHeight: function(cssHeight) {
		var height;
		var matches = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|em|rem|vh)$/.exec(cssHeight);

		if (matches === null) {
			return 0;
		}

		var value = parseFloat(matches[1]);
		var unit = matches[2];

		if ( unit === 'px' ) {
			height = value;
		}
		else if ( unit === 'vh' ) {
			height = ( value / 100 ) * $(window).height();
		}
		else if ( unit === 'rem' ) {
			height = value * parseFloat($(':root').css('font-size'));
		}
		else if ( unit === 'em' ) {
			height = value * parseFloat($('body').css('font-size'));
		}

		return height ?
			height :
			0;
	},

	/**
	 * Scrolling function - fired whenever the scrolling position is changed.
	 * This method needs to use the stored values to see if the table should be
	 * redrawn as we are moving towards the end of the information that is
	 * currently drawn or not. If needed, then it will redraw the table based on
	 * the new position.
	 *  @returns {void}
	 *  @private
	 */
	_scroll: function ()
	{
		var
			that = this,
			heights = this.s.heights,
			iScrollTop = this.dom.scroller.scrollTop,
			iTopRow;

		if ( this.s.skip ) {
			return;
		}

		if ( this.s.ingnoreScroll ) {
			return;
		}

		if ( iScrollTop === this.s.lastScrollTop ) {
			return;
		}

		/* If the table has been sorted or filtered, then we use the redraw that
		 * DataTables as done, rather than performing our own
		 */
		if ( this.s.dt.bFiltered || this.s.dt.bSorted ) {
			this.s.lastScrollTop = 0;
			return;
		}

		/* Update the table's information display for what is now in the viewport */
		this._info();

		/* We don't want to state save on every scroll event - that's heavy
		 * handed, so use a timeout to update the state saving only when the
		 * scrolling has finished
		 */
		clearTimeout( this.s.stateTO );
		this.s.stateTO = setTimeout( function () {
			that.s.dtApi.state.save();
		}, 250 );

		this.s.scrollType = Math.abs(iScrollTop - this.s.lastScrollTop) > heights.viewport ?
			'jump' :
			'cont';

		this.s.topRowFloat = this.s.scrollType === 'cont' ?
			this.pixelsToRow( iScrollTop, false, false ) :
			this._domain( 'physicalToVirtual', iScrollTop ) / heights.row;

		if ( this.s.topRowFloat < 0 ) {
			this.s.topRowFloat = 0;
		}

		/* Check if the scroll point is outside the trigger boundary which would required
		 * a DataTables redraw
		 */
		if ( this.s.forceReposition || iScrollTop < this.s.redrawTop || iScrollTop > this.s.redrawBottom ) {
			var preRows = Math.ceil( ((this.s.displayBuffer-1)/2) * this.s.viewportRows );

			iTopRow = parseInt(this.s.topRowFloat, 10) - preRows;
			this.s.forceReposition = false;

			if ( iTopRow <= 0 ) {
				/* At the start of the table */
				iTopRow = 0;
			}
			else if ( iTopRow + this.s.dt._iDisplayLength > this.s.dt.fnRecordsDisplay() ) {
				/* At the end of the table */
				iTopRow = this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength;
				if ( iTopRow < 0 ) {
					iTopRow = 0;
				}
			}
			else if ( iTopRow % 2 !== 0 ) {
				// For the row-striping classes (odd/even) we want only to start
				// on evens otherwise the stripes will change between draws and
				// look rubbish
				iTopRow++;
			}

			// Store calcuated value, in case the following condition is not met, but so
			// that the draw function will still use it.
			this.s.targetTop = iTopRow;

			if ( iTopRow != this.s.dt._iDisplayStart ) {
				/* Cache the new table position for quick lookups */
				this.s.tableTop = $(this.s.dt.nTable).offset().top;
				this.s.tableBottom = $(this.s.dt.nTable).height() + this.s.tableTop;

				var draw = function () {
					that.s.dt._iDisplayStart = that.s.targetTop;
					that.s.dt.oApi._fnDraw( that.s.dt );
				};

				/* Do the DataTables redraw based on the calculated start point - note that when
				 * using server-side processing we introduce a small delay to not DoS the server...
				 */
				if ( this.s.dt.oFeatures.bServerSide ) {
					this.s.forceReposition = true;

					clearTimeout( this.s.drawTO );
					this.s.drawTO = setTimeout( draw, this.s.serverWait );
				}
				else {
					draw();
				}

				if ( this.dom.loader && ! this.s.loaderVisible ) {
					this.dom.loader.css( 'display', 'block' );
					this.s.loaderVisible = true;
				}
			}
		}
		else {
			this.s.topRowFloat = this.pixelsToRow( iScrollTop, false, true );
		}

		this.s.lastScrollTop = iScrollTop;
		this.s.stateSaveThrottle();

		if ( this.s.scrollType === 'jump' && this.s.mousedown ) {
			this.s.labelVisible = true;
		}
		if (this.s.labelVisible) {
			this.dom.label
				.html( this.s.dt.fnFormatNumber( parseInt( this.s.topRowFloat, 10 )+1 ) )
				.css( 'top', iScrollTop + (iScrollTop * heights.labelFactor ) )
				.css( 'display', 'block' );
		}
	},

	/**
	 * Force the scrolling container to have height beyond that of just the
	 * table that has been drawn so the user can scroll the whole data set.
	 *
	 * Note that if the calculated required scrolling height exceeds a maximum
	 * value (1 million pixels - hard-coded) the forcing element will be set
	 * only to that maximum value and virtual / physical domain transforms will
	 * be used to allow Scroller to display tables of any number of records.
	 *  @returns {void}
	 *  @private
	 */
	_scrollForce: function ()
	{
		var heights = this.s.heights;
		var max = 1000000;

		heights.virtual = heights.row * this.s.dt.fnRecordsDisplay();
		heights.scroll = heights.virtual;

		if ( heights.scroll > max ) {
			heights.scroll = max;
		}

		// Minimum height so there is always a row visible (the 'no rows found'
		// if reduced to zero filtering)
		this.dom.force.style.height = heights.scroll > this.s.heights.row ?
			heights.scroll+'px' :
			this.s.heights.row+'px';
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/**
 * Scroller default settings for initialisation
 *  @namespace
 *  @name Scroller.defaults
 *  @static
 */
Scroller.defaults = {
	/**
	 * Scroller uses the boundary scaling factor to decide when to redraw the table - which it
	 * typically does before you reach the end of the currently loaded data set (in order to
	 * allow the data to look continuous to a user scrolling through the data). If given as 0
	 * then the table will be redrawn whenever the viewport is scrolled, while 1 would not
	 * redraw the table until the currently loaded data has all been shown. You will want
	 * something in the middle - the default factor of 0.5 is usually suitable.
	 *  @type     float
	 *  @default  0.5
	 *  @static
	 */
	boundaryScale: 0.5,

	/**
	 * The display buffer is what Scroller uses to calculate how many rows it should pre-fetch
	 * for scrolling. Scroller automatically adjusts DataTables' display length to pre-fetch
	 * rows that will be shown in "near scrolling" (i.e. just beyond the current display area).
	 * The value is based upon the number of rows that can be displayed in the viewport (i.e.
	 * a value of 1), and will apply the display range to records before before and after the
	 * current viewport - i.e. a factor of 3 will allow Scroller to pre-fetch 1 viewport's worth
	 * of rows before the current viewport, the current viewport's rows and 1 viewport's worth
	 * of rows after the current viewport. Adjusting this value can be useful for ensuring
	 * smooth scrolling based on your data set.
	 *  @type     int
	 *  @default  7
	 *  @static
	 */
	displayBuffer: 9,

	/**
	 * Show (or not) the loading element in the background of the table. Note that you should
	 * include the dataTables.scroller.css file for this to be displayed correctly.
	 *  @type     boolean
	 *  @default  false
	 *  @static
	 */
	loadingIndicator: false,

	/**
	 * Scroller will attempt to automatically calculate the height of rows for it's internal
	 * calculations. However the height that is used can be overridden using this parameter.
	 *  @type     int|string
	 *  @default  auto
	 *  @static
	 */
	rowHeight: "auto",

	/**
	 * When using server-side processing, Scroller will wait a small amount of time to allow
	 * the scrolling to finish before requesting more data from the server. This prevents
	 * you from DoSing your own server! The wait time can be configured by this parameter.
	 *  @type     int
	 *  @default  200
	 *  @static
	 */
	serverWait: 200
};

Scroller.oDefaults = Scroller.defaults;



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Constants
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * Scroller version
 *  @type      String
 *  @default   See code
 *  @name      Scroller.version
 *  @static
 */
Scroller.version = "2.0.3";



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'preInit.dt.dtscroller', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var init = settings.oInit.scroller;
	var defaults = DataTable.defaults.scroller;

	if ( init || defaults ) {
		var opts = $.extend( {}, init, defaults );

		if ( init !== false ) {
			new Scroller( settings, opts  );
		}
	}
} );


// Attach Scroller to DataTables so it can be accessed as an 'extra'
$.fn.dataTable.Scroller = Scroller;
$.fn.DataTable.Scroller = Scroller;


// DataTables 1.10 API method aliases
var Api = $.fn.dataTable.Api;

Api.register( 'scroller()', function () {
	return this;
} );

// Undocumented and deprecated - is it actually useful at all?
Api.register( 'scroller().rowToPixels()', function ( rowIdx, intParse, virtual ) {
	var ctx = this.context;

	if ( ctx.length && ctx[0].oScroller ) {
		return ctx[0].oScroller.rowToPixels( rowIdx, intParse, virtual );
	}
	// undefined
} );

// Undocumented and deprecated - is it actually useful at all?
Api.register( 'scroller().pixelsToRow()', function ( pixels, intParse, virtual ) {
	var ctx = this.context;

	if ( ctx.length && ctx[0].oScroller ) {
		return ctx[0].oScroller.pixelsToRow( pixels, intParse, virtual );
	}
	// undefined
} );

// `scroller().scrollToRow()` is undocumented and deprecated. Use `scroller.toPosition()
Api.register( ['scroller().scrollToRow()', 'scroller.toPosition()'], function ( idx, ani ) {
	this.iterator( 'table', function ( ctx ) {
		if ( ctx.oScroller ) {
			ctx.oScroller.scrollToRow( idx, ani );
		}
	} );

	return this;
} );

Api.register( 'row().scrollTo()', function ( ani ) {
	var that = this;

	this.iterator( 'row', function ( ctx, rowIdx ) {
		if ( ctx.oScroller ) {
			var displayIdx = that
				.rows( { order: 'applied', search: 'applied' } )
				.indexes()
				.indexOf( rowIdx );

			ctx.oScroller.scrollToRow( displayIdx, ani );
		}
	} );

	return this;
} );

Api.register( 'scroller.measure()', function ( redraw ) {
	this.iterator( 'table', function ( ctx ) {
		if ( ctx.oScroller ) {
			ctx.oScroller.measure( redraw );
		}
	} );

	return this;
} );

Api.register( 'scroller.page()', function() {
	var ctx = this.context;

	if ( ctx.length && ctx[0].oScroller ) {
		return ctx[0].oScroller.pageInfo();
	}
	// undefined
} );

return Scroller;
}));


/*! SearchPanes 1.2.2
 * 2019-2020 SpryMedia Ltd - datatables.net/license
 */
(function () {
    'use strict';

    var $;
    var DataTable;
    function setJQuery(jq) {
        $ = jq;
        DataTable = jq.fn.dataTable;
    }
    var SearchPane = /** @class */ (function () {
        /**
         * Creates the panes, sets up the search function
         * @param paneSettings The settings for the searchPanes
         * @param opts The options for the default features
         * @param idx the index of the column for this pane
         * @returns {object} the pane that has been created, including the table and the index of the pane
         */
        function SearchPane(paneSettings, opts, idx, layout, panesContainer, panes) {
            var _this = this;
            if (panes === void 0) { panes = null; }
            // Check that the required version of DataTables is included
            if (!DataTable || !DataTable.versionCheck || !DataTable.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            if (!DataTable.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new DataTable.Api(paneSettings);
            this.classes = $.extend(true, {}, SearchPane.classes);
            // Get options from user
            this.c = $.extend(true, {}, SearchPane.defaults, opts);
            this.customPaneSettings = panes;
            this.s = {
                cascadeRegen: false,
                clearing: false,
                colOpts: [],
                deselect: false,
                displayed: false,
                dt: table,
                dtPane: undefined,
                filteringActive: false,
                index: idx,
                indexes: [],
                lastCascade: false,
                lastSelect: false,
                listSet: false,
                name: undefined,
                redraw: false,
                rowData: {
                    arrayFilter: [],
                    arrayOriginal: [],
                    arrayTotals: [],
                    bins: {},
                    binsOriginal: {},
                    binsTotal: {},
                    filterMap: new Map(),
                    totalOptions: 0
                },
                scrollTop: 0,
                searchFunction: undefined,
                selectPresent: false,
                serverSelect: [],
                serverSelecting: false,
                showFiltered: false,
                tableLength: null,
                updating: false
            };
            var rowLength = table.columns().eq(0).toArray().length;
            this.colExists = this.s.index < rowLength;
            // Add extra elements to DOM object including clear and hide buttons
            this.c.layout = layout;
            var layVal = parseInt(layout.split('-')[1], 10);
            this.dom = {
                buttonGroup: $('<div/>').addClass(this.classes.buttonGroup),
                clear: $('<button type="button">&#215;</button>')
                    .addClass(this.classes.dull)
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.clearButton),
                container: $('<div/>').addClass(this.classes.container).addClass(this.classes.layout +
                    (layVal < 10 ? layout : layout.split('-')[0] + '-9')),
                countButton: $('<button type="button"></button>')
                    .addClass(this.classes.paneButton)
                    .addClass(this.classes.countButton),
                dtP: $('<table><thead><tr><th>' +
                    (this.colExists
                        ? $(table.column(this.colExists ? this.s.index : 0).header()).text()
                        : this.customPaneSettings.header || 'Custom Pane') + '</th><th/></tr></thead></table>'),
                lower: $('<div/>').addClass(this.classes.subRow2).addClass(this.classes.narrowButton),
                nameButton: $('<button type="button"></button>').addClass(this.classes.paneButton).addClass(this.classes.nameButton),
                panesContainer: panesContainer,
                searchBox: $('<input/>').addClass(this.classes.paneInputButton).addClass(this.classes.search),
                searchButton: $('<button type = "button" class="' + this.classes.searchIcon + '"></button>')
                    .addClass(this.classes.paneButton),
                searchCont: $('<div/>').addClass(this.classes.searchCont),
                searchLabelCont: $('<div/>').addClass(this.classes.searchLabelCont),
                topRow: $('<div/>').addClass(this.classes.topRow),
                upper: $('<div/>').addClass(this.classes.subRow1).addClass(this.classes.narrowSearch)
            };
            this.s.displayed = false;
            table = this.s.dt;
            this.selections = [];
            this.s.colOpts = this.colExists ? this._getOptions() : this._getBonusOptions();
            var colOpts = this.s.colOpts;
            var clear = $('<button type="button">X</button>').addClass(this.classes.paneButton);
            $(clear).text(table.i18n('searchPanes.clearPane', 'X'));
            this.dom.container.addClass(colOpts.className);
            this.dom.container.addClass((this.customPaneSettings !== null && this.customPaneSettings.className !== undefined)
                ? this.customPaneSettings.className
                : '');
            // Set the value of name incase ordering is desired
            if (this.s.colOpts.name !== undefined) {
                this.s.name = this.s.colOpts.name;
            }
            else if (this.customPaneSettings !== null && this.customPaneSettings.name !== undefined) {
                this.s.name = this.customPaneSettings.name;
            }
            else {
                this.s.name = this.colExists ?
                    $(table.column(this.s.index).header()).text() :
                    this.customPaneSettings.header || 'Custom Pane';
            }
            $(panesContainer).append(this.dom.container);
            var tableNode = table.table(0).node();
            // Custom search function for table
            this.s.searchFunction = function (settings, searchData, dataIndex, origData) {
                // If no data has been selected then show all
                if (_this.selections.length === 0) {
                    return true;
                }
                if (settings.nTable !== tableNode) {
                    return true;
                }
                var filter = null;
                if (_this.colExists) {
                    // Get the current filtered data
                    filter = searchData[_this.s.index];
                    if (colOpts.orthogonal.filter !== 'filter') {
                        // get the filter value from the map
                        filter = _this.s.rowData.filterMap.get(dataIndex);
                        if (filter instanceof $.fn.dataTable.Api) {
                            filter = filter.toArray();
                        }
                    }
                }
                return _this._search(filter, dataIndex);
            };
            $.fn.dataTable.ext.search.push(this.s.searchFunction);
            // If the clear button for this pane is clicked clear the selections
            if (this.c.clear) {
                $(clear).on('click', function () {
                    var searches = _this.dom.container.find(_this.classes.search);
                    searches.each(function () {
                        $(this).val('');
                        $(this).trigger('input');
                    });
                    _this.clearPane();
                });
            }
            // Sometimes the top row of the panes containing the search box and ordering buttons appears
            //  weird if the width of the panes is lower than expected, this fixes the design.
            // Equally this may occur when the table is resized.
            table.on('draw.dtsp', function () {
                _this._adjustTopRow();
            });
            table.on('buttons-action', function () {
                _this._adjustTopRow();
            });
            $(window).on('resize.dtsp', DataTable.util.throttle(function () {
                _this._adjustTopRow();
            }));
            // When column-reorder is present and the columns are moved, it is necessary to
            //  reassign all of the panes indexes to the new index of the column.
            table.on('column-reorder.dtsp', function (e, settings, details) {
                _this.s.index = details.mapping[_this.s.index];
            });
            return this;
        }
        /**
         * In the case of a rebuild there is potential for new data to have been included or removed
         * so all of the rowData must be reset as a precaution.
         */
        SearchPane.prototype.clearData = function () {
            this.s.rowData = {
                arrayFilter: [],
                arrayOriginal: [],
                arrayTotals: [],
                bins: {},
                binsOriginal: {},
                binsTotal: {},
                filterMap: new Map(),
                totalOptions: 0
            };
        };
        /**
         * Clear the selections in the pane
         */
        SearchPane.prototype.clearPane = function () {
            // Deselect all rows which are selected and update the table and filter count.
            this.s.dtPane.rows({ selected: true }).deselect();
            this.updateTable();
            return this;
        };
        /**
         * Strips all of the SearchPanes elements from the document and turns all of the listeners for the buttons off
         */
        SearchPane.prototype.destroy = function () {
            $(this.s.dtPane).off('.dtsp');
            $(this.s.dt).off('.dtsp');
            $(this.dom.nameButton).off('.dtsp');
            $(this.dom.countButton).off('.dtsp');
            $(this.dom.clear).off('.dtsp');
            $(this.dom.searchButton).off('.dtsp');
            $(this.dom.container).remove();
            var searchIdx = $.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            while (searchIdx !== -1) {
                $.fn.dataTable.ext.search.splice(searchIdx, 1);
                searchIdx = $.fn.dataTable.ext.search.indexOf(this.s.searchFunction);
            }
            // If the datatables have been defined for the panes then also destroy these
            if (this.s.dtPane !== undefined) {
                this.s.dtPane.destroy();
            }
            this.s.listSet = false;
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPane.prototype.getPaneCount = function () {
            return this.s.dtPane !== undefined ?
                this.s.dtPane.rows({ selected: true }).data().toArray().length :
                0;
        };
        /**
         * Rebuilds the panes from the start having deleted the old ones
         * @param? last boolean to indicate if this is the last pane a selection was made in
         * @param? dataIn data to be used in buildPane
         * @param? init Whether this is the initial draw or not
         * @param? maintainSelection Whether the current selections are to be maintained over rebuild
         */
        SearchPane.prototype.rebuildPane = function (last, dataIn, init, maintainSelection) {
            if (last === void 0) { last = false; }
            if (dataIn === void 0) { dataIn = null; }
            if (init === void 0) { init = null; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            this.clearData();
            var selectedRows = [];
            this.s.serverSelect = [];
            var prevEl = null;
            // When rebuilding strip all of the HTML Elements out of the container and start from scratch
            if (this.s.dtPane !== undefined) {
                if (maintainSelection) {
                    if (!this.s.dt.page.info().serverSide) {
                        selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                    else {
                        this.s.serverSelect = this.s.dtPane.rows({ selected: true }).data().toArray();
                    }
                }
                this.s.dtPane.clear().destroy();
                prevEl = $(this.dom.container).prev();
                this.destroy();
                this.s.dtPane = undefined;
                $.fn.dataTable.ext.search.push(this.s.searchFunction);
            }
            this.dom.container.removeClass(this.classes.hidden);
            this.s.displayed = false;
            this._buildPane(!this.s.dt.page.info().serverSide ?
                selectedRows :
                this.s.serverSelect, last, dataIn, init, prevEl);
            return this;
        };
        /**
         * removes the pane from the page and sets the displayed property to false.
         */
        SearchPane.prototype.removePane = function () {
            this.s.displayed = false;
            $(this.dom.container).hide();
        };
        /**
         * Sets the cascadeRegen property of the pane. Accessible from above because as SearchPanes.ts deals with the rebuilds.
         * @param val the boolean value that the cascadeRegen property is to be set to
         */
        SearchPane.prototype.setCascadeRegen = function (val) {
            this.s.cascadeRegen = val;
        };
        /**
         * This function allows the clearing property to be assigned. This is used when implementing cascadePane.
         * In setting this to true for the clearing of the panes selection on the deselects it forces the pane to
         * repopulate from the entire dataset not just the displayed values.
         * @param val the boolean value which the clearing property is to be assigned
         */
        SearchPane.prototype.setClear = function (val) {
            this.s.clearing = val;
        };
        /**
         * Updates the values of all of the panes
         * @param draw whether this has been triggered by a draw event or not
         */
        SearchPane.prototype.updatePane = function (draw) {
            if (draw === void 0) { draw = false; }
            this.s.updating = true;
            this._updateCommon(draw);
            this.s.updating = false;
        };
        /**
         * Updates the panes if one of the options to do so has been set to true
         *   rather than the filtered message when using viewTotal.
         */
        SearchPane.prototype.updateTable = function () {
            var selectedRows = this.s.dtPane.rows({ selected: true }).data().toArray();
            this.selections = selectedRows;
            this._searchExtras();
            // If either of the options that effect how the panes are displayed are selected then update the Panes
            if (this.c.cascadePanes || this.c.viewTotal) {
                this.updatePane();
            }
        };
        /**
         * Sets the listeners for the pane.
         *
         * Having it in it's own function makes it easier to only set them once
         */
        SearchPane.prototype._setListeners = function () {
            var _this = this;
            var rowData = this.s.rowData;
            var t0;
            // When an item is selected on the pane, add these to the array which holds selected items.
            // Custom search will perform.
            this.s.dtPane.on('select.dtsp', function () {
                clearTimeout(t0);
                if (_this.s.dt.page.info().serverSide && !_this.s.updating) {
                    if (!_this.s.serverSelecting) {
                        _this.s.serverSelect = _this.s.dtPane.rows({ selected: true }).data().toArray();
                        _this.s.scrollTop = $(_this.s.dtPane.table().node()).parent()[0].scrollTop;
                        _this.s.selectPresent = true;
                        _this.s.dt.draw(false);
                    }
                }
                else {
                    $(_this.dom.clear).removeClass(_this.classes.dull);
                    _this.s.selectPresent = true;
                    if (!_this.s.updating) {
                        _this._makeSelection();
                    }
                    _this.s.selectPresent = false;
                }
            });
            // When an item is deselected on the pane, re add the currently selected items to the array
            // which holds selected items. Custom search will be performed.
            this.s.dtPane.on('deselect.dtsp', function () {
                t0 = setTimeout(function () {
                    if (_this.s.dt.page.info().serverSide && !_this.s.updating) {
                        if (!_this.s.serverSelecting) {
                            _this.s.serverSelect = _this.s.dtPane.rows({ selected: true }).data().toArray();
                            _this.s.deselect = true;
                            _this.s.dt.draw(false);
                        }
                    }
                    else {
                        _this.s.deselect = true;
                        if (_this.s.dtPane.rows({ selected: true }).data().toArray().length === 0) {
                            $(_this.dom.clear).addClass(_this.classes.dull);
                        }
                        _this._makeSelection();
                        _this.s.deselect = false;
                        _this.s.dt.state.save();
                    }
                }, 50);
            });
            // When saving the state store all of the selected rows for preselection next time around
            this.s.dt.on('stateSaveParams.dtsp', function (e, settings, data) {
                // If the data being passed in is empty then a state clear must have occured so clear the panes state as well
                if ($.isEmptyObject(data)) {
                    _this.s.dtPane.state.clear();
                    return;
                }
                var selected = [];
                var searchTerm;
                var order;
                var bins;
                var arrayFilter;
                // Get all of the data needed for the state save from the pane
                if (_this.s.dtPane !== undefined) {
                    selected = _this.s.dtPane.rows({ selected: true }).data().map(function (item) { return item.filter.toString(); }).toArray();
                    searchTerm = $(_this.dom.searchBox).val();
                    order = _this.s.dtPane.order();
                    bins = rowData.binsOriginal;
                    arrayFilter = rowData.arrayOriginal;
                }
                if (data.searchPanes === undefined) {
                    data.searchPanes = {};
                }
                if (data.searchPanes.panes === undefined) {
                    data.searchPanes.panes = [];
                }
                for (var i = 0; i < data.searchPanes.panes.length; i++) {
                    if (data.searchPanes.panes[i].id === _this.s.index) {
                        data.searchPanes.panes.splice(i, 1);
                        i--;
                    }
                }
                // Add the panes data to the state object
                data.searchPanes.panes.push({
                    arrayFilter: arrayFilter,
                    bins: bins,
                    id: _this.s.index,
                    order: order,
                    searchTerm: searchTerm,
                    selected: selected
                });
            });
            this.s.dtPane.on('user-select.dtsp', function (e, _dt, type, cell, originalEvent) {
                originalEvent.stopPropagation();
            });
            this.s.dtPane.on('draw.dtsp', function () {
                _this._adjustTopRow();
            });
            // When the button to order by the name of the options is clicked then
            //  change the ordering to whatever it isn't currently
            $(this.dom.nameButton).on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([0, currentOrder === 'asc' ? 'desc' : 'asc']).draw();
                _this.s.dt.state.save();
            });
            // When the button to order by the number of entries in the column is clicked then
            //  change the ordering to whatever it isn't currently
            $(this.dom.countButton).on('click.dtsp', function () {
                var currentOrder = _this.s.dtPane.order()[0][1];
                _this.s.dtPane.order([1, currentOrder === 'asc' ? 'desc' : 'asc']).draw();
                _this.s.dt.state.save();
            });
            // When the clear button is clicked reset the pane
            $(this.dom.clear).on('click.dtsp', function () {
                var searches = _this.dom.container.find('.' + _this.classes.search);
                searches.each(function () {
                    // set the value of the search box to be an empty string and then search on that, effectively reseting
                    $(this).val('');
                    $(this).trigger('input');
                });
                _this.clearPane();
            });
            // When the search button is clicked then draw focus to the search box
            $(this.dom.searchButton).on('click.dtsp', function () {
                $(_this.dom.searchBox).focus();
            });
            // When a character is inputted into the searchbox search the pane for matching values.
            // Doing it this way means that no button has to be clicked to trigger a search, it is done asynchronously
            $(this.dom.searchBox).on('input.dtsp', function () {
                _this.s.dtPane.search($(_this.dom.searchBox).val()).draw();
                _this.s.dt.state.save();
            });
            // Make sure to save the state once the pane has been built
            this.s.dt.state.save();
            return true;
        };
        /**
         * Takes in potentially undetected rows and adds them to the array if they are not yet featured
         * @param filter the filter value of the potential row
         * @param display the display value of the potential row
         * @param sort the sort value of the potential row
         * @param type the type value of the potential row
         * @param arrayFilter the array to be populated
         * @param bins the bins to be populated
         */
        SearchPane.prototype._addOption = function (filter, display, sort, type, arrayFilter, bins) {
            // If the filter is an array then take a note of this, and add the elements to the arrayFilter array
            if (Array.isArray(filter) || filter instanceof DataTable.Api) {
                // Convert to an array so that we can work with it
                if (filter instanceof DataTable.Api) {
                    filter = filter.toArray();
                    display = display.toArray();
                }
                if (filter.length === display.length) {
                    for (var i = 0; i < filter.length; i++) {
                        // If we haven't seen this row before add it
                        if (!bins[filter[i]]) {
                            bins[filter[i]] = 1;
                            arrayFilter.push({
                                display: display[i],
                                filter: filter[i],
                                sort: sort[i],
                                type: type[i]
                            });
                        }
                        // Otherwise just increment the count
                        else {
                            bins[filter[i]]++;
                        }
                        this.s.rowData.totalOptions++;
                    }
                    return;
                }
                else {
                    throw new Error('display and filter not the same length');
                }
            }
            // If the values were affected by othogonal data and are not an array then check if it is already present
            else if (typeof this.s.colOpts.orthogonal === 'string') {
                if (!bins[filter]) {
                    bins[filter] = 1;
                    arrayFilter.push({
                        display: display,
                        filter: filter,
                        sort: sort,
                        type: type
                    });
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                    return;
                }
            }
            // Otherwise we must just be adding an option
            else {
                arrayFilter.push({
                    display: display,
                    filter: filter,
                    sort: sort,
                    type: type
                });
            }
        };
        /**
         * Adds a row to the panes table
         * @param display the value to be displayed to the user
         * @param filter the value to be filtered on when searchpanes is implemented
         * @param shown the number of rows in the table that are currently visible matching this criteria
         * @param total the total number of rows in the table that match this criteria
         * @param sort the value to be sorted in the pane table
         * @param type the value of which the type is to be derived from
         */
        SearchPane.prototype._addRow = function (display, filter, shown, total, sort, type, className) {
            var index;
            for (var _i = 0, _a = this.s.indexes; _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.filter === filter) {
                    index = entry.index;
                }
            }
            if (index === undefined) {
                index = this.s.indexes.length;
                this.s.indexes.push({ filter: filter, index: index });
            }
            return this.s.dtPane.row.add({
                className: className,
                display: display !== '' ?
                    display :
                    this.s.colOpts.emptyMessage !== false ?
                        this.s.colOpts.emptyMessage :
                        this.c.emptyMessage,
                filter: filter,
                index: index,
                shown: shown,
                sort: sort !== '' ?
                    sort :
                    this.s.colOpts.emptyMessage !== false ?
                        this.s.colOpts.emptyMessage :
                        this.c.emptyMessage,
                total: total,
                type: type
            });
        };
        /**
         * Adjusts the layout of the top row when the screen is resized
         */
        SearchPane.prototype._adjustTopRow = function () {
            var subContainers = this.dom.container.find('.' + this.classes.subRowsContainer);
            var subRow1 = this.dom.container.find('.dtsp-subRow1');
            var subRow2 = this.dom.container.find('.dtsp-subRow2');
            var topRow = this.dom.container.find('.' + this.classes.topRow);
            // If the width is 0 then it is safe to assume that the pane has not yet been displayed.
            //  Even if it has, if the width is 0 it won't make a difference if it has the narrow class or not
            if (($(subContainers[0]).width() < 252 || $(topRow[0]).width() < 252) && $(subContainers[0]).width() !== 0) {
                $(subContainers[0]).addClass(this.classes.narrow);
                $(subRow1[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowSearch);
                $(subRow2[0]).addClass(this.classes.narrowSub).removeClass(this.classes.narrowButton);
            }
            else {
                $(subContainers[0]).removeClass(this.classes.narrow);
                $(subRow1[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowSearch);
                $(subRow2[0]).removeClass(this.classes.narrowSub).addClass(this.classes.narrowButton);
            }
        };
        /**
         * Method to construct the actual pane.
         * @param selectedRows previously selected Rows to be reselected
         * @last boolean to indicate whether this pane was the last one to have a selection made
         */
        SearchPane.prototype._buildPane = function (selectedRows, last, dataIn, init, prevEl) {
            var _this = this;
            if (selectedRows === void 0) { selectedRows = []; }
            if (last === void 0) { last = false; }
            if (dataIn === void 0) { dataIn = null; }
            if (init === void 0) { init = null; }
            if (prevEl === void 0) { prevEl = null; }
            // Aliases
            this.selections = [];
            var table = this.s.dt;
            var column = table.column(this.colExists ? this.s.index : 0);
            var colOpts = this.s.colOpts;
            var rowData = this.s.rowData;
            // Other Variables
            var countMessage = table.i18n('searchPanes.count', '{total}');
            var filteredMessage = table.i18n('searchPanes.countFiltered', '{shown} ({total})');
            var loadedFilter = table.state.loaded();
            // If the listeners have not been set yet then using the latest state may result in funny errors
            if (this.s.listSet) {
                loadedFilter = table.state();
            }
            // If it is not a custom pane in place
            if (this.colExists) {
                var idx = -1;
                if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.panes) {
                    for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                        if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                            idx = i;
                            break;
                        }
                    }
                }
                // Perform checks that do not require populate pane to run
                if ((colOpts.show === false
                    || (colOpts.show !== undefined && colOpts.show !== true)) &&
                    idx === -1) {
                    this.dom.container.addClass(this.classes.hidden);
                    this.s.displayed = false;
                    return false;
                }
                else if (colOpts.show === true || idx !== -1) {
                    this.s.displayed = true;
                }
                if (!this.s.dt.page.info().serverSide &&
                    (dataIn === null ||
                        dataIn.searchPanes === null ||
                        dataIn.searchPanes.options === null)) {
                    // Only run populatePane if the data has not been collected yet
                    if (rowData.arrayFilter.length === 0) {
                        this._populatePane(last);
                        this.s.rowData.totalOptions = 0;
                        this._detailsPane();
                        // If the index is not found then no data has been added to the state for this pane,
                        //  which will only occur if it has previously failed to meet the criteria to be
                        //  displayed, therefore we can just hide it again here
                        if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.panes && idx === -1) {
                            this.dom.container.addClass(this.classes.hidden);
                            this.s.displayed = false;
                            return;
                        }
                        rowData.arrayOriginal = rowData.arrayTotals;
                        rowData.binsOriginal = rowData.binsTotal;
                    }
                    var binLength = Object.keys(rowData.binsOriginal).length;
                    var uniqueRatio = this._uniqueRatio(binLength, table.rows()[0].length);
                    // Don't show the pane if there isn't enough variance in the data, or there is only 1 entry for that pane
                    if (this.s.displayed === false && ((colOpts.show === undefined && colOpts.threshold === null ?
                        uniqueRatio > this.c.threshold :
                        uniqueRatio > colOpts.threshold)
                        || (colOpts.show !== true && binLength <= 1))) {
                        this.dom.container.addClass(this.classes.hidden);
                        this.s.displayed = false;
                        return;
                    }
                    // If the option viewTotal is true then find
                    // the total count for the whole table to display alongside the displayed count
                    if (this.c.viewTotal && rowData.arrayTotals.length === 0) {
                        this.s.rowData.totalOptions = 0;
                        this._detailsPane();
                    }
                    else {
                        rowData.binsTotal = rowData.bins;
                    }
                    this.dom.container.addClass(this.classes.show);
                    this.s.displayed = true;
                }
                else if (dataIn !== null && dataIn.searchPanes !== null && dataIn.searchPanes.options !== null) {
                    if (dataIn.tableLength !== undefined) {
                        this.s.tableLength = dataIn.tableLength;
                        this.s.rowData.totalOptions = this.s.tableLength;
                    }
                    else if (this.s.tableLength === null || table.rows()[0].length > this.s.tableLength) {
                        this.s.tableLength = table.rows()[0].length;
                        this.s.rowData.totalOptions = this.s.tableLength;
                    }
                    var colTitle = table.column(this.s.index).dataSrc();
                    if (dataIn.searchPanes.options[colTitle] !== undefined) {
                        for (var _i = 0, _a = dataIn.searchPanes.options[colTitle]; _i < _a.length; _i++) {
                            var dataPoint = _a[_i];
                            this.s.rowData.arrayFilter.push({
                                display: dataPoint.label,
                                filter: dataPoint.value,
                                sort: dataPoint.label,
                                type: dataPoint.label
                            });
                            this.s.rowData.bins[dataPoint.value] = this.c.viewTotal || this.c.cascadePanes ?
                                dataPoint.count :
                                dataPoint.total;
                            this.s.rowData.binsTotal[dataPoint.value] = dataPoint.total;
                        }
                    }
                    var binLength = Object.keys(rowData.binsTotal).length;
                    var uniqueRatio = this._uniqueRatio(binLength, this.s.tableLength);
                    // Don't show the pane if there isn't enough variance in the data, or there is only 1 entry for that pane
                    if (this.s.displayed === false && ((colOpts.show === undefined && colOpts.threshold === null ?
                        uniqueRatio > this.c.threshold :
                        uniqueRatio > colOpts.threshold)
                        || (colOpts.show !== true && binLength <= 1))) {
                        this.dom.container.addClass(this.classes.hidden);
                        this.s.displayed = false;
                        return;
                    }
                    this.s.rowData.arrayOriginal = this.s.rowData.arrayFilter;
                    this.s.rowData.binsOriginal = this.s.rowData.bins;
                    this.s.displayed = true;
                }
            }
            else {
                this.s.displayed = true;
            }
            // If the variance is accceptable then display the search pane
            this._displayPane();
            if (!this.s.listSet) {
                // Here, when the state is loaded if the data object on the original table is empty,
                //  then a state.clear() must have occurred, so delete all of the panes tables state objects too.
                this.dom.dtP.on('stateLoadParams.dt', function (e, settings, data) {
                    if ($.isEmptyObject(table.state.loaded())) {
                        $.each(data, function (index, value) {
                            delete data[index];
                        });
                    }
                });
            }
            // Add the container to the document in its original location
            if (prevEl !== null && $(this.dom.panesContainer).has(prevEl).length > 0) {
                $(this.dom.container).insertAfter(prevEl);
            }
            else {
                $(this.dom.panesContainer).prepend(this.dom.container);
            }
            // Declare the datatable for the pane
            var errMode = $.fn.dataTable.ext.errMode;
            $.fn.dataTable.ext.errMode = 'none';
            var haveScroller = DataTable.Scroller;
            this.s.dtPane = $(this.dom.dtP).DataTable($.extend(true, {
                columnDefs: [
                    {
                        className: 'dtsp-nameColumn',
                        data: 'display',
                        render: function (data, type, row) {
                            if (type === 'sort') {
                                return row.sort;
                            }
                            else if (type === 'type') {
                                return row.type;
                            }
                            var message;
                            (_this.s.filteringActive || _this.s.showFiltered) && _this.c.viewTotal
                                ? message = filteredMessage.replace(/{total}/, row.total)
                                : message = countMessage.replace(/{total}/, row.total);
                            message = message.replace(/{shown}/, row.shown);
                            while (message.indexOf('{total}') !== -1) {
                                message = message.replace(/{total}/, row.total);
                            }
                            while (message.indexOf('{shown}') !== -1) {
                                message = message.replace(/{shown}/, row.shown);
                            }
                            // We are displaying the count in the same columne as the name of the search option.
                            // This is so that there is not need to call columns.adjust(), which in turn speeds up the code
                            var pill = '<span class="' + _this.classes.pill + '">' + message + '</span>';
                            if (_this.c.hideCount || colOpts.hideCount) {
                                pill = '';
                            }
                            return '<div class="' + _this.classes.nameCont + '"><span title="' +
                                (typeof data === 'string' && data.match(/<[^>]*>/) !== null ? data.replace(/<[^>]*>/g, '') : data) +
                                '" class="' + _this.classes.name + '">' +
                                data + '</span>' +
                                pill + '</div>';
                        },
                        targets: 0,
                        // Accessing the private datatables property to set type based on the original table.
                        // This is null if not defined by the user, meaning that automatic type detection would take place
                        type: table.settings()[0].aoColumns[this.s.index] !== undefined ?
                            table.settings()[0].aoColumns[this.s.index]._sManualType :
                            null
                    },
                    {
                        className: 'dtsp-countColumn ' + this.classes.badgePill,
                        data: 'shown',
                        orderData: [1, 2],
                        targets: 1,
                        visible: false
                    },
                    {
                        data: 'total',
                        targets: 2,
                        visible: false
                    }
                ],
                deferRender: true,
                dom: 't',
                info: false,
                language: this.s.dt.settings()[0].oLanguage,
                paging: haveScroller ? true : false,
                scrollX: false,
                scrollY: '200px',
                scroller: haveScroller ? true : false,
                select: true,
                stateSave: table.settings()[0].oFeatures.bStateSave ? true : false
            }, this.c.dtOpts, colOpts !== undefined ? colOpts.dtOpts : {}, (this.s.colOpts.options !== undefined || !this.colExists)
                ? {
                    createdRow: function (row, data, dataIndex) {
                        $(row).addClass(data.className);
                    }
                }
                : undefined, (this.customPaneSettings !== null && this.customPaneSettings.dtOpts !== undefined)
                ? this.customPaneSettings.dtOpts
                : {}));
            $(this.dom.dtP).addClass(this.classes.table);
            // This is hacky but necessary for when datatables is generating the column titles automatically
            $(this.dom.searchBox).attr('placeholder', colOpts.header !== undefined
                ? colOpts.header
                : this.colExists
                    ? table.settings()[0].aoColumns[this.s.index].sTitle
                    : this.customPaneSettings.header || 'Custom Pane');
            // As the pane table is not in the document yet we must initialise select ourselves
            $.fn.dataTable.select.init(this.s.dtPane);
            $.fn.dataTable.ext.errMode = errMode;
            // If it is not a custom pane
            if (this.colExists) {
                // On initialisation, do we need to set a filtering value from a
                // saved state or init option?
                var search = column.search();
                search = search ? search.substr(1, search.length - 2).split('|') : [];
                // Count the number of empty cells
                var count_1 = 0;
                rowData.arrayFilter.forEach(function (element) {
                    if (element.filter === '') {
                        count_1++;
                    }
                });
                // Add all of the search options to the pane
                for (var i = 0, ien = rowData.arrayFilter.length; i < ien; i++) {
                    var selected = false;
                    for (var _b = 0, _c = this.s.serverSelect; _b < _c.length; _b++) {
                        var option = _c[_b];
                        if (option.filter === rowData.arrayFilter[i].filter) {
                            selected = true;
                        }
                    }
                    if (this.s.dt.page.info().serverSide &&
                        (!this.c.cascadePanes ||
                            (this.c.cascadePanes && rowData.bins[rowData.arrayFilter[i].filter] !== 0) ||
                            (this.c.cascadePanes && init !== null) ||
                            selected)) {
                        var row = this._addRow(rowData.arrayFilter[i].display, rowData.arrayFilter[i].filter, init ?
                            rowData.binsTotal[rowData.arrayFilter[i].filter] :
                            rowData.bins[rowData.arrayFilter[i].filter], this.c.viewTotal || init
                            ? String(rowData.binsTotal[rowData.arrayFilter[i].filter])
                            : rowData.bins[rowData.arrayFilter[i].filter], rowData.arrayFilter[i].sort, rowData.arrayFilter[i].type);
                        for (var _d = 0, _e = this.s.serverSelect; _d < _e.length; _d++) {
                            var option = _e[_d];
                            if (option.filter === rowData.arrayFilter[i].filter) {
                                this.s.serverSelecting = true;
                                row.select();
                                this.s.serverSelecting = false;
                            }
                        }
                    }
                    else if (!this.s.dt.page.info().serverSide &&
                        rowData.arrayFilter[i] &&
                        (rowData.bins[rowData.arrayFilter[i].filter] !== undefined || !this.c.cascadePanes)) {
                        this._addRow(rowData.arrayFilter[i].display, rowData.arrayFilter[i].filter, rowData.bins[rowData.arrayFilter[i].filter], rowData.binsTotal[rowData.arrayFilter[i].filter], rowData.arrayFilter[i].sort, rowData.arrayFilter[i].type);
                    }
                    else if (!this.s.dt.page.info().serverSide) {
                        // Just pass an empty string as the message will be calculated based on that in _addRow()
                        this._addRow('', count_1, count_1, '', '', '');
                    }
                }
            }
            DataTable.select.init(this.s.dtPane);
            // If there are custom options set or it is a custom pane then get them
            if (colOpts.options !== undefined ||
                (this.customPaneSettings !== null && this.customPaneSettings.options !== undefined)) {
                this._getComparisonRows();
            }
            // Display the pane
            this.s.dtPane.draw();
            this._adjustTopRow();
            if (!this.s.listSet) {
                this._setListeners();
                this.s.listSet = true;
            }
            for (var _f = 0, selectedRows_1 = selectedRows; _f < selectedRows_1.length; _f++) {
                var selection = selectedRows_1[_f];
                if (selection !== undefined) {
                    for (var _g = 0, _h = this.s.dtPane.rows().indexes().toArray(); _g < _h.length; _g++) {
                        var row = _h[_g];
                        if (this.s.dtPane.row(row).data() !== undefined && selection.filter === this.s.dtPane.row(row).data().filter) {
                            // If this is happening when serverSide processing is happening then different behaviour is needed
                            if (this.s.dt.page.info().serverSide) {
                                this.s.serverSelecting = true;
                                this.s.dtPane.row(row).select();
                                this.s.serverSelecting = false;
                            }
                            else {
                                this.s.dtPane.row(row).select();
                            }
                        }
                    }
                }
            }
            //  If SSP and the table is ready, apply the search for the pane
            if (this.s.dt.page.info().serverSide) {
                this.s.dtPane.search($(this.dom.searchBox).val()).draw();
            }
            // Reload the selection, searchbox entry and ordering from the previous state
            // Need to check here if SSP that this is the first draw, otherwise it will infinite loop
            if (loadedFilter &&
                loadedFilter.searchPanes &&
                loadedFilter.searchPanes.panes &&
                (dataIn === null ||
                    dataIn.draw === 1)) {
                if (!this.c.cascadePanes) {
                    this._reloadSelect(loadedFilter);
                }
                for (var _j = 0, _k = loadedFilter.searchPanes.panes; _j < _k.length; _j++) {
                    var pane = _k[_j];
                    if (pane.id === this.s.index) {
                        $(this.dom.searchBox).val(pane.searchTerm);
                        $(this.dom.searchBox).trigger('input');
                        this.s.dtPane.order(pane.order).draw();
                    }
                }
            }
            // Make sure to save the state once the pane has been built
            this.s.dt.state.save();
            return true;
        };
        /**
         * Update the array which holds the display and filter values for the table
         */
        SearchPane.prototype._detailsPane = function () {
            var table = this.s.dt;
            this.s.rowData.arrayTotals = [];
            this.s.rowData.binsTotal = {};
            var settings = this.s.dt.settings()[0];
            var indexArray = table.rows().indexes();
            if (!this.s.dt.page.info().serverSide) {
                for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                    var rowIdx = indexArray_1[_i];
                    this._populatePaneArray(rowIdx, this.s.rowData.arrayTotals, settings, this.s.rowData.binsTotal);
                }
            }
        };
        /**
         * Appends all of the HTML elements to their relevant parent Elements
         */
        SearchPane.prototype._displayPane = function () {
            var container = this.dom.container;
            var colOpts = this.s.colOpts;
            var layVal = parseInt(this.c.layout.split('-')[1], 10);
            //  Empty everything to start again
            $(this.dom.topRow).empty();
            $(this.dom.dtP).empty();
            $(this.dom.topRow).addClass(this.classes.topRow);
            // If there are more than 3 columns defined then make there be a smaller gap between the panes
            if (layVal > 3) {
                $(this.dom.container).addClass(this.classes.smallGap);
            }
            $(this.dom.topRow).addClass(this.classes.subRowsContainer);
            $(this.dom.upper).appendTo(this.dom.topRow);
            $(this.dom.lower).appendTo(this.dom.topRow);
            $(this.dom.searchCont).appendTo(this.dom.upper);
            $(this.dom.buttonGroup).appendTo(this.dom.lower);
            // If no selections have been made in the pane then disable the clear button
            if (this.c.dtOpts.searching === false ||
                (colOpts.dtOpts !== undefined &&
                    colOpts.dtOpts.searching === false) ||
                (!this.c.controls || !colOpts.controls) ||
                (this.customPaneSettings !== null &&
                    this.customPaneSettings.dtOpts !== undefined &&
                    this.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.customPaneSettings.dtOpts.searching)) {
                $(this.dom.searchBox).attr('disabled', 'disabled')
                    .removeClass(this.classes.paneInputButton)
                    .addClass(this.classes.disabledButton);
            }
            $(this.dom.searchBox).appendTo(this.dom.searchCont);
            // Create the contents of the searchCont div. Worth noting that this function will change when using semantic ui
            this._searchContSetup();
            // If the clear button is allowed to show then display it
            if (this.c.clear && this.c.controls && colOpts.controls) {
                $(this.dom.clear).appendTo(this.dom.buttonGroup);
            }
            if (this.c.orderable && colOpts.orderable && this.c.controls && colOpts.controls) {
                $(this.dom.nameButton).appendTo(this.dom.buttonGroup);
            }
            // If the count column is hidden then don't display the ordering button for it
            if (!this.c.hideCount &&
                !colOpts.hideCount &&
                this.c.orderable &&
                colOpts.orderable &&
                this.c.controls &&
                colOpts.controls) {
                $(this.dom.countButton).appendTo(this.dom.buttonGroup);
            }
            $(this.dom.topRow).prependTo(this.dom.container);
            $(container).append(this.dom.dtP);
            $(container).show();
        };
        /**
         * Gets the options for the row for the customPanes
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getBonusOptions = function () {
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                orthogonal: {
                    threshold: null
                },
                threshold: null
            };
            return $.extend(true, {}, SearchPane.defaults, defaultMutator, this.c !== undefined ? this.c : {});
        };
        /**
         * Adds the custom options to the pane
         * @returns {Array} Returns the array of rows which have been added to the pane
         */
        SearchPane.prototype._getComparisonRows = function () {
            var colOpts = this.s.colOpts;
            // Find the appropriate options depending on whether this is a pane for a specific column or a custom pane
            var options = colOpts.options !== undefined
                ? colOpts.options
                : this.customPaneSettings !== null && this.customPaneSettings.options !== undefined
                    ? this.customPaneSettings.options
                    : undefined;
            if (options === undefined) {
                return;
            }
            var tableVals = this.s.dt.rows({ search: 'applied' }).data().toArray();
            var appRows = this.s.dt.rows({ search: 'applied' });
            var tableValsTotal = this.s.dt.rows().data().toArray();
            var allRows = this.s.dt.rows();
            var rows = [];
            // Clear all of the other rows from the pane, only custom options are to be displayed when they are defined
            this.s.dtPane.clear();
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var comp = options_1[_i];
                // Initialise the object which is to be placed in the row
                var insert = comp.label !== '' ? comp.label : this.c.emptyMessage;
                var comparisonObj = {
                    className: comp.className,
                    display: insert,
                    filter: typeof comp.value === 'function' ? comp.value : [],
                    shown: 0,
                    sort: insert,
                    total: 0,
                    type: insert
                };
                // If a custom function is in place
                if (typeof comp.value === 'function') {
                    // Count the number of times the function evaluates to true for the data currently being displayed
                    for (var tVal = 0; tVal < tableVals.length; tVal++) {
                        if (comp.value.call(this.s.dt, tableVals[tVal], appRows[0][tVal])) {
                            comparisonObj.shown++;
                        }
                    }
                    // Count the number of times the function evaluates to true for the original data in the Table
                    for (var i = 0; i < tableValsTotal.length; i++) {
                        if (comp.value.call(this.s.dt, tableValsTotal[i], allRows[0][i])) {
                            comparisonObj.total++;
                        }
                    }
                    // Update the comparisonObj
                    if (typeof comparisonObj.filter !== 'function') {
                        comparisonObj.filter.push(comp.filter);
                    }
                }
                // If cascadePanes is not active or if it is and the comparisonObj should be shown then add it to the pane
                if (!this.c.cascadePanes || (this.c.cascadePanes && comparisonObj.shown !== 0)) {
                    rows.push(this._addRow(comparisonObj.display, comparisonObj.filter, comparisonObj.shown, comparisonObj.total, comparisonObj.sort, comparisonObj.type, comparisonObj.className));
                }
            }
            return rows;
        };
        /**
         * Gets the options for the row for the customPanes
         * @returns {object} The options for the row extended to include the options from the user.
         */
        SearchPane.prototype._getOptions = function () {
            var table = this.s.dt;
            // We need to reset the thresholds as if they have a value in colOpts then that value will be used
            var defaultMutator = {
                emptyMessage: false,
                orthogonal: {
                    threshold: null
                },
                threshold: null
            };
            return $.extend(true, {}, SearchPane.defaults, defaultMutator, table.settings()[0].aoColumns[this.s.index].searchPanes);
        };
        /**
         * This method allows for changes to the panes and table to be made when a selection or a deselection occurs
         * @param select Denotes whether a selection has been made or not
         */
        SearchPane.prototype._makeSelection = function () {
            this.updateTable();
            this.s.updating = true;
            this.s.dt.draw();
            this.s.updating = false;
        };
        /**
         * Fill the array with the values that are currently being displayed in the table
         * @param last boolean to indicate whether this was the last pane a selection was made in
         */
        SearchPane.prototype._populatePane = function (last) {
            if (last === void 0) { last = false; }
            var table = this.s.dt;
            this.s.rowData.arrayFilter = [];
            this.s.rowData.bins = {};
            var settings = this.s.dt.settings()[0];
            // If cascadePanes or viewTotal are active it is necessary to get the data which is currently
            //  being displayed for their functionality. Also make sure that this was not the last pane to have a selection made
            if (!this.s.dt.page.info().serverSide) {
                var indexArray = (this.c.cascadePanes || this.c.viewTotal) && (!this.s.clearing && !last) ?
                    table.rows({ search: 'applied' }).indexes() :
                    table.rows().indexes();
                for (var _i = 0, _a = indexArray.toArray(); _i < _a.length; _i++) {
                    var index = _a[_i];
                    this._populatePaneArray(index, this.s.rowData.arrayFilter, settings);
                }
            }
        };
        /**
         * Populates an array with all of the data for the table
         * @param rowIdx The current row index to be compared
         * @param arrayFilter The array that is to be populated with row Details
         * @param bins The bins object that is to be populated with the row counts
         */
        SearchPane.prototype._populatePaneArray = function (rowIdx, arrayFilter, settings, bins) {
            if (bins === void 0) { bins = this.s.rowData.bins; }
            var colOpts = this.s.colOpts;
            // Retrieve the rendered data from the cell using the fnGetCellData function
            //  rather than the cell().render API method for optimisation
            if (typeof colOpts.orthogonal === 'string') {
                var rendered = settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal);
                this.s.rowData.filterMap.set(rowIdx, rendered);
                this._addOption(rendered, rendered, rendered, rendered, arrayFilter, bins);
            }
            else {
                var filter = settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.search);
                // Null and empty string are to be considered the same value
                if (filter === null) {
                    filter = '';
                }
                if (typeof filter === 'string') {
                    filter = filter.replace(/<[^>]*>/g, '');
                }
                this.s.rowData.filterMap.set(rowIdx, filter);
                if (!bins[filter]) {
                    bins[filter] = 1;
                    this._addOption(filter, settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.display), settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.sort), settings.oApi._fnGetCellData(settings, rowIdx, this.s.index, colOpts.orthogonal.type), arrayFilter, bins);
                    this.s.rowData.totalOptions++;
                }
                else {
                    bins[filter]++;
                    this.s.rowData.totalOptions++;
                    return;
                }
            }
        };
        /**
         * Reloads all of the previous selects into the panes
         * @param loadedFilter The loaded filters from a previous state
         */
        SearchPane.prototype._reloadSelect = function (loadedFilter) {
            // If the state was not saved don't selected any
            if (loadedFilter === undefined) {
                return;
            }
            var idx;
            // For each pane, check that the loadedFilter list exists and is not null,
            // find the id of each search item and set it to be selected.
            for (var i = 0; i < loadedFilter.searchPanes.panes.length; i++) {
                if (loadedFilter.searchPanes.panes[i].id === this.s.index) {
                    idx = i;
                    break;
                }
            }
            if (idx !== undefined) {
                var table = this.s.dtPane;
                var rows = table.rows({ order: 'index' }).data().map(function (item) { return item.filter !== null ?
                    item.filter.toString() :
                    null; }).toArray();
                for (var _i = 0, _a = loadedFilter.searchPanes.panes[idx].selected; _i < _a.length; _i++) {
                    var filter = _a[_i];
                    var id = -1;
                    if (filter !== null) {
                        id = rows.indexOf(filter.toString());
                    }
                    if (id > -1) {
                        this.s.serverSelecting = true;
                        table.row(id).select();
                        this.s.serverSelecting = false;
                    }
                }
            }
        };
        /**
         * This method decides whether a row should contribute to the pane or not
         * @param filter the value that the row is to be filtered on
         * @param dataIndex the row index
         */
        SearchPane.prototype._search = function (filter, dataIndex) {
            var colOpts = this.s.colOpts;
            var table = this.s.dt;
            // For each item selected in the pane, check if it is available in the cell
            for (var _i = 0, _a = this.selections; _i < _a.length; _i++) {
                var colSelect = _a[_i];
                if (typeof colSelect.filter === 'string') {
                    // The filter value will not have the &amp; in place but a &,
                    //  so we need to do a replace to make sure that they will match
                    colSelect.filter = colSelect.filter.replaceAll('&amp;', '&');
                }
                // if the filter is an array then is the column present in it
                if (Array.isArray(filter)) {
                    if (filter.indexOf(colSelect.filter) !== -1) {
                        return true;
                    }
                }
                // if the filter is a function then does it meet the criteria of that function or not
                else if (typeof colSelect.filter === 'function') {
                    if (colSelect.filter.call(table, table.row(dataIndex).data(), dataIndex)) {
                        if (colOpts.combiner === 'or') {
                            return true;
                        }
                    }
                    // If the combiner is an "and" then we need to check against all possible selections
                    //  so if it fails here then the and is not met and return false
                    else if (colOpts.combiner === 'and') {
                        return false;
                    }
                }
                // otherwise if the two filter values are equal then return true
                // Loose type checking incase number type in column comparing to a string
                else if ((filter === colSelect.filter) ||
                    (!(typeof filter === 'string' && filter.length === 0) && filter == colSelect.filter) ||
                    (colSelect.filter === null && typeof filter === 'string' && filter === '')) {
                    return true;
                }
            }
            // If the combiner is an and then we need to check against all possible selections
            //  so return true here if so because it would have returned false earlier if it had failed
            if (colOpts.combiner === 'and') {
                return true;
            }
            // Otherwise it hasn't matched with anything by this point so it must be false
            else {
                return false;
            }
        };
        /**
         * Creates the contents of the searchCont div
         *
         * NOTE This is overridden when semantic ui styling in order to integrate the search button into the text box.
         */
        SearchPane.prototype._searchContSetup = function () {
            if (this.c.controls && this.s.colOpts.controls) {
                $(this.dom.searchButton).appendTo(this.dom.searchLabelCont);
            }
            if (!(this.c.dtOpts.searching === false ||
                this.s.colOpts.dtOpts.searching === false ||
                (this.customPaneSettings !== null &&
                    this.customPaneSettings.dtOpts !== undefined &&
                    this.customPaneSettings.dtOpts.searching !== undefined &&
                    !this.customPaneSettings.dtOpts.searching))) {
                $(this.dom.searchLabelCont).appendTo(this.dom.searchCont);
            }
        };
        /**
         * Adds outline to the pane when a selection has been made
         */
        SearchPane.prototype._searchExtras = function () {
            var updating = this.s.updating;
            this.s.updating = true;
            var filters = this.s.dtPane.rows({ selected: true }).data().pluck('filter').toArray();
            var nullIndex = filters.indexOf(this.s.colOpts.emptyMessage !== false ?
                this.s.colOpts.emptyMessage :
                this.c.emptyMessage);
            var container = $(this.s.dtPane.table().container());
            // If null index is found then search for empty cells as a filter.
            if (nullIndex > -1) {
                filters[nullIndex] = '';
            }
            // If a filter has been applied then outline the respective pane, remove it when it no longer is.
            if (filters.length > 0) {
                container.addClass(this.classes.selected);
            }
            else if (filters.length === 0) {
                container.removeClass(this.classes.selected);
            }
            this.s.updating = updating;
        };
        /**
         * Finds the ratio of the number of different options in the table to the number of rows
         * @param bins the number of different options in the table
         * @param rowCount the total number of rows in the table
         * @returns {number} returns the ratio
         */
        SearchPane.prototype._uniqueRatio = function (bins, rowCount) {
            if (rowCount > 0 &&
                ((this.s.rowData.totalOptions > 0 && !this.s.dt.page.info().serverSide) ||
                    (this.s.dt.page.info().serverSide && this.s.tableLength > 0))) {
                return bins / this.s.rowData.totalOptions;
            }
            else {
                return 1;
            }
        };
        /**
         * updates the options within the pane
         * @param draw a flag to define whether this has been called due to a draw event or not
         */
        SearchPane.prototype._updateCommon = function (draw) {
            if (draw === void 0) { draw = false; }
            // Update the panes if doing a deselect. if doing a select then
            // update all of the panes except for the one causing the change
            if (!this.s.dt.page.info().serverSide &&
                this.s.dtPane !== undefined &&
                (!this.s.filteringActive || this.c.cascadePanes || draw === true) &&
                (this.c.cascadePanes !== true || this.s.selectPresent !== true) && (!this.s.lastSelect || !this.s.lastCascade)) {
                var colOpts = this.s.colOpts;
                var selected = this.s.dtPane.rows({ selected: true }).data().toArray();
                var scrollTop = $(this.s.dtPane.table().node()).parent()[0].scrollTop;
                var rowData = this.s.rowData;
                // Clear the pane in preparation for adding the updated search options
                this.s.dtPane.clear();
                // If it is not a custom pane
                if (this.colExists) {
                    // Only run populatePane if the data has not been collected yet
                    if (rowData.arrayFilter.length === 0) {
                        this._populatePane();
                    }
                    // If cascadePanes is active and the table has returned to its default state then
                    //  there is a need to update certain parts ofthe rowData.
                    else if (this.c.cascadePanes
                        && this.s.dt.rows().data().toArray().length === this.s.dt.rows({ search: 'applied' }).data().toArray().length) {
                        rowData.arrayFilter = rowData.arrayOriginal;
                        rowData.bins = rowData.binsOriginal;
                    }
                    // Otherwise if viewTotal or cascadePanes is active then the data from the table must be read.
                    else if (this.c.viewTotal || this.c.cascadePanes) {
                        this._populatePane();
                    }
                    // If the viewTotal option is selected then find the totals for the table
                    if (this.c.viewTotal) {
                        this._detailsPane();
                    }
                    else {
                        rowData.binsTotal = rowData.bins;
                    }
                    if (this.c.viewTotal && !this.c.cascadePanes) {
                        rowData.arrayFilter = rowData.arrayTotals;
                    }
                    var _loop_1 = function (dataP) {
                        // If both view Total and cascadePanes have been selected and the count of the row is not 0 then add it to pane
                        // Do this also if the viewTotal option has been selected and cascadePanes has not
                        if (dataP && ((rowData.bins[dataP.filter] !== undefined && rowData.bins[dataP.filter] !== 0 && this_1.c.cascadePanes)
                            || !this_1.c.cascadePanes
                            || this_1.s.clearing)) {
                            var row = this_1._addRow(dataP.display, dataP.filter, !this_1.c.viewTotal
                                ? rowData.bins[dataP.filter]
                                : rowData.bins[dataP.filter] !== undefined
                                    ? rowData.bins[dataP.filter]
                                    : 0, this_1.c.viewTotal
                                ? String(rowData.binsTotal[dataP.filter])
                                : rowData.bins[dataP.filter], dataP.sort, dataP.type);
                            // Find out if the filter was selected in the previous search, if so select it and remove from array.
                            var selectIndex = selected.findIndex(function (element) {
                                return element.filter === dataP.filter;
                            });
                            if (selectIndex !== -1) {
                                row.select();
                                selected.splice(selectIndex, 1);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, _a = rowData.arrayFilter; _i < _a.length; _i++) {
                        var dataP = _a[_i];
                        _loop_1(dataP);
                    }
                }
                if ((colOpts.searchPanes !== undefined && colOpts.searchPanes.options !== undefined) ||
                    colOpts.options !== undefined ||
                    (this.customPaneSettings !== null && this.customPaneSettings.options !== undefined)) {
                    var rows = this._getComparisonRows();
                    var _loop_2 = function (row) {
                        var selectIndex = selected.findIndex(function (element) {
                            if (element.display === row.data().display) {
                                return true;
                            }
                        });
                        if (selectIndex !== -1) {
                            row.select();
                            selected.splice(selectIndex, 1);
                        }
                    };
                    for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
                        var row = rows_1[_b];
                        _loop_2(row);
                    }
                }
                // Add search options which were previously selected but whos results are no
                // longer present in the resulting data set.
                for (var _c = 0, selected_1 = selected; _c < selected_1.length; _c++) {
                    var selectedEl = selected_1[_c];
                    var row = this._addRow(selectedEl.display, selectedEl.filter, 0, this.c.viewTotal
                        ? selectedEl.total
                        : 0, selectedEl.display, selectedEl.display);
                    this.s.updating = true;
                    row.select();
                    this.s.updating = false;
                }
                this.s.dtPane.draw();
                this.s.dtPane.table().node().parentNode.scrollTop = scrollTop;
            }
        };
        SearchPane.version = '1.1.0';
        SearchPane.classes = {
            buttonGroup: 'dtsp-buttonGroup',
            buttonSub: 'dtsp-buttonSub',
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            clearButton: 'clearButton',
            container: 'dtsp-searchPane',
            countButton: 'dtsp-countButton',
            disabledButton: 'dtsp-disabledButton',
            dull: 'dtsp-dull',
            hidden: 'dtsp-hidden',
            hide: 'dtsp-hide',
            layout: 'dtsp-',
            name: 'dtsp-name',
            nameButton: 'dtsp-nameButton',
            nameCont: 'dtsp-nameCont',
            narrow: 'dtsp-narrow',
            paneButton: 'dtsp-paneButton',
            paneInputButton: 'dtsp-paneInputButton',
            pill: 'dtsp-pill',
            search: 'dtsp-search',
            searchCont: 'dtsp-searchCont',
            searchIcon: 'dtsp-searchIcon',
            searchLabelCont: 'dtsp-searchButtonCont',
            selected: 'dtsp-selected',
            smallGap: 'dtsp-smallGap',
            subRow1: 'dtsp-subRow1',
            subRow2: 'dtsp-subRow2',
            subRowsContainer: 'dtsp-subRowsContainer',
            title: 'dtsp-title',
            topRow: 'dtsp-topRow'
        };
        // Define SearchPanes default options
        SearchPane.defaults = {
            cascadePanes: false,
            clear: true,
            combiner: 'or',
            controls: true,
            container: function (dt) {
                return dt.table().container();
            },
            dtOpts: {},
            emptyMessage: '<i>No Data</i>',
            hideCount: false,
            layout: 'columns-3',
            name: undefined,
            orderable: true,
            orthogonal: {
                display: 'display',
                filter: 'filter',
                hideCount: false,
                search: 'filter',
                show: undefined,
                sort: 'sort',
                threshold: 0.6,
                type: 'type'
            },
            preSelect: [],
            threshold: 0.6,
            viewTotal: false
        };
        return SearchPane;
    }());

    var $$1;
    var DataTable$1;
    function setJQuery$1(jq) {
        $$1 = jq;
        DataTable$1 = jq.fn.dataTable;
    }
    var SearchPanes = /** @class */ (function () {
        function SearchPanes(paneSettings, opts, fromInit) {
            var _this = this;
            if (fromInit === void 0) { fromInit = false; }
            this.regenerating = false;
            // Check that the required version of DataTables is included
            if (!DataTable$1 || !DataTable$1.versionCheck || !DataTable$1.versionCheck('1.10.0')) {
                throw new Error('SearchPane requires DataTables 1.10 or newer');
            }
            // Check that Select is included
            if (!DataTable$1.select) {
                throw new Error('SearchPane requires Select');
            }
            var table = new DataTable$1.Api(paneSettings);
            this.classes = $$1.extend(true, {}, SearchPanes.classes);
            // Get options from user
            this.c = $$1.extend(true, {}, SearchPanes.defaults, opts);
            // Add extra elements to DOM object including clear
            this.dom = {
                clearAll: $$1('<button type="button">Clear All</button>').addClass(this.classes.clearAll),
                container: $$1('<div/>').addClass(this.classes.panes).text(table.i18n('searchPanes.loadMessage', 'Loading Search Panes...')),
                emptyMessage: $$1('<div/>').addClass(this.classes.emptyMessage),
                options: $$1('<div/>').addClass(this.classes.container),
                panes: $$1('<div/>').addClass(this.classes.container),
                title: $$1('<div/>').addClass(this.classes.title),
                titleRow: $$1('<div/>').addClass(this.classes.titleRow),
                wrapper: $$1('<div/>')
            };
            this.s = {
                colOpts: [],
                dt: table,
                filterCount: 0,
                filterPane: -1,
                page: 0,
                panes: [],
                selectionList: [],
                serverData: {},
                stateRead: false,
                updating: false
            };
            if (table.settings()[0]._searchPanes !== undefined) {
                return;
            }
            this._getState();
            if (this.s.dt.page.info().serverSide) {
                table.on('preXhr.dt', function (e, settings, data) {
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    for (var _i = 0, _a = _this.s.selectionList; _i < _a.length; _i++) {
                        var selection = _a[_i];
                        var src = _this.s.dt.column(selection.index).dataSrc();
                        if (data.searchPanes[src] === undefined) {
                            data.searchPanes[src] = {};
                        }
                        for (var i = 0; i < selection.rows.length; i++) {
                            data.searchPanes[src][i] = selection.rows[i].filter;
                        }
                    }
                });
            }
            // We are using the xhr event to rebuild the panes if required due to viewTotal being enabled
            // If viewTotal is not enabled then we simply update the data from the server
            table.on('xhr', function (e, settings, json, xhr) {
                if (json && json.searchPanes && json.searchPanes.options) {
                    _this.s.serverData = json;
                    _this.s.serverData.tableLength = json.recordsTotal;
                    _this._serverTotals();
                }
            });
            table.settings()[0]._searchPanes = this;
            this.dom.clearAll.text(table.i18n('searchPanes.clearMessage', 'Clear All'));
            if (this.s.dt.settings()[0]._bInitComplete || fromInit) {
                this._paneDeclare(table, paneSettings, opts);
            }
            else {
                table.one('preInit.dt', function (settings) {
                    _this._paneDeclare(table, paneSettings, opts);
                });
            }
            return this;
        }
        /**
         * Clear the selections of all of the panes
         */
        SearchPanes.prototype.clearSelections = function () {
            // Load in all of the searchBoxes in the documents
            var searches = this.dom.container.find(this.classes.search);
            // For each searchBox set the input text to be empty and then trigger
            //  an input on them so that they no longer filter the panes
            searches.each(function () {
                $$1(this).val('');
                $$1(this).trigger('input');
            });
            var returnArray = [];
            // For every pane, clear the selections in the pane
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    returnArray.push(pane.clearPane());
                }
            }
            this.s.dt.draw();
            return returnArray;
        };
        /**
         * returns the container node for the searchPanes
         */
        SearchPanes.prototype.getNode = function () {
            return this.dom.container;
        };
        /**
         * rebuilds all of the panes
         */
        SearchPanes.prototype.rebuild = function (targetIdx, maintainSelection) {
            if (targetIdx === void 0) { targetIdx = false; }
            if (maintainSelection === void 0) { maintainSelection = false; }
            $$1(this.dom.emptyMessage).remove();
            // As a rebuild from scratch is required, empty the searchpanes container.
            var returnArray = [];
            // Rebuild each pane individually, if a specific pane has been selected then only rebuild that one
            if (targetIdx === false) {
                $$1(this.dom.panes).empty();
            }
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (targetIdx !== false && pane.s.index !== targetIdx) {
                    continue;
                }
                pane.clearData();
                returnArray.push(
                // Pass a boolean to say whether this is the last choice made for maintaining selections when rebuilding
                pane.rebuildPane(this.s.selectionList[this.s.selectionList.length - 1] !== undefined ?
                    pane.s.index === this.s.selectionList[this.s.selectionList.length - 1].index :
                    false, this.s.dt.page.info().serverSide ?
                    this.s.serverData :
                    undefined, null, maintainSelection));
                $$1(this.dom.panes).append(pane.dom.container);
            }
            // Only need to trigger a search if it is not server side processing
            if (!this.s.dt.page.info().serverSide) {
                this.s.dt.draw();
            }
            if (this.c.cascadePanes || this.c.viewTotal) {
                this.redrawPanes(true);
            }
            else {
                this._updateSelection();
            }
            // Attach panes, clear buttons, and title bar to the document
            this._updateFilterCount();
            this._attachPaneContainer();
            this.s.dt.draw();
            // If a single pane has been rebuilt then return only that pane
            if (returnArray.length === 1) {
                return returnArray[0];
            }
            // Otherwise return all of the panes that have been rebuilt
            else {
                return returnArray;
            }
        };
        /**
         * Redraws all of the panes
         */
        SearchPanes.prototype.redrawPanes = function (rebuild) {
            if (rebuild === void 0) { rebuild = false; }
            var table = this.s.dt;
            // Only do this if the redraw isn't being triggered by the panes updating themselves
            if (!this.s.updating && !this.s.dt.page.info().serverSide) {
                var filterActive = true;
                var filterPane = this.s.filterPane;
                // If the number of rows currently visible is equal to the number of rows in the table
                //  then there can't be any filtering taking place
                if (table.rows({ search: 'applied' }).data().toArray().length === table.rows().data().toArray().length) {
                    filterActive = false;
                }
                // Otherwise if viewTotal is active then it is necessary to determine which panes a select is present in.
                //  If there is only one pane with a selection present then it should not show the filtered message as
                //  more selections may be made in that pane.
                else if (this.c.viewTotal) {
                    for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        if (pane.s.dtPane !== undefined) {
                            var selectLength = pane.s.dtPane.rows({ selected: true }).data().toArray().length;
                            if (selectLength === 0) {
                                for (var _b = 0, _c = this.s.selectionList; _b < _c.length; _b++) {
                                    var selection = _c[_b];
                                    if (selection.index === pane.s.index && selection.rows.length !== 0) {
                                        selectLength = selection.rows.length;
                                    }
                                }
                            }
                            // If filterPane === -1 then a pane with a selection has not been found yet, so set filterPane to that panes index
                            if (selectLength > 0 && filterPane === -1) {
                                filterPane = pane.s.index;
                            }
                            // Then if another pane is found with a selection then set filterPane to null to
                            //  show that multiple panes have selections present
                            else if (selectLength > 0) {
                                filterPane = null;
                            }
                        }
                    }
                }
                var deselectIdx = void 0;
                var newSelectionList = [];
                // Don't run this if it is due to the panes regenerating
                if (!this.regenerating) {
                    for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                        var pane = _e[_d];
                        // Identify the pane where a selection or deselection has been made and add it to the list.
                        if (pane.s.selectPresent) {
                            this.s.selectionList.push({ index: pane.s.index, rows: pane.s.dtPane.rows({ selected: true }).data().toArray(), protect: false });
                            table.state.save();
                            break;
                        }
                        else if (pane.s.deselect) {
                            deselectIdx = pane.s.index;
                            var selectedData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                            if (selectedData.length > 0) {
                                this.s.selectionList.push({ index: pane.s.index, rows: selectedData, protect: true });
                            }
                        }
                    }
                    if (this.s.selectionList.length > 0) {
                        var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                        for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                            var pane = _g[_f];
                            pane.s.lastSelect = (pane.s.index === last);
                        }
                    }
                    // Remove selections from the list from the pane where a deselect has taken place
                    for (var i = 0; i < this.s.selectionList.length; i++) {
                        if (this.s.selectionList[i].index !== deselectIdx || this.s.selectionList[i].protect === true) {
                            var further = false;
                            // Find out if this selection is the last one in the list for that pane
                            for (var j = i + 1; j < this.s.selectionList.length; j++) {
                                if (this.s.selectionList[j].index === this.s.selectionList[i].index) {
                                    further = true;
                                }
                            }
                            // If there are no selections for this pane in the list then just push this one
                            if (!further) {
                                newSelectionList.push(this.s.selectionList[i]);
                                this.s.selectionList[i].protect = false;
                            }
                        }
                    }
                    var solePane = -1;
                    if (newSelectionList.length === 1) {
                        solePane = newSelectionList[0].index;
                    }
                    // Update all of the panes to reflect the current state of the filters
                    for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                        var pane = _j[_h];
                        if (pane.s.dtPane !== undefined) {
                            var tempFilter = true;
                            pane.s.filteringActive = true;
                            if ((filterPane !== -1 && filterPane !== null && filterPane === pane.s.index) ||
                                filterActive === false ||
                                pane.s.index === solePane) {
                                tempFilter = false;
                                pane.s.filteringActive = false;
                            }
                            pane.updatePane(!tempFilter ? false : filterActive);
                        }
                    }
                    // Update the label that shows how many filters are in place
                    this._updateFilterCount();
                    // If the length of the selections are different then some of them have been removed and a deselect has occured
                    if (newSelectionList.length > 0 && (newSelectionList.length < this.s.selectionList.length || rebuild)) {
                        this._cascadeRegen(newSelectionList);
                        var last = newSelectionList[newSelectionList.length - 1].index;
                        for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                            var pane = _l[_k];
                            pane.s.lastSelect = (pane.s.index === last);
                        }
                    }
                    else if (newSelectionList.length > 0) {
                        // Update all of the other panes as you would just making a normal selection
                        for (var _m = 0, _o = this.s.panes; _m < _o.length; _m++) {
                            var paneUpdate = _o[_m];
                            if (paneUpdate.s.dtPane !== undefined) {
                                var tempFilter = true;
                                paneUpdate.s.filteringActive = true;
                                if ((filterPane !== -1 && filterPane !== null && filterPane === paneUpdate.s.index) || filterActive === false) {
                                    tempFilter = false;
                                    paneUpdate.s.filteringActive = false;
                                }
                                paneUpdate.updatePane(!tempFilter ? tempFilter : filterActive);
                            }
                        }
                    }
                }
                else {
                    var solePane = -1;
                    if (newSelectionList.length === 1) {
                        solePane = newSelectionList[0].index;
                    }
                    for (var _p = 0, _q = this.s.panes; _p < _q.length; _p++) {
                        var pane = _q[_p];
                        if (pane.s.dtPane !== undefined) {
                            var tempFilter = true;
                            pane.s.filteringActive = true;
                            if ((filterPane !== -1 && filterPane !== null && filterPane === pane.s.index) ||
                                filterActive === false ||
                                pane.s.index === solePane) {
                                tempFilter = false;
                                pane.s.filteringActive = false;
                            }
                            pane.updatePane(!tempFilter ? tempFilter : filterActive);
                        }
                    }
                    // Update the label that shows how many filters are in place
                    this._updateFilterCount();
                }
                if (!filterActive) {
                    this.s.selectionList = [];
                }
            }
        };
        /**
         * Attach the panes, buttons and title to the document
         */
        SearchPanes.prototype._attach = function () {
            var _this = this;
            $$1(this.dom.container).removeClass(this.classes.hide);
            $$1(this.dom.titleRow).removeClass(this.classes.hide);
            $$1(this.dom.titleRow).remove();
            $$1(this.dom.title).appendTo(this.dom.titleRow);
            // If the clear button is permitted attach it
            if (this.c.clear) {
                $$1(this.dom.clearAll).appendTo(this.dom.titleRow);
                $$1(this.dom.clearAll).on('click.dtsps', function () {
                    _this.clearSelections();
                });
            }
            $$1(this.dom.titleRow).appendTo(this.dom.container);
            // Attach the container for each individual pane to the overall container
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                $$1(pane.dom.container).appendTo(this.dom.panes);
            }
            // Attach everything to the document
            $$1(this.dom.panes).appendTo(this.dom.container);
            if ($$1('div.' + this.classes.container).length === 0) {
                $$1(this.dom.container).prependTo(this.s.dt);
            }
            return this.dom.container;
        };
        /**
         * Attach the top row containing the filter count and clear all button
         */
        SearchPanes.prototype._attachExtras = function () {
            $$1(this.dom.container).removeClass(this.classes.hide);
            $$1(this.dom.titleRow).removeClass(this.classes.hide);
            $$1(this.dom.titleRow).remove();
            $$1(this.dom.title).appendTo(this.dom.titleRow);
            // If the clear button is permitted attach it
            if (this.c.clear) {
                $$1(this.dom.clearAll).appendTo(this.dom.titleRow);
            }
            $$1(this.dom.titleRow).appendTo(this.dom.container);
            return this.dom.container;
        };
        /**
         * If there are no panes to display then this method is called to either
         *   display a message in their place or hide them completely.
         */
        SearchPanes.prototype._attachMessage = function () {
            // Create a message to display on the screen
            var message;
            try {
                message = this.s.dt.i18n('searchPanes.emptyPanes', 'No SearchPanes');
            }
            catch (error) {
                message = null;
            }
            // If the message is an empty string then searchPanes.emptyPanes is undefined,
            //  therefore the pane container should be removed from the display
            if (message === null) {
                $$1(this.dom.container).addClass(this.classes.hide);
                $$1(this.dom.titleRow).removeClass(this.classes.hide);
                return;
            }
            else {
                $$1(this.dom.container).removeClass(this.classes.hide);
                $$1(this.dom.titleRow).addClass(this.classes.hide);
            }
            // Otherwise display the message
            $$1(this.dom.emptyMessage).text(message);
            this.dom.emptyMessage.appendTo(this.dom.container);
            return this.dom.container;
        };
        /**
         * Attaches the panes to the document and displays a message or hides if there are none
         */
        SearchPanes.prototype._attachPaneContainer = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    return this._attach();
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            return this._attachMessage();
        };
        /**
         * Prepares the panes for selections to be made when cascade is active and a deselect has occured
         * @param newSelectionList the list of selections which are to be made
         */
        SearchPanes.prototype._cascadeRegen = function (newSelectionList) {
            // Set this to true so that the actions taken do not cause this to run until it is finished
            this.regenerating = true;
            // If only one pane has been selected then take note of its index
            var solePane = -1;
            if (newSelectionList.length === 1) {
                solePane = newSelectionList[0].index;
            }
            // Let the pane know that a cascadeRegen is taking place to avoid unexpected behaviour
            //  and clear all of the previous selections in the pane
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                pane.setCascadeRegen(true);
                pane.setClear(true);
                // If this is the same as the pane with the only selection then pass it as a parameter into clearPane
                if ((pane.s.dtPane !== undefined && pane.s.index === solePane) || pane.s.dtPane !== undefined) {
                    pane.clearPane();
                }
                pane.setClear(false);
            }
            // Remake Selections
            this._makeCascadeSelections(newSelectionList);
            // Set the selection list property to be the list without the selections from the deselect pane
            this.s.selectionList = newSelectionList;
            // The regeneration of selections is over so set it back to false
            for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                var pane = _c[_b];
                pane.setCascadeRegen(false);
            }
            this.regenerating = false;
        };
        /**
         * Attaches the message to the document but does not add any panes
         */
        SearchPanes.prototype._checkMessage = function () {
            // If a pane is to be displayed then attach the normal pane output
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.displayed === true) {
                    return;
                }
            }
            // Otherwise attach the custom message or remove the container from the display
            return this._attachMessage();
        };
        /**
         * Gets the selection list from the previous state and stores it in the selectionList Property
         */
        SearchPanes.prototype._getState = function () {
            var loadedFilter = this.s.dt.state.loaded();
            if (loadedFilter && loadedFilter.searchPanes && loadedFilter.searchPanes.selectionList !== undefined) {
                this.s.selectionList = loadedFilter.searchPanes.selectionList;
            }
        };
        /**
         * Makes all of the selections when cascade is active
         * @param newSelectionList the list of selections to be made, in the order they were originally selected
         */
        SearchPanes.prototype._makeCascadeSelections = function (newSelectionList) {
            // make selections in the order they were made previously, excluding those from the pane where a deselect was made
            for (var i = 0; i < newSelectionList.length; i++) {
                var _loop_1 = function (pane) {
                    if (pane.s.index === newSelectionList[i].index && pane.s.dtPane !== undefined) {
                        // When regenerating the cascade selections we need this flag so that the panes are only ignored if it
                        //  is the last selection and the pane for that selection
                        if (i === newSelectionList.length - 1) {
                            pane.s.lastCascade = true;
                        }
                        // if there are any selections currently in the pane then deselect them as we are about to make our new selections
                        if (pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0 && pane.s.dtPane !== undefined) {
                            pane.setClear(true);
                            pane.clearPane();
                            pane.setClear(false);
                        }
                        var _loop_2 = function (row) {
                            pane.s.dtPane.rows().every(function (rowIdx) {
                                if (pane.s.dtPane.row(rowIdx).data() !== undefined &&
                                    row !== undefined &&
                                    pane.s.dtPane.row(rowIdx).data().filter === row.filter) {
                                    pane.s.dtPane.row(rowIdx).select();
                                }
                            });
                        };
                        // select every row in the pane that was selected previously
                        for (var _i = 0, _a = newSelectionList[i].rows; _i < _a.length; _i++) {
                            var row = _a[_i];
                            _loop_2(row);
                        }
                        // Update the label that shows how many filters are in place
                        this_1._updateFilterCount();
                        pane.s.lastCascade = false;
                    }
                };
                var this_1 = this;
                // As the selections may have been made across the panes in a different order to the pane index we must identify
                //  which pane has the index of the selection. This is also important for colreorder etc
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    _loop_1(pane);
                }
            }
            // Make sure that the state is saved after all of these selections
            this.s.dt.state.save();
        };
        /**
         * Declares the instances of individual searchpanes dependant on the number of columns.
         * It is necessary to run this once preInit has completed otherwise no panes will be
         *  created as the column count will be 0.
         * @param table the DataTable api for the parent table
         * @param paneSettings the settings passed into the constructor
         * @param opts the options passed into the constructor
         */
        SearchPanes.prototype._paneDeclare = function (table, paneSettings, opts) {
            var _this = this;
            // Create Panes
            table
                .columns(this.c.columns.length > 0 ? this.c.columns : undefined)
                .eq(0)
                .each(function (idx) {
                _this.s.panes.push(new SearchPane(paneSettings, opts, idx, _this.c.layout, _this.dom.panes));
            });
            // If there is any extra custom panes defined then create panes for them too
            var rowLength = table.columns().eq(0).toArray().length;
            var paneLength = this.c.panes.length;
            for (var i = 0; i < paneLength; i++) {
                var id = rowLength + i;
                this.s.panes.push(new SearchPane(paneSettings, opts, id, this.c.layout, this.dom.panes, this.c.panes[i]));
            }
            // If a custom ordering is being used
            if (this.c.order.length > 0) {
                // Make a new Array of panes based upon the order
                var newPanes = this.c.order.map(function (name, index, values) {
                    return _this._findPane(name);
                });
                // Remove the old panes from the dom
                this.dom.panes.empty();
                this.s.panes = newPanes;
                // Append the panes in the correct order
                for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    this.dom.panes.append(pane.dom.container);
                }
            }
            // If this internal property is true then the DataTable has been initialised already
            if (this.s.dt.settings()[0]._bInitComplete) {
                this._startup(table);
            }
            else {
                // Otherwise add the paneStartup function to the list of functions that are to be run when the table is initialised
                // This will garauntee that the panes are initialised before the init event and init Complete callback is fired
                this.s.dt.settings()[0].aoInitComplete.push({ fn: function () {
                        _this._startup(table);
                    } });
            }
        };
        /**
         * Finds a pane based upon the name of that pane
         * @param name string representing the name of the pane
         * @returns SearchPane The pane which has that name
         */
        SearchPanes.prototype._findPane = function (name) {
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (name === pane.s.name) {
                    return pane;
                }
            }
        };
        /**
         * Works out which panes to update when data is recieved from the server and viewTotal is active
         */
        SearchPanes.prototype._serverTotals = function () {
            var selectPresent = false;
            var deselectPresent = false;
            var table = this.s.dt;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                // Identify the pane where a selection or deselection has been made and add it to the list.
                if (pane.s.selectPresent) {
                    this.s.selectionList.push({ index: pane.s.index, rows: pane.s.dtPane.rows({ selected: true }).data().toArray(), protect: false });
                    table.state.save();
                    pane.s.selectPresent = false;
                    selectPresent = true;
                    break;
                }
                else if (pane.s.deselect) {
                    var selectedData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                    if (selectedData.length > 0) {
                        this.s.selectionList.push({ index: pane.s.index, rows: selectedData, protect: true });
                    }
                    selectPresent = true;
                    deselectPresent = true;
                }
            }
            // Build an updated list based on any selections or deselections added
            if (!selectPresent) {
                this.s.selectionList = [];
            }
            else {
                var newSelectionList = [];
                for (var i = 0; i < this.s.selectionList.length; i++) {
                    var further = false;
                    // Find out if this selection is the last one in the list for that pane
                    for (var j = i + 1; j < this.s.selectionList.length; j++) {
                        if (this.s.selectionList[j].index === this.s.selectionList[i].index) {
                            further = true;
                        }
                    }
                    // If there are no selections for this pane in the list then just push this one
                    if (!further) {
                        var push = false;
                        for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            if (pane.s.index === this.s.selectionList[i].index &&
                                pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0) {
                                push = true;
                            }
                        }
                        if (push) {
                            newSelectionList.push(this.s.selectionList[i]);
                        }
                    }
                }
                this.s.selectionList = newSelectionList;
            }
            var initIdx = -1;
            // If there has been a deselect and only one pane has a selection then update everything
            if (deselectPresent && this.s.selectionList.length === 1) {
                for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                    var pane = _e[_d];
                    pane.s.lastSelect = false;
                    pane.s.deselect = false;
                    if (pane.s.dtPane !== undefined && pane.s.dtPane.rows({ selected: true }).data().toArray().length > 0) {
                        initIdx = pane.s.index;
                    }
                }
            }
            // Otherwise if there are more 1 selections then find the last one and set it to not update that pane
            else if (this.s.selectionList.length > 0) {
                var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                    var pane = _g[_f];
                    pane.s.lastSelect = (pane.s.index === last);
                    pane.s.deselect = false;
                }
            }
            // Otherwise if there are no selections then find where that took place and do not update to maintain scrolling
            else if (this.s.selectionList.length === 0) {
                for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                    var pane = _j[_h];
                    // pane.s.lastSelect = (pane.s.deselect === true);
                    pane.s.lastSelect = false;
                    pane.s.deselect = false;
                }
            }
            $$1(this.dom.panes).empty();
            // Rebuild the desired panes
            for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                var pane = _l[_k];
                if (!pane.s.lastSelect) {
                    pane.rebuildPane(undefined, this.s.dt.page.info().serverSide ? this.s.serverData : undefined, pane.s.index === initIdx ? true : null, true);
                }
                else {
                    pane._setListeners();
                }
                // append all of the panes and enable select
                $$1(this.dom.panes).append(pane.dom.container);
                if (pane.s.dtPane !== undefined) {
                    $$1(pane.s.dtPane.table().node()).parent()[0].scrollTop = pane.s.scrollTop;
                    $$1.fn.dataTable.select.init(pane.s.dtPane);
                }
            }
            // Only need to trigger a search if it is not server side processing
            if (!this.s.dt.page.info().serverSide) {
                this.s.dt.draw();
            }
        };
        /**
         * Initialises the tables previous/preset selections and initialises callbacks for events
         * @param table the parent table for which the searchPanes are being created
         */
        SearchPanes.prototype._startup = function (table) {
            var _this = this;
            $$1(this.dom.container).text('');
            // Attach clear button and title bar to the document
            this._attachExtras();
            $$1(this.dom.container).append(this.dom.panes);
            $$1(this.dom.panes).empty();
            var loadedFilter = this.s.dt.state.loaded();
            if (this.c.viewTotal && !this.c.cascadePanes) {
                if (loadedFilter !== null &&
                    loadedFilter !== undefined &&
                    loadedFilter.searchPanes !== undefined &&
                    loadedFilter.searchPanes.panes !== undefined) {
                    var filterActive = false;
                    for (var _i = 0, _a = loadedFilter.searchPanes.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        if (pane.selected.length > 0) {
                            filterActive = true;
                            break;
                        }
                    }
                    if (filterActive) {
                        for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                            var pane = _c[_b];
                            pane.s.showFiltered = true;
                        }
                    }
                }
            }
            for (var _d = 0, _e = this.s.panes; _d < _e.length; _d++) {
                var pane = _e[_d];
                pane.rebuildPane(undefined, Object.keys(this.s.serverData).length > 0 ? this.s.serverData : undefined);
                $$1(this.dom.panes).append(pane.dom.container);
            }
            // Only need to trigger a search if it is not server side processing
            if (!this.s.dt.page.info().serverSide) {
                this.s.dt.draw();
            }
            // Reset the paging if that has been saved in the state
            if (!this.s.stateRead && loadedFilter !== null && loadedFilter !== undefined) {
                this.s.dt.page((loadedFilter.start / this.s.dt.page.len()));
                this.s.dt.draw('page');
            }
            this.s.stateRead = true;
            if (this.c.viewTotal && !this.c.cascadePanes) {
                for (var _f = 0, _g = this.s.panes; _f < _g.length; _f++) {
                    var pane = _g[_f];
                    pane.updatePane();
                }
            }
            this._updateFilterCount();
            this._checkMessage();
            // When a draw is called on the DataTable, update all of the panes incase the data in the DataTable has changed
            table.on('preDraw.dtsps', function () {
                _this._updateFilterCount();
                if ((_this.c.cascadePanes || _this.c.viewTotal) && !_this.s.dt.page.info().serverSide) {
                    _this.redrawPanes();
                }
                else {
                    _this._updateSelection();
                }
                _this.s.filterPane = -1;
            });
            // Whenever a state save occurs store the selection list in the state object
            this.s.dt.on('stateSaveParams.dtsp', function (e, settings, data) {
                if (data.searchPanes === undefined) {
                    data.searchPanes = {};
                }
                data.searchPanes.selectionList = _this.s.selectionList;
            });
            if (this.s.dt.page.info().serverSide) {
                table.off('page');
                table.on('page', function () {
                    _this.s.page = _this.s.dt.page();
                });
                table.off('preXhr.dt');
                table.on('preXhr.dt', function (e, settings, data) {
                    if (data.searchPanes === undefined) {
                        data.searchPanes = {};
                    }
                    // Count how many filters are being applied
                    var filterCount = 0;
                    for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        var src = _this.s.dt.column(pane.s.index).dataSrc();
                        if (data.searchPanes[src] === undefined) {
                            data.searchPanes[src] = {};
                        }
                        if (pane.s.dtPane !== undefined) {
                            var rowData = pane.s.dtPane.rows({ selected: true }).data().toArray();
                            for (var i = 0; i < rowData.length; i++) {
                                data.searchPanes[src][i] = rowData[i].filter;
                                filterCount++;
                            }
                        }
                    }
                    if (_this.c.viewTotal) {
                        _this._prepViewTotal();
                    }
                    // If there is a filter to be applied, then we need to read from the start of the result set
                    //  and set the paging to 0. This matches the behaviour of client side processing
                    if (filterCount > 0) {
                        // If the number of filters has changed we need to read from the start of the result set and reset the paging
                        if (filterCount !== _this.s.filterCount) {
                            data.start = 0;
                            _this.s.page = 0;
                        }
                        // Otherwise it is a paging request and we need to read from whatever the paging has been set to
                        else {
                            data.start = _this.s.page * _this.s.dt.page.len();
                        }
                        _this.s.dt.page(_this.s.page);
                        _this.s.filterCount = filterCount;
                    }
                });
            }
            else {
                table.on('preXhr.dt', function (e, settings, data) {
                    for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                        var pane = _a[_i];
                        pane.clearData();
                    }
                });
            }
            // If the data is reloaded from the server then it is possible that it has changed completely,
            // so we need to rebuild the panes
            this.s.dt.on('xhr', function (e, settings, json, xhr) {
                var processing = false;
                if (!_this.s.dt.page.info().serverSide) {
                    _this.s.dt.one('preDraw', function () {
                        if (processing) {
                            return;
                        }
                        var page = _this.s.dt.page();
                        processing = true;
                        $$1(_this.dom.panes).empty();
                        for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                            var pane = _a[_i];
                            pane.clearData(); // Clears all of the bins and will mean that the data has to be re-read
                            // Pass a boolean to say whether this is the last choice made for maintaining selections when rebuilding
                            pane.rebuildPane(_this.s.selectionList[_this.s.selectionList.length - 1] !== undefined ?
                                pane.s.index === _this.s.selectionList[_this.s.selectionList.length - 1].index :
                                false, undefined, undefined, true);
                            $$1(_this.dom.panes).append(pane.dom.container);
                        }
                        if (!_this.s.dt.page.info().serverSide) {
                            _this.s.dt.draw();
                        }
                        if (_this.c.cascadePanes || _this.c.viewTotal) {
                            _this.redrawPanes(_this.c.cascadePanes);
                        }
                        else {
                            _this._updateSelection();
                        }
                        _this._checkMessage();
                        _this.s.dt.one('draw', function () {
                            _this.s.dt.page(page).draw(false);
                        });
                    });
                }
            });
            // PreSelect any selections which have been defined using the preSelect option
            for (var _h = 0, _j = this.s.panes; _h < _j.length; _h++) {
                var pane = _j[_h];
                if (pane !== undefined &&
                    pane.s.dtPane !== undefined &&
                    ((pane.s.colOpts.preSelect !== undefined && pane.s.colOpts.preSelect.length > 0) ||
                        (pane.customPaneSettings !== null &&
                            pane.customPaneSettings.preSelect !== undefined &&
                            pane.customPaneSettings.preSelect.length > 0))) {
                    var tableLength = pane.s.dtPane.rows().data().toArray().length;
                    for (var i = 0; i < tableLength; i++) {
                        if (pane.s.colOpts.preSelect.indexOf(pane.s.dtPane.cell(i, 0).data()) !== -1 ||
                            (pane.customPaneSettings !== null &&
                                pane.customPaneSettings.preSelect !== undefined &&
                                pane.customPaneSettings.preSelect.indexOf(pane.s.dtPane.cell(i, 0).data()) !== -1)) {
                            pane.s.dtPane.row(i).select();
                        }
                    }
                    pane.updateTable();
                }
            }
            if (this.s.selectionList !== undefined && this.s.selectionList.length > 0) {
                var last = this.s.selectionList[this.s.selectionList.length - 1].index;
                for (var _k = 0, _l = this.s.panes; _k < _l.length; _k++) {
                    var pane = _l[_k];
                    pane.s.lastSelect = (pane.s.index === last);
                }
            }
            // If cascadePanes is active then make the previous selections in the order they were previously
            if (this.s.selectionList.length > 0 && this.c.cascadePanes) {
                this._cascadeRegen(this.s.selectionList);
            }
            // Update the title bar to show how many filters have been selected
            this._updateFilterCount();
            // If the table is destroyed and restarted then clear the selections so that they do not persist.
            table.on('destroy.dtsps', function () {
                for (var _i = 0, _a = _this.s.panes; _i < _a.length; _i++) {
                    var pane = _a[_i];
                    pane.destroy();
                }
                table.off('.dtsps');
                $$1(_this.dom.clearAll).off('.dtsps');
                $$1(_this.dom.container).remove();
                _this.clearSelections();
            });
            // When the clear All button has been pressed clear all of the selections in the panes
            if (this.c.clear) {
                $$1(this.dom.clearAll).on('click.dtsps', function () {
                    _this.clearSelections();
                });
            }
            table.settings()[0]._searchPanes = this;
        };
        SearchPanes.prototype._prepViewTotal = function () {
            var filterPane = this.s.filterPane;
            var filterActive = false;
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    var selectLength = pane.s.dtPane.rows({ selected: true }).data().toArray().length;
                    // If filterPane === -1 then a pane with a selection has not been found yet, so set filterPane to that panes index
                    if (selectLength > 0 && filterPane === -1) {
                        filterPane = pane.s.index;
                        filterActive = true;
                    }
                    // Then if another pane is found with a selection then set filterPane to null to
                    //  show that multiple panes have selections present
                    else if (selectLength > 0) {
                        filterPane = null;
                    }
                }
            }
            // Update all of the panes to reflect the current state of the filters
            for (var _b = 0, _c = this.s.panes; _b < _c.length; _b++) {
                var pane = _c[_b];
                if (pane.s.dtPane !== undefined) {
                    pane.s.filteringActive = true;
                    if ((filterPane !== -1 && filterPane !== null && filterPane === pane.s.index) || filterActive === false) {
                        pane.s.filteringActive = false;
                    }
                }
            }
        };
        /**
         * Updates the number of filters that have been applied in the title
         */
        SearchPanes.prototype._updateFilterCount = function () {
            var filterCount = 0;
            // Add the number of all of the filters throughout the panes
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    filterCount += pane.getPaneCount();
                }
            }
            // Run the message through the internationalisation method to improve readability
            var message = this.s.dt.i18n('searchPanes.title', 'Filters Active - %d', filterCount);
            $$1(this.dom.title).text(message);
            if (this.c.filterChanged !== undefined && typeof this.c.filterChanged === 'function') {
                this.c.filterChanged.call(this.s.dt, filterCount);
            }
        };
        /**
         * Updates the selectionList when cascade is not in place
         */
        SearchPanes.prototype._updateSelection = function () {
            this.s.selectionList = [];
            for (var _i = 0, _a = this.s.panes; _i < _a.length; _i++) {
                var pane = _a[_i];
                if (pane.s.dtPane !== undefined) {
                    this.s.selectionList.push({ index: pane.s.index, rows: pane.s.dtPane.rows({ selected: true }).data().toArray(), protect: false });
                }
            }
            this.s.dt.state.save();
        };
        SearchPanes.version = '1.2.2';
        SearchPanes.classes = {
            clear: 'dtsp-clear',
            clearAll: 'dtsp-clearAll',
            container: 'dtsp-searchPanes',
            emptyMessage: 'dtsp-emptyMessage',
            hide: 'dtsp-hidden',
            panes: 'dtsp-panesContainer',
            search: 'dtsp-search',
            title: 'dtsp-title',
            titleRow: 'dtsp-titleRow'
        };
        // Define SearchPanes default options
        SearchPanes.defaults = {
            cascadePanes: false,
            clear: true,
            container: function (dt) {
                return dt.table().container();
            },
            columns: [],
            filterChanged: undefined,
            layout: 'columns-3',
            order: [],
            panes: [],
            viewTotal: false
        };
        return SearchPanes;
    }());

    /*! SearchPanes 1.2.2
     * 2019-2020 SpryMedia Ltd - datatables.net/license
     */
    // DataTables extensions common UMD. Note that this allows for AMD, CommonJS
    // (with window and jQuery being allowed as parameters to the returned
    // function) or just default browser loading.
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery', 'datatables.net'], function ($) {
                return factory($, window, document);
            });
        }
        else if (typeof exports === 'object') {
            // CommonJS
            module.exports = function (root, $) {
                if (!root) {
                    root = window;
                }
                if (!$ || !$.fn.dataTable) {
                    $ = require('datatables.net')(root, $).$;
                }
                return factory($, root, root.document);
            };
        }
        else {
            // Browser - assume jQuery has already been loaded
            factory(window.jQuery, window, document);
        }
    }(function ($, window, document) {
        setJQuery($);
        setJQuery$1($);
        var DataTable = $.fn.dataTable;
        $.fn.dataTable.SearchPanes = SearchPanes;
        $.fn.DataTable.SearchPanes = SearchPanes;
        $.fn.dataTable.SearchPane = SearchPane;
        $.fn.DataTable.SearchPane = SearchPane;
        var apiRegister = $.fn.dataTable.Api.register;
        apiRegister('searchPanes()', function () {
            return this;
        });
        apiRegister('searchPanes.clearSelections()', function () {
            return this.iterator('table', function (ctx) {
                if (ctx._searchPanes) {
                    ctx._searchPanes.clearSelections();
                }
            });
        });
        apiRegister('searchPanes.rebuildPane()', function (targetIdx, maintainSelections) {
            return this.iterator('table', function (ctx) {
                if (ctx._searchPanes) {
                    ctx._searchPanes.rebuild(targetIdx, maintainSelections);
                }
            });
        });
        apiRegister('searchPanes.container()', function () {
            var ctx = this.context[0];
            return ctx._searchPanes
                ? ctx._searchPanes.getNode()
                : null;
        });
        $.fn.dataTable.ext.buttons.searchPanesClear = {
            text: 'Clear Panes',
            action: function (e, dt, node, config) {
                dt.searchPanes.clearSelections();
            }
        };
        $.fn.dataTable.ext.buttons.searchPanes = {
            action: function (e, dt, node, config) {
                e.stopPropagation();
                this.popover(config._panes.getNode(), {
                    align: 'dt-container'
                });
                config._panes.rebuild(undefined, true);
            },
            config: {},
            init: function (dt, node, config) {
                var panes = new $.fn.dataTable.SearchPanes(dt, $.extend({
                    filterChanged: function (count) {
                        dt.button(node).text(dt.i18n('searchPanes.collapse', { 0: 'SearchPanes', _: 'SearchPanes (%d)' }, count));
                    }
                }, config.config));
                var message = dt.i18n('searchPanes.collapse', 'SearchPanes', 0);
                dt.button(node).text(message);
                config._panes = panes;
            },
            text: 'Search Panes'
        };
        function _init(settings, fromPre) {
            if (fromPre === void 0) { fromPre = false; }
            var api = new DataTable.Api(settings);
            var opts = api.init().searchPanes || DataTable.defaults.searchPanes;
            var searchPanes = new SearchPanes(api, opts, fromPre);
            var node = searchPanes.getNode();
            return node;
        }
        // Attach a listener to the document which listens for DataTables initialisation
        // events so we can automatically initialise
        $(document).on('preInit.dt.dtsp', function (e, settings, json) {
            if (e.namespace !== 'dt') {
                return;
            }
            if (settings.oInit.searchPanes ||
                DataTable.defaults.searchPanes) {
                if (!settings._searchPanes) {
                    _init(settings, true);
                }
            }
        });
        // DataTables `dom` feature option
        DataTable.ext.feature.push({
            cFeature: 'P',
            fnInit: _init
        });
        // DataTables 2 layout feature
        if (DataTable.ext.features) {
            DataTable.ext.features.register('searchPanes', _init);
        }
    }));

}());


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net-dt', 'datatables.net-searchpanes'], function ($) {
            return factory($, window, document);
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }
            if (!$ || !$.fn.dataTable) {
                $ = require('datatables.net-dt')(root, $).$;
            }
            if (!$.fn.dataTable.SearchPanes) {
                require('datatables.net-searchpanes')(root, $);
            }
            return factory($, root, root.document);
        };
    }
    else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document) {
    'use strict';
    var DataTable = $.fn.dataTable;
    return DataTable.searchPanes;
}));


