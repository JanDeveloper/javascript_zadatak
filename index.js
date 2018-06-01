$(document).ready(function () {
    $("#load-button").click(function () {
        $(".wrapper").fadeIn("slow");
        $("#load-button").hide("slow");
        $("#hide-button").show("slow");
        $.ajax({
            url: "https://prodynafakeapi.herokuapp.com/api/hotels?count=2",
            type: 'GET',
            success: function ( result ) {
                $("#hide-button").click(function () {
                    $(".wrapper").fadeOut("slow");
                    $("#load-button").show("slow");
                    $("#hide-button").hide("slow");
                $("#hotels").remove();
                $("#hotels").remove();})
                $.each(result, function ( index, value ) {
                    var start = new Date(value.date_start);
                    var end = new Date(value.date_end);
                    star(value.stars);
                    var id = + new Date();
                    $('.wrapper').append(`<section id="hotels" class="hotels${id}"><div class="hotel"><div class="left-side">
                <img class="image" src="${value.images[ 0 ]}" alt="hotel_image"></div>
                <div id="right-side" class="right-side${id}"><div class="stars">${star(value.stars)}</div>
                <span class="name">${value.name}</span><span class="city">${value.city}</span>
                <p class="description">${value.description}</p>
                <button id="reviews${id}">Show reviews</button>
                <div class="dateprice"><p class="price">${value.price} &euro;</p>
                <p class="date">${start.getDate()}.${start.getMonth()}.${start.getFullYear()} -
                 ${end.getDate()}.${end.getMonth()}.${end.getFullYear()}</p></div></div></div></section>`);

                    $("#reviews" + id).click(function (event) {
                        event.preventDefault();
                        $("#reviews" + id).remove();
                        $.ajax({
                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                            type: 'GET',
                            success: function ( results ) {
                                $('.hotels'+ id).append(`<div id="comments" class="comments${id}"></div>`);
                                $('.right-side'+ id).append(`<button class="hide${id}">Hide reviews</button>`);
                                $.each(results, function ( index, value ) {
                                    status(value.positive);
                                    $('.comments' + id).append(`<div class="content"><p class="name">${value.name}</p>
                                    <div class="status"><span class="dot"><p>${status(value.positive)}</p></span></div>
                                    <p class="comment">${value.comment}</p></div><hr>`)
                                    $(".hide" + id).click(function() { 
                          
                                    $.ajax({
                                           url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                           type: 'GET',
                                        success: function(res) {
                                            $('.wrapper .hotel .right-side'+ id).append(`<button class="review${id}">` + `Show reviews` + `</button>`)
                                            $(".hide" + id).remove();
                                            $(".comments" + id).slideUp("slow");
                                        $.each(res, function(index, value) {
                                                       })
                                        $(".review"+ id).click(function() {
                                           
                                    $.ajax({
                                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                            type: 'GET',
                                        success: function(resul) {
                                            $(".comments" + id).slideDown();
                                            $(".review"+ id).hide();
                                            $('.wrapper .hotel .right-side'+ id).append(`<button class="hiden${id}">` + `Hide reviews` + `</button>`)

                                            $.each(resul, function(index, value) {
                                                                       })
                                                $(".hiden"+id).click(function() {
                                                    
                                            $.ajax({
                                                    url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                                    type: 'GET',
                                                success: function(resu) { 
                                                    $(".hiden"+ id).remove();
                                                    $(".comments" + id).slideUp("slow");
                                                    $(".review"+ id).show();       
                                                    $.each(resu, function(index, value) {
                                                                })
                                                            }}) 
                                                        })
                                                      
                                                    }}) 
                                                })  
                                          
                                        }})   
                                    })
                                })
                            }
                        });
                    })
                });
            }
        });
    })
});

function status( positive ) {
    if ( positive === true ) {
        return "+";
    } else if ( positive === false ) {
        return " -";
    }
}

function star( a ) {
    if ( a === 5 ) {
        return "&#9733 &#9733 &#9733 &#9733 &#9733";
    } else if ( a === 4 ) {
        return "&#9733 &#9733 &#9733 &#9733 &#9734";
    } else if ( a === 3 ) {
        return "&#9733 &#9733 &#9733 &#9734 &#9734";
    } else if ( a === 2 ) {
        return "&#9733 &#9733 &#9734 &#9734 &#9734";
    } else if ( a === 1 ) {
        return "&#9733 &#9734 &#9734 &#9734 &#9734";
    } else {
        return "&#9734 &#9734 &#9734 &#9734 &#9734";
    }
}
