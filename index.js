$(document).ready(function () {
    $("#load-button").click(function () {
        $.ajax({
            url: "https://prodynafakeapi.herokuapp.com/api/hotels?count=2",
            type: 'GET',
            success: function ( result ) {
                $.each(result, function ( index, value ) {
                    var start = new Date(value.date_start);
                    var end = new Date(value.date_end);

                    star(value.stars);

                    $('.wrapper').append(`<section class="hotels${index}"><div class="hotel"${index}><div class="left-side">
                <img class="image" src="${value.images[ 0 ]}" alt="hotel_image"></div>
                <div class="right-side"><div class="stars">${star(value.stars)}</div>
                <span class="name">${value.name}</span><span class="city">${value.city}</span>
                <p class="description">${value.description}</p>
                <button id="reviews${index}">Show reviews</button>
                <div class="dateprice"><p class="price">${value.price} &euro;</p>
                <p class="date">${start.getDate()}.${start.getMonth()}.${start.getFullYear()} -
                 ${end.getDate()}.${end.getMonth()}.${end.getFullYear()}</p></div></div></div></section>`);

                    $("#reviews" + index).click(function (event) {
                        event.preventDefault();
                        $.ajax({
                            url: "https://prodynafakeapi.herokuapp.com/api/reviews?hotel_id="+value.id,
                            type: 'GET',
                            success: function ( results ) {
                                $.each(results, function ( index1, value ) {
                                    $('.hotels'+ index).append(`<div class="comments${index}"></div>`);
                                    status(value.positive);
                                    $('.right-side').append('<button class="hide">Hide reviews</button>');
                                    $(`.comments${index}`).append(`<div class="content"><p class="name">${value.name}</p>
                                    <div class="status"><span class="dot"><p>${status(value.positive)}</p></span></div>
                                    <p class="comment">${value.comment}</p></div><hr>`);
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