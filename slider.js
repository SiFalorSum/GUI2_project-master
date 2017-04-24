$( function() {
    $( "#slider-vertical" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 20,
        slide: function( event, ui ) {
            $( "#amount1" ).val( ui.value );
        }
    });
    $( "#amount1" ).val( $( "#slider-vertical" ).slider( "value" ) );
} );/**
 * Created by lei on 19/04/17.
 */

