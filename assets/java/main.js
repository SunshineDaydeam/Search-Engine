        /////////////////////////////////////////////////////////////////////////////
        //                              GIF SEARCH                                 //
        /////////////////////////////////////////////////////////////////////////////

        //define global variables

        //Define favlist and giflist(whether )
        //if local storage has already been set up
        if (localStorage.favList != undefined){                    
            var favList = [localStorage.getItem("favList")];        //define favlist from local storage
            console.log("favList = " + favList);
        }
        //if favList is undefined, create a blank favlist array
        if (localStorage.favList == undefined){                     
            var favList =[];                                        //define blank favlist array
            localStorage.setItem("favList", favList);               //create localStorage.favlist from blank favlist array
            console.log("favlist= " + localStorage.favList);        
        }
        //if local storage is empty, create gifList
        if (localStorage.gifList == undefined){    
            //create an array of predetermined topics
            var gifList =["Bob's Burgers", "Arrested Development", "Lost", "Star Trek", "Regular Show", "Batman", "Lost in Space", "The Dinosaurs", "The Flintstones", "All That", "In Living Colour"];
            //define localstorage.giflist from giflist array
            localStorage.setItem("gifList", gifList);
        }
        //if local storage has gifList, pull giflist from local storage
        if(localStorage.gifList != undefined){                      
            var gifList = localStorage.gifList.split(",");          //define giflist from localstorage.giflist
            console.log(gifList);           
        };
        

        
        var userSearch = "";                                        //define user search variable
        var gif="";                                                 //define gif variable
        var limit = 10;                                             //set show limit to 10

        //add and update buttons FUNCTION
        function updateButtonDisplay(){                         
            gifList.sort();                                             //sort giflist                             
            $(".buttons").empty();                                      //clear current buttons
            for (i=0; i<gifList.length; i++){                           //for length of gifList
                var btn = $("<button>");                                //create a button
                btn.addClass("text-capitalize baba btn-secondary pangolin rounded m-1");    //give the button classes
                btn.attr("data-name", gifList[i]);                      //give the button a data-name
                btn.text(gifList[i]);                                   //give the button text
                $(".buttons").append(btn);                              //append the button to buttons
            };
        };

        //display gifs FUNCTION
        function displayGifs(){
            $("#baba").empty();                                     //clear current gifs on screen
            
            var rating ="";                                         //define rating as ""
            //define queryURL
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif +"&api_key=29AwsyFWZJ8NLj3iM3GpEwp0NzECNriT&limit=" + limit + "&rating=" + rating;
                        
            $.ajax({                                                
                url: queryURL,
                method: "GET"
                }).then(function(response){
                    console.log(response);
                    for (i=0;i<limit; i++){                                                             //for limit lentgth
                        var col = $("<div>");                                                           //build a div
                            col.addClass("col-sm-4 col-md-3 mb-3 text-center");                         //give div classes
                        var card = $("<div>");                                                          //build another div
                            card.addClass("card p-2");                                                  //give div classes
                        var img = $("<img>");                                                           //build an image
                            img.addClass("bg-light border border-dark gifClick imgWidth200");           //give img classes
                            img.attr("src", response.data[i].images.fixed_width_still.url);             //define src from response
                            img.attr("data-gifStill", response.data[i].images.fixed_width_still.url);   //define gifStill from response
                            img.attr("data-gifPlay", response.data[i].images.fixed_width.url);          //define gifPlay from response
                            img.attr("data-state", "still")                                             //define data-state as still
                        var title = $("<h6>");                                                          //build an h6
                            if (response.data[i].title.trim() !=""){                                    //if response has a title
                                title.text(response.data[i].title);                                     //define title from response
                            }
                            else{                                                                       //if response contains no title
                                title.text("Untitled GIF");                                             //label title as "untitled gif"
                            };
                            title.addClass("text-dark mb-0 text-capitalize pangolin");                  //give title classes         
                        var favBtn = $("<button>");                                                     //build a "add to favorites button"
                            favBtn.addClass("btn btn-info favClick");                                   //give button classes
                            favBtn.attr("id", response.data[i].id);                                     //define button id as response id
                            favBtn.text("Add to Favorites")                                             //give button text
                                              
                        var rating = $("<p>")                                                           //build a rating tag
                            rating.addClass("mt-0 mb-0 font-italic text-capitalize")                    //give rating classes
                            rating.text("Rating: " + response.data[i].rating);                          //define rating text from response
                            
                            col.html(card)                  //insert card into col div                                      
                            card.append(title);             //append title to card
                            card.append(img);               //append image to card
                            card.append(rating);            //append rating to card
                            card.append(favBtn);            //append favButton to card
                        $("#baba").prepend(col);            //Display Col to Html
                    };
            });
        };
        //display gifs button is clicked FUNCTION
        function buttonGifDisplay(){
            gif = $(this).attr("data-name");                //define gif as this.data-name
            limit=10;                                       //reset limit to 10
            displayGifs();                                  //run display gif function
        };
        //display gifs when search is entered FUNCTION
        function searchGifDisplay(){
                gif = userSearch;                           //define gif as userSearch
                limit=10;                                   //reset limit to 10
                displayGifs();                              //run display gif function
        };
        //play gif when clicked FUNCTION
        function gifClick(){
            var state = $(this).attr("data-state");                     //define state as this.data-state
            if (state === "still") {                                    //if state = still
                $(this).attr("src", $(this).attr("data-gifPlay"));          //change src to gifplay
                $(this).attr("data-state", "animate");                      //change state to animate
            } else {                                                    //if state = animate
                $(this).attr("src", $(this).attr("data-gifStill"));         //change src to gifStill
                $(this).attr("data-state", "still");                        //change state to still
            }
        };

        //add to favorites FUNCTION
        function favClick(){
            if (localStorage.favList.split(",").indexOf(this.id) == -1){    //if this hasnt already been added to favorites
                favList.push(this.id);                                      //push this id to fav list
                localStorage.setItem("favList", favList);                   //add to local storage
            }
        };

        updateButtonDisplay();                                  //run update button display function on startup

        //click handlers

        //Search Gifs Button
        $(".submit").on ("click",function(event){
            event.preventDefault();                                             //prevent default
            userSearch = $("#inputTextSearch").val();                           //set userSearch as inputtextsearch.value
            if (userSearch.trim() != ""){                                       //if userSearch isn't blank
                if (localStorage.gifList.split(",").indexOf(userSearch) == -1){ //if userSearch hasn't been entered already
                    gifList.push(userSearch.trim());                            //add userSearch to gifList
                    localStorage.setItem("gifList", gifList);                   //update localstorage.giflist
                    gif=userSearch;                                             //assign var gif = userSearch
                    limit=10;                                                   //reset limit to 10
                    updateButtonDisplay();                                      //create new button for userSearch
                }
                displayGifs();                                                  //show gifs on screen
            }
        });

        //Allow user to type enter to trigger  search
        $("#inputTextSearch").keyup(function(){                     //when user types key
            if (event.keyCode === 13){                              //if the key was enter-key
                event.preventDefault();                             //prevent default
                userSearch = $("#inputTextSearch").val();           //set userSearch as inputtextsearch.value
                if (userSearch.trim() != ""){                       //if userSearch isn't blank
                    gifList.push(userSearch.trim());                //add userSearch to gifList
                    localStorage.setItem("gifList", gifList);       //update localstorage.giflist
                    gif=userSearch;                                 //assign var gif = userSearch
                    limit=10;                                       //reset limit to 10
                updateButtonDisplay();                              //create new button for userSearch
                displayGifs();                                      //show gifs on screen
            }
            };
        });

        //View More Gifs Button (adds 10 more gifs to screen)
        $("#viewMore").click(function(){                        
            limit +=10;                                         //Increase number fo Gifs on screen +10  
            displayGifs();                                      //Display the Gifs
        });        

        //show favorites on screen
        $("#favBtn").click(function(){
            var savedId = localStorage.favList.split(",");
            
            for (i=0; i<savedId.length; i++){
                $("#baba").empty();
                var queryURL = "https://api.giphy.com/v1/gifs/"+ savedId[i] + "?api_key=29AwsyFWZJ8NLj3iM3GpEwp0NzECNriT";
                console.log(savedId[i]);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                    }).then(function(response){
                        console.log(response);
                            var col = $("<div>");
                                col.addClass("col-sm-4 col-md-3 mb-3 text-center");
                            var card = $("<div>");
                                card.addClass("card p-2");
                            var img = $("<img>");
                                img.addClass("bg-light border border-dark gifClick imgWidth200");
                                img.attr("src", response.data.images.fixed_width_still.url);
                                img.attr("data-gifStill", response.data.images.fixed_width_still.url);
                                img.attr("data-gifPlay", response.data.images.fixed_width.url);
                                img.attr("data-state", "still")
             
                            var title = $("<h6>");
                                if (response.data.title.trim() !=""){
                                    title.text(response.data.title);
                                }
                                else{
                                    title.text("Untitled GIF");
                                };
                                title.addClass("text-dark mb-0 text-capitalize pangolin");
                            var rating = $("<p>")
                                rating.addClass("mt-0 mb-0 font-italic text-capitalize")
                                rating.text("Rating: " + response.data.rating);
                                col.html(card)
                                card.append(title);                
                                card.append(img);
                                card.append(rating);
                            $("#baba").prepend(col);
                });

            };
                                    
            
        });
        
        $(document).on("click", ".baba", buttonGifDisplay);     //When a button is clicked, display Gifs

        $(document).on("click", ".gifClick", gifClick);         //When a Gif is clicked, run or pause Gif

        $(document).on("click", ".favClick", favClick);         //When a add to favorites is clicked, add to favorites
    