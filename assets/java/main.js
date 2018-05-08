var userSearch = "";


        /////////////////////////////////////////////////////////////////////////////
        //                              GIF SEARCH                                 //
        /////////////////////////////////////////////////////////////////////////////


        //define global variables
        var gifList =["Bob's Burgers", "Arrested Development", "Lost", "Star Trek", "Regular Show", "Batman", "Lost in Space", "The Dinosaurs", "The Flintstones", "All That", "In Living Colour"];
        var gif="";
        var limit = 10;

        //add buttons
        function updateDisplay(){
            gifList.sort();
            $(".buttons").empty();
            for (i=0; i<gifList.length; i++){
                var btn = $("<button>");
                btn.addClass("text-capitalize baba btn-secondary pangolin rounded m-1");
                btn.attr("data-name", gifList[i]);
                btn.text(gifList[i]);
                $(".buttons").append(btn);
            };
        };
        
        //display gifs when user-made button is clicked
        function displayGifs(){
            $("#baba").empty();
            
            var rating ="";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif +"&api_key=29AwsyFWZJ8NLj3iM3GpEwp0NzECNriT&limit=" + limit + "&rating=" + rating;
                        
            $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response){
                    console.log(response);
                    for (i=0;i<limit; i++){
                        var col = $("<div>");
                            col.addClass("col-sm-4 col-md-3 mb-3 text-center");
                        var card = $("<div>");
                            card.addClass("card p-2");
                        var img = $("<img>");
                            img.addClass("bg-light border border-dark gifClick imgWidth200");
                            img.attr("src", response.data[i].images.fixed_width_still.url);
                            img.attr("data-gifStill", response.data[i].images.fixed_width_still.url);
                            img.attr("data-gifPlay", response.data[i].images.fixed_width.url);
                            img.attr("data-state", "still")
                            console.log(response.data[i].title.trim());                   
                            img.attr("title", response.data[i].title);
                            img.attr("rating", response.data[i].rating);
                        var title = $("<h6>");
                            if (response.data[i].title.trim() !=""){
                                title.text(response.data[i].title);
                            }
                            else{
                                title.text("Untitled GIF");
                            };
                            
                            title.addClass("text-dark mb-0 text-capitalize pangolin");
                        var rating = $("<p>")
                            rating.addClass("mt-0 mb-0 font-italic text-capitalize")
                            rating.text("Rating: " + response.data[i].rating);
                            
                            col.html(card)
                            card.append(title);                
                            card.append(img);
                            card.append(rating);
                        $("#baba").prepend(col);
                    };
            });
        };

        function buttonGifDisplay(){
            gif = $(this).attr("data-name");
            limit=10;
            displayGifs();
        };

        function searchGifDisplay(){
                console.log ("not sure");
                gif = userSearch;
                limit=10;
                displayGifs();
        };
        
        //play gif when clicked
        function gifClick(){
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-gifPlay"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-gifStill"));
                $(this).attr("data-state", "still");
            }
        };

        updateDisplay();

        //click handlers

        $("#addBtn").click(function(){
            if (userSearch.trim() != ""){
                gifList.push(userSearch.trim());
                gif=userSearch;
                limit=10;
                updateDisplay();
                displayGifs();
            }
        });

        $("#inputTextSearch").keyup(function(){
            userSearch = this.value;
            // console.log (this);
        });

        $("#viewMore").click(function(){
            limit +=10;
            displayGifs();
        });        
        
        $(document).on("click", ".baba", buttonGifDisplay);

        $(document).on("click", ".gifClick", gifClick);


        /////////////////////////////////////////////////////////////////////////////
        //                              Movie Search                               //
        /////////////////////////////////////////////////////////////////////////////


    