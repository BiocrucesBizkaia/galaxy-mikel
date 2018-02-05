define("viz/trackster",["exports","utils/localization","libs/underscore","viz/trackster/tracks","viz/visualization","mvc/ui/icon-button","utils/query-string-parsing","mvc/grid/grid-view","utils/utils","libs/jquery/jquery.event.drag","libs/jquery/jquery.event.hover","libs/jquery/jquery.mousewheel","libs/jquery/jquery-ui","libs/jquery/select2","libs/farbtastic","libs/jquery/jquery.form","libs/jquery/jquery.rating","ui/editable-text"],function(e,t,a,i,o,n,l,r,s){"use strict";function d(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var c=d(t),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a),f=d(i),v=d(o),_=d(n),w=d(l),h=d(r),b=d(s),p=null,y=null,g=function(){this.initialize&&this.initialize.apply(this,arguments)};g.extend=Backbone.Model.extend;var m=g.extend({initialize:function(e){b.default.cssLoadFile("static/style/jquery.rating.css"),b.default.cssLoadFile("static/style/autocomplete_tagging.css"),b.default.cssLoadFile("static/style/jquery-ui/smoothness/jquery-ui.css"),b.default.cssLoadFile("static/style/library.css"),b.default.cssLoadFile("static/style/trackster.css"),this.baseURL=e},save_viz:function(){Galaxy.modal.show({title:"Saving...",body:"progress"});var e=[];$(".bookmark").each(function(){e.push({position:$(this).children(".position").text(),annotation:$(this).children(".annotation").text()})});var t=y.overview_drawable?y.overview_drawable.config.get_value("name"):null,a={view:y.to_dict(),viewport:{chrom:y.chrom,start:y.low,end:y.high,overview:t},bookmarks:e};return $.ajax({url:Galaxy.root+"visualization/save",type:"POST",dataType:"json",data:{id:y.vis_id,title:y.config.get_value("name"),dbkey:y.dbkey,type:"trackster",vis_json:JSON.stringify(a)}}).success(function(e){Galaxy.modal.hide(),y.vis_id=e.vis_id,y.has_changes=!1,window.history.pushState({},"",e.url+window.location.hash)}).error(function(){Galaxy.modal.show({title:(0,c.default)("Could Not Save"),body:"Could not save visualization. Please try again later.",buttons:{Cancel:function(){Galaxy.modal.hide()}}})})},createButtonMenu:function(){var e=this,t=_.default.create_icon_buttons_menu([{icon_class:"plus-button",title:(0,c.default)("Add tracks"),on_click:function(){v.default.select_datasets({dbkey:y.dbkey},function(e){u.each(e,function(e){y.add_drawable(f.default.object_from_template(e,y,y))})})}},{icon_class:"block--plus",title:(0,c.default)("Add group"),on_click:function(){y.add_drawable(new f.default.DrawableGroup(y,y,{name:"New Group"}))}},{icon_class:"bookmarks",title:(0,c.default)("Bookmarks"),on_click:function(){window.force_right_panel("0px"==$("div#right").css("right")?"hide":"show")}},{icon_class:"globe",title:(0,c.default)("Circster"),on_click:function(){window.location=e.baseURL+"visualization/circster?id="+y.vis_id}},{icon_class:"disk--arrow",title:(0,c.default)("Save"),on_click:function(){e.save_viz()}},{icon_class:"cross-circle",title:(0,c.default)("Close"),on_click:function(){e.handle_unsaved_changes(y)}}],{tooltip_config:{placement:"bottom"}});return this.buttonMenu=t,t},add_bookmark:function(e,t,a){var i=$("#right .unified-panel-body"),o=$("<div/>").addClass("bookmark").appendTo(i),n=$("<div/>").addClass("position").appendTo(o),l=($("<a href=''/>").text(e).appendTo(n).click(function(){return y.go_to(e),!1}),$("<div/>").text(t).appendTo(o));if(a){var r=$("<div/>").addClass("delete-icon-container").prependTo(o).click(function(){return o.slideUp("fast"),o.remove(),y.has_changes=!0,!1});$("<a href=''/>").addClass("icon-button delete").appendTo(r);l.make_text_editable({num_rows:3,use_textarea:!0,help_text:"Edit bookmark note"}).addClass("annotation")}return y.has_changes=!0,o},create_visualization:function(e,t,a,i,o){var n=this;return y=new f.default.TracksterView(u.extend(e,{header:!1})),y.editor=!0,$.when(y.load_chroms_deferred).then(function(e){if(t){var l=t.chrom,r=t.start,s=t.end,d=t.overview;l&&void 0!==r&&s?y.change_chrom(l,r,s):y.change_chrom(e[0].chrom)}else y.change_chrom(e[0].chrom);if(a)for(u=0;u<a.length;u++)y.add_drawable(f.default.object_from_template(a[u],y,y));for(u=0;u<y.drawables.length;u++)if(y.drawables[u].config.get_value("name")===d){y.set_overview(y.drawables[u]);break}if(i)for(var c,u=0;u<i.length;u++)c=i[u],n.add_bookmark(c.position,c.annotation,o);y.has_changes=!1}),this.set_up_router({view:y}),y},set_up_router:function(e){new v.default.TrackBrowserRouter(e),Backbone.history.start()},init_keyboard_nav:function(e){$(document).keyup(function(t){if(!$(t.srcElement).is(":input"))switch(t.which){case 37:e.move_fraction(.25);break;case 38:Math.round(e.viewport_container.height()/15);e.viewport_container.scrollTop(e.viewport_container.scrollTop()-20);break;case 39:e.move_fraction(-.25);break;case 40:Math.round(e.viewport_container.height()/15);e.viewport_container.scrollTop(e.viewport_container.scrollTop()+20)}})},handle_unsaved_changes:function(e){if(e.has_changes){var t=this;Galaxy.modal.show({title:(0,c.default)("Close visualization"),body:"There are unsaved changes to your visualization which will be lost if you do not save them.",buttons:{Cancel:function(){Galaxy.modal.hide()},"Leave without Saving":function(){$(window).off("beforeunload"),window.location=Galaxy.root+"visualization"},Save:function(){$.when(t.save_viz()).then(function(){window.location=Galaxy.root+"visualization"})}}})}else window.location=Galaxy.root+"visualization"}}),k=Backbone.View.extend({initialize:function(){(p=new m(Galaxy.root)).createButtonMenu(),p.buttonMenu.$el.attr("style","float: right"),$("#center .unified-panel-header-inner").append(p.buttonMenu.$el),$("#right .unified-panel-title").append("Bookmarks"),$("#right .unified-panel-icons").append("<a id='add-bookmark-button' class='icon-button menu-button plus-button' href='javascript:void(0);' title='Add bookmark'></a>"),$("#right-border").click(function(){y.resize_window()}),window.force_right_panel("hide"),window.galaxy_config.app.id?this.view_existing():w.default.get("dataset_id")?this.choose_existing_or_new():this.view_new()},choose_existing_or_new:function(){var e=this,t=w.default.get("dbkey"),a={},i={dbkey:t,dataset_id:w.default.get("dataset_id"),hda_ldda:w.default.get("hda_ldda"),gene_region:w.default.get("gene_region")};t&&(a["f-dbkey"]=t),Galaxy.modal.show({title:"View Data in a New or Saved Visualization?",body:"<p><ul style='list-style: disc inside none'>You can add this dataset as:<li>a new track to one of your existing, saved Trackster sessions if they share the genome build: <b>"+(t||"Not available.")+"</b></li><li>or create a new session with this dataset as the only track</li></ul></p>",buttons:{Cancel:function(){window.location=Galaxy.root+"visualizations/list"},"View in saved visualization":function(){e.view_in_saved(i)},"View in new visualization":function(){e.view_new()}}})},view_in_saved:function(e){var t=new h.default({url_base:Galaxy.root+"visualization/list_tracks",embedded:!0});Galaxy.modal.show({title:(0,c.default)("Add Data to Saved Visualization"),body:t.$el,buttons:{Cancel:function(){window.location=Galaxy.root+"visualizations/list"},"Add to visualization":function(){$(parent.document).find("input[name=id]:checked").each(function(){e.id=$(this).val(),window.location=Galaxy.root+"visualization/trackster?"+$.param(e)})}}})},view_existing:function(){var e=window.galaxy_config.app.viz_config;y=p.create_visualization({container:$("#center .unified-panel-body"),name:e.title,vis_id:e.vis_id,dbkey:e.dbkey},e.viewport,e.tracks,e.bookmarks,!0),this.init_editor()},view_new:function(){var e=this;$.ajax({url:Galaxy.root+"api/genomes?chrom_info=True",data:{},error:function(){alert("Couldn't create new browser.")},success:function(t){Galaxy.modal.show({title:(0,c.default)("New Visualization"),body:e.template_view_new(t),buttons:{Cancel:function(){window.location=Galaxy.root+"visualizations/list"},Create:function(){e.create_browser($("#new-title").val(),$("#new-dbkey").val()),Galaxy.modal.hide()}}});var a=t.map(function(e){return e[1]});window.galaxy_config.app.default_dbkey&&u.contains(a,window.galaxy_config.app.default_dbkey)&&$("#new-dbkey").val(window.galaxy_config.app.default_dbkey),$("#new-title").focus(),$("select[name='dbkey']").select2(),$("#overlay").css("overflow","auto")}})},template_view_new:function(e){for(var t='<form id="new-browser-form" action="javascript:void(0);" method="post" onsubmit="return false;"><div class="form-row"><label for="new-title">Browser name:</label><div class="form-row-input"><input type="text" name="title" id="new-title" value="Unnamed"></input></div><div style="clear: both;"></div></div><div class="form-row"><label for="new-dbkey">Reference genome build (dbkey): </label><div class="form-row-input"><select name="dbkey" id="new-dbkey">',a=0;a<e.length;a++)t+='<option value="'+e[a][1]+'">'+e[a][0]+"</option>";return t+='</select></div><div style="clear: both;"></div></div><div class="form-row">Is the build not listed here? <a href="'+Galaxy.root+'custom_builds">Add a Custom Build</a></div></form>'},create_browser:function(e,t){$(document).trigger("convert_to_values"),y=p.create_visualization({container:$("#center .unified-panel-body"),name:e,dbkey:t},window.galaxy_config.app.gene_region),this.init_editor(),y.editor=!0},init_editor:function(){$("#center .unified-panel-title").text(y.config.get_value("name")+" ("+y.dbkey+")"),window.galaxy_config.app.add_dataset&&$.ajax({url:Galaxy.root+"api/datasets/"+window.galaxy_config.app.add_dataset,data:{hda_ldda:"hda",data_type:"track_config"},dataType:"json",success:function(e){y.add_drawable(f.default.object_from_template(e,y,y))}}),$("#add-bookmark-button").click(function(){var e=y.chrom+":"+y.low+"-"+y.high;return p.add_bookmark(e,"Bookmark description",!0)}),p.init_keyboard_nav(y),$(window).on("beforeunload",function(){if(y.has_changes)return"There are unsaved changes to your visualization that will be lost if you leave this page."})}});e.default={TracksterUI:m,GalaxyApp:k}});
//# sourceMappingURL=../../maps/viz/trackster.js.map
