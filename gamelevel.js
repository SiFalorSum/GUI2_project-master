$( function() {
    $( "#slider" ).slider({
        value:1,
        range: "min",
        min: 0,
        max: 30,
        step: 1,
        slide: function( event, ui ) {
            $( "#gamelevel" ).val( ui.value );
        }
    });
    $( "#gamelevel" ).val( $( "#slider" ).slider( "value" ) );
} );
/**
 * Created by lei on 19/04/17.
 */
