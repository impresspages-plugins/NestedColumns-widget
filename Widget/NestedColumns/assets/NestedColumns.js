/* Place the code below into MySamplePlugin/Widget/HelloWorld/assets/MyWidget.js file */
IpWidget_NestedColumns = function() {
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


        $widgetObject.on('mouseover', $.proxy(this.focus, this));

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


        $(document).on('mousemove.NestedColumns', function( event ) {
            if (
                $widgetObject.offset().top - event.pageY > 40
                ||
                $widgetObject.offset().top + $widgetObject.height() < event.pageY
                ||
                event.pageX < $widgetObject.offset().left
                ||
                event.pageX > $widgetObject.offset().left + $widgetObject.width()
            ) {
                $.proxy(context.blur, context)();
            }
        });

        $controls.removeClass('hidden');
        $controls.css('left', $widgetObject.offsetLeft);
        $controls.css('top', $widgetObject.offsetTop);
        $controls.css('position', 'absolute');
        $controls.css('left', $widgetObject.offset().left);
        $controls.css('top', $widgetObject.offset().top - $controls.height());
        $controls.find('.ipsColCount').on('click', $.proxy(this.countPressed, this));

        $controls.find('.ipsColCount[data-count="' + this.data.cols.length + '"]').addClass('active');



    };

    this.removeControls = function () {
        this.$widgetObject.off('mousemove.NestedColumns');
        this.$controls.addClass('hidden');
        this.$controls.find('.ipsColCount').off();
        this.controlsOn = false;
    };

    this.countPressed = function (e) {
        this.removeControls();
        this.data.level = $(e.currentTarget).data('level');
        this.save(true);
    };



    this.save = function (refresh) {
        var saveData = {
            title: this.$widgetObject.find('h1,h2,h3,h4,h5,h6').html(),
            level: this.data.level,
            anchor: this.data.anchor,
            link: this.data.link,
            blank: this.data.blank
        };
        this.$widgetObject.save(saveData, refresh, function ($widget) {
            if (refresh) {
                $widget.find('h1,h2,h3,h4,h5,h6').focus();
            }
        });
    };


    this.destroy = function () {
        this.removeControls();
    };

};
