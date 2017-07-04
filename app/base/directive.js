'use strict';

define(['angular', "showdown","pretty",'uikit','htmleditor'],
	function(angular,showdown,pretty,uikit,htmleditor){
	return angular.module('base.directive',[])
	.directive('onview',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(s,e,a){
				$timeout(function(){
					// console.log(a)
					if(a.type&&a.type=="maincon"){
						var converter = new showdown.Converter({'tables':true});
						a.content = converter.makeHtml(a.content);
					}
					var _t = {};
					/*对video进行处理*/
					_t.HtmlUtil = {
					    /*1.用浏览器内部转换器实现html转码*/
					    htmlEncode:function (html){
					        //1.首先动态创建一个容器标签元素，如DIV
					        var temp = document.createElement ("div");
					        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
					        (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
					        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
					        var output = temp.innerHTML;
					        temp = null;
					        return output;
					    },
					    /*2.用浏览器内部转换器实现html解码*/
					    htmlDecode:function (text){
					        //1.首先动态创建一个容器标签元素，如DIV
					        var temp = document.createElement("div");
					        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
					        temp.innerHTML = text;
					        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
					        var output = temp.innerText || temp.textContent;
					        temp = null;
					        return output;
					    }
					};
					_t.videoreg = /(&lt;video.+\/video&gt;)|(&lt;embed.+\/embed&gt;)/g;//有待测试，匹配多个的时候
																						//支持video 和 embed 等等视频
					_t.result = a.content.match(_t.videoreg);
					_t.nresult = _t.HtmlUtil.htmlDecode(_t.result);
				    // console.log(result)
				    _t.ncon = a.content.replace(_t.videoreg,_t.nresult);
				    _t.ncon = _t.ncon.replace(/<img[^>]+src="[^"]+"[^>]*>/,"");
				    /*对video进行处理结束*/
				    // console.log(ncon)
					if(a.content)$(e).html($(_t.ncon));
					setTimeout(function(){
						if(a.type&&a.type=="maincon"){
							prettyPrint();
						}
					},500)
						
				},0)	
			}
		}
	}
	])
	.directive('dropdown',['$timeout',function($timeout){
		return {
			restrict :'A',
			link:function(s,e,a){
				$timeout(function(){
					$(e).dropdown();
				})
			}
		}
	}])
	.directive('tab',['$timeout',function($timeout){
		return {
			restrict :'A',
			link:function(s,e,a){
				$timeout(function(){
					$(e).tab();
				})
			}
		}
	}])
	.directive('comment',['$timeout',function($timeout){
	     return {
	         restrict: 'A',
	         link: function(scope,element,attr){
	         	$timeout(function(){
	         		console.log(attr)
		             var article_id = attr.arid;
		             var artitle = attr.artitle;
		             console.log(article_id)
		             var data_thread_key = article_id;
		             var data_url =	window.location.href;
		             var data_author_key = 'http://www.chqiangs.com/article/' + article_id;
		             
		             // dynamic load the duoshuo comment box
		             var el = document.createElement('div');//该div不需要设置class="ds-thread"
		             el.setAttribute('data-thread-key', data_thread_key);//必选参数
		             el.setAttribute('data-url', data_url);//必选参数
		             el.setAttribute('data-title',artitle)
		             el.setAttribute('data-author-key', data_author_key);//可选参数
		             // DUOSHUO.EmbedThread(el);
		             $(element).find('hr').after(el);
	         	})
	         }
		}
	}])
	.directive('checkbox',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attr){
				$timeout(function(){
					$(element).checkbox();
					$(element).on('change',function(){
						if($(this).attr("id")=="lifeismine"){
							scope.$apply(function(){
								scope.life.ismine = !scope.life.ismine;
							})
						}
					})
				})
			}
		}
	}])
	.directive('faComment',['$timeout',function($timeout){
		return {
			restrict:'C',
			link:function(scope,element,attr){
				$timeout(function(){
					var id = ($(element).parent().attr("href").split("/")[$(element).parent().attr("href").split("/").length-1]).split("#")[0];
					var el = document.createElement("span");
					el.className = "ds-thread-count";
					el.setAttribute("data-thread-key",id);
					// DUOSHUO.ThreadCount(el);
					// console.log(el)
					$(element).html(el);
				},0)
				
			}
		}
	}])
	.directive('recentComment',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attr){
				var el = document.createElement("div");
				el.setAttribute('data-num-items',4);
				el.setAttribute('data-show-avatars',0);
				el.setAttribute('data-show-time',0);
				el.setAttribute('data-show-title',1);
				el.setAttribute('data-show-admin',1);
				el.setAttribute('data-excerpt-length',70);
				el.className = "ds-recent-comments";
				// DUOSHUO.RecentComments(el);
				$(element).find("h6").after(el);
				// <div class="ds-recent-comments" data-num-items="4" data-show-avatars="1" data-show-time="1" data-show-title="1" data-show-admin="1" data-excerpt-length="70"></div>
			}
		}
	}])
	.directive('popularPost',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attr){
				var el = document.createElement("ul");
				el.setAttribute('data-range','weekly');
				el.setAttribute('data-num-items',5);
				el.className = "ds-top-threads";
				// DUOSHUO.TopThreads(el);
				$(element).html(el);
				// <ul  class="ds-top-threads" data-range="weekly" data-num-items="5"></ul>
			}
		}
	}])
	.directive('ukHtmleditor',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(scope,element,attr){
				$timeout(function(){
					console.log($(element))
					UIkit.htmleditor($(element),{mode:'split',markdown:true,maxsplitsize:350,lblCodeview:'Markdown',lblPreview:'Preview'});
				})

			}
		}
	}])
})