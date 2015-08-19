
'use strict';

define(['angular'], function (angular) {

    angular.module('base.service', ['ngResource'])
    .factory('AuthService',['$rootScope','$http','$window','$location', function ($rootScope, $http, $window, $location) {
	    var authService = {};
	    $rootScope.keystone_url = 'http://keystone.halfss.com:5000/v2.0';
      $rootScope.keystone_roleid = "16131b070578418b9c9b4c3b8f0518e9";
      $rootScope.keystone_adminid = "e47c841a35c144169c45f3f38564445c";
      // $rootScope.keystone_url = 'http://console.lightcloud.cn:5000/v2.0';
      // $rootScope.keystone_roleid = "c8bd1ec564194a198a84795a522e9eb2";
      // $rootScope.keystone_adminid = "52562a38b5d347bab9d81be0aec6ea48";
	 	var keystone_url = $rootScope.keystone_url;
	    authService.login = function (credentials,coo) {
       	return $http.post(keystone_url+'/tokens', credentials)
        .success(function(data){
        	if(!data){
        		Opstack.showStatus("登陆名或者密码错误",3);
        		return;
        	}
            $http.defaults.headers.common['X-Auth-Token'] = data['access']['token']['id'];
            $http.get(keystone_url+'/tenants').success(function(data){
                credentials['auth']['tenantName'] = data['tenants'][0]['name']
                var tenantInfo = data;
                $http.post(keystone_url+'/tokens', credentials)
                .success(function(data){
                  if(coo){
                    var name = credentials.auth.passwordCredentials.username;
                    var pass = credentials.auth.passwordCredentials.password;
                    Opstack.setCookie("opstacklight",encodeURIComponent(name)+"&"+encodeURIComponent(pass));
                  }
                  var servis = data.access.serviceCatalog;
                  var defalutapp,defaultdatas = [];
                  var display_services = ['audit', 'image', 'base','object-store','identity'].join();
                  for(var i=0,len=servis;i<len.length;i++){
                      if(display_services.indexOf(len[i].type)==-1){
                          defaultdatas.push(len[i].type);
                      }
                  };
                  defalutapp = defaultdatas[0];
                    data['access']['tenants'] = tenantInfo['tenants'];
                    $window.sessionStorage.setItem("userInfo", JSON.stringify(data));
                    window.sessionStorage.setItem("islogin",JSON.stringify(data));
                    $window.sessionStorage.setItem("currentApp", defalutapp);
                    $window.location.href = '/'+defalutapp;
                });
            });
        });
	  };

	  authService.isAuthenticated = function () {
	    return !!$window.sessionStorage.getItem("userInfo");
	  };

	  authService.getInfo = function(){
	  	return $window.sessionStorage.getItem("userInfo");
	  }

	  authService.setCurrentApp = function(app){
	  	return $window.sessionStorage.setItem("currentApp", app);
	  }

	  authService.getCurrentApp = function(app){
	  	return $window.sessionStorage.getItem("currentApp");
	  }

	  authService.logout = function(){
	  	$window.sessionStorage.removeItem("userInfo");
      window.sessionStorage.removeItem("islogin");
	  	$("#big_shade").remove();
	  	return $window.location.href = '/login';
	  }

	  return authService;
	}])
	.factory('superCache', ['$cacheFactory', function($cacheFactory) {
		return $cacheFactory('super-cache');
	}])
	.factory('customExtend',['$rootScope','$http','$window','$location',
		function($rootScope,$http,$window,$location){
		window.Extend = window.Extend||{};
		Extend.handle ={};
		var dlcount = 0;
		var prologo_cropdata;
		Extend.cropperDialog = function(opts){
			var	targetid = "up_frame_"+dlcount;
			var contents = $(['<div class="ui standard small test modal" id="cropper">',
			    '<i class="close icon"></i>',
			    '<div class="header">裁剪</div>',
		        '<div class="content ui form segment">',
		            '<div class="field">',
		               ' <label for="">图片</label>',
		                '<div style="margin-bottom:10px;float:left;width:'+(opts.width || opts.size || 128)+'px;height:'+(opts.height || opts.size || 128)+'px;"><img style="height:100%;width:100%;" id="crop_avator" src="+opts.avatorpath+"></div>',
		            	'<div><iframe style="display:none" id="'+targetid+'" name="'+targetid+'"></iframe></div>',
		            '</div>',
		            '<div class="field">',
		            	'<form target="'+targetid+'" method="post"> enctyep="multipart/form-data" id="prologo_crop">',
		                '<div style="display: inline-block;margin: 3px 5px;padding: 4px 16px;"><i id="crop_first_button"></i></div>',
		                '<div class="ui small teal button" id="recrop_button">重新裁剪</div>',
		                '<div class="ui small teal button" style="margin:10px 20px;" id="crop_sure_button">确  定</div>',
		            	'</form>',
		           ' </div>',
		       ' </div>',
		   ' </form>',
		'	</div>'].join(""));
			contents.appendTo(document.body);
			contents.modal("show");
			$(document.body).delegate("#cropper #crop_sure_button","click",function(){
				if(opts.onSure){
					opts.onSure(opts.croprs);
				}
			}).delegate("#cropper #recrop_button","click",function(){
				if(prologo_cropdata){
					Extend.showCropDialog(prologo_cropdata,opts,function(rs){
						 if(rs.code > 0){
							opts.croprs = rs.data;
							 $("img#crop_avator").attr("src",rs.data.src+"?t_"+(new Date).getTime());
						 }else{
							 alert(rs.message);
						 }
					});
				}else{
					alert("请先上传图片");
				}
			})
			prologo_cropdata = "";
			
		}

		Extend.imageUpload = function(opts){
			var callbackname = "up_cbk_"+dlcount,
			targetid = "up_frame_"+dlcount;
			var contents = $(['<div class="ui standard small test modal" id="tab">',
			    '<i class="close icon"></i>',
			    '<div class="header">上传</div>',
		        '<div class="content ui form segment">',
				'<div class="ui pointing secondary menu teal top" id="tabs">',
			       ' <a data-tab="netup" class="item active" >网络上传</a>',
			      ' <a data-tab="localup" class="item" >本地上传</a>',
			      '</div>',
			      '<div data-tab="netup" class="ui tab active">',
			        '<div class="ui labeled input">',
			         ' <div class="ui label">http:// </div>',
			         ' <input type="text" required="" name="img_url" placeholder="mysite.com" class="ng-pristine ng-invalid ng-invalid-required">',
			       ' </div>',
			      '</div>',
			     ' <div data-tab="localup" class="ui tab">',
			         ' <div><iframe style="display:none" id="'+targetid+'" name="'+targetid+'"></iframe></div>',
			          '<form action="/api/common/imageupload"  target="'+targetid+'" method="post" enctype="multipart/form-data">   ',           
			              '<input type="hidden" name="upload_dir" value="'+opts.upload_dir+'"/>',
			              '<input type="hidden" name="callback" value="'+callbackname+'"/>',
			              '<div class="ui button teal" id="crop_sure_button">确  定</div>',
			              '<div class="ui button teal" id="upfilebtn">本地上传</div>',
			              '<input type="file" name="imgFile" style="position: absolute; opacity: 0; font-size: 20px; cursor: pointer; top: 59px; left: 85px; width: 84px;" accept="image/*"/>',
			          '</form>',
			      '</div></div></div>'].join(""));
			$(document.body).find("#tab").remove();
			contents.appendTo(document.body);
			contents.find("#tabs .item").tab();
			var cropdata;
			Extend.handle[callbackname] = function(data){			
				if(opts.onupload){
					opts.onupload(data);
				}
				cropdata = data;
				opts.title = "裁剪图片";
				//去掉：
				//opts.width = 300;
				//opts.height = 200;	
				opts.aspectRatio = 0;
				opts.size = false;
				Extend.showCropDialog(data,opts,function(rs,c){
					alert(rs.code)
					 if(rs.code > 0){
						opts.croprs = rs.data;
						if(opts.onSure){
							c.modal("hide");
							opts.onSure({
								url :rs.data.src
							});
						}
					 }else{
						 alert(rs.message);
					 }
				},false);
			};
			
			contents.modal("show");

			$(document.body).delegate("#tab input[type='file']","change",function(){
				$("#tab").find("input[name=path]").val($(this).val());
				$("#tab").find("form")[0].submit();
			}).delegate("#tab #crop_sure_button","click",function(){
				if(opts.onSure){
					opts.onSure({
						url : $("#tab").find("input[name='img_url']").val()
					});
				}
			}).delegate("#tab #upfilebtn","click",function(){
				$(this).parent().find("input[type='file']").click();
			})

		}

		Extend.showCropDialog = function(data,options,oncrop,iflogo){
			// var urlstr = "";//9号改
			
			var contents = $(['<div class="ui standard small test modal" id="tab">',
			   ' <i class="close icon"></i>',
			   ' <div class="header">确认图片</div>',
		       ' <div class="content ui form segment">',
		        	'<div class="field">',
		        	    '<label for="">图片</label>',
		        	    '<img src="'+data.url.split("app")[1]+'" style="max-height:470px;max-width:570px;visibility:visible;">',
		        	'</div>',
		        	'<div class="field">',
		        		'<div class="ui button teal" id="img_crop_sure">确  定</div>',
		        	'</div>',
		        '</div></div>'].join(""));
			$(document.body).find("#tab").remove();
			contents.appendTo(document.body);
			contents.modal("show");
			var crop;
				var c = contents;
				//console.log(options);	
				options.height = options.height || options.size ||  c.find("img").height();
				options.width = options.width || options.size || c.find("img").width();
				
				var x1,y1,x2,y2;
				if(iflogo){
					x1= 100;x2 = x1+options.width;y1=100;y2 = y1 + options.height;
					var image = c.find("img")[0];
					var iw = image.offsetWidth,ih = image.offsetHeight;
					if(iw < x2){
						x2 = iw;
						x1 = x2-options.width;
						if(x1<0) x1 = 0;
					}
					
					if(ih < y2){
						y2 = ih;
						y1 = y2-options.height;
						if(y1<0) y1 = 0;
					}
				}else{
					x1 = 0;y1 = 0;
					x2 = c.find("img").width();
					y2 = c.find("img").height();
				}
				
				c.find("img").Jcrop({
					aspectRatio : options.aspectRatio===undefined ? 1 : options.aspectRatio,
					setSelect : [x1,y1,x2,y2]
				},function(){
					  crop = this;
					  //console.log([x1,y1,x2,y2]);
					  //crop.animateTo([x1,y1,x2,y2]);
				});
				c.find("#img_crop_sure").click(function(){
					//Extend.showStatus("请耐心等待，正在上传...");
					//console.log(crop.tellSelect());
					
					if(crop){
						var img = c.find(".jcrop-holder img")[0];
						var zoom = img.offsetWidth/img.naturalWidth;
						
						Extend.cropcallback = function(rs){
							crop = null;
							if(typeof oncrop == "function"){
								oncrop(rs,c);
							}
							
							if(typeof options.onSure == "function"){
								 options.onSure(rs);
							}
						};
						
						$.ajax({
						   async:false,
						   type: "get",
						   url: "/api/common/imagecrop",
						   data: "type="+options.imageType+"&_id="+options.targetId+"&path="+data.url+"&zoom="+zoom+"&size="+options.size+"&width="+options.width+"&height="+options.height+"&pos="+JSON.stringify(crop.tellSelect()),
						   dataType: "jsonp",
						});
						
					}
					
				});
		}

	}])
	.factory('Restful',['$resource',function($res){
		return $res(url,{},{});
	}])
});
