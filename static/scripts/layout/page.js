define(["layout/masthead","layout/panel","mvc/ui/ui-modal","utils/localization"],function(a,b,c,d){var e=Backbone.View.extend({el:"body",className:"full-content",_panelids:["left","right"],initialize:function(e){var f=this;this.config=_.defaults(e.config||{},{message_box_visible:!1,message_box_content:"",message_box_class:"info",show_inactivity_warning:!1,inactivity_box_content:""}),Galaxy.modal=this.modal=new c.View,Galaxy.display=this.display=function(a){a.title?(window.document.title="Galaxy "+(window.Galaxy.config.brand?" / "+window.Galaxy.config.brand:"")+" | "+d(a.title),a.allow_title_display=!1):a.allow_title_display=!0,f.center.display(a)},Galaxy.router=this.router=e.Router&&new e.Router(f,e),this.masthead=new a.View(this.config),this.center=new b.CenterPanel,this.$el.attr("scroll","no"),this.$el.html(this._template()),this.$("#masthead").replaceWith(this.masthead.$el),this.$("#center").append(this.center.$el),this.$el.append(this.masthead.frame.$el),this.$el.append(this.modal.$el),this.$messagebox=this.$("#messagebox"),this.$inactivebox=this.$("#inactivebox"),this.panels={},_.each(this._panelids,function(a){var c=a.charAt(0).toUpperCase()+a.slice(1),d=e[c];if(d){var g=new d(f,e);f[g.toString()]=g,f.panels[a]=new b.SidePanel({id:a,el:f.$("#"+a),view:g})}}),this.render(),this.router&&Backbone.history.start({root:Galaxy.root,pushState:!0})},render:function(){return $(".select2-hidden-accessible").remove(),this.masthead.render(),this.renderMessageBox(),this.renderInactivityBox(),this.renderPanels(),this._checkCommunicationServerOnline(),this},renderMessageBox:function(){if(this.config.message_box_visible){var a=this.config.message_box_content||"",b=this.config.message_box_class||"info";this.$el.addClass("has-message-box"),this.$messagebox.attr("class","panel-"+b+"-message").html(a).toggle(!!a).show()}else this.$el.removeClass("has-message-box"),this.$messagebox.hide();return this},renderInactivityBox:function(){if(this.config.show_inactivity_warning){var a=this.config.inactivity_box_content||"",b=$("<a/>").attr("href",Galaxy.root+"user/resend_verification").text("Resend verification");this.$el.addClass("has-inactivity-box"),this.$inactivebox.html(a+" ").append(b).toggle(!!a).show()}else this.$el.removeClass("has-inactivity-box"),this.$inactivebox.hide();return this},renderPanels:function(){var a=this;return _.each(this._panelids,function(b){var c=a.panels[b];c?c.render():(a.$("#center").css(b,0),a.$("#"+b).hide())}),this},_template:function(){return['<div id="everything">','<div id="background"/>','<div id="masthead"/>','<div id="messagebox"/>','<div id="inactivebox" class="panel-warning-message" />','<div id="left" />','<div id="center" class="inbound" />','<div id="right" />',"</div>",'<div id="dd-helper" />'].join("")},toString:function(){return"PageLayoutView"},_checkCommunicationServerOnline:function(){var a=window.Galaxy.config.communication_server_host,b=window.Galaxy.config.communication_server_port,c=window.Galaxy.user.attributes.preferences,d=$("#show-chat-online");c&&-1!=["1","true"].indexOf(c.communication_server)?$.ajax({url:a+":"+b}).success(function(){null!==window.Galaxy.user.id&&"hidden"===d.css("visibility")&&d.css("visibility","visible")}).error(function(){d.css("visibility","hidden")}):d.css("visibility","hidden")}});return{View:e}});
//# sourceMappingURL=../../maps/layout/page.js.map