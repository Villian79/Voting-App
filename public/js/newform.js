/* global $ */
$(document).ready(function(){
    $("#newform").on("click", function(){
        $("#formOptions").append('<div class="form-group"><input class="form-control" type="text" name="option[]" placeholder="New Option"></div>');
        });
        
    });