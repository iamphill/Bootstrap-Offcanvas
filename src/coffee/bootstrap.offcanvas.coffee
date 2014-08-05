class Offcanvas
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
            if @target.length
                # Get the location of the offcanvas menu
                @location = if @target.hasClass "navbar-offcanvas-right" then "right" else "left"

                @target.addClass if transform then "offcanvas-transform" else "offcanvas-position"

                # Click event on element
                @element.on "click", @_clicked

                # Click event on document
                $(document).on "click", @_documentClicked
            else
                # Log a warning
                console.warn "Offcanvas: Can't find target element with selector #{target}."
        else
            # Just log a warning
            console.warn 'Offcanvas: `data-target` attribute must be present.'

    #   Private: Clicked element
    #
    #   e - Event data
    _clicked: (e) =>
        e.preventDefault()

        # Toggle in class
        @target.toggleClass 'in'

    #   Private: Document click event to hide offcanvas
    #
    #   e - Event data
    _documentClicked: (e) =>
        # Get clicked element
        clickedEl = $(e.target)

        if !clickedEl.hasClass('offcanvas-toggle') and clickedEl.parents('.offcanvas-toggle').length is 0 and clickedEl.parents('.navbar-offcanvas').length is 0 and !clickedEl.hasClass('navbar-offcanvas')
            if @target.hasClass 'in'
                e.preventDefault()
                @target.removeClass 'in'


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
