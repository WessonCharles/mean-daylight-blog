angular.module("app").run(["$templateCache",function(a){a.put("controllers/dl_add/about-me.html",'<div class="col-xs-12 col-md-8" style="z-index: 13;"><div class="boxed push-down-60"><div class="row"><div class="col-xs-11 col-xs-offset-0 push-down-60"><h1>关于我</h1><blockquote><p>资料简介</p></blockquote><p><span>姓名：</span>常惠强</p><p><span>坐标：</span>北京，石景山</p><p><span>兴趣：</span>电影/锻炼/看书/旅游</p><p><span>技术及发展方向：</span><b>web全栈工程师</b></p><p><span>期望：</span>实现自我价值之外有自己的小店</p><br><blockquote><p>发展历程</p></blockquote><p><b><em>2011年</em></b><br>参加大学cosplay社团之余，课程所学java,vb,mysql,oracle等等；<br>开始自不量力的感觉cosplay周边手办玩偶应该挺有市场，于是和室友折腾了ituzhu.com，名为<b>"爱土著"</b>（我怎么知道当时怎么想的- -||）<br>而后夭折</p><br><p><b><em>2012年年初</em></b><br>和大学舍友所有成员组织了<b>"想即送"</b>团体,为大学商业街周边的同学跑路带东西，特别是寒风瑟瑟的情况下；<br>初始阶段还炒的挺火，平均半个小时都有业务；<br>奈何 这群彪子沉溺游戏而超时送货遂夭折</p><br><p><b><em>2012年8月-2014年5月左右</em></b><br>寻得京城归来一大哥（至今我仍然觉得他是我第一位人生导师），想做点东西，于是开始长达将近两年的<b>"牧客网"</b>创业生涯;<br>一个为自由职业者服务的平台，使用nodejs/mongodb/js/html/css以模块划分而不以前后端划分来工作；<br>期间，为了团队收益做过"白丁"授课平台，及"html5云课堂"外包项目<br>直到各种原因，团队解散</p><br><p><b><em>2014年9月-至今</em></b><br><b>360-游戏事业部</b>，PC页游运维部研发组前端一枚，接触angular,material design,gulp,grunt等等更多的技术及解决方案；<br>现学习php,向着全栈工程师方向努力...</p><br><blockquote><p>声明</p></blockquote><p>本站所有言论，均仅代表个人观点，如有建议或者指正；请查看本站最下方任意联系方式联系我。</p></div></div></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/dl_add/add.html",'<div class="col-xs-12 col-md-8"><div class="ui top attached tabular menu" id="addsth"><a data-tab="first" tab="" class="item active text-teal" ng-if="techtab" ng-click="getblogeditor()">添加文章</a> <a data-tab="second" tab="" class="item text-teal" ng-if="lifetab" ng-class="!module&&lifetab?\'active\':\'\'" ng-click="getlifeeditor()">添加杂谈</a> <a data-tab="third" tab="" class="item text-teal">添加图片</a></div><div class="ui bottom attached tab segment active" data-tab="first" ng-hide="!techtab"><form id="add_blog" class="ui form"><div class="field"><label>标题</label> <input type="text" ng-model="blog.title" placeholder="标题" required="" data-validation-required-message="请填写标题"><p class="help-block">{{blog.title}}</p></div><div class="two fields"><div class="field"><label>是否原创</label><div class="ui toggle checkbox checked" checkbox="" id="ismine"><input type="checkbox" checked="checked" ng-model="blog.ismine" ng-change="changeismine()"> <label for="">默认原创</label></div></div></div><div class="two fields" ng-if="!blog.ismine"><div class="field"><label>原作者</label> <input type="text" ng-model="blog.originalauthor.name" required=""></div><div class="field"><label>链接</label><div class="ui labeled input"><div class="ui label">http://</div><input type="text" placeholder="mysite.com" ng-model="blog.originalauthor.url" required=""></div></div></div><div class="field"><label>标签</label><select class="ui fluid dropdown" dropdown="" multiple="true" name="temptag" ng-model="blog.temptag" id="blogtags" required=""><option value="html_css">Html&Css</option><option value="js">Javascript</option><option value="angular">angularJs</option><option value="nodejs">NodeJs</option><option value="mongodb">Mongodb</option><option value="ionic">Ionic</option><option value="ui_ue">UI/UE</option><option value="php">PHP</option></select></div><div class="field"><label>内容</label><div id="add_wpreface"></div></div><button type="button" ng-click="addblog($event)" class="ui submit button">保存</button></form></div><div class="ui bottom attached tab segment" data-tab="second" ng-hide="!lifetab" ng-class="!module&&lifetab?\'active\':\'\'"><form id="add_life" class="ui form"><div class="field"><label>子类型</label><select class="ui search dropdown" id="lifesubtype" name="subtype" ng-model="life.subtype" required=""><option value="pic-word">图文</option><option value="read-and-know">读而知之</option><option value="gossip">闲言碎语</option></select></div><div class="field" ng-if="life.subtype!=\'pic-word\'"><label>标题</label> <input type="text" ng-model="life.title" placeholder="标题" required="" data-validation-required-message="请填写标题"><p class="help-block">{{life.title}}</p></div><div class="two fields"><div class="field" ng-if="life.subtype==\'article\'"><label>是否原创</label><div class="ui toggle checkbox checked" id="lifeismine" checkbox=""><input type="checkbox" checked="checked" ng-model="life.ismine" ng-change="changeismine()"> <label for="">默认原创</label></div></div></div><div class="two fields" ng-if="!life.ismine&&life.subtype==\'article\'"><div class="field"><label>原作者</label> <input type="text" ng-model="life.originalauthor.name" required=""></div><div class="field"><label>链接</label><div class="ui labeled input"><div class="ui label">http://</div><input type="text" placeholder="mysite.com" ng-model="life.originalauthor.url" required=""></div></div></div><div class="field"><label>标签</label><div class="ui right labeled left icon input" id="tags"><i class="tags icon"></i> <input type="text" ng-model="tagstr" ng-keyup="tags($event)"><div class="ui tag label">Tags</div><a class="ui label transition visible" ng-repeat="t in life.tags track by $index" data-value="{{t.label||t}}">{{t.label||t}}<i class="delete icon" ng-click="removetag(t)"></i></a></div></div><div class="field"><label>内容</label><div id="add_wlife"></div></div><button type="button" ng-click="add_life($event)" class="ui submit button">Submit</button></form></div><div class="ui bottom attached tab segment" data-tab="third">thrid</div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/dl_base/base.html",'<div class="col-xs-12 col-md-8"><div class="dl_list_all"><div class="dl_list_one" ng-repeat="b in bloglists track by $index"><div class="boxed push-down-45 image" ng-if="b.thumb&&b.subtype!=\'pic-word\'"><div class="meta"><div class="wrap_post_image"><img ng-src="{{b.thumb}}" class="wp-post-image" alt=""></div><div class="meta__container"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> <a href="#"></a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">阅读更多<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div><div class="post-ads" ng-if="$index==0"><a></a></div><div class="boxed push-down-45 pic-word" ng-if="b.subtype&&b.subtype==\'pic-word\'"><div class="meta" style="margin-bottom:0;"><img ng-src="{{b.thumb}}" class="wp-post-image" alt=""> <q class="meta__quote">{{b.summary}}</q><div class="meta__container"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><span class="post-format"></span></div><div class="boxed push-down-45 word" ng-if="!b.thumb"><div class="row"><div class="meta__container--without-image"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">阅读更多<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div></div><h4 class="ui horizontal inverted divider"></h4><div class="row" style="margin-bottom:10px;"><div class="col-xs-4"><button class="ui labeled icon button" ng-click="jumppage(\'last\')"><i class="fa fa-chevron-left icon"></i> 上一页</button></div><div class="col-xs-4" style="text-align:center;line-height: 30px;">{{page&&page.pageIndex?page.pageIndex:\'1\'}}/{{page&&page.pageTotal?page.pageTotal:\'1\'}}</div><div class="col-xs-4"><button class="ui right labeled icon button pull-right" ng-click="jumppage(\'next\')"><i class="fa fa-chevron-right icon"></i> 下一页</button></div></div></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/dl_life/life.html",'<div class="col-xs-12 col-md-8"><div class="dl_list_all"><div class="dl_list_one" ng-repeat="b in bloglists track by $index"><div class="boxed push-down-45 image" ng-if="b.thumb&&b.subtype!=\'pic-word\'"><div class="meta"><div class="wrap_post_image"><img ng-src="{{b.thumb}}" class="wp-post-image" alt=""></div><div class="meta__container"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> <a href="#"></a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">Continue reading<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div><div class="post-ads" ng-if="$index==0"><a href="http://themeforest.net/user/ProteusThemes/portfolio?ref=ProteusThemes"><img width="728" height="90" alt="Ads" src="images/dummy/xads-728x90.jpg.pagespeed.ic.Dg8PWwa1gE.jpg"></a></div><div class="boxed push-down-45 pic-word" ng-if="b.subtype&&b.subtype==\'pic-word\'"><div class="meta" style="margin-bottom:0;"><img ng-src="{{b.thumb}}" class="wp-post-image" alt=""> <q class="meta__quote">{{b.summary}}</q><div class="meta__container"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><span class="post-format"></span></div><div class="boxed push-down-45 word" ng-if="!b.thumb"><div class="row"><div class="meta__container--without-image"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">阅读更多<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div></div><h4 class="ui horizontal inverted divider"></h4><div class="row" style="margin-bottom:10px;"><div class="col-xs-4"><button class="ui labeled icon button" ng-click="jumppage(\'last\')"><i class="fa fa-chevron-left icon"></i> 上一页</button></div><div class="col-xs-4" style="text-align:center;line-height: 30px;">{{page&&page.pageIndex?page.pageIndex:\'1\'}}/{{page&&page.pageTotal?page.pageTotal:\'1\'}}</div><div class="col-xs-4"><button class="ui right labeled icon button pull-right" ng-click="jumppage(\'next\')"><i class="fa fa-chevron-right icon"></i> 下一页</button></div></div></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/dl_tech/tech.html",'<div class="col-xs-12 col-md-8"><div class="dl_list_all"><div class="dl_list_one" ng-repeat="b in bloglists track by $index"><div class="boxed push-down-45 image" ng-if="b.thumb&&b.subtype!=\'pic-word\'"><div class="meta"><div class="wrap_post_image"><img ng-src="{{b.thumb}}" class="wp-post-image" alt=""></div><div class="meta__container"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> <a href="#"></a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">Continue reading<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div><div class="post-ads" ng-if="$index==0"><a href="http://themeforest.net/user/ProteusThemes/portfolio?ref=ProteusThemes"><img width="728" height="90" alt="Ads" src="images/dummy/xads-728x90.jpg.pagespeed.ic.Dg8PWwa1gE.jpg"></a></div><div class="boxed push-down-45 word" ng-if="!b.thumb"><div class="row"><div class="meta__container--without-image"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img width="30" height="30" alt="Meta avatar" src="images/dummy/avator.png"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="fa fa-calendar-o"></span> &nbsp; {{b.time | date:"MM/dd/yyyy \'at\' h:mma"}}</span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><a href="/article/{{b._id}}#related-comment"><span class="fa fa-comment">{{b.comments.length}}</span></a></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="post-content--front-page"><h2 class="front-page-title"><a href="/article/{{b._id}}">{{b.title}}</a></h2><p onview="" data-content="{{b.summary}}"></p></div><div class="post-content-tags"><ul><li ng-repeat="t in b.tags"><div class="ui tag label">{{t.label||t}}</div></li></ul></div><a href="/article/{{b._id}}"><div class="read-more">阅读更多<div class="read-more__arrow"><span class="fa fa-chevron-right"></span></div></div></a></div></div><span class="post-format"></span></div></div><h4 class="ui horizontal inverted divider"></h4><div class="row" style="margin-bottom:10px;"><div class="col-xs-4"><button class="ui labeled icon button" ng-click="jumppage(\'last\')"><i class="fa fa-chevron-left icon"></i> 上一页</button></div><div class="col-xs-4" style="text-align:center;line-height: 30px;">{{page&&page.pageIndex?page.pageIndex:\'1\'}}/{{page&&page.pageTotal?page.pageTotal:\'1\'}}</div><div class="col-xs-4"><button class="ui right labeled icon button pull-right" ng-click="jumppage(\'next\')"><i class="fa fa-chevron-right icon"></i> 下一页</button></div></div></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/article.html",'<div class="col-xs-12 col-md-8" style="z-index: 13;"><div class="boxed push-down-60"><div class="meta"><div class="wrap_post_image" ng-if="one.thumb"><img class="wp-post-image" ng-src="{{one.thumb}}"></div><div ng-class="one.thumb?\'meta__container\':\'meta__container--without-image\'"><div class="row"><div class="col-xs-12 col-sm-8"><div class="meta__info"><span class="meta__author"><img src="images/dummy/avator.png" alt="Meta avatar" width="30" height="30"> <a href="#">Charles</a> in <a href="#">{{one.area||\'北京\'}}</a></span> <span class="meta__date"><span class="glyphicon glyphicon-calendar"></span> &nbsp;{{one.time| date:"MM/dd/yyyy \'at\' h:mma"}}</span></div><div class="meta__originauthor" ng-if="one.originalauthor||one.tags"><span class="meta__originauthor" ng-if="one.originalauthor">原作者：{{one.originalauthor.name}}</span> <span class="meta__tags">标签：<a style="margin-right:10px;color:#e9322d;" ng-repeat="t in one.tags">{{t.label||t}}</a></span></div></div><div class="col-xs-12 col-sm-4"><div class="meta__comments"><span class="glyphicon glyphicon-comment"></span> &nbsp; <a href="single-post.html#disqus_thread"></a> <a ng-if="islogin" href="/edit?id={{one._id}}&type={{one.type}}"><span class="fa fa-edit" style="margin: 0 10px;"></span></a> <span ng-if="islogin" ng-click="remove(one)" class="fa fa-trash-o"></span></div></div></div></div></div><div class="row"><div class="col-xs-11 col-xs-offset-0 push-down-60"><div class="post-content"><h1><a href="#">{{one.title}}</a></h1><div id="articlecon"><div onview="" data-type="maincon" data-content="{{one.content}}"></div></div></div><div class="row"><div class="col-xs-12 col-sm-6"></div><div class="col-xs-12 col-sm-6"><div class="social-icons"><a href="#" class="social-icons__container weibo"><span class="fa fa-weibo"></span></a> <a class="social-icons__container weixin"><span class="fa fa-weixin"></span></a><div class="bshare-custom"><a title="分享到" href="http://www.bshare.cn/share" id="bshare-shareto" class="bshare-more"></a> <a title="分享到新浪微博" class="bshare-sinaminiblog" ng-click="share($event,\'sinaminiblog\')"></a> <a title="分享到微信朋友圈" class="bshare-weixin" ng-click="share($event,\'weixin\')"></a> <a title="更多平台" id="bshare-more-icon" class="bshare-more"></a></div></div></div></div><div class="related-stories" id="related-comment" data-arid="{{one._id}}"><h6>评论</h6><hr><div id="SOHUCS" sid="{{one._id}}"></div><script type="text/javascript"> \n			(function(){ \n			var appid = \'cytbiQFxM\'; \n			var conf = \'prod_1719392116e7712b7685989f9d145d1d\'; \n			var width = window.innerWidth || document.documentElement.clientWidth; \n			if (width < 960) { \n			window.document.write(\'<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=\' + appid + \'&conf=\' + conf + \'"><\\/script>\'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("http://changyan.sohu.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); } })(); </script></div></div></div></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/body.html",'<div ng-view=""></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/foot.html","<footer></footer>")}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/head.html","")}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/login.html",'<div class="wrapper"><div class="login_container"><h1>登陆</h1><form class="loginform" ng-submit="login()"><input flex="" name="username" type="text" placeholder="账号"><p class="passp"><input flex="" name="code" type="text" placeholder="点击发送验证码，并填写"> <i class="fa fa-arrow-up" ng-click="sendcode()"></i></p><button type="submit" id="login-button">登陆</button></form></div></div>')}]),angular.module("app").run(["$templateCache",function(a){a.put("controllers/html/right.html",'<div class="col-xs-12 col-md-4"><div class="widget-author boxed push-down-30"><div class="widget-author__image-container"><img width="90" height="90" alt="Avatar image" src="images/dummy/avator.png" class="widget-author__avatar"></div><div class="row"><div class="col-xs-11 col-xs-offset-0"><h4>Charles</h4><p style="margin-top: 15px;">前端工程师，爱音乐，爱色彩；前端大江湖中一粒尘埃；<br>我们无法阻挡生活的洪流，但我们可以主宰自己的时代</p></div></div></div><div class="sidebar boxed push-down-30"><div class="row"><div class="col-xs-11 col-xs-offset-0"><div class="widget-banner push-down-30"><h6>推广</h6><a><img width="300" height="250" alt="Banner ads" src="images/dummy/300x250xads-300x250.jpg.pagespeed.ic.S0egZznnN4.jpg"></a></div><div class="widget-categories push-down-30"><h6>类别</h6><ul><li><a href="?query=tech">技术 &nbsp; <span class="widget-categories__text">(16)</span> <i class="fa fa-chevron-right right-arrow"><i></i></i></a></li><li><a href="?query=ui-ue">用户体验与交互 &nbsp; <span class="widget-categories__text">(13)</span> <i class="fa fa-chevron-right right-arrow"><i></i></i></a></li><li><a href="?query=pic-word">图文谨句 &nbsp; <span class="widget-categories__text">(23)</span> <i class="fa fa-chevron-right right-arrow"><i></i></i></a></li><li><a href="?query=read-and-know">阅读 &amp; 书籍 &nbsp; <span class="widget-categories__text">(3)</span> <i class="fa fa-chevron-right right-arrow"><i></i></i></a></li></ul></div><div class="tags widget-tags"><h6>标签</h6><hr><a class="tags__link" ng-repeat="t in alltags track by $index" href="?tag={{t}}">{{t}}</a></div><div class="widget-posts push-down-30"><h6>热门文章</h6><div id="cyHotnews" role="cylabs" data-use="hotnews"></div><div class="tab-content"><div id="recent-posts" class="tab-pane fade in active" popular-post=""></div><div id="popular-posts" class="tab-pane fade"><div class="push-down-15"><img width="90" height="60" alt="Posts" src="images/dummy-licensed/xblog-image-3-small.jpg.pagespeed.ic.K2378TKtZN.jpg"><h5><a href="single-post.html">This is a showcase of the most popular posts</a></h5><span class="widget-posts__time">9 hours ago</span></div><div class="push-down-15"><img width="90" height="60" alt="Posts" src="images/dummy-licensed/xblog-image-small.jpg.pagespeed.ic.xUKfO4lWHu.jpg"><h5><a href="single-post.html">This is a showcase of the most popular posts</a></h5><span class="widget-posts__time">12 hours ago</span></div><div class="push-down-15"><img width="90" height="60" alt="Posts" src="images/dummy-licensed/xblog-image-3-small.jpg.pagespeed.ic.K2378TKtZN.jpg"><h5><a href="single-post.html">This is a showcase of the most popular posts</a></h5><span class="widget-posts__time">19 hours ago</span></div></div></div></div><div class="widget-recent-comments push-down-30" recent-comment=""><h6>最近评论</h6><div id="cyReping" role="cylabs" data-use="reping"></div><script type="text/javascript" charset="utf-8" src="https://changyan.itc.cn/js/lib/jquery.js"></script><script type="text/javascript" charset="utf-8" src="https://changyan.sohu.com/js/changyan.labs.https.js?appid=cytbiQFxM"></script></div><div class="widget-facebook push-down-30"><h6>新浪微博</h6><div id="likebox-wrapper"><iframe width="100%" height="550" class="share_self" frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=1&ptype=1&speed=0&skin=1&isTitle=0&noborder=0&isWeibo=1&isFans=1&uid=2709394993&verifier=8341d7fb&colors=ffffff,ffffff,666666,0082cb,ffffff&dpc=1"></iframe></div></div><div><audio id="music" controls="controls" height="100" width="100"><source src="controllers/html/yfy.mp3" type="audio/mp3"><source src="controllers/html/yfy.ogg" type="audio/ogg"><embed height="100" width="100" src="controllers/html/yfy.mp3"></audio></div></div></div></div><div class="post-ads"><a></a></div></div>')}]);