define("mvc/upload/upload-view",["exports","utils/localization","utils/utils","mvc/ui/ui-modal","mvc/ui/ui-tabs","mvc/upload/upload-button","mvc/upload/default/default-view","mvc/upload/composite/composite-view","mvc/upload/collection/collection-view"],function(t,e,i,o,s,l,n,a,u){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var d=r(e),c=r(i),f=r(o),p=r(s),_=r(l),h=r(n),m=r(a),g=r(u);t.default=Backbone.View.extend({options:{nginx_upload_path:"",ftp_upload_site:"n/a",default_genome:"?",default_extension:"auto",height:500,width:900,auto:{id:"auto",text:"Auto-detect",description:"This system will try to detect the file type automatically. If your file is not detected properly as one of the known formats, it most likely means that it has some format problems (e.g., different number of columns on different rows). You can still coerce the system to set your data to the format you think it should be.  You can also upload compressed files, which will automatically be decompressed."}},list_extensions:[],list_genomes:[],initialize:function(t){e=this;this.options=c.default.merge(t,this.options),this.ui_button=new _.default.View({onclick:function(t){t.preventDefault(),e.show()},onunload:function(){var t=e.ui_button.model.get("percentage",0);if(t>0&&t<100)return"Several uploads are queued."}}),this.setElement(this.ui_button.$el);var e=this;c.default.get({url:Galaxy.root+"api/datatypes?extension_only=False",success:function(t){for(var i in t)e.list_extensions.push({id:t[i].extension,text:t[i].extension,description:t[i].description,description_url:t[i].description_url,composite_files:t[i].composite_files});e.list_extensions.sort(function(t,e){var i=t.text&&t.text.toLowerCase(),o=e.text&&e.text.toLowerCase();return i>o?1:i<o?-1:0}),e.options.datatypes_disable_auto||e.list_extensions.unshift(e.options.auto)}}),c.default.get({url:Galaxy.root+"api/genomes",success:function(t){for(var i in t)e.list_genomes.push({id:t[i][1],text:t[i][0]});e.list_genomes.sort(function(t,i){return t.id==e.options.default_genome?-1:i.id==e.options.default_genome?1:t.text>i.text?1:t.text<i.text?-1:0})}})},show:function(){var t=this;Galaxy.currHistoryPanel&&Galaxy.currHistoryPanel.model?(this.current_user=Galaxy.user.id,this.modal||(this.tabs=new p.default.View,this.default_view=new h.default(this),this.tabs.add({id:"regular",title:(0,d.default)("Regular"),$el:this.default_view.$el}),this.composite_view=new m.default(this),this.tabs.add({id:"composite",title:(0,d.default)("Composite"),$el:this.composite_view.$el}),this.collection_view=new g.default(this),this.tabs.add({id:"collection",title:(0,d.default)("Collection"),$el:this.collection_view.$el}),this.modal=new f.default.View({title:(0,d.default)("Download from web or upload from disk"),body:this.tabs.$el,height:this.options.height,width:this.options.width,closing_events:!0,title_separator:!1})),this.modal.show()):window.setTimeout(function(){t.show()},500)},currentHistory:function(){return this.current_user&&Galaxy.currHistoryPanel.model.get("id")},currentFtp:function(){return this.current_user&&this.options.ftp_upload_site},toData:function(t,e){var i={payload:{tool_id:"upload1",history_id:e||this.currentHistory(),inputs:{}},files:[],error_message:null};if(t&&t.length>0){var o={file_count:t.length,dbkey:t[0].get("genome","?"),file_type:t[0].get("extension","auto")};for(var s in t){var l=t[s];if(l.set("status","running"),!(l.get("file_size")>0)){i.error_message="Upload content incomplete.",l.set("status","error"),l.set("info",i.error_message);break}var n="files_"+s+"|";switch(o[n+"type"]="upload_dataset",o[n+"space_to_tab"]=l.get("space_to_tab")&&"Yes"||null,o[n+"to_posix_lines"]=l.get("to_posix_lines")&&"Yes"||null,o[n+"dbkey"]=l.get("genome",null),o[n+"file_type"]=l.get("extension",null),l.get("file_mode")){case"new":o[n+"url_paste"]=l.get("url_paste");break;case"ftp":o[n+"ftp_files"]=l.get("file_path");break;case"local":i.files.push({name:n+"file_data",file:l.get("file_data")})}}i.payload.inputs=JSON.stringify(o)}return i}})});
//# sourceMappingURL=../../../maps/mvc/upload/upload-view.js.map
