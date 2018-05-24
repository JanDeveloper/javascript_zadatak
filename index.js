$(document).ready(function() {
    $("#load-button").click(function(){
        $.ajax({
            url: "https://prodynafakeapi.herokuapp.com/api/hotels?count=1", 
            type: 'GET',
            success: function(result){
            $.each(result, function(index, value){
                $('.wrapper').append(
                    '<div class="hotel"><div class="left-side"></div> \
                    <div class="right-side"> \
                    <span class="name">' + value.name + '</span>\
                    <span>' + value.city + '</span></div></div>');
                $('.wrapper .right-side').append('<p class="description">' + value.description + '</p>');
                $('.wrapper .right-side').append('<button class="reviews">' + 'Show reviews' + '</button>');
                $('.wrapper .right-side').append('<p class="price">' + value.price + ' &euro;</p>');
                $('.wrapper .right-side').append('<p class="date">' + value.date_start + '-'+ value.date_end + '</p>');

                $(".reviews").click(function(){
                    $.ajax({
                        url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id=" + value.id,
                        type: 'GET',
                       success: function(results) {
                           console.log(results);
                       }
                    })}
               )   
            })
        }});
    })
});