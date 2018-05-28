$(document).ready(function() {
    $("#load-button").click(function(){
        $(".hotel").hide();
        $(".comments").hide();
        $.ajax({
            url: "https://prodynafakeapi.herokuapp.com/api/hotels?count=1", 
            type: 'GET',
            success: function(result){
            $.each(result, function(index, value){
                var start = new Date (value.date_start);
                var end = new Date (value.date_end);
                var id = value.id;
                var a = value.stars;
                function star(a){       
                    if (a == 5) {
                      return "&#9733 &#9733 &#9733 &#9733 &#9733";
                    } else if (a == 4) {
                      return "&#9733 &#9733 &#9733 &#9733 &#9734";
                    } else if (a == 3) {
                        return "&#9733 &#9733 &#9733 &#9734 &#9734";
                      }else if (a == 2) {
                        return "&#9733 &#9733 &#9734 &#9734 &#9734";
                      }else if (a == 1) {
                        return "&#9733 &#9734 &#9734 &#9734 &#9734";
                      }else {
                          return "&#9734 &#9734 &#9734 &#9734 &#9734";
                      }}
                      

                      
                $('.wrapper').append('<div class="hotel"><div class="left-side">\
                <img class="image" src="' + value.images +' alt="hotel_image"></div>\
                <div class="right-side"><div class="stars">' + star(value.stars) + '</div>\
                <span class="name">' + value.name + '</span><span class="city">' + value.city + '</span>\
                <p class="description">' + value.description + '</p>\
                <button class="reviews">' + 'Show reviews' + '</button>\
                <div class="dateprice"><p class="price">' + value.price + ' &euro;</p>\
                <p class="date">' + start.getDate() + '.' + start.getMonth() + '.' + start.getFullYear() + ' -\
                 ' + end.getDate() + '.' + end.getMonth() + '.' + end.getFullYear() + '</p></div></div></div>')
              
             } )
             $(".reviews").click(function() {
                 $(".reviews").hide();
                 $(".comments").hide();
                $.ajax({
                    url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id=id",
                    type: 'GET',
                   success: function(results) {
                    $('.wrapper').append('<div class="comments"></div>');
                    $('.wrapper .hotel .right-side').append('<button class="hide">' + 'Hide reviews' + '</button>')
                    $.each(results, function(index, value) {
                        var p = value.positive;
                        function status(p){       
                            if (p == true) {
                              return "+";
                            } else if (p == false) {
                              return " -";
                            }}
                    $('.wrapper .comments').append('<div class="content"><p class="name">' + value.name + '</p>\
                    <div class="status"><span class="dot"><p>' + status(value.positive) + '</p></span></div>\
                    <p class="comment">' + value.comment + '</p></div><hr>') 
                    
                    }
                 )
                   }
            
                }
            )    
            })
  
        }});

    })

}); 