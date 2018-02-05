define("mvc/collection/collection-model",["exports","mvc/dataset/dataset-model","mvc/base-mvc","utils/utils","utils/localization"],function(e,t,n,i,l){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(t),a=o(n),r=o(i),c=(o(l),{defaults:{model_class:"DatasetCollectionElement",element_identifier:null,element_index:null,element_type:null},_mergeObject:function(e){return _.extend(e,e.object,{element_id:e.id}),delete e.object,e},constructor:function(e,t){e=this._mergeObject(e),this.idAttribute="element_id",Backbone.Model.apply(this,arguments)},parse:function(e,t){var n=e;return n=this._mergeObject(n)}}),d=Backbone.Model.extend(a.default.LoggableMixin).extend(c).extend({_logNamespace:"collections"}),u=Backbone.Collection.extend(a.default.LoggableMixin).extend({_logNamespace:"collections",model:d,toString:function(){return["DatasetCollectionElementCollection(",this.length,")"].join("")}}),h=s.default.DatasetAssociation.extend(a.default.mixin(c,{url:function(){return this.has("history_id")?Galaxy.root+"api/histories/"+this.get("history_id")+"/contents/"+this.get("id"):(console.warn("no endpoint for non-hdas within a collection yet"),Galaxy.root+"api/datasets")},defaults:_.extend({},s.default.DatasetAssociation.prototype.defaults,c.defaults),_downloadQueryParameters:function(){var e=this.get("file_ext"),t=this.get("element_identifier");return"?to_ext="+e+"&hdca_id="+this.get("parent_hdca_id")+"&element_identifier="+t},constructor:function(e,t){this.debug("\t DatasetDCE.constructor:",e,t),c.constructor.call(this,e,t)},hasDetails:function(){return this.elements&&this.elements.length},toString:function(){this.get("element_identifier");return"DatasetDCE({objStr})"}})),m=u.extend({model:h,toString:function(){return["DatasetDCECollection(",this.length,")"].join("")}}),f=Backbone.Model.extend(a.default.LoggableMixin).extend(a.default.SearchableModelMixin).extend({_logNamespace:"collections",defaults:{collection_type:null,deleted:!1},collectionClass:function(){return this.attributes.collection_type.indexOf(":")>0?p:m},initialize:function(e,t){this.debug(this+"(DatasetCollection).initialize:",e,t,this),this.elements=this._createElementsModel(),this.on("change:elements",function(){this.log("change:elements"),this.elements=this._createElementsModel()})},_createElementsModel:function(){var e=this.collectionClass();this.debug(this+"._createElementsModel",e,this.get("elements"),this.elements);var t=this.get("elements")||[];this.unset("elements",{silent:!0});var n=this;return _.each(t,function(e,t){_.extend(e,{parent_hdca_id:n.get("id")})}),this.elements=new e(t),this.elements},toJSON:function(){var e=Backbone.Model.prototype.toJSON.call(this);return this.elements&&(e.elements=this.elements.toJSON()),e},inReadyState:function(){var e=this.get("populated");return this.isDeletedOrPurged()||e},hasDetails:function(){return 0!==this.elements.length},getVisibleContents:function(e){return this.elements},parse:function(e,t){var n=Backbone.Model.prototype.parse.call(this,e,t);return n.create_time&&(n.create_time=new Date(n.create_time)),n.update_time&&(n.update_time=new Date(n.update_time)),n},delete:function(e,t,n){return e=e||!1,t=t||!1,this.get("deleted")?jQuery.when():(n=r.default.merge(n,{method:"delete"}),this.save({deleted:!0,recursive:e,purge:t},n))},undelete:function(e){return this.get("deleted")?this.save({deleted:!1},e):jQuery.when()},isDeletedOrPurged:function(){return this.get("deleted")||this.get("purged")},searchAttributes:["name","tags"],toString:function(){return"DatasetCollection("+[this.get("id"),this.get("name")||this.get("element_identifier")].join(",")+")"}}),g=f.extend(a.default.mixin(c,{constructor:function(e,t){this.debug("\t NestedDCDCE.constructor:",e,t),c.constructor.call(this,e,t)},toString:function(){return["NestedDCDCE(",this.object?""+this.object:this.get("element_identifier"),")"].join("")}})),p=u.extend({model:g,toString:function(){return["NestedDCDCECollection(",this.length,")"].join("")}});e.default={DatasetCollection:f}});
//# sourceMappingURL=../../../maps/mvc/collection/collection-model.js.map
