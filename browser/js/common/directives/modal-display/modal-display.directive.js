app.directive('modalDisplay', function ($uibModal) {
    return {
        restrict: 'A',
        templateUrl: 'js/common/directives/modal-display/modal-display.template.html',
        link: function(scope, element, attr){
        	element.on('mouseover', function(e){
        		e.preventDefault();
        		$uibModal.open({
        			animation: scope.
        		})

        	})
        }
    };
});



// $(function () {
//     /* BOOTSNIPP FULLSCREEN FIX */
//     if (window.location == window.parent.location) {
//         $('#back-to-bootsnipp').removeClass('hide');
//         $('.alert').addClass('hide');
//     } 
    
//     $('#fullscreen').on('click', function(event) {
//         event.preventDefault();
//         window.parent.location = "http://bootsnipp.com/iframe/Q60Oj";
//     });
    
//     $('tbody > tr').on('click', function(event) {
//         event.preventDefault();
//         $('#myModal').modal('show');
//     })
    
//     $('.btn-mais-info').on('click', function(event) {
//         $( '.open_info' ).toggleClass( "hide" );
//     })
    
     
// });