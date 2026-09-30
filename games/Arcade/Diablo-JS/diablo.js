(function(undefined) {

var imageCount=0;
function loadImage(url,angles,steps,offsetX){
    imageCount++;
    var i=new Image();
    i.onload=function(){
        imageCount--;
        i.offsetX=offsetX?((i.height/angles)>>2):0;
    }
    i.src=url;
    if(typeof angles!="undefined" && typeof steps!="undefined"){
        i.angles=angles;
        i.steps=steps;
    }
    return i;
}
function load(img,callback){
    if(img.complete)callback();
    else img.addEventListener('load',callback,false);
}

var level = {
    floor:{
        prefix:"dttool/output/1/",
        map:[
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0, 756, 756, 756, 756, 756, 756,   0,   0,   0,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756,1140, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756,1140, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 660, 660, 372, 756, 756, 756, 756, 756,],
            [   0, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756,],
            [   0, 756, 756,1908, 756, 756, 756, 756, 756, 756, 756,],
            [   0,   0, 756, 756, 756, 756, 756, 756,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        ],
        header:{
            372:false,
            660:false,
            756:false,
            1140:false,
            1908:false,  
        }
    },  
    wall:{
        prefix:"dttool/output/0/",
        map:[
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0, 948, 372, 372, 372, 948, 372,2100,   0,   0,],
            [   0, 948,1140,   0,   0,   0, 468,   0,2004, 372, 948,],
            [   0, 468,   0,   0,   0,   0,1524,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0,1428,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0, 468,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0, 468,   0,   0,   0,1524,],
            [   0, 948, 372, 372, 372, 372,1140,   0,   0,   0,1428,],
            [   0, 468,   0,   0,   0,   0,   0,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0,   0,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0,   0,   0,   0,   0, 468,],
            [   0, 468,   0,   0,   0,   0,   0,   0,   0,   0, 468,],
            [   0,2004,2100,   0,   0,   0,   0,   0, 948, 372,2004,],
            [   0,   0,2004, 372, 372, 372, 372, 372,1140,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        ],
        header:{
            276:{orientation:8, main_index:5, sub_index:2, direction:1, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,]},
            372:{orientation:2, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,]},
            468:{orientation:1, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            564:{orientation:2, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,]},
            660:{orientation:2, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,]},
            756:{orientation:1, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            852:{orientation:1, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            948:{orientation:3, main_index:5, sub_index:0, direction:3, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,]},
            1044:{orientation:4, main_index:5, sub_index:0, direction:3, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,]},
            1140:{orientation:7, main_index:5, sub_index:0, direction:4, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            1236:{orientation:9, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,]},
            1332:{orientation:9, main_index:5, sub_index:1, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,]},
            1428:{orientation:8, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]},
            1524:{orientation:8, main_index:5, sub_index:1, direction:1, walk:[0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            1620:{orientation:9, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,]},
            1716:{orientation:9, main_index:5, sub_index:1, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,]},
            1812:{orientation:8, main_index:5, sub_index:1, direction:1, walk:[0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            1908:{orientation:8, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]},
            2004:{orientation:6, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,]},
            2100:{orientation:5, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            2196:{orientation:6, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,]},
            2292:{orientation:5, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            2388:{orientation:2, main_index:5, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,]},
            2484:{orientation:1, main_index:5, sub_index:0, direction:1, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            2580:{orientation:3, main_index:5, sub_index:0, direction:3, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,]},
            2676:{orientation:4, main_index:5, sub_index:0, direction:3, walk:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,]},
            2772:{orientation:12, main_index:5, sub_index:0, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
        }
    },
    object:{
        prefix:"dttool/output/2/",
        map:[
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,5844,   0,   0,3828,   0,   0,   0,],
            [   0,   0,4212,4116,   0,   0,   0,3732,   0,   0,   0,],
            [   0,   0,   0,4404,1524,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,4308,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,5652, 372, 276,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,5748,   0,   0,   0,   0,],
            [   0,   0,   0,2676,2580,2484,   0,   0,   0,   0,   0,],
            [   0,   0,2868,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,3444,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
            [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
        ],
        header:{
            276:{orientation:2, main_index:9, sub_index:12, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,]},
            372:{orientation:2, main_index:9, sub_index:11, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,]},
            468:{orientation:12, main_index:50, sub_index:0, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,]},
            564:{orientation:12, main_index:9, sub_index:33, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,1,1,1,1,0,]},
            660:{orientation:1, main_index:9, sub_index:33, direction:1, walk:[1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,]},
            756:{orientation:7, main_index:9, sub_index:33, direction:4, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,]},
            852:{orientation:12, main_index:9, sub_index:32, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            948:{orientation:12, main_index:9, sub_index:31, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,]},
            1044:{orientation:1, main_index:9, sub_index:10, direction:1, walk:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            1140:{orientation:1, main_index:9, sub_index:9, direction:1, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            1236:{orientation:1, main_index:9, sub_index:8, direction:1, walk:[1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            1332:{orientation:12, main_index:9, sub_index:11, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,]},
            1428:{orientation:12, main_index:9, sub_index:10, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,]},
            1524:{orientation:12, main_index:9, sub_index:9, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]},
            1620:{orientation:12, main_index:9, sub_index:8, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]},
            1716:{orientation:12, main_index:9, sub_index:7, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            1812:{orientation:12, main_index:9, sub_index:6, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            1908:{orientation:12, main_index:9, sub_index:5, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2004:{orientation:12, main_index:9, sub_index:4, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2100:{orientation:12, main_index:9, sub_index:3, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2196:{orientation:12, main_index:9, sub_index:2, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2292:{orientation:12, main_index:9, sub_index:1, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2388:{orientation:12, main_index:9, sub_index:0, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,]},
            2484:{orientation:2, main_index:9, sub_index:10, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]},
            2580:{orientation:2, main_index:9, sub_index:9, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,]},
            2676:{orientation:2, main_index:9, sub_index:8, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]},
            2772:{orientation:2, main_index:9, sub_index:7, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,]},
            2868:{orientation:2, main_index:9, sub_index:6, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,]},
            2964:{orientation:1, main_index:9, sub_index:7, direction:1, walk:[0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            3060:{orientation:1, main_index:9, sub_index:6, direction:1, walk:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            3156:{orientation:2, main_index:9, sub_index:5, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,]},
            3252:{orientation:2, main_index:9, sub_index:4, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,]},
            3348:{orientation:1, main_index:9, sub_index:5, direction:1, walk:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            3444:{orientation:1, main_index:9, sub_index:4, direction:1, walk:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            3540:{orientation:12, main_index:9, sub_index:30, direction:3, walk:[0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,]},
            3636:{orientation:12, main_index:9, sub_index:29, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,]},
            3732:{orientation:1, main_index:9, sub_index:3, direction:1, walk:[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            3828:{orientation:1, main_index:9, sub_index:2, direction:1, walk:[1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            3924:{orientation:2, main_index:9, sub_index:3, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,]},
            4020:{orientation:2, main_index:9, sub_index:2, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,]},
            4116:{orientation:2, main_index:9, sub_index:1, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,]},
            4212:{orientation:2, main_index:9, sub_index:0, direction:2, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,]},
            4308:{orientation:1, main_index:9, sub_index:1, direction:1, walk:[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            4404:{orientation:1, main_index:9, sub_index:0, direction:1, walk:[1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            4500:{orientation:12, main_index:9, sub_index:28, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,]},
            4596:{orientation:12, main_index:9, sub_index:27, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,]},
            4692:{orientation:12, main_index:9, sub_index:24, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,]},
            4788:{orientation:12, main_index:9, sub_index:23, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,]},
            4884:{orientation:12, main_index:9, sub_index:22, direction:3, walk:[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,]},
            4980:{orientation:12, main_index:9, sub_index:21, direction:3, walk:[0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,]},
            5076:{orientation:12, main_index:9, sub_index:20, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,]},
            5172:{orientation:12, main_index:9, sub_index:17, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            5268:{orientation:12, main_index:9, sub_index:18, direction:3, walk:[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            5364:{orientation:12, main_index:9, sub_index:19, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,]},
            5460:{orientation:12, main_index:9, sub_index:16, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,]},
            5556:{orientation:12, main_index:9, sub_index:15, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,]},
            5652:{orientation:12, main_index:9, sub_index:13, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,]},
            5748:{orientation:12, main_index:9, sub_index:12, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,]},
            5844:{orientation:12, main_index:9, sub_index:14, direction:3, walk:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,]},
        }
    }
};

// ===== Per-level handcrafted architectures, randomized each run =====
var MAX_LEVEL=3;
var currentLevel=0, stairX=-1, stairY=-1, spawnGX=8, spawnGY=10, gameWon=false, questTitle="", questGoal="";
var gameState="title", kills=0, gameStartTime=0, dialogIdx=0, dialogText="";
var LANG=(navigator.language||"en").toLowerCase().indexOf("zh")>=0?"zh":"en";
var I18N={
  gameTitle:{zh:"暗黑 JS",en:"DIABLO JS"},subtitle:{zh:"黑暗奇幻动作 RPG",en:"A Dark Fantasy Action RPG"},tagline:{zh:"3 关 3 BOSS 一个英雄 拯救荆棘镇",en:"3 levels. 3 bosses. One hero. Save Thornhaven."},
  helpDesktop:{zh:"电脑：点击移动/攻击 | Z/X/C 切换武器 | Q/W/E 技能 | 1-0 药水",en:"Desktop: Click to move/attack | Z/X/C weapons | Q/W/E skills | 1-0 potions"},
  helpMobile:{zh:"手机：左侧摇杆移动 | 右侧按钮攻击/技能",en:"Mobile: Left joystick to move | Right buttons to attack/skills"},
  begin:{zh:"点击 或 按空格 开始",en:"CLICK or PRESS SPACE to BEGIN"},langHint:{zh:"按 L 切换语言",en:"Press L to switch language"},
  quest:{zh:"任务：",en:"Quest: "},wpn:{zh:"武器：",en:"Wpn: "},bossHint:{zh:"☠ 击败 BOSS 开启楼梯",en:"☠ Defeat the BOSS to open the stairs"},
  youDied:{zh:"你死了",en:"YOU DIED"},restart:{zh:"点击 或 按 R 重新开始",en:"Click or press R to restart"},
  victory:{zh:"胜利！",en:"VICTORY!"},victoryText:{zh:"你击败了恶魔领主，光明重返荆棘镇。",en:"You have slain the Demon Lord. Light returns to Thornhaven."},
  kills:{zh:"击杀",en:"Kills"},level:{zh:"等级",en:"Level"},time:{zh:"用时",en:"Time"},gold:{zh:"金币",en:"Gold"},
  shareHint:{zh:"按 S 分享成绩 | 点击或 R 再玩一次",en:"Press S to share | Click or R to play again"},
  storyOf:{zh:"剧情",en:"Story"},continue:{zh:"点击 或 空格 继续",en:"Click or SPACE to continue"},
  shareTitle:{zh:"暗黑 JS - 通关！",en:"Diablo JS - Victory!"},shareText:{zh:"我通关了暗黑 JS！",en:"I beat Diablo JS!"},
  shareCopied:{zh:"通关成绩已复制到剪贴板！",en:"Victory stats copied to clipboard!"},shareCopy:{zh:"复制分享：",en:"Copy to share:"},
  skillFireball:{zh:"火球术",en:"Fireball"},skillDash:{zh:"冲锋",en:"Dash"},skillWarCry:{zh:"战吼",en:"WarCry"}
};
function T(k){var v=I18N[k];return v?(v[LANG]||v.en):k;}
function toggleLang(){LANG=LANG==="zh"?"en":"zh";}
var STORY=[
  {title:{zh:"黑暗地窖",en:"The Dark Cellar"}, lines:{zh:["荆棘镇陷入了死寂。","牲畜失踪，孩童在夜里尖叫。","你走下古老的地窖，寻找邪恶的源头。","骷髅在走廊中游荡，骷髅王指挥着它们。","杀死他，通往墓穴的道路就会开启。"],en:["The village of Thornhaven has fallen silent.","Cattle vanish, children scream at night.","You descend into the old cellar to find the source.","Skeletons walk these halls. The Skeleton King commands them.","Slay him, and the path to the Crypt shall open."]}},
  {title:{zh:"被遗忘的墓穴",en:"The Forgotten Crypt"}, lines:{zh:["墓穴被封印是有原因的。","一个巫妖占据了这里，复活死者。","它企图召唤更可怕的存在。","深入腹地，终结它的邪恶仪式。"],en:["The Crypt was sealed for a reason.","A Lich has made this place its own, raising the dead.","It seeks to summon something far worse.","Push deeper. End its unholy ritual."]}},
  {title:{zh:"恶魔巢穴",en:"The Demon Lair"}, lines:{zh:["空气中弥漫着硫磺的灼烧味。","恶魔领主在深渊中等候。","它是黑暗的核心。","击倒它，荆棘镇将重获和平。"],en:["The air burns with sulphur.","The Demon Lord awaits in the abyss.","It is the heart of the darkness.","Strike it down, and Thornhaven shall know peace again."]}}
];
var LEVEL_NAMES={zh:["地窖","墓穴","恶魔巢穴"],en:["Cellar","Crypt","Demon Lair"]};
var LEVEL_GOALS={zh:['击败骷髅王，找到楼梯','击败墓穴巫妖，深入腹地','击败恶魔领主，拯救荆棘镇'],en:['Slay the Skeleton King, then find the stairs','Slay the Crypt Lich, then descend deeper','Slay the Demon Lord to save Thornhaven']};

function buildMap(idx){
    var W=31,H=21;
    function blank(){var a=[];for(var y=0;y<H;y++){a.push([]);for(var x=0;x<W;x++)a[y].push(0);}return a;}
    level.floor.map=blank(); level.wall.map=blank(); level.object.map=blank();
    var x,y,sgx=15,sgy=10;
    for(y=2;y<H-2;y++) for(x=2;x<W-2;x++) level.floor.map[y][x]=756;
    function isFloor(yy,xx){ return yy>0 && yy<H-1 && xx>0 && xx<W-1 && level.wall.map[yy][xx]===0 && level.object.map[yy][xx]===0; }
    var dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    function ring(o,hw,vw){ // rectangular wall ring with corner tiles
        for(x=o.x;x<=o.x+o.w;x++){ if(!level.wall.map[o.y][x]) level.wall.map[o.y][x]=hw; if(!level.wall.map[o.y+o.h][x]) level.wall.map[o.y+o.h][x]=hw; }
        for(y=o.y;y<=o.y+o.h;y++){ if(!level.wall.map[y][o.x]) level.wall.map[y][o.x]=vw; if(!level.wall.map[y][o.x+o.w]) level.wall.map[y][o.x+o.w]=vw; }
        level.wall.map[o.y][o.x]=948; level.wall.map[o.y][o.x+o.w]=948;
        level.wall.map[o.y+o.h][o.x]=948; level.wall.map[o.y+o.h][o.x+o.w]=948;
    }
    function door(o,side,at,wide){ // side:0 top,1 bottom,2 left,3 right; at offset from o.x/o.y, 1-based interior
        if(side===0){ level.wall.map[o.y][o.x+at]=0; if(wide) level.wall.map[o.y][o.x+at+1]=0; }
        else if(side===1){ level.wall.map[o.y+o.h][o.x+at]=0; if(wide) level.wall.map[o.y+o.h][o.x+at+1]=0; }
        else if(side===2){ level.wall.map[o.y+at][o.x]=0; if(wide) level.wall.map[o.y+at+1][o.x]=0; }
        else { level.wall.map[o.y+at][o.x+o.w]=0; if(wide) level.wall.map[o.y+at+1][o.x+o.w]=0; }
    }
    if(idx===0){
        // ---- Cellar: two open warehouse halls + loose shelf walls ----
        var hallA={x:4,y:4,w:7,h:5}, hallB={x:19,y:11,w:7,h:5};
        ring(hallA,372,468); ring(hallB,372,468);
        door(hallA,1,2,true); door(hallA,3,1,true);      // bottom + right openings
        door(hallB,0,2,true); door(hallB,2,1,true);      // top + left openings
        spawnGX=hallA.x+3; spawnGY=hallA.y+2; sgx=hallB.x+3; sgy=hallB.y+2;
        var shelves=5+Math.floor(Math.random()*2);       // loose rack walls, nothing maze-like
        for(var sh=0; sh<shelves; sh++){
            var horiz=Math.random()<0.5, len=3+Math.floor(Math.random()*3);
            var sx=3+Math.floor(Math.random()*(W-6-len)), sy=3+Math.floor(Math.random()*(H-6));
            var ok=true;
            for(var k=0;k<len;k++){ var cx=horiz?sx+k:sx, cy=horiz?sy:sy+k;
                if(!isFloor(cy,cx)) { ok=false; break; }
                if(Math.abs(cx-spawnGX)+Math.abs(cy-spawnGY)<4 || Math.abs(cx-sgx)+Math.abs(cy-sgy)<4){ ok=false; break; }
            }
            if(!ok) continue;
            for(var k2=0;k2<len;k2++){ var cx2=horiz?sx+k2:sx, cy2=horiz?sy:sy+k2; level.wall.map[cy2][cx2]=horiz?372:468; }
        }
    } else if(idx===1){
        // ---- Crypt: symmetric tomb - central crypt mirrored by side chambers ----
        var cen={x:12,y:6,w:6,h:8};
        var sL1={x:3,y:5,w:4,h:3}, sL2={x:3,y:13,w:4,h:3};
        var sR1={x:23,y:5,w:4,h:3}, sR2={x:23,y:13,w:4,h:3};
        ring(cen,372,468); ring(sL1,372,468); ring(sL2,372,468); ring(sR1,372,468); ring(sR2,372,468);
        door(cen,2,3,true); door(cen,3,3,true);          // crypt opens both sides
        door(sL1,3,1,true); door(sR1,2,1,true);          // upper chambers face the aisles
        door(sL2,3,1,true); door(sR2,2,1,true);          // lower chambers too
        door(cen,0,2,true); door(cen,1,2,true);          // north/south exits
        spawnGX=sL2.x+2; spawnGY=sL2.y+1; sgx=cen.x+3; sgy=cen.y+4;
    } else {
        // ---- Lair: ring arena around a central boss hall ----
        var outer={x:4,y:3,w:22,h:14}, inner={x:11,y:7,w:8,h:6};
        ring(outer,372,468); ring(inner,372,468);
        door(outer,0,4,true); door(outer,0,16,true);     // two gates per side
        door(outer,1,4,true); door(outer,1,16,true);
        door(outer,2,5,true); door(outer,2,9,true);
        door(outer,3,5,true); door(outer,3,9,true);
        door(inner,0,3,true); door(inner,1,3,true); door(inner,2,2,true); door(inner,3,2,true);
        spawnGX=7; spawnGY=15; sgx=inner.x+4; sgy=inner.y+3;
    }
    // ---- common: BFS connectivity repair (never traps the player) ----
    function reachable(){
        var seen={}, q=[[spawnGY,spawnGX]];
        seen[spawnGY+','+spawnGX]=1;
        while(q.length){
            var c=q.shift(), yy=c[0], xx=c[1];
            for(var d=0;d<4;d++){ var ny=yy+dirs[d][0], nx=xx+dirs[d][1];
                if(isFloor(ny,nx) && !seen[ny+','+nx]){ seen[ny+','+nx]=1; q.push([ny,nx]); }
            }
        }
        return seen;
    }
    for(var guard=0; guard<200; guard++){
        var seen=reachable(), un=null;
        outer1: for(var fy=1; fy<H-1; fy++) for(var fx=1; fx<W-1; fx++)
            if(isFloor(fy,fx) && !seen[fy+','+fx]){ un=[fy,fx]; break outer1; }
        if(!un) break;
        var opened=false;
        outer2: for(var wy2=1; wy2<H-1; wy2++) for(var wx2=1; wx2<W-1; wx2++){
            if(level.wall.map[wy2][wx2]>0){
                var hs=false, hu=false;
                for(var d=0;d<4;d++){ var ny=wy2+dirs[d][0], nx=wx2+dirs[d][1];
                    if(isFloor(ny,nx)){ if(seen[ny+','+nx]) hs=true; else hu=true; }
                }
                if(hs && hu){ level.wall.map[wy2][wx2]=0; opened=true; break outer2; }
            }
        }
        if(!opened){ level.wall.map[un[0]][un[1]]=0; }
    }
    // ---- stairs guarded by the BOSS ----
    stairX=sgx*s+s/2; stairY=sgy*s+s/2;
    level.object.map[sgy][sgx]=1524;
    // ---- sparse decor around walls (per level density) ----
    var decoTiles=[564,660,4116,4212,5748,5844,5652,3828];
    var maxDec=[18,24,12][idx]||18;
    var placed=0, tries2=0;
    while(placed<maxDec && tries2<600){
        tries2++;
        var ry2=2+Math.floor(Math.random()*17), rx2=2+Math.floor(Math.random()*27);
        if(level.wall.map[ry2][rx2]>0 || level.object.map[ry2][rx2]>0) continue;
        if(Math.abs(rx2-spawnGX)<=1 && Math.abs(ry2-spawnGY)<=1) continue;
        var adj=(level.wall.map[ry2-1]&&level.wall.map[ry2-1][rx2]>0)||(level.wall.map[ry2+1]&&level.wall.map[ry2+1][rx2]>0)||level.wall.map[ry2][rx2-1]>0||level.wall.map[ry2][rx2+1]>0;
        if(!adj) continue;
        level.wall.map[ry2][rx2]=999;
        var s2=reachable(), ok2=true;
        for(var fy2=1; fy2<H-1 && ok2; fy2++) for(var fx2=1; fx2<W-1; fx2++)
            if(isFloor(fy2,fx2) && !s2[fy2+','+fx2]){ ok2=false; }
        level.wall.map[ry2][rx2]=0;
        if(!ok2) continue;
        level.object.map[ry2][rx2]=decoTiles[Math.floor(Math.random()*decoTiles.length)];
        placed++;
    }
}

for(var l in level){
    level[l].tiles={};  
    for(i in level[l].header) if(!level[l].tiles[i]) level[l].tiles[i]=loadImage(level[l].prefix+i+".png");
} 

var floor=document.getElementById("floor").getContext("2d");
floor.w=floor.canvas.width;
floor.h=floor.canvas.height;
var tw=160, th=tw/2, s=tw*0.705, a=Math.PI/4, visible=11, asin=acos=Math.sin(a);

var barrelSprite=loadImage("sprite/barrel64.png");
var coinSprite=loadImage("sprite/coins10.png");
var potionSprite=loadImage("sprite/potions.png");


// ===== Sound effects (Web Audio API synthesis, no external files) =====
var audioCtx=null, deathSfxPlayed=false, sfxOut=null, sfxVerb=null;
function initAudio(){
    if(!audioCtx){
        try{
            audioCtx=new (window.AudioContext||window.webkitAudioContext)();
            // master bus: soft limiter so layered sounds never clip
            var comp=audioCtx.createDynamicsCompressor();
            comp.threshold.value=-16; comp.knee.value=18; comp.ratio.value=8;
            comp.attack.value=0.003; comp.release.value=0.18;
            var master=audioCtx.createGain(); master.gain.value=0.6;
            comp.connect(master); master.connect(audioCtx.destination);
            sfxOut=comp;
            // short dungeon reverb (generated impulse response, no files)
            var ir=audioCtx.createBuffer(2, Math.floor(audioCtx.sampleRate*0.7), audioCtx.sampleRate);
            for(var ch=0; ch<2; ch++){
                var d=ir.getChannelData(ch);
                for(var i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
            }
            var conv=audioCtx.createConvolver(); conv.buffer=ir;
            var vg=audioCtx.createGain(); vg.gain.value=0.3;
            conv.connect(vg); vg.connect(comp);
            sfxVerb=conv;
        }catch(e){ audioCtx=null; }
    }
    if(audioCtx && audioCtx.state==='suspended'){ audioCtx.resume(); }
}
function sfxTone(o){ // oscillator voice: {f0,f1,dur,wave,vol,when,lp,lp1,verb,atk}
    if(!audioCtx) return;
    var t=audioCtx.currentTime+(o.when||0), dur=o.dur;
    var osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    osc.type=o.wave||'sine';
    osc.frequency.setValueAtTime(Math.max(1,o.f0), t);
    if(o.f1) osc.frequency.exponentialRampToValueAtTime(Math.max(1,o.f1), t+dur);
    var head=osc;
    if(o.lp){ var f=audioCtx.createBiquadFilter(); f.type='lowpass';
        f.frequency.setValueAtTime(o.lp,t);
        if(o.lp1) f.frequency.exponentialRampToValueAtTime(Math.max(20,o.lp1),t+dur);
        head.connect(f); head=f; }
    var atk=o.atk||0.006;
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(o.vol,t+atk);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    head.connect(g); g.connect(sfxOut);
    if(o.verb) g.connect(sfxVerb);
    osc.start(t); osc.stop(t+dur+0.06);
}
function sfxNoise(o){ // shaped noise voice: {dur,vol,when,type,f0,f1,q,verb,atk}
    if(!audioCtx) return;
    var t=audioCtx.currentTime+(o.when||0), dur=o.dur;
    var len=Math.max(64,Math.floor(audioCtx.sampleRate*dur));
    var buf=audioCtx.createBuffer(1,len,audioCtx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<len;i++) d[i]=Math.random()*2-1;
    var n=audioCtx.createBufferSource(); n.buffer=buf;
    var f=audioCtx.createBiquadFilter(); f.type=o.type||'lowpass'; f.Q.value=o.q||0.9;
    f.frequency.setValueAtTime(o.f0||1200,t);
    if(o.f1) f.frequency.exponentialRampToValueAtTime(Math.max(20,o.f1),t+dur);
    var g=audioCtx.createGain(); var atk=o.atk||0.004;
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(o.vol,t+atk);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    n.connect(f); f.connect(g); g.connect(sfxOut);
    if(o.verb) g.connect(sfxVerb);
    n.start(t); n.stop(t+dur+0.06);
}
function sfx(type){
    if(!audioCtx) return;
    switch(type){
        case 'attack': // blade whoosh
            sfxNoise({dur:0.11,vol:0.3,type:'bandpass',f0:3200,f1:700,q:1.4});
            sfxNoise({dur:0.05,vol:0.1,type:'highpass',f0:5200,when:0.01});
            break;
        case 'hit': // meaty impact: thump + crunch
            sfxTone({f0:170,f1:52,dur:0.1,wave:'sine',vol:0.55,lp:900});
            sfxNoise({dur:0.08,vol:0.3,f0:2000,f1:280});
            sfxTone({f0:420,f1:180,dur:0.05,wave:'triangle',vol:0.16});
            break;
        case 'heroHurt': // low painful grunt
            sfxTone({f0:210,f1:66,dur:0.26,wave:'sawtooth',vol:0.3,lp:1100,lp1:300,verb:1});
            sfxNoise({dur:0.16,vol:0.2,f0:800,f1:220});
            break;
        case 'coin': // classic crisp two-note chime
            sfxTone({f0:988,dur:0.07,wave:'square',vol:0.13,lp:5200});
            sfxTone({f0:1319,dur:0.24,wave:'square',vol:0.13,lp:5200,when:0.07,verb:1});
            break;
        case 'potion': // bright pickup arpeggio
            sfxTone({f0:660,dur:0.07,wave:'sine',vol:0.2});
            sfxTone({f0:990,dur:0.07,wave:'sine',vol:0.2,when:0.06});
            sfxTone({f0:1320,dur:0.16,wave:'sine',vol:0.2,when:0.12,verb:1});
            break;
        case 'drink': // gulp gulp gulp
            sfxTone({f0:320,f1:150,dur:0.09,wave:'sine',vol:0.3});
            sfxTone({f0:280,f1:130,dur:0.09,wave:'sine',vol:0.3,when:0.1});
            sfxTone({f0:360,f1:170,dur:0.12,wave:'sine',vol:0.26,when:0.2});
            sfxNoise({dur:0.3,vol:0.05,f0:1500,f1:600});
            break;
        case 'death': // long low fall with reverb tail
            sfxTone({f0:200,f1:36,dur:1.2,wave:'sawtooth',vol:0.3,lp:900,lp1:120,verb:1});
            sfxNoise({dur:0.8,vol:0.16,f0:600,f1:80,verb:1});
            break;
        case 'monsterDie': // dying snarl
            sfxTone({f0:300,f1:70,dur:0.38,wave:'sawtooth',vol:0.22,lp:1400,lp1:250,verb:1});
            sfxNoise({dur:0.22,vol:0.16,f0:1100,f1:200});
            break;
        case 'fire': // fireball launch whoosh
            sfxNoise({dur:0.24,vol:0.26,type:'bandpass',f0:420,f1:2400,q:1.1});
            sfxTone({f0:520,f1:130,dur:0.2,wave:'sawtooth',vol:0.1,lp:1200});
            break;
        case 'dash': // rushing wind
            sfxNoise({dur:0.26,vol:0.26,type:'bandpass',f0:500,f1:3200,q:0.9});
            sfxTone({f0:240,f1:620,dur:0.18,wave:'triangle',vol:0.12});
            break;
        case 'error': // dull double-buzz
            sfxTone({f0:180,dur:0.09,wave:'square',vol:0.13,lp:800});
            sfxTone({f0:140,dur:0.12,wave:'square',vol:0.13,lp:700,when:0.11});
            break;
        case 'levelup': // rising fanfare
            sfxTone({f0:523,dur:0.1,wave:'triangle',vol:0.22});
            sfxTone({f0:659,dur:0.1,wave:'triangle',vol:0.22,when:0.09});
            sfxTone({f0:784,dur:0.1,wave:'triangle',vol:0.22,when:0.18});
            sfxTone({f0:1047,dur:0.3,wave:'triangle',vol:0.24,when:0.27,verb:1});
            break;
        case 'bossdie': // deep layered explosion
            sfxTone({f0:120,f1:28,dur:0.9,wave:'sine',vol:0.6,verb:1});
            sfxNoise({dur:0.7,vol:0.4,f0:1400,f1:60,verb:1});
            sfxTone({f0:98,f1:49,dur:0.8,wave:'sawtooth',vol:0.2,lp:500,when:0.05,verb:1});
            break;
        case 'stairs': // mystical portal
            sfxTone({f0:392,dur:0.12,wave:'sine',vol:0.18,verb:1});
            sfxTone({f0:523,dur:0.12,wave:'sine',vol:0.18,when:0.1,verb:1});
            sfxTone({f0:659,dur:0.12,wave:'sine',vol:0.18,when:0.2,verb:1});
            sfxTone({f0:784,f1:392,dur:0.5,wave:'sine',vol:0.2,when:0.3,verb:1});
            break;
    }
}

function isWayWall(x,y){
    var block_x = Math.floor(x/s),
        block_y = Math.floor(y/s),
        ix = Math.floor((x%s)/(s/5)),
        iy = 4-Math.floor((y%s)/(s/5)),
        w_inx = iy*5+ix, h, idx;
    for(var l in level){
        if(level[l].map[block_y] && (idx=level[l].map[block_y][block_x]) && (h=level[l].header[idx])){
            if(h.walk[w_inx]==1) return false;
            else if(h.orientation==3){
                for(var idx in level.wall.header){
                    var tb=level.wall.header[idx];
                    if(tb.main_index==h.main_index && tb.sub_index==h.sub_index && tb.orientation==4 && h.walk[w_inx]==1){
                        return false;
                    }
                }
            }   
        }
    }    
    return true;
}

function getFloorTile(x, y) {
    if(!level.floor.map[y]) return null;
    if(!level.floor.map[y][x]) return null;
    var f = level.floor.map[y][x];
    return level.floor.tiles[f];
}

var monsterMap={
    SK: {
        A1: loadImage("monsters/SK/A1/map.png",8,16,true),
        NU: loadImage("monsters/SK/NU/map.png",8,8,true),
        WL: loadImage("monsters/SK/WL/map.png",8,8,true),
        DD: loadImage("monsters/SK/DD/map.png",8,1),
        attackOffset:10,
    },
    FS: {
        A1: loadImage("monsters/FS/A1/map.png",8,17,true),
        NU: loadImage("monsters/FS/NU/map.png",8,12,true),
        WL: loadImage("monsters/FS/WL/map.png",8,14,true),
        DD: loadImage("monsters/FS/DD/map.png",8,1),
    },
    SI: {
        A1: loadImage("monsters/SI/A1/map.png",8,16,true),
        NU: loadImage("monsters/SI/NU/map.png",8,8,true),
        WL: loadImage("monsters/SI/WL/map.png",8,9,true),
        DD: loadImage("monsters/SI/DD/map.png",8,1),
    },
    BA: {
        A1: loadImage("monsters/BA/A1/map.png",16,9,true),
        NU: loadImage("monsters/BA/NU/map.png",16,8,true),
        WL: loadImage("monsters/BA/WL/map.png",16,8,true),
    },
};

// rage resource (combat rework)
var RAGE={max:100, hitGain:12, hurtGain:6, dashGain:8, fireballCost:35, shoutCost:40, decayDelay:3000, decayRate:8};
var hero=new HeroBarbarian(8*s,10*s);

setInterval(function(){
    if(dead) return;
    hero.health=Math.min(hero.health+25, hero.origin_health);
},1500);

// aggresive mobs
var monsters=[],deathmobs=[],barrels=[],coins=[],potions=[],walls=[];

var LEVELS=[
    {sk:3,fs:2,si:2,pots:5,dmg:16},
    {sk:5,fs:3,si:3,pots:6,dmg:24},
    {sk:6,fs:4,si:4,pots:7,dmg:32}
];
var BOSS_TYPES=[
    {name:'Skeleton King', sprite:'SI', hp:3500, dmg:35, spd:7, skill:'whirlwind', color:'#e74c3c'},
    {name:'Crypt Lich',    sprite:'FS', hp:3000, dmg:30, spd:5, skill:'summon',    color:'#9b59b6'},
    {name:'Demon Lord',    sprite:'SI', hp:5000, dmg:45, spd:8, skill:'firerain',  color:'#e67e22', scale:1.5}
];

function loadLevel(idx){
    currentLevel=idx;
    buildMap(idx);
    walls=[];
    for(var y in level.wall.map) for(var x in level.wall.map[y]){ var v=level.wall.map[y][x]; if(v>0) walls.push(new Wall(v,x*s,y*s)); }
    for(var y in level.object.map) for(var x in level.object.map[y]){ var v=level.object.map[y][x]; if(v>0) walls.push(new WallObject(v,x*s,y*s)); }
    monsters=[]; deathmobs=[]; barrels=[]; coins=[]; potions=[]; drops=[];
    var L=LEVELS[idx];
    var spawnPX=spawnGX*s+s/2, spawnPY=spawnGY*s+s/2;
    function safePos(){var x,y,t=0;do{x=randomx();y=randomy();t++;}while(t<25&&((Math.abs(x-spawnPX)+Math.abs(y-spawnPY))<5*s||!isWayWall(x,y)));return [x,y];}
    for(var i=0;i<L.sk;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'SK'));}
    for(var i=0;i<L.fs;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'FS'));}
    for(var i=0;i<L.si;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'SI'));}
    for(var i=0;i<L.pots;i++) potions.push(new PotionHealth(randomx(),randomy()));
    // boss guards the stairs
    if(idx<MAX_LEVEL) monsters.push(new BossMob(stairX+s*0.5, stairY-s*0.2));
    hero.x=spawnPX; hero.y=spawnPY; hero.to_x=hero.x; hero.to_y=hero.y;
    hero.health=hero.origin_health;
    hero.currentState=hero.stay; hero.step=0; hero.attacked=null;
    dead=false; gameWon=false; bossDead=false; hero.powerTimer=0; hero.hasteTimer=0; hero.whetTimer=0; hero.shieldTimer=0;
    if(idx===0){ kills=0; gameStartTime=performance.now()/1000; }
    gameState='dialog'; dialogIdx=0; dialogText=STORY[idx].lines[LANG][0];
    questTitle=T('level')+' '+(idx+1)+'/'+MAX_LEVEL+' · '+LEVEL_NAMES[LANG][idx];
    questGoal=LEVEL_GOALS[LANG][idx];
}

loadLevel(0);
gameState='title';

setInterval(function() { // random step for mobs, attack hero
    if(monsters.length==0)return;
    var m=monsters[Math.floor(Math.random()*monsters.length)];
    if(typeof m.attacked != "object"){
        m.to_x=m.x+(Math.random()*s-s/2);
        m.to_y=m.y+(Math.random()*s-s/2);
    }
    for(var i in monsters){
        var m=monsters[i], attackDist=(m.attackRange&&m.attackRange>0)?m.attackRange:100;
        if(m.castUntil && performance.now()/1000<m.castUntil){ m.to_x=m.x; m.to_y=m.y; continue; } // boss casting: hold
        if(m.staggerUntil && performance.now()<m.staggerUntil) continue; // hit stagger
        if(m.attack && m.isAboveHero()){
            var chaseDist=(m.isBoss?9999:10*s);
            var mdist=Math.abs(hero.x-m.x)+Math.abs(hero.y-m.y);
            if(mdist<chaseDist){
                if(m.attackRange&&m.attackRange>0){
                    if(mdist<attackDist){
                        if(!m._shotAt||performance.now()/1000-m._shotAt>1.6){
                            m._shotAt=performance.now()/1000;
                            m.rotateTo(hero); m.setState(m.attack);
                            fireProjectile(m, hero, m.currentDamage, m.name==='FS'?'fire':'arrow');
                        }
                        if(mdist<s*1.6){ m.to_x=m.x-(hero.x-m.x)*0.5; m.to_y=m.y-(hero.y-m.y)*0.5; } // too close: retreat
                        else if(mdist<=s*2.3){ m.to_x=m.x; m.to_y=m.y; } // kite band: hold and shoot
                        else { m.to_x=hero.x; m.to_y=hero.y; }
                    }else{ m.to_x=hero.x; m.to_y=hero.y; }
                }else if(Math.abs(hero.x-m.x)<attackDist &&
                   Math.abs(hero.y-m.y)<attackDist){
                   m.doAttack(hero);
                   m.to_x = m.x;
                   m.to_y = m.y;
                }else{
                    m.to_x=hero.x;
                    m.to_y=hero.y;
                    // separation: spread out instead of stacking
                    for(var j in monsters){
                        var o=monsters[j];
                        if(o!==m && Math.abs(o.x-m.x)<40 && Math.abs(o.y-m.y)<40){
                            m.to_x+=m.x-o.x; m.to_y+=m.y-o.y; break;
                        }
                    }
                }
            }
        }
    }
}, 200);

floor.canvas.onclick=function(e) {
    initAudio();
    if(gameState==='title'){ gameState='dialog'; dialogIdx=0; dialogText=STORY[0].lines[LANG][0]; return; }
    if(gameState==='dialog'){
        dialogIdx++;
        if(dialogIdx>=STORY[currentLevel].lines[LANG].length){ gameState='playing'; }
        else { dialogText=STORY[currentLevel].lines[LANG][dialogIdx]; }
        return;
    }
    if(gameState==='victory'){ location.reload(); return; }
    if(restartIfDead()) return;
    var scx=floor.canvas.clientWidth>0?floor.canvas.width/floor.canvas.clientWidth:1;
    var scy=floor.canvas.clientHeight>0?floor.canvas.height/floor.canvas.clientHeight:1;
    var mx=((e.offsetX==undefined?e.layerX:e.offsetX)*scx) - floor.w/2;
    var my=((e.offsetY==undefined?e.layerY:e.offsetY)*scy) - floor.h/2;
    var isCanClick=Math.abs(mx) < 100 && Math.abs(my) < 100;
    my *= 2; //unscale
    floor.click_x=hero.x + mx * Math.cos(-a) - my * Math.sin(-a);
    floor.click_y=hero.y + mx * Math.sin(-a) + my * Math.cos(-a);
    if(isCanClick)if(processClick())return;
    hero.to_x=floor.click_x;
    hero.to_y=floor.click_y;
}

window.onkeydown=function(e){
    initAudio();
    if(gameState==='title'){ if(e.keyCode===76){ toggleLang(); return; } if(e.keyCode===32||e.keyCode===13){ gameState='dialog'; dialogIdx=0; dialogText=STORY[0].lines[LANG][0]; } return; }
    if(gameState==='dialog'){
        if(e.keyCode===32||e.keyCode===13){
            dialogIdx++;
            if(dialogIdx>=STORY[currentLevel].lines[LANG].length){ gameState='playing'; }
            else { dialogText=STORY[currentLevel].lines[LANG][dialogIdx]; }
        }
        return;
    }
    if(gameState==='victory'){
        if(e.keyCode===83){ shareVictory(); return; }
        if(e.keyCode===82){ location.reload(); return; }
    }
    if(!hero){
        pickHero('barbarian');
        return false;
    }
    if(e.keyCode==9){
        showMap=!showMap;
        return false;
    }
    if(e.keyCode==90){ hero.weaponIndex=0; return false; } // Z = Blade
    if(e.keyCode==88){ hero.weaponIndex=1; return false; } // X = War Axe
    if(e.keyCode==67){ hero.weaponIndex=2; return false; } // C = Fire Staff
    if(e.keyCode==66){ if(window.openShop) window.openShop(); return false; } // B = Shop
    if(e.keyCode==81){ castSkill(0); return false; } // Q = Fireball
    if(e.keyCode==87){ castSkill(1); return false; } // W = Dash
    if(e.keyCode==69){ castSkill(2); return false; } // E = War Cry
    if(e.keyCode==82){
        if(dead){ location.reload(); return false; }
    }
}

var showMap=false;
var dead=false;
function drawDeathScreen(){
    floor.save();
    floor.fillStyle="rgba(0,0,0,0.68)";
    floor.fillRect(0,0,floor.w,floor.h);
    floor.textAlign="center";
    floor.fillStyle="#c0392b";
    floor.font="bold 66px 'Poppins',sans-serif";
    floor.fillText(T('youDied'), floor.w/2, floor.h/2-24);
    floor.fillStyle="#e8e6e3";
    floor.font="20px 'Poppins',sans-serif";
    floor.fillText(T('restart'), floor.w/2, floor.h/2+34);
    floor.textAlign="left";
    floor.restore();
}
function restartIfDead(){
    if(dead){ location.reload(); return true; }
    return false;
}
setInterval(function() {
    if(imageCount>0) return;
    if(document.body) document.body.classList.toggle('in-game', gameState==='playing'); // show touch controls only in-game
    if(gameState==='title'){ renderTitleScreen(); return; }
    if(gameState==='dialog'){ renderFloor(); renderDialog(); return; }
    if(dead){
        floor.fillStyle="black";floor.fillRect(0,0, floor.w,floor.h);
        renderFloor();
        drawDeathScreen();
        return;
    }
    if(touchUI.joystickActive && (touchUI.joyDX!==0 || touchUI.joyDY!==0)){
        hero.to_x=hero.x+touchUI.joyDX*2000;
        hero.to_y=hero.y+touchUI.joyDY*2000;
    }
    hero.nextStep();
    for(var i in monsters){ monsters[i].nextStep(); if(monsters[i].slow>0) monsters[i].slow-=0.066;
        var mm=monsters[i];
        if(mm.isBoss && mm.bossType.skill==='firerain' && Math.random()<0.35 && Fx.parts.length<70){ // hellfire embers
            Fx.parts.push({x:mm.x+(Math.random()-0.5)*40, y:mm.y+(Math.random()-0.5)*40, dx:(Math.random()-0.5)*20, dy:-30-Math.random()*30, life:0.5, color:Math.random()<0.5?'#ff8c00':'#ffd76e'});
        }
    }
    // buffs + move speed
    if(hero.powerTimer>0) hero.powerTimer-=0.066;
    if(hero.whetTimer>0) hero.whetTimer-=0.066;
    if(hero.shieldTimer>0) hero.shieldTimer-=0.066;
    if(comboTimer>0){ comboTimer-=0.066; comboPop=Math.max(0,comboPop-0.066*6); if(comboTimer<=0){ combo=0; } }
    if(hero.hasteTimer>0) hero.hasteTimer-=0.066;
    hero.st = hero.hasteTimer>0 ? 26 : 16;
    // rage decays out of combat
    if(hero.rage>0 && performance.now()-hero.lastCombatAt>RAGE.decayDelay){
        hero.rage=Math.max(0, hero.rage-RAGE.decayRate*0.066);
    }
    // mobile skill button availability feedback
    if(touchUI.s1){
        var nowSk=performance.now()/1000;
        touchUI.s1.style.opacity=(hero.rage>=RAGE.fireballCost && nowSk-hero.skills[0].last>=hero.skills[0].cd)?'1':'0.35';
        touchUI.s2.style.opacity=(nowSk-hero.skills[1].last>=hero.skills[1].cd)?'1':'0.35';
        touchUI.s3.style.opacity=(hero.rage>=RAGE.shoutCost && nowSk-hero.skills[2].last>=hero.skills[2].cd)?'1':'0.35';
    }
    // projectiles
    updateProjectiles(0.066);
    updateFx(0.066);
    // pick up power/haste drops
    for(var di=drops.length-1; di>=0; di--){
        var dd=drops[di];
        if(Math.abs(hero.x-dd.x)<s*0.8 && Math.abs(hero.y-dd.y)<s*0.8){ dd.use(hero); }
        if(dd.used) drops.splice(di,1);
    }
    // auto-pickup coins and potions by walking over them (mobile friendly)
    for(var ci2=coins.length-1; ci2>=0; ci2--){
        var cc=coins[ci2];
        if(Math.abs(hero.x-cc.x)<s*0.9 && Math.abs(hero.y-cc.y)<s*0.9){ cc.use(hero); }
    }
    for(var pi2=potions.length-1; pi2>=0; pi2--){
        var pp=potions[pi2];
        if(Math.abs(hero.x-pp.x)<s*0.9 && Math.abs(hero.y-pp.y)<s*0.9){ pp.use(hero); }
    }
    // boss slam attack
    for(var bi in monsters){
        var bm=monsters[bi];
        if(bm.isBoss && performance.now()/1000 - bm.slamAt > 4){
            bm.slamAt=performance.now()/1000;
            if(Math.abs(hero.x-bm.x)<s*2 && Math.abs(hero.y-bm.y)<s*2){
                hero.damage(bm.getDamage()*0.5); sfx('heroHurt');
                hero.to_x=hero.x+(hero.x-bm.x)/2; hero.to_y=hero.y+(hero.y-bm.y)/2;
            }
        }
    }
    floor.fillStyle="black";floor.fillRect(0,0, floor.w,floor.h);
    var shaking=Fx.shake>0;
    if(shaking){ Fx.shake-=0.066; floor.save(); floor.translate((Math.random()-0.5)*8,(Math.random()-0.5)*8); }
    renderFloor();
    renderFx();
    renderHeroHealth();
    renderHeroRage();
    renderBuffs();
    renderBossHealth();
    renderCoins();
    if(showMap) renderMap();
    if(shaking) floor.restore();
    // ---- level / quest system ----
    if(!gameWon && currentLevel<MAX_LEVEL-1 && bossDead &&
       Math.abs(hero.x-stairX)<s*0.95 && Math.abs(hero.y-stairY)<s*0.95){
        sfx('stairs'); loadLevel(currentLevel+1);
    }
    if(!gameWon && currentLevel===MAX_LEVEL-1 && monsters.length===0){ gameWon=true; gameState='victory'; sfx('levelup'); }
    renderQuest();
    if(hero.health<=0) dead=true;
}, 66);

function renderTitleScreen(){
    floor.save();
    floor.fillStyle="black"; floor.fillRect(0,0,floor.w,floor.h);
    floor.textAlign="center";
    floor.fillStyle="#c0392b";
    floor.font="bold 72px 'Poppins',sans-serif";
    floor.fillText(T('gameTitle'), floor.w/2, floor.h/2-80);
    floor.fillStyle="#ffd700";
    floor.font="bold 22px 'Poppins',sans-serif";
    floor.fillText(T('subtitle'), floor.w/2, floor.h/2-40);
    floor.fillStyle="#bbb";
    floor.font="15px 'Poppins',sans-serif";
    floor.fillText(T('tagline'), floor.w/2, floor.h/2-8);
    floor.fillStyle="#888";
    floor.font="13px 'Poppins',sans-serif";
    floor.fillText(T('helpDesktop'), floor.w/2, floor.h/2+30);
    floor.fillText(T('helpMobile'), floor.w/2, floor.h/2+52);
    if(Math.floor(performance.now()/500)%2===0){
        floor.fillStyle="#fff";
        floor.font="bold 20px 'Poppins',sans-serif";
        floor.fillText(T('begin'), floor.w/2, floor.h/2+100);
        floor.fillStyle="#666";
        floor.font="12px 'Poppins',sans-serif";
        floor.fillText(T('langHint'), floor.w/2, floor.h/2+128);
    }
    floor.textAlign="left";
    floor.restore();
}
function renderDialog(){
    floor.save();
    floor.fillStyle="rgba(0,0,0,0.78)";
    floor.fillRect(0,0,floor.w,floor.h);
    floor.textAlign="center";
    floor.fillStyle="#ffd700";
    floor.font="bold 32px 'Poppins',sans-serif";
    floor.fillText(T('level')+" "+(currentLevel+1)+"/3 - "+STORY[currentLevel].title[LANG], floor.w/2, floor.h/2-80);
    floor.fillStyle="#e8e6e3";
    floor.font="17px 'Poppins',sans-serif";
    var words=dialogText.split(' '), line='', lines=[], maxW=floor.w-200;
    for(var wi=0;wi<words.length;wi++){
        var test=line+words[wi]+' ';
        if(floor.measureText(test).width>maxW && line.length>0){ lines.push(line); line=words[wi]+' '; }
        else line=test;
    }
    lines.push(line);
    var startY=floor.h/2-30;
    for(var li=0;li<lines.length;li++){ floor.fillText(lines[li], floor.w/2, startY+li*26); }
    floor.fillStyle="#888";
    floor.font="13px 'Poppins',sans-serif";
    floor.fillText(T('storyOf')+" "+(dialogIdx+1)+"/"+STORY[currentLevel].lines[LANG].length+"  |  "+T('continue'), floor.w/2, floor.h/2+70);
    floor.textAlign="left";
    floor.restore();
}
function renderQuest(){
    // top quest bar
    floor.save();
    floor.fillStyle="rgba(0,0,0,0.62)";
    floor.fillRect(floor.w/2-300, 12, 600, 50);
    floor.strokeStyle="#ffd700"; floor.lineWidth=2; floor.strokeRect(floor.w/2-300, 12, 600, 50);
    floor.fillStyle="#fff";
    floor.font="bold 17px 'Poppins',sans-serif";
    floor.textAlign="center";
    floor.fillText(hero.name+" \u2014 "+questTitle, floor.w/2, 34);
    floor.fillStyle="#d9f7d9";
    floor.font="13px 'Poppins',sans-serif";
    floor.fillText(T('quest')+questGoal, floor.w/2, 52);
    floor.textAlign="left";
    floor.restore();
    // weapon + skills HUD
    var w=hero.getWeapon();
    var nowS=performance.now()/1000;
    function skLabel(sk){ var r=Math.max(0, Math.ceil(sk.cd-(nowS-sk.last))); return sk.name+(r>0?'['+r+'s]':''); }
    floor.save();
    floor.fillStyle="rgba(0,0,0,0.55)";
    floor.fillRect(floor.w/2-300, 66, 600, 26);
    floor.fillStyle="#fff";
    floor.font="13px 'Poppins',sans-serif";
    floor.textAlign="center";
    floor.fillText(T('wpn')+w.name+"   ·   Q "+skLabel(hero.skills[0])+"   ·   W "+skLabel(hero.skills[1])+"   ·   E "+skLabel(hero.skills[2]), floor.w/2, 84);
    floor.textAlign="left";
    floor.restore();
    if(currentLevel<MAX_LEVEL-1 && !bossDead){
        floor.save();
        floor.fillStyle="#ff3b30";
        floor.font="bold 14px 'Poppins',sans-serif";
        floor.textAlign="center";
        floor.fillText(T('bossHint'), floor.w/2, 108);
        floor.textAlign="left";
        floor.restore();
    }
    // victory overlay
    if(gameState==='victory'){
        floor.save();
        floor.fillStyle="rgba(0,0,0,0.85)";
        floor.fillRect(0,0,floor.w,floor.h);
        floor.textAlign="center";
        floor.fillStyle="#ffd700";
        floor.font="bold 52px 'Poppins',sans-serif";
        floor.fillText(T('victory'), floor.w/2, floor.h/2-100);
        floor.fillStyle="#e8e6e3";
        floor.font="17px 'Poppins',sans-serif";
        floor.fillText(T('victoryText'), floor.w/2, floor.h/2-60);
        var elapsed=Math.round(performance.now()/1000-gameStartTime);
        var mm=Math.floor(elapsed/60), ss=elapsed%60;
        floor.fillStyle="#ffd700";
        floor.font="bold 20px 'Poppins',sans-serif";
        floor.fillText(T("kills")+": "+kills+"  |  "+T("level")+": "+hero.heroLevel+"  |  "+T("time")+": "+mm+"m"+ss+"s  |  Gold: "+hero.coins, floor.w/2, floor.h/2-10);
        floor.fillStyle="#aaa";
        floor.font="14px 'Poppins',sans-serif";
        floor.fillText(T('shareHint'), floor.w/2, floor.h/2+30);
        floor.textAlign="left";
        floor.restore();
    }
}
function renderCoins(){
    floor.save();
    floor.fillStyle="rgba(0,0,0,0.55)";
    floor.fillRect(18, floor.h-64, 170, 44);
    floor.fillStyle="#ffd700";
    floor.font="bold 20px 'Poppins',sans-serif";
    floor.fillText("Gold: "+hero.coins, 34, floor.h-34);
    floor.restore();
}

function renderHeroHealth(){
    var radius=80, padding=20;
    floor.save();
    floor.globalAlpha=0.4;
    // draw health colb
    floor.fillStyle="black";
    floor.beginPath();
    floor.arc(radius+padding, floor.h-radius-padding, radius+4, 0, Math.PI*2);
    floor.closePath();
    floor.fill();
    // draw health
    floor.fillStyle="red";        
    var percent = hero.health / hero.origin_health;
    var angleFrom = Math.PI*(0.5-percent);
    var angleTo   = Math.PI*(0.5+percent);
    floor.beginPath();
    floor.arc(radius+padding, floor.h-radius-padding, radius, angleFrom, angleTo);
    floor.closePath();
    floor.fill();
    floor.restore();
}

function renderHeroRage(){
    if(hero.rage<=0) return;
    var radius=80, padding=20;
    var pct=hero.rage/RAGE.max;
    var decaying=performance.now()-hero.lastCombatAt>RAGE.decayDelay;
    floor.save();
    floor.globalAlpha=decaying ? 0.5+0.3*Math.sin(performance.now()/120) : 0.9;
    floor.strokeStyle="#e74c3c";
    floor.lineWidth=7;
    floor.beginPath();
    floor.arc(radius+padding, floor.h-radius-padding, radius+11, -Math.PI/2, -Math.PI/2+Math.PI*2*pct, false);
    floor.stroke();
    floor.restore();
}

function renderBossHealth(){
    var b=null;
    for(var i in monsters){ if(monsters[i].isBoss){ b=monsters[i]; break; } }
    if(!b || !b.isAboveHero()) return;
    var w=Math.min(420, floor.w*0.5), x=(floor.w-w)/2, y=14;
    floor.save();
    floor.globalAlpha=0.75;
    floor.fillStyle="black";
    floor.fillRect(x-2,y-2,w+4,18);
    floor.fillStyle="#8e2b2b";
    floor.fillRect(x,y,w*b.health/b.origin_health,14);
    floor.globalAlpha=0.9;
    floor.fillStyle="#fff";
    floor.font="bold 11px Arial";
    floor.textAlign="center";
    floor.fillText(b.name||'BOSS', floor.w/2, y+11);
    floor.restore();
}

function loadZb(order,click){
    var tmp_zb=[], zb=[];
    var all=[monsters,potions,drops,barrels,click?[]:[hero],click?[]:walls];
    for(var t in all) 
        for(var m in all[t]) 
            if(all[t][m].isAboveHero()) 
                tmp_zb.push(all[t][m]);
    // asc sort
    tmp_zb.sort(function(a,b){ var c=(b.x+b.offset_x)+(b.y+b.offset_y)-(a.x+a.offset_x)-(a.y+a.offset_y); return order?c:0-c});
    var all=[coins,deathmobs,tmp_zb];
    for(var i in all) for(var j in all[i]) zb.push(all[i][j]);
    return zb;
}

function processClick(){
    var zb=loadZb(true,true);
    var cx=(floor.click_x - floor.click_y)*acos,
        cy=(floor.click_x + floor.click_y)/2*asin;
    for(var i in zb){
        var m=zb[i]; 
        var spr=m.sprite;
        var sx=(m.x - m.y)*acos+m.offset_x,
            sy=(m.x + m.y)/2*asin+m.offset_y;
        
        var spr_w = spr.angles ? spr.width/spr.angles : spr.width;
        var spr_h = spr.steps ? spr.height/spr.steps : spr.height;
        if( cx >= sx-spr_w/2 && cx <= sx+spr_w/2 && cy >= sy-spr_h && cy <= sy){
            m.use(hero)
            return true;
        }
    }
    return false;
}

var _tintCache=[];
function getTinted(img,color){
    for(var i=0;i<_tintCache.length;i++) if(_tintCache[i].img===img && _tintCache[i].color===color) return _tintCache[i].t;
    var c=document.createElement('canvas');
    c.width=img.width; c.height=img.height;
    var g=c.getContext('2d');
    g.drawImage(img,0,0);
    g.globalCompositeOperation='source-atop';
    g.globalAlpha=0.22;
    g.fillStyle=color;
    g.fillRect(0,0,c.width,c.height);
    g.globalAlpha=1; g.globalCompositeOperation='source-over';
    if(img.steps) c.steps=img.steps;
    if(img.angles) c.angles=img.angles;
    if(img.offsetX) c.offsetX=img.offsetX;
    _tintCache.push({img:img,color:color,t:c});
    return c;
}
function drawHeroWeapon(g, hero, cx, cy){
    g.save();
    g.translate(cx, cy);
    g.lineWidth=3; g.lineCap='round'; g.lineJoin='round';
    // war axe: handle + blade
    g.strokeStyle='#8a8a8a'; g.beginPath(); g.moveTo(-10,11); g.lineTo(9,-7); g.stroke();
    g.fillStyle='#c0392b'; g.beginPath(); g.moveTo(9,-7); g.lineTo(20,-3); g.lineTo(15,6); g.closePath(); g.fill();
    g.strokeStyle='#7f8c8d'; g.beginPath(); g.moveTo(9,-7); g.lineTo(15,6); g.stroke();
    g.restore();
}
function renderObjects(){
    var zb=loadZb(false);
    for(z in zb){
        var m=zb[z];
        floor.save()
        var sx=(m.x - m.y)*acos+m.offset_x,
            sy=(m.x + m.y)/2*asin+m.offset_y;
        var tile=m.sprite;
        var _tc=null;
        if(m.isHero && hero.tint) _tc=hero.tint;
        else if(m.tint) _tc=m.tint;
        if(_tc) tile=getTinted(tile, _tc);
        // render sprite (scale support for bosses)
        var tw = tile.width;
        var th = tile.height;
        var msc = m.scale||1;
        if(tile.steps && tile.angles){
            tw/=tile.steps;
            th/=tile.angles;
            var _ang=(tile.angles>1)?(m.angle%tile.angles):0;
            floor.drawImage(tile,
                tw*m.step, th*_ang, tw, th,
                Math.round(sx-tw*msc/2-tile.offsetX), Math.round(sy-th*msc), Math.round(tw*msc), Math.round(th*msc));
        }else{
            floor.drawImage(tile, Math.round(sx-tile.width/2)+1, Math.round(sy-tile.height)+1);
        }
        floor.restore()
        // stairs portal glow
        if(typeof WallObject!=='undefined' && m instanceof WallObject && m.tile===1524){
            var pulse=0.45+0.3*Math.sin(Date.now()/180);
            floor.save();
            floor.globalAlpha=pulse;
            floor.fillStyle="#39ff14";
            floor.beginPath();
            floor.arc(sx, sy-70, 30, 0, Math.PI*2);
            floor.fill();
            floor.globalAlpha=0.9;
            floor.strokeStyle="#fff";
            floor.lineWidth=3;
            floor.stroke();
            floor.restore();
        }
        // health line
        if(m.health && m.origin_health && m != hero){
            floor.save()
            floor.globalAlpha=0.7
            sy-=90;
            var lm=Math.floor(m.origin_health/20),
                lr=Math.floor(m.health/20)
            floor.fillStyle="black"
            floor.fillRect(sx-lm/2-1, sy, lm+2, 6);
            floor.fillStyle="red"
            floor.fillRect(sx-lm/2, sy+1, lr, 4);
            floor.restore()
        }
        // boss indicator
        if(m.isBoss){
            floor.save();
            floor.globalAlpha=0.75;
            floor.strokeStyle="#ff3b30"; floor.lineWidth=3;
            floor.beginPath(); floor.arc(sx, sy-70, 50, 0, Math.PI*2); floor.stroke();
            floor.font="bold 16px 'Poppins',sans-serif";
            floor.textAlign="center";
            floor.fillStyle="#ff3b30"; floor.fillText("☠ BOSS", sx, sy-150);
            floor.textAlign="left";
            var bw=150; var bh=10;
            floor.fillStyle="#111"; floor.fillRect(sx-bw/2-1, sy-142, bw+2, bh+2);
            floor.fillStyle="#ff3b30"; floor.fillRect(sx-bw/2, sy-141, bw*Math.max(0,m.health/m.origin_health), bh);
            floor.restore();
        }
    }
    // projectiles
    for(var pi=0; pi<projectiles.length; pi++){
        var p=projectiles[pi];
        var psx=(p.x - p.y)*acos, psy=(p.x + p.y)/2*asin;
        floor.save();
        var pcol = p.type==='ice' ? '#66ccff' : p.type==='bolt' ? '#b06dff' : p.type==='arrow' ? '#d8c878' : '#ff8833';
        var pcol2= p.type==='ice' ? '#e0f7ff' : p.type==='bolt' ? '#ffffff' : p.type==='arrow' ? '#f5edc8' : '#ffff77';
        floor.fillStyle=pcol; floor.beginPath(); floor.arc(psx, psy, p.r, 0, Math.PI*2); floor.fill();
        floor.fillStyle=pcol2; floor.beginPath(); floor.arc(psx, psy, p.r*0.5, 0, Math.PI*2); floor.fill();
        floor.restore();
    }
}

function renderFloor() {
    floor.save();
    floor.translate(floor.w/2-th, floor.h/2);// translate to center
    var fdx=Math.floor(hero.x/s), // hero tile
        fdy=Math.floor(hero.y/s),
        miny=Math.max(0, fdy-visible), // calculate camera visible tiles
        maxy=Math.min(level.floor.map.length-1,fdy+visible),
        minx=Math.max(0, fdx-visible),
        maxx=Math.min(level.floor.map[0].length-1,fdx+visible);
    // translate to hero
    var mrx=hero.x * acos - hero.y * asin,
        mry=hero.x * asin + hero.y * acos;
        mry=mry/2;
    floor.translate(-mrx, -mry);
    // render
    for(var y=miny;y<=maxy;y++){
        for(var x=minx;x<=maxx;x++){
            var tile= getFloorTile(x, y);
            if(tile){
                var tx=( x - y ) * th,
                    ty=( x + y ) * th/2;
                floor.drawImage(tile, tx, ty, tile.width+0.707, tile.height+0.707);
            }
        }
    }
    floor.translate(th, 0); // retranslate for diamond textures
    renderObjects();
    floor.restore();
}

function renderMap() {
    floor.save();
    floor.translate(floor.w/2, floor.h/2);
    var sc=0.5;
    floor.scale(1*sc,0.5*sc);
    floor.rotate(Math.PI*0.25);
    floor.translate(-hero.x, -hero.y);
    floor.fillStyle="rgba(0,0,0,0.5)";
    var wallOffset=[];
    for(var y=4;y>=0;y--) for(var x=0;x<=4;x++) wallOffset.push({x:x*s/5, y:y*s/5});
    for(var i in walls){
        var v=walls[i], walk=v.header.walk;
        if(v.header.orientation==4)continue;
        for(var j=0;j<25;j++) if(walk[j]==1) floor.fillRect(v.x+wallOffset[j].x, v.y+wallOffset[j].y, s/5, s/5);
    }
    floor.fillRect(hero.x, hero.y, s/5, s/5);
    floor.restore();
}

function remove(ar,v){var i=ar.indexOf(v);if(i>=0)ar.splice(i,1);}
function randomx(){return s*(2+Math.floor(Math.random()*(level.floor.map[0].length-4)));}
function randomy(){return s*(2+Math.floor(Math.random()*(level.floor.map.length-4)));}

function Shape(sprite,x,y){
    this.x=x;
    this.y=y;
    this.offset_x=0;
    this.offset_y=0;
    this.sprite=sprite;
    this.isAboveHero=function(){
        var maxlen=tw*visible/2;
        return (Math.abs(this.x-hero.x)<=maxlen) && (Math.abs(this.y-hero.y)<=maxlen);
    };
}

function BaseWall(sprite,header,x,y){
    Shape.call(this,sprite,x,y);
    this.header=header;
    this.isAboveHero=function(){return true;}
    this.offset_x-=14;
    this.offset_y+=82;
}

function Wall(index,x,y){
    BaseWall.call(this,level.wall.tiles[index],level.wall.header[index],x,y);
    switch(this.header.orientation){
        case 2:
            this.offset_x+=16;
            break;
        case 6:
            this.offset_x+=16;
            break;
        case 5:
            this.offset_x-=16;
            break;
        case 3:
            for(var inx in level.wall.header){
                var h = level.wall.header[inx];
                if(h.orientation==4 && h.main_index==this.header.main_index && h.sub_index==this.header.sub_index){
                    walls.push(new Wall(inx, x, y))
                    break;
                }
            }
            this.offset_x+=16;
            break;
        case 4:
            this.offset_x-=16;
            break;
    }
}

function WallObject(index,x,y){
    BaseWall.call(this,level.object.tiles[index],level.object.header[index],x,y);
    this.offset_x+=16;
    var self=this;
    load(this.sprite, function(){
        if(self.sprite.width<160){
            self.offset_x-=(160-self.sprite.width)/2
        }
    })
    
}

function DeathMob(mob){
    Shape.call(this,mob.death,mob.x,mob.y);
    this.step=0;
    this.angle=mob.angle;
    this.used=false;
    this.use=function(mob){
        if(!this.used && Math.random()>0.5) coins.push(new Coin(this.x+50, this.y+50));
        if(!this.used && Math.random()>0.5) potions.push(new PotionHealth(this.x+50, this.y));
        this.used=true;
    }
}

function Barrel(x, y){
    Shape.call(this,barrelSprite,x,y);
    this.use=function(mob){
        if(mob.doAttack) mob.doAttack(this);
    };
    this.damage=function(damage){
        remove(barrels,this);
        if(Math.random()>0.7) coins.push(new Coin(this.x, this.y));
    };
}

function Coin(x,y){
    Shape.call(this,coinSprite,x,y);
    this.coins=5+Math.floor(Math.random()*26);
    this.use=function(mob){
        remove(coins,this);
        mob.coins+=this.coins;
        sfx('coin');
    }
}

function Potion(x,y){
    Shape.call(this,potionSprite,x,y);
    this.sprite.steps=6;
    this.sprite.angles=4;
    this.use=function(mob){
        if(mob.health >= mob.origin_health) return; // full HP: leave it on the ground
        this.drink(mob); sfx('potion'); remove(potions,this);
    }
}

function PotionHealth(x,y){
    Potion.call(this,x,y);
    this.step=0;
    this.angle=0;
    this.health=1000;
    this.tint='#e74c3c';
    this.drink=function(mob){
        mob.health=Math.min(mob.origin_health, mob.health+this.health);
        sfx('drink');
    }
}

function Mob(x,y,name){
    this.to_x=x;this.to_y=y;
    this.name=name;
    this.stay=monsterMap[name].NU
    this.run=monsterMap[name].WL
    this.death=monsterMap[name].DD
    this.currentState=this.stay;
    this.step=0;
    this.angle=0;
    this.st=8;
    this.slow=0;
    Shape.call(this, this.currentState, x, y);
    this.rotate = function(sx,sy){
        var l=this.currentState.angles;
        this.angle=Math.round((Math.atan2(sy, sx)/Math.PI+2.75)*l/2+l/2)%l
    }
    this.rotateTo = function(point){
        this.rotate(point.x-this.x,point.y-this.y);
    }
    this.setState=function(state){
        if(this.currentState!=state){
            this.currentState=state;
            this.step=-1;
        }
    }
    this.nextStep=function(){
        var dx=(this.to_x - this.x),
            dy=(this.to_y - this.y);
        var eSt=(this.slow>0)?this.st*2:this.st;
        var dist=Math.sqrt((dx*dx)+(dy*dy));
        if(dist>eSt){ // run
            var len=dist||1;
            var tx=0, ty=0;
            for(var st=0.01; st<=eSt; st+=0.01){
                var sx=st*dx/len, sy=st*dy/len; // normalized dir, dx=0 safe (no NaN)
                if(isWayWall(this.x+sx,this.y+sy)){tx=sx;ty=sy;}
                else break;
            }
            var walked=Math.sqrt(tx*tx+ty*ty);
            if(walked>0 && walked<eSt){
                // hit a wall mid-step: use remaining distance to slide along x/y, rounds corners
                var rem=eSt-walked, bx=this.x+tx, by=this.y+ty;
                var sx2=dx>0?rem:(dx<0?-rem:rem), sy2=dy>0?rem:(dy<0?-rem:-rem);
                if(isWayWall(bx+sx2, by)){ tx+=sx2; }
                else if(isWayWall(bx, by+sy2)){ ty+=sy2; }
            }
            else if(walked===0){
                // blocked on first step: try pure x or pure y
                var _sx=(dx>0?1:-1)*Math.min(eSt,Math.abs(dx));
                var _sy=(dy>0?1:-1)*Math.min(eSt,Math.abs(dy));
                if(_sx!==0 && isWayWall(this.x+_sx, this.y)){ tx=_sx; ty=0; }
                else if(_sy!==0 && isWayWall(this.x, this.y+_sy)){ tx=0; ty=_sy; }
            }
            this.rotate(tx, ty);
            var moved=Math.sqrt(tx*tx+ty*ty);
            if(moved>=eSt/2){
                this.x+=tx;
                this.y+=ty;
                this.setState(this.run);
            }
            else{ this.setState(this.stay); this.x+=tx;this.y+=ty; }
        } else{ this.setState(this.stay); }
        this.step=(this.step+1)%(this.currentState.steps);
        this.sprite=this.currentState;
    }
    this.origin_health=this.health=400;
    this.resistance=10; // damage resistance, less than 1000
    this.use = function(mob){
        if(mob.doAttack){ sfx('attack'); mob.doAttack(this); }
    };
    this.damage=function(damage){
        var dmgIn=damage * 1000/(1000-this.resistance);
        if(this.isHero && this.shieldTimer>0) dmgIn*=0.2; // shield orb: 80% damage reduction
        var health=this.health - dmgIn;
        if(this.isHero){
            if(health>0) this.gainRage(RAGE.hurtGain);
            Fx.shake=0.15;
            if(navigator.vibrate) navigator.vibrate(40);
            spawnDamageText(this.x,this.y,Math.round(dmgIn),'#ff5050');
            spawnParticles(this.x,this.y,'#ff8080',0,0);
        }else{
            this.flashUntil=performance.now()+90;
            if(!this.isBoss) this.staggerUntil=performance.now()+250; // hit stagger (bosses immune)
            // DNF-style combo: every hero hit counts, resets after 3s without hitting
            combo++; comboTimer=3; comboPop=1; if(combo>comboBest) comboBest=combo;
            if(combo%10===0) sfx('levelup'); // milestone jingle every 10 hits
            spawnDamageText(this.x,this.y,Math.round(damage*1000/(1000-this.resistance)),'#ffd76e');
            spawnParticles(this.x,this.y,'#ffd76e',this.x-hero.x,this.y-hero.y);
            // knockback 10px away from hero (never through walls, never on killing blow)
            if(health>0){
                var kx=this.x-hero.x, ky=this.y-hero.y, kl=Math.sqrt(kx*kx+ky*ky)||1;
                var nx2=this.x+kx/kl*10, ny2=this.y+ky/kl*10;
                if(isWayWall(nx2,ny2)){ this.x=nx2; this.y=ny2; }
            }
        }
        if(health<=0){
            this.health=0;
            if(this instanceof HeroBarbarian){ if(!deathSfxPlayed){ sfx('death'); deathSfxPlayed=true; } }
            else {
                sfx('monsterDie');
                if(navigator.vibrate) navigator.vibrate(60);
                kills++;
                if(!this.isBoss){ hero.health=Math.min(hero.origin_health, hero.health+30); hero.xp+=25; }
                else{ hero.xp+=100; }
                while(hero.xp>=hero.xpNext){
                    hero.xp-=hero.xpNext; hero.heroLevel++; hero.xpNext=Math.round(hero.xpNext*1.5);
                    hero.origin_health+=200; hero.health=hero.origin_health;
                    hero.damageMult=(hero.damageMult||1)*1.1;
                    sfx('levelup');
                }
                // drop loot: single-roll table, 70% chance of something (varied, tinted)
                if(!this.isBoss){
                    if(Math.random()<0.5) coins.push(new Coin(this.x,this.y));
                    var r=Math.random();
                    if(r<0.22) potions.push(new PotionHealth(this.x,this.y));
                    else if(r<0.28) drops.push(new BigPotion(this.x,this.y));
                    else if(r<0.34) drops.push(new PowerPotion(this.x,this.y));
                    else if(r<0.40) drops.push(new HastePotion(this.x,this.y));
                    else if(r<0.48) drops.push(new Gem(this.x,this.y));
                    else if(r<0.53) drops.push(new GoldBag(this.x,this.y));
                    else if(r<0.58) drops.push(new Whetstone(this.x,this.y));
                    else if(r<0.61) drops.push(new ShieldOrb(this.x,this.y));
                    else if(r<0.64) drops.push(new Ruby(this.x,this.y));
                    else if(r<0.67) drops.push(new HealthUp(this.x,this.y));
                    else if(r<0.70) drops.push(new DamageUp(this.x,this.y));
                }else{
                    coins.push(new Coin(this.x,this.y)); coins.push(new Coin(this.x,this.y));
                    for(var bi=0;bi<2;bi++) potions.push(new PotionHealth(this.x,this.y));
                    drops.push(new BigPotion(this.x,this.y));
                    drops.push(new GoldBag(this.x+30,this.y));
                    drops.push(new Ruby(this.x-30,this.y));
                    if(Math.random()<0.5) drops.push(new Whetstone(this.x,this.y+30)); else drops.push(new ShieldOrb(this.x,this.y+30));
                    bossDead=true;
                    sfx('bossdie');
                }
            }
            remove(monsters,this);
            if(this.death) deathmobs.push(new DeathMob(this));
        }else{
            this.health=health;
        }
    }
}

function AgressiveMob(x,y,name){
    Mob.call(this,x,y,name);
    this.attack=monsterMap[name].A1
    this.attackOffset=monsterMap[name].attackOffset||0;
    this.normalOffset=0;
    var _MS={SK:{hp:320,dmg:16,rng:0,spd:9},FS:{hp:200,dmg:20,rng:300,spd:6},SI:{hp:280,dmg:18,rng:260,spd:7},BA:{hp:2000,dmg:180,rng:0,spd:16}};
    var _m=_MS[name]||{hp:400,dmg:25,rng:0,spd:8};
    this.origin_health=this.health=_m.hp; this.currentDamage=_m.dmg; this.attackRange=_m.rng; this.st=_m.spd;
    this._nextStep=this.nextStep;
    this.nextStep=function(){
        if(!this.isAboveHero())return;
        if(this.staggerUntil && performance.now()<this.staggerUntil){ // hit stagger: stunned
            this.attacked=null;
            this.setState(this.stay);
            this.sprite=this.currentState;
            this.offset_y=this.normalOffset;
            return;
        }
        if(this.currentState == this.attack){
            if(this.step==(this.attack.steps-1)){
                this.currentState=this.stay;
                this.step=-1;
                if(this.attacked){
                    if(this.attacked instanceof HeroBarbarian) sfx('heroHurt'); else sfx('hit');
                    this.attacked.damage(this.getDamage());
                    this.attacked=null;
                }
            }
            this.step=(this.step+1)%(this.currentState.steps);
            this.sprite=this.currentState;
        }else this._nextStep();
        this.offset_y=this.currentState==this.attack?this.attackOffset:this.normalOffset;
    }
    this.currentDamage=Math.round(this.currentDamage*(1+currentLevel*0.25));
    this.getDamage=function(){
        return this.currentDamage;
    }
    this.attacked=null;
    this.doAttack=function(mob){
        if(this.attacked!=mob){
            this.rotateTo(mob);
            this.setState(this.attack);
            this.attacked=mob;            
        }
    }
}

var projectiles=[], drops=[], bossDead=false;
// DNF-style combo counter
var combo=0, comboTimer=0, comboPop=0, comboBest=0;

function fireProjectile(shooter, target, dmg, type){
    var ang=Math.atan2(target.y-shooter.y, target.x-shooter.x);
    var spd=380;
    projectiles.push({x:shooter.x, y:shooter.y, dx:Math.cos(ang)*spd, dy:Math.sin(ang)*spd, dmg:dmg, life:1.0, r:(type==='arrow'?8:12), type:type||'fire', owner:shooter});
    sfx('fire');
}
function explodeProjectile(i,p){
    projectiles.splice(i,1);
    sfx('hit');
}
function updateProjectiles(dt){
    for(var i=projectiles.length-1;i>=0;i--){
        var p=projectiles[i];
        p.life-=dt;
        if(p.life<=0){ explodeProjectile(i,p); continue; }
        var nx=p.x+p.dx*dt, ny=p.y+p.dy*dt;
        if(!isWayWall(nx,ny)){ explodeProjectile(i,p); continue; }
        p.x=nx; p.y=ny;
        var hit=false;
        if(p.owner===hero){ // hero projectile: hits monsters
            for(var j in monsters){
                var m=monsters[j];
                if(Math.abs(m.x-p.x)<s*0.6 && Math.abs(m.y-p.y)<s*0.6){ hit=true; m.damage(p.dmg); break; }
            }
            if(hit){
                if(p.type==='ice'){ var tm=monsters[j]; if(tm) tm.slow=1.5; }
                explodeProjectile(i,p);
            }
        }else if(!dead && Math.abs(hero.x-p.x)<s*0.6 && Math.abs(hero.y-p.y)<s*0.6){ // monster projectile: hits hero
            hero.damage(p.dmg); sfx('heroHurt');
            explodeProjectile(i,p);
        }
    }
}
// ===== combat feedback (damage numbers, particles, hit flash, screen shake) =====
var Fx={parts:[], texts:[], shake:0};
function spawnParticles(x,y,color,dx,dy){
    for(var i=0;i<5;i++){
        if(Fx.parts.length>=40) Fx.parts.shift();
        var a=(dx===0&&dy===0)?Math.random()*Math.PI*2:Math.atan2(dy,dx)+(Math.random()-0.5)*1.6;
        var sp=60+Math.random()*120;
        Fx.parts.push({x:x,y:y,dx:Math.cos(a)*sp,dy:Math.sin(a)*sp,life:0.25+Math.random()*0.25,color:color});
    }
}
function spawnDamageText(x,y,txt,color){
    if(Fx.texts.length>=20) Fx.texts.shift();
    Fx.texts.push({x:x+(Math.random()-0.5)*20,y:y,txt:txt,color:color,life:0.7});
}
function updateFx(dt){
    for(var i=Fx.parts.length-1;i>=0;i--){ var p=Fx.parts[i]; p.life-=dt; p.x+=p.dx*dt; p.y+=p.dy*dt; if(p.life<=0) Fx.parts.splice(i,1); }
    for(var j=Fx.texts.length-1;j>=0;j--){ var t=Fx.texts[j]; t.life-=dt; t.y-=40*dt; if(t.life<=0) Fx.texts.splice(j,1); }
}
function renderFx(){
    var i, m;
    // boss telegraph circles (rendered under particles)
    for(i in monsters){ m=monsters[i];
        if(m.castUntil && performance.now()/1000<m.castUntil){
            var tr=m.bossType.skill==='whirlwind'?s*2.5:(m.bossType.skill==='firerain'?s*2.4:s*1.8);
            var prog=1-(m.castUntil-performance.now()/1000)/0.8;
            floor.globalAlpha=0.18+0.25*prog;
            floor.fillStyle="red";
            floor.beginPath();
            floor.arc((m.castCx-m.castCy)*acos, (m.castCx+m.castCy)/2*asin, tr, 0, Math.PI*2);
            floor.fill();
            floor.globalAlpha=1;
        }
    }
    for(i=0;i<Fx.parts.length;i++){ var p=Fx.parts[i];
        floor.globalAlpha=Math.max(0,Math.min(1,p.life*3));
        floor.fillStyle=p.color;
        floor.fillRect((p.x-p.y)*acos-2, (p.x+p.y)/2*asin-2, 4, 4);
    }
    floor.textAlign="center";
    for(i=0;i<Fx.texts.length;i++){ var t=Fx.texts[i];
        floor.globalAlpha=Math.max(0,Math.min(1,t.life*2.5));
        floor.font="bold 18px 'Arial Black',Arial";
        floor.lineWidth=3; floor.strokeStyle="rgba(0,0,0,.75)";
        floor.strokeText(t.txt, (t.x-t.y)*acos, (t.x+t.y)/2*asin-30);
        floor.fillStyle=t.color;
        floor.fillText(t.txt, (t.x-t.y)*acos, (t.x+t.y)/2*asin-30);
    }
    floor.globalAlpha=1;
    for(i in monsters){ m=monsters[i];
        if(m.flashUntil && performance.now()<m.flashUntil && m.isAboveHero()){
            floor.globalAlpha=0.4;
            floor.fillStyle="white";
            floor.beginPath();
            floor.arc((m.x-m.y)*acos, (m.x+m.y)/2*asin-30, 22, 0, Math.PI*2);
            floor.fill();
            floor.globalAlpha=1;
        }
    }
    // DNF-style combo counter (screen space, right side)
    if(combo>=2){
        var cw=floor.canvas.width, ch=floor.canvas.height;
        var pop=1+comboPop*0.35; // bounce on every hit
        var fs=Math.min(64, 22+combo*0.9);
        floor.save();
        floor.translate(cw-Math.max(90,cw*0.12), ch*0.38);
        floor.scale(pop,pop);
        floor.globalAlpha=comboTimer<1?comboTimer:1; // fade out before reset
        floor.textAlign="center";
        floor.font="bold "+fs+"px 'Arial Black',Arial";
        floor.lineWidth=5; floor.strokeStyle="rgba(60,20,0,.9)";
        floor.strokeText(combo, 0, 0);
        var cg=floor.createLinearGradient(0,-fs,0,10);
        cg.addColorStop(0,"#fff3b0"); cg.addColorStop(0.5,"#ffb347"); cg.addColorStop(1,"#ff6a00");
        floor.fillStyle=cg;
        floor.fillText(combo, 0, 0);
        floor.font="bold 16px Arial";
        floor.lineWidth=3;
        floor.strokeText("COMBO", 0, 22);
        floor.fillStyle="#ffe9c9";
        floor.fillText("COMBO", 0, 22);
        floor.restore();
        floor.globalAlpha=1;
    }
}
function nearestMonster(){
    var best=null, bd=1e9;
    for(var i in monsters){
        var m=monsters[i];
        if(!m.isAboveHero()) continue;
        var d=Math.abs(m.x-hero.x)+Math.abs(m.y-hero.y);
        if(d<bd){ bd=d; best=m; }
    }
    return best;
}
function castSkill(i){
    var sk=hero.skills[i];
    var now=performance.now()/1000;
    if(now-sk.last < sk.cd) return false;
    if(i===0){
        var t=nearestMonster();
        if(!t) return false;
        if(hero.rage<RAGE.fireballCost){ sfx('error'); return false; }
        sk.last=now;
        hero.rage-=RAGE.fireballCost; hero.lastCombatAt=performance.now();
        fireProjectile(hero, t, Math.round(hero.getDamage()*(hero.getWeapon().fireballMul||1)));
        sfx('fire');
        return true;
    }
    if(i===1){
        sk.last=now;
        var dx=hero.to_x-hero.x, dy=hero.to_y-hero.y;
        var len=Math.sqrt(dx*dx+dy*dy)||1;
        var nx=hero.x+dx/len*2.5*s, ny=hero.y+dy/len*2.5*s;
        var ox=hero.x, oy=hero.y;
        for(var st=0; st<2.5*s; st+=4){ var tx=hero.x+dx/len*st, ty=hero.y+dy/len*st; if(!isWayWall(tx,ty)){ nx=tx-dx/len*4; ny=ty-dy/len*4; break; } }
        for(var di in monsters){
            var dm=monsters[di];
            if(dm.isAboveHero()){
                var ddx=dm.x-ox, ddy=dm.y-oy, dlen=Math.sqrt(ddx*ddx+ddy*ddy)||1;
                var proj=ddx*(dx/len)+ddy*(dy/len);
                if(proj>0 && proj<2.5*s && Math.abs(ddx*(dy/len)-ddy*(dx/len))<s*0.8){ dm.damage(250); hero.gainRage(RAGE.dashGain); }
            }
        }
        hero.x=nx; hero.y=ny; hero.to_x=nx; hero.to_y=ny;
        sfx('dash');
        return true;
    }
    if(i===2){
        if(hero.rage<RAGE.shoutCost){ sfx('error'); return false; }
        sk.last=now;
        hero.rage-=RAGE.shoutCost; hero.lastCombatAt=performance.now();
        var cried=false;
        for(var ci in monsters){
            var cm=monsters[ci];
            if(cm.isAboveHero() && Math.abs(cm.x-hero.x)<s*3.5 && Math.abs(cm.y-hero.y)<s*3.5){ cm.damage(120); cm.slow=2.5; cried=true; }
        }
        hero.powerTimer=6;
        hero.health=Math.min(hero.origin_health, hero.health+200);
        sfx(cried?'hit':'drink');
        return true;
    }
    if(sk.name==='MultiShot'){
        var t0=nearestMonster(); if(!t0) return false;
        sk.last=now;
        var base=Math.atan2(t0.y-hero.y, t0.x-hero.x);
        for(var oa=-0.25; oa<=0.25; oa+=0.25){
            var spd=380;
            projectiles.push({x:hero.x,y:hero.y,dx:Math.cos(base+oa)*spd,dy:Math.sin(base+oa)*spd,dmg:hero.getDamage(),life:0.9,r:8,type:'arrow',owner:hero});
        }
        sfx('fire'); return true;
    }
    if(sk.name==='FrostNova'){
        sk.last=now;
        var done=false;
        for(var i in monsters){ var m=monsters[i];
            if(m.isAboveHero() && Math.abs(m.x-hero.x)<s*3.5 && Math.abs(m.y-hero.y)<s*3.5){ m.damage(90); m.slow=2; done=true; }
        }
        if(done) sfx('hit'); return done;
    }
    if(sk.name==='Teleport'){
        sk.last=now;
        var tdx=hero.to_x-hero.x, tdy=hero.to_y-hero.y;
        var tl=Math.sqrt(tdx*tdx+tdy*tdy)||1;
        var nx=hero.x+tdx/tl*4*s, ny=hero.y+tdy/tl*4*s;
        for(var stp=0; stp<4*s; stp+=4){ var tx2=hero.x+tdx/tl*stp, ty2=hero.y+tdy/tl*stp; if(!isWayWall(tx2,ty2)){ nx=tx2-tdx/tl*4; ny=ty2-tdy/tl*4; break; } }
        hero.x=nx; hero.y=ny; hero.to_x=nx; hero.to_y=ny;
        sfx('dash'); return true;
    }
    return false;
}
function PowerPotion(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#e67e22';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.powerTimer=20; sfx('potion'); } };
}
function HastePotion(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#3498db';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.hasteTimer=10; sfx('potion'); } };
}
function Gem(x,y){
    Shape.call(this, coinSprite, x, y);
    this.used=false; this.tint='#9b59b6';
    this.coins=60+Math.floor(Math.random()*61);
    this.use=function(mob){ if(!this.used){ this.used=true; mob.coins+=this.coins; sfx('coin'); } };
}
function HealthUp(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#2ecc71';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.origin_health+=150; mob.health=Math.min(mob.health+150, mob.origin_health); sfx('potion'); } };
}
function DamageUp(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#f1c40f';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.damageMult=(mob.damageMult||1)*1.08; sfx('potion'); } };
}
// ---- richer loot: big heal, gold bags, rubies, whetstone (temp attack up), shield orb ----
function BigPotion(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#ff2d55';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.health=Math.min(mob.health+Math.round(mob.origin_health*0.6), mob.origin_health); sfx('potion'); } };
}
function GoldBag(x,y){
    Shape.call(this, coinSprite, x, y);
    this.used=false; this.tint='#ffd700';
    this.coins=150+Math.floor(Math.random()*101);
    this.use=function(mob){ if(!this.used){ this.used=true; mob.coins+=this.coins; sfx('coin'); } };
}
function Ruby(x,y){
    Shape.call(this, coinSprite, x, y);
    this.used=false; this.tint='#ff4757';
    this.coins=280+Math.floor(Math.random()*121);
    this.use=function(mob){ if(!this.used){ this.used=true; mob.coins+=this.coins; sfx('coin'); } };
}
function Whetstone(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#ecf0f1';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.whetTimer=45; sfx('potion'); } };
}
function ShieldOrb(x,y){
    Shape.call(this, potionSprite, x, y);
    this.used=false; this.tint='#00d2d3';
    this.use=function(mob){ if(!this.used){ this.used=true; mob.shieldTimer=8; sfx('potion'); } };
}
var SHOP_ITEMS=[
    {id:'heal',name:'Full Heal',desc:'Restore all HP instantly',price:80,icon:'\u2764\uFE0F'},
    {id:'power', name:'Power Elixir', desc:'1.5x damage for 20s',price:80,icon:'\u26A1'},
    {id:'haste', name:'Haste Elixir', desc:'+movement speed 10s',price:80,icon:'\uD83D\uDCA8'},
    {id:'dmg',   name:'Damage Upgrade',desc:'+15% permanent damage (price rises)',price:100,icon:'\uD83D\uDDE1\uFE0F'},
    {id:'hp',    name:'Vitality',     desc:'+200 max HP permanent (price rises)',price:150,icon:'\u2764\uFE0F'}
];
function buyShop(id){
    var it=null; for(var i=0;i<SHOP_ITEMS.length;i++) if(SHOP_ITEMS[i].id===id) it=SHOP_ITEMS[i];
    if(!it || !hero) return;
    if(hero.coins < it.price){ sfx('error'); return; }
    hero.coins -= it.price;
    if(id==='heal') hero.health=hero.origin_health;
    if(id==='power') hero.powerTimer=20;
    else if(id==='haste') hero.hasteTimer=10;
    else if(id==='dmg'){ hero.damageMult=(hero.damageMult||1)*1.15; it.price=Math.round(it.price*2); }
    else if(id==='hp'){ hero.origin_health+=200; hero.health+=200; it.price=Math.round(it.price*2); }
    sfx('potion');
    if(window.renderShop) window.renderShop();
}
window.SHOP_ITEMS=SHOP_ITEMS; window.buyShop=buyShop;
function BossMob(x,y){
    var bt=BOSS_TYPES[currentLevel]||BOSS_TYPES[0];
    AgressiveMob.call(this,x,y,bt.sprite);
    this.isBoss=true;
    this.bossType=bt;
    this.origin_health=this.health=bt.hp;
    this.currentDamage=bt.dmg;
    this.scale=bt.scale||1.7;
    this.st=bt.spd;
    this.skillAt=performance.now()/1000+3;
    this.slamAt=performance.now()/1000;
    this.enraged=false;
    this.name=bt.name;
    this.tint=bt.color;
    this._bossNextStep=this.nextStep;
    this.nextStep=function(){
        this._bossNextStep();
        var now=performance.now()/1000;
        if(!this.enraged && this.health<this.origin_health*0.3){
            this.enraged=true; this.st*=1.5; this.currentDamage=Math.round(this.currentDamage*1.3);
        }
        if(this.castUntil){ // casting phase: telegraph shown, resolve when done
            if(now>=this.castUntil){
                var skill=this.bossType.skill;
                this.castUntil=0;
                if(skill==='whirlwind'){
                    if(Math.abs(hero.x-this.castCx)<s*2.5 && Math.abs(hero.y-this.castCy)<s*2.5){ hero.damage(this.currentDamage*1.5); }
                    for(var a=0;a<8;a++){ var ang=a*Math.PI/4; projectiles.push({x:this.x,y:this.y,dx:Math.cos(ang)*200,dy:Math.sin(ang)*200,dmg:Math.round(this.currentDamage*0.6),life:0.6,r:14,type:'fire',owner:this}); }
                    sfx('hit');
                }else if(skill==='summon'){
                    for(var si=0;si<2;si++){ var sx=this.castCx+(Math.random()-0.5)*s*2.4, sy=this.castCy+(Math.random()-0.5)*s*2.4; if(isWayWall(sx,sy)) monsters.push(new AgressiveMob(sx,sy,'SK')); }
                    sfx('fire');
                }else if(skill==='firerain'){
                    for(var fi=0;fi<5;fi++){ var fx=this.castCx+(Math.random()-0.5)*s*4, fy=this.castCy+(Math.random()-0.5)*s*4; projectiles.push({x:this.x,y:this.y,dx:(fx-this.x)*2,dy:(fy-this.y)*2,dmg:this.currentDamage,life:0.8,r:16,type:'fire',owner:this}); }
                    sfx('fire');
                }
            }
            return; // hold position while casting
        }
        if(now-this.skillAt>5 && this.isAboveHero()){
            this.skillAt=now;
            this.castUntil=now+0.8; // 0.8s telegraph before damage lands
            this.to_x=this.x; this.to_y=this.y;
            if(this.bossType.skill==='firerain'){ this.castCx=hero.x; this.castCy=hero.y; }
            else{ this.castCx=this.x; this.castCy=this.y; }
            sfx('attack');
        }
    };
}
function HeroBarbarian(x,y){
    AgressiveMob.call(this,x,y,"BA");
    this.isHero=true;
    this.name='Barbarian';
    this.attackOffset=40;
    this.normalOffset=10;
    this.health=this.origin_health=2000;
    this.coins=0;
    this.st=16;
    this.xp=0; this.xpNext=100; this.heroLevel=1;
    this.criticalDamage=0.15;
    this.currentDamage=180;
    // ---- weapon system (switch: Z/X/C on desktop, buttons on mobile) ----
    this.weaponIndex=0;
    this.weapons=[
        {name:'Blade',       dmg:180, cd:0.35, type:'melee',  aoe:0, rageMul:1.5},
        {name:'War Axe',     dmg:340, cd:0.70, type:'melee',  aoe:0, sweep:true},
        {name:'Fire Staff',  dmg:140, cd:0.50, type:'ranged', aoe:0, fireballMul:2.2}
    ];
    this.lastAttackAt=0;
    this.getWeapon=function(){ return this.weapons[this.weaponIndex]; };
    // ---- skills (Q/W/E) with cooldowns ----
    this.skills=[
        {name:T('skillFireball'), cd:0.5, last:0},
        {name:T('skillDash'),     cd:4, last:0},
        {name:T('skillWarCry'),   cd:8, last:0}
    ];
    // ---- temporary buffs ----
    this.powerTimer=0; this.hasteTimer=0; this.whetTimer=0; this.shieldTimer=0;
    // ---- rage resource ----
    this.rage=0; this.lastCombatAt=0;
    this.gainRage=function(n){ this.rage=Math.min(RAGE.max, this.rage+n); this.lastCombatAt=performance.now(); };
    this.getDamage=function(){
        var w=this.getWeapon();
        var d=w.dmg * ( Math.random() <= this.criticalDamage ? 2 : 1 );
        if(this.powerTimer>0) d*=1.5;
        if(this.whetTimer>0) d*=1.4; // whetstone drop: temp attack up
        if(this.damageMult) d*=this.damageMult;
        return Math.round(d);
    };
    this.doAttack=function(mob){
        this.rotateTo(mob);
        this.setState(this.attack);
        var w=this.getWeapon();
        var now=performance.now()/1000;
        if(now-this.lastAttackAt < (w.cd||0)) return; // weapon cooldown
        this.lastAttackAt=now;
        if(w.type==='ranged'){
            fireProjectile(this, mob, this.getDamage());
        }else{
            mob.damage(this.getDamage()); sfx('hit');
            this.gainRage(RAGE.hitGain*(w.rageMul||1));
            if(w.sweep){ // axe cone: forward radius, wide arc
                var adx=mob.x-this.x, ady=mob.y-this.y, alen=Math.sqrt(adx*adx+ady*ady)||1;
                for(var i in monsters){
                    var m=monsters[i];
                    if(m===mob || !m.isAboveHero()) continue;
                    var wx=m.x-this.x, wy=m.y-this.y;
                    var proj=wx*(adx/alen)+wy*(ady/alen);
                    if(proj>0 && proj<1.6*s && Math.abs(wx*(ady/alen)-wy*(adx/alen))<1.1*s){
                        m.damage(Math.round(this.getDamage()*0.6));
                    }
                }
            }
        }
    };
}
// ===== Character classes =====
function heroCombatInit(h){
    h.criticalDamage=0.4;
    h.powerTimer=0; h.hasteTimer=0; h.whetTimer=0; h.shieldTimer=0;
    h.getDamage=function(){
        var w=this.getWeapon();
        var d=w.dmg * ( Math.random() <= this.criticalDamage ? 2 : 1 );
        if(this.powerTimer>0) d*=1.5;
        if(this.whetTimer>0) d*=1.4; // whetstone drop: temp attack up
        if(this.damageMult) d*=this.damageMult;
        return Math.round(d);
    };
    h.doAttack=function(mob){
        this.rotateTo(mob);
        this.setState(this.attack);
        var w=this.getWeapon();
        var now=performance.now()/1000;
        if(now-this.lastAttackAt < (w.cd||0)) return;
        this.lastAttackAt=now;
        if(w.type==='ranged'){
            fireProjectile(this, mob, this.getDamage(), w.ptype||'fire');
        }else{
            var hitDmg=this.getDamage();
            mob.damage(hitDmg); sfx('hit');
            if(w.dot) mob.slow=1.5;
            if(w.aoe){
                for(var i in monsters){
                    var m=monsters[i];
                    if(m!==mob && m.isAboveHero() &&
                       Math.abs(m.x-mob.x)<w.aoe && Math.abs(m.y-mob.y)<w.aoe){
                        m.damage(Math.round(this.getDamage()*0.6));
                    }
                }
            }
        }
    };
}
function createHero(cls){
    return new HeroBarbarian(8*s,10*s);
}
function pickHero(cls){
    hero=createHero(cls);
    var sel=document.getElementById('char-select');
    if(sel) sel.style.display='none';
    initAudio();
    loadLevel(0);
}
function shareVictory(){
    var elapsed=Math.round(performance.now()/1000-gameStartTime);
    var mm=Math.floor(elapsed/60), ss=elapsed%60;
    var text=T('shareText')+' '+T('kills')+': '+kills+' | '+T('level')+'.'+hero.heroLevel+' | '+T('time')+': '+mm+'m'+ss+'s | '+T('gold')+': '+hero.coins+' | https://game.suipce.com/games/Arcade/Diablo-JS/';
    if(navigator.share){ navigator.share({title:T('shareTitle'),text:text,url:'https://game.suipce.com/games/Arcade/Diablo-JS/'}).catch(function(){}); }
    else if(navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ alert(T('shareCopied')); }).catch(function(){ prompt(T('shareCopy'),text); }); }
    else { prompt('Copy to share:',text); }
}
window.shareVictory=shareVictory;
window.selectHero=pickHero;
window.loadLevel=loadLevel;

// ===== Mobile touch controls (virtual joystick + action buttons) =====
var touchUI = {
    joystickZone: document.getElementById('touch-joystick'),
    attackBtn: document.getElementById('btn-attack'),
    potionBtn: document.getElementById('btn-potion'),
    mapBtn: document.getElementById('btn-map'),
    weaponBtn: document.getElementById('btn-weapon'),
    s1: document.getElementById('btn-s1'),
    s2: document.getElementById('btn-s2'),
    s3: document.getElementById('btn-s3'),
    joystickActive: false,
    joyDX: 0,
    joyDY: 0
};
(function(){
    function on(el, ev, fn){
        if(el) el.addEventListener(ev, fn, {passive:false});
    }
    var jz = touchUI.joystickZone;
    if(jz){
        var sx=0, sy=0, knob=document.getElementById('joystick-knob');
        function placeKnob(t){
            var r=jz.getBoundingClientRect();
            knob.style.left=(t.clientX-r.left-32)+'px';
            knob.style.top=(t.clientY-r.top-32)+'px';
            knob.style.transform='translate(0,0)';
            knob.style.display='block';
        }
        on(jz, 'touchstart', function(e){
            e.preventDefault();
            var t=e.touches[0];
            sx=t.clientX; sy=t.clientY;
            touchUI.joystickActive=true; touchUI.joyDX=0; touchUI.joyDY=0;
            if(knob) placeKnob(t);
        });
        on(jz, 'touchmove', function(e){
            e.preventDefault();
            if(!touchUI.joystickActive) return;
            var t=e.touches[0];
            var dx=t.clientX-sx, dy=t.clientY-sy;
            var len=Math.sqrt(dx*dx+dy*dy)||1;
            var max=56;
            if(len>max){ dx=dx/len*max; dy=dy/len*max; }
            touchUI.joyDX=dx/max; touchUI.joyDY=dy/max;
            if(knob) knob.style.transform='translate('+dx+'px,'+dy+'px)';
        });
        on(jz, 'touchend', function(e){
            touchUI.joystickActive=false; touchUI.joyDX=0; touchUI.joyDY=0;
            if(hero){ hero.to_x=hero.x; hero.to_y=hero.y; } // stop immediately, no runaway to old target
            if(knob){ knob.style.display='none'; knob.style.transform='translate(0,0)'; }
        });
        on(jz, 'touchcancel', function(e){
            touchUI.joystickActive=false; touchUI.joyDX=0; touchUI.joyDY=0;
            if(hero){ hero.to_x=hero.x; hero.to_y=hero.y; } // stop immediately, no runaway to old target
            if(knob){ knob.style.display='none'; knob.style.transform='translate(0,0)'; }
        });
    }
    on(touchUI.attackBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        if(restartIfDead()) return;
        var t=nearestMonster(); // attack closest visible monster
        if(t){ hero.rotateTo(t); hero.doAttack(t); }
        else { floor.click_x=hero.x; floor.click_y=hero.y; processClick(); }
    });
    on(touchUI.potionBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        var best=null, bd=1e9;
        for(var i in potions){
            var p=potions[i], dx=p.x-hero.x, dy=p.y-hero.y, d=dx*dx+dy*dy;
            if(d<bd){ bd=d; best=p; }
        }
        if(best){ floor.click_x=best.x; floor.click_y=best.y; processClick(); }
        else sfx('error');
    });
    on(touchUI.mapBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        showMap=!showMap;
    });
    on(touchUI.weaponBtn,'touchstart',function(e){
        e.preventDefault(); e.stopPropagation(); initAudio();
        if(restartIfDead()) return;
        hero.weaponIndex=(hero.weaponIndex+1)%hero.weapons.length;
        touchUI.weaponBtn.textContent=['🗡️','🪓','🪄'][hero.weaponIndex];
    });
    on(touchUI.s1,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); castSkill(0); });
    on(touchUI.s2,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); castSkill(1); });
    on(touchUI.s3,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); castSkill(2); });
    // mobile tap on canvas: synthesize the same click handler with scaled coords
    var cv=floor.canvas;
    on(cv, 'touchstart', function(e){
        e.preventDefault(); // suppress the synthetic click so attacks do not double-fire
        initAudio();
        if(restartIfDead()) return;
        var t=e.touches[0];
        var r=cv.getBoundingClientRect();
        var scx=floor.w/r.width, scy=floor.h/r.height;
        var mx=(t.clientX-r.left)*scx - floor.w/2;
        var my=(t.clientY-r.top)*scy - floor.h/2;
        var isCanClick=Math.abs(mx) < 150 && Math.abs(my) < 150; // generous tap radius for touch
        my *= 2;
        floor.click_x=hero.x + mx*Math.cos(-a) - my*Math.sin(-a);
        floor.click_y=hero.y + mx*Math.sin(-a) + my*Math.cos(-a);
        if(isCanClick) if(processClick()) return;
        hero.to_x=floor.click_x;
        hero.to_y=floor.click_y;
    }, {passive:false});
})();

})();