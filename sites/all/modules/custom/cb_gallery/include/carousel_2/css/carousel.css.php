<?php
if(isset($_GET)){
	foreach($_GET as $key => $val){
		$params[$key] = $val;
	}
}

header("Content-type: text/css");
?>
#block-carousel_2{
	clear:both;
}
#carousel { 
	height: <?php print (@$params['height'] != '' ? (@$params['controls']==1 ? $params['height']+30 : $params['height']) : '330'); ?>px;
	width: <?php print (@$params['width'] != '' ? $params['width'] : '500'); ?>px; 
	position: relative;
	clear: both;
	
}
#carousel .viewport { 
	float: left; width: <?php print (@$params['width'] != '' ? $params['width'] : '500'); ?>px; 
	height: <?php print (@$params['height'] != '' ? $params['height'] : '300'); ?>px; 
	overflow: hidden; 
	position: relative; 
	border-bottom: none;
    border-top: none;
    margin: 0;
    padding: 0;
}

#carousel li{
	list-style: none;
	background: none;
	overflow: hidden;
	position: relative;
}

#carousel .disable { visibility: hidden; }
#carousel .overview { list-style: none; position: absolute; padding: 0; margin: 0; left: 0; top: 0; }
#carousel .overview li{ 
	float: left; 
	height:  <?php print (@$params['height'] != '' ? $params['height'] : '300'); ?>px;
	width: <?php print (@$params['width'] != '' ? $params['width'] : '500'); ?>px;
	padding: 0;
	text-align: left;
	background-image: none;
}
#carousel .viewport img{
	margin: 0;
	position: absolute;
	
}
#carousel .pager{
	clear: both;
}
#carousel ul.pager{
	height: 30px;
	z-index: 3;
	margin: 0;
	padding: 0;
}
#carousel ul.pager li{
	float: left;
	height: 30px;
	width: 16px;
	background: none;
	padding: 0;
	text-align: center;
}
#carousel .pager a{
	font-size:14px;
	border: none !important;
	cursor:pointer;
}

#carousel .pager a.active{
	color: #ccc;
}

#carousel .pager a.last{
	border-right:1px solid #000;
}


/*#carousel a.buttons.prev{
  display:block; 
  text-decoration:none;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url(../img/prev-horizontal.png) no-repeat 0 0;
  margin-left:5px;
  border: none;
	position: absolute;
	top: 50%;
	left: 10px;
	margin: 0 0 0 10px; 
	z-index: 6;
}

#carousel a.buttons.next{
  display:block;
  text-decoration:none; 
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url(../img/next-horizontal.png) no-repeat 0 0;
  margin-right:4px;
  border: none;
	position: absolute;
	top: 50%;
	right: 10px;
	margin: 0 10px 0 0; 
	z-index: 6;
	
}*/

#carousel .button-container{
  display:block; 
  text-decoration:none;
  text-align: right;
  width: 50px;
  height: 25px;
  cursor: pointer;
  margin-left:5px;
  border: none;
	position: absolute;
	bottom: 0px;
	right: 0px;
	margin: 0 0 0 0; 
	z-index: 6;
}

#carousel a.buttons.prev{
  display:block; 
  border: none;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url(../img/prev-horizontal.png) no-repeat 0 0;
  float: left;
  text-decoration:none;
}

#carousel a.buttons.next{
  display:block;
  border: none;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url(../img/next-horizontal.png) no-repeat 0 0;
  float: left;
  text-decoration:none;
}

#carousel .overlay{
	position:absolute;
	bottom:0px;
	left:0px;
	cursor: pointer;
	z-index: 4;
	background: url(../img/carousel_bg.png);
	width: <?php print (@$params['width'] != '' ? $params['width'] : '300'); ?>px;
	height: 25%;
	padding: 10px 10px 0 10px;
	color: #fff;
}

#shadowbox_title {
  border: 0px solid;
}

#shadowbox_info {
  border: 0px solid;
}

#sb-nav-next{
	position: absolute;
	bottom: 9px;
	right: 60px;
}

#sb-nav-previous{
	position: absolute;
	bottom: 9px;
	right: 80px;
}

.carousel-edit{
	margin-top: -7px;
	display: block;
}