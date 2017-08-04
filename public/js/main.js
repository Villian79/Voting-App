/* global $ */
$(document).ready(function(){
    $("#newOptionRadio").on("click", function(){
        $("#newoption").show(500);
        });
        $("#newoption").change(function(){
            $(".optionsRadios").attr("disabled", true);
        });
    });
    