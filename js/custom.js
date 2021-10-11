var beast_traits = [];


$('document').ready(function(){

/*

*/

  
  menubuttons();
  metamasklogin();

  $('#beast-right').delay(500).fadeIn("slow");
  writedialogue("Welcome to Beastopia!<br>Log-in with Metamask to continue.");
  $('#dialogue-menu').delay(10000).fadeIn();
  

  


  function writedialogue(msg){
   
    var typewriter = new Typewriter('#dialogue', {
      autoStart: true,
      loop:false
    });

    typewriter.typeString(msg).start();

  }

  /* Metamask Log-in Start */

  function metamasklogin(){

    $(".enableEthereumButton").click(function(){
      writedialogue("Let's see...");
      $('#dialogue-menu').hide().html("");
      getAccount();
      
    });

    const ethereumButton = document.querySelector('.enableEthereumButton');
      const showAccount = document.querySelector('.showAccount');
      const showAssets = document.querySelector('.showAssets');
      const showCollections = document.querySelector('.showAssets');

      ethereumButton.addEventListener('click', () => {
        
        //writedialogue("Let's see...");
        //$('#dialogue-menu').hide().html("");
        //getAccount();
      });


      /* This function connects to Metamask*/
      async function getAccount() {
        console.log("see this?");
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          console.log("see this3?");
          showAccount.innerHTML = account;
          console.log("see this4?");
          getassets(account);
        } catch(err){
          writedialogue("Uh oh. Looks like you don't have Metamask.<br> You can go get it <a href='https://metamask.io/' target='_blank'>here</a>.");
        }
      }


      function getassets(id){
        const options = {method: 'GET'};
        $("#wallet_id").html(id);
        /*
        var collection_names = [];
        var collections = [];
        */
        console.log("woah?");
        fetch('https://api.opensea.io/api/v1/collections?asset_owner='+id+'&offset=0&limit=300', options)
          .then(function(response) {
            return response.json();
          }).then(function(data) {

            console.log("anything?");
            var pixelbeast_owner = false;
             var pixelbeasts_address = "0xd539a3a5edb713e6587e559a9d007ffff92bd9ab";  /* pixelbeast */
            /*var pixelbeasts_address = "0x5cd881d5a46fcc18524ae2b632a5010c3422ecf9"; *//*kokeshi*/
           /* var pixelbeasts_address = "0x148d9a6a14d9ca20ffac639674fbf39a75765ef5"; *//*numbers*/



            var collections = data;
            for (const collection of collections){
              var address = (collection["primary_asset_contracts"]["0"]["address"]);
              var name = (collection["primary_asset_contracts"]["0"]["name"]);
              var image_url = (collection["primary_asset_contracts"]["0"]["image_url"]);
              $("#hide-categories-here").append('<li class="room-selection mb-2 mt-2" id="'+address+'" image_url="'+image_url+'">'+name+'</li>');
              console.log('<li id="'+address+'" image_url="'+image_url+'">'+name+'</li>');
              if (address == pixelbeasts_address){
                pixelbeast_owner = true;
              }
            }
            

            var delay = 0;
            console.log("yo");
            if (pixelbeast_owner==true){
              console.log(true);
              /* fetch pixelbeast assets */
              fetch('https://api.opensea.io/api/v1/assets?owner='+id+'&asset_contract_address='+pixelbeasts_address+'&order_direction=desc&offset=0&limit=50', options)
                .then(function(response2) {
                  console.log("then return");
                  return response2.json();

                }).then(function(data2) {
                  console.log(data2["assets"]);

                  function loopassets(_callback){
                    console.log("loopassets");
                    
                    for (const asset of data2["assets"]){
                      console.log("started loop");
                      console.log(asset);
                      var token_id = asset["token_id"];
                      console.log(token_id);

                      if (token_id<10){
                        token_id="000"+token_id;
                      } else if (token_id<100){
                        token_id="00"+token_id;
                      } else if (token_id<1000){
                        token_id="0"+token_id;
                      }


                      var image = asset["image_thumbnail_url"];
                      var traits = [];
                      for (const trait of asset["traits"]){
                        var trait_type = trait["trait_type"];
                        var value = trait["value"];
                        traits[trait_type]=value;
                      }
                      console.log(traits);
                      beast_traits[token_id]=traits;
                      $("#beast-select").prepend('<div class="rpgui-container rpgui-cursor-point framed-golden beast-choice" id="'+token_id+'"><img src="'+image+'" width=100></div>');
                    }
                    console.log("beast_traits");
                    console.log(beast_traits);
                    _callback();
                  }

                  loopassets(function(){
                    console.log("beast-choice click function");

                    beastchoice();
                  })






                }).catch(
                err => console.error(err)
                );

              
              $(".modal").show();
              

            /* end if pixelbeast_owner=true */
            } else {
            /* begin if pixelbeast_owner=false */

              writedialogue("Uh oh, looks like you don't have a Metamask. Go <a href='https://www.pixelbeasts.xyz' target='_blank'>get one</a> and come back!");

            }



            /*
            var assets = data["assets"];
            for (const asset of assets){
              console.log(asset);
             
              var id = (asset["id"]);
              var name = (asset["name"]);
              var permalink = (asset["permalink"]);
              var image_url = (asset["image_url"]);
              var collection_name = (asset["collection"]["name"]);
              var collection_external_link = (asset["collection"]["external_link"]);
              var asset_contract_address = (asset["asset_contract"]["address"]);
              $(".showAssets").append(name+"<br>");
              

              //create arrays
              if(jQuery.inArray(collection_name, collection_names) != -1) {
                collections[collection_name]["count"]++;
              } else {
                collection_names.push(collection_name);
                collections[collection_name]={};
                collections[collection_name]["count"]=1;
                collections[collection_name]["collection_name"]=collection_name;
              } 

            }

            for (const collection_name of collection_names){
              $(".showCollections").append(collections[collection_name]["collection_name"]+"<br>"); 
            }
            */
            



          }).catch(
            err => console.error(err)
          );
      }



  }

  

  /* Metamask Log-in End */

  /* Menu functions */

  function menubuttons(){
    $('.menu-button').click(function(){
      console.log("clicked");
      var id = $(this).attr("id");
      console.log(id);
      $('#content').hide().empty();
      $('#content').load('include/'+id+'.html',{'id': id}).show();
      console.log("loaded");
    });
  }


  function beastchoice(){ 
    console.log("beastchoice");
    $(".beast-choice").click(function(){
      var token_id = $(this).attr("id");
      if (token_id<1000){
        var image_id = "%23"+token_id;
      } else {
        var image_id = token_id;
      }
      $("#token_id").html(token_id);
      $("#token_id2").html(token_id);
      $(".modal").hide();
      console.log("hide");
      $('#beast-left').css("background-image","url('nobg/"+image_id+".png')").delay(500).fadeIn("slow");
      writedialogue("Yay!!! You're here! Come come, your friends are waiting for you.");
      var delay = 12000; /* 12000 */
      $("#dialogue-container").delay(delay).fadeOut();
      $("#beast-left").delay(14000).fadeOut();
      $("#beast-right").delay(delay).fadeOut();
      $("#logged-in").delay(delay).slideDown("slow");
      $('#content').hide().delay(delay).load('include/lobby.html',{'id': token_id}).slideDown("slow");
      $('#profile-image').append('<img src="nobg/'+image_id+'.png" height=100 style="float:right">');

      var beast = beast_traits[token_id]["Beast"]+'<br/>';
      if (beast_traits[token_id]["Eyes"] != undefined){var eyes = beast_traits[token_id]["Eyes"]+'<br/>';} else {eyes="";}
      if (beast_traits[token_id]["Hat"] != undefined){var hat = beast_traits[token_id]["Hat"]+'<br/>';} else {hat="";}
      if (beast_traits[token_id]["Shirt"] != undefined){var shirt = beast_traits[token_id]["Shirt"]+'<br/>';} else {shirt="";}
      if (beast_traits[token_id]["Neck"] != undefined){var neck = beast_traits[token_id]["Neck"]+'<br/>';} else {neck="";}
      var best_friend = 'Best Friend: '+beast_traits[token_id]["Best_Friend"]+'<br/>';
      var nemesis = 'Nemesis: '+beast_traits[token_id]["Nemesis"]+'<br/>';
      var element = 'Element: '+beast_traits[token_id]["Element"]+'<br/>';
      var habitat = 'Habitat: '+beast_traits[token_id]["Habitat"]+'<br/>';
      var ddclass = 'Class: '+beast_traits[token_id]["Class"]+'<br/>';
      var strength = 'Strength:'+beast_traits[token_id]["Strength"]+'<br/>';
      var speed = 'Speed:'+beast_traits[token_id]["Speed"]+'<br/>';
      var endurance = 'Endurance:'+beast_traits[token_id]["Endurance"]+'<br/>';
      var intelligence = 'Intelligence:'+beast_traits[token_id]["Intelligence"]+'<br/>';
      var wisdom = 'Wisdom:'+beast_traits[token_id]["Wisdom"]+'<br/>';
      var charisma = 'Charisma:'+beast_traits[token_id]["Charisma"]+'<br/>';
      var attribute_x = 'Attribute X:'+beast_traits[token_id]["Attribute_X"]+'<br/>';
      var attribute_y = 'Attribute Y:'+beast_traits[token_id]["Attribute_Y"]+'<br/>';
      var attribute_z = 'Attribute Z:'+beast_traits[token_id]["Attribute_Z"]+'<br/>';
      var D_4_6_8_10_12_20 = 'D_4_6_8_10_12_20:'+beast_traits[token_id]["D_4_6_8_10_12_20"]+'<br/>';
      var profile_string = best_friend+nemesis+element+habitat+ddclass+strength+speed+endurance+intelligence+wisdom+charisma+attribute_x+attribute_y+attribute_z+D_4_6_8_10_12_20;

      console.log(beast+eyes+hat+shirt+neck);
      $('#profile-info').append('<p class="poppins">'+beast+eyes+hat+shirt+neck+'</p>');

    });
  }

  $('#open-profile').click(function(){
      console.log("clicked!");
      $('#modal-main').empty().load('include/profile.html');
      $('.modal').show();
      $('#close-modal').show();
  });

  $('#close-modal-button').click(function(){
    $('.modal').hide();
  });





});