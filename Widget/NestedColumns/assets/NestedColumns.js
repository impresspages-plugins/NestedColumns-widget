/* Place the code below into MySamplePlugin/Widget/HelloWorld/assets/MyWidget.js file */
var IpWidget_NestedColumns = function () {
    "use strict";

    this.$widgetObject = null;
    this.data = null;
    this.$header = null;
    this.$controls = null;
    this.controlsOn = false;

    this.init = function($widgetObject, data) {
        var context = this;
        this.data = data;
        this.$controls = $('#ipWidgetNestedColumnsControls');
        this.$widgetObject = $widgetObject;


        $widgetObject.on('mouseover', $.proxy(this.focus, context));

        if (!data.cols) {
            this.data.cols = [
                'column' + $widgetObject.data('widgetId') + '_1',
                'column' + $widgetObject.data('widgetId') + '_2'
            ];
        }
        this.$widgetObject.on('remove', $.proxy(this.destroy, this));

    };


    this.focus = function () {
        $.proxy(this.initControls, this)();
    };


    this.blur = function () {
       this.removeControls();
    };

    this.onAdd = function () {

    };


    this.initControls = function () {
        if (this.controlsOn) {
            return;
        }
        this.controlsOn = true;
        var $controls = this.$controls;
        var $widgetObject = this.$widgetObject;
        this.$controls.find('.ipsColCount').off();
        var context = this;


        $(document).off('mousemove.NestedColumns').on('mousemove.NestedColumns', function( event ) {
            if (
                $widgetObject.offset().top - event.pageY > 50
                ||
                $widgetObject.offset().top + $widgetObject.height() < event.pageY
                ||
                event.pageX < $widgetObject.offset().left
                ||
                event.pageX > $widgetObject.offset().left + $widgetObject.width()
            ) {
                //if out of the widget
                $.proxy(context.blur, context)();
            }
        });

        $controls.removeClass('hidden');
        $controls.css('left', $widgetObject.offsetLeft);
        $controls.css('top', $widgetObject.offsetTop);
        $controls.css('position', 'absolute');
        $controls.css('left', $widgetObject.offset().left);
        $controls.css('top', $widgetObject.offset().top - $controls.height() - 20);
        $controls.find('.ipsColCount').on('click', $.proxy(this.countPressed, this));

        $controls.find('.ipsColCount').removeClass('active');
        $controls.find('.ipsColCount[data-count="' + this.data.cols.length + '"]').addClass('active');



    };

    this.removeControls = function () {
        this.$widgetObject.off('mousemove.NestedColumns');
        this.$controls.addClass('hidden');
        this.$controls.find('.ipsColCount').off();
        this.controlsOn = false;
        $(document).off('mousemove.NestedColumns');

    };

    this.countPressed = function (e) {
        var context = this;
        this.removeControls();
        var count  = $(e.currentTarget).data('count');
        var cols = new Array ();
        var i = 1;
        for (i = 1; i <= count; i++) {
            cols.push('column' + context.$widgetObject.data('widgetid') + '_' + i);
        }
        this.data.cols = cols;

        this.save(true);
    };



    this.save = function (refresh) {
        var saveData = {
            cols: this.data.cols
        };
        this.$widgetObject.save(saveData, refresh, function ($widget) {
            //if (refresh) {
            //    $widget.find('h1,h2,h3,h4,h5,h6').focus();
            //}
        });
    };


    this.destroy = function () {
        this.removeControls();
    };

};
