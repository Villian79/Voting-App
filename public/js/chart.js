/*global Chart*/
/*global $*/



$(document).ready(function(){
    $.ajax({
        url: window.location.pathname + "/data", 
        type: "GET",
        success: function(poll){
            console.log(poll);
            var labels = [];
            var votes = [];
            var backgroundColor = [];
            
            poll.options.forEach(function(option){
                labels.push(option.name);
                votes.push(option.respondents.length);
                backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
            });
            console.log(window.location.pathname);
            console.log(labels);
            console.log(votes);
            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Poll votes",
                        data: votes,
                        backgroundColor: backgroundColor,
                        borderColor: "lightblue",
                        fill: false,
                        lineTension: 0.3,
                        pointRadius: 5
                    }
                ]
            };
            var options = {
                title: {
                    display: true,
                    position: "top",
                    text: "Votes Counted",
                    fontSize: 18,
                    fontColor: "#333"
                },
                cutoutPercentage: 30,
                animation: {
                    animateScale: true
                },
                legend: {
                    display: true,
                    position: "bottom"
                }
            };
            
            var ctx = $("#myChart");
            var chart = new Chart(ctx, {
                type: "pie",
                data: data,
                options: options
            });
            
            
        },
        error: function(poll){
            console.log(poll);
        }
    });
});

