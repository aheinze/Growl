
(function($){
  
  //GROWL OBJECT
  //--------------------------------------------------------------------
  
  $.Growl = {

    _growlContainer: null,
    _statsCount: 0,
    
    show: function(message, options){
    
      var settings = $.extend({
        "id": ("gs"+$.Growl._statsCount++),
        "icon": false,
        "title": false,
        "message": message,
        "cls": "",
        "speed": 500,
        "timeout": 3000
      },options);
      
      $("#"+settings.id).remove();
      
      //append status
      this._getContainer().prepend(
        '<div id="'+settings.id+'" class="growlstatus '+settings.cls+'" style="display:none;"><div class="growlstatusclose"></div>'+settings.message+'</div>'
      );
      
      var status = $("#"+settings.id);
      
      //bind close button
      status.find(".growlstatusclose").bind('click',function(){
        $.Growl.close(settings.id,true,settings.speed);
      });
      
      //show title
      if(settings.title!==false){
        status.prepend('<div class="growltitle">'+settings.title+'</div>');
      }
      
      //show icon
      if(settings.icon!==false){
        status.addClass("growlwithicon").addClass("growlicon_"+settings.icon);
      }
      
      status
      //do not hide on hover
      .hover(
        function(){
          status.addClass("growlhover");
        },
        function(){
          status.removeClass("growlhover");
          if(settings.timeout!==false){
            window.setTimeout(function(){$.Growl.close(settings.id);}, settings.timeout);
          }
        }
      )      
      //show status+handle timeout
      .fadeIn(settings.speed,function(){
        if(settings.timeout!==false){
          window.setTimeout(function(){$.Growl.close(settings.id);}, settings.timeout);
        }
      });
      
      return settings.id;
    },
    
    close: function(id,force,speed){
    
      if(arguments.length==0){
        $(".growlstatus",this._getContainer()).hide().remove();
      }else{
          var status = $("#"+id);

          if(!status.hasClass("growlhover") || force){
            status.animate({opacity:"0.0"}, speed).slideUp(function(){
                  status.remove();
            })
          }
      }
    },
    
    _getContainer: function(){
      
      if(!this._growlContainer) {
        this._growlContainer = $('<div id="growlcontainer"></div>').appendTo("body");
      }
      return this._growlContainer;
    }
  };
})(jQuery);