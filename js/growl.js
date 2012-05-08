/*
  $.Growl

  @description: Notification plugin
  @author: Artur Heinze 
*/
;(function($){
  
  var growlContainer;

  $.Growl = {

    show: function(message, options){
    
      var options = options || {};

      if(options.webnotification && window["webkitNotifications"]){
        
        if (webkitNotifications.checkPermission() === 0) {
          
          var title = options["title"] ? options.title:" ";

          return webkitNotifications.createNotification('data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==', title, $('<div>'+message+'</div>').text()).show();
        }else{
          webkitNotifications.requestPermission();
        }
      }

      if(!growlContainer) {
        growlContainer = $('<div id="growlcontainer"></div>').appendTo("body");
      }

      return new Status(message, options);
    }
  };

  /*
    Status object
  */

  function Status(message, options) {
      
    var $this = this;

    this.settings = $.extend({
      "title": false,
      "message": message,
      "speed": 500,
      "timeout": 3000
    }, options);

    this.status = $('<div class="growlstatus" style="display:none;"><div class="growlstatus-close"></div>'+this.settings.message+'</div>');

    //append status
    growlContainer.prepend(this.status);

    //bind close button
    this.status.delegate(".growlstatus-close", 'click', function(){
      $this.cancel(true);
    });

    //show title
    if(this.settings.title!==false){
      this.status.prepend('<div class="growltitle">'+this.settings.title+'</div>');
    }

    this.status
    //do not hide on hover
    .hover(
      function(){
        $this.status.data("growlhover", true);
      },
      function(){
        $this.status.data("growlhover", false);
        if($this.settings.timeout!==false){
          window.setTimeout(function(){$this.status.cancel();}, $this.settings.timeout);
        }
      }
    )      
    //show status+handle timeout
    .fadeIn(this.settings.speed,function(){
      if($this.settings.timeout!==false){
        window.setTimeout(function(){$this.cancel();}, $this.settings.timeout);
      }
    });
    
    this.cancel = function(force){
    
      if(!this.status.data("growlhover") || force){
        $this.status.animate({opacity:"0.0"}, $this.settings.speed).slideUp(function(){
              $this.status.remove();
        });
      }
    };
  }

})(jQuery);