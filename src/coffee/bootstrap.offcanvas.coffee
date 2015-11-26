(($, window) ->
    class OffcanvasDropdown
        #   Public: Constructor for offcanvas
        #
        #   @element - Element that toggles the offcanvas
        constructor: (@element) ->
            @element = $ @element

            # Get dropdown element
            @dropdown = @element.parent().find ".dropdown-menu"

            # Click event
            @element.on 'click', @_clickEvent

        #   Private: Click event on link
        _clickEvent: (e) =>
            e.preventDefault() if !@dropdown.hasClass 'shown'

            # Show or hide element
            @dropdown.toggleClass "shown"
            @element.parent().toggleClass 'active'

    class OffcanvasTouch
        #   Public: Constructor for offcanvas
        #
        #   @button - Toggle button element
        #   @element - Element that toggles the offcanvas
        #   @location - Location of offcanvas (Left/Right)
        #   @offcanvas - Offcanvas class ref
        constructor: (@button, @element, @location, @offcanvas) ->
            @endThreshold = 130
            @startThreshold = if @element.hasClass 'navbar-offcanvas-right' then $("body").outerWidth() - 60 else 20
            @maxStartThreshold = if @element.hasClass 'navbar-offcanvas-right' then $("body").outerWidth() - 20 else 60
            @currentX = 0

            # Should this element fade in?
            @fade = if @element.hasClass 'navbar-offcanvas-fade' then true else false

            # Add touch start event
            $(document).on "touchstart", @_touchStart

            # Add touch move event
            $(document).on "touchmove", @_touchMove

            # Add touch end event
            $(document).on "touchend", @_touchEnd

        #   Private: Touch start
        #
        #   e - Event target
        _touchStart: (e) =>
            @startX = e.originalEvent.touches[0].pageX

            # Change the height of the offcanvas on touch start
            @element.height $(window).outerHeight()

        #   Private: Touch move
        #
        #   e - Event target
        _touchMove: (e) =>
            return true if $(e.target).parents('.navbar-offcanvas').length > 0

            if @startX > @startThreshold and @startX < @maxStartThreshold
                e.preventDefault()

                x = e.originalEvent.touches[0].pageX - @startX
                x = if @element.hasClass 'navbar-offcanvas-right' then -x else x

                if Math.abs(x) < @element.outerWidth()
                    # Get CSS to move element
                    @element.css @_getCss x
                    @element.css @_getFade x
            else if @element.hasClass 'in'
                e.preventDefault()

                x = e.originalEvent.touches[0].pageX + (@currentX - @startX)
                x = if @element.hasClass 'navbar-offcanvas-right' then -x else x

                if Math.abs(x) < @element.outerWidth()
                    # Get CSS to move element
                    @element.css @_getCss x
                    @element.css @_getFade x

        #   Private: Touch end
        #
        #   e - Event target
        _touchEnd: (e) =>
            return true if $(e.target).parents('.navbar-offcanvas').length > 0

            x = e.originalEvent.changedTouches[0].pageX
            end = if @element.hasClass 'navbar-offcanvas-right' then Math.abs(x) > (@endThreshold + 50) else x < (@endThreshold + 50)

            if @element.hasClass('in') and end
                @currentX = 0

                # Show or hide the element
                @element.removeClass 'in'
                    .css @_clearCss()
                @button.removeClass 'is-open'
            else if Math.abs(x - @startX) > @endThreshold and @startX > @startThreshold and @startX < @maxStartThreshold
                @currentX = if @element.hasClass 'navbar-offcanvas-right' then -@element.outerWidth() else @element.outerWidth()

                # Show or hide the element
                @element.toggleClass 'in'
                    .css @_clearCss()
                @button.toggleClass 'is-open'
            else
                @element.css @_clearCss()

            # Overflow on body element
            @offcanvas.bodyOverflow()

        #   Private: Get CSS
        #
        #   x - Location of touch
        _getCss: (x) =>
            x = if @element.hasClass 'navbar-offcanvas-right' then -x else x

            {
                "-webkit-transform": "translate3d(#{x}px, 0px, 0px)"
                "-webkit-transition-duration": "0s"
                "-moz-transform": "translate3d(#{x}px, 0px, 0px)"
                "-moz-transition": "0s"
                "-o-transform": "translate3d(#{x}px, 0px, 0px)"
                "-o-transition": "0s"
                "transform": "translate3d(#{x}px, 0px, 0px)"
                "transition": "0s"
            }

        #   Private: Get fade CSS
        #
        #   x - Location of touch
        _getFade: (x) =>
            # Is this a fade nav?
            if @fade
                {
                    "opacity": x / @element.outerWidth()
                }
            else
                {

                }

        #   Private: Clear CSS properties
        _clearCss: ->
            {
                "-webkit-transform": ""
                "-webkit-transition-duration": ""
                "-moz-transform": ""
                "-moz-transition": ""
                "-o-transform": ""
                "-o-transition": ""
                "transform": ""
                "transition": ""
                "opacity": ""
            }

    window.Offcanvas = class Offcanvas
        #   Public: Constructor for offcanvas
        #
        #   @element - Element that toggles the offcanvas
        constructor: (@element) ->
            # Does this element have a target
            target = if @element.attr 'data-target' then @element.attr 'data-target' else false

            # Continue if target is not false
            if target
                # Get target element
                @target = $(target)

                # Target must be available before running
                if @target.length and !@target.hasClass 'js-offcanas-done'
                    # Add class to element to say it already has events
                    @element.addClass 'js-offcanvas-has-events'

                    # Get the location of the offcanvas menu
                    @location = if @target.hasClass "navbar-offcanvas-right" then "right" else "left"

                    @target.addClass if transform then "offcanvas-transform js-offcanas-done" else "offcanvas-position js-offcanas-done"

                    # Add some data
                    @target.data 'offcanvas', @

                    # Click event on element
                    @element.on "click", @_clicked

                    # Remove then height on transition end
                    @target.on 'transitionend', =>
                        if @target.is ':not(.in)'
                            @target.height ''

                    # Click event on document
                    $(document).on "click", @_documentClicked

                    # Should touch be added to this target
                    if @target.hasClass 'navbar-offcanvas-touch'
                        # Create touch class
                        t = new OffcanvasTouch @element, @target, @location, @

                    # Get all dropdown menu links and create a class for them
                    @target.find(".dropdown-toggle").each ->
                        d = new OffcanvasDropdown @

                    # Listen for a triggered event
                    @target.on 'offcanvas.toggle', (e) =>
                        @._clicked e
            else
                # Just log a warning
                console.warn 'Offcanvas: `data-target` attribute must be present.'

        #   Private: Change height of navbar
        _navbarHeight: =>
          if @target.is '.in'
            # For Android (And probably some other browsers)
            # The height of the element needs to be set to the window height
            @target.height $(window).outerHeight()

        #   Private: Clicked element
        #
        #   e - Event data
        _clicked: (e) =>
            e.preventDefault()

            @_sendEventsBefore()

            # Hide all other off canvas menus
            $(".navbar-offcanvas").not(@target).removeClass 'in'

            # Toggle in class
            @target.toggleClass 'in'
            @element.toggleClass 'is-open'

            @_navbarHeight()

            @bodyOverflow()

        #   Private: Document click event to hide offcanvas
        #
        #   e - Event data
        _documentClicked: (e) =>
            # Get clicked element
            clickedEl = $(e.target)

            if !clickedEl.hasClass('offcanvas-toggle') and clickedEl.parents('.offcanvas-toggle').length is 0 and clickedEl.parents('.navbar-offcanvas').length is 0 and !clickedEl.hasClass('navbar-offcanvas')
                if @target.hasClass 'in'
                    e.preventDefault()

                    @_sendEventsBefore()

                    @target.removeClass 'in'
                    @element.removeClass 'is-open'
                    @_navbarHeight()
                    @bodyOverflow()

        #   Private: Send before events
        _sendEventsBefore: =>
            # Send events
            if @target.hasClass 'in'
                @target.trigger 'show.bs.offcanvas'
            else
                @target.trigger 'hide.bs.offcanvas'

        #   Private: Send after events
        _sendEventsAfter: =>
            # Send events
            if @target.hasClass 'in'
                @target.trigger 'shown.bs.offcanvas'
            else
                @target.trigger 'hidden.bs.offcanvas'

        #   Public: Overflow on body
        bodyOverflow: =>
            if @target.is '.in'
                $('body').addClass 'offcanvas-stop-scrolling'
            else
                $('body').removeClass 'offcanvas-stop-scrolling'

            @_sendEventsAfter()


    #   Transform checker
    #
    #   Checks if transform3d is available for us to use
    transformCheck = =>
        el = document.createElement 'div'
        translate3D = "translate3d(0px, 0px, 0px)"
        regex = /translate3d\(0px, 0px, 0px\)/g

        el.style.cssText = "-webkit-transform: #{translate3D}; -moz-transform: #{translate3D}; -o-transform: #{translate3D}; transform: #{translate3D}"
        asSupport = el.style.cssText.match regex

        @transform = asSupport.length?

    $ ->
        # Work out if transform3d is available for use
        transformCheck()

        $('[data-toggle="offcanvas"]').each ->
            oc = new Offcanvas $(this)

        $(window).on 'resize', ->
          $('.navbar-offcanvas.in').each ->
            $(@).height('').removeClass 'in'

        $('.offcanvas-toggle').each ->
            $(this).on 'click', (e) ->
                if !$(this).hasClass 'js-offcanvas-has-events'
                    selector = $(this).attr 'data-target'

                    # Get el
                    el = $(selector)

                    if el
                        el.height ''
                        # Toggle class
                        el.removeClass 'in'
                        $('body').css
                            overflow: ''
                            position: ''

) window.jQuery, window
