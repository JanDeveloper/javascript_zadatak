$(document).ready(function () {
    $("#load-button").click(function () { 
        $('body').append(`<div class="loader"></div>`)
        $(".loader").fadeOut(2000);
        $(".wrapper").fadeIn(3000);
        $("#load-button").hide();
        $("#hide-button").show();
        $.ajax({
            url: "https://prodynafakeapi.herokuapp.com/api/hotels?count=2",
            type: 'GET',
            success: function ( result ) {
                $("#hide-button").click(function () {
                    $(".wrapper").fadeOut("slow");
                    $("#load-button").show();
                    $("#hide-button").hide();
                    $(".loader").remove();
                $(".row").remove();
                $(".row").remove();})
                $.each(result, function ( index, value ) {
                    var start = new Date(value.date_start);
                    var end = new Date(value.date_end);
                    star(value.stars);
                    var id = + new Date();
                    $('.wrapper').append(`<div class="row"><section id="hotels" class="hotels${id}"><div class="hotel">
                    <div class="col-sm-5"><div id="left-side">
                    <img class="image" src="${value.images[ 0 ]}" alt="hotel_image"></div></div>
                    <div class="col-sm-7"><div id="right-side" class="right-side${id}">
                    <div class="stars">${star(value.stars)}</div>
                    <span class="name">${value.name}</span><span class="city">${value.city}</span>
                    <p class="description">${value.description}</p>
                    <button id="reviews${id}">Show reviews</button>
                    <div class="dateprice"><p class="price">${value.price} &euro;</p>
                    <p class="date">${start.getDate()}.${start.getMonth()}.${start.getFullYear()} -
                    ${end.getDate()}.${end.getMonth()}.${end.getFullYear()}</p></div></div></div></div></section></div>`);

                    $("#reviews" + id).click(function (event) {
                        event.preventDefault();
                        $("#reviews" + id).remove();
                        $('.right-side' + id).append(`<button class="hide${id}">Hide reviews</button>`);
                        $.ajax({
                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                            type: 'GET',
                            success: function ( results ) {
                                $('.hotels'+ id).append(`<div id="comments" class="comments${id}"></div>`);
                                $.each(results, function ( index, value ) {
                                    status(value.positive);
                                    $('.comments' + id).append(`<div id="content" class="content"><p class="name">${value.name}</p>
                                    <div class="status"><span class="dot"><p>${status(value.positive)}</p></span></div>
                                    <p class="comment">${value.comment}</p></div><hr>`)
                                })
                                $(".hide" + id).click(function() {   
                                    $('.right-side' + id).append(`<button class="review${id}">Show reviews</button>`)
                                        $(".hide" + id).remove();
                                        $(".comments" + id).slideUp();        
                                        $.ajax({
                                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                            type: 'GET',
                                            success: function () {}})
                                    $(".review" + id).click(function() {
                                        $(".comments" + id).slideDown();
                                        $(".review" + id).hide();
                                        $('.right-side' + id).append(`<button class="hiden${id}">Hide reviews</button>`);
                                        $.ajax({
                                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                            type: 'GET',
                                            success: function () {}})
                                            $(".hiden" + id).click(function() {
                                                $(".hiden" + id).hide();
                                                $(".comments" + id).slideUp("slow");
                                                $(".review" + id).show(); 
                                                $.ajax({
                                                    url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                                                    type: 'GET',
                                                    success: function () {}})
                                                    })
                                            })  
                                })
                            }
                        });
                    })
                });
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal error, please refresh page.');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);
                }
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
