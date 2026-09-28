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

// ===== Generated larger dungeon map: 3 levels, each 100% connected, with decor & stairs =====
var LEVEL_CFG=[
    {doors:{h:{5:[5,10,19,25],11:[8,21],16:[5,13,25]},v:{9:[6,14],20:[9,17]}},decor:[[2,7,4116],[2,25,4212],[6,14,5844],[17,12,5748],[17,2,5652],[12,13,5652],[12,10,564],[2,13,564],[2,28,372],[6,17,5748],[6,6,5748],[12,24,4116],[2,10,5652],[16,13,3828],[2,3,372],[18,19,4212],[12,21,660],[2,6,4212],[12,22,372],[15,10,3828],[12,5,4116],[6,7,564],[4,19,4116],[2,11,5652],[14,28,4116],[6,3,372],[9,8,4212],[12,17,5652],[18,8,4212],[14,21,660],[18,28,4212],[17,27,4212],[18,2,660],[6,13,4212],[13,8,4212],[12,3,564],[11,21,660],[6,9,5748],[17,19,5844],[9,28,4212],[12,28,4212],[4,21,660],[3,10,660],[13,2,660],[15,28,4116],[17,11,5844],[12,15,4212]],stair:[2,28]},
    {doors:{h:{5:[6,12,21,27],11:[2,10],16:[7,15,26]},v:{9:[7,16],20:[10,18]}},decor:[[3,2,660],[3,8,4116],[2,7,372],[12,28,5844],[9,8,4116],[4,2,3828],[17,4,5748],[6,28,5748],[12,18,372],[12,15,4212],[12,26,5844],[17,6,5748],[2,23,5844],[2,25,5844],[17,2,5748],[13,28,4212],[9,10,660],[7,9,564],[6,13,372],[2,12,5844],[3,19,4212],[2,10,5652],[17,19,5844],[2,3,4116],[3,28,4212],[12,4,5748],[9,28,4212],[2,28,4116],[12,21,5652],[2,16,4212],[12,3,4212],[5,27,3828],[12,24,4116],[6,22,5652],[9,19,4116],[12,13,5652],[2,22,5748],[2,6,5748],[12,22,5844],[12,14,4212],[8,21,660],[4,8,4212],[6,17,5844]],stair:[2,28]},
    {doors:{h:{5:[8,16,24],11:[6,14,23],16:[2,11,19,27]},v:{9:[5,15],20:[8,17]}},decor:[[2,5,5652],[3,28,4212],[12,13,5652],[2,17,5652],[12,28,4116],[3,10,3828],[12,27,4212],[14,8,4116],[6,18,372],[13,21,3828],[6,17,564],[12,17,564],[6,28,5748],[2,11,4212],[16,11,660],[18,21,660],[6,23,5652],[17,22,5844],[12,5,5748],[12,25,4212],[2,14,5844],[18,10,660],[2,18,372],[3,8,4212],[8,28,4212],[10,2,660],[11,6,660],[2,27,5652],[12,2,5844],[6,26,4212],[12,16,4212],[13,28,4212],[6,19,564],[12,21,372],[2,22,564],[17,12,5844],[8,2,660],[7,8,4212],[18,2,3828],[2,19,5844],[12,15,372],[2,25,5652],[9,19,4116],[2,12,5844],[17,17,5748]],stair:[2,28]}
];

var MAX_LEVEL=LEVEL_CFG.length;
var currentLevel=0, stairX=-1, stairY=-1, gameWon=false, questTitle="", questGoal="";
var LEVEL_NAMES=['Cellar','Crypt','Demon Lair'];
var LEVEL_GOALS=['Find the stairs to the Crypt','Find the stairs to the Demon Lair','Slay all demons to win'];

function buildMap(idx){
    var cfg=LEVEL_CFG[idx];
    var W=31,H=21;
    function blank(){var a=[];for(var y=0;y<H;y++){a.push([]);for(var x=0;x<W;x++)a[y].push(0);}return a;}
    level.floor.map=blank(); level.wall.map=blank(); level.object.map=blank();
    var x,y;
    for(y=2;y<H-2;y++) for(x=2;x<W-2;x++) level.floor.map[y][x]=756;
    for(x=1;x<W-1;x++){ level.wall.map[1][x]=(x===1||x===W-2)?948:372; level.wall.map[H-2][x]=(x===1||x===W-2)?948:372; }
    for(y=2;y<H-2;y++){ level.wall.map[y][1]=468; level.wall.map[y][W-2]=468; }
    function hw(row,cols,opens){for(var c=0;c<cols.length;c++) if(opens.indexOf(cols[c])<0) level.wall.map[row][cols[c]]=372;}
    function vw(col,rows,opens){for(var r=0;r<rows.length;r++) if(opens.indexOf(rows[r])<0) level.wall.map[rows[r]][col]=468;}
    var allc=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    var allr=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    // ---- per-level architectural skeleton ----
    if(idx===0){ // Cellar: two open great halls + pillars
        hw(8,allc,[4,11,17,24]);
        level.wall.map[4][8]=468; level.wall.map[4][16]=468; level.wall.map[15][8]=468; level.wall.map[15][16]=468;
    }else if(idx===1){ // Crypt: open burial hall + short colonnade
        hw(9,allc,[3,10,16,24]);
        vw(14,allr,[4]); vw(14,[11,12,13,14,15,16,17],[15]);
        level.wall.map[3][14]=468; level.wall.map[17][14]=468;
    }else{ // Demon Lair: central altar room + open ring, corner pillars
        vw(11,[6,7,8,9,10,11,12,13,14],[10]); vw(18,[6,7,8,9,10,11,12,13,14],[10]);
        hw(6,[11,12,13,14,15,16,17,18],[14]); hw(14,[11,12,13,14,15,16,17,18],[15]);
        level.wall.map[4][6]=468; level.wall.map[4][24]=468; level.wall.map[16][6]=468; level.wall.map[16][24]=468;
    }
    level.wall.map[10][8]=0; level.wall.map[10][9]=0;
    // ---- BFS connectivity repair ----
    function isFloor(yy,xx){ return yy>0 && yy<H-1 && xx>0 && xx<W-1 && level.wall.map[yy][xx]===0 && level.object.map[yy][xx]===0; }
    var dirs=[[0,1],[0,-1],[1,0],[-1,0]];
    function reachable(){
        var seen={}, q=[[10,8]], k=function(yy,xx){return yy+','+xx;};
        seen[k(10,8)]=1;
        while(q.length){
            var c=q.shift(), yy=c[0], xx=c[1];
            for(var d=0;d<4;d++){ var ny=yy+dirs[d][0], nx=xx+dirs[d][1];
                if(isFloor(ny,nx) && !seen[k(ny,nx)]){ seen[k(ny,nx)]=1; q.push([ny,nx]); }
            }
        }
        return seen;
    }
    for(var guard=0; guard<200; guard++){
        var seen=reachable();
        var un=null;
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
    // stairs marker (rendered as a statue + portal glow)
    var sy=cfg.stair[0], sx=cfg.stair[1];
    stairX=sx*s+s/2; stairY=sy*s+s/2;
    level.object.map[sy][sx]=1524;
    // ---- procedural wall-adjacent decor (connectivity-safe) ----
    var decoTiles=[564,660,372,4116,4212,5748,5844,5652,3828];
    var placed=0, maxDec=40, tries=0;
    while(placed<maxDec && tries<600){
        tries++;
        var ry=2+Math.floor(Math.random()*17), rx=2+Math.floor(Math.random()*27);
        if(level.wall.map[ry][rx]>0 || level.object.map[ry][rx]>0) continue;
        if((rx===8||rx===9)&&ry===10) continue; // keep spawn clear
        var adj = (level.wall.map[ry-1]&&level.wall.map[ry-1][rx]>0)||(level.wall.map[ry+1]&&level.wall.map[ry+1][rx]>0)||level.wall.map[ry][rx-1]>0||level.wall.map[ry][rx+1]>0;
        if(!adj) continue;
        level.wall.map[ry][rx]=999; // tentatively block
        var s2=reachable(), ok=true;
        for(var fy2=1; fy2<H-1 && ok; fy2++) for(var fx2=1; fx2<W-1; fx2++)
            if(isFloor(fy2,fx2) && !s2[fy2+','+fx2]){ ok=false; }
        level.wall.map[ry][rx]=0;
        if(!ok) continue;
        level.object.map[ry][rx]=decoTiles[Math.floor(Math.random()*decoTiles.length)];
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


// ===== Sound effects (Web Audio API, no external files) =====
var audioCtx=null, deathSfxPlayed=false;
function initAudio(){
    if(!audioCtx){
        try{ audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){}
    }
    if(audioCtx && audioCtx.state==='suspended'){ audioCtx.resume(); }
}
function sfx(type){
    if(!audioCtx) return;
    var t=audioCtx.currentTime, master=0.5;
    function osc(f0,f1,dur,wave,vol,when){
        var o=audioCtx.createOscillator(), g=audioCtx.createGain();
        o.type=wave||'square';
        o.frequency.setValueAtTime(Math.max(1,f0), t+when);
        o.frequency.exponentialRampToValueAtTime(Math.max(1,f1), t+when+dur);
        g.gain.setValueAtTime(vol*master, t+when);
        g.gain.exponentialRampToValueAtTime(0.0001, t+when+dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t+when); o.stop(t+when+dur+0.05);
    }
    function noise(dur,vol,when,freq){
        var n=audioCtx.createBufferSource();
        var buf=audioCtx.createBuffer(1, Math.max(1,Math.floor(audioCtx.sampleRate*dur)), audioCtx.sampleRate);
        var d=buf.getChannelData(0);
        for(var i=0;i<d.length;i++) d[i]=Math.random()*2-1;
        n.buffer=buf;
        var f=audioCtx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=freq||1200;
        var g=audioCtx.createGain(); g.gain.setValueAtTime(vol*master,t+when);
        g.gain.exponentialRampToValueAtTime(0.0001,t+when+dur);
        n.connect(f); f.connect(g); g.connect(audioCtx.destination);
        n.start(t+when); n.stop(t+when+dur+0.05);
    }
    switch(type){
        case 'attack':     noise(0.12,0.16,0,2600); osc(220,70,0.12,'sawtooth',0.12,0); break;
        case 'hit':        osc(340,130,0.1,'square',0.14,0); break;
        case 'heroHurt':   osc(190,55,0.28,'sawtooth',0.18,0); noise(0.16,0.12,0,700); break;
        case 'coin':       osc(950,1900,0.12,'sine',0.16,0); osc(1420,1900,0.1,'sine',0.1,0.06); break;
        case 'potion':     osc(500,920,0.12,'sine',0.14,0); osc(760,1240,0.12,'sine',0.1,0.08); break;
        case 'drink':      osc(300,720,0.16,'triangle',0.14,0); osc(450,900,0.14,'triangle',0.08,0.07); break;
        case 'death':      osc(320,38,0.9,'sawtooth',0.16,0); noise(0.6,0.14,0,450); break;
        case 'monsterDie': osc(240,45,0.4,'square',0.12,0); noise(0.2,0.08,0,900); break;
        case 'fire':  noise(0.18,0.16,0,2200); osc(520,150,0.16,'sawtooth',0.12,0); break;
        case 'dash':  osc(300,760,0.18,'sawtooth',0.14,0); noise(0.2,0.1,0,1400); break;
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
    }
};

var hero=new HeroBarbarian(8*s,10*s);
setInterval(function(){
    hero.health=Math.min(hero.health+10, hero.origin_health);
},2000);

// aggresive mobs
var monsters=[],deathmobs=[],barrels=[],coins=[],potions=[],walls=[];

var LEVELS=[
    {sk:4,fs:4,si:4,pots:6,dmg:30},
    {sk:7,fs:7,si:7,pots:7,dmg:45},
    {sk:9,fs:9,si:9,pots:8,dmg:60}
];

function loadLevel(idx){
    currentLevel=idx;
    buildMap(idx);
    walls=[];
    for(var y in level.wall.map) for(var x in level.wall.map[y]){ var v=level.wall.map[y][x]; if(v>0) walls.push(new Wall(v,x*s,y*s)); }
    for(var y in level.object.map) for(var x in level.object.map[y]){ var v=level.object.map[y][x]; if(v>0) walls.push(new WallObject(v,x*s,y*s)); }
    monsters=[]; deathmobs=[]; barrels=[]; coins=[]; potions=[]; drops=[];
    var L=LEVELS[idx];
    function safePos(){var x,y,t=0;do{x=randomx();y=randomy();t++;}while(t<25&&(Math.abs(x-s*8)+Math.abs(y-s*10))<5*s);return [x,y];}
    for(var i=0;i<L.sk;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'SK'));}
    for(var i=0;i<L.fs;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'FS'));}
    for(var i=0;i<L.si;i++){var p=safePos();monsters.push(new AgressiveMob(p[0],p[1],'SI'));}
    for(var i=0;i<L.pots;i++) potions.push(new PotionHealth(randomx(),randomy()));
    // boss guards the stairs
    if(idx<MAX_LEVEL) monsters.push(new BossMob(stairX+s*0.5, stairY-s*0.2));
    hero.x=s*8; hero.y=s*10; hero.to_x=hero.x; hero.to_y=hero.y;
    hero.health=hero.origin_health;
    hero.currentState=hero.stay; hero.step=0; hero.attacked=null;
    dead=false; gameWon=false; bossDead=false; hero.powerTimer=0; hero.hasteTimer=0;
    questTitle='Level '+(idx+1)+'/'+MAX_LEVEL+' · '+LEVEL_NAMES[idx];
    questGoal=LEVEL_GOALS[idx];
}

loadLevel(0);

setInterval(function() { // random step for mobs, attack hero
    if(monsters.length==0)return;
    var m=monsters[Math.ceil(Math.random()*(monsters.length-1))];
    if(typeof m.attacked != "object"){
        m.to_x=m.x+(Math.random()*s-s/2);
        m.to_y=m.y+(Math.random()*s-s/2);
    }
    for(var i in monsters){
        var m=monsters[i], attackDist=100;
        if(m.attack && m.isAboveHero()){
            if(Math.abs(hero.x-m.x)<attackDist &&
               Math.abs(hero.y-m.y)<attackDist){
               m.doAttack(hero);
               m.to_x = m.x;
               m.to_y = m.y;
            }else{
                m.to_x=hero.x;
                m.to_y=hero.y;
            }
        }
    }
}, 200);

floor.canvas.onclick=function(e) {
    initAudio();
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
    if(!hero){
        if(e.keyCode===49) pickHero('barbarian');
        else if(e.keyCode===50) pickHero('rogue');
        else if(e.keyCode===51) pickHero('sorceress');
        return false;
    }
    var beltKeys=[49,50,51,52,53,54,55,56,57,48];
    var beltIndex = beltKeys.indexOf(e.keyCode);
    if(beltIndex>=0){
        if(hero.belt.items[beltIndex] instanceof PotionHealth){
           hero.belt.items[beltIndex].drink(hero);
           remove(hero.belt.items,hero.belt.items[beltIndex]);
        }
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
    if(e.keyCode==69){ castSkill(2); return false; } // E = Heal
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
    floor.fillText("YOU DIED", floor.w/2, floor.h/2-24);
    floor.fillStyle="#e8e6e3";
    floor.font="20px 'Poppins',sans-serif";
    floor.fillText("Click or press R to restart", floor.w/2, floor.h/2+34);
    floor.textAlign="left";
    floor.restore();
}
function restartIfDead(){
    if(dead){ location.reload(); return true; }
    return false;
}
setInterval(function() {
    if(imageCount>0) return;
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
    for(var i in monsters){ monsters[i].nextStep(); if(monsters[i].slow>0) monsters[i].slow-=0.066; }
    // buffs + move speed
    if(hero.powerTimer>0) hero.powerTimer-=0.066;
    if(hero.hasteTimer>0) hero.hasteTimer-=0.066;
    hero.st = hero.hasteTimer>0 ? 26 : 16;
    // projectiles
    updateProjectiles(0.066);
    // pick up power/haste drops
    for(var di=drops.length-1; di>=0; di--){
        var dd=drops[di];
        if(Math.abs(hero.x-dd.x)<s*0.8 && Math.abs(hero.y-dd.y)<s*0.8){ dd.use(hero); }
        if(dd.used) drops.splice(di,1);
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
    renderFloor();
    renderHeroHealth();
    renderHeroBelt();
    renderCoins();
    if(showMap) renderMap();
    // ---- level / quest system ----
    if(!gameWon && currentLevel<MAX_LEVEL-1 && bossDead &&
       Math.abs(hero.x-stairX)<s*0.95 && Math.abs(hero.y-stairY)<s*0.95){
        sfx('coin'); loadLevel(currentLevel+1);
    }
    if(!gameWon && currentLevel===MAX_LEVEL-1 && monsters.length===0){ gameWon=true; sfx('coin'); }
    renderQuest();
    if(hero.health<=0) dead=true;
}, 66);

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
    floor.fillText("Quest: "+questGoal, floor.w/2, 52);
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
    floor.fillText("Wpn: "+w.name+"   ·   Q "+skLabel(hero.skills[0])+"   ·   W "+skLabel(hero.skills[1])+"   ·   E "+skLabel(hero.skills[2]), floor.w/2, 84);
    floor.textAlign="left";
    floor.restore();
    if(currentLevel<MAX_LEVEL-1 && !bossDead){
        floor.save();
        floor.fillStyle="#ff3b30";
        floor.font="bold 14px 'Poppins',sans-serif";
        floor.textAlign="center";
        floor.fillText("☠ Defeat the BOSS to open the stairs", floor.w/2, 108);
        floor.textAlign="left";
        floor.restore();
    }
    // victory overlay
    if(gameWon){
        floor.save();
        floor.fillStyle="rgba(0,0,0,0.8)";
        floor.fillRect(0,0,floor.w,floor.h);
        floor.textAlign="center";
        floor.fillStyle="#ffd700";
        floor.font="bold 58px 'Poppins',sans-serif";
        floor.fillText("VICTORY!", floor.w/2, floor.h/2-20);
        floor.fillStyle="#e8e6e3";
        floor.font="19px 'Poppins',sans-serif";
        floor.fillText("You cleared the Demon Lair.", floor.w/2, floor.h/2+24);
        floor.fillText("Click or press R to play again", floor.w/2, floor.h/2+52);
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

function renderHeroBelt(){
    floor.save();
    var tile=potionSprite;
    var tw = tile.width / tile.steps;
    var th = tile.height / tile.angles;        
    for(var i=0;i<hero.belt.size;i++){
        floor.drawImage(tile, 
            tw*2, th*3, tw, th,
            200+tw*i, 600, tw, th);
        var p = hero.belt.items[i];
        if(p){
            floor.drawImage(tile, 
                tw*p.step, th*p.angle, tw, th,
                200+tw*i, 600, tw, th);
        }
    }
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
    g.globalAlpha=0.62;
    g.fillStyle=color;
    g.fillRect(0,0,c.width,c.height);
    g.globalAlpha=1; g.globalCompositeOperation='source-over';
    _tintCache.push({img:img,color:color,t:c});
    return c;
}
function drawHeroWeapon(g, hero, cx, cy){
    g.save();
    g.translate(cx, cy);
    g.lineWidth=3; g.lineCap='round'; g.lineJoin='round';
    if(hero.name==='Barbarian'){
        // war axe: handle + blade
        g.strokeStyle='#8a8a8a'; g.beginPath(); g.moveTo(-10,11); g.lineTo(9,-7); g.stroke();
        g.fillStyle='#c0392b'; g.beginPath(); g.moveTo(9,-7); g.lineTo(20,-3); g.lineTo(15,6); g.closePath(); g.fill();
        g.strokeStyle='#7f8c8d'; g.beginPath(); g.moveTo(9,-7); g.lineTo(15,6); g.stroke();
    }else if(hero.name==='Rogue'){
        // bow: arc + string + nocked arrow
        g.strokeStyle='#7b5b3a'; g.lineWidth=3.5; g.beginPath(); g.arc(0,0,15,Math.PI*0.85,Math.PI*2.05); g.stroke();
        g.strokeStyle='rgba(240,240,240,.85)'; g.lineWidth=1.6; g.beginPath(); g.moveTo(-5,14); g.lineTo(11,9); g.stroke();
        g.fillStyle='#c9a227'; g.beginPath(); g.moveTo(11,9); g.lineTo(24,2); g.lineTo(11,-5); g.closePath(); g.fill();
        g.fillStyle='#e74c3c'; g.beginPath(); g.moveTo(11,9); g.lineTo(13,5); g.lineTo(9,5); g.closePath(); g.fill();
    }else{
        // staff: pole + glowing orb
        g.strokeStyle='#6b4a2b'; g.lineWidth=3.5; g.beginPath(); g.moveTo(0,11); g.lineTo(0,-11); g.stroke();
        g.fillStyle='#8e44ad'; g.beginPath(); g.arc(0,-14,8,0,Math.PI*2); g.fill();
        g.fillStyle='rgba(255,255,255,.9)'; g.beginPath(); g.arc(0,-14,3.4,0,Math.PI*2); g.fill();
        g.strokeStyle='rgba(255,255,255,.5)'; g.beginPath(); g.arc(0,-14,12,0,Math.PI*2); g.stroke();
    }
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
        var _tc=(m===hero)?(hero.tint||null):(m.tint||null);
        if(_tc) tile=getTinted(tile, _tc);
        // render sprite
        var tw = tile.width;
        var th = tile.height
        if(tile.steps && tile.angles){
            tw/=tile.steps;
            th/=tile.angles;
            floor.drawImage(tile, 
                tw*m.step, th*m.angle, tw, th,
                Math.round(sx-tw/2-tile.offsetX), Math.round(sy-th), tw, th);
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
        // class weapon overlay
        if(m===hero){ drawHeroWeapon(floor, hero, sx, sy-th/2); }
        // hero class name tag
        if(m===hero && hero.name){
            floor.save();
            floor.font="bold 13px 'Poppins',sans-serif";
            floor.textAlign="center";
            floor.fillStyle="#111"; floor.fillRect(sx-46, sy-120, 92, 16);
            floor.fillStyle=hero.tint; floor.fillText(hero.name, sx, sy-107);
            floor.textAlign="left";
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
        if(mob.addToBelt(this)){ sfx('potion'); remove(potions,this); }
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
        if((Math.sqrt((dx*dx)+(dy*dy)))>eSt){ // run
            var tx=0;ty=0;
            for(var st=0;st<eSt;st+=0.01){
                var sx=st * dx / Math.sqrt((dx*dx) + (dy*dy));
                var sy=sx * dy / dx;
                if(isWayWall(this.x+sx,this.y+sy)){tx=sx;ty=sy;}
                else break;
            }
            this.rotate(tx, ty);
            if(Math.sqrt((tx*tx)+(ty*ty))>=eSt/2){
                this.x+=tx;
                this.y+=ty;
                this.setState(this.run);
            }
            else{ this.setState(this.stay); this.x+=tx;this.y+=ty;this.to_x=this.x;this.to_y=this.y;}
        } else{ this.setState(this.stay); this.to_x=this.x;this.to_y=this.y;}
        this.step=(this.step+1)%(this.currentState.steps);
        this.sprite=this.currentState;
    }
    this.origin_health=this.health=1000;
    this.resistance=10; // damage resistance, less than 1000
    this.use = function(mob){
        if(mob.doAttack){ sfx('attack'); mob.doAttack(this); }
    };
    this.damage=function(damage){
        var health=this.health - damage * 1000/(1000-this.resistance);
        if(health<=0){
            this.health=0;
            if(this instanceof HeroBarbarian){ if(!deathSfxPlayed){ sfx('death'); deathSfxPlayed=true; } }
            else {
                sfx('monsterDie');
                // drop loot (varied, tinted)
                if(!this.isBoss){
                    if(Math.random()<0.5) coins.push(new Coin(this.x,this.y));
                    if(Math.random()<0.2) potions.push(new PotionHealth(this.x,this.y));
                    if(Math.random()<0.07) drops.push(new PowerPotion(this.x,this.y));
                    if(Math.random()<0.07) drops.push(new HastePotion(this.x,this.y));
                    if(Math.random()<0.07) drops.push(new Gem(this.x,this.y));
                    if(Math.random()<0.03) drops.push(new HealthUp(this.x,this.y));
                    if(Math.random()<0.03) drops.push(new DamageUp(this.x,this.y));
                }else{
                    coins.push(new Coin(this.x,this.y)); coins.push(new Coin(this.x,this.y));
                    for(var bi=0;bi<3;bi++) potions.push(new PotionHealth(this.x,this.y));
                    drops.push(new Gem(this.x,this.y)); drops.push(new HealthUp(this.x,this.y));
                    bossDead=true;
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
    this._nextStep=this.nextStep;
    this.nextStep=function(){
        if(!this.isAboveHero())return;
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
    this.currentDamage=(typeof LEVELS!=='undefined')?LEVELS[currentLevel].dmg:30;
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

function fireProjectile(hero, target, dmg, type){
    var ang=Math.atan2(target.y-hero.y, target.x-hero.x);
    var spd=380;
    projectiles.push({x:hero.x, y:hero.y, dx:Math.cos(ang)*spd, dy:Math.sin(ang)*spd, dmg:dmg, life:1.0, r:(type==='arrow'?8:12), type:type||'fire'});
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
        if(isWayWall(nx,ny)){ explodeProjectile(i,p); continue; }
        p.x=nx; p.y=ny;
        var hit=false;
        for(var j in monsters){
            var m=monsters[j];
            if(Math.abs(m.x-p.x)<s*0.6 && Math.abs(m.y-p.y)<s*0.6){ hit=true; m.damage(p.dmg); break; }
        }
        if(hit){
            if(p.type==='ice'){ var tm=monsters[j]; if(tm) tm.slow=1.5; }
            explodeProjectile(i,p);
        }
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
    if(sk.name==='Fireball'){
        var t=nearestMonster();
        if(!t) return false;
        sk.last=now;
        fireProjectile(hero, t, 140);
        sfx('fire');
        return true;
    }
    if(sk.name==='Dash'){
        sk.last=now;
        var dx=hero.to_x-hero.x, dy=hero.to_y-hero.y;
        var len=Math.sqrt(dx*dx+dy*dy)||1;
        var nx=hero.x+dx/len*2*s, ny=hero.y+dy/len*2*s;
        for(var st=0; st<2*s; st+=4){ var tx=hero.x+dx/len*st, ty=hero.y+dy/len*st; if(isWayWall(tx,ty)){ nx=tx; ny=ty; break; } }
        hero.x=nx; hero.y=ny; hero.to_x=nx; hero.to_y=ny;
        sfx('dash');
        return true;
    }
    if(sk.name==='Heal'){
        sk.last=now;
        hero.health=Math.min(hero.origin_health, hero.health+400);
        sfx('drink');
        return true;
    }
    if(sk.name==='MultiShot'){
        var t0=nearestMonster(); if(!t0) return false;
        sk.last=now;
        var base=Math.atan2(t0.y-hero.y, t0.x-hero.x);
        for(var oa=-0.25; oa<=0.25; oa+=0.25){
            var spd=380;
            projectiles.push({x:hero.x,y:hero.y,dx:Math.cos(base+oa)*spd,dy:Math.sin(base+oa)*spd,dmg:hero.getDamage(),life:0.9,r:8,type:'arrow'});
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
        for(var stp=0; stp<4*s; stp+=4){ var tx2=hero.x+tdx/tl*stp, ty2=hero.y+tdy/tl*stp; if(isWayWall(tx2,ty2)){ nx=tx2; ny=ty2; break; } }
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
var SHOP_ITEMS=[
    {id:'potion',name:'Health Potion',desc:'+1000 HP to your belt',price:60,icon:'\uD83E\uDDEA'},
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
    if(id==='potion') hero.addToBelt(new PotionHealth(0,0));
    else if(id==='power') hero.powerTimer=20;
    else if(id==='haste') hero.hasteTimer=10;
    else if(id==='dmg'){ hero.damageMult=(hero.damageMult||1)*1.15; it.price=Math.round(it.price*2); }
    else if(id==='hp'){ hero.origin_health+=200; hero.health+=200; it.price=Math.round(it.price*2); }
    sfx('potion');
    if(window.renderShop) window.renderShop();
}
window.SHOP_ITEMS=SHOP_ITEMS; window.buyShop=buyShop;
function BossMob(x,y){
    AgressiveMob.call(this,x,y,'SI');
    this.isBoss=true;
    this.origin_health=this.health=3000+currentLevel*1500;
    this.currentDamage=LEVELS[currentLevel].dmg*2;
    this.scale=1.6;
    this.st=5;
    this.slamAt=performance.now()/1000;
    this.name='BOSS';
}
function HeroBarbarian(x,y){
    AgressiveMob.call(this,x,y,"BA");
    this.name='Barbarian';
    this.tint='#dc4632';
    this.attackOffset=40;
    this.normalOffset=10;
    this.health=this.origin_health=1000;
    this.coins=0;
    this.belt={items:[], size:10};
    this.st=16;
    this.addToBelt=function(potion){
        for(var i=0;i<this.belt.size;i++){
            if(typeof this.belt.items[i] == "undefined"){
                this.belt.items[i]=potion;
                return true;
            }
        }
        return false;
    }
    this.criticalDamage=0.4;
    this.currentDamage=120;
    // ---- weapon system (switch: Z/X/C on desktop, buttons on mobile) ----
    this.weaponIndex=0;
    this.weapons=[
        {name:'Blade',       dmg:120, cd:0.0, type:'melee',  aoe:0},
        {name:'War Axe',     dmg:250, cd:1.1, type:'melee',  aoe:110},
        {name:'Fire Staff',  dmg:95,  cd:0.6, type:'ranged', aoe:0}
    ];
    this.lastAttackAt=0;
    this.getWeapon=function(){ return this.weapons[this.weaponIndex]; };
    // ---- skills (Q/W/E) with cooldowns ----
    this.skills=[
        {name:'Fireball', cd:3, last:0},
        {name:'Dash',     cd:5, last:0},
        {name:'Heal',     cd:8, last:0}
    ];
    // ---- temporary buffs ----
    this.powerTimer=0; this.hasteTimer=0;
    this.getDamage=function(){
        var w=this.getWeapon();
        var d=w.dmg * ( Math.random() <= this.criticalDamage ? 2 : 1 );
        if(this.powerTimer>0) d*=1.5;
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
// ===== Character classes =====
function heroCombatInit(h){
    h.criticalDamage=0.4;
    h.powerTimer=0; h.hasteTimer=0;
    h.getDamage=function(){
        var w=this.getWeapon();
        var d=w.dmg * ( Math.random() <= this.criticalDamage ? 2 : 1 );
        if(this.powerTimer>0) d*=1.5;
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
function HeroRogue(x,y){
    AgressiveMob.call(this,x,y,"BA");
    this.name='Rogue';
    this.tint='#46be50';
    this.attackOffset=40; this.normalOffset=10;
    this.health=this.origin_health=800;
    this.coins=0; this.belt={items:[],size:10}; this.st=20;
    this.addToBelt=function(potion){ for(var i=0;i<this.belt.size;i++){ if(typeof this.belt.items[i]=="undefined"){ this.belt.items[i]=potion; return true; } } return false; };
    this.currentDamage=70;
    this.weaponIndex=0;
    this.weapons=[
        {name:'Short Bow',   dmg:70,  cd:0.25, type:'ranged', aoe:0, ptype:'arrow'},
        {name:'Long Bow',    dmg:165, cd:0.9,  type:'ranged', aoe:0, ptype:'arrow'},
        {name:'Venom Dagger',dmg:45,  cd:0.35, type:'melee',  aoe:0, dot:true}
    ];
    this.lastAttackAt=0;
    this.getWeapon=function(){ return this.weapons[this.weaponIndex]; };
    this.skills=[
        {name:'MultiShot', cd:4, last:0},
        {name:'Dash',      cd:5, last:0},
        {name:'Heal',      cd:10,last:0}
    ];
    heroCombatInit(this);
}
function HeroSorceress(x,y){
    AgressiveMob.call(this,x,y,"BA");
    this.name='Sorceress';
    this.tint='#aa6ef0';
    this.attackOffset=40; this.normalOffset=10;
    this.health=this.origin_health=750;
    this.coins=0; this.belt={items:[],size:10}; this.st=15;
    this.addToBelt=function(potion){ for(var i=0;i<this.belt.size;i++){ if(typeof this.belt.items[i]=="undefined"){ this.belt.items[i]=potion; return true; } } return false; };
    this.currentDamage=95;
    this.weaponIndex=0;
    this.weapons=[
        {name:'Fire Staff', dmg:95,  cd:0.6, type:'ranged', aoe:0, ptype:'fire'},
        {name:'Frost Wand', dmg:70,  cd:0.5, type:'ranged', aoe:0, ptype:'ice'},
        {name:'Arcane Rod', dmg:155, cd:1.0, type:'ranged', aoe:0, ptype:'bolt'}
    ];
    this.lastAttackAt=0;
    this.getWeapon=function(){ return this.weapons[this.weaponIndex]; };
    this.skills=[
        {name:'Fireball',  cd:3, last:0},
        {name:'FrostNova', cd:6, last:0},
        {name:'Teleport',  cd:4, last:0}
    ];
    heroCombatInit(this);
}
function createHero(cls){
    if(cls==='rogue') return new HeroRogue(8*s,10*s);
    if(cls==='sorceress') return new HeroSorceress(8*s,10*s);
    return new HeroBarbarian(8*s,10*s);
}
function pickHero(cls){
    hero=createHero(cls);
    var sel=document.getElementById('char-select');
    if(sel) sel.style.display='none';
    initAudio();
    loadLevel(0);
}
window.selectHero=pickHero;
window.loadLevel=loadLevel;

// ===== Mobile touch controls (virtual joystick + action buttons) =====
var touchUI = {
    joystickZone: document.getElementById('touch-joystick'),
    attackBtn: document.getElementById('btn-attack'),
    potionBtn: document.getElementById('btn-potion'),
    mapBtn: document.getElementById('btn-map'),
    w1: document.getElementById('btn-w1'),
    w2: document.getElementById('btn-w2'),
    w3: document.getElementById('btn-w3'),
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
            if(knob){ knob.style.display='none'; knob.style.transform='translate(0,0)'; }
        });
        on(jz, 'touchcancel', function(e){
            touchUI.joystickActive=false; touchUI.joyDX=0; touchUI.joyDY=0;
            if(knob){ knob.style.display='none'; knob.style.transform='translate(0,0)'; }
        });
    }
    on(touchUI.attackBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        if(restartIfDead()) return;
        floor.click_x=hero.x; floor.click_y=hero.y;
        processClick();
    });
    on(touchUI.potionBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        var it=hero.belt.items;
        for(var i=0;i<it.length;i++){
            if(it[i] instanceof PotionHealth){
                it[i].drink(hero);
                remove(it,it[i]);
                break;
            }
        }
    });
    on(touchUI.mapBtn, 'touchstart', function(e){
        e.preventDefault(); e.stopPropagation();
        initAudio();
        showMap=!showMap;
    });
    on(touchUI.w1,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); hero.weaponIndex=0; });
    on(touchUI.w2,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); hero.weaponIndex=1; });
    on(touchUI.w3,'touchstart',function(e){ e.preventDefault(); e.stopPropagation(); initAudio(); hero.weaponIndex=2; });
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
        var isCanClick=Math.abs(mx) < 100 && Math.abs(my) < 100;
        my *= 2;
        floor.click_x=hero.x + mx*Math.cos(-a) - my*Math.sin(-a);
        floor.click_y=hero.y + mx*Math.sin(-a) + my*Math.cos(-a);
        if(isCanClick) if(processClick()) return;
        hero.to_x=floor.click_x;
        hero.to_y=floor.click_y;
    }, {passive:false});
})();

})();