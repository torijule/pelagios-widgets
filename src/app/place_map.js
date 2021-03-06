/**
 * Pelagios place map library
 * @license GPL v3(see LICENSE.txt)
 */
 define(['app/loadGMaps!lib/async!http://maps.google.com/maps/api/js?sensor=false'], function () {
    function PlaceMap(id) {
        
        // check ID exists 
        if (!document.getElementById(id)) {
            throw Error('ERROR: Invalid ID for place map');
        }
        
        try {
            var map = new google.maps.Map(
                            document.getElementById(id), 
                            {zoom:      8, 
                             mapTypeId: google.maps.MapTypeId.TERRAIN});
        } catch (err) {
            console.log('ERROR: Failed to crate Google map for element id '+id+' : '+err);
        }
        
        try {
            var marker = new google.maps.Marker({map: map});
        } catch (err) {
            console.log('ERROR: Failed to create Google Map marker : '+err);
        }


        this.refresh = function() {
            try {
                google.maps.event.trigger(map,'resize');
            } catch (err) {
                console.log('ERROR: Failed to resize Google map :'+ err);
            }
            
            try {
                map.setCenter(marker.getPosition());
            } catch (err) {
                console.log('ERROR: Failed to center Google Map : '+err);
            }
        } 
        
        this.setMarker= function(coordinates, title) {
            try {
                var location = new google.maps.LatLng(coordinates[1], 
                                                  coordinates[0]);
            } catch (err) {
                console.log('ERROR: Failed to create Google Maps location : '+err);
            }
            
            try {            
                marker.setPosition(location);
            } catch (err) {
                console.log('ERROR: Failed to set marker position : '+err);
            }  
            
            try {
                marker.setTitle(title);
            } catch (err) {
                console.log('ERROR: Failed to set marker title : '+err);
            }  

            try {
                map.setCenter(location); 
            } catch (err) {
                console.log('ERROR: Failed to center Google Map : '+err);
            }
            
            try {            
                google.maps.event.trigger(map,'resize');
            } catch (err) {
                console.log('ERROR: Failed to resize Google Map : '+err);
            }  
        }
    }
    
    return {PlaceMap:PlaceMap}
 });