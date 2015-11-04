'use strict';

define(['angular'],function(angular){
	return angular.module('base.directive',[])
	.directive('onview',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(s,e,a){
				console.log(a)
				/*对video进行处理*/
				var HtmlUtil = {
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
				var videoreg = /(&lt;video.+\/video&gt;)|(&lt;embed.+\/embed&gt;)/g;//有待测试，匹配多个的时候
																					//支持video 和 embed 等等视频
				var result = a.content.match(videoreg);
				var nresult = HtmlUtil.htmlDecode(result);
			    // console.log(result)
			    // console.log(nresult)
			    var ncon = a.content.replace(videoreg,nresult)
			    /*对video进行处理结束*/
			    // console.log(ncon)
				$timeout(function(){
					if(a.content)$(e).html(ncon);
				})
			}
		}
	}
	])
	// .directive('comment',['$timeout',function($timeout){
	// 	return {
	// 		restrict:'A',
	// 		link:function(s,e,a){
	// 			$timeout(function(){
	// 				var href = $(e).attr("href");
	// 				console.log(href)
	// 				var it = '<!-- UYAN COUNT BEGIN -->'+
	//                             '<a href="/article/{{b._id}}#related-comment" id="uyan_count_unit">'+
	//                             '</a>'+
	//                             '<script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2068620"></script>'+
	//                         '<!-- UYAN COUNT END -->';
	// 				$(e).html('<span class="fa fa-comment"></span>'+it);
	// 			},0)
	// 		}
	// 	}
	// }])
})